

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