$(document).ready(function () {
$('.left-tools').find('div').on('click', function (event) {
    event.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    let id = $(this).find('a').attr('href');
    let toTop = ['#connectors', '#middleware', '#management', '#migrationTools', '#dataTools', '#dataModel', '#clientTools', '#devOpsTools'];
    toTop.forEach((item, index) => {
     if (item === id){
         // 100 是距离顶端的基础值， 260 是 tool-item 的高度及下边距
         let t = 880 + index * 260;
         scrollTo(0, t);
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
        if (top <= 880) {
            $('.left-tools div:nth-child(1)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 1080) && (top < 1280)) {
            $('.left-tools div:nth-child(2)').addClass('active').siblings().removeClass('active');
        } else if ((top > 1280) && (top <= 1480)) {
            $('.left-tools div:nth-child(3)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 1480) && (top < 1780)) {
            $('.left-tools div:nth-child(4)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 1780) && (top < 2180)) {
            $('.left-tools div:nth-child(5)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 2180) && (top < 2380)) {
            $('.left-tools div:nth-child(6)').addClass('active').siblings().removeClass('active');
        } else if ((top >= 2380) && (top < 2680)) {
            $('.left-tools div:nth-child(7)').addClass('active').siblings().removeClass('active');
        } else if (top >= 2680) {
            $('.left-tools div:nth-child(8)').addClass('active').siblings().removeClass('active');
        }
        if (top >= 880) {
            $('.left-tools').removeClass('hide')
        } else {
            $('.left-tools').addClass('hide')
        }
    });
};
});