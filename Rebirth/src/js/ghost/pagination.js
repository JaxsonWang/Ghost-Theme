/**
 * 分页业务 - 创建
 */
const createPagination = () => {
  let url = window.location.href
  const currPageElm = document.querySelector('.curr-page')
  const totalPagesElm = document.querySelector('.total-pages')
  if (!currPageElm || !totalPagesElm) return
  const currentPage = Number.parseInt(currPageElm.textContent, 10)
  const totalPages = Number.parseInt(totalPagesElm.textContent, 10)
  const paginationElm = document.querySelector('.pagination')
  const paginationPrev = document.querySelector('.page-item')
  if (totalPages > 1) {
    const paginationItems = []
    const paginationArr = pagination(currentPage, totalPages)
    paginationArr.forEach(function(pagElm) {
      const urlArray = url.split('/')
      if (pagElm === currentPage) {
        paginationItems.push('<li class="page-item active"><span class="page-link">' + pagElm + '</span></li>')
      } else if (typeof pagElm === 'number') {
        if (urlArray[urlArray.length - 3] === 'page') {
          url = url.replace(/\/page\/.*$/, '') + '/'
        }
        paginationItems.push('<li class="page-item"><a class="page-link" href="' + url + 'page/' + pagElm + '/" aria-label="第' + pagElm + '页">' + pagElm + '</a></li>')
      } else {
        paginationItems.push('<li class="page-item ellipsis"><a class="page-link">...</a></li>')
      }
    })
    if (paginationPrev !== null) {
      currentPage === 1 ? paginationPrev.insertAdjacentHTML('beforebegin', paginationItems.join('')) : paginationPrev.insertAdjacentHTML('afterend', paginationItems.join(''))
    }
  } else if (paginationElm != null) {
    paginationElm.style.display = 'none'
  }
}

const pagination = (currentPage, pageCount) => {
  var range = []
  var delta = 2
  for (var i = Math.max(2, currentPage - delta); i <= Math.min(pageCount - 1, currentPage + delta); i++) {
    range.push(i)
  }
  if (currentPage - delta > 2) range.unshift('...')
  if (currentPage + delta < pageCount - 1) range.push('...')
  range.unshift(1)
  range.push(pageCount)
  return range
}

export const sitePagination = () => {
  createPagination()
}

export default sitePagination()
