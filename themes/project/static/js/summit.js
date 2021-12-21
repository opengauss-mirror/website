$(function () {
    var livePage = $("#livePage");
    
    window.addEventListener("message",(event) => {
            let data = "";
            try {
                data = JSON.parse(event.data);
            } catch (e) {
                data = event.data;
            } 
            console.log("收到" + event.origin + " 消息： " , data)
            if (data.height == "auto") {
                livePage.css("height", 550);
            } else if (data.height) {
                livePage.css("height", parseInt(data.height));
            }
        },
        false
    );

    $('.liveBox a').click(function(){
        let liveId = $(this).data('id');
        $(this).addClass('active').siblings('a').removeClass('active'); 
        creatUserId(liveId)
    })

    function creatUserId(liveId) {
        let digit = Math.round(Math.random() * 10);
            digit > 3 ? digit : (digit = 3);
        
        let returnId = '',userName = '';

        let charStr =
            "0123456789@#$%&~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        for (var i = 0; i < digit; i++) {
            var index = Math.round(Math.random() * (charStr.length - 1));
            returnId += charStr.substring(index, index + 1);
        }
        userName = returnId; 
        console.log('liveId',liveId,'userName',userName)
        livePage.attr(
            "src",
            `https://vhall.huawei.com/v2/embed/${liveId}?embed=video&lang=zh&thirdId=${userName}`
        );
    }
    creatUserId('10059');

});
