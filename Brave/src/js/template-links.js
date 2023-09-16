/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Brave
 *  File Name：template-links.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

const ul = document.querySelector('.custom-links-for-page .event-template-links-content ul')
if (ul !== null) ul.classList.add('grid', 'grid-cols-12', 'gap-4', '!p-0', '!list-none')
document.querySelectorAll('.custom-links-for-page .event-template-links-content ul li').forEach(block => {
  const itemLink = block.textContent.split('|')
  block.classList.add('col-span-12', 'md:col-span-4', 'mb-4', 'text-center', 'px-4')
  block.innerHTML = `
      <a target="_blank" href="${itemLink[1]}" class="!no-underline group">
        <div class="shadow-xl px-3 py-4 transition-[transform,box-shadow] duration-300 hover:shadow-2xl hover:-translate-y-2 dark:bg-slate-900 rounded-lg">
          <div>
            <img src="${itemLink[2]}" class="border border-gray-300 rounded-full w-20 mx-auto !my-0" alt="${itemLink[0]}"/>
          </div>
          <div class="grow flex flex-col">
            <div class="mt-3 group-hover:text-[color:var(--ghost-accent-color)] transition-colors duration-300">
              ${itemLink[0]}
            </div>
            <div class="links-item-wrapper-content-desc">${itemLink[3]}</div>
          </div>
        </div>
      </a>
      `
})
