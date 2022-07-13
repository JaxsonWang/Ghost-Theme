/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 * File Name：index.js
 * Date：2022年07月13日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
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
