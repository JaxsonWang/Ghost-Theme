(function ($) {
  var loadFiles = {
    js: [],
    css: []
  };

  /**
   * 打开捐赠弹窗
   */
  $('#btn-modal').click(function () {
    $('#overlay').addClass('is-visible');
    $('#modal').addClass('is-visible animated fadeInDown').removeClass('fadeOutDown');
    $('html').css('overflow-y', 'hidden');
  });
  /**
   * 关闭捐赠弹窗
   */
  $('#close-btn').click(function () {
    $('#overlay').removeClass('is-visible');
    $('#modal').removeClass('is-visible animated fadeInDown').addClass('animated fadeOutDown');
    $('html').css('overflow-y', 'scroll');
  });
  $('#overlay').click(function () {
    $('#overlay').removeClass('is-visible');
    $('#modal').removeClass('is-visible animated fadeInDown').addClass('animated fadeOutDown');
    $('html').css('overflow-y', 'scroll');
  });

  /**
   * 评论跳转
   */
  if (window.location.hash) {
    var checkExist = setInterval(function () {
      if ($(window.location.hash).length) {
        $('html, body').animate(
          {scrollTop: $(window.location.hash).offset().top - 90},
          1000
        );
        clearInterval(checkExist);
      }
    }, 100);
  }

  /**
   * 动态加载JS文件的方法
   * Load javascript file method
   *
   * @param {String}   fileName              JS文件名
   * @param {Function} [callback=function()] 加载成功后执行的回调函数
   * @param {String}   [into='head']         嵌入页面的位置
   */
  function loadScript(fileName, callback, into) {
    into = into || 'body';
    callback = callback || function () {
    };
    var script = null;
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = fileName;
    script.onload = function () {
      loadFiles.js.push(fileName);
      callback();
    };
    if (into === 'head') {
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      document.body.appendChild(script);
    }
  }

  /**
   * 动态加载CSS文件的方法
   * Load css file method
   *
   * @param {String}   fileName              CSS文件名
   * @param {Function} [callback=function()] 加载成功后执行的回调函数
   * @param {String}   [into='head']         嵌入页面的位置
   */
  function loadCSS(fileName, callback, into) {
    into = into || 'head';
    callback = callback || function () {
    };

    var css = document.createElement('link');
    css.type = 'text/css';
    css.rel = 'stylesheet';
    css.onload = css.onreadystatechange = function () {
      loadFiles.css.push(fileName);
      callback();
    };
    css.href = fileName;
    if (into === 'head') {
      document.getElementsByTagName('head')[0].appendChild(css);
    } else {
      document.body.appendChild(css);
    }
  }

  //valine评论支持
  loadScript('https://cdn.jsdelivr.net/npm/leancloud-storage/dist/av-min.js', function () {
    loadScript(
      'https://cdn.jsdelivr.net/npm/valine/dist/Valine.min.js',
      function () {
        if (document.getElementById('vcomments') !== null) {
          new Valine({
            el: '#vcomments',
            appId: 'rEDT0uBB2LEdndoJ4od2SlKf-gzGzoHsz',
            appKey: 'lmX57j7hrYGCHROA72tBUIXq',
            notify: true,
            verify: true,
            avatar: 'mm',
            visitor: true, // 文章访问量统计
            highlight: true, // 代码高亮
            recordIP: true, // 是否记录评论者IP
            placeholder: '请您理智发言，共建美好社会！'
          });
        }
      }
    );
  });
  //图箱支持
  loadScript('https://cdn.jsdelivr.net/npm/medium-zoom/dist/medium-zoom.min.js', function () {
    mediumZoom(document.querySelectorAll('.post-full-content .post-content img'));
  });
  //Prism高亮支持
  // loadCSS('https://cdn.jsdelivr.net/npm/prismjs@1.15.0/themes/prism-tomorrow.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/prismjs/components/prism-core.min.js', function () {
    loadScript('https://cdn.jsdelivr.net/npm/prismjs/plugins/autoloader/prism-autoloader.min.js', function () {
        //将html代码块支持高亮
        $('.post-content pre code').attr('class', function (i, clazz) {
          if (clazz !== undefined) {
            return clazz.replace(/language-html/g, 'language-markup');
          }
        });
        //设置高亮语言样式文件地址
        if (window.Prism !== 'undefined') {
          Prism.plugins.autoloader.languages_path = 'https://cdn.jsdelivr.net/npm/prismjs/components/';
          Prism.highlightAll();
        }
      }
    );
  });
  //行号
  loadCSS('https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/prismjs/plugins/line-numbers/prism-line-numbers.min.js');
  //支持行号显示
  $('.post-content pre').addClass('line-numbers');
  //显示语言或者粘贴
  loadCSS('https://cdn.jsdelivr.net/npm/prismjs/plugins/toolbar/prism-toolbar.min.css');
  loadScript('https://cdn.jsdelivr.net/npm/prismjs/plugins/toolbar/prism-toolbar.min.js');
  loadScript('https://cdn.jsdelivr.net/npm/prismjs/plugins/show-language/prism-show-language.min.js');
  loadScript('https://cdn.jsdelivr.net/npm/clipboard/dist/clipboard.min.js');
  loadScript('https://cdn.jsdelivr.net/npm/prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js');

  // Google 广告配置
  loadScript('https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js', function () {
    $('.adsbygoogle[data-ad-client]').map(function (item, index) {
      (adsbygoogle = window.adsbygoogle || []).push({});
    });
    console.log('Google广告加载完毕。嘤嘤嘤，别把本站广告屏蔽了哟！');
    if (adsbygoogle.loaded || window.adsbygoogle.loaded) {
      // 当谷歌广告没有被屏蔽的时候 - 删除提示语
      $('.shielding-ads-tips').remove();
    }
  });
  (adsbygoogle = window.adsbygoogle || []).push({
    google_ad_client: "ca-pub-5781009105744977",
    enable_page_level_ads: true
  });

  // Google分析
  loadScript('https://www.googletagmanager.com/gtag/js?id=UA-141063659-1', function () {
    window.dataLayer = window.dataLayer || [];

    function gtag() {
      dataLayer.push(arguments);
    }

    gtag('js', new Date());
    gtag('config', 'UA-141063659-1');
  });

  // 百度统计
  loadScript('https://hm.baidu.com/hm.js?37d3bf3116f041cb10bd1d890e65bcfc');

  // 百度推送
  loadScript('https://zz.bdstatic.com/linksubmit/push.js');

  console.log('已经动态加载资源：', loadFiles);

  $(document).ready(function () {
    /**
     * 回到顶部
     */
    var returnTop = $('#return-to-top');
    $(window).scroll(function () {
      if ($(this).scrollTop() >= 50) {
        returnTop.fadeIn(200);
      } else {
        returnTop.fadeOut(200);
      }
    });
    returnTop.click(function () {
      $('body,html').animate(
        {
          scrollTop: 0
        },
        500
      );
    });

    // 搜索事件执行
    var searchDom = $('#ghost-search-field');
    if (searchDom.length !== 0) {
      // 配置搜索
      var ghostSearch = new GhostSearch({
        // key: '1c8b902ac09889962117d082e6',
        // host: 'http://localhost:2368'
        key: '99efee9603c92e5cd04501f069',
        host: 'https://iiong.com'
      });
      searchDom.focus(function () {
        $('#ghost-search-results').fadeIn(500);
        $('.search-cover').fadeIn(500);
        $('html').css('overflow-y', 'hidden')
      }).blur(function () {
        $('#ghost-search-results').fadeOut(500);
        $('.search-cover').fadeOut(500);
        $('html').css('overflow-y', 'scroll')
      });
    }

    // 监听点击链接时间，非本站链接进行新标签打开
    $(document).on("click", 'a', function (event) {
      var link = event.target.href; // 完整链接
      var host = event.target.hostname;
      if (/^https?:\/\/(([a-zA-Z0-9_-])+(\.)?)*(:\d+)?(\/((\.)?(\?)?=?&?[a-zA-Z0-9_-](\?)?)*)*$/i.test(link)) {
        if (host !== window.location.hostname) {
          event.preventDefault();
          window.open(event.target.href);
        }
      }
    });
  });
})(jQuery);
