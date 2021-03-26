$(document).ready(function () {
var lang = window.location.href.includes('/zh/') ? 'zh' : 'en';
var curTab = 'all';
var statsMethods = null;
var privateMethods = {
    organizationData:{
        pageSize: 10,
        sortKey: 'pr',
        sortValue: 'descending',
        currentPage: 1,
        community: 'opengauss',
        type: 'organization',
    },
    organizationQuota: 'PR',
    individualData: {
        pageSize: 10,
        sortKey: 'pr',
        currentPage: 1,
        sortValue: 'descending',
        community: 'opengauss',
        type: 'individual',
    },
    pieData: {
        community: 'opengauss',
        type: 'pr'
    },
    pagenationFn: function (data) {
        new Pagination({
            element: '#id-pagination-organization',
            type: 2,
            pageIndex: 1,
            pageSize: data.pageSize,
            pageCount: 1,
            total: data.total,
            jumper: true,
            singlePageHide: false,
            prevText: '<',
            nextText: '>',
            disabled: true,
            currentChange: function (index) {
                data.currentPage = index;
                statsMethods.getData(data);
            }
        });
    },
    pagenationIndiviFn: function (data) {
        new Pagination({
            element: '#id-pagination-individual',
            type: 2,
            pageIndex: 1,
            pageSize: data.pageSize,
            pageCount: 1,
            total: data.total,
            jumper: true,
            singlePageHide: false,
            prevText: '<',
            nextText: '>',
            disabled: true,
            currentChange: function(index) {
                data.currentPage = index;
                statsMethods.getData(data);
            }
        });
    },
    getMaxTop: function (arr, len) {
        var max = [];
        arr.sort(function (a,b) {
            return a - b;
        });
        for(var i = 0; i < len; i++) {
            max.push(arr.pop());
        }
        return max;
    },
    drawPie: function (data) {
        let pieData = [];
        pieData = data.data.map(item => {
            let o = {};
            o.value = item.number;
            o.name = item.name;
            return o;
        });
        var myChart = echarts.init(document.getElementById('id-stats-pie'));
        var statsPieOption = {
            color: [
                '#6A1B9A',
                '#942D93',
                '#BE408C',
                '#E85285',
                '#EE7B91',
                '#F4A49E',
                '#FACDAA',
                '#FFEBB0',
                '#eaf3db',
                '#75C6D1'
            ],
            title: {
                text: `组织 ${data.name} 贡献占比`,
                left: 'center',
                top: '0%',
                textStyle: {
                    color: '#000',
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'normal',
                    fontSize: 24
                }
            },
            tooltip: {
                show: true,
                trigger: 'item',
                formatter: '{b}: {d}% ({c})'
            },
            legend: {
                show: true,
                orient: 'horizontal',
                top: '14%',
                right: '0%',
                textStyle: {
                    color: '#000',
                    fontFamily: 'Microsoft YaHei',
                    fontWeight: 'normal',
                    fontSize: 12
                },
                itemHeight: 16,
                itemWidth: 16,
                itemGap: 12
            },
            series: [
                {
                    type: 'pie',
                    radius: ['60%', '80%'],
                    center: ['50%', '64%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 4,
                        borderWidth: 2,
                        borderColor: '#fff'
                    },
                    label: {
                        show: false,
                        formatter: '{d}%',
                        textStyle: {
                            color: '#000',
                            fontFamily: 'Microsoft YaHei',
                            fontWeight: 'normal',
                            fontSize: 12
                        }
                        ,position: 'outside'
                    },
                    emphasis: {
                        label: {
                            show: false,
                            fontSize: 24,
                            fontWeight: 'bold'
                        }
                    },
                    labelLine: {
                        show: true
                    },
                    data: pieData,
                }
            ]
        };

        myChart.setOption(statsPieOption);
    },
    defaultSort: function () {
        $('.js-indivi-pr-descending').attr('src', '/img/sortDown.svg');
        $('.js-indivi-pr-descending').siblings('.up').attr('src', '/img/defaultUp.svg')
            .parent().siblings().each(function () {
            $(this).find('.down').attr('src', '/img/defaultDown.svg');
            $(this).find('.up').attr('src', '/img/defaultUp.svg');
        });
    },
    bindCancelEvent: function (element) {
        $(element).on('click', function (e) {
            let target = e.target;
            if (target.className.includes('search-cancel')) {

                if (element.includes('organ')) {
                    delete privateMethods.individualData.organizationSearchKey;
                    $('.individual-organ-input').val('');
                    statsMethods.getData(privateMethods.individualData, privateMethods.pagenationIndiviFn);
                } else {
                    delete privateMethods.individualData.individualSearchKey;
                    $('.individual-indivi-input').val('');
                    statsMethods.getData(privateMethods.individualData, privateMethods.pagenationIndiviFn);
                }
            }
        })
    }
};

statsMethods = {
    getPieData: function (postData){
        $.ajax({
            type: "POST",
            url: '/contribution/ContributionDataPie',
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            datatype: "json",
            success: function (res) {
                if(res.code === 200){
                    let statsPieData = privateMethods.getMaxTop(res.data, 5);
                    let topFive = 0;
                    statsPieData.forEach((item) => topFive += item.number);
                    topFive = res.total - topFive;
                    statsPieData.push({number: topFive, name: 'Others'});
                    let drawPieData = {
                        data: statsPieData,
                        name: postData.type.toUpperCase()
                    }
                    privateMethods.drawPie(drawPieData);
                }
            }
        });
    },
    getData: function (postData, callback){
        $.ajax({
            type: "POST",
            url: '/contribution/ContributionData',
            data: JSON.stringify(postData),
            contentType: "application/json; charset=utf-8",
            crossDomain: true,
            datatype: "json",
            success: function (res) {
                if(res.code === 200){
                    $('.organ-quota-content').empty().text(`${privateMethods.organizationQuota}`);
                    if (postData.type === 'organization') {
                        $('.js-organ-table').empty();
                        if (privateMethods.organizationData.organizationSearchKey === undefined) {
                            $('.organization-info .search-cancel').remove();
                        }
                        res.data.forEach(item => {
                            $('.js-organ-table').append(
                                `<ul>
                                    <li>${item.ranking}</li>
                                    <li>${item.origanization}</li>
                                    <li>${item[privateMethods.organizationQuota.toLowerCase()]}</li>
                                </ul>`);
                        });
                        postData.total = res.total;
                    }

                    if (postData.type === 'individual') {
                        $('.js-indivi-table').empty();
                        if (privateMethods.individualData.individualSearchKey === undefined) {
                            $('.js-indivi-indivi .search-cancel').remove();

                        }
                        if (privateMethods.individualData.organizationSearchKey === undefined) {
                            $('.js-indivi-organ .search-cancel').remove();
                        }
                        res.data.forEach(item => {
                            $('.js-indivi-table').append(
                                `<ul>
                                    <li>${item.ranking}</li>
                                    <li>${item.name}</li>
                                    <li>${item.origanization}</li>
                                    <li>${item.pr}</li>
                                    <li>${item.issue}</li>
                                    <li>${item.comments}</li>
                                </ul>`);
                        });
                        postData.total = res.total;
                    }
                    callback && callback(postData);

                }
            }
        });
    }
};

var init =  function (){

    statsMethods.getPieData(privateMethods.pieData);
    statsMethods.getData(privateMethods.organizationData, privateMethods.pagenationFn);
    statsMethods.getData(privateMethods.individualData, privateMethods.pagenationIndiviFn);

    $('#id-organization-quota').change(function () {
        privateMethods.organizationQuota = $('#id-organization-quota').find('option:selected').text();
        privateMethods.organizationData.pageSize = Number($('#id-organization-pages').find('option:selected').text());
        privateMethods.organizationData.sortKey = privateMethods.organizationQuota.toLowerCase();
        privateMethods.pieData.type = privateMethods.organizationQuota.toLowerCase();

        delete privateMethods.organizationData.organizition;

        statsMethods.getData(privateMethods.organizationData);
        statsMethods.getPieData(privateMethods.pieData);
    })
    $('#id-organization-pages').change(function () {
        privateMethods.organizationQuota = $('#id-organization-quota').find('option:selected').text();
        privateMethods.organizationData.pageSize = Number($('#id-organization-pages').find('option:selected').text());
        privateMethods.organizationData.sortKey = privateMethods.organizationQuota.toLowerCase();
        privateMethods.pieData.type = privateMethods.organizationQuota.toLowerCase();

        delete privateMethods.organizationData.organizition;

        statsMethods.getData(privateMethods.organizationData);
    })
    $('.organization-organize-input').on('keypress', function (e) {
        if(e.keyCode === 13){
            privateMethods.organizationQuota = $('#id-organization-quota').find('option:selected').text();
            privateMethods.organizationData.pageSize = Number($('#id-organization-pages').find('option:selected').text());
            privateMethods.organizationData.sortKey = privateMethods.organizationQuota.toLowerCase();
            privateMethods.pieData.type = privateMethods.organizationQuota.toLowerCase();
            privateMethods.organizationData.currentPage = 1;

            delete privateMethods.organizationData.organizition;

            privateMethods.organizationData.organizationSearchKey = $('.organization-organize-input').val();
            statsMethods.getData(privateMethods.organizationData, privateMethods.pagenationFn);
        }
        $(this).siblings('.search-cancel').remove();
        $(this).parent().append('<img class="search-cancel" src="/img/searchCancel.svg" alt="">');

    });
    $('.js-organ-quota').on('click', function (e) {
        e.preventDefault();
        let target = e.target;

        if (privateMethods.organizationData.sortValue === 'ascending') {
            privateMethods.organizationData.sortValue = 'descending';
            statsMethods.getData(privateMethods.organizationData);
            $(this).find('.down').attr('src', '/img/sortDown.svg').siblings('.up').attr('src', '/img/defaultUp.svg');
        } else if ( privateMethods.organizationData.sortValue === 'descending') {
            privateMethods.organizationData.sortValue = 'ascending';
            statsMethods.getData(privateMethods.organizationData);
            $(this).find('.up').attr('src', '/img/sortUp.svg').siblings('.down').attr('src', '/img/defaultDown.svg');
        }
    });
    $('.organization-info').find('.table-title').on('click', function (e) {
        let target = e.target;

        if (target.className.includes('search-cancel')) {
            delete privateMethods.organizationData.organizationSearchKey;
            $('.organization-organize-input').val('');
            statsMethods.getData(privateMethods.organizationData, privateMethods.pagenationFn);
        }
    });


    $('#id-individual-pages').change(function () {
        privateMethods.individualData.pageSize = $('#id-individual-pages').find('option:selected').text();
        privateMethods.individualData.sortKey = 'pr';
        privateMethods.individualData.sortValue = 'descending';

        if (!(privateMethods.individualData.individualSearchKey === undefined)) {
            privateMethods.individualData.individualSearchKey = $('.individual-indivi-input').val();
        }
        if (!(privateMethods.individualData.organizationSearchKey === undefined)) {
            privateMethods.individualData.organizationSearchKey = $('.individual-organ-input').val();
        }

        statsMethods.getData(privateMethods.individualData);
        privateMethods.defaultSort();

    })
    $('.individual-indivi-input').on('keypress', function (e) {
        if(e.keyCode === 13){
            privateMethods.individualData.pageSize = $('#id-individual-pages').find('option:selected').text();
            privateMethods.individualData.individualSearchKey = $('.individual-indivi-input').val();
            privateMethods.individualData.sortKey = 'pr';
            privateMethods.individualData.sortValue = 'descending';
            privateMethods.individualData.currentPage = 1;

            if (!(privateMethods.individualData.organizationSearchKey === undefined)) {
                privateMethods.individualData.organizationSearchKey = $('.individual-organ-input').val();
            }
            statsMethods.getData(privateMethods.individualData, privateMethods.pagenationIndiviFn);
            privateMethods.defaultSort();
        }
        $(this).siblings('.search-cancel').remove();
        $(this).parent().append('<img class="search-cancel" src="/img/searchCancel.svg" alt="">');
    })
    $('.individual-organ-input').on('keypress', function (e) {
        if(e.keyCode === 13){
            privateMethods.individualData.pageSize = $('#id-individual-pages').find('option:selected').text();
            privateMethods.individualData.sortKey = 'pr';
            privateMethods.individualData.sortValue = 'descending';
            privateMethods.individualData.currentPage = 1;
            privateMethods.individualData.organizationSearchKey = $('.individual-organ-input').val();


            if (!(privateMethods.individualData.individualSearchKey === undefined)) {
                privateMethods.individualData.individualSearchKey = $('.individual-indivi-input').val();
            }
            statsMethods.getData(privateMethods.individualData, privateMethods.pagenationIndiviFn);
            privateMethods.defaultSort();
        }
        $(this).siblings('.search-cancel').remove();
        $(this).parent().append('<img class="search-cancel" src="/img/searchCancel.svg" alt="">');
    });
    $('.indivi-sort-click').on('click', function (e) {
        let target = e.target;

        privateMethods.individualData.sortKey = '';
        $('.individual-info .table-title').find('.down').attr('src', '/img/defaultDown.svg');
        $('.individual-info .table-title').find('.up').attr('src', '/img/defaultUp.svg');
        if (target.className.includes('pr')) {
            if (privateMethods.individualData.sortValue === 'descending') {
                $('.js-indivi-pr.up').attr('src', '/img/sortUp.svg');
                privateMethods.individualData.sortValue = 'ascending';
            } else if (privateMethods.individualData.sortValue === 'ascending') {
                $('.js-indivi-pr-descending.down').attr('src', '/img/sortDown.svg');
                privateMethods.individualData.sortValue = 'descending';
            }
            privateMethods.individualData.sortKey = 'pr';
            statsMethods.getData(privateMethods.individualData);
        }

        if (target.className.includes('issue')) {
            if (privateMethods.individualData.sortValue === 'descending') {
                $('.js-indivi-issue.up').attr('src', '/img/sortUp.svg');
                privateMethods.individualData.sortValue = 'ascending';
            } else if (privateMethods.individualData.sortValue === 'ascending') {
                $('.js-indivi-issue-descending.down').attr('src', '/img/sortDown.svg');
                privateMethods.individualData.sortValue = 'descending';
            }
            privateMethods.individualData.sortKey = 'issue';
            statsMethods.getData(privateMethods.individualData);
        }

        if (target.className.includes('comments')) {
            if (privateMethods.individualData.sortValue === 'descending') {
                $('.js-indivi-comments.up').attr('src', '/img/sortUp.svg');
                privateMethods.individualData.sortValue = 'ascending';
            } else if (privateMethods.individualData.sortValue === 'ascending') {
                $('.js-indivi-comments-descending.down').attr('src', '/img/sortDown.svg');
                privateMethods.individualData.sortValue = 'descending';
            }
            privateMethods.individualData.sortKey = 'comments';
            statsMethods.getData(privateMethods.individualData);
        }
    })
    privateMethods.bindCancelEvent('.js-indivi-indivi');
    privateMethods.bindCancelEvent('.js-indivi-organ');

    if(document.body.clientWidth < 1000) {
        $('#id-stats-pie').width(345);
        $('#id-stats-pie').height(400);
    }

    };

    init();
})
