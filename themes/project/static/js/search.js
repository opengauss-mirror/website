$(document).ready(function () {
var lang = includesStr('/zh/', window.location.href) ? 'zh' : 'en';

var curTab = 'all';
var remoteMethods = null;
var privateMethods = {
    toggleTab: function () {
        $('.detail-title').children('p').each(function (index, item) {
            $(this).on('click', function () {
                curTab = $(item).attr('key') === '' ? 'all' : $(item).attr('key');
                if(curTab !== 'all'){
                    $(item).addClass('active').siblings().removeClass('active');
                }
                remoteMethods.getSearchData({
                    keyword: $('.search-input').val() || '',
                    page: 1,
                    pageSize: 10,
                    lang: lang,
                    type: $(item).attr('key')
                }, privateMethods.pagenationFn)
            })
        })
    },
    jumpTpDetail: function () {
        $('.content-box .content-title,.content-box .content-desc').on('click', function () {
            var path = $(this).attr('path');
            var type = $(this).attr('type');
            if(type === 'docs'){
                window.open('/' + lang + '/docs/' + path + '.html');
            }
            if(type === 'news'){
                window.open('/' + lang + '/' + path + '.html');
            }
            if(type === 'events'){
                window.open('/' + lang + '/' + path + '.html');
            }
            if(type === 'blogs'){
                window.open('/' + lang + '/blogs/blogs.html?' + path);
            }
        })
    },
    getUrlParams: function (params){
        var urlObj = {};
        if(!window.location.search){return '';}
        var urlParams = window.location.search.substring(1);
        var urlArr = urlParams.split('&');
        for(var i = 0; i < urlArr.length; i++){
            var urlArrItem = urlArr[i].split('=');
            urlObj[urlArrItem[0]] = urlArrItem[1]
        }
    　　// 判断是否有参数
        if(arguments.length>=1){
            return urlObj[params]
        }
        return urlObj;
    },
    transformLang: function (str){
        if(str === 'all'){
            return lang === 'zh' ? '全部' : 'All';
        }
        if(str === 'docs'){
            return lang === 'zh' ? '文档' : 'Docs';
        }
        if(str === 'news'){
            return lang === 'zh' ? '新闻' : 'News';
        }
        if(str === 'events'){
            return lang === 'zh' ? '活动' : 'Events';
        }
        if(str === 'blogs'){
            return lang === 'zh' ? '博客' : 'Blogs';
        }
    },
    pagenationFn: function (data) {
        if(!Array.prototype.find){
            Array.prototype.find = function(callback) {
                return callback && (this.filter(callback) || [])[0];
            };
        }
        new Pagination({
            element: '#pagination',
            type: 2,
            pageIndex: 1,
            pageSize: 10,
            pageCount: 1,
            total: data.totalNum.find(function (item){
                return item.key === curTab;
            }).count,
            jumper: true,
            singlePageHide: false,
            prevText: '<',
            nextText: '>',
            disabled: true,
            currentChange: function(index) {
                scrollTo(0, 0);
                remoteMethods.getSearchData({
                    keyword: $('.search-input').val() || '',
                    page: index,
                    pageSize: 10,
                    lang: lang,
                    type: curTab === 'all' ? '' : curTab
                })
            }
        });
    },
    getBlogUrl: function (data, type) {
        if (type === 'blogs') {
            var finalUrl = '';
            var brackets = '()&!$*（）——';
            var linker = ' ';
            for (var i = 0; i < data.length; i++) {
                var dataItem = data[i];
                var doubleItem = dataItem + data[i + 1]
                if (includesStr(dataItem, linker)) {
                    dataItem = '-';
                }
                if (doubleItem == '--') {
                    dataItem = '-';
                    i += 1;
                }
                if (includesStr(dataItem, brackets)) {

                    dataItem = '';
                }
                finalUrl += dataItem;
            }
            finalUrl = finalUrl.toLowerCase();
            return finalUrl;
        } else {
            return data;
        }
    },
}
// 搜索埋点数据添加
function addSearchBuriedData(search_key) {
    const search_event_id = `${search_key}${new Date().getTime()}${
      window['sensorsCustomBuriedData']?.ip || ''
    }`;
    const obj = {
      search_key,
      search_event_id,
    };
    window['addSearchBuriedData'] = obj;
  }
let typeList=[]
remoteMethods = {
    getSearchData: function (postData, callback){
        localStorage.setItem("search_key",postData.keyword);
        addSearchBuriedData(postData.keyword)
        $.ajax({
            type: "POST",
            url: '/search/docs',
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            datatype: "json",
            success: function (data) {
                if(data.status === 201){
                    localStorage.setItem("searchToal",0);
                    localStorage.setItem("searchType",[]);
                    curTab = 'all';
                    $('.detail-title').empty();
                    $('.detail-title').append(
                        '<p class="active" key="">'+privateMethods.transformLang('all')+'<span> (0) </span></p>'
                    );
                    $('.detail-content').empty();
                    if (lang === 'zh') {
                        $('.detail-content').append(
                           '<p class="empty-box">找到0个结果</p>'
                        );
                    } else {
                        $('.detail-content').append(
                            '<p class="empty-box">0 results found</p>'
                        );
                    }
                    $('#pagination').empty();
                    return;
                }
                if(curTab === 'all'){
                    $('.detail-title').empty();
                    data.obj.totalNum.forEach(function (item) {
                        typeList.push(item.key)
                        if (item.key === curTab) {
                            if (item.key === 'all') {
                                $('.detail-title').append(
                                    '<p class="active" key="">'+ privateMethods.transformLang(item.key)+'<span> ('+ item.count+ ') </span>'+ '</p>'
                                );
                            } else {
                                $('.detail-title').append(
                                    '<p class="active" key="'+item.key+'">'+ privateMethods.transformLang(item.key)+'<span> ('+ item.count+ ') </span>'+ '</p>'
                                );
                            }
                        } else {
                            if (item.key === 'all') {
                                $('.detail-title').append(
                                    '<p class="" key="">'+ privateMethods.transformLang(item.key)+'<span> ('+ item.count+ ') </span>'+ '</p>'
                                );
                            } else {
                                $('.detail-title').append(
                                    '<p class="" key="'+item.key+'">'+ privateMethods.transformLang(item.key)+'<span> ('+ item.count+ ') </span>'+ '</p>'
                                );
                            }
                        }
                    })
                    localStorage.setItem("searchType",typeList);
                    privateMethods.toggleTab();
                }
                localStorage.setItem("searchToal",data.obj.totalNum[0].count);
                // 搜索埋点
                let sensors = window['sensorsDataAnalytic201505'];
                const searchKeyObj = {
                  search_tag: typeList,
                  search_result_total_num: data.obj.totalNum[0].count,
                };
                sensors?.setProfile({
                  profileType: 'searchValue',
                  ...(window['sensorsCustomBuriedData'] || {}),
                  ...(window['addSearchBuriedData'] || {}),
                  ...searchKeyObj,
                });
                $('.detail-content').empty();
                data.obj.records.forEach(function (item,index) {
                    var contentPath = privateMethods.getBlogUrl(item.articleName, item.type);
                    let a = '<div class="content-box">'+ '<p class="content-title" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.title+ '</p><p class="content-desc" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.textContent+ '</p><p>'+'来自'+'：<span class="tag">'+ privateMethods.transformLang(item.type)+' '+ ''+ '</span></p></div>'

                    if (lang === 'zh') {
                        if (item.type === 'docs') {
                            $('.detail-content').append(
                                `<div class="content-box" data-index="${index}">`+ '<p class="content-title" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.title+ '</p><p class="content-desc" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.textContent+ '</p><p>'+'来自'+'：<span class="tag">'+ privateMethods.transformLang(item.type)+' '+ item.version+ '</span></p></div>'
                            )
                        } else {
                            $('.detail-content').append(
                                `<div class="content-box" data-index="${index}">`+ '<p class="content-title" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.title+ '</p><p class="content-desc" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.textContent+ '</p><p>'+'来自'+'：<span class="tag">'+ privateMethods.transformLang(item.type)+' '+ '' + '</span></p></div>'
                            )
                        }
                    } else {
                        if (item.type === 'docs') {
                            $('.detail-content').append(
                                `<div class="content-box" data-weather="${index}">`+ '<p class="content-title" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.title+ '</p><p class="content-desc" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.textContent+ '</p><p>'+'From'+'：<span class="tag">'+ privateMethods.transformLang(item.type)+' '+ item.version+ '</span></p></div>'
                            )
                        } else {
                            $('.detail-content').append(
                                `<div class="content-box" data-weather="${index}">`+ '<p class="content-title" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.title+ '</p><p className="content-desc" path="'+ contentPath+ '" type="'+ item.type+ '">'+ item.textContent+ '</p><p>'+'From'+'：<span class="tag">'+ privateMethods.transformLang(item.type)+' '+ '' + '</span></p></div>'
                            )
                        }
                    }
                    // 用户点击搜索结果的埋点
                    $(".detail-content>.content-box").click(function (e) {
                        localStorage.setItem("search_rank_num", $(this).attr("class"));
                        const tag = document
                        .getElementsByClassName('active')[0]
                        .id.replace('tab-', '');
                        let sensors = window['sensorsDataAnalytic201505'];
                        const searchKeyObj = {
                          search_tag: tag,
                          search_rank_num: $(this).attr("data-index"),
                          search_result_total_num: localStorage.getItem("searchToal"),
                        };
                        sensors.setProfile({
                          profileType: 'selectSearchResult',
                          ...(window['sensorsCustomBuriedData'] || {}),
                          ...(window['addSearchBuriedData'] || {}),
                          ...searchKeyObj,
                        });
                      });
                })
                privateMethods.jumpTpDetail();
                callback && callback(data.obj);
            }
        });
    }
}
var init =  function (){
    $('.search-input').val(decodeURI(privateMethods.getUrlParams('keyword')) || '');
    remoteMethods.getSearchData({
        keyword: $('.search-input').val() || '',
        page: 1,
        pageSize: 10,
        lang: lang,
        type: ''
    },privateMethods.pagenationFn);
    $("#area-icon").on('click', function () {
        curTab = 'all';
        remoteMethods.getSearchData({
            keyword: $('.search-input').val() || '',
            page: 1,
            pageSize: 10,
            lang: lang,
            type: curTab === 'all' ? '' : curTab
        },privateMethods.pagenationFn);
    })
    $(".search-input").on('keypress', function (e) {
        if(e.keyCode === 13){
            curTab = 'all';
            remoteMethods.getSearchData({
                keyword: $('.search-input').val() || '',
                page: 1,
                pageSize: 10,
                lang: lang,
                type: curTab === 'all' ? '' : curTab
            },privateMethods.pagenationFn);    
        }
        
    })
}

    init();
})