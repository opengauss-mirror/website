$(document).ready(function () {

$('.left-tools').find('div').on('click', function (event) {
    event.preventDefault();
    $(this).addClass('active').siblings().removeClass('active');
    let id = $(this).find('a').attr('href');
    let toTop = ['#connectors', '#middleware', '#management', '#migrationTools', '#dataTools', '#dataModel', '#clientTools', '#devOpsTools'];
    toTop.forEach((item, index) => {
     if (item === id){
         // 100 是距离顶端的基础值， 260 是 tool-item 的高度及下边距
         let t = 100 + index * 260;
         scrollTo(0, t);
     }
    });
});

if ($(window).width() < 1000) {
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
        if (top < 200) {
            $('.left-tools div:nth-child(1)').addClass('active').siblings().removeClass('active');
        } else if ((top > 200) && (top < 400)) {
            $('.left-tools div:nth-child(2)').addClass('active').siblings().removeClass('active');
        } else if ((top > 400) && (top < 600)) {
            $('.left-tools div:nth-child(3)').addClass('active').siblings().removeClass('active');
        } else if ((top > 600) && (top < 800)) {
            $('.left-tools div:nth-child(4)').addClass('active').siblings().removeClass('active');
        } else if ((top > 800) && (top < 1200)) {
            $('.left-tools div:nth-child(5)').addClass('active').siblings().removeClass('active');
        } else if ((top > 1200) && (top < 1500)) {
            $('.left-tools div:nth-child(6)').addClass('active').siblings().removeClass('active');
        } else if ((top > 1500) && (top < 1600)) {
            $('.left-tools div:nth-child(7)').addClass('active').siblings().removeClass('active');
        } else if (top > 1600) {
            $('.left-tools div:nth-child(8)').addClass('active').siblings().removeClass('active');
        }
    });
};
});