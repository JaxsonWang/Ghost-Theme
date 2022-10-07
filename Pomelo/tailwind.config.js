/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：tailwind.config.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

module.exports = {
  content: ['./**/*.hbs', './src/js/**/*.js'],
  // 'media' or 'class'
  darkMode: 'media',
  theme: {
    container: {
      screens: {
        sm: '540px',
        md: '720px',
        lg: '960px',
        xl: '1320px',
        '2xl': '1320px'
      }
    },
    extend: {
      maxWidth: {}
    }
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/typography')]
}
