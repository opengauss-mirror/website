$(document).ready(function () {
    var lang = includesStr('/zh/', window.location.href) ? 'zh_CN' : 'en_US';

    var model = {
        previewImage:"",
        identification:"",
        messageTip:{
            success:true,
            text:""
        },
        usePC:false,
        emailAddress:"",
        VerificationCode:"",
        buttonText: lang === 'zh_CN'? '发送验证码': 'Send a verification code',
        searching:true,
        invalidUrl:false,
        isOutline:false,
        paParams:"",
        credent:[],
        isSend:false,
        showTemplate:false,
        showCheck:false,
        waitSendtimer:null,
        showSelector: false,
        changeTipMessage: function (res) {
            model.messageTip.text = res.message
            model.messageTip.success = res.success

            if (res.success) {
                $('.send-tip').removeClass('send-tip-error');
            }

            changeSendTip()
        },
        waitSend: function (){
            let num = 60
            model.waitSendtimer = setInterval(()=>{
                num--
                let send = lang === 'zh_CN' ? '重新发送' : 'Resend'
                model.buttonText = send + '（' + num + '）'
                changeSendBtnText()
                if(num==0){
                    clearInterval(model.waitSendtimer)
                    model.waitSendtimer = null
                    model.messageTip.text = ""
                    changeSendTip()

                    model.isSend = false
                    changeSendClass()

                    model.buttonText = lang === 'zh_CN'? '发送验证码': 'Send a verification code'
                    changeSendBtnText()
                }
            },1000)
        },
        showInfo: function (item, box){
            if(model.showCheck){
                item.check = !item.check
                changeCheckClass(item.check, box)
            }else{
                model.previewImage = item.imageUrl
                changeImgSrc()
                if(item.imageUrl){
                    model.showTemplate = true
                    changeTemlate()
                }
            }
        },
    }

    const insertGetCard = function () {
        let cardDisc ='<% for(var i in titles){ %>' +
            '<% title=titles[i] %>' +
            '<div> <%= title %></div>'+
            '<% }%>'

        let checkBox = '<% checked=item.check? "blue-border" : "" %>' +
            '<% if(showSelector){ %>' +
            '<div class="check <%= checked %>">' +
            ' <span class="is-check hide"></span>' +
            '</div>' +
            '<% } %>'

        let getCard = '<% for(var i in credent){ %>' +
            '<% item=credent[i] %>' +
            '<div data-item="<%= item.id %>" class="get-cred-item">' +
                ' <img src="<%= item.iconUrl %>">' +

                '<div class="get-cred-item-disc">' +
                '<% titles=item.title %>' +

                cardDisc +
                '</div>' +

                checkBox +

                '</div>'+
            '<% }%>'

        let rend = ejs.render(getCard,
            {
                credent: model.credent,
                showCheck: model.showCheck,
                showSelector: model.showSelector
        })
        $('#test').empty().append(rend);
        bandShowInfo()
    }

    var changeCheckClass = function (isCheck, box) {
        if (isCheck) {
            box.find('.check').addClass('blue-border')
            box.find('.is-check').removeClass('hide')
        } else {
            box.find('.check').removeClass('blue-border')
            box.find('.is-check').addClass('hide')
        }
    }

    var changeSearching = function () {
        if (model.searching) {
            let s = lang === 'zh_CN'? '证书查询': 'Query Certificates'
            $('.community-search').find('h3').text(s)
            $('.is-searching').removeClass('hide')
            $('.no-searching').addClass('hide')
        } else {
            let down = lang === 'zh_CN'? '证书下载': 'Download Certificates'
            $('.community-search').find('h3').text(down)
            $('.no-searching').removeClass('hide')
            $('.is-searching').addClass('hide')
        }
    }

    var changeCredent = function () {
        console.log(model.credent.length);
        if (model.credent.length) {
            $('.get-cred').removeClass('hide')
            $('.not-cred').addClass('hide')
        } else {
            $('.not-cred').removeClass('hide')
            $('.get-cred').addClass('hide')
        }

        if (model.credent.length && model.usePC) {
            $('.down-cred').removeClass('hide')
        } else {
            $('.down-cred').addClass('hide')
        }
    }

    var changeSendClass= function () {
        if (model.isSend) {
            $('.send-buttom').addClass('is-send')
        } else {
            $('.send-buttom').removeClass('is-send')
        }
    }

    var changeSendBtnText = function () {
        let btnText = model.buttonText
        $('.send-button').empty().text(btnText)
    }

    var changeSendTip = function () {
        let tip = model.messageTip.text
        let success = model.messageTip.success
        if (success) {
            $('.send-tip').removeClass('send-tip-error')
        } else {
            $('.send-tip').addClass('send-tip-error')
        }

        $('.send-tip').empty().text(tip)
    }

    var changeImgSrc = function () {
        let url = model.previewImage
        $('.preview-image').attr('src', url)
    }

    var changeTemlate = function () {
        if (model.showTemplate) {
            $('.show-template').removeClass('hide')
        } else {
            $('.show-template').addClass('hide')
        }
    }

    var changeShowCheck = function () {
        if (model.showCheck) {
            let c = lang === 'zh_CN'? '下载选中证书': 'Download Selected Certificates'
            $('.check').removeClass('hide')
            $('.down-cred').find('.button').text(c);
        } else {
            let down = lang === 'zh_CN'? '证书下载': 'Download Certificates'
            $('.check').addClass('hide')
            $('.down-cred').find('.button').text(down);

        }
    }

    var IsPC = function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        model.usePC = flag;
    }

    var inputModule = function () {
        model.emailAddress = $('.email-address').val()
        model.VerificationCode = $('.num-vertivation').val()
    }

    var trainingMethods = {
        getCode: function (email, lang){
            $.ajax({
                type: "GET",
                url: '/api-certification/certification/list/verifyCode',
                data: {
                    email
                },
                contentType: "application/json; charset=utf-8",
                notAuthorization: true,
                datatype: "json",
                headers: {
                    'Accept-Language': lang,
                },
                success: function (res) {
                    model.changeTipMessage(res)
                    if(res.success){
                        model.identification = res.data.identification
                        model.waitSend()
                    }else{
                        model.isSend = false
                        changeSendClass()
                    }
                },
                error: function (){
                    model.isSend = false
                    changeSendClass()
                }
            });
        },
        searchCard: function (params, lang) {
            $.ajax({
                type: "GET",
                url: '/api-certification/certification/list',
                data: params,
                contentType: "application/json; charset=utf-8",
                notAuthorization: true,
                datatype: "json",
                headers: {
                    'Accept-Language': lang,
                },
                success: function (res) {
                    if(res.success){
                        res.data.forEach(item=>{
                            item.check = false
                            item.iconUrl= "/api-certification/"+ item.iconUrl
                            item.imageUrl= "/api-certification/"+ item.imageUrl
                        })
                        model.credent = res.data || []
                        insertGetCard()
                        changeCredent()

                        model.searching = false
                        changeSearching()
                        model.messageTip.text = ""
                        changeSendTip()
                    }else{
                        alert(res.message)
                    }
                },
                error: function (){
                    let e = lang === 'zh_CN'? '您输入的验证码有误！': 'The verification code is incorrect.'
                    let res = {
                        message: e,
                        success: false
                    }
                    model.changeTipMessage(res)
                }
            });
        },
        downCard: function (params, lang) {
            $.ajax({
                type: "GET",
                url: '/api-certification/certification',
                data: params,
                contentType: "application/json; charset=utf-8",
                notAuthorization: true,
                datatype: "json",
                headers: {
                    'Accept-Language': lang,
                },
                success: function (res) {
                    if(res.success){
                        //将base64转换为blob
                        function dataURLtoBlob (dataurl) {
                            var arr = dataurl.split(','),
                                mime = arr[0].match(/:(.*?);/)[1],
                                bstr = atob(arr[1]),
                                n = bstr.length,
                                u8arr = new Uint8Array(n);
                            while (n--) {
                                u8arr[n] = bstr.charCodeAt(n);
                            }
                            return new Blob([u8arr], { type: mime });
                        }
                        //将blob转换为file
                        function blobToFile (theBlob, fileName){
                            theBlob.lastModifiedDate = new Date();
                            theBlob.name = fileName;
                            return theBlob;
                        }
                        //调用
                        let str = "data:application/pdf;base64," + res.data.data
                        var blob = dataURLtoBlob(str);
                        var file = blobToFile(blob, "zs");
                        let href = URL.createObjectURL(file)
                        let downloadElement = document.createElement("a")
                        downloadElement.href = href
                        downloadElement.download = res.data.fileName
                        document.body.appendChild(downloadElement)
                        downloadElement.click()
                        document.body.removeChild(downloadElement)
                    }else{
                        alert(res.message)
                    }
                },
                error: function (){
                    let n = lang === 'zh_CN'? '网络错误，请稍后再试！': 'Network error.Please try again later.'
                    let res = {
                        message: n,
                        success: false
                    }
                    model.changeTipMessage(res)
                }
            });
        },
    }

    $('.send-button').on('click', function () {
        inputModule()
        if(model.isSend || !model.emailAddress){
            return
        }
        model.isSend = true
        changeSendClass()
        trainingMethods.getCode(model.emailAddress, lang)
    })

    $('.submit-button').on('click', function () {
        inputModule()
        if(!model.VerificationCode || !model.emailAddress){
            return
        }

        trainingMethods.searchCard({
            identification: model.identification,
            code: model.VerificationCode
        }, lang)
    })

    $('.down-cred').find('.button').on('click', function () {
        model.showSelector = true
        insertGetCard()
        if(model.showCheck){
            model.credent.forEach(item=>{
                if(item.check){
                   trainingMethods.downCard({PA: item.signInfo}, lang)
                }
            })
        }
        if(model.usePC){
            model.showCheck = true
            changeShowCheck()
        }
    })

    $('.show-template').on('click', function () {
        model.showTemplate = false
        changeTemlate()
    })

    var bandShowInfo = function () {
        $('#test').find('.get-cred-item').on('click', function (event) {
            let target = $(this)
            let targetID = target.data('item')
            let currentCheck = null

            model.credent.forEach(function (item) {
                if (item.id === targetID) {
                    currentCheck = item
                }
            })

            if (currentCheck) {
                model.showInfo(currentCheck, $(this))
            }
        })
    }

    var __main = function (){
        IsPC()
        changeSendClass()
        changeSendTip()
        changeSearching()
        changeCredent()
        changeTemlate()
        insertGetCard()
        changeShowCheck()
    }
    __main()
})