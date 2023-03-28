/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：post-toc.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
import { loadScripts } from './utils'

if (document.querySelector('.event-article-toc') !== null) {
  loadScripts([
    {
      name: 'tocbot-js',
      path: 'https://npm.elemecdn.com/tocbot@4.20.1/dist/tocbot.min.js'
    }
  ]).then(() => {
    window.tocbot.init({
      tocSelector: '.event-article-toc',
      contentSelector: '.event-post-content',
      hasInnerContainers: true,
      headingsOffset: 100, // 标题识别偏移
      scrollSmoothOffset: -100 // 标题偏移
    })
  })
}
