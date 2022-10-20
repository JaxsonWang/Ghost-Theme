import { loadScripts, loadStyles } from '../utils'
import toasts from '../toasts'

let isRegister = false

export default async function () {
  // Prismjs 库地址
  const prismSrc = `https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.27.0`
  // 高亮语法块
  const codeBlocks = document.querySelectorAll('.ha__main-article-content pre>code')
  // 如果语法块处理判断
  if (codeBlocks.length !== 0) {
    // loading 加载
    codeBlocks.forEach(block => {
      block.parentNode.classList.add('overflow-hidden', 'line-numbers')
      // 添加 loading 罩层
      const loadingCover = window.document.createElement('div')
      loadingCover.id = 'pre-loading'
      loadingCover.className = 'd-flex justify-content-center align-items-center pre-block-loading'
      loadingCover.innerHTML = `<div class="loading"><div class="d-flex justify-content-center text-center loading-icon"><div class="spinner-border" role="status"><span class="sr-only">Loading...</span></div></div><div class="text-center loading-text"><span>载入代码中...</span></div></div>`
      const getCodeParen = block.parentNode
      getCodeParen.insertBefore(loadingCover, block)
    })
    // 加载样式资源
    await loadStyles([
      {
        name: 'prism-line-numbers-css',
        path: `${prismSrc}/plugins/line-numbers/prism-line-numbers.min.css`
      },
      {
        name: 'prism-toolbar-css',
        path: `${prismSrc}/plugins/toolbar/prism-toolbar.min.css`
      }
    ])
    // 加载脚本
    await loadScripts([
      {
        name: 'prism-core-js',
        path: `${prismSrc}/components/prism-core.min.js`
      }
    ])

    await loadScripts([
      {
        name: 'prism-autoloader-js',
        path: `${prismSrc}/plugins/autoloader/prism-autoloader.min.js`
      },
      {
        name: 'prism-prism-toolbar-js',
        path: `${prismSrc}/plugins/toolbar/prism-toolbar.min.js`
      },
      {
        name: 'prism-line-numbers-js',
        path: `${prismSrc}/plugins/line-numbers/prism-line-numbers.min.js`
      }
    ])

    const Prism = Prism || window.Prism

    if (!isRegister) {
      // 自动化高亮库
      Prism.plugins.autoloader.languages_path = `${prismSrc}/components/`
      // 注册按钮 - 显示语言
      Prism.plugins.toolbar.registerButton('show-language', env => {
        const button = document.createElement('div')
        button.className = 'show-language'
        button.innerHTML = `<i class="fas fa-code"></i> ${env.language}`
        return button
      })
      // 注册按钮 - 复制代码
      Prism.plugins.toolbar.registerButton('select-code', env => {
        const button = document.createElement('button')
        button.className = 'select-code'
        button.innerHTML = `<i class="fas fa-copy"></i> 复制代码`
        button.addEventListener('click', () => {
          if (document.body.createTextRange) {
            const range = document.body.createTextRange()
            range.moveToElementText(env.element)
            range.select()
          } else if (window.getSelection) {
            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(env.element)
            selection.removeAllRanges()
            selection.addRange(range)
          }
          // 发送消息
          toasts({
            key: 'prism-toast',
            content: '请按 Ctrl + C / Command + C 进行复制代码！'
          })
        })
        return button
      })
      isRegister = true
    }
    // 遍历 Dom
    codeBlocks.forEach(block => {
      if (block.classList.contains('language-html')) {
        block.classList.remove('language-html')
        block.classList.add('language-markup')
      }
      // 初始化高亮
      // Prism.highlightAll()
      Prism.highlightElement(block)

      // 移除 loading 罩层
      setTimeout(() => {
        block.parentNode.classList.remove('overflow-hidden')
        document.querySelector('#pre-loading').remove()
      }, 1000)
    })
  }
}
