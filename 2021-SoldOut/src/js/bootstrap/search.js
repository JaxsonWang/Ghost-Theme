import { loadScripts, parseTime } from '../utils'
import {pjax} from './pjax'

const initGhostSearch = () => {
  loadScripts([{
    name: 'ghost-content-api-js',
    path: 'https://cdn.jsdelivr.net/npm/@tryghost/content-api@1.4.14/umd/content-api.min.js'
  },{
    name: 'ghost-search',
    path: 'https://cdn.jsdelivr.net/npm/ghost-search@1.1.0/dist/ghost-search.min.js'
  }]).then(() => {
    new GhostSearch({
      host: [location.protocol, '//', location.host].join(''),
      version: 'v3',
      key: '99efee9603c92e5cd04501f069',
      url: [location.protocol, '//', location.host].join(''),
      trigger: 'focus',
      defaultValue: '',
      options: {
        keys: ['title', 'published_at', 'url']
      },
      api: {
        parameters: {
          fields: ['title', 'published_at', 'url']
        }
      },
      template: results => {
        const time = parseTime(new Date(results.published_at), '{y}-{m}-{d}')
        return '' +
          '<a href="' + results.url + '" class="ghost-search-item">' +
            '<span class="search-item-title">' + results.title + '</span>' +
            '<span class="search-item-date">发布日期：' + time + '</span>' +
          '</a>'
      },
      on: {
        afterDisplay: result => {
          const mate = document.querySelector('.search-meta')
          let text = mate.getAttribute('data-no-results-text')
          text = text.replace('[results]', result.total)
          mate.innerHTML = text
          document.querySelector('.ha__search .search-meta').classList.replace('invisible', 'visible')
          // pjax 实例化
          pjax.refresh(document.querySelector('.ha__search .search-results'))
        }
      }
    })
  })
}

export default () => {
  const search = document.querySelector('.search-click-action')
  if (search === null) return
  document.querySelector('.ha__search').classList.add('d-none')
  initGhostSearch()

  // 开启搜索界面
  search.onclick = () => {
    // 禁止滚动
    document.body.classList.add('overflow-hidden')
    document.querySelector('.ha__search').classList.remove('fade-out', 'd-none')
    document.querySelector('.ha__search').classList.add('animated', 'fade-in')
    document.querySelector('.ha__search .search-meta').classList.add('invisible')
    document.querySelector('#ghost-search-field').value = ''
    document.querySelector('#ghost-search-results').innerHTML = ''
  }
  // 关闭搜索界面
  document.querySelector('.ha__search .search-close').onclick = () => {
    document.querySelector('.ha__search').classList.add('fade-out')
    document.querySelector('.ha__search').classList.remove('fade-in')
    // 延迟 500ms 关闭隐藏，动画执行
    setTimeout(() => document.querySelector('.ha__search').classList.add('d-none'), 500)

    // 清除表单
    document.querySelector('.ha__search input.form-control').value = ''
    // 解锁滚动
    document.body.classList.remove('overflow-hidden')
  }
}
