# Winner 项目约定

本文件适用于 `Winner/` 及其子目录，补充全局工程规则。下文路径相对 `Winner/`；Git 仓库根目录是上一级 `themes/`。默认修改范围限于本主题，不连带修改同级主题、Ghost 核心或站点数据。

## 项目与入口

- Winner 是面向 Ghost 6.x 的中文博客主题，使用 Handlebars 模板、原生 JavaScript 和 CSS；Node.js 用于构建与测试，浏览器代码不能使用 Node.js 内置模块。
- 使用 `package.json` 的 `packageManager` 指定的 pnpm 版本，依赖版本以 `package.json` 和 `pnpm-lock.yaml` 为准。不要混用其他包管理器或顺带升级依赖。
- 构建链为 Rollup、Babel、PostCSS 和 Terser，配置见 `rollup.config.js`。新增模块须接入实际入口；文件放进资源目录不会自动参与打包。

| 位置 | 职责 |
| --- | --- |
| `default.hbs` | 页面骨架、资源加载、主题模式预设、导航及页脚 |
| `index.hbs`、`post.hbs`、`page.hbs`、`tag.hbs`、`author.hbs`、`archives.hbs` | 首页、文章、独立页面及列表模板 |
| `custom-links-for-page.hbs`、`assets/js/links.js` | 友链页面及内容解析 |
| `partials/`、`members/` | 共用模板片段及会员页面 |
| `assets/css/index.css` | 样式入口、设计变量、布局及亮暗主题；按需导入组件样式 |
| `assets/js/index.js` | 脚本入口、主题切换、搜索样式、目录及功能初始化 |
| `assets/js/` 中被入口导入的模块 | 语法高亮、标题动效、背景、卡片和关于页名片 |
| `assets/built/index.css`、`assets/built/index.js` | Ghost 页面实际加载的构建产物 |
| `package.json`、`test/` | Ghost 主题配置、开发命令和回归测试 |

## 修改约定

- 修改前沿相关模板、入口导入、DOM 选择器和样式追踪实际使用路径；不能因 `assets/` 下存在某个文件就认定它已加载。
- 内容、导航、作者、标签和图片继续从 Ghost 上下文读取，站点设置使用 `@site`，主题设置使用 `@custom`。保留 `{{ghost_head}}`、`{{ghost_foot}}`、正文输出及 Ghost 内容卡片所需结构。
- 涉及 Ghost helper、模板上下文或主题配置契约时，从 [Ghost 官方文档索引](https://docs.ghost.org/llms.txt) 查阅对应条目；现有站点用法见 `README.md`。
- 沿用现有纸刊排版、蓝色强调色和 CSS 变量，同时维护亮色、暗色及跟随系统模式。主题状态涉及 `default.hbs` 的提前初始化、`assets/js/index.js` 和 `assets/css/index.css`，修改时保持三者一致。
- 优先复用现有模块及原生 DOM、CSS、WebGL；移植视觉效果时不额外引入前端框架。保留键盘操作、焦点状态、触屏滚动和 `prefers-reduced-motion` 行为。
- 复用 `partials/picture.hbs` 及已配置的图片尺寸处理适用的内容图片。字体、纹理和第三方效果随主题交付时保留授权声明，包括 `assets/js/card-effects.js` 和 `assets/fonts/OFL-Geist.txt`。
- 保持当前文件的排版风格并遵循 `.editorconfig`，不为局部改动重排整份文件。

## 自定义设置与关于页名片

- `package.json` 的 `config.custom` 当前有 20 项，已达到现有 GScan 校验上限。新增可配置行为前检查现有设置，避免直接增加第 21 项。
- `about_profile` 使用一个 JSON 文本设置承载 `name`、`title`、`avatarUrl`；整项留空关闭名片，其余情况按 `assets/js/profile-card.js` 校验，照片地址只接受 HTTP(S)。解析失败须明确报错。
- 名片仅用于 slug 为 `about` 的页面：将“简介”二至四级标题及其后连续普通段落放在名片旁，下一个非段落内容块恢复通栏。修改结构、字段或行为时同步更新 `README.md` 和 `test/profile-card.test.js`。
- 配置中的展示文本通过 `textContent` 写入 DOM，不拼接为 HTML；不要绕过现有字段和 URL 校验。

## 开发与验证

以下命令均在 `Winner/` 中执行：

| 命令 | 用途 |
| --- | --- |
| `pnpm install --frozen-lockfile` | 按锁文件安装依赖 |
| `pnpm dev` | 监听资源并启用 LiveReload；不会启动 Ghost 服务，页面需通过实际 Ghost 实例查看 |
| `pnpm build` | 生成生产 CSS 和 JavaScript |
| `pnpm test:ci` | 运行全部六组回归测试、生产构建和打包，再检查 Ghost 致命兼容性问题 |
| `pnpm exec gscan --verbose .` | 查看完整主题兼容性检查结果 |
| `pnpm zip` | 重新构建并生成可上传到 Ghost Admin 的 `winner.zip` |

- 局部逻辑验证按需运行 `pnpm test:links`、`pnpm test:syntax`、`pnpm test:depth`、`pnpm test:fibers`、`pnpm test:cards` 或 `pnpm test:profile`。
- 现有测试使用 Node.js 的 `node:assert/strict`。非平凡逻辑变更补充对应回归断言，覆盖实际行为；被测试导入的模块不要在导入时执行浏览器 DOM 操作。当前没有独立 lint 或类型检查脚本，不虚构检查命令。
- 模板、样式、脚本或构建配置改动完成后运行 `pnpm test:ci`；它已包含构建与打包，成功后无需机械重复。UI 改动还应通过实际 Ghost 页面检查受影响的布局、断点、主题模式和交互。
- 仅文档改动核对引用路径、命令及 `git diff --check` 即可。报告实际执行的检查；没有浏览器或 Ghost 实例时明确说明未完成页面验证，不以构建成功代替运行验证。

## 构建产物与 Git

- 修改 `assets/css/`、`assets/js/` 的源文件后重新构建，并随源码提交对应的 `assets/built/index.css`、`assets/built/index.js`；不要直接修改压缩产物。
- 仓库根 `.gitignore` 已忽略 `*.map`。Source map 可以本地生成和保留，不跟踪、不强制添加到 Git；不要因忽略上传而擅自关闭本地 source map 生成。
- `winner.zip`、`node_modules/` 等已忽略产物保持本地使用。提交前检查完整差异及 `git status`，只纳入当前任务相关文件。
