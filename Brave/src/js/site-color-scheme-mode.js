/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：site-color-scheme-mode.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */
const toggleBtn = document.querySelector('.event-color-scheme-mode')
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
      toggleBtn.innerHTML = nightBtn.querySelector('svg').outerHTML
      setHeaderMetaColor('dark')
    } else {
      document.documentElement.classList.remove('dark')
      toggleBtn.innerHTML = lightBtn.querySelector('svg').outerHTML
      setHeaderMetaColor('light')
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
    setHeaderMetaColor('dark')
  } else {
    document.documentElement.classList.remove('dark')
    setHeaderMetaColor('light')
  }

  toggleBtn.innerHTML = systemBtn.querySelector('svg').outerHTML
}

function setHeaderMetaColor(type) {
  // 设置白天全局状态栏颜色
  const meta = document.querySelector('meta[name="theme-color"]')
  const rootStyles = getComputedStyle(document.documentElement)
  if (type === 'dark') {
    meta.setAttribute('content', '#20293A')
  } else {
    const primaryColor = rootStyles.getPropertyValue('--ghost-accent-color')
    meta.setAttribute('content', primaryColor)
  }
}

colorSchemeMode()
