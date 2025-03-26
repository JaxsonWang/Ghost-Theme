ghost docs: https://ghost.org/docs/themes/

tailwindcss docs: https://tailwindcss.com/docs/

icon: https://ant.design/components/icon/

icon: https://remixicon.com/

search: https://forum.ghost.org/t/is-it-possible-to-disable-jsdelivr-cdn/31761/6


https://github.com/TryGhost/Ghost/blob/c667620d8f2e32c96fe376ad0f3dabc79488532a/ghost/core/core/shared/config/defaults.json

---

> 执行 `gscan` 检查主题的时候先要 `npm run build` 生成生产主题才能进行检查主题

---

打开 `config.production.json` 添加下列字段

```json
{
  "portal": {
    "url": false
  },
  "sodoSearch": {
    "url": "/assets/sodo-search.min.js",
    "styles": "/assets/sodo-search.min.css",
    "version": "1.0.0"
  },
  "comments": {
    "url": false
  },
  "gravatar": {
    "url": "https://gravatar.loli.net/avatar/{hash}?s={size}&r={rating}&d={_default}"
  }
}
```
