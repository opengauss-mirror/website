$(function () {
    // 直播事件
    var livePage = $('#livePage')
    window.addEventListener(
        'message',
        (event) => {
            let data = ''
            try {
                data = JSON.parse(event.data)
            } catch (e) {
                data = event.data
            }
            console.log('data', data)
            if (data.height == 'auto') {
                livePage.css('height', 550)
            } else if (data.height) {
                livePage.css('height', parseInt(data.height))
            }
            if (data.state == 3) {
                $('.tit0').text('精彩回顾')
            }
        },
        false
    )

    $('.liveBox a').click(function () {
        let liveId = $(this).data('id')
        $(this).addClass('active').siblings('a').removeClass('active')
        creatUserId(liveId)
    })
    // 移动端直播选择
    $('.live-select').change(function () {
        creatUserId($(this).val())
    })

    // 直播参数获取、生成随机username
    function creatUserId(liveId) {
        let digit = Math.round(Math.random() * 10)
        digit > 3 ? digit : (digit = 3)

        let returnId = '',
            userName = ''
        let charStr =
            '0123456789@#$%&~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
        for (var i = 0; i < digit; i++) {
            var index = Math.round(Math.random() * (charStr.length - 1))
            returnId += charStr.substring(index, index + 1)
        }
        userName = returnId
        livePage.attr(
            'src',
            `https://vhall.huawei.com/v2/watch/${liveId}?lang=zh&thirdId=${userName}`
        )
    }
    creatUserId('11185')
 

    // 分论坛切换
    var subIndex = 0
    var subLen = 4
    var transformBox = $('.transform-box')
    $('.sub-tab-mo .btn').click(function () {
        if ($(this).hasClass('prev')) {
            subIndex--
            if (subIndex < 0) {
                subIndex = subLen - 1
            }
        } else {
            subIndex++
            if (subIndex >= subLen) {
                subIndex = 0
            }
        }

        var title = transformBox
            .find('.sub-container')
            .eq(subIndex)
            .find('.meetingtitle')
            .text()

        $(this).siblings('.title').text(title)
        subTransform(subIndex)
    })
    function subTransform(index) {
        var subW = $('.sub-area').width()
        var left = -index * subW
        transformBox.stop(true, false).animate({ left: left }, 300)
        transformBox
            .find('.sub-container')
            .removeClass('active') 
            .eq(index)
            .addClass('active')
    }

    // 日程切换
    $('.timeTabs li').click(function () {
        let index = $(this).index()
        $(this).addClass('active').siblings('li').removeClass('active')
        $('.summit-container').removeClass('show').eq(index).addClass('show')
    })
    $('.sub-tab li').click(function () {
        let index = $(this).index()
        $(this).addClass('active').siblings('li').removeClass('active')
        $('.sub-container').removeClass('show').eq(index).addClass('show')
    })

})
