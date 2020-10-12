$(document).ready(function () {
var lang = window.location.href.includes('/zh/') ? 'zh' : 'en';
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
    }
}

remoteMethods = {
    getSearchData: function (postData, callback){
        $.ajax({
            type: "POST",
            url: '/search/docs',
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            datatype: "json",
            success: function (data) {
                if(data.status === 201){
                    curTab = 'all';
                    $('.detail-title').empty();
                    $('.detail-title').append(
                        `<p class="active" key="">${privateMethods.transformLang('all')}<span>（0）</span></p>`
                    )
                    $('.detail-content').empty();
                    $('.detail-content').append(
                        `<p class="empty-box">${lang === 'zh' ? '找到0个结果' : '0 results found'}</p>`
                    )
                    $('#pagination').empty();
                    return;
                }
                if(curTab === 'all'){
                    $('.detail-title').empty();
                    data.obj.totalNum.forEach(function (item) {
                        $('.detail-title').append(
                            `<p class="${item.key===curTab?'active':''}" key="${item.key==='all' ? '' : item.key}">${privateMethods.transformLang(item.key)}<span>（${item.count}）</span></p>`
                        )
                    })
                    privateMethods.toggleTab();    
                }
                
                $('.detail-content').empty();
                data.obj.records.forEach(function (item) {
                    $('.detail-content').append(
                        `<div class="content-box">
                        <p class="content-title" path="${item.articleName}" type="${item.type}">${item.title}</p>
                        <p class="content-desc" path="${item.articleName}" type="${item.type}">${item.textContent}</p>
                        <p>${lang === 'zh' ? '来自' : 'From'}：<span class="tag">${privateMethods.transformLang(item.type)} ${item.type === 'docs' ? item.version : ''}</span></p>                    </div>`
                    )
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