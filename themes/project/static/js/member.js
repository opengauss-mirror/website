$(function ($) {
    $('.js-to-top').on('click', function (e) {
        scroll(0, 0)
        $('.fixed-nav ul').find('li').removeClass('active')
        $('.fixed-nav ul li:first').addClass('active')
    })
    

    function tabScroll(obj) {
        var menuListId = []
        obj.each(function () {
            menuListId.push($(this).find('a').attr('href'))
        })
        
        obj.on('click', function (e) {
            e.preventDefault()
            $(this).addClass('active').siblings().removeClass('active')
            let id = $(this).find('a').attr('href')

            menuListId.forEach((item, index) => {
                if (item === id) {
                    let h = $(id).offset().top - 60
                    window.scrollTo(0, h)
                }
            })
        })

        if ($(window).width() > 1000) {
            $(window).scroll(function () {
                var targetUrl = []
                try {
                    targetUrl = menuListId.filter(function (item) {
                        return $(window).scrollTop() + 80 > $(item).offset().top
                    })

                    if (targetUrl.length) {
                        obj.removeClass('active')
                            .eq(targetUrl.length - 1)
                            .addClass('active')
                    }
                } catch (error) {
                    console.log(error)
                }
            })
        }
    }

    var tools = $('.fixed-nav ul li')
    tabScroll(tools)
})
