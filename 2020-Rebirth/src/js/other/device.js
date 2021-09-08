import { debounce } from '../untils'

function getInnerWidth($) {
  const width = $(window).width()
  if (width <= 576) {
    $('body').addClass('mobile-content').removeClass('tablet-content', 'desktop-content')
    $('.post-content').addClass('mobile-content').removeClass('tablet-content', 'desktop-content')
  }
  if (width > 576 && width < 1200) {
    $('body').addClass('tablet-content').removeClass('mobile-content', 'desktop-content')
    $('.post-content').addClass('tablet-content').removeClass('mobile-content', 'desktop-content')
  }
  if (width >= 1200) {
    $('body').addClass('desktop-content').removeClass('tablet-content', 'mobile-content')
    $('.post-content').addClass('desktop-content').removeClass('tablet-content', 'mobile-content')
  }
}

const debounceWidth = debounce(() => {
  getInnerWidth(window.jQuery)
}, 100)

export const device = (window) => {
  const $ = window.jQuery
  getInnerWidth($)
  addEventListener('resize', (event) => {
    debounceWidth($)
  })
}

export default device(window)
