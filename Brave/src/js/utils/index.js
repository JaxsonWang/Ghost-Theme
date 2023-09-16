/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：index.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

/**
 * 是否在页面最顶部
 * @returns {boolean}
 */
export const isScrollTop = () => {
  return getScrollTop() <= 0
}

/**
 * 获取页面顶部距离
 * @returns {Number}
 */
export const getScrollTop = () => {
  return document.documentElement.scrollTop || window.scrollY || window.pageYOffset
}

/**
 * 异步载入脚本
 * @param scripts 脚本数组对象
 * @returns {Promise<Object[]>}
 */
export const loadScripts = scripts => {
  const get = script => {
    return new Promise((resolve, reject) => {
      if (document.getElementById(script.name) !== null) {
        resolve(script)
        return
      }
      const el = document.createElement('script')
      el.id = script.name
      el.addEventListener(
        'load',
        () => {
          resolve(script)
        },
        false
      )
      el.addEventListener(
        'error',
        () => {
          reject(script)
        },
        false
      )
      el.src = script.path
      document.getElementsByTagName('body')[0].appendChild(el) ||
        document.getElementsByTagName('head')[0].appendChild(el)
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
export const loadStyles = scripts => {
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
      el.addEventListener(
        'load',
        () => {
          resolve(script)
        },
        false
      )
      el.addEventListener(
        'error',
        () => {
          reject(script)
        },
        false
      )
      el.href = script.path
      document.getElementsByTagName('head')[0].appendChild(el)
    })
  }

  const myPromises = scripts.map(script => {
    return get(script)
  })

  return Promise.all(myPromises)
}
