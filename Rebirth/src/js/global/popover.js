export const popover = (window) => {
  const $ = window.jQuery
  $('.site-popover').popover({
    html: true,
    template: `<div class="popover site-popover-wrapper" role="tooltip"><div class="arrow"></div><h3 class="popover-header site-popover-wrapper-header"></h3><div class="popover-body site-popover-wrapper-body"></div></div>`
  })
}

export default popover(window)
