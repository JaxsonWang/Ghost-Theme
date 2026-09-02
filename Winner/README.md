# Winner

Winner 是为 [iiong.com](https://iiong.com) 制作的 Ghost 主题，视觉样式来自同级 `Winner/` 静态设计稿，并以官方 [TryGhost/Starter](https://github.com/TryGhost/Starter) 作为模板与构建骨架。

## Ghost 配置

主题直接读取 Ghost 后台内容：

- 站点标题：`Settings → General → Title`
- 站点简介：`Settings → General → Description`
- 首页主图：`Settings → Design → Brand → Publication cover`
- 顶部与底部菜单：`Settings → Navigation`
- 文章卡片、作者、标签、特色图片、阅读时间和前后文章均由 Ghost 模板上下文生成

## 开发与验证

```bash
pnpm install --frozen-lockfile
pnpm dev
pnpm test:ci
pnpm zip
```

`pnpm zip` 生成 `winner.zip`，可直接从 Ghost Admin 的主题管理页面上传。

Ghost 接口与主题开发规范统一从 <https://docs.ghost.org/llms.txt> 查询。
