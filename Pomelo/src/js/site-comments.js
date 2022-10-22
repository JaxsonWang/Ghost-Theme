/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：site-comments.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
// site-comments.js

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
  const siteComments = document.querySelector('#ghost-comments-root')
  console.log(siteComments, window.matchMedia('(prefers-color-scheme: dark)').matches)
})
