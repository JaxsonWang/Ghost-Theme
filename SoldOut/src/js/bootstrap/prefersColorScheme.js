import { updateZooming } from './post-image'

const themeMap = {
  dark: 'dark',
  light: 'light'
}

const toggleLight = () => {
  document.body.classList.add(themeMap.light)
  document.body.classList.remove(themeMap.dark)
}

const toggleDark = () => {
  document.body.classList.add(themeMap.dark)
  document.body.classList.remove(themeMap.light)
}

const darkSwitch = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? toggleDark() : toggleLight()

export default () => {
  // 初始化
  darkSwitch()
  // 监听系统风格切换
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => darkSwitch())
  // 设置主题
  const darkToggleDom = document.querySelector('.dark-click-action')
  let style = window.matchMedia('(prefers-color-scheme: dark)').matches
  darkToggleDom.onclick = () => {
    if (!style) {
      toggleDark()
      updateZooming().config({
        bgColor: '#1e1e1e'
      })
      style = true
    } else {
      toggleLight()
      updateZooming().config({
        bgColor: '#fff'
      })
      style = false
    }
  }
}
