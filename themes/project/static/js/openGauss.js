$(document).ready(function() {
  var myBannerSwiper = new Swiper ('.banner_swiper', {
    direction: 'horizontal', // 切换选项
    /* loop: true, */ // 循环模式选项
    autoplay: {
      delay: 5000,
      stopOnLastSlide: false,
      disableOnInteraction: true,
    },
    
    // 如果需要分页器
    pagination: {
      el: '.banner_swiper_pagination',
      type: 'bullets',
      clickable :true,
    },
  }) 

  var sliderCount = document.body.clientWidth < 760 ? 2 : 3;

  var mySwiper = new Swiper ('.swiper_video', {
    direction: 'horizontal', // 切换选项
    slidesPerView: sliderCount || 3,
    loop: true, // 循环模式选项

    multipleActiveThumbs: true,
    
    // 如果需要前进后退按钮
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  }) 
  
  // 下载页面table切换
  $('.table-nav').children('.table-option').each(function(index){
    $(this).click(() => {
      // 改变自身以及兄弟元素的样式
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      // 切换显示内容
      $($('.table-content').children()[index]).removeClass('table-hide');
      $($('.table-content').children()[index]).siblings().addClass('table-hide');
    })
  })

  // 下载页面移动端  SHA 展开/收回
  $('.download_more').click(function() {
    $(this).addClass('hide');
    $(this).prev().addClass('download_sha_unfold');
  })
  $('.download_close').click(function() {
    $(this).parent().next().removeClass('hide');
    $(this).parent().removeClass('download_sha_unfold');
  })

  // 下载页面移动端 connectors 切换
  $('.connectors_table').children('div').each(function(index){
    $(this).click(() => {
      // 改变自身以及兄弟元素的样式
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      // 切换显示内容
      $($('.connectors_content').children()[index]).removeClass('table-hide');
      $($('.connectors_content').children()[index]).siblings().addClass('table-hide');
    })
  })

  // 下载页面移动端 tools 切换
  $('.tools_table').children('div').each(function(index){
    $(this).click(() => {
      // 改变自身以及兄弟元素的样式
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      // 切换显示内容
      $($('.tools_content').children()[index]).removeClass('table-hide');
      $($('.tools_content').children()[index]).siblings().addClass('table-hide');
    })
  })

  // 文档页面语言切换
  var currentUrl = window.location.href;

  const switchLanguage = function () {
    var urls = currentUrl.split('/docs/');
    urls = urls.slice(0, urls.length - 1);
    urls.push('Quickstart/Quickstart.html');
    urls = urls.join('/docs/');

    if (urls.includes('/zh/')) {
      urls = urls.replace('/zh/', '/en/');
    } else {
      urls = urls.replace('/en/', '/zh/');
    }

    $(".language-li ul").children(":first").click(function (e) {
      e.preventDefault();
      window.location.href = urls;
    });
  }

  if (currentUrl.includes('/docs/')) {
    switchLanguage();
  }
})