$(function () {
    var livePage = $("#livePage");
    
    window.addEventListener("message",(event) => {
            let data = "";
            try {
                data = JSON.parse(event.data);
            } catch (e) {
                data = event.data;
            }   
            
            console.log(data);
            if (data.height == "auto") {
                livePage.css("height", 550); 
            } else if (data.height) { 
                livePage.css("height", parseInt(data.height)); 
            }else{
                let playerBoxW = livePage.width() || document.body.getBoundingClientRect().width ;
                let cutVal = 352,playerBoxH = 0 ;  
                // state: 0.未开播  1.已开播  2.已结束   3.回放中
                if(data.state == 1 || data.state == 2){ 
                    playerBoxH = (playerBoxW -cutVal ) / 16 * 9 + 40 + 'px'
                }else{  
                    playerBoxH = playerBoxW / 16 * 9 - 48 + 'px'
                }  
                livePage.css("height", playerBoxH); 
            }
            if(data.state == 3){ 
                $('.tit0').text('精彩回顾')
            }
          
        },false
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
        livePage.attr(
            "src",
            `https://vhall.huawei.com/v2/watch/${liveId}?lang=zh&thirdId=${userName}`
        );
    }
    creatUserId('10059');

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


});
