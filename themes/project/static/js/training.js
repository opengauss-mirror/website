$(document).ready(function () {
$('.qa-box').find('.qa-item').click(function () {
    $(this).find('.qa-answer').toggleClass('active');
    $(this).find('.open-icon').toggleClass('icon-close');
});
var handleSystemClick = function () {
    var levels = ['.sys-ogca', '.sys-ogcp', '.sys-ogce'];
    levels.forEach(function (item) {
        $(item).find('.sys-header').find('.head-box').click(function () {
            $(this).parent().fadeOut();
        });
    });
    $('.sys-ogca').find('.sys-header').find('.sys-footer').find('.outline-box').find('.outline-head').click(function() {
        $(this).siblings().find('.detail-card').addClass('hide');
        $(this).siblings().find('.default-card').removeClass('hide');
        $(this).find('.default-card').toggleClass('hide');
        $(this).find('.detail-card').toggleClass('hide');
    });
    if (document.body.clientWidth > 1000) {
        $('.js-toggle-level').find('.sys-mini-box').find('.mini-head').click(function () {
            let name = '.sys-';
            name += $(this).attr('index');
            $(name).addClass('alive').find('.sys-header').fadeIn();
        });
    }
};
var mobileSytleClick = function (btnName, btnStyle) {
$('.js-toggle-level').find('.sys-mini-box').find('.mini-footer').find(btnName).click(function () {
    let level = $(this).attr('index');
    let hideBtn = btnStyle + '[index="' + level + '"]';
    level = '.' + level;
    $(this).addClass('hide');
    $(hideBtn).removeClass('hide');
    if (btnName === '.more-btn') {
        $(this).siblings(level).removeClass('hide');
    } else {
        $(this).siblings(level).addClass('hide');
    }
});
};

var tagScroll = function () {
    $('.js-to-top').on('click', function (e) {
        scroll(0, 0);
        $('.fixed-nav ul').find('li').removeClass('active');
        $('.fixed-nav ul li:first').addClass('active');
    });
    $('.fixed-nav ul').find('li').on('click', function (e) {
        let target = e.target;
        if (target.tagName === 'A') {
            $(this).addClass('active').siblings().removeClass('active');
        }
    });
    $(window).scroll(function () {
        let top = $(window).scrollTop();
        if (top < 300) {
            $('.fixed-nav ul li:nth-child(1)').addClass('active').siblings().removeClass('active');
        } else if ((top > 300) && (top < 700)) {
            $('.fixed-nav ul li:nth-child(2)').addClass('active').siblings().removeClass('active');
        } else if ((top > 700) && (top < 1300)) {
            $('.fixed-nav ul li:nth-child(3)').addClass('active').siblings().removeClass('active');
        } else if ((top > 1300) && (top < 1600)) {
            $('.fixed-nav ul li:nth-child(4)').addClass('active').siblings().removeClass('active');
        } else if (top > 1600) {
            $('.fixed-nav ul li:nth-child(5)').addClass('active').siblings().removeClass('active');
        }
    });
};
var changeStyleMobile = function () {
    if (document.body.clientWidth < 1000) {
        $('.foot-ogca').find('.sys-footer').find('.outline-box').find('.outline-head').click(function() {
            $(this).find('.visible-card').toggleClass('hide').parent().parent().toggleClass('high-light');
        });
    }
};
var __main = function () {
    handleSystemClick();
    tagScroll();
    mobileSytleClick('.more-btn', '.hide-btn');
    mobileSytleClick('.hide-btn', '.more-btn');
    changeStyleMobile();
};
__main();
});