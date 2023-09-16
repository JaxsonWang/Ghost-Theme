/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：font-face.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

if (window.FontFace && window._ghost_braveFontUrl) {
  const family = 'BraveFont'
  const source = `url("${window._ghost_braveFontUrl}")`
  const desc = {}
  const fonts = document.fonts
  if (fonts) {
    const fontFace = new FontFace(family, source, desc)
    fontFace
      .load()
      .then(() => {
        fonts.add(fontFace)
      })
      .catch(error => {
        console.log(error)
      })
  } else {
    const style = document.createElement('style')
    style.innerText = `@font-face{font-family:"${family}";src:${source};font-style:${desc.style};font-weight:${desc.weight};font-stretch:${desc.stretch};unicode-range:${desc.unicodeRange};font-variant:${desc.variant};font-feature-settings:${desc.featureSettings};}`
    document.head.appendChild(style)
  }
}
