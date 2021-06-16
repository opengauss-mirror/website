console.log('product', versionList);
$(function () {
    var lang = window.location.href.includes('/zh/') ? 'zh' : 'en';
    var escapeHTML = function (str) {
        return  str.replace(/[&<>'"]/g, function (tag) {
            return ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)}
        );
    }
    var field = {
        pro: lang === 'zh' ? "认证的商业发行版" : "Product",
        name: lang === 'zh' ? "公司名称" : "Vendor",
        version: lang === 'zh' ? "openGauss社区版本" : "Community Version",
        award: lang === 'zh' ? "证书颁发日期" : "Date Certificate Issued",
        expiration: lang === 'zh' ? "证书有效截止日期" : "Certificate Validity Expiration Date",
        certify: lang === 'zh' ? "认证证书" : "Product Certificate",
        reported: lang === 'zh' ? "认证报告" : "Certification Report",
        certificate: lang === 'zh' ? "下载证书" : "Download Certificate",
        report: lang === 'zh' ? "下载报告" : "Download Report",
    }
    var insertFilterList = function (list) {
        let insertHtml = ''
        list.forEach(function (item) {
            insertHtml += '<ul class="tables table-content">'
            insertHtml += '<li><span>' + escapeHTML(item.pro) + '</span></li>'
            insertHtml += '<li><span>' + escapeHTML(item.name) + '</span></li>'
            insertHtml += '<li><span>' + escapeHTML(item.version) + '</span></li>'
            insertHtml += '<li><span>' + escapeHTML(item.award) + '</span></li>'
            insertHtml += '<li><span>' + escapeHTML(item.expiration) + '</span></li>'
            insertHtml += '<li className="hide"><a href="' + escapeHTML(item.certificate)+ '" download>'+ field.certificate +'</a></li>'
            insertHtml += '<li><a href="' + escapeHTML(item.report)+ '" download>'+ field.report +'</a></li>'
            insertHtml += '</ul>'
        })
        return insertHtml
    }
    var inserH5HTML = function (list) {
        let insertHtml = ''
        list.forEach(function (item) {
            insertHtml += '<ul class="tables table-content">'
            insertHtml += '<li><span class="pack-name">'+ field.pro +'：</span><span>' + escapeHTML(item.pro) + '</span></li>'
            insertHtml += '<li><span class="pack-name">'+ field.name +'：</span><span>' + escapeHTML(item.name) + '</span></li>'
            insertHtml += '<li><span class="pack-name">'+ field.version +'：</span><span>' + escapeHTML(item.version) + '</span></li>'
            insertHtml += '<li><span class="pack-name">'+ field.award +'：</span><span>' + escapeHTML(item.award) + '</span></li>'
            insertHtml += '<li><span class="pack-name">'+ field.expiration +'：</span><span>' + escapeHTML(item.expiration) + '</span></li>'
            insertHtml += '<li class="hide"><span class="pack-name">'+ field.certify +'：</span><a href="' + escapeHTML(item.certificate) + '" download>'+ field.certificate +'</a></li>'
            insertHtml += '<li><span class="pack-name">'+ field.reported +'：</span><a href="' + escapeHTML(item.report) + '" download>'+ field.report +'</a></li>'
            insertHtml += '</ul>'
        })
        return insertHtml
    }
    var sortKeywords = function (str) {
        let filterList = []
        versionList.forEach(function (item) {
            let pro = item.pro.toLowerCase()
            let name = item.name.toLowerCase()
            str = str.toLowerCase()
            if (pro.includes(str)) {
                filterList.push(item)
            }
            if (name.includes(str)) {
                filterList.push(item)
            }
        })
        return filterList
    }
    $('.js-search-certification').on('click', function () {
        var certify = escapeHTML($('.js-certification-input').val())
        var filter = sortKeywords(certify)
        var isMobile = document.body.clientWidth < 1000;
        console.log('filter', filter);
        var html = isMobile ? inserH5HTML(filter) : insertFilterList(filter)
        console.log('html', html);
        if (isMobile) {
            $('.h5-cve-pack').empty().append(html)

        } else {
            $('.js-list-content').empty()
            $('.js-list-content').append(html)
        }
    })

});