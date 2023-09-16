/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：post-to-top-progress.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

const readingProgress = (contentArea, progressBar) => {
  const content = document.querySelector(contentArea)
  const progress = document.querySelector(progressBar)
  const max = 157.08
  if (content === null || progress === null) return

  const frameListening = () => {
    const contentBox = content.getBoundingClientRect()
    const midPoint = window.innerHeight / 2

    if (contentBox.top > midPoint) {
      progress.style.strokeDashoffset = max.toString()
    }

    if (contentBox.top < midPoint) {
      progress.style.strokeDashoffset = '0'
    }

    if (contentBox.top <= midPoint && contentBox.bottom >= midPoint) {
      progress.style.strokeDashoffset = (
        max -
        Math.abs((contentBox.top - midPoint) / contentBox.height) * max
      ).toString()
    }

    window.requestAnimationFrame(frameListening)
  }

  window.requestAnimationFrame(frameListening)
}

readingProgress('.event-post-content', '.event-reading-progress-circle')
