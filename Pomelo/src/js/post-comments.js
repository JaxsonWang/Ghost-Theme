/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：post-to-top-progress.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
import { loadScripts } from './utils'

const comments = document.querySelector('#vcomments')
const envId = window.__gost_twikoo_env_id

if (comments && envId) {
  loadScripts([
    {
      name: 'twikoo-js',
      path: 'https://cdn.staticfile.org/twikoo/1.6.7/twikoo.all.min.js'
    }
  ]).then(() => {
    window.twikoo.init({
      el: '#vcomments',
      envId: envId
    })
    // 加载评论数量
    const comments = document.querySelector('#twikoo_comments')
    if (comments !== null) {
      window.twikoo
        .getCommentsCount({
          envId: envId,
          urls: [window.location.pathname],
          includeReply: false
        })
        .then(response => {
          comments.innerText = response[0].count || 0
        })
        .catch(error => {
          console.error(error)
        })
    }
  })
}
