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
                $('.statistics_item .users').text(format(res.data.users));
                $('.statistics_item .business-osv').text(format(res.data.businessosv));
            }
        }
    });
})