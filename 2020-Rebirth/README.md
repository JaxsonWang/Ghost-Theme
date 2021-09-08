# Ghost Theme - Rebirth

2020年，加油武汉!

这是一份 Ghost 主题。

> 偏向于程序员习惯的主题，普通用户请慎重考虑后再使用！

### 特色

- 大气、简约、优雅以及强大的响应式布局
- 站内搜索，无需第三方扩展，利用 Ghost Api 实现搜索功能
- 原生黑暗模式，支持 macOS 和 window10 黑暗模式，风格和 Ghost Admin 黑暗风格统一
- 俩种风格文章模板，全宽和含有文章目录的模板
- 友情链接和关于独立页独特模板，更好展示自己站点
- 恰到好处的个人社交信息
- 适合于中文字体阅读个人文章页面，优化到每一个元素
- Valine 评论系统的支持
- 强大的社交分享文章功能
- 增强模板 SEO 优化
- ...更多功能等你来体验

### 更新日志

[参考 CHANGELOG](./CHANGELOG.md)

### 使用注意

先安装依赖：

```bash
npm i # 或者 yarn install
```


使用该主题之前需要先配置相关环境，请将目录下的 `site.config.example.json` 重命名为 `site.config.json` 并且配置你所需要的变量：

> 出现【必填】 关键词选项请填写，否则会出现模板渲染错误问题！

```bash
"ghostSearchKey": "Ghost Content Api Key 获取参考文档：https://ghost.org/docs/api/v3/content/#key ——必填",
"leanCloudAppId": "Valine 评论系统 AppID 获取参考文档：https://valine.js.org/quickstart.html ——必填",
"leanCloudAppKey": "Valine 评论系统 AppKey 获取参考文档：https://valine.js.org/quickstart.html ——必填",
"leanCloudServerURL": "Valine 域名绑定 文档参考：https://valine.js.org/configuration.html#serverURLs ——必填",
"aliPayQRImageUrl": "支付宝收款二维码 ——必填",
"weChatPayQRImageUrl": "微信收款二维码 ——必填",
"siteUrl": "网站首页地址，用于个性化配置 ——必填",
"siteHomeTitle": "首页头部展示词 ——必填",
"siteHomeLogoSvg": "首页头部Logo，请使用 SVG 图片，不填为空",
"siteCdnUrl": "网站静态资源分发，也是 Ghost storage 绑定分发。该选项可以默认为空",
"siteKeyWords": "网站关键词 ——必填",
"siteICPNumber": "ICP备案号超链接",
"siteGAICPNumber": "公安备案号超链接，不填为空",
"siteFooterOther": "页脚超链接信息",
"siteFooterSentence": "页脚一句",
"siteSocialQQLink": "社交QQ链接 ——必填",
"siteSocialQQTip": "社交QQ提示 ——必填",
"siteSocialWeChatQRUrl": "微信二维码URL地址 ——必填",
"siteSocialWeiboLink": "社交微博链接 ——必填",
"siteSocialWeiboTip": "社交微博提示 ——必填",
"siteSocialGithubLink": "社交Github链接 ——必填",
"siteSocialGithubTip": "社交Github提示 ——必填"
"siteToastsId": "弹窗ID唯一，字符串组合 ——必填",
"siteToastsContent": "弹窗内容 ——必填",
"siteToastsTime": "弹窗时间，例如2020-02-08T14:45:00，注意有个日期和时间中间有个【T】 ——必填",
"siteTagsFilterNav": "标签云展示忽略的标签名称",
"siteAboutName": "关于个人的模板 - 个人姓名",
"siteAboutEmail": "关于个人的模板 - 个人邮箱",
"siteAboutPosition": "关于个人的模板 - 个人职位",
"siteAboutWebsite": "关于个人的模板 - 个人网站",
"siteAboutHello": "关于个人的模板 - 招呼语"
```

填写后，执行 `npm run build` 或者 `yarn build` 得到 `dist` 文件夹，上传网站即可。

关于统计请在 `Ghost Admin` 的 `code-injection` 添加。

**友情链接模板使用：**

使用 Markdown 编写链接信息，格式如下：

```markdown
- 博客名|[博客地址](博客地址)|头像地址|博客简介
- 淮城一只猫|[https://iiong.com](https://iiong.com)|https://gravatar.loli.net/avatar/4f6d6e259391f7b3d3ae8335a8cafeed|永远年轻，永远热泪盈眶！
```

请注意：博客地址需要渲染超链接，不然这是 SEO 问题。

**更新**

只需要支持命令：

```bash
git pull
```

拉取最新文件，然后重新编译打包上传网站即可。

### 开发命令

```bash
yarn install / npm install # 安装依赖
yarn serve / npm run serve # 启动开发服务
yarn build / npm run build # 编译 Ghost 可用主题
```

> 注意：启动 `yarn serve` 时需要启动 `Ghost` 服务。该服务只会监听文件生成静态资源，不会额外启动服务器。

> `yarn build` 生成目录在 `dist` 下面，只需要把里面的所有文件上传到你的服务器即可。

### 浏览器兼容

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

> 已抛弃 IE ，万恶的 IE 阻滞前端的发展！

### 其他

[Ghost Rebirth Pjax 版本](https://github.com/JaxsonWang/Rebirth/tree/ghost-theme-pjax) - 已停止维护

[静态页](https://github.com/JaxsonWang/rebirth/tree/state-page)

[Typecho 主题](https://github.com/JaydenForYou/Spring)

### License

Ghost Theme Rebirth is open source and released under the MIT License.
