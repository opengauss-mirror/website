export default class Utils {
    // 设置cookie
    static setCookie(name, value, domain) {
        var Days = 30;
        var exp = new Date();
        exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
        // 判断是否需要跨域
        if (domain) {
            document.cookie = name + " = " + escape(value) + ((exp == null) ? "" : ";expires=" + exp.toUTCString()) + `;path=/;domain=${domain}`;
        } else {
            document.cookie = name + " = " + escape(value) + ((exp == null) ? "" : ";expires=" + exp.toUTCString()) + `;path=/`;
        }
    }

    // 读取cookie
    static getCookie(name) {
        var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

        if (arr = document.cookie.match(reg))

            return unescape(arr[2]);
        else
            return null;
    }

    // 获取语言
    static getLanguage(name) {
        let lang;
        if (window.location.search) {
            lang = this.getQuery("lang");
        } else {
            lang = this.getCookie(name);
        }

        if (lang && lang != null) {
            if (lang == 'zh_CN') {
                lang = 'zh'
            } else if (lang == 'en_US') {
                lang = 'en'
            }
            return lang;
        } else if (navigator.language) {
            lang = navigator.language.substr(0, 2);
            return lang;
        } else {
            lang = 'zh'
        }
        return lang;
    }

    // 外部网站进入改语言，通过约定参数 lang=zh?lang=en
    static getQuery(variable) {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (let i = 0; i < vars.length; i++) {
            let pair = vars[i].split("=");
            if (pair[0] == variable) {
                return pair[1]
            }

        }
        return false;
    }
}