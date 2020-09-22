// 展开二级菜单
function getList(val) {
    switch (val) {
        case "menu":
            $("#nav").slideToggle("slow");
            break;
        default:
            //$(".menu_list").slideUp("slow");
            $(val).slideToggle("slow");
            break;
    }
    $('#mask').addClass('maskLayer');
}

// 关闭二级菜单
function hideNav() {
    $("#nav").slideUp("slow");
    $(".menu_list").slideUp("slow");
    $('#mask').removeClass('maskLayer');
}

// 二级菜单每项点击后并将其隐藏
$('#nav .list').each(function () {
    $(this).on("click", function () {
        hideNav();
    })
})

// 监听滚动条 当大于 50的时候 关闭二级菜单
$(window).scroll(function () {
    var scrollTop = $(window).scrollTop();
    if (scrollTop > 50) {
        hideNav();
    }
});

var judgeNavs = function (str, navs) {
    var home = ['https://opengauss.org/zh/', 'https://opengauss.org/en/', 'http://localhost:1313/en/', 'http://localhost:1313/zh/']
    for (let h of home) {
        if (str === h) {
            return 'home'
        }
    }
    for (let nav of navs) {
        if (str.includes(nav)) {
            return nav
        }
    }
    return false
}

var mobileNavEvent = function () {
    var href = location.href
    var navs = ['lang', 'home', 'download', 'docs', 'contribution', 'onlineCommunication', 'onlineMeeting', 'security', 'news', 'events', 'blog', 'video', 'wechat']
    var current = judgeNavs(href, navs)
    if (current) {
        for (let i = 0; i < navs.length; i++) {
            var nav = navs[i]
            if (nav === current) {
                $("a.list").eq(i).addClass('active');
                break
            }
        }
    }
    if (href.includes('community') || href.includes('contribution')) {
        $('p.second_menu').addClass('active')
    } else {
        $('p.second_menu').removeClass('active')
    }
}

// 移动端导航栏添加样式
if ($(window).width() < 1280) {
    mobileNavEvent()
}
