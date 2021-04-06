$(document).ready(function () {
    var lang = window.location.href.includes('/zh/') ? 'zh' : 'en';
    var adMethods = null
    var privateData = {
        listRequire: {
            pageNum: 1,
            pageSize: 10,
            searchName: '',
            years: 2021,
            cveLevel: 0,
            releaseFlag: 1
        },
        listResponse: {},
        detailRequire: {
            gaussSaNum: 'openGauss-SA-2021-1002',
        },
        detailResponse: {},
        insertList: function (data) {
            $('.table-detail').empty();
            $('.h5-ad-table').empty();

            data.forEach(item => {
                let t  = `
            <ul class="tables table-content">
                <li><a class="js-goto-detail" href="./security-advisories/detail.html" data-url="${item.gaussSaNum}">${item.gaussSaNum}</a></li>
                <li><span>${item.summary}</span></li>
                <li><span>${item.cveLevel}</span></li>
                <li><span>${item.affectProduct}</span></li>
                <li><span>${item.influenceComponent}</span></li>
                <li><span>${item.releaseDate}</span></li>
            </ul>`
                $('.table-detail').append(t);

                let gg = lang === 'zh' ? '公告：' : 'Advisory：'
                let gy = lang === 'zh' ? '概要：' : 'Synopsis：'
                let yyjb = lang === 'zh' ? '严重级别：' : 'Severity：'
                let yycp = lang === 'zh' ? '影响产品：' : 'Affected Product：'
                let yyzj = lang === 'zh' ? '影响组件：' : 'Affected Component：'
                let fbsj = lang === 'zh' ? '发布时间：' : 'Release Date：'

                let h5 = `<ul class="tables table-content">
                <li><span class="pack-name">${gg}</span><a class="js-goto-detail" href="./security-advisories/detail.html" data-url="${item.gaussSaNum}">${item.gaussSaNum}</a></li>
                <li><span class="pack-name">${gy}</span><span>${item.summary}</span></li>
                <li><span class="pack-name">${yyjb}</span><span>${item.cveLevel}</span></li>
                <li><span class="pack-name">${yycp}</span><span>${item.affectProduct}</span></li>
                <li><span class="pack-name">${yyzj}</span><span>${item.influenceComponent}</span></li>
                <li><span class="pack-name">${fbsj}</span><span>${item.releaseDate}</span></li>
            </ul>`
                $('.h5-ad-table').append(h5);
            })

        },
        insertDetail: function (data) {
            $('.js-h2').empty().append(data.gaussSaNum);
            $('.js-release-data').empty().append(data.releaseDate)
            $('.js-summary').empty().append(data.summary)
            $('.js-cveLevel').empty().append(data.cveLevel)
            $('.js-theme').empty().append(data.theme)
            $('.js-description').empty().append(data.description)
            $('.js-influence').empty().append(data.influenceComponent)
            $('.js-cve').empty();
            let cveNum = data.cveNumbers

            if (cveNum.includes(';')) {
                cveNum = data.cveNumbers.split(';')
            } else {
                let a = []
                a.push(cveNum)
                cveNum = a
            }

            cveNum.forEach(item => {
                $('.js-cve').append(`<a class="js-back-to-cve" href="/${lang}/cve/detail.html" data-cveurl="${item}">${item}</a>`);
            })

            $('.js-reference').empty();
            let cveLink = data.referenceLink.split(';')
            cveLink.forEach(item => {
                $('.js-reference').append(`<a href="${item}" target="_blank">${item}</a>`)
            })

            $('.h5-ad-pack').empty();
            let body = data.versionsBody

            body.forEach(item => {

                let v = item.versions
                let versionToClass = v.split('.').join('-')
                let t = `<div class="pack-version js-table-data-${versionToClass}">
                    <h2 class="js-pack-title">openGauss-${v}</h2>
                </div>`
                $('.js-pack').append(t)

                let pack = item.packageBody
                let plat = lang === 'zh' ? '平台：' : 'Platform：'
                let soft = lang === 'zh' ? '软件包：' : 'Package：'
                pack.forEach(item => {
                    if (item.groupName.includes('Tools')) {
                        let tag = item.tagBody
                        let t = `<div class="tools-pack pc-pack js-tools-${versionToClass}">
                            <h3>openGauss Tools</h3>
                            <ul class="pack-title">
                                <li></li>
                                <li>windows_x86_64</li>
                                <li></li>
                                <li></li>
                            </ul>
                        </div>`
                        $(`.js-table-data-${versionToClass}`).append(t)

                        $(`.js-table-data-${versionToClass}`).append(`<div class="h5-ad-item-${versionToClass}"></div>`)
                        $(`.h5-ad-item-${versionToClass}`).append(`<h3 class="h5-ad-pack">openGauss Tools</h3>`)
                        tag.forEach(item => {
                            let c = `<ul class="pack-content">
                                <li>${item.packageName}</li>`
                            if (item.affectedPlatform.includes('windows_x86_64')) {
                                c += `<li><img src="/img/cve/oval.svg" alt=""></li>`
                            }

                            c += `</ul>`

                            $(`.js-tools-${versionToClass}`).append(c)

                            let h5Li = item.affectedPlatform.join('<br/>')
                            let h5Tools = `<ul class="pack-content h5-ad-pack">
                                <li><span class="pack-name">${soft}</span><span>${item.packageName}</span></li>
                                <li><span class="pack-name">${plat}<br/></span><span>${h5Li}</span></li>
                            </ul>`
                            $(`.h5-ad-item-${versionToClass}`).append(h5Tools)

                        })
                    }

                    if (item.groupName.includes('server')) {
                        let tag = item.tagBody
                        let t = `<div class="connector-pack pc-pack js-server-${versionToClass}">
                            <h3>openGauss Server</h3>
                            <ul class="pack-title">
                                <li></li>
                                <li>centos_x86_64</li>
                                <li>openeuler_aarch64</li>
                                <li>openeuler_x86_64</li>
                            </ul>
                        </div>`
                        $(`.js-table-data-${versionToClass}`).append(t)
                        $(`.js-table-data-${versionToClass}`).append(`<div class="h5-ad-item-${versionToClass}"></div>`)
                        $(`.h5-ad-item-${versionToClass}`).append(`<h3 class="h5-ad-pack">openGauss Server</h3>`)

                        tag.forEach(item => {
                            let c = `<ul class="pack-content">
                                <li>${item.packageName}</li>`
                            if (item.affectedPlatform.includes('centos_x86_64')) {
                                c += `<li><img src="/img/cve/oval.svg" alt=""></li>`
                            }
                            if (item.affectedPlatform.includes('openeuler_aarch64')) {
                                c += `<li><img src="/img/cve/oval.svg" alt=""></li>`
                            }
                            if (item.affectedPlatform.includes('openeuler_x86_64')) {
                                c += `<li><img src="/img/cve/oval.svg" alt=""></li>`
                            }

                            c += `</ul>`

                            $(`.js-server-${versionToClass}`).append(c)

                            let h5Li = item.affectedPlatform.join('<br/>')
                            let h5Tools = `<ul class="pack-content h5-ad-pack">
                                <li><span class="pack-name">${soft}</span><span>${item.packageName}</span></li>
                                <li><span class="pack-name">${plat}<br/></span><span>${h5Li}</span></li>
                            </ul>`
                            $(`.h5-ad-item-${versionToClass}`).append(h5Tools)
                        })
                    }

                    if (item.groupName.includes('Connectors')) {
                        let tag = item.tagBody
                        let t = `<div class="connector-pack pc-pack js-connectors-${versionToClass}">
                            <h3>openGauss Connectors</h3>
                            <ul class="pack-title">
                                <li></li>
                                <li>centos_x86_64</li>
                                <li>openeuler_aarch64</li>
                                <li>openeuler_x86_64</li>
                            </ul>
                        </div>`
                        $(`.js-table-data-${versionToClass}`).append(t)
                        $(`.js-table-data-${versionToClass}`).append(`<div class="h5-ad-item-${versionToClass}"></div>`)
                        $(`.h5-ad-item-${versionToClass}`).append(`<h3 class="h5-ad-pack">openGauss Connectors</h3>`)

                        tag.forEach(item => {
                            let c = `<ul class="pack-content">
                                <li>${item.packageName}</li>`
                            if (item.affectedPlatform.includes('centos_x86_64')) {
                                c += `<li><img src="/img/cve/oval.svg" alt=""></li>`
                            }
                            if (item.affectedPlatform.includes('openeuler_aarch64')) {
                                c += `<li><img src="/img/cve/oval.svg" alt=""></li>`
                            }
                            if (item.affectedPlatform.includes('openeuler_x86_64')) {
                                c += `<li><img src="/img/cve/oval.svg" alt=""></li>`
                            }

                            c += `</ul>`

                            $(`.js-connectors-${versionToClass}`).append(c)

                            let h5Li = item.affectedPlatform.join('<br/>')
                            let h5Tools = `<ul class="pack-content h5-ad-pack">
                                <li><span class="pack-name">${soft}</span><span>${item.packageName}</span></li>
                                <li><span class="pack-name">${plat}<br/></span><span>${h5Li}</span></li>
                            </ul>`
                            $(`.h5-ad-item-${versionToClass}`).append(h5Tools)
                        })
                    }
                })

            })


        },
        pagenationFn: function (data) {
            new Pagination({
                element: '#ad-pagination',
                type: 2,
                pageIndex: 1,
                pageSize: 10,
                pageCount: 1,
                total: data,
                jumper: true,
                singlePageHide: false,
                prevText: '<',
                nextText: '>',
                disabled: true,
                currentChange: function(index) {
                    privateData.listRequire.pageNum = index
                    adMethods.getListData(privateData.listRequire);
                }
            });
        },
    }
    var eventWithAdTag = function () {
        $('.ad-detail-content .tag-title').on('click', function (e) {
            e.preventDefault();
            var currentTag = e.target.className.toString().split('-')[0]
            var showTag = '.' + currentTag + '-content'
            var showTagTitle = '.' + currentTag + '-tag'

            $(showTagTitle).addClass("active").siblings().removeClass('active');
            $(showTag).addClass('active').siblings().removeClass('active');
        })
    }
    var eventWithButton = function () {
        $('.radio-group').on('click', function (e) {
            e.preventDefault();
            var tagName = e.target.className.toString()
            var currentTag = '.' + tagName.split(' ')[0]
            $(currentTag).addClass("active").siblings().removeClass('active');

            let tab = {
                ALL: 0,
                Critical: 1,
                High: 2,
                Medium: 3,
                Low: 4
            }
            tagName = tagName.split('-')[1].split(' ')[0]
            privateData.listRequire.cveLevel = tab[tagName]
            adMethods.getListData(privateData.listRequire, privateData.pagenationFn)

        })
    }
    var eventWithSearch = function () {
        $('.js-search-event').on('keypress', function (e) {
            if (e.keyCode === 13) {
                privateData.listRequire.searchName = $('.js-search-event').val();
                $(this).parent().find('.search-click').remove();
                $(this).parent().find('.search-cancel').remove();
                $(this).parent().append('<img class="search-cancel" src="/img/search-delete.svg" alt="">');
                adMethods.getListData(privateData.listRequire, privateData.pagenationFn)

            }
        })

        $('.ad-form').on('click', function (e) {
            let target = e.target;

            if (target.className.includes('search-cancel')) {
                $(this).find('span').append('<img class="js-search-icon search-click" src="/img/gray-search.svg">');
                $('.search-cancel').remove();
                privateData.listRequire.searchName = ''
                $('.js-search-event').val('');
                adMethods.getListData(privateData.listRequire, privateData.pagenationFn)
                scrollTo(0, 0);
            }

            if (target.className.includes('js-search-icon')) {
                privateData.listRequire.searchName = $('.js-search-event').val();
                $(this).find('span').append('<img class="search-cancel" src="/img/search-delete.svg" alt="">');
                $('.js-search-icon').remove();

                let require = privateData.listRequire
                adMethods.getListData(require, privateData.pagenationFn)
            }
        })
    }
    var eventWithSelect = function () {
        $('#id-select-year').change(function () {
            let years = $('#id-select-year').find('option:selected').text();
            years = years === 'All' ? 0 : Number(years)
            privateData.listRequire.years = years
        })
    }

    var eventWithListItem = function () {
        $('.security-advisories').find('.js-goto-detail').on('click', function (e) {
            let target = e.target
            window.localStorage.adGotoDetail = target.dataset.url
        })
    }
    var eventWithDetailItem = function () {
        $('.summary-content').find('.js-back-to-cve').on('click', function (e) {
            let target = e.target
            window.localStorage.adBackTocve = target.dataset.cveurl
        })
    }
    adMethods = {
        getListData: function (data, callback){
            $.ajax({
                type: "GET",
                url: '/advisoryCVE/v1/gauss/sa',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    privateData.insertList(res.body)
                    eventWithListItem()
                    callback && callback(res.totalCount);
                }
            });
        },
        getDetailData: function (data){
            $.ajax({
                type: "GET",
                url: '/advisoryCVE/v1/gauss/sa/detail',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.errno === '200') {
                        privateData.insertDetail(res.body);
                        eventWithDetailItem()
                    }
                }
            });
        }
    }
    var __main = function () {
        eventWithAdTag()
        window.localStorage.adBackTocve = ''
        if (window.location.href.includes('security-advisories/detail.html')) {
            let url = window.localStorage
            let withoutAdURL = url.cveBackToAd === undefined || url.cveBackToAd.length === 0
            privateData.detailRequire.gaussSaNum = withoutAdURL ? url.adGotoDetail : url.cveBackToAd
            adMethods.getDetailData(privateData.detailRequire)
            eventWithDetailItem()
        } else {
            adMethods.getListData(privateData.listRequire, privateData.pagenationFn)
        }
        eventWithButton()
        eventWithSearch()
        eventWithSelect()
    }
    __main()
})