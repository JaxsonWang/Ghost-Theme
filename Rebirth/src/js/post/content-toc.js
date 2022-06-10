const siteToc = (window) => {
  const $ = window.jQuery
  const helpers = {
    findOrFilter: function($el, selector) {
      const $descendants = $el.find(selector)
      return $el
        .filter(selector)
        .add($descendants)
        .filter(':not([data-toc-skip])')
    },

    generateUniqueIdBase: function(el) {
      const text = $(el).text()
      const nonsafeChars = /[& +$,:;=?@"#{}|^~[`%!'<>\]\.\/\(\)\*\\\n\t\b\v]/g
      let urlText = null
      urlText = text
        .trim()
        .replace(/\'/gi, '')
        .replace(nonsafeChars, '-')
        .replace(/-{2,}/g, '-')
        .substring(0, 64)
        .replace(/^-+|-+$/gm, '')
        .toLowerCase()

      return urlText || el.tagName.toLowerCase()
    },

    generateUniqueId: function(el) {
      const anchorBase = this.generateUniqueIdBase(el)
      for (let i = 0; ; i++) {
        let anchor = anchorBase
        if (i > 0) {
          // add suffix
          anchor += '-' + i
        }
        // check if ID already exists
        if (!document.getElementById(anchor)) {
          return anchor
        }
      }
    },

    generateAnchor: function(el) {
      if (el.id) {
        return el.id
      } else {
        const anchor = this.generateUniqueId(el)
        el.id = anchor
        return anchor
      }
    },

    createNavList: function() {
      return $('<ul class="nav navbar-nav article-toc"></ul>')
    },

    createChildNavList: function($parent) {
      const $childList = this.createNavList()
      $parent.append($childList)
      return $childList
    },

    generateNavEl: function(anchor, text) {
      const $a = $('<a class="nav-link"></a>')
      $a.attr('href', '#' + anchor)
      $a.text(text)
      const $li = $('<li></li>')
      $li.append($a)
      return $li
    },

    generateNavItem: function(headingEl) {
      const anchor = this.generateAnchor(headingEl)
      const $heading = $(headingEl)
      const text = $heading.data('toc-text') || $heading.text()
      return this.generateNavEl(anchor, text)
    },

    // Find the first heading level (`<h1>`, then `<h2>`, etc.) that has more than one element. Defaults to 1 (for `<h1>`).
    getTopLevel: function($scope) {
      for (let i = 1; i <= 6; i++) {
        const $headings = this.findOrFilter($scope, 'h' + i)
        if ($headings.length > 1) {
          return i
        }
      }

      return 1
    },

    // returns the elements for the top level, and the next below it
    getHeadings: function($scope, topLevel) {
      const topSelector = 'h' + topLevel

      const secondaryLevel = topLevel + 1
      const secondarySelector = 'h' + secondaryLevel

      return this.findOrFilter($scope, topSelector + ',' + secondarySelector)
    },

    getNavLevel: function(el) {
      return parseInt(el.tagName.charAt(1), 10)
    },

    populateNav: function($topContext, topLevel, $headings) {
      let $context = $topContext
      let $prevNav

      const helpers = this
      $headings.each(function(i, el) {
        const $newNav = helpers.generateNavItem(el)
        const navLevel = helpers.getNavLevel(el)

        // determine the proper $context
        if (navLevel === topLevel) {
          // use top level
          $context = $topContext
        } else if ($prevNav && $context === $topContext) {
          // create a new level of the tree and switch to it
          $context = helpers.createChildNavList($prevNav)
        } // else use the current $context

        $context.append($newNav)

        $prevNav = $newNav
      })
    },

    parseOps: function(arg) {
      let opts
      if (arg.jquery) {
        opts = {
          $nav: arg
        }
      } else {
        opts = arg
      }
      opts.$scope = opts.$scope || $(document.body)
      return opts
    }
  }

  let opts = {
    $nav: $('nav.article-toc-nav'),
    $scope: $('article.article-main')
  }
  opts = helpers.parseOps(opts)

  // ensure that the data attribute is in place for styling
  opts.$nav.attr('data-toggle', 'toc')

  const $topContext = helpers.createChildNavList(opts.$nav)
  const topLevel = helpers.getTopLevel(opts.$scope)
  const $headings = helpers.getHeadings(opts.$scope, topLevel)
  helpers.populateNav($topContext, topLevel, $headings)
}

export const toc = (window) => {
  const $ = window.jQuery
  // 文章目录初始化
  siteToc(window)
  // scrollspy初始化
  $('body').scrollspy({
    target: $('.article-toc-nav'),
    offset: 150
  })
  // 跳转滑动
  $('nav.article-toc-nav ul li a').on('click', function(event) {
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top - 80
    }, 500)
    event.preventDefault()
  })
}

export default toc(window)
