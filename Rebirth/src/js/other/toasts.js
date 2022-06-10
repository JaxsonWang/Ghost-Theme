import { formatTime } from '../untils/dateTime'

/**
 * 封装 BootStrap Toast 方法
 * @param $ jQuery 对象 必填
 * @param options toast 配置选项 选填
 */
const baseToast = ($, options) => {
  const timeTmp = new Date().valueOf() // 用于 Toast 唯一性
  const defaultOptions = {
    animation: true,
    autohide: true,
    delay: 2500
  }
  const toastId = options.id === undefined ? console.warn('未填写 Toast 节点ID') : options.id
  const toastContent = options.content === undefined ? console.warn('未填写 Toast 内容') : options.content
  const toastTime = options.time === undefined ? formatTime(new Date()) : formatTime(new Date(options.time))
  const toastOptions = options.config === undefined ? defaultOptions : options.config
  const toastParDom = '.toast-wrapper .toast-wrapper-list'
  const toastTemplate = `
<div id="${toastId + timeTmp}" class="toast toast-wrapper-list-item ${toastId}" role="alert" aria-live="assertive" aria-atomic="true">
  <div class="toast-header">
    <img src="/favicon.png" class="rounded mr-2" alt="site-logo">
    <strong class="mr-auto">${window.rebirth.name}</strong>
    <small>${toastTime}</small>
    <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="toast-body">${toastContent}</div>
</div>
`
  $(toastParDom).append(toastTemplate)
  $(`#${toastId + timeTmp}`)
    .toast(toastOptions)
    .toast('show')
    .on('hidden.bs.toast', function() {
      $(this).remove()
    })
}

export default baseToast
