$(function($) {
    $(".list-box").find(".video-msg").addClass('hide');
    $(".list-box").find(".video-msg:lt(4)").removeClass('hide');
    $(".video-content[index]").find(".more-btn").click(function(){
        $(this).addClass('hide');
        var btnIndex1 = $(this).attr("index");
        switch(btnIndex1) {
            case 'live':
                $(".video-content[index='live']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='live']").find(".hide-btn").removeClass('hide');
                break;
            case 'publicity':
                $(".video-content[index='publicity']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='publicity']").find(".hide-btn").removeClass('hide');
                break;
            case 'activity':
                $(".video-content[index='activity']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='activity']").find(".hide-btn").removeClass('hide');
                break;
            case 'race':
                $(".video-content[index='race']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='race']").find(".hide-btn").removeClass('hide');
                break;
            case 'database':
                $(".video-content[index='database']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='database']").find(".hide-btn").removeClass('hide');
                break;
            case 'crash':
                $(".video-content[index='crash']").find(".video-msg:gt(3)").removeClass('hide');
                $(".video-content[index='crash']").find(".hide-btn").removeClass('hide');
                break;
            default:
                return false;
        }
    });
    $(".video-content[index]").find(".hide-btn").click(function(){
        $(this).addClass('hide');
        var btnIndex2 = $(this).attr("index");
        switch(btnIndex2) {
            case 'live':
                $(".video-content[index='live']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='live']").find(".more-btn").removeClass('hide');
                break;
            case 'publicity':
                $(".video-content[index='publicity']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='publicity']").find(".more-btn").removeClass('hide');
                break;
            case 'activity':
                $(".video-content[index='activity']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='activity']").find(".more-btn").removeClass('hide');
                break;
            case 'race':
                $(".video-content[index='race']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='race']").find(".more-btn").removeClass('hide');
                break;
            case 'database':
                $(".video-content[index='database']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='database']").find(".more-btn").removeClass('hide');
                break;
            case 'crash':
                $(".video-content[index='crash']").find(".video-msg:gt(3)").addClass('hide');
                $(".video-content[index='crash']").find(".more-btn").removeClass('hide');
                break;
            default:
                return false;
        }
    });
    $(".video-content[index='race']").find(".more-btn").addClass('hide');
    $(".video-content[index]").find(".video-msg").click(function(){
        var address = $(this).attr("href");
        window.location.href = address;
    });
});