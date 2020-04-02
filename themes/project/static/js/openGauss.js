

//swiper
var mySwiper = new Swiper ('.swiper-container', {
    direction: 'horizontal', // 垂直切换选项
    loop: true, // 循环模式选项
    
    // 如果需要分页器
    pagination: {
      el: '.swiper-pagination',
      clickable :true,
    },
    
    
  })   

  //鼠标滑过pagination控制swiper切换
/* for(i=0;i<mySwiper.pagination.bullets.length;i++){
    mySwiper.pagination.bullets[i].onmouseover=function(){
      this.click();
    };
  } */


  /* //h5 点击微信图片显示二维码
  $('.list_wechat').on('click',function() {
    $('.qrCode').removeClass("qrCode_hide");
    $('.qrCode').addClass("qrCode_show");
  })

  //触屏隐藏二维码
  $('body').on('touchend',function() {
    $('.qrCode').removeClass("qrCode_show");
    $('.qrCode').addClass("qrCode_hide");
  })

  //滚动隐藏二维码
  $(window).on('scroll',function() {
    if($('.qrCode').hasClass('qrCode_show')) {
      $('.qrCode').removeClass("qrCode_show");
      $('.qrCode').addClass("qrCode_hide");
    }
  }) */
  