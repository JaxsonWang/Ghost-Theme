import { parseTime } from '../untils/dateTime'

const search = (window, $) => {
  // 初始化
  // eslint-disable-next-line no-undef
  new GhostSearch({
    host: [location.protocol, '//', location.host].join(''),
    version: 'v3',
    key: '4015596533516fdf195b645a1d',
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
    template: function(results) {
      const time = parseTime(new Date(results.published_at), '{y}-{m}-{d}')
      return '' +
        '<a href="' + results.url + '" class="ghost-search-item">' +
        '<h2>' + results.title + '</h2>' +
        '<span>发布日期：' + time + '</span>' +
        '</a>'
    },
    on: {
      afterDisplay: function(result) {
        const mate = $('.search-meta')
        let text = mate.attr('data-no-results-text')
        text = text.replace('[results]', result.total)
        mate.text(text).show()
      }
    }
  })

  $('#ghost-search-field').focus()
}

export default search(window, window.jQuery)
