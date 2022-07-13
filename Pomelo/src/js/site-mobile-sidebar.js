/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 * File Name：site-mobile-sidebar.js
 * Date：2022年07月13日
 * Author：Jaxson Wang
 * Email: i@iiong.com
 * Blog: https://iiong.com
 */

// 手机导航栏切换
document.querySelector('.event-mobile-menu')?.addEventListener('click', function () {
  document.querySelector('body').classList.toggle('pomelo-open-mobile-sidebar')
})
