$(document).ready(function () {
    var lang = window.location.href.includes('/zh/') ? 'zh' : 'en';

    var cveMethods = null
    var privateData = {
        listRequire: {
            pageNum: 1,
            pageSize: 10,
            searchName: '',
            releaseFlag: 1
        },
        listResponse: {},
        detailRequire: {
            cveNum: '',
        },
        detailResponse: {},
        insertList: function (data) {
            $('.table-detail').empty();
            $('.h5-cve-pack').empty();
            data.forEach(item => {
                let t  = `
            <ul class="tables table-content">
                <li><a class="js-goto-detail" href="./cve/detail.html" data-url="${item.cveNum}">${item.cveNum}</a></li>
                <li><span>${item.description}</span></li>
                <li><span>${item.NVDScore}</span></li>
                <li><span>${item.releaseDate}</span></li>
                <li><span>${item.updateTime}</span></li>
            </ul>`
                $('.table-detail').append(t);

                let gy = lang === 'zh' ? '概要：' : 'Synopsis：'
                let pf = lang === 'zh' ? 'CVSS评分：' : 'CVSS Score：'
                let fbsj = lang === 'zh' ? '发布时间：' : 'Release Date：'
                let xgsj = lang === 'zh' ? '修改事件：' : 'Time of Modification：'

                let h5 = `
                <ul class="tables table-content">
                <li><span>CVE：</span><a class="js-goto-detail" href="./cve/detail.html" data-url="${item.cveNum}">${item.cveNum}</a></li>
                <li><span class="pack-name">${gy}</span><span>${item.description}</span></li>
                <li><span class="pack-name">${pf}</span><span>${item.NVDScore}</span></li>
                <li><span class="pack-name">${fbsj}</span><span>${item.releaseDate}</span></li>
                <li><span class="pack-name">${xgsj}</span><span>${item.updateTime}</span></li>
            </ul>`
                $('.h5-cve-pack').append(h5);
            })

        },
        insertDetail: function (data) {
            $('.js-h2').append(data.cveNum);
            $('.js-update-date').append(data.updateTime)
            $('.js-release-date').append(data.releaseDate)
            $('.js-cve-summary').append(data.description)

            let v3 = data.CVSSV3
            let vKeys = Object.keys(v3)

            $('.js-cvss-v3').append(`<li>${v3.NVDScore}</li>`);
            $('.js-cvss-v3').append(`<li>${v3.openGaussScore}</li>`);

            vKeys.forEach(item => {
                if ((item !== 'NVDScore') && (item !== 'openGaussScore') && (item !== 'scoreType')) {
                    let key = item
                    let selcector = '.js-' + key.slice(1)
                    $(selcector).append(`<li>${v3[key]}</li>`)
                }
            })

            let ad = data.saBody
            let gg = lang === 'zh' ? '公告：' : 'Advisory：'
            let gy = lang === 'zh' ? '概要：' : 'Synopsis：'
            let fbsj = lang === 'zh' ? '发布时间：' : 'Release Date：'
            $('.js-ad').empty();
            if (Object.keys(ad).length !== 0)  {
                $('.js-ad').append(`<li><a class="js-back-to-ad" href="/${lang}/security-advisories/detail.html" data-adUrl="${ad.gaussSaNum}">${ad.gaussSaNum}</a></li>`);
                $('.js-ad').append(`<li>${ad.summary}</li>`);
                $('.js-ad').append(`<li>${ad.releaseDate}</li>`);

                let t = `
                    <li><span class="pack-name">${gg}</span><a class="js-back-to-ad" href="/${lang}/security-advisories/detail.html" data-adUrl="${ad.gaussSaNum}">${ad.gaussSaNum}</a></li>
                    <li><span class="pack-name">${gy}</span>${ad.summary}</li>
                    <li><span class="pack-name">${fbsj}</span>${ad.releaseDate}</li>`
                $('.h5-cve-ad').append(t)
            }

            let affect = data.affectBody
            affect.forEach(item => {
                $('.js-affect').append(`<ul className="js-affect">
                <li>${item.affectProduct}</li>
                <li>${item.packName}</li>
                <li>${item.fixLabel}</li>
            </ul>`)
            })
        },
        pagenationFn: function (data) {
            new Pagination({
                element: '#cve-pagination',
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
                    cveMethods.getListData(privateData.listRequire);
                }
            });
        },
    }

    var eventWithSearch = function () {
        $('.js-cve-input').on('keypress', function (e) {
            if (e.keyCode === 13) {
                privateData.listRequire.searchName = $('.js-cve-input').val();
                $(this).parent().find('.search-click').remove();
                $(this).parent().find('.search-cancel').remove();
                $(this).parent().append('<img class="search-cancel" src="/img/search-delete.svg" alt="">');
                cveMethods.getListData(privateData.listRequire, privateData.pagenationFn);
            }
        })

        $('.ad-form').on('click', function (e) {
            let target = e.target;

            if (target.className.includes('search-cancel')) {
                $(this).find('span').append('<img class="js-search-icon search-click" src="/img/gray-search.svg">');
                $('.search-cancel').remove();
                $('.js-cve-input').val('');
                privateData.listRequire.searchName = ''
                cveMethods.getListData(privateData.listRequire, privateData.pagenationFn);
                scrollTo(0, 0);
            }

            if (target.className.includes('js-search-icon')) {
                privateData.listRequire.searchName = $('.js-cve-input').val();
                $(this).find('span').append('<img class="search-cancel" src="/img/search-delete.svg" alt="">');
                $('.js-search-icon').remove();

                let require = privateData.listRequire

                cveMethods.getListData(require, privateData.pagenationFn);
            }
        })
    }

    var eventWithListItem = function () {
        $('.cve-table').find('.js-goto-detail').on('click', function (e) {
            let target = e.target
            window.localStorage.cveGotoDetail = target.dataset.url
        })
    }

    var eventWithDetailItem = function () {
        $('.js-ad').find('.js-back-to-ad').on('click', function (e) {
            let target = e.target
            window.localStorage.cveBackToAd = target.dataset.adurl
        })
    }

    cveMethods = {
        getListData: function (data, callback){
            $.ajax({
                type: "GET",
                url: '/advisoryCVE/v1/gauss/cve',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === '200') {
                        privateData.insertList(res.body);
                        eventWithListItem()
                        callback && callback(res.totalCount);
                    }
                }
            });
        },
        getDetailData: function (data, callback){
            $.ajax({
                type: "GET",
                url: '/advisoryCVE/v1/gauss/cve/detail',
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
        window.localStorage.cveBackToAd = ''

        if (window.location.href.includes('cve/detail.html')) {
            let url = window.localStorage
            let withoutAdURL = url.adBackTocve === undefined || url.adBackTocve.length === 0

            privateData.detailRequire.cveNum = withoutAdURL ? url.cveGotoDetail : url.adBackTocve
            cveMethods.getDetailData(privateData.detailRequire)
        } else {
            cveMethods.getListData(privateData.listRequire, privateData.pagenationFn);
        }
        eventWithSearch()
    }
    __main()
})
