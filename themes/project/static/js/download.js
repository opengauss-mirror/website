$(document).ready(function () {
    $(".download-sel-version").M_select({
        'radius': '4px',
        'selected': '6',
        Succee:function(option){
            console.log(option)
            $("div[class*=download-version-]").addClass("hide");
            $(".download-version-" + option).removeClass("hide");
        }
    });
    $('.down-teble-copy').each(function(){
        $(this).click(() => {
            let val = $(this).attr('name')
            var input = document.getElementById("copy-input-hide");
            input.value = val; // 修改文本框的内容
            input.select(); // 选中文本
            if(document.execCommand){
                document.execCommand("copy")
                $("#download-content .copy-success").show()
                setTimeout(()=>{
                    $("#download-content .copy-success").hide()
                },1500)
            }
        })
    });

    /*
        下载软件包》页面提示 
        中文显示下载提示
        by:awx1109887   2021/12/15
    */ 
    const getCookie = function (name) {
        var cookies = document.cookie;
        var index = cookies.indexOf(name);
        return index === -1 ? false : true;
    }; 
 
    const closeDownCookie = function () {
        var hasCookie = getCookie('isDownTips=');
        var hasCookieLang = getCookie('lang=zh'); 
        if(hasCookieLang){
            if (hasCookie) {
                $('.downtips').addClass('visited');
            } else {
                $('.downtips').removeClass('visited');
            }
    
            $('.downtips .closed').on('click', function (event) {
                event.preventDefault();
                setCookie('isDownTips', 'read');
                $('.downtips').addClass('visited');
            });
        }else{
            $('.downtips').addClass('visited');
        }
        
    };

    closeDownCookie();

})
