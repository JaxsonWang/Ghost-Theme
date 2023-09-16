/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：post-zooming.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

import { loadScripts } from './utils'

const zooming = () => {
  return new Promise(resolve => {
    loadScripts([
      {
        name: 'zooming-js',
        path: 'https://npm.elemecdn.com/zooming@2.1.1/build/zooming.min.js'
      }
    ]).then(() => {
      const zooming = new window.Zooming()
      zooming.config({
        bgColor: document.querySelector('html').classList.contains('dark') ? '#1e1e1e' : '#fff',
        zIndex: 1040,
        scaleBase: 1
      })
      resolve(zooming)
    })
  })
}

zooming().then(zooming => {
  zooming.listen('.brave-post-content img')
})
