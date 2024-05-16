/*
 * Copyright (c) 2024 Jaxson Wang
 * Theme Name：Brave
 *  File Name：post-table-fixed.js
 *  Date：2025年05月16日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

document.querySelectorAll('.event-post-content table').forEach(block => {
  const newDiv = document.createElement('div')

  newDiv.className = 'brave-post-content-table'

  block.parentNode.insertBefore(newDiv, block)

  newDiv.appendChild(block)
})
