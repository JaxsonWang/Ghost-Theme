import { loadScripts } from '../utils'

export default () => {
  loadScripts([
    {
      name: 'twikoo-js',
      path: 'https://cdn.jsdelivr.net/npm/twikoo@1.4.18/dist/twikoo.all.min.js'
    }
  ]).then(() => {
    const envId = 'twikoo-8gis88nx761b6095'
    window.twikoo.init({
      el: '#vcomments',
      envId: envId
    })
    // 加载评论数量
    const comments = document.querySelector('#twikoo_comments')
    if (comments !== null) {
      window.twikoo.getCommentsCount({
        envId: envId,
        urls: [window.location.pathname],
        includeReply: false
      }).then(response => {
        comments.innerText = response[0].count || 0
      }).catch(error => {
        console.error(error)
      })
    }
  })
}
