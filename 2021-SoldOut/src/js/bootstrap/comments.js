import { loadScripts } from '../utils'

export default () => {
  loadScripts([
    {
      name: 'twikoo-js',
      path: 'https://cdn.jsdelivr.net/npm/twikoo@1.4.18/dist/twikoo.all.min.js'
    }
  ]).then(() => {
    window.twikoo.init({
      el: '#vcomments',
      envId: 'twikoo-8gis88nx761b6095'
    })
  })
}
