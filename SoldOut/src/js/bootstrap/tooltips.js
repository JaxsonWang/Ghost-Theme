/**
 * 实例化 Bootstrap tooltips
 */

export default () => {
  const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
  tooltipTriggerList.map(tooltipTriggerEl => {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
      animation: true,
      delay: 100,
      html: true,
      container: 'body'
    })
  })
}
