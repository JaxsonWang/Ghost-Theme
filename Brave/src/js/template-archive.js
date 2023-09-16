/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：site-archive.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
document.addEventListener('DOMContentLoaded', function () {
  if (document.querySelector('.custom-archive-for-page')) {
    const currentPage = parseInt(document.querySelector('.brave-pagination-current-page').innerText, 10)
    const limit = parseInt(document.querySelector('.brave-pagination-limit-pages').innerText, 10)
    document.querySelectorAll('.custom-archive-for-page-item').forEach(element => {
      const number = parseInt(element.getAttribute('number'), 10)
      element.setAttribute('number', currentPage * limit - limit + number)
    })
  }
})
