ghost docs: https://ghost.org/docs/themes/

tailwindcss docs: https://tailwindcss.com/docs/

icon: https://ant.design/components/icon/

icon: https://remixicon.com/

search: https://forum.ghost.org/t/is-it-possible-to-disable-jsdelivr-cdn/31761/6


https://github.com/TryGhost/Ghost/blob/c667620d8f2e32c96fe376ad0f3dabc79488532a/ghost/core/core/shared/config/defaults.json

---

打开 `config.production.json` 添加下列字段

```json
{
  "portal": {
    "url": "https://你的博客地址/assets/portal.min.js",
    "version": "2.3.0"
  },
  "sodoSearch": {
    "url": "https://你的博客地址/assets/sodo-search.min.js",
    "styles": "https://你的博客地址/assets/sodo-search.min.css",
    "version": "1.0.0"
  },
  "comments": {
    "url": "https://你的博客地址/assets/comments-ui.min.js",
    "styles": "https://你的博客地址/assets/comments-ui.min.css",
    "version": "0.10"
  },
  "gravatar": {
    "url": "https://gravatar.loli.net/avatar/{hash}?s={size}&r={rating}&d={_default}"
  }
}
```

发件配置：https://ghost.org/docs/config/#mail