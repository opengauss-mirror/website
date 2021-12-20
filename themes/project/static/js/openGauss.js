$(document).ready(function() {
  var myBannerSwiper = new Swiper ('.banner_swiper', {
    direction: 'horizontal', // 切换选项
    // loop: true,  // 循环模式选项
    // autoplay: {
    //   delay: 5000,
    //   stopOnLastSlide: false,
    //   disableOnInteraction: true,
    // },
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
  if(myBannerSwiper.el){
    //鼠标覆盖停止自动切换与隐藏前进后退按钮
    myBannerSwiper.el.onmouseover = function(){ 
      myBannerSwiper.navigation.$nextEl.removeClass('hide');
      myBannerSwiper.navigation.$prevEl.removeClass('hide');
    }
    //鼠标覆盖停止自动切换与隐藏前进后退按钮
    myBannerSwiper.el.onmouseout = function(){
      myBannerSwiper.navigation.$nextEl.addClass('hide');
      myBannerSwiper.navigation.$prevEl.addClass('hide');
    }
  }
  

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
    if (includesStr('/training.html', url)) {
      url = 'https://opengauss.org/en/';
      return url
    }
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
    var lang = window.location.href.includes('/zh/') ? 'en' : 'zh';
    setCookie('lang', lang)
  });
 

  if (includesStr('/blogs', currentUrl)) {
    $('.nav-blog-link').closest('.dropdown').addClass('active');
  }

  const getCookie = function (name) {
    var cookies = document.cookie;
    var index = cookies.indexOf(name);
    return index === -1 ? false : true;
  };

  const setCookie = function (name, value) {
    var currentTime = new Date();
    currentTime.setTime(currentTime.getTime() + 30 * 24 * 60 * 60 * 1000);
    var newCookie = name + '=' + value + ';expires=' + currentTime.toGMTString() + ';path=/';
    document.cookie = newCookie;
  };

  const closeCookie = function () {
    var hasCookie = getCookie('isRead=');
    if (hasCookie) {
      $('.read-cookie').addClass('visited');
    } else {
      $('.read-cookie').removeClass('visited');
    }

    $('.js-cookie-close').on('click', function (event) {
      event.preventDefault();
      setCookie('isRead', 'read');
      $('.read-cookie').addClass('visited');
    });
  };

  closeCookie();

  

})