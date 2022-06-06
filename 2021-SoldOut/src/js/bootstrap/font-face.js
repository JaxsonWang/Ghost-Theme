export default () => {
  if (window.FontFace === undefined) {
    console.error('浏览器不支持 FontFace API')
    return
  }
  // https://cdn.jsdelivr.net/gh/JaxsonWang/jaxsonwang.github.io@master/assets/PuHuiTi.ttf
  const family = 'PuHuiTi'
  const source = 'url("https://github.rc1844.workers.dev/JaxsonWang/jaxsonwang.github.io/raw/master/assets/PuHuiTi.ttf")'
  const desc = {}
  const fonts = document.fonts
  if (fonts) {
    const fontFace = new FontFace(family, source, desc)
    fontFace.load().then(() => {
      fonts.add(fontFace)
    }).catch(error => {
      console.log(error)
    })
  } else {
    const style = document.createElement('style')
    style.innerText = `@font-face{font-family:"${family}";src:${source};font-style:${desc.style};font-weight:${desc.weight};font-stretch:${desc.stretch};unicode-range:${desc.unicodeRange};font-variant:${desc.variant};font-feature-settings:${desc.featureSettings};}`
    document.head.appendChild(style)
  }
}
