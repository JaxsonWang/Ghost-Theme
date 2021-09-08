import { loadScripts } from '../utils'

export default () => {
  loadScripts([
    {
      name: 'waline-js',
      path: 'https://cdn.jsdelivr.net/npm/@waline/client@1.3.3/dist/Waline.min.js'
    }
  ]).then(() => {
    new Waline({
      el: '#vcomments',
      serverURL: 'https://comments.iiong.com',
      avatar: '',
      visitor: true,
      highlight: true,
      recordIP: true,
      path: window.location.pathname,
      meta: ['nick', 'mail', 'link'],
      requiredMeta: [],
      login: 'enable',
      dark: 'body.dark',
      pageSize: 10,
      lang: 'zh-CN',
      emoji: [
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/weibo',
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/alus',
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/qq',
        'https://cdn.jsdelivr.net/gh/walinejs/emojis@1.0.0/tieba'
      ],
      locale: {
        placeholder: '请您理智发言，共建美好社会！'
      }
    })
  })
}
