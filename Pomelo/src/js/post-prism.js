/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：post-prism.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

import { loadScripts, loadStyles } from './utils'

let isRegister = false

// Prismjs 库地址
const prismSrc = `https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/prism/1.27.0`

const clipboard = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M7 4V2h10v2h3.007c.548 0 .993.445.993.993v16.014a.994.994 0 0 1-.993.993H3.993A.994.994 0 0 1 3 21.007V4.993C3 4.445 3.445 4 3.993 4H7zm0 2H5v14h14V6h-2v2H7V6zm2-2v2h6V4H9z"/></svg>`
const code = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24"><path fill="none" d="M0 0h24v24H0z"/><path d="M23 12l-7.071 7.071-1.414-1.414L20.172 12l-5.657-5.657 1.414-1.414L23 12zM3.828 12l5.657 5.657-1.414 1.414L1 12l7.071-7.071 1.414 1.414L3.828 12z"/></svg>`

const initPostPrism = async () => {
  // 高亮语法块
  const codeBlocks = document.querySelectorAll('.event-post-content pre>code')
  // 如果语法块处理判断
  if (codeBlocks.length !== 0) {
    // loading 加载
    codeBlocks.forEach(block => {
      block.parentNode.classList.add('overflow-hidden', 'line-numbers')
      // 添加 loading 罩层
      const loadingCover = window.document.createElement('div')
      loadingCover.id = 'pre-loading'
      loadingCover.className = 'flex justify-center items-center pre-block-loading'
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

    const Prism = window.Prism

    if (!isRegister) {
      // 自动化高亮库
      Prism.plugins.autoloader.languages_path = `${prismSrc}/components/`
      // 注册按钮 - 显示语言
      Prism.plugins.toolbar.registerButton('show-language', env => {
        const button = document.createElement('div')
        button.className = 'show-language'
        button.innerHTML = `${code} <span class="ml-1">${env.language}</span>`
        return button
      })
      // 注册按钮 - 复制代码
      Prism.plugins.toolbar.registerButton('select-code', env => {
        const button = document.createElement('button')
        button.className = 'select-code'
        button.innerHTML = `${clipboard} <span class="ml-1">复制代码</span>`
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
          // toasts({
          //   key: 'prism-toast',
          //   content: '请按 Ctrl + C / Command + C 进行复制代码！'
          // })
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

initPostPrism().then()
