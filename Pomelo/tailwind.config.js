/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 * File Name：tailwind.config.js
 * Date：2022年06月11日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
 */

module.exports = {
  content: ['./**/*.hbs'],
  // 'media' or 'class'
  darkMode: 'media',
  theme: {
    extend: {
      maxWidth: {
        '8xl': '90rem'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
