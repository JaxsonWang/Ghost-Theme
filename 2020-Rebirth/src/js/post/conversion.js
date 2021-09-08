const conversion = (window) => {
  const $ = window.jQuery
  $(window.document).ready(() => {
    $('article.post-content li').each(function() {
      if (/\[x]\s/gm.test(this.innerHTML)) {
        this.innerHTML = this.innerHTML.replace(/\[x]\s/gm, '<span class="span-todo-checkbox checked"></span><input type="checkbox" checked disabled class="todo-list-input checked"/>&nbsp;')
        $(this).parent().addClass('todo-list')
      }
      if (/\[\s]\s/gm.test(this.innerHTML)) {
        this.innerHTML = this.innerHTML.replace(/\[\s]\s/gm, '<span class="span-todo-checkbox"></span><input type="checkbox" disabled class="todo-list-input"/>&nbsp;')
        $(this).parent().addClass('todo-list')
      }
    })
  })
}

export default conversion(window)
