# Ghost Theme - Sold Out

2021年，您好！

这是一份 Ghost 主题。

> 偏向于程序员习惯的主题，普通用户请慎重考虑后再使用！

### 特色

正在编写

### 更新日志

[参考 CHANGELOG](./ChangeLog.md)

### 使用注意

**模板变量注入：**

先安装依赖：

```bash
npm i # 或者 yarn install
```


使用该主题之前需要先配置相关环境，请将目录下的 `site.config.example.js` 重命名为 `site.config.js` 并且配置你所需要的变量：


填写后，执行 `npm run build` 或者 `yarn build` 得到 `sold-out` 文件夹压缩后上传网站即可。

关于统计请在 `Ghost Admin` 的 `code-injection` 添加。

**友情链接模板使用：**

使用 Markdown 编写链接信息，格式如下：

```markdown
- 博客名|[博客地址](博客地址)|头像地址|博客简介
- 淮城一只猫|[https://iiong.com](https://iiong.com)|https://gravatar.loli.net/avatar/4f6d6e259391f7b3d3ae8335a8cafeed|永远年轻，永远热泪盈眶！
```

请注意：博客地址需要渲染超链接，不然这是 SEO 问题。

**网易云音乐支持：**

打开你的网易云音乐分享后的歌单（必须是歌单，带有 `playlist` 参数的歌单！）得到的链接如下：

`https://music.163.com/#/my/m/music/playlist?id=5392087441` 

得到他的 `id` 后在 `code-injection` 添加：

```javascript
window.SoldOutConfigMusicPlayerList = '5392087441'
```

**更新：**

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

> `yarn build` 生成目录在 `sold-out` 下面，只需要把里面的所有文件上传到你的服务器即可。

### 浏览器兼容

| [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt="IE / Edge" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>IE / Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Safari | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/opera/opera_48x48.png" alt="Opera" width="24px" height="24px" />](http://godban.github.io/browsers-support-badges/)</br>Opera |
| --- | --- | --- | --- | --- |
| Edge | last 2 versions | last 2 versions | last 2 versions | last 2 versions |

> 已抛弃 IE ，万恶的 IE 阻滞前端的发展！


### License

Ghost Theme Sold Out is open source and released under the MIT License.
