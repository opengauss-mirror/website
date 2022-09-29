$(document).ready(function () {
    $(".download-sel-version").M_select({
        'radius': '4px',
        'selected': '8',
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
    */ 
    const getCookie = function (name) {
        var cookies = document.cookie;
        var index = cookies.indexOf(name);
        return index === -1 ? false : true;
    }; 
    const setCookie = function (name, value) {
        var currentTime = new Date();
        currentTime.setTime(currentTime.getTime() + 30 * 24 * 60 * 60 * 1000);
        var newCookie = name + '=' + value + ';expires=' + currentTime.toGMTString() + ';path=/';
        document.cookie = newCookie;
    };
    
    $('.downtips .closed').on('click', function (event) {
        event.preventDefault();
        setCookie('isDownTips', 'read');
        $('.downtips').addClass('visited');
    });
 
    const closeDownCookie = function () {
        var hasCookie = getCookie('isDownTips=');
        var hasCookieLang = getCookie('lang=en');  
        if (hasCookie) {
            $('.downtips').addClass('visited');
        } else {
            $('.downtips').removeClass('visited');
        } 

        if(hasCookieLang){
            $('.downtips').addClass('visited');
        }
        
    };

    closeDownCookie();

})
