import { getSystemDarkMode } from '../other/dark-mode'
import { loadScripts } from '../untils'

export const imageZoom = (window) => {
  return new Promise((resolve, reject) => {
    loadScripts([
      {
        id: 'zooming-js',
        url: 'https://cdn.jsdelivr.net/npm/zooming@2.1.1/build/zooming.min.js'
      }
    ]).then(js => {
      // eslint-disable-next-line no-undef
      const zooming = new Zooming()
      zooming.config({
        bgColor: getSystemDarkMode(window) === 'light' ? '#fff' : '#263238',
        zIndex: 1040,
        scaleBase: 1
      })
      resolve(zooming)
    }).catch(error => reject(error))
  })
}

export const imageZoomDefault = (window) => {
  imageZoom(window).then(zooming => {
    zooming.listen('.post-content-main article.post-content p img')
    zooming.listen('.post-content-main article.post-content figure.kg-image-card img')
  }).catch(error => {
    console.warn('Zooming 插件加载失败', error)
  })
}

export default imageZoomDefault(window)
