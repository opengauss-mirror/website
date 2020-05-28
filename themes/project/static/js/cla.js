if(window.location.pathname == "/zh/cla.html" || window.location.pathname == "/en/cla.html") {
    $(function () {
        initClaPage();
        initCurrentDate();
    })
}
    



//获取时间
function initCurrentDate() {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var date = now.getDate();
    month = month + 1;

    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;

    time = year + "-" + month + "-" + date;

    if ($('#individual-table').length) {
        $('#individual-date').val(time);
        $('#individual-date').attr("disabled", true);
    }
    if ($('#legalentity-table').length) {
        $('#legalentity-date').val(time);
        $('#legalentity-date').attr("disabled", true);
    }
}

// 个人与法律贡献者切换
$('#sel input').click(function() {
    changeTable();
})

function changeTable() {
    const val = $('input[name="cla-type-radio"]:checked').val();
    
    if(val == 0) {
        $('.form_one').addClass('formShow');
        $('.form_one').removeClass('formHide');
        $('.form_two').addClass('formHide');
        $('.form_two').removeClass('formShow');
    }else {
        $('.form_two').addClass('formShow');
        $('.form_two').removeClass('formHide');
        $('.form_one').addClass('formHide');
        $('.form_one').removeClass('formShow');
    }
}

function readCookie(name) {
    var namePrefix = name + "=";
    var cookies = document.cookie.split(';');
    for(var i=0; i < cookies.length; i++) {
        var c = cookies[i];
        while (c.charAt(0)==' ') c = c.substring(1, c.length);
        if (c.indexOf(namePrefix) == 0) return c.substring(namePrefix.length, c.length);
    }
    return null;
}

// oAuth 授权
function oauthLogin() {
    let config = {
        providerID: "opengauss-bot",
        client_id: "4a111022f19a62016233a36586b1882b81fa385e57b2a7ea16b7829770f42c4b",
        redirect_uri: window.location.origin + "/cla",
        response_type: "code",
        authorization: "https://gitee.com/oauth/authorize",
        scopes: { request: ["user_info", "emails"]}
        }

   let client = new jso.JSO(config)
   client.callback()

   let f = new jso.Fetcher(client)
   let url = 'https://gitee.com/v5/user'
   f.fetch(url, {})
    .then((data) => {
        return data.json()
    })
    .then((data) => {
            console.log("I got protected json data from the API", data)
        })
    .catch((err) => {
        console.error("Error from fetcher", err)
    })
}

