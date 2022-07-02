$(function () {

    // 分论坛切换
    var subIndex = 0;
    var subLen = 4;
    var subW = $('.sub-area').width();
    var transformBox  = $('.transform-box');
    $('.sub-tab-mo .btn').click(function(){
        if($(this).hasClass('prev')){
          subIndex--;
          if(subIndex < 0){
            subIndex = subLen-1;
          } 
        }else{
          subIndex++; 
          if(subIndex >= subLen){
            subIndex = 0;
          } 
        }
        
        var title = transformBox.find('.sub-container').eq(subIndex).find('.meetingtitle').text();
        console.log(subIndex,title)
        $(this).siblings('.title').text(title)
        subTransform(subIndex)   
    }) 
    function subTransform(index){
      var left = -index * subW;
      transformBox.stop(true,false).animate({'left':left},300);
      transformBox.find('.sub-container').removeClass('active').eq(index).addClass('active');
    }
     
    // 日程切换 
    $('.timeTabs li').click(function(){
        let index = $(this).index(); 
        $(this).addClass('active').siblings('li').removeClass('active'); 
        $('.summit-container').removeClass('show').eq(index).addClass('show'); 
    })
    $('.sub-tab li').click(function(){
        let index = $(this).index(); 
        $(this).addClass('active').siblings('li').removeClass('active'); 
        $('.sub-container').removeClass('show').eq(index).addClass('show'); 
    })

    


    // 右侧导航
    $('.js-to-top').on('click', function (e) {
        scroll(0, 0);
         $('.fixed-nav ul').find('li').removeClass('active');
         $('.fixed-nav ul li:first').addClass('active');
     });
    $('.fixed-nav ul').find('li').on('click', function (e) {
        let target = e.target
        if (target.tagName === 'A') {
            $(this).addClass('active').siblings().removeClass('active')
        } 
    }) 
    $(window).scroll(function () {
        let top = $(window).scrollTop(); 
        if (top < 800) { 
            $('.fixed-nav ul li:nth-child(1)').addClass('active').siblings().removeClass('active')
        } else if ((top > 1500) && (top < 2650)) {
            $('.fixed-nav ul li:nth-child(2)').addClass('active').siblings().removeClass('active')
        }else if ((top > 2650) && (top < 3500)) {
            $('.fixed-nav ul li:nth-child(3)').addClass('active').siblings().removeClass('active')
        } else if (top > 3500) {
            $('.fixed-nav ul li:nth-child(4)').addClass('active').siblings().removeClass('active')
        }

    })


     

});
