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
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: [
        'PomeloFont',
        'georgia',
        '"ui-sans-serif"',
        '"system-ui"',
        '"-apple-system"',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'serif',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        '"Liberation Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"'
      ]
    },
    container: {
      center: true,
      padding: '2.5rem',
      screens: {
        sm: '576px',
        md: '768px',
        lg: '992px',
        xl: '1200px',
        '2xl': '1400px'
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