// init cla page
function initClaPage() {

    const clientId = "4a111022f19a62016233a36586b1882b81fa385e57b2a7ea16b7829770f42c4b";

    cla = readCookie("cla-info")
    if (!cla || cla == "") {
        oauthLogin();
    }
    

    type = readCookie("type")
    if (type && type == "0") {

        $('#individual-email').val(readCookie("email"));
        $('#individual-address').val(readCookie("address"));
        $('#individual-name').val(readCookie("name"));
        $('#individual-telephone').val(readCookie("telephone"));
        $('#individual-fax').val(readCookie("fax"));
        $('#individual-date').val(readCookie("date"));

        $('.form_one').addClass('formShow');
        $('.form_one').removeClass('formHide');
        $('.form_two').addClass('formHide');
        $('.form_two').removeClass('formShow');
        
        $("#sign-cla-button").attr('disabled',true)
        $("#reset-cla-button").attr('disabled',true) 
    } else if (type && type == "1") {

        $('#legalentity-name').val(readCookie("name"));
        $('#legalentity-title').val(readCookie("title"));
        $('#legalentity-corporation').val(readCookie("corporation"));
        $('#legalentity-address').val(readCookie("address"));
        $('#legalentity-date').val(readCookie("date"));
        $('#legalentity-email').val(readCookie("email"));
        $('#legalentity-telephone').val(readCookie("telephone"));
        $('#legalentity-fax').val(readCookie("fax"));

        $('.form_two').addClass('formShow');
        $('.form_two').removeClass('formHide');
        $('.form_one').addClass('formHide');
        $('.form_one').removeClass('formShow');
        $("#sign-cla-button").attr('disabled',true)
        $("#reset-cla-button").attr('disabled',true)

    }

    $('#individual-email').val(readCookie("email"));

    if ($('#sign-cla-button').length) {
        $("#sign-cla-button").bind('click', function () {
            v = parseInt($('input[name="cla-type-radio"]:checked').val());
            var regphone = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            var regmobile = /^1\d{10}$/;
            var regemail = /^[-_A-Za-z0-9.]+@([_A-Za-z0-9]+\.)+[A-Za-z0-9]{2,3}$/;
            $('#tip-cla-label').html('');
            lang = $('html').attr('lang');
            if (v == 0) {
                // individual
                var checkpass = true;
                $("input[type=text]", "#individual-table").each(function (i) {
                    if ($(this).hasClass("require")) {
                        if ($.trim($(this).val()) == "") {
                            checkpass = false;
                            return false;
                        }
                    }
                    return true;
                });
                if (!checkpass) {
                    if (lang == "zh-cn") {
                        $('#tip-cla-label').html("必填字段缺失!");
                    } else {
                        $('#tip-cla-label').html("Required field is missing!");
                    }
                    return false;
                }
                var email = $.trim($('#individual-email').val());
                if (!regemail.test(email)) {
                    if (lang == "zh-cn") {
                        $('#tip-cla-label').html("邮箱格式不正确!");
                    } else {
                        $('#tip-cla-label').html("E-Mail format is incorrent!");
                    }
                    return false;
                }
                var telephone = $.trim($('#individual-telephone').val());
                if (telephone != "") {
                    if ((!regphone.test(telephone)) && (!regmobile.test(telephone))) {
                        if (lang == "zh-cn") {
                            $('#tip-cla-label').html("电话格式不正确!");
                        } else {
                            $('#tip-cla-label').html("Telephone format is incorrent!");
                        }
                        return false;
                    }
                }
            } else {
                // legalentity
                var checkpass = true;
                $("input[type=text]", "#legalentity-table").each(function (i) {
                    if ($(this).hasClass("require")) {
                        if ($.trim($(this).val()) == "") {
                            checkpass = false;
                            return false;
                        }
                    }
                    return true;
                });
                if (!checkpass) {
                    if (lang == "zh-cn") {
                        $('#tip-cla-label').html("必填字段缺失!");
                    } else {
                        $('#tip-cla-label').html("Required field is missing!");
                    }
                    return false;
                }
                var email = $.trim($('#legalentity-email').val());
                if (!regemail.test(email)) {
                    if (lang == "zh-cn") {
                        $('#tip-cla-label').html("邮箱格式不正确!");
                    } else {
                        $('#tip-cla-label').html("E-Mail format is incorrent!");
                    }
                    return false;
                }
                var telephone = $.trim($('#legalentity-telephone').val());
                if (telephone != "") {
                    if ((!regphone.test(telephone)) && (!regmobile.test(telephone))) {
                        if (lang == "zh-cn") {
                            $('#tip-cla-label').html("电话格式不正确!");
                        } else {
                            $('#tip-cla-label').html("Telephone format is incorrent!");
                        }
                        return false;
                    }
                }
            }

            // build json
            var posturl = "/cla/";
            var jsonData = {};
            const language = (lang == "zh-cn") ? "zh" : "en";
            
            if (v == 0) {
                // individual
                jsonData = {
                    "type": v,
                    "name": $.trim($('#individual-name').val()),
                    "address": $.trim($('#individual-address').val()),
                    "date": $.trim($('#individual-date').val()),
                    "email": $.trim($('#individual-email').val()),
                    "telephone": $.trim($('#individual-telephone').val()),
                    "fax": $.trim($('#individual-fax').val()),
                    "code": "",
                    "lang": language,
                    "client": clientId,
                };
            } else {
                // legalentity
                jsonData = {
                    "type": v,
                    "name": $.trim($('#legalentity-name').val()),
                    // only for legalentity
                    "title": $.trim($('#legalentity-title').val()),
                    // only for legalentity
                    "corporation": $.trim($('#legalentity-corporation').val()),
                    "address": $.trim($('#legalentity-address').val()),
                    "date": $.trim($('#legalentity-date').val()),
                    "email": $.trim($('#legalentity-email').val()),
                    "telephone": $.trim($('#legalentity-telephone').val()),
                    "fax": $.trim($('#legalentity-fax').val()),
                    "code": "",
                    "lang": language,
                    "client": clientId,
                };
            }
            

            // send request
            $.ajax({
                type: "POST",
                url: posturl,
                data: JSON.stringify(jsonData),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (data) {
                    if (data) {
                        if (data.isSuccess) {
                            $("#reset-cla-button").trigger('click');
                            if (lang == "zh-cn") {
                                alert("签署成功!");
                            } else {
                                alert("Sign succeed!");
                            }
                        }
                    }
                },
                error: function (data) {
                    if (data.responseJSON.errorCode == 1) {
                        if (lang == "zh-cn") {
                            alert("服务器处理错误!");
                        } else {
                            alert("Server handle error!");
                        }
                    } else if (data.responseJSON.errorCode == 2) {
                        if (lang == "zh-cn") {
                            alert("邮箱已经被注册!");
                        } else {
                            alert("E-Mail is already registered!");
                        }
                    } else if (data.responseJSON.errorCode == 3) {
                        if (lang == "zh-cn") {
                            alert("电话已经被注册!");
                        } else {
                            alert("Telephone is already registered!");
                        }
                    } else if (data.responseJSON.errorCode == 4) {
                        if (lang == "zh-cn") {
                            alert("注册邮箱与gitee账号邮箱不一致，请在这里检查：https://gitee.com/profile/emails")
                        } else {
                            alert("The submit email is not the gitee account email. Please checck in https://gitee.com/profile/emails.");
                        }
                    }
                }
            });

            return false;
        });
    }

    if ($('#reset-cla-button').length) {
        $("#reset-cla-button").bind('click', function () {
            $('input[type="text"]', '#individual-table').val('');
            $('input[type="text"]', '#legalentity-table').val('');
            $('#tip-cla-label').html('');
            initCurrentDate();
            return false;
        });
    }
}