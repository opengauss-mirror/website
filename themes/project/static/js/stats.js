$(document).ready(function () {
var lang = window.location.href.includes('/zh/') ? 'zh' : 'en';
var curTab = 'all';
var statsMethods = null;
var privateMethods = {
//     organizationQuota: 'PR',           // 统计指标
//     organizationPageSize: 10,         // 组织 page size
//     organizationOrganize: '',        // 组织 组织
//     organizationSortKey: 'pr',       // 组织 按PR排列
//     organizationSortValue: 'descending', // 默认降序
//     organizationCurrentPage: 1,      // 当前页
//     individualPageSize: 10,          //  个人 page size
//     individualPersonal: '',          // 个人 gitee ID
//     individualOrganize: '',          // 个人组织
//     individualSortKey: 'pr',         // 个人 按PR排列
//     individualSortValue: 'descending',       // 个人 按PR排列

    organizationData:{
        pageSize: 10,
        sortKey: 'pr',
        sortValue: 'descending',
        currentPage: 1,
        community: 'opengauss',
        type: 'organization'
        // organizeSearchKey: '',        // 组织 组织
    },
    organizationQuota: 'PR',
    individualData: {
        pageSize: 10,
        sortKey: 'pr',
        sortValue: 'descending',
        // personalSearchKey: '',          // 个人 gitee ID
        // organizeSearchKey: '',          // 个人组织
    },
    pieData: {
        community: 'opengauss',
        type: 'pr'
    },
    pagenationFn: function (data) {
        new Pagination({
            element: '#id-pagination-individual',
            type: 2,
            pageIndex: 1,
            pageSize: data.pageSize,
            pageCount: 1,
            total: data.total, // 从接口传过来的 data 里拿
            jumper: true,
            singlePageHide: false,
            prevText: '<',
            nextText: '>',
            disabled: true,
            currentChange: function(index) {
                scrollTo(0, 0);
                statsMethods.getData(data)
            }
        });
    },
    getOrganizationData: function () {
        var organData = {}
        // this.organizationSortKey = $('#id-organization-quota').find('option:selected').text()
        // this.organizationPageSize = $('#id-organization-pages').find('option:selected').text()
        // this.organizationOrganize = $('.organization-organize-input').val()
        //
        // // organData.quota = this.organizationQuota
        // organData.pageSize = this.organizationPageSize
        // console.log('this. sort key', this.organizationSortKey)
        // organData.sortKey = this.organizationSortKey.toLowerCase()
        // organData.soreValue = this.organizationSortValue
        // organData.currentPage = this.organizationCurrentPage
        // organData.type = 'organization'
        // organData.community = 'opengauss'

        this.organizationData.pageSize = Number($('#id-organization-pages').find('option:selected').text());
        this.organizationData.sortKey = privateMethods.organizationQuota.toLowerCase()

        organData.pageSize = this.organizationData.pageSize
        organData.sortKey = this.organizationData.sortKey

        return organData
    },
    getIndividualData: function () {
        var indiviData = {}
        this.individualPageSize = $('#id-individual-pages').find('option:selected').text()
        this.individualPersonal = $('.individual-indivi-input').val()
        this.individualOrganize = $('.individual-organ-input').val()

        // indiviData.pageSize = this.individualPageSize
        // indiviData.individualSearchKey = this.individualPersonal || ''
        // indiviData.organizationSearchKey = this.individualOrganize || ''
        // indiviData.sortKey = this.individualSortKey
        // indiviData.sortValue = this.individualSortValue
        // indiviData.type = 'individual'
        // indiviData.community = 'opengauss'

        indiviData.pageSize = 10
        // indiviData.individualSearchKey = 'all'
        // indiviData.organizationSearchKey = 'all'
        indiviData.sortKey = 'pr'
        indiviData.sortValue = 'descending'
        indiviData.type = 'individual'
        indiviData.community = 'opengauss'
        indiviData.currentPage = 1

        return indiviData
    },
    getMaxTop: function (arr, len) {
        var max = [];
        arr.sort(function(a,b){
            return a-b;
        });
        for(var i=0;i<len;i++){
            max.push(arr.pop());
        }
        return max;
    },
    drawPie: function (data) {
        let pieData = []
        pieData = data.data.map(item => {
            let o = {}
            o.value = item.number
            o.name = item.name
            return o
        })
        var myChart = echarts.init(document.getElementById('id-stats-pie'));
        var statsPieOption = {
            color: [
                // '#42105F',
                // '#56167D',
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
            // backgroundColor: '#fff',
            title: {
                text: `组织${data.name}贡献占比`,
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
                orient: 'vertical',
                top: '40%',
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
                    // name: 'PR占比',
                    type: 'pie',
                    radius: ['40%', '60%'], //调整环图内圈&外圈大小
                    center: ['45%', '54%'], //调整饼图左右&上下位置
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderWidth: 2,
                        borderColor: '#fff'
                    },
                    label: {
                        show: false,
                        // show:true,
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
    organSort: function (element, className, direction) {
        var that = this
        element.find(direction).on('click', function () {

            that.organizationSortKey = className.split('-')[2]
            that.organizationSortValue = className.split('-')[3]

            if (that.organizationSortValue === 'descending') {
                $(this).attr('src', '/img/sortDown.svg').siblings('.up').attr('src', '/img/defaultUp.svg')
            } else {
                $(this).attr('src', '/img/sortUp.svg').siblings('.down').attr('src', '/img/defaultDown.svg')
            }

            // postOrganData = that.getOrganizationData()
            // console.log('post data', postOrganData)
            // statsMethods.getData(postOrganData)
        })
    }
}

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
                    console.log('data', res)
                    let statsPieData = privateMethods.getMaxTop(res.data, 5)
                    let topFive = 0
                    statsPieData.forEach((item) => topFive += item.number)
                    topFive = res.total - topFive
                    statsPieData.push({number: topFive, name: 'Others'})
                    let drawPieData = {
                        data: statsPieData,
                        name: postData.type.toUpperCase()
                    }
                    privateMethods.drawPie(drawPieData)
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
                    console.log('data', res.data)
                    postData.total = res.total

                    $('.js-organ-quota').empty()
                    $('.js-organ-quota').append(`${privateMethods.organizationQuota} <img class="down" src="/img/sortDown.svg" alt=""><img class="up" src="/img/defaultUp.svg" alt="">`)

                    if (postData.type === 'organization') {
                        // console.log('update date again')
                        $('.js-organ-table').empty()
                        res.data.forEach(item => {
                            // console.log('item', item, item.rank, postData.type)
                            $('.js-organ-table').append(
                                `<ul>
                                    <li>${item.ranking}</li>
                                    <li>${item.origanization}</li>
                                    <li>${item[privateMethods.organizationQuota.toLowerCase()]}</li>
                                </ul>`)
                        })

                    }

                    if (postData.type === 'individual') {
                        $('.js-indivi-table').empty()
                        res.data.forEach(item => {
                            // console.log('item', item, item.rank, postData.type)
                            $('.js-indivi-table').append(
                                `<ul>
                                    <li>${item.ranking}</li>
                                    <li>${item.name}</li>
                                    <li>${item.origanization}</li>
                                    <li>${item.pr}</li>
                                    <li>${item.issue}</li>
                                    <li>${item.comments}</li>
                                </ul>`)
                        })
                    }
                    callback && callback(postData);

                }
            }
        });
    }
}

