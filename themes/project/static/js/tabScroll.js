$(document).ready(function () {
    function tabScroll(obj) {
        var menuListId = []
        forList(obj, menuListId)

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
                var targetUrlArr = []
                forList(obj, targetUrlArr)
                try {
                    targetUrl = targetUrlArr.filter(function (item) {
                        return $(window).scrollTop() + 80 > item.offset().top
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
        function forList(obj, arr) {
            obj.each(function () {
                arr.push($($(this).find('a').attr('href')))
            })
            return arr
        }
    }
    // 调用
    // var tools = $('.left-tools div')
    // tabScroll(tools)
})