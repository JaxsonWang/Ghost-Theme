/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：tooltip.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
export const createTooltip = (button, tooltip) =>
  window.Popper.createPopper(button, tooltip, {
    placement: 'top',
    modifiers: [
      {
        name: 'offset',
        options: {
          offset: [0, 8]
        }
      }
    ]
  })
