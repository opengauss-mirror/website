// 展开二级菜单
function getList(val) {
    switch (val) {
        case "menu":
            $("#nav").slideToggle("slow");
            $('#mask').toggleClass('maskLayer');
            break;
        default:
            $(val).slideToggle("slow");
            break;
    }
}
function getBlogLink(url) {
    var blogBaseUrl = '/blogs/blogs.html?';

    url = url.split('/blogs/');
    url.splice(1, 0, blogBaseUrl);
    url = url.join('');
    url = url.slice(0, -5);
    url += '/';
    url = url.toLowerCase();
    window.location.href = url;
}

// 关闭二级菜单
function hideNav() {
    $("#nav").slideUp("slow");
    $(".menu_list").slideUp("slow");
    $('#mask').removeClass('maskLayer');
    // $('#h5-input').hide();
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
    var home = ['https://opengauss.org/zh/', 'https://opengauss.org/en/', 'http://localhost:1313/en/', 'http://localhost:1313/zh/'];
    for (let h of home) {
        if (str === h) {
            return 'home';
        }
    }
    for (let nav of navs) {
        if (str.includes(nav)) {
            return nav;
        }
    }
    return false;
}

var mobileNavEvent = function () {
    var href = location.href;
    var navs = ['lang', 'download', 'docs', 'contribution', 'onlineCommunication', 'security', 'news', 'events', 'blog', 'video'];
    var current = judgeNavs(href, navs);
    var firstNavs = ['download', 'docs','security']
    var secondNavs = ['contribution', 'onlineCommunication', 'news', 'blog', 'events', 'video']

    if (firstNavs.includes(current)) {
        for (let i = 0; i < firstNavs.length; i++) {
            var nav = firstNavs[i];
            if (nav === current) {
                $(".first-nav").eq(i).addClass('active');
                break;
            }
        }
    }

    if (secondNavs.includes(current)) {
        for (let i = 0; i < secondNavs.length; i++) {
            var nav = secondNavs[i];
            if (nav === current) {
                $(".second-nav").eq(i).addClass('active');
                $(".second-nav").eq(i).parent('.menu_list').prev().addClass('active');
                break;
            }
        }
    }
}


var clickSearchMoblie = function () {
    $('.h5-nav-search').on('click', function (event) {
        event.stopPropagation();
        $('#mask').toggleClass('maskLayer');
    })
}

var clickSearch = function () {
    $('.nav-search').on('click', function (event) {
        event.stopPropagation();
        $('#search-box').addClass('show');
        $('.navbar-right').hide();
    });
    $('#search-box').on('click', function (event) {
        event.stopPropagation();
        var target = event.target;
        if (target.type !== 'text' && target.id !== 'search-icon') {
            $('#search-box').removeClass('show');
            $('.navbar-left').show();
            $('.navbar-right').show();
        }
    });
}

var searchInputEvent = function () {
    var lang = window.location.href.includes('/zh/') ? '/zh/' : '/en/';
    $('.home-search-pc').bind('keypress', function (event) {
        if (event.keyCode === 13) {
            var content = $('.home-search-pc').val();
            window.location.href = lang + 'search.html?keyword=' + encodeURI(content);
        }
    })
    $('#search-icon').bind('click', function (event) {
        var content = $('.home-search-pc').val();
        window.location.href = lang + 'search.html?keyword=' + encodeURI(content);
    })
}

// 点击搜索按钮事件
$(document).ready(function () {
    clickSearch();
    searchInputEvent();
})


// 移动端导航栏添加样式
if ($(window).width() < 1367) {
    mobileNavEvent();
    clickSearchMoblie();
}
$('#h5-icon-input').on('click', function () {
    var lang = window.location.href.includes('/zh/') ? '/zh/' : '/en/';
    window.location.href = lang + 'search.html?keyword=' + encodeURI($('.home-search').val());
})
$('.home-search').on('keypress', function (event) {
    if (event.keyCode === 13) {
        var lang = window.location.href.includes('/zh/') ? '/zh/' : '/en/';
        window.location.href = lang + 'search.html?keyword=' + encodeURI($('.home-search').val());
    }
})