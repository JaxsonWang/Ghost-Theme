/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：template-links.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

const ul = document.querySelector('.custom-links-for-page .event-template-links-content ul')
if (ul !== null) ul.classList.add('grid', 'grid-cols-12', 'gap-4')
document.querySelectorAll('.custom-links-for-page .event-template-links-content ul li').forEach(block => {
  const itemLink = block.textContent.split('|')
  block.classList.add('col-span-4', 'mb-4')
  block.innerHTML = `
      <div class="shadow px-3 links-item-wrapper">
        <div class="links-item-wrapper-header">
          <img src="${itemLink[2]}" class="border links-item-wrapper-header-avatar" alt="${itemLink[0]}"/>
        </div>
        <div class="links-item-wrapper-content">
          <div class="links-item-wrapper-content-name">
            <a target="_blank" href="${itemLink[1]}">${itemLink[0]}</a>
          </div>
          <div class="links-item-wrapper-content-desc">${itemLink[3]}</div>
        </div>
      </div>
      `
})
