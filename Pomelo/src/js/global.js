/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：global.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

// 链接跳转
document.querySelectorAll('.event-post-content a').forEach(block => {
  if (block.getAttribute('href') !== null && !/^(#|javascript).*/.test(block.getAttribute('href'))) {
    block.setAttribute('target', '_blank')
  }
})

// 转换清单可视化
document.querySelectorAll('.event-post-content li').forEach(block => {
  if (/\[x]\s/gm.test(block.innerHTML)) {
    block.innerHTML = block.innerHTML.replace(
      /\[x]\s/gm,
      '<span class="todo-checkbox checked"></span><input type="checkbox" checked disabled class="todo-list-input checked"/>&nbsp;'
    )
    block.parentElement.classList.add('todo-list')
  }
  if (/\[\s]\s/gm.test(block.innerHTML)) {
    block.innerHTML = block.innerHTML.replace(
      /\[\s]\s/gm,
      '<span class="todo-checkbox"></span><input type="checkbox" disabled class="todo-list-input"/>&nbsp;'
    )
    block.parentElement.classList.add('todo-list')
  }
})
