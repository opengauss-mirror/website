$(document).ready(function () {
    $(".download-sel-version").M_select({
        'radius': '4px',
        'selected': '5',
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
})
