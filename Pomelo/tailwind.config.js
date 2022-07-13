/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 * File Name：tailwind.config.js
 * Date：2022年07月13日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
 */

module.exports = {
  content: ['./**/*.hbs', './src/js/**/*.js'],
  // 'media' or 'class'
  darkMode: 'media',
  theme: {
    extend: {
      maxWidth: {}
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
