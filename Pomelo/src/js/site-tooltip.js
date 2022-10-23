/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：site-tooltip.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
import { createTooltip } from './utils/tooltip'

const button = document.querySelector('.event-tooltip')
const tooltip = document.querySelector('.pomelo-tooltip')

let popper = null

button.addEventListener('click', function () {
  if (tooltip.classList.contains('d-none')) {
    popper = createTooltip(button, tooltip)
    tooltip.classList.remove('fade-out', 'd-none')
    tooltip.classList.add('fade-in')

    // Enable the event listeners
    popper.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }]
    }))

    // 监听全局点击事件
    document.addEventListener('click', closePopper, true)
  }
})

function closePopper() {
  tooltip.classList.add('fade-out')
  tooltip.classList.remove('fade-in')
  setTimeout(() => {
    // 销毁当前 Popper
    popper.destroy()
    tooltip.classList.add('d-none')
  }, 250)
  document.removeEventListener('click', closePopper, true)
}
