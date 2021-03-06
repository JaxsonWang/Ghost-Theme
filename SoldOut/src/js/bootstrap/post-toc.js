import { loadScripts } from '../utils'

export default () => {
  if (document.querySelector('.ha__article-sidebar .toc') !== null) {
    loadScripts([
      {
        name: 'tocbot-js',
        path: 'https://lib.baomitu.com/tocbot/4.18.2/tocbot.min.js'
      }
    ]).then(() => {
      window.tocbot.init({
        tocSelector: '.ha__article-sidebar .toc',
        contentSelector: '.ha__main-article-content',
        hasInnerContainers: true,
        headingsOffset: 100, // 标题识别偏移
        scrollSmoothOffset: -100 // 标题偏移
      })
    })
  }
}
