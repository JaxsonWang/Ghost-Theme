/*
 * Copyright (c) 2022 Jaxson Wang
 * Theme Name：Pomelo
 *  File Name：site-pagination.js
 *  Date：2022年07月13日
 *  Author：Jaxson Wang
 *  Email: i@iiong.com
 *  Blog: https://iiong.com
 */

/**
 * 分页业务 - 创建
 */
const createPagination = () => {
  let url = window.location.href
  const currPageElm = document.querySelector('.pomelo-pagination-current-page')
  const totalPagesElm = document.querySelector('.pomelo-pagination-total-pages')
  if (!currPageElm || !totalPagesElm) return
  const currentPage = Number.parseInt(currPageElm.textContent, 10)
  const totalPages = Number.parseInt(totalPagesElm.textContent, 10)
  const paginationElm = document.querySelector('.pomelo-pagination-wrapper')
  const paginationPrev = document.querySelector('.pomelo-pagination-page-item')
  if (totalPages > 1) {
    const paginationItems = []
    const paginationArr = pagination(currentPage, totalPages)
    paginationArr.forEach(function (pagElm) {
      const urlArray = url.split('/')
      if (pagElm === currentPage) {
        paginationItems.push(
          '<li class="pomelo-pagination-page-item">' +
            '<span class="pomelo-pagination-page-link active pomelo-pagination-page-link-mobile">' +
            pagElm +
            '</span>' +
            '</li>'
        )
      } else if (typeof pagElm === 'number') {
        if (urlArray[urlArray.length - 3] === 'page') {
          url = url.replace(/\/page\/.*$/, '') + '/'
        }
        paginationItems.push(
          '<li class="pomelo-pagination-page-item">' +
            '<a class="pomelo-pagination-page-link pomelo-pagination-page-link-mobile" href="' +
            url +
            'page/' +
            pagElm +
            '/">' +
            pagElm +
            '</a>' +
            '</li>'
        )
      } else {
        paginationItems.push(
          '<li class="pomelo-pagination-page-item">' +
            '<a class="pomelo-pagination-page-link more pomelo-pagination-page-link-mobile">' +
            '...' +
            '</a>' +
            '</li>'
        )
      }
    })
    if (paginationPrev !== null) {
      currentPage === 1
        ? paginationPrev.insertAdjacentHTML('beforebegin', paginationItems.join(''))
        : paginationPrev.insertAdjacentHTML('afterend', paginationItems.join(''))
    }
  } else if (paginationElm != null) {
    paginationElm.style.display = 'none'
  }
}

const pagination = (currentPage, pageCount) => {
  const range = []
  const delta = 2
  for (let i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
    range.push(i)
  }
  if (currentPage - delta > 2) range.unshift('...')
  if (currentPage + delta < pageCount - 1) range.push('...')
  range.unshift(1)
  range.push(pageCount)
  return range
}

createPagination()
