import { getScrollTop } from '../utils'

let scrollTimer = null

export default () => {
  // 判断当前滚动高度
  setScrollTop(true)
  // 监听滚动事件
  window.addEventListener('scroll', () => {
    setScrollTop(false)
  })
  // 点击按钮回到顶部
  if (document.querySelector('.ha__main-to-top') === null) return
  document.querySelector('.ha__main-to-top').onclick = () => {
    document.body.scrollIntoView({
      behavior: 'smooth'
    })
  }
}

function setScrollTop(once) {
  if (document.querySelector('.ha__main-to-top') === null) return
  // 清除定时器: 防止滚动定时器在该显示的时候出现消失的情况
  if (scrollTimer !== null) clearTimeout(scrollTimer)
  if (getScrollTop() >=50) {
    document.querySelector('.ha__main-to-top').classList.remove('fade-out-down', 'd-none')
    document.querySelector('.ha__main-to-top').classList.add('fade-in-right')
  } else {
    document.querySelector('.ha__main-to-top').classList.add('fade-out-down')
    document.querySelector('.ha__main-to-top').classList.remove('fade-in-right')

    once ? document.querySelector('.ha__main-to-top').classList.add('d-none') : scrollTimer = setTimeout(() => document.querySelector('.ha__main-to-top').classList.add('d-none'), 500)
  }
}
