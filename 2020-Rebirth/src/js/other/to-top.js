export const toTop = (window) => {
  const $ = window.jQuery
  const returnTop = $('.click-to-top')
  if ($(this).scrollTop() >= 50) {
    returnTop.addClass('bounceInRight').removeClass('bounceOutDown')
  } else {
    returnTop.removeClass('bounceInRight').addClass('bounceOutDown')
  }
  $(window).scroll(function() {
    if ($(this).scrollTop() >= 50) {
      returnTop.addClass('bounceInRight').removeClass('bounceOutDown')
    } else {
      returnTop.removeClass('bounceInRight').addClass('bounceOutDown')
    }
  })
  returnTop.click(function() {
    $('body, html').animate({
      scrollTop: 0
    }, 500)
  })
}

export default toTop(window)
