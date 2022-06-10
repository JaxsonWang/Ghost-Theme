import { isScrollTop, addTopNav, removeTopNav } from '../untils'

const navBar = (window, $) => {
  // 初始化顶栏透明
  isScrollTop($) ? addTopNav($) : removeTopNav($)
  // 滚动顶栏透明
  $(window).scroll(() => {
    isScrollTop($) ? addTopNav($) : removeTopNav($)
  })
}

export default navBar(window, window.jQuery)
