/**
 * 搜索业务
 * @param window window对象
 * @param $ jQuery对象
 */
const search = (window, $) => {
  $('.click-search').click((event) => {
    $('body').addClass('overflow-hidden').append('<div class="modal-backdrop fade show global-modal global-modal-pc-search"></div>')
    // 移除搜索界面隐藏样式
    $('.search-wrapper').show(250)
  })

  $('.click-search-close').click((event) => {
    $('body').removeClass('overflow-hidden')
    // 移除搜索界面隐藏样式
    $('.search-wrapper').hide(250)
    // 移除全局遮罩层
    $('.global-modal-pc-search').remove()
  })
}

export default search(window, window.jQuery)
