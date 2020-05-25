

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