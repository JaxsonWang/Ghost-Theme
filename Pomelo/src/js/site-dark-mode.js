/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：site-dark-mode.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
import { createTooltip } from './utils/tooltip'

const button = document.querySelector('.event-tooltip')
const tooltip = document.querySelector('.pomelo-tooltip')

const popperInstance = createTooltip(button, tooltip)

button.addEventListener('click', () => {
  if (tooltip.classList.contains('d-none')) {
    tooltip.classList.remove('fade-out', 'd-none')
    tooltip.classList.add('fade-in')

    // Enable the event listeners
    popperInstance.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: true }]
    }))
  } else {
    tooltip.classList.add('fade-out')
    tooltip.classList.remove('fade-in')
    // Disable the event listeners
    popperInstance.setOptions(options => ({
      ...options,
      modifiers: [...options.modifiers, { name: 'eventListeners', enabled: false }]
    }))

    setTimeout(() => tooltip.classList.add('d-none'), 500)
  }
})
