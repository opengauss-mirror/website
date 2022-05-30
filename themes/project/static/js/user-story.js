$(document).ready(function () {
$('.left-tools').find('div').on('click', function (e) {
    e.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    let id = $(this).find('a').attr('href');
    let toTop = ['#dbv', '#isv', '#developer', '#finance', '#other', '#government', '#education', '#science', '#energy','#industrial','#carriers','#oilGas'];
    toTop.forEach((item, index) => {
     if (item === id){
         let h = $(id).offset().top - 60;
         window.scrollTo(0, h)
     }
    });
});

if ($(window).width() < 1000) {
    $('.stretch-img').each(function () {
        new RTP.PinchZoom($(this), {});
    });
    $('.isH5 .tool-detail').find('.tool-item').find('.item-title').on('click', function () {
        $(this).siblings('.item-detail').toggleClass('hide');

        let url = $(this).find('img').attr('src');
        if (url.includes('right')) {
            $(this).find('img').attr('src', '/img/swiper/down.svg');
        } else {
            $(this).find('img').attr('src', '/img/swiper/right.svg');
        }
    })
} else {
    $(window).scroll(function () {
        let top = $(window).scrollTop();
        // console.log('top', top)
        if (top <= 755) {
            $('.left-tools div:nth-child(1)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 755) && (top < 955)) {
            $('.left-tools div:nth-child(2)').addClass('active').siblings().removeClass('active');
        } else if ((top > 955) && (top <= 1253)) {
            $('.left-tools div:nth-child(3)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 1253) && (top < 1806)) {
            $('.left-tools div:nth-child(4)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 1806) && (top < 2101)) {
            $('.left-tools div:nth-child(5)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 2101) && (top < 2380)) {
            $('.left-tools div:nth-child(6)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 2380) && (top < 2680)) {
            $('.left-tools div:nth-child(7)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 2680) && (top < 2880)) {
            $('.left-tools div:nth-child(8)').addClass('active').siblings().removeClass('active');
        }else if (top >= 2880) {
            $('.left-tools div:nth-child(9)').addClass('active').siblings().removeClass('active');
        }
        // if (top >= 880) {
        //     $('.left-tools').removeClass('hide')
        // } else {
        //     $('.left-tools').addClass('hide')
        // }
    });
};
});