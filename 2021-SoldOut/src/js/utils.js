/**
 * 是否在页面最顶部
 * @returns {boolean}
 */
export const isScrollTop = () => {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop <= 0
}

/**
 * 获取页面顶部距离
 * @returns {Number}
 */
export const getScrollTop = () => {
  return document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop
}

/**
 * 异步载入脚本
 * @param scripts 脚本数组对象
 * @returns {Promise<Object[]>}
 */
export const loadScripts = (scripts) => {
  const get = script => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(script.name) !== null) {
        resolve(script)
        return
      }
      const el = document.createElement('script')
      el.id = script.name
      el.addEventListener('load', () => {
        resolve(script)
      }, false)
      el.addEventListener('error', () => {
        reject(script)
      }, false)
      el.src = script.path
      document.getElementsByTagName('body')[0].appendChild(el) || document.getElementsByTagName('head')[0].appendChild(el)
    })
  }

  const myPromises = scripts.map(script => {
    return get(script)
  })

  return Promise.all(myPromises)
}

/**
 * 异步载入样式脚本
 * @param scripts 脚本数组对象
 * @returns {Promise<Object[]>}
 */
export const loadStyles = (scripts) => {
  const get = script => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(script.name) !== null) {
        resolve(script)
        return
      }
      const el = document.createElement('link')
      el.type = 'text/css'
      el.rel = 'stylesheet'
      el.id = script.name
      el.addEventListener('load', () => {
        resolve(script)
      }, false)
      el.addEventListener('error', () => {
        reject(script)
      }, false)
      el.href = script.path
      document.getElementsByTagName('head')[0].appendChild(el)
    })
  }

  const myPromises = scripts.map(script => {
    return get(script)
  })

  return Promise.all(myPromises)
}

/**
 * Parse the time to string
 * @param {(Object|string|number)} time
 * @param {string} cFormat
 * @returns {string | null}
 */
export function parseTime (time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
      time = parseInt(time)
    }
    if ((typeof time === 'number') && (time.toString().length === 10)) {
      time = time * 1000
    }
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    const value = formatObj[key]
    // Note: getDay() returns 0 on Sunday
    if (key === 'a') {
      return ['日', '一', '二', '三', '四', '五', '六'][value]
    }
    return value.toString().padStart(2, '0')
  })
}

/**
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export const formatTime = (time, option) => {
  if (('' + time).length === 10) {
    time = parseInt(time) * 1000
  } else {
    time = +time
  }
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return (
      d.getMonth() +
      1 +
      '月' +
      d.getDate() +
      '日' +
      d.getHours() +
      '时' +
      d.getMinutes() +
      '分'
    )
  }
}
