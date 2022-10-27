/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：site-color-scheme-mode.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
const toggleBtn = document.querySelector('.event-tooltip')
const lightBtn = document.querySelector('.event-light')
const nightBtn = document.querySelector('.event-night')
const systemBtn = document.querySelector('.event-system')

lightBtn.addEventListener('click', function () {
  localStorage.theme = 'light'
  colorSchemeMode()
})

nightBtn.addEventListener('click', function () {
  localStorage.theme = 'dark'
  colorSchemeMode()
})

systemBtn.addEventListener('click', function () {
  localStorage.removeItem('theme')
  colorSchemeMode()
})

function colorSchemeMode() {
  if (localStorage.theme) {
    if (localStorage.theme === 'dark') {
      document.documentElement.classList.add('dark')
      siteCommentSchemeMode(true)
      toggleBtn.innerHTML = nightBtn.querySelector('svg').outerHTML
    } else {
      document.documentElement.classList.remove('dark')
      siteCommentSchemeMode(false)
      toggleBtn.innerHTML = lightBtn.querySelector('svg').outerHTML
    }
  } else {
    prefersColorSchemeDark()

    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
      prefersColorSchemeDark()
    })
  }
}

function prefersColorSchemeDark() {
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    document.documentElement.classList.add('dark')
    siteCommentSchemeMode(true)
  } else {
    document.documentElement.classList.remove('dark')
    siteCommentSchemeMode(false)
  }

  toggleBtn.innerHTML = systemBtn.querySelector('svg').outerHTML
}

function siteCommentSchemeMode(isDark) {
  const siteCommentsIframe = document.querySelector('#ghost-comments-root iframe')?.contentWindow
  if (siteCommentsIframe) {
    const siteCommentsWrap = siteCommentsIframe.document.querySelector('.ghost-display')
    isDark ? siteCommentsWrap.classList.add('dark') : siteCommentsWrap.classList.remove('dark')
  }
}

colorSchemeMode()
