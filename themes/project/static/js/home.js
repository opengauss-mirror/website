$(document).ready(function () {
    function format(num){
        num = Number(num);
        if(num > 999){
            num = num.toString();
            return num.slice(0,-3) + '.' + num.slice(num.length-3,num.length-2) + 'k';
        }
        return num;
    }
    $.ajax({
        type: 'GET',
        headers: {
            'Authorization': 'Basic b3BlbmV1bGVyc2VydmVyOm9wZW5ldWxlcnNlcnZlckAxMjM0'
        },
        url: '/statistics/search/statistics?type=openGauss',
        contentType: 'application/json; charset=utf-8',
        crossDomain: true,
        datatype: 'json',
        success: function (res) {
            if(res.msg === 'OK'){
                $('.statistics_item .contributors').text(format(res.data.contributors));
                $('.statistics_item .users').text(format(res.data.downloaduser));
                $('.statistics_item .business-osv').text(format(res.data.businessosv));
            }
        }
    });

    let url = 'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com/openGauss%E5%AE%A3%E4%BC%A0%E6%B4%BB%E5%8A%A8/openGauss%2BHC%E5%AE%A3%E4%BC%A0%E8%A7%86%E9%A2%91.mp4';

    var videoPlay = function (videoUrl) {
        let html = `
        <source src=${url}>`;
        let video = document.querySelector(".home-banner-video");
        video.insertAdjacentHTML('beforeend', html);
        video.load();
    };

    $('#video-player').click(function () { 
        videoPlay(url);
        $('.video-remove').show();
    });
    $('.video-mask').click(function () {
        $('.home-banner-video').trigger('pause');
        $('.video-remove').hide();
    });

    $('.js-view-more').on('click', function() {
        $('.js-organ-loadup').removeClass('h5-hide');
        $('.js-fold-up').removeClass('hide');
        $('.js-view-more').addClass('hide');
    });
    $('.js-fold-up').on('click', function() {
        $('.js-organ-loadup').addClass('h5-hide');
        $('.js-view-more').removeClass('hide');
        $('.js-fold-up').addClass('hide');

    });
})