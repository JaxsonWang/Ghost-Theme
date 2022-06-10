import { formatTime } from './utils'

/**
 * 封装 BootStrap Toast 方法
 * @param options toast 配置选项 选填
 */
const baseToast = (options) => {
  const timeTmp = new Date().valueOf() // 用于 Toast 唯一性
  const defaultOptions = {
    animation: true,
    autohide: true,
    delay: 5000
  }
  const toastId = options.key === undefined ? console.warn('未填写 Toast 节点 Key') : options.key
  const toastContent = options.content === undefined ? console.warn('未填写 Toast 内容') : options.content
  const toastTime = options.time === undefined ? formatTime(new Date()) : formatTime(new Date(options.time))
  const toastOptions = options.config === undefined ? defaultOptions : Object.assign(options.config, defaultOptions)
  const toastTemplate = `
<div class="toast-header">
    <img src="/favicon.png" class="rounded me-2" alt="site-logo">
    <strong class="me-auto">${window.soldOut.title}</strong>
    <small>${toastTime}</small>
    <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
</div>
<div class="toast-body">${toastContent}</div>
`
  const toastKey = toastId + timeTmp.toString()
  const toastParent = document.createElement('div')
  toastParent.id = toastKey
  toastParent.className = `toast mb-3 toast-wrapper-item ${toastId}`
  toastParent.setAttribute('role', 'alert')
  toastParent.setAttribute('aria-live', 'assertive')
  toastParent.setAttribute('aria-atomic', 'true')
  toastParent.innerHTML = toastTemplate
  if (document.querySelector('.toast-wrapper') === null) {
    const toastWrapper = document.createElement('div')
    toastWrapper.className = 'toast-wrapper'
    document.querySelector('body').appendChild(toastWrapper)
  }
  document.querySelector('.toast-wrapper').appendChild(toastParent)
  const toastKeyDom = document.getElementById(toastKey)
  const toast = new bootstrap.Toast(toastKeyDom, toastOptions)
  toast.show()
  // 移除dom
  toastKeyDom.addEventListener('hidden.bs.toast', () => toastKeyDom.remove())
}

export default baseToast