var init =  function (){

    var postOrganData = privateMethods.getOrganizationData()
    var postIndiviData = privateMethods.getIndividualData()

    statsMethods.getPieData(privateMethods.pieData);
    statsMethods.getData(privateMethods.organizationData, privateMethods.pagenationFn)
    // statsMethods.getData(postOrganData,privateMethods.pagenationFn);
    // statsMethods.getData(postIndiviData,privateMethods.pagenationFn);

    $('#id-organization-quota').change(function () {
        // 统计指标 select 切换事件
        privateMethods.organizationQuota = $('#id-organization-quota').find('option:selected').text()
        privateMethods.organizationData.pageSize = Number($('#id-organization-pages').find('option:selected').text());
        privateMethods.organizationData.sortKey = privateMethods.organizationQuota.toLowerCase()
        privateMethods.pieData.type = privateMethods.organizationQuota.toLowerCase()

        delete privateMethods.organizationData.organizition

        statsMethods.getData(privateMethods.organizationData)
        statsMethods.getPieData(privateMethods.pieData)
    })
    $('#id-organization-pages').change(function () {
        privateMethods.organizationQuota = $('#id-organization-quota').find('option:selected').text()
        privateMethods.organizationData.pageSize = Number($('#id-organization-pages').find('option:selected').text());
        privateMethods.organizationData.sortKey = privateMethods.organizationQuota.toLowerCase()
        privateMethods.pieData.type = privateMethods.organizationQuota.toLowerCase()

        delete privateMethods.organizationData.organizition

        statsMethods.getData(privateMethods.organizationData)
    })
    $('.organization-organize-input').on('keypress', function (e) {
        if(e.keyCode === 13){
            // postOrganData = privateMethods.getOrganizationData()
            privateMethods.organizationQuota = $('#id-organization-quota').find('option:selected').text()
            privateMethods.organizationData.pageSize = Number($('#id-organization-pages').find('option:selected').text());
            privateMethods.organizationData.sortKey = privateMethods.organizationQuota.toLowerCase()
            privateMethods.pieData.type = privateMethods.organizationQuota.toLowerCase()

            delete privateMethods.organizationData.organizition

            // statsMethods.getData(privateMethods.organizationData)
            privateMethods.organizationData.organizationSearchKey = $('.organization-organize-input').val()
            statsMethods.getData(privateMethods.organizationData)
        }
    })

    $('#id-individual-pages').change(function () {
        postIndiviData = privateMethods.getIndividualData()
        statsMethods.getData(postIndiviData)
    })
    $('.individual-indivi-input').on('keypress', function (e) {
        if(e.keyCode === 13){
            postIndiviData = privateMethods.getIndividualData()
            statsMethods.getData(postIndiviData)
        }
    })
    $('.individual-organ-input').on('keypress', function (e) {
        if(e.keyCode === 13){
            postIndiviData = privateMethods.getIndividualData()
            statsMethods.getData(postIndiviData)
        }
    })


    privateMethods.organSort($('.indivi-pr-sort'), 'js-indivi-pr-descending', '.down')
    privateMethods.organSort($('.indivi-pr-sort'), 'js-indivi-pr-ascending', '.up')
    privateMethods.organSort($('.indivi-issue-sort'), 'js-indivi-issue-descending', '.down')
    privateMethods.organSort($('.indivi-issue-sort'), 'js-indivi-issue-ascending', '.up')
    privateMethods.organSort($('.indivi-comments-sort'), 'js-indivi-comments-descending', '.down')
    privateMethods.organSort($('.indivi-comments-sort'), 'js-indivi-comments-ascending', '.up')

}

    init()
})
