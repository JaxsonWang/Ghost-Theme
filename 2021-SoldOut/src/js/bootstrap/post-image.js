import { loadScripts } from '../utils'

let zoomingObj = undefined

const zooming = () => {
  return new Promise(resolve => {
    loadScripts([
      {
        name: 'zooming-js',
        path: 'https://cdn.jsdelivr.net/npm/zooming@2.1.1/build/zooming.min.js'
      }
    ]).then(() => {
      const zooming = new Zooming()
      zooming.config({
        bgColor: document.querySelector('.ha__body').classList.contains('light') ? '#fff' : '#1e1e1e',
        zIndex: 1040,
        scaleBase: 1
      })
      resolve(zooming)
    })
  })
}

export const updateZooming = () => {
  return zoomingObj
}

export default () => {
  zooming().then(zooming => {
    zoomingObj = zooming
    zoomingObj.listen('.ha__main-article p img')
    zoomingObj.listen('.ha__main-article figure.kg-image-card img')
    zoomingObj.listen('.ha__main-article .kg-gallery-image img')
  })
}
