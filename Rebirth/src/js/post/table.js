const table = (window) => {
  window.document.querySelectorAll('.post-content table').forEach(block => {
    const table = window.document.createElement('div')
    table.className = 'overflow-x-auto table-area'
    table.innerHTML = `${block.outerHTML}`
    const getCodeParen = block.parentNode
    getCodeParen.insertBefore(table, block)

    block.remove()
  })
}

export default table(window)
