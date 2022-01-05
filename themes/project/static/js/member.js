$(function($) {
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
        let top = $(window).scrollTop()
        if (top < 800) {
            $('.fixed-nav ul li:nth-child(1)').addClass('active').siblings().removeClass('active')
        } else if ((top > 800) && (top < 9500)) {
            $('.fixed-nav ul li:nth-child(2)').addClass('active').siblings().removeClass('active')
        } else if (top > 9500) {
            $('.fixed-nav ul li:nth-child(3)').addClass('active').siblings().removeClass('active')
        }

    })

});