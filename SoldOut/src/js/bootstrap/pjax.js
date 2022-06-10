import tooltips from './tooltips'
import prism from './prism'
import toTop from './to-top'
import progress from './post-progress'
import toc from './post-toc'
import pagination from './pagination'
import templateLinks from './template-links'
import postShare from './post-share'
import comments from './comments'
import global from './global'
import zoomImage from './post-image'

export const pjax = new Pjax({
  elements: 'a[href]:not([href^="#"])',
  debug: false,
  cacheBust: false,
  history: true,
  selectors: [
    'title',
    'main.ha__main',
    '.ha__header-navbar .navbar-nav',
    '.ha__footer .ha__footer-nav'
  ]
})

export default () => {
  // 在Pjax请求开始后触发
  document.addEventListener('pjax:send', () => {
    // 禁止滚动
    document.body.classList.add('overflow-hidden')
    // 添加 loading
    const loadingEle = document.createElement('div')
    loadingEle.classList = 'ha__loading position-fixed d-flex flex-column justify-content-center align-items-center animated fade-in'
    loadingEle.innerHTML = `<img src="https://img.alicdn.com/imgextra/i2/2038135983/O1CN01iNJJGW1u4GJGUIqhY_!!2038135983.gif" class="loading-image" alt="loading image"><div class="loading-text">正在加载数据中...</div>`
    document.body.appendChild(loadingEle)
  })

  // 在Pjax请求完成后触发，无论失败还是成功
  document.addEventListener('pjax:complete', event => {
    global()
    zoomImage()
    comments()
    pagination()
    postShare()
    prism()
    toTop()
    progress()
    toc()
    tooltips()
    templateLinks()

    // 加载页面搜索界面打开的问题
    const searchDom = document.querySelector('.ha__search')
    if (searchDom !== null && !searchDom.classList.contains('d-none')) searchDom.classList.add('d-none')
    // 删除已存在的 tooltips 元素
    const tooltipsList = [].slice.call(document.querySelectorAll('.tooltip.show'))
    if (tooltipsList.length !== 0) tooltipsList.forEach(block => block.remove())
    // 修复移动端打开页面菜单打开的问题
    const mobileNav = document.querySelector('.navbar-toggler')
    if (mobileNav.getAttribute('aria-expanded') === 'true') mobileNav.click()
    // // support 百度统计 / google analytics
    if (typeof _hmt !== 'undefined') _hmt.push(['_trackPageview', location.pathname + location.search])
    if (typeof ga !== 'undefined') ga('send', 'pageview', location.pathname + location.search)
    // header meta 信息替换
    document.head.querySelectorAll('meta').forEach(block => block.remove())
    if (document.head.querySelector('script[type="application/ld+json"]') !== null) document.head.querySelector('script[type="application/ld+json"]').remove()
    if (document.head.querySelector('link[rel="amphtml"]') !== null) document.head.querySelector('link[rel="amphtml"]').remove()
    const tempEle = document.createElement('div')
    tempEle.innerHTML = event.request.responseText.match(/<head[^>]*>([\s\S]*)<\/head>/)[1]
    tempEle.querySelectorAll('meta').forEach(block => document.head.appendChild(block))
    if (tempEle.querySelector('script[type="application/ld+json"]') !== null) document.head.appendChild(tempEle.querySelector('script[type="application/ld+json"]'))
    if (tempEle.querySelector('link[rel="amphtml"]') !== null) document.head.appendChild(tempEle.querySelector('link[rel="amphtml"]'))
    // 移除 loading 动画
    setTimeout(() => {
      document.querySelector('.ha__loading').classList.remove('fade-in')
      document.querySelector('.ha__loading').classList.add('fade-out')
      // 解锁滚动
      document.body.classList.remove('overflow-hidden')
    }, 1000)
    setTimeout(() => document.querySelector('.ha__loading').remove(), 1600)
  })

  // 在Pjax请求成功后触发
  document.addEventListener('pjax:success', () => {
  })

  // Pjax请求失败后触发
  document.addEventListener('pjax:error', () => {
  })
}
