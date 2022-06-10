import { loadScripts } from '../utils'
import baseToast from '../toasts'

export default () => {
  // 百度推送
  location.protocol.split(':')[0] === 'https' ? loadScripts([{
    name: 'bd-push-js',
    path: 'https://zz.bdstatic.com/linksubmit/push.js'
  }]) : loadScripts([{
    name: 'bd-push-js',
    path: 'http://push.zhanzhang.baidu.com/push.js'
  }])

  // 链接跳转
  document.querySelectorAll('.ha__main-article a').forEach(block => {
    if (block.getAttribute('href') !== null && !/^(#|javascript).*/.test(block.getAttribute('href'))) {
      block.setAttribute('target', '_blank')
    }
  })

  // 转换清单可视化
  document.querySelectorAll('.ha__main-article li').forEach(block => {
    if (/\[x]\s/gm.test(block.innerHTML)) {
      block.innerHTML = block.innerHTML.replace(/\[x]\s/gm, '<span class="span-todo-checkbox checked"></span><input type="checkbox" checked disabled class="todo-list-input checked"/>&nbsp;')
      block.parentElement.classList.add('todo-list')
    }
    if (/\[\s]\s/gm.test(block.innerHTML)) {
      block.innerHTML = block.innerHTML.replace(/\[\s]\s/gm, '<span class="span-todo-checkbox"></span><input type="checkbox" disabled class="todo-list-input"/>&nbsp;')
      block.parentElement.classList.add('todo-list')
    }
  })

  if (window.localStorage.getItem('helloToastKey') === null) {
    // 通知
    baseToast({
      content: '本博客最近大升级，如遇到莫名其妙可以在任何文章之下留言反馈！',
      time: '2020-12-23T23:00:00',
      key: 'helloToastKey'
    })
  }
  if (document.querySelector('.toast-wrapper .helloToastKey .btn-close') !== null) {
    document.querySelector('.toast-wrapper .helloToastKey .btn-close').onclick = () => window.localStorage.setItem('helloToastKey', true)
  }
}
