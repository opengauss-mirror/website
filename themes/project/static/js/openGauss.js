$(document).ready(function() {
  var myBannerSwiper = new Swiper ('.banner_swiper', {
    direction: 'horizontal', // 切换选项
    loop: true,  // 循环模式选项
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    // 如果需要分页器
    pagination: {
      el: '.banner_swiper_pagination',
      type: 'bullets',
      clickable :true,
    },
  })

  // 文档页面语言切换
  var currentUrl = window.location.href;

  const switchLanguage = function () {
    var urls = currentUrl.split('/docs/');
    urls = urls.slice(0, urls.length - 1);
    urls.push('Quickstart/Quickstart.html');
    urls = urls.join('/docs/');

    if (includesStr('/zh/', urls)) {
      urls = urls.replace('/zh/', '/en/');
    } else {
      urls = urls.replace('/en/', '/zh/');
    }

    window.location.href = urls;
  }


  //首页切换 gif 图
  const toggleGifImg = function () {
    $('.content_character_lists_far li').hover(function () {
      $(this).find('.img-static').addClass('hidding');
      $(this).find('.img-gif').removeClass('hidding');

    }, function () {
      $(this).find('.img-static').removeClass('hidding');
      $(this).find('.img-gif').addClass('hidding');
    })
  }
  toggleGifImg();

  // 中英文切换
  const enTozh = function (url) {
    if (includesStr('/en', url)) {
      url = url.replace('/en', '/zh');
    } else {
      url = url.replace('/zh', '/en');
    }
    return url
  }

  const getMenuUrl = function () {
    currentUrl = enTozh(currentUrl)
    return currentUrl
  }

  const backToList = function (innerUrl, listUrl) {
    if (includesStr(innerUrl, currentUrl)) {
      var current = currentUrl.split(innerUrl)[0];
      current = enTozh(current);
      current += listUrl;
      return current
    }
    return null
  }

  const switchAllLanguage = function () {
    var blogUrl = backToList('/blogs.html?', '/blogs.html');
    var newsUrl = backToList('/news/', '/news.html');
    var targetUrl = '';

    if (blogUrl) {
      targetUrl = blogUrl;
    } else if (newsUrl) {
      targetUrl = newsUrl;
    } else {
      targetUrl = getMenuUrl();
    }
    window.location.href = targetUrl;
  }

  $(".nav-lang-btn, .nav-lang-H5").click(function (e) {
    e.preventDefault();
    if (includesStr('/docs/', currentUrl)) {
      switchLanguage();
      return;
    }
    switchAllLanguage();
  });

  $('#navigation').find('.dropdown').each(function () {
    $(this).hover(function (e) {
      var hoverTarget = e.target;
      if ($(hoverTarget).parent().is('.dropdown')) {
        $(hoverTarget).parent().toggleClass('hovered').toggleClass('open');
      }
    }, function (e) {
      var hoverTarget = e.target;
      if ($(hoverTarget).parent().is('.dropdown')) {
        $(hoverTarget).parent().toggleClass('hovered').toggleClass('open');
      }
    })
  })

  if (includesStr('/blogs', currentUrl)) {
    $('.nav-blog-link').closest('.dropdown').addClass('active');
  }

  const closeCookie = function () {
    $('.js-cookie-close').on('click', function (event) {
      event.preventDefault()
      $('.read-cookie').addClass('visited');
    })
  }
  const readCookie = function () {
    let cookies = document.cookie
    let index = cookies.indexOf('isRead=')
    let currentTime = new Date();
    // currentTime.setTime(currentTime.getTime() + 30 * 24 * 60 * 1000);
    currentTime.setTime(currentTime.getTime() + 1000)
    if (index === -1) {
      $('.read-cookie').removeClass('visited');
      closeCookie()
    } else {
      $('.read-cookie').addClass('visited');
    }
    let newCookie = 'isRead=read;expires=' + currentTime.toGMTString()
    document.cookie = newCookie
  }
  readCookie()
})