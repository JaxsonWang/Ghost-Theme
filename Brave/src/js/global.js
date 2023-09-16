/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：global.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

// 链接跳转
import { isScrollTop } from './utils'
import { initPopper } from './site-tooltip'

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

// 搜索在 iOS X5 存在问题，需要处理
const ua = window.navigator.userAgent
const isIPhoneAndIPad = /iPad|iPhone/i.test(ua)
const isWeChat = /MicroMessenger/i.test(ua)
const isMQQBrowser = /MQQBrowser/i.test(ua)

if (isIPhoneAndIPad && (isWeChat || isMQQBrowser)) {
  const searchBtn = document.querySelector('.event-ghost-search')
  searchBtn.removeAttribute('data-ghost-search')
  searchBtn.classList.add('event-disable-ghost-search')

  initPopper('.event-disable-ghost-search', '.event-tooltip-search')
}

const header = document.querySelector('.brave-header')
const addTopNav = () => {
  header.classList.add('top-header-nav')
}
const removeTopNav = () => {
  header.classList.remove('top-header-nav')
}
// 透明导航栏
isScrollTop() ? addTopNav() : removeTopNav()
// 监听滚动 - 透明导航栏
window.addEventListener('scroll', () => {
  isScrollTop() ? addTopNav() : removeTopNav()
})
