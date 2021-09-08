export const contentProgress = (window) => {
  const content = window.document.querySelector('.article-main')

  if (content === null) return false

  const progress = window.document.querySelector('.reading-progress-bar')

  if (progress === null) return false

  const progressNumber = window.document.querySelector('.progress-number')

  const frameListening = () => {
    const contentBox = content.getBoundingClientRect()
    const midPoint = window.innerHeight / 2

    if (contentBox.top > midPoint) {
      const progressNum = 0
      progress.setAttribute('aria-valuenow', progressNum)
      progress.style.width = progressNum + '%'

      progressNumber.style.display = 'none'
    }

    if (contentBox.top < midPoint) {
      const progressNum = progress.getAttribute('aria-valuemax')
      progress.setAttribute('aria-valuenow', progressNum)
      progress.style.width = progressNum + '%'

      progressNumber.style.display = 'none'
    }

    if (contentBox.top <= midPoint && contentBox.bottom >= midPoint) {
      const progressNum = (progress.getAttribute('aria-valuemax') * Math.abs(contentBox.top - midPoint)) / contentBox.height
      progress.setAttribute('aria-valuenow', progressNum)
      progress.style.width = progressNum + '%'

      progressNumber.innerHTML = window.Math.round(progressNum) + '%'
      progressNumber.style.display = 'block'
    }

    window.requestAnimationFrame(frameListening)
  }

  window.requestAnimationFrame(frameListening)
}

export default contentProgress(window)
