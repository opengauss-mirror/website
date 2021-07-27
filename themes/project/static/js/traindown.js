$(document).ready(function () {
    var lang = includesStr('/zh/', window.location.href) ? 'zh' : 'en';

    var model = {
        downFail:false,
        messageTip:{
            success:true,
            text:""
        },
        VerificationCode:"",
        buttonText:'发送验证码',
        searching:true,
        invalidUrl:false,
        paParams:"",
        isSend:false,
        waitSendtimer:null,
        changeTipMessage: function (res) {
            model.messageTip.text = res.message
            model.messageTip.success = res.success

            if (res.success) {
                $('.send-tip').removeClass('send-tip-error');
            }

            changeSendTip()
        },
        getQueryString: function(name) {
            var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
            var r = window.location.search.substr(1).match(reg);
            if (r != null) {
                return unescape(r[2]);
            }
            return null;
        },
        waitSend: function (){
            let num = 60
            model.waitSendtimer = setInterval(()=>{
                num--
                model.buttonText = '重新发送' + '（' + num + '）'
                if(num==0){
                    clearInterval(model.waitSendtimer)
                    model.messageTip.text = ""
                    changeSendTip()

                    model.isSend = false
                    changeSendClass()

                    model.buttonText = '发送验证码'
                    changeSendBtnText()
                }
            },1000)
        },
        getPA: function (val) {
            let pa = val || this.getQueryString("PA")
            if (pa) {
                trainingMethods.downCard({PA:pa}, lang)
            }
        }
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

    var changeSendClass= function () {
        if (model.isSend) {
            $('.send-buttom').addClass('is-send')
        } else {
            $('.send-buttom').removeClass('is-send')
        }
    }

    var changeSearching = function () {
        if (model.searching) {
            $('.community-search').find('h3').text('证书查询')
            $('.is-searching').removeClass('hide')
            $('.no-searching').addClass('hide')
        } else {
            $('.community-search').find('h3').text('证书下载')
            $('.no-searching').removeClass('hide')
            $('.is-searching').addClass('hide')
        }
    }

    var trainingMethods = {
        refleshDownUrl: function (params, lang) {
            $.ajax({
                type: "GET",
                url: '/api-certification/refreshDonwnurl',
                data: params,
                contentType: "application/json; charset=utf-8",
                notAuthorization: true,
                datatype: "json",
                headLanguage: lang == "zh" ? false : lang,
                success: function (res) {
                    model.changeTipMessage(res)
                    if(res.success){
                        model.invalidUrl = true

                        model.searching = true
                        changeSearching()

                        model.isSend = true
                        changeSendClass()

                        model.waitSend()
                    } else {
                        // this.$message.error(res.message)
                    }
                },
                error: function (){
                    model.isSend = false
                    changeSendClass()
                }
            });
        },
        refleshDownCard: function (params, lang) {
            $.ajax({
                type: "PATCH",
                url: '/api-certification/refreshDonwnurl',
                data: params,
                contentType: "application/json; charset=utf-8",
                notAuthorization: true,
                datatype: "json",
                headLanguage: lang == "zh" ? false : lang,
                success: function (res) {
                    if(res.success){
                        model.getPA(res.data.signInfo)
                    }else{
                        model.messageTip.text = res.messageTip
                        changeSendTip()
                    }
                },
                error: function (){
                    model.isSend = false
                    changeSendClass()
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
                headLanguage: lang == "zh" ? false : lang,
                success: function (res) {
                    if(res.success){
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
                        function blobToFile (theBlob, fileName){
                            theBlob.lastModifiedDate = new Date();
                            theBlob.name = fileName;
                            return theBlob;
                        }
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
                        model.invalidUrl = false
                        model.downFail = true
                        model.paParams = params.PA
                    }
                },
            });
        }
    }

    $('.invalid-url').find('.down').on('click', function () {
        trainingMethods.refleshDownUrl({PA: model.paParams}, lang)
    })

    $('.send-button').on('click', function () {
        if(model.isSend){
            return
        }
        trainingMethods.refleshDownUrl({PA: model.paParams}, lang)
    })

    $('.submit-button').on('click', function () {
        model.VerificationCode = $('.num-vertivation').val()
        trainingMethods.refleshDownCard({PA: model.paParams, code: model.VerificationCode}, lang)
    })

    var __main = function (){
        model.getPA()
    }
    __main()
})