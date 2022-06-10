const openSideBar = ($) => {
  $('.site-wrapper').toggleClass('toggled')
  $(event.currentTarget).hide(250)
  $('body').addClass('overflow-hidden').append('<div class="modal-backdrop fade show global-modal global-modal-click-close"></div>')
  $('.sidebar-container').addClass('boxshadow-right')
}

const closeSideBar = ($) => {
  $('.site-wrapper').toggleClass('toggled')
  $('.sidebar-toggler').show(250)
  $('body').removeClass('overflow-hidden')
  $('.sidebar-container').removeClass('boxshadow-right')
  $('.global-modal').remove()
}

/**
 * 菜单业务
 * @param window window对象
 * @param $ jQuery对象
 */
const menu = (window, $) => {
  // 移动端打开侧边栏
  $('.sidebar-toggler').click(event => {
    openSideBar($)
    $('.global-modal-click-close').bind('click', event => {
      closeSideBar($)
    })
  })
  $('.sidebar-close').click(event => {
    closeSideBar($)
    $('.global-modal-click-close').unbind()
  })
}

export default menu(window, window.jQuery)
