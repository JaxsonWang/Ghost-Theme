import { loadScripts } from '../utils'

export default () => {
  loadScripts([
    {
      name: 'twikoo-js',
      path: 'https://lib.baomitu.com/twikoo/1.5.11/twikoo.all.min.js'
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
