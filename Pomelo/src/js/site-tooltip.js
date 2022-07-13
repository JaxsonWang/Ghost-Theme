/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 * File Name：site-tooltip.js
 * Date：2022年07月13日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
 */
import { computePosition, offset, flip, shift, arrow } from '@floating-ui/dom'

const button = document.querySelector('.event-tooltip')
const tooltip = document.querySelector('.pomelo-tooltip')
const arrowElement = document.querySelector('.pomelo-tooltip-arrow')

function update() {
  computePosition(button, tooltip, {
    placement: 'bottom',
    middleware: [offset(6), flip(), shift({ padding: 5 }), arrow({ element: arrowElement })]
  }).then(({ x, y, placement, middlewareData }) => {
    Object.assign(tooltip.style, {
      left: `${x}px`,
      top: `${y}px`
    })

    // Accessing the data
    const { x: arrowX, y: arrowY } = middlewareData.arrow

    const staticSide = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right'
    }[placement.split('-')[0]]

    Object.assign(arrowElement.style, {
      left: arrowX != null ? `${arrowX}px` : '',
      top: arrowY != null ? `${arrowY}px` : '',
      right: '',
      bottom: '',
      [staticSide]: '-4px'
    })
  })
}

function showTooltip() {
  tooltip.style.display = 'block'
  update()
}

function hideTooltip() {
  tooltip.style.display = ''
}

const eventList = [
  ['mouseenter', showTooltip],
  ['mouseleave', hideTooltip]
]

eventList.forEach(([event, listener]) => {
  button.addEventListener(event, listener)
})
