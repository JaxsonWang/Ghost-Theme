/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 * File Name：site-to-top.js
 * Date：2022年07月13日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
 */
import { getScrollTop } from './utils'

let scrollTimer = null

const toTopEle = document.querySelector('.brave-to-top')

const setScrollTop = delay => {
  if (toTopEle === null) return
  // 清除定时器: 防止滚动定时器在该显示的时候出现消失的情况
  if (scrollTimer !== null) clearTimeout(scrollTimer)
  if (getScrollTop() >= 50) {
    toTopEle.classList.remove('fade-out-down', 'd-none')
    toTopEle.classList.add('fade-in-right')
  } else {
    toTopEle.classList.add('fade-out-down')
    toTopEle.classList.remove('fade-in-right')

    delay ? toTopEle.classList.add('d-none') : (scrollTimer = setTimeout(() => toTopEle.classList.add('d-none'), 500))
  }
}

// 判断当前滚动高度
setScrollTop(true)
// 监听滚动事件
window.addEventListener('scroll', () => {
  setScrollTop(false)
})

// 点击按钮回到顶部
toTopEle?.addEventListener('click', function () {
  document.body.scrollIntoView({
    behavior: 'smooth'
  })
})
