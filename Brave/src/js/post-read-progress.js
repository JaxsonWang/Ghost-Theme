/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：post-read-progress.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

const progressBar = document.querySelector('.event-reading-progress')

if (progressBar) requestAnimationFrame(updateProgress)

function updateProgress() {
  const max = 100
  const midPoint = window.innerHeight / 2
  const contentBox = document.querySelector('.event-post-content').getBoundingClientRect()
  const progress = ((contentBox.top - midPoint) / contentBox.height) * max
  progressBar.setAttribute('value', progress > 0 ? 0 : Math.abs(progress))
  requestAnimationFrame(updateProgress)
}
