export const tooltip = (window) => {
  const $ = window.jQuery
  $('.site-tooltip').tooltip({
    html: true,
    template: '<div class="tooltip site-tooltip-wrapper" role="tooltip"><div class="arrow"></div><div class="tooltip-inner site-tooltip-wrapper-inner"></div></div>'
  })
}

export default tooltip(window)
