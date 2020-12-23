$(function($) {
    if(document.body.clientWidth < 1000) {
        if($("html").attr("lang") == 'en-us') {
            $(".meeting>div:nth-of-type(2) table>tbody>tr:first-of-type>td:last-of-type span").text("Archives");
            $(".meeting>div:nth-of-type(2) table>tbody>tr>td:last-of-type").css("width","22%");
        }else {
            $(".meeting>div:nth-of-type(2) table>tbody>tr:first-of-type>td:last-of-type span").text("归档");
        }
    }
})