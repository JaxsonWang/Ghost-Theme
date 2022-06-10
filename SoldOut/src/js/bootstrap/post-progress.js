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
      progress.style.strokeDashoffset = (max - (Math.abs((contentBox.top - midPoint) / contentBox.height) * max)).toString()
    }

    window.requestAnimationFrame(frameListening)
  }

  window.requestAnimationFrame(frameListening)
}

export default () => {
  readingProgress('.ha__main-article-content', '.reading-progress-circle')
}
