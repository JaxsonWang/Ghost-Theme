# Winner

Winner 是一款现代化 Ghost 主题。

## Ghost 配置

主题直接读取 Ghost 后台内容：

- 站点标题：`Settings → General → Title`
- 站点简介：`Settings → General → Description`
- 顶部 Logo：`Settings → Design → Brand → Publication logo`（`@site.logo`）；未上传时显示站点标题。当前黑色透明 Logo 在暗色模式下反白显示。
- 首页主图：`Settings → Design → Brand → Publication cover`
- 顶部与底部菜单：`Settings → Navigation`
- 文章卡片、作者、标签、特色图片、阅读时间和前后文章均由 Ghost 模板上下文生成

## 分组文案设置

`Settings → Design & branding → Theme` 中，Homepage 分组包含 `Hero` 和 `Homepage about`，Site wide 分组包含 `Footer`。每组在一个文本框内填写完整 JSON，保留字段名和英文双引号。

### Hero

```json
{
    "titleLineOne": "永远年轻",
    "titleLineTwo": "永远",
    "titleAccent": "热泪盈眶",
    "sideText": "淮城一只猫，关注于产品体验、生活体验和IT技术经验分享的个人博客。致力成为互联网具有个性化、传播力的个人独立博客。博客座右铭：永远年轻，永远热泪盈眶。",
    "ctaText": "阅读最新一篇"
}
```

### 首页关于区

```json
{
    "titleLineOne": "不追热点，",
    "titleLineTwo": "记录真正经历过的事。",
    "sideText": "永远年轻，永远热泪盈眶",
    "bodyText": "淮城一只猫，关注于产品体验、生活体验和IT技术经验分享的个人博客。致力成为互联网具有个性化、传播力的个人独立博客。博客座右铭：永远年轻，永远热泪盈眶。",
    "ctaText": "关于作者",
    "ctaUrl": "/about/"
}
```

### Footer

```json
{
    "copyrightStartYear": "2021",
    "icpName": "苏ICP备15050739号",
    "gonganBeianName": "苏公网安备32010402000196号",
    "gonganBeianUrl": "https://www.beian.gov.cn/portal/registerSystemInfo?recordcode=32010402000196",
    "linkName": "百度统计",
    "linkUrl": "https://tongji.baidu.com/main/overview/10000137113/overview/index?siteId=14346808",
    "motto": "只争朝夕，不负韶华。"
}
```

Hero 和首页关于区的 `titleLineOne`、`titleLineTwo` 是两行标题；`titleAccent` 是 Hero 的强调文字；`sideText` 是侧边文字；`bodyText` 是简介；`ctaText`、`ctaUrl` 是按钮文案和地址。Hero 按钮仍自动链接到最新文章。Footer 的 `copyrightStartYear` 是版权起始年，`icpName`、`gonganBeianName`、`gonganBeianUrl` 是备案信息，`linkName`、`linkUrl` 是附加链接，`motto` 是页脚短句。

所有字段均为字符串，单项填写 `""` 隐藏对应内容，清空整个文本框关闭对应区域。链接只接受 HTTP(S) 或相对地址。JSON 文案由浏览器脚本读取；格式错误会在控制台报错并停止渲染该区域。

升级前请保存原来的分散字段：Ghost 不会自动把旧值合并进新 JSON。新默认值保留了原主题的默认文案；已有自定义内容需复制到相应字段，回退时可重新上传旧主题包并恢复保存的值。

## 关于页个人名片

在 `Settings → Design & branding → Theme → Site wide → About profile` 的一个文本框内填写 JSON；该字段占用一个自定义设置，主题总计 7 个：

```json
{
    "name": "Jaxson Wang",
    "title": "Web / Node.js 工程师",
    "avatarUrl": "your's photo"
}
```

## 文章评论

在 `Settings → Design & branding → Theme → Post → Comments twikoo env id` 填写 Brave 原来的 Twikoo 环境 ID 或完整服务地址。留空关闭评论。主题直接读取这个 custom 选项，按原有文章路径关联旧评论。

同一 Post 分组的 `Comments twikoo js url` 可填写客户端脚本地址，默认 Twikoo 1.6.34，与 Brave 原来的默认版本一致；请与服务端版本保持一致。两项均从 custom 读取，无需代码注入或初始化脚本。加载失败时显示提示。

输入框、按钮、评论列表及表情面板使用 Winner 的字体、直角边框和亮暗配色，自动模式随系统切换。接入约定参考 [Twikoo 官方文档](https://twikoo.js.org/quick-start.html)；设置数量限制见 [Ghost 官方文档](https://docs.ghost.org/themes/custom-settings)。

## 开发与验证

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm test:ci
pnpm zip
```

`pnpm zip` 生成 `winner.zip`，可直接从 Ghost Admin 的主题管理页面上传。

Ghost 接口与主题开发规范统一从 <https://docs.ghost.org/llms.txt> 查询。
