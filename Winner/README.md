# Winner

Winner 是为 [iiong.com](https://iiong.com) 制作的 Ghost 主题，视觉样式来自同级 `Winner/` 静态设计稿，并以官方 [TryGhost/Starter](https://github.com/TryGhost/Starter) 作为模板与构建骨架。

## Ghost 配置

主题直接读取 Ghost 后台内容：

- 站点标题：`Settings → General → Title`
- 站点简介：`Settings → General → Description`
- 顶部 Logo：`Settings → Design → Brand → Publication logo`（`@site.logo`）；未上传时显示站点标题。当前黑色透明 Logo 在暗色模式下反白显示。
- 首页主图：`Settings → Design → Brand → Publication cover`
- 顶部与底部菜单：`Settings → Navigation`
- 文章卡片、作者、标签、特色图片、阅读时间和前后文章均由 Ghost 模板上下文生成

## 关于页个人名片

在 `Settings → Design & branding → Theme → Site wide → About profile` 的一个文本框内填写 JSON；该字段占用一个自定义设置，主题总计 20 个：

```json
{"name":"Jaxson Wang","title":"Web / Node.js 工程师","avatarUrl":"https://cdn.iiong.com/2026/09/my.webp"}
```

`name` 是姓名，`title` 是职业，`avatarUrl` 是完整 HTTP(S) 照片网址。清空整个字段可关闭名片；三个字段均须为非空字符串，格式错误会在浏览器控制台明确报错。

名片仅用于 `/about/`：保留正文中标题为“简介”的二至四级标题，主题会把该标题及随后连续的普通段落排在左侧，名片排在右侧；下一个非段落内容块恢复通栏。900px 及以下改为上下排列。建议使用透明背景人像；桌面支持倾斜、反光和照片视差，触屏保留正常滚动，系统开启减少动态效果时关闭动画。

视觉效果按 [React Bits Profile Card](https://reactbits.dev/components/profile-card) 的原版图层与动画实现，包含 Geist 渐变字体、原版图案与颗粒纹理、鼠标平滑跟随及移出复位。字体和纹理随主题提供，React Bits 授权声明保留在 `assets/js/card-effects.js`，Geist 字体授权保留在 `assets/fonts/OFL-Geist.txt`。

## 开发与验证

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm test:ci
pnpm zip
```

`pnpm zip` 生成 `winner.zip`，可直接从 Ghost Admin 的主题管理页面上传。

Ghost 接口与主题开发规范统一从 <https://docs.ghost.org/llms.txt> 查询。
