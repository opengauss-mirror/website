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
            releaseFlag: 2
        },
        listResponse: {},
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
                url: '/calender/opengauss/user/',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.errno === '200') {
                        console.log('授权登录');
                    }
                }
            });
        },
        getE: function (data){
            $.ajax({
                type: "GET",
                url: '/calender/gitee_login/',
                // url: `https://gitee.com/oauth/authorize?client_id=c5b7a0d3b370e7ec56e0343a777e6dd91059929e7b7379b8c7691feca159fcd1&redirect_uri=/calender/gitee_login/&response_type=code`,
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.errno === '200') {
                        console.log('授权登录');
                    }
                }
            });
        }
    }

    var __main = function () {
        adMethods.getDetailData()
        let dataJSON = {
            // "tableData": [
            //     {
            //         "date": "2020-09-22",
            //         "timeData": [
            //             {
            //                 "id": 8,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG weekly ",
            //                 "creator": "jdkboy",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epkedQbVRPC7wR93ZBL2ORUf5ayC2TwLbzLV8XWMialE2P2y1CuGwRMRzMW09siaibC22uVh9UNlibXkg/132",
            //                 "join_url": "https://zoom.us/j/96011991884",
            //                 "meeting_id": "96011991884",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-09-27",
            //         "timeData": [
            //             {
            //                 "id": 10,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "sig-JAVA例会",
            //                 "creator": "sinever",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/v3O6QY6WLO0EcNWogXUc1XYuqUztSWLPnBjF9iaS02fQxxSfGzAbRn9aggtJJI9XkOIbGMQomAPLbjVP4MeVMyQ/132",
            //                 "join_url": "https://zoom.us/j/98468417590",
            //                 "meeting_id": "98468417590",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 12,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:05",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "工作例会",
            //                 "creator": "luo-haibo",
            //                 "detail": "例行工作",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEICzG9pHJoV0Zwf6n9ibBw5V4OkHLGSm47Jlvy9rcpjc3ezzCicCVaHZricpiajEL3UBu5Nb5uVygMSgg/132",
            //                 "join_url": "https://zoom.us/j/99209779753",
            //                 "meeting_id": "99209779753",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-09-28",
            //         "timeData": [
            //             {
            //                 "id": 11,
            //                 "group_name": "dev-utils",
            //                 "startTime": "11:00",
            //                 "endTime": "11:30",
            //                 "duration": 1,
            //                 "duration_time": "11:00-12:00",
            //                 "name": "sig-utils例会",
            //                 "creator": "love_hangzhou",
            //                 "detail": "dev-utils例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEJo64BWIPQXNnk1wBIxPlSibWA3k8ZwhaX0EoLNtQgQmO3xx0p1FFuzuYpCDjNjgVe7wwZibNsfJibxg/132",
            //                 "join_url": "https://zoom.us/j/99302896356",
            //                 "meeting_id": "99302896356",
            //                 "etherpad": "https://etherpad.openeuler.org/p/dev-utils-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-09-30",
            //         "timeData": [
            //             {
            //                 "id": 9,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "TC 例会",
            //                 "creator": "xiexiuqi",
            //                 "detail": "TC 例会，欢迎申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/96424206911",
            //                 "meeting_id": "96424206911",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 24,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:15",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "sig-Gatekeeper meeting",
            //                 "creator": "liuqi469227928",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/mG8pYHVExwicM3DVEVnZjGeSA8UEviaodWScPz6xqCvj83zS8gFv9UBn097EoR8WZRp1WyzZgzdusyh017jnRWiaQ/132",
            //                 "join_url": "https://zoom.us/j/93627928757?pwd=MTJzSVdJa2ptNzgvbDQxZi83Q0ZNdz09",
            //                 "meeting_id": "93627928757",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 25,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:15",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "sig-Gatekeeper m2 ",
            //                 "creator": "liuqi469227928",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/mG8pYHVExwicM3DVEVnZjGeSA8UEviaodWScPz6xqCvj83zS8gFv9UBn097EoR8WZRp1WyzZgzdusyh017jnRWiaQ/132",
            //                 "join_url": "https://zoom.us/j/99242833029?pwd=RlFGN1dsbzRaTlZ0Z29QQXhqRWNlUT09",
            //                 "meeting_id": "99242833029",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-09",
            //         "timeData": [
            //             {
            //                 "id": 14,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune & wisdom sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "1、在线时动态调优相关强化学习算法介绍",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/95970573411",
            //                 "meeting_id": "95970573411",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-12",
            //         "timeData": [
            //             {
            //                 "id": 30,
            //                 "group_name": "dev-utils",
            //                 "startTime": "11:00",
            //                 "endTime": "12:00",
            //                 "duration": 1,
            //                 "duration_time": "11:00-12:00",
            //                 "name": "dev-utils sig组例会",
            //                 "creator": "ethan848",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI39CDPyWiaicjTO8ZzvRJeVHWvstxZM8kNe7vQqO8RXWzwQSIuvXRdTHMib5wPfExmtianT6EvicOTFMg/132",
            //                 "join_url": "https://zoom.us/j/92378115982?pwd=RUUzY0lVd1B3WjRRL0tGZjBOSk1CQT09",
            //                 "meeting_id": "92378115982",
            //                 "etherpad": "https://etherpad.openeuler.org/p/dev-utils-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-13",
            //         "timeData": [
            //             {
            //                 "id": 34,
            //                 "group_name": "Infrastructure",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Infra-SIG周例会",
            //                 "creator": "georgecao",
            //                 "detail": "Infra-SIG周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/99661318762?pwd=TWx3dU00Z2dMRmVTbkhFVmV6aWlydz09",
            //                 "meeting_id": "99661318762",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Infrastructure-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-14",
            //         "timeData": [
            //             {
            //                 "id": 35,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "Release Management SIG例会",
            //                 "creator": "zyp-rock",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLShu4byH2WM9IaCewXH6jCCF55d7XCUYCfZqutYicwvWEliayttK8SOnfVYhRCKgvIm6DP69rn6yMA/132",
            //                 "join_url": "https://zoom.us/j/99967390045?pwd=VkdsY3V1OVU1WDlYNUZzaXBKRG95QT09",
            //                 "meeting_id": "99967390045",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 43,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler security committee meeting",
            //                 "creator": "liujingang09",
            //                 "detail": "openeuler安全委员会周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/97140162256?pwd=Ym95cDVmZkNkZjNYN3ZIY2dpT09UZz09",
            //                 "meeting_id": "97140162256",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-15",
            //         "timeData": [
            //             {
            //                 "id": 46,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "2020/10/16 sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "工作例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/99299677549?pwd=bTQySndpTzJ6YkZ3U2VsZnZoTzZJQT09",
            //                 "meeting_id": "99299677549",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-16",
            //         "timeData": [
            //             {
            //                 "id": 13,
            //                 "group_name": "Kernel",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/94156903933",
            //                 "meeting_id": "94156903933",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 44,
            //                 "group_name": "Virt",
            //                 "startTime": "14:30",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt sig meeting",
            //                 "creator": "zhendongchen",
            //                 "detail": "1、20.03 LTS SP1需求讨论\n2、21.03 需求讨论\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUpvIbIYFyU1E7J7ODWI6rhtvm5CjE4RekpIF7UVicTyH2QWDEaNvoyPfaxCG1LH5ryibNcx22og0w/132",
            //                 "join_url": "https://zoom.us/j/98422207555?pwd=UlprcWxhT2RobFdVU3MwVVBCWVNzdz09",
            //                 "meeting_id": "98422207555",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 47,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "2020/10/16 sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "工作例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/93982318866?pwd=OTNZbE1UK2dyS2ZjSStQcjNkRGVjQT09",
            //                 "meeting_id": "93982318866",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-17",
            //         "timeData": [
            //             {
            //                 "id": 48,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "OS-Builder sig组例会",
            //                 "creator": "t_feng",
            //                 "detail": "回顾sig前期运作\n介绍当前工作",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/99159482423?pwd=OEpjU2hyZmF6NjArZ2toRmdwSXJNdz09",
            //                 "meeting_id": "99159482423",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-20",
            //         "timeData": [
            //             {
            //                 "id": 49,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG weekly meeting",
            //                 "creator": "jdkboy",
            //                 "detail": "gcc roadmap讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epkedQbVRPC7wR93ZBL2ORUf5ayC2TwLbzLV8XWMialE2P2y1CuGwRMRzMW09siaibC22uVh9UNlibXkg/132",
            //                 "join_url": "https://zoom.us/j/93808922627?pwd=ZnlPT2RDa2hNVjV4V0NxUUZ0K1JsZz09",
            //                 "meeting_id": "93808922627",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 50,
            //                 "group_name": "iSulad",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "SIG例会",
            //                 "creator": "jingxiaolu",
            //                 "detail": "1、iSula SIG运作近况\n2、镜像仓库运作讨论\n\n欢迎大家提交议题~",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJ6vGr1VpUb1icGMBMOsicMGF2w590RJXKdvAYdDuHnu9Yr7Bfm9wQXCxvAF7qYHr5ef3et9VdNfFQ/132",
            //                 "join_url": "https://zoom.us/j/95910045475?pwd=YTM5UkpQT3F5NURMVEgxVHlPMEJyUT09",
            //                 "meeting_id": "95910045475",
            //                 "etherpad": "https://etherpad.openeuler.org/p/iSulad-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-21",
            //         "timeData": [
            //             {
            //                 "id": 45,
            //                 "group_name": "Virt",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "[议题收集]openEuler TC例会",
            //                 "creator": "黑白",
            //                 "detail": "欢迎直接回复此邮件申报议题！",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erElNYiaZBc7K41esdmGlD2kThbvhrqRphVuWZ5OMpMR5bbXsTVnV0hibaqMib37iaOsmCianr8cAqUoLA/132",
            //                 "join_url": "https://zoom.us/j/96414120913?pwd=L1RMVmZJZG1oc2hzR0owNC9tcGhjQT09",
            //                 "meeting_id": "96414120913",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-22",
            //         "timeData": [
            //             {
            //                 "id": 52,
            //                 "group_name": "sig-ai-bigdata",
            //                 "startTime": "18:30",
            //                 "endTime": "19:30",
            //                 "duration": 2,
            //                 "duration_time": "18:00-20:00",
            //                 "name": "sig-ai-bigdata regular meeting",
            //                 "creator": "Hubble_Zhu",
            //                 "detail": "1、sig成员前期工作审视\n2、下一步计划和分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ruxj2Ko6lpWVgRTYW2TvugPrTBQPnS111328F2aO3SO6Tsq53DuxCfEcFQJuUL45JxTEXv4GEnNdbkia24yzjWg/132",
            //                 "join_url": "https://zoom.us/j/94728430696?pwd=TENoVy9BRDRXMjhPSzkrSTduMmg2Zz09",
            //                 "meeting_id": "94728430696",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ai-bigdata-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-23",
            //         "timeData": [
            //             {
            //                 "id": 51,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune & wisdom sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "auto tuning for numa systems，reporter：gaoruoshu",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/93138709415?pwd=UmswUks1YlJnVnhSVGZlNzBjR0VmQT09",
            //                 "meeting_id": "93138709415",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 66,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "dig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "工作例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/98597590811?pwd=RHpBOWtVZGRUc2tGRkwzRUpSdUNsQT09",
            //                 "meeting_id": "98597590811",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-26",
            //         "timeData": [
            //             {
            //                 "id": 67,
            //                 "group_name": "dev-utils",
            //                 "startTime": "11:00",
            //                 "endTime": "12:00",
            //                 "duration": 1,
            //                 "duration_time": "11:00-12:00",
            //                 "name": "dev-utils sig组例会",
            //                 "creator": "ethan848",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI39CDPyWiaicjTO8ZzvRJeVHWvstxZM8kNe7vQqO8RXWzwQSIuvXRdTHMib5wPfExmtianT6EvicOTFMg/132",
            //                 "join_url": "https://zoom.us/j/93022971887?pwd=VTA2cmhIUitjcm1od0ROUVlQODVTUT09",
            //                 "meeting_id": "93022971887",
            //                 "etherpad": "https://etherpad.openeuler.org/p/dev-utils-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-27",
            //         "timeData": [
            //             {
            //                 "id": 69,
            //                 "group_name": "Infrastructure",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "openEuler基础设施例会",
            //                 "creator": "georgecao",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/93447818444?pwd=ZE1RZ0JLTTZsMTBFdWxPc1hsV1RBZz09",
            //                 "meeting_id": "93447818444",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Infrastructure-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-28",
            //         "timeData": [
            //             {
            //                 "id": 68,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "09:30",
            //                 "endTime": "11:30",
            //                 "duration": 3,
            //                 "duration_time": "09:00-12:00",
            //                 "name": "release-management sig组例会",
            //                 "creator": "yuming_jiang",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/a1AcG78zPu3UvpicNCcGzXElI893fs48GrKPzPLhpGfqsc7VkLxlgibnAuw0GcRgO5bk5FH1MGA5f5miabibZUtxFg/132",
            //                 "join_url": "https://zoom.us/j/96457420049?pwd=di95MnJaUU1sNmxFQWMrNjBMZFBEZz09",
            //                 "meeting_id": "96457420049",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-30",
            //         "timeData": [
            //             {
            //                 "id": 72,
            //                 "group_name": "Virt",
            //                 "startTime": "14:30",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt sig meeting",
            //                 "creator": "zhendongchen",
            //                 "detail": "20.03 sp1需求进展\nEuler Robot测试进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUpvIbIYFyU1E7J7ODWI6rhtvm5CjE4RekpIF7UVicTyH2QWDEaNvoyPfaxCG1LH5ryibNcx22og0w/132",
            //                 "join_url": "https://zoom.us/j/92258929740?pwd=RXlaTnAxOVY3dmV1akZvZHFqZjBmQT09",
            //                 "meeting_id": "92258929740",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-10-31",
            //         "timeData": [
            //             {
            //                 "id": 73,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:20",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder sig组例会",
            //                 "creator": "t_feng",
            //                 "detail": "1. 当前工作审视\n2. 组内成员汇报",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/99531935857?pwd=Q2RmUjg4S1k2Y3JMS0M2RkI3UG02Zz09",
            //                 "meeting_id": "99531935857",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-03",
            //         "timeData": [
            //             {
            //                 "id": 75,
            //                 "group_name": "Infrastructure",
            //                 "startTime": "17:02",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "openEuler基础设施周例会",
            //                 "creator": "georgecao",
            //                 "detail": "openEuler基础设施周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/98489820007?pwd=Z3NpTlk2Y0FzWlMzZFVoNUt3bVJqZz09",
            //                 "meeting_id": "98489820007",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Infrastructure-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 76,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing例会",
            //                 "creator": "blue0613",
            //                 "detail": "银联同事介绍机密计算应用场景",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eovLtFRmict7mrUWRg7ejNiaKjckGXrVjHE8k6uuxZibhapJHPYibGEQWdH28jZs0yB6EdKibZhl1xqj0A/132",
            //                 "join_url": "https://zoom.us/j/93280756713?pwd=ZG1acUZIeHJRckhaZDRjbndMQlJ3QT09",
            //                 "meeting_id": "93280756713",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 78,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. 树莓派内核代码、镜像更新的工作进展\n2. 用户默认密码设置策略\n3. 镜像添加到树莓派官方第三方系统镜像列表的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/93706391758?pwd=Y2hkY1l0bmxkYk93TTZWZkNxaWJnQT09",
            //                 "meeting_id": "93706391758",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-05",
            //         "timeData": [
            //             {
            //                 "id": 77,
            //                 "group_name": "sig-high-performance-network",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-high-performance-network例会",
            //                 "creator": "peanut_huang",
            //                 "detail": "1. 在openEuler中是否引入lwip\n2. sig成员前期工作审视\n3. 下一步计划与分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJfO46cmFZvu1XUSIJTVWuDN3X0PsWOtfsq4rmiadC4DBUlpficDS40Vp5hVQ44ohtcGEAqh1L2Rojg/132",
            //                 "join_url": "https://zoom.us/j/99497532037?pwd=bFhJL1VQOUhuZy9EZU8zR3grQ1Rudz09",
            //                 "meeting_id": "99497532037",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-high-performance-network-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-06",
            //         "timeData": [
            //             {
            //                 "id": 80,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune & wisdom sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "本次sig会议议程：\n1、调度亲和性探测与映射方法介绍，汇报人：chenmingmin\n2、A-Tune web UI 介绍与演示，汇报人：gaoruoshu",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/99043681198?pwd=dlhvUUk3UHhzcTl5emtuTTFVSmdQUT09",
            //                 "meeting_id": "99043681198",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 87,
            //                 "group_name": "A-Tune",
            //                 "startTime": "15:00",
            //                 "endTime": "18:00",
            //                 "duration": 3,
            //                 "duration_time": "15:00-18:00",
            //                 "name": "A-Tune与中南大学技术交流",
            //                 "creator": "hanxinke",
            //                 "detail": "技术探讨",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/92966159395?pwd=VWJieDdqS2h2TnNyUVBlam1IZGcyZz09",
            //                 "meeting_id": "92966159395",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 89,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "2020-11-06 sig-Java例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/96685266355?pwd=b1NlZDdCekxkd2RUMVFzVDhqc3o3QT09",
            //                 "meeting_id": "96685266355",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-07",
            //         "timeData": [
            //             {
            //                 "id": 88,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder sig例会",
            //                 "creator": "t_feng",
            //                 "detail": "Sig组工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/95697700582?pwd=bllham5jeTg5SlpZcFBFeEpiZW9xUT09",
            //                 "meeting_id": "95697700582",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-09",
            //         "timeData": [
            //             {
            //                 "id": 90,
            //                 "group_name": "Marketing",
            //                 "startTime": "10:30",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "运营周会",
            //                 "creator": "genedna",
            //                 "detail": "Marketing 例会，沟通竞赛和活动的进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLKrpSbS4Hkukgl2Y1cllR3fhSMchHB8iaomDWV8eK3ENSskiczCxr3UwWTQBiab2b6TKeG9WicVRo7Sg/132",
            //                 "join_url": "https://zoom.us/j/95641922641?pwd=K1pkb3BMblppazFydVIxTG84RVJNZz09",
            //                 "meeting_id": "95641922641",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Marketing-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-10",
            //         "timeData": [
            //             {
            //                 "id": 86,
            //                 "group_name": "sig-DDE",
            //                 "startTime": "14:30",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "DDE sig组11月例会",
            //                 "creator": "panchenbo",
            //                 "detail": "1，lts sp1版本DDE工作进展及问题讨论\n2，DDE版本更新计划\n3，树莓派镜像DDE集成讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIHQgiaZpLr9iclRlZbs0Ws7QssIXdvFDDkm8f98ia6YItjUaAaIMIJApczibXGwlic8a7srvvHF7GbCJw/132",
            //                 "join_url": "https://zoom.us/j/98973779944?pwd=c2RyaDFoWXVjSm5rT05FdkM4WkZoUT09",
            //                 "meeting_id": "98973779944",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-DDE-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 92,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "20:28",
            //                 "duration": 3,
            //                 "duration_time": "18:00-21:00",
            //                 "name": "compass-ci 包构建交流",
            //                 "creator": "jimmy_hero",
            //                 "detail": "build-pkg 软件包构建交流",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/bCbFOsytNZh2IbzTI01QU60mZSxCe4jx7CxZwFbHo467ZviaIeqcDashMQI42ibDXAye2picTLPicUA6pUy6ZpjBEQ/132",
            //                 "join_url": "https://zoom.us/j/98861529478?pwd=S1hkMStqak44VGJZSy9WVlBXbExBZz09",
            //                 "meeting_id": "98861529478",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-12",
            //         "timeData": [
            //             {
            //                 "id": 91,
            //                 "group_name": "sig-EasyLife",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "Easy Life 第一次 SIG会议",
            //                 "creator": "Shinwell_hu",
            //                 "detail": "第一次easylife aig会议",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI4Tosj3tAYvfwqb5mbqmb5OVtOExb33uoiaDQnfbAVWzNzjRvxp8VtT2hID3ib7zscZibh8EAR11I4Q/132",
            //                 "join_url": "https://zoom.us/j/97860617077?pwd=U2NSaEVhZ0RwV1UzOUhZdk1udWcrZz09",
            //                 "meeting_id": "97860617077",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-EasyLife-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-13",
            //         "timeData": [
            //             {
            //                 "id": 79,
            //                 "group_name": "Virt",
            //                 "startTime": "14:30",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt sig meeting",
            //                 "creator": "zhendongchen",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUpvIbIYFyU1E7J7ODWI6rhtvm5CjE4RekpIF7UVicTyH2QWDEaNvoyPfaxCG1LH5ryibNcx22og0w/132",
            //                 "join_url": "https://zoom.us/j/97978985752?pwd=ZU1zeHB1RTZRYTRmNTZ4NmozR2JEQT09",
            //                 "meeting_id": "97978985752",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 93,
            //                 "group_name": "Kernel",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "openEuler kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/95401954871?pwd=OG1HMXczek8xV3hXcE16TmZQclNDdz09",
            //                 "meeting_id": "95401954871",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 94,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "09:15",
            //                 "endTime": "11:00",
            //                 "duration": 2,
            //                 "duration_time": "09:00-11:00",
            //                 "name": "sig-confidential-computing例会",
            //                 "creator": "blue0613",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eovLtFRmict7mrUWRg7ejNiaKjckGXrVjHE8k6uuxZibhapJHPYibGEQWdH28jZs0yB6EdKibZhl1xqj0A/132",
            //                 "join_url": "https://zoom.us/j/92726755753?pwd=Kyt6S3IwcDZsK1JzL25xQlpqUjV6Zz09",
            //                 "meeting_id": "92726755753",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 95,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "sig-Java例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/99623275039?pwd=UlFMYVRIRU9pUUtJMzgwOCtZSTh1QT09",
            //                 "meeting_id": "99623275039",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 96,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "sig-Java例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/95161109721?pwd=d2FWajE1eG9xa3VxeUo5ek0xYlZ5dz09",
            //                 "meeting_id": "95161109721",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-17",
            //         "timeData": [
            //             {
            //                 "id": 97,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. 上游树莓派内核代码分支合并到 openEuler 的工作进展\n2. 树莓派 4B 添加 Xfce 桌面环境的工作进展\n3. openEuler 移植到 RK3399 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/99081732447?pwd=M0JlYThydzkvQzdJSG02Rm8zMWFyQT09",
            //                 "meeting_id": "99081732447",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 98,
            //                 "group_name": "Infrastructure",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "openEuler基础设施例会",
            //                 "creator": "georgecao",
            //                 "detail": "openEuler基础设施例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/98270515224?pwd=cGxVeHdkaFFMVDZ6L01mSHNmSEo3Zz09",
            //                 "meeting_id": "98270515224",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Infrastructure-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-18",
            //         "timeData": [
            //             {
            //                 "id": 99,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "15:00",
            //                 "endTime": "16:00",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "openstack sig会议",
            //                 "creator": "joec88",
            //                 "detail": "介绍及讨论openstack sig下一步工作",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://zoom.us/j/97347778540?pwd=eGdNTHNQQ0dFcVdxMVhQejVIaXd2UT09",
            //                 "meeting_id": "97347778540",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-19",
            //         "timeData": [
            //             {
            //                 "id": 102,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "20:30",
            //                 "duration": 3,
            //                 "duration_time": "18:00-21:00",
            //                 "name": "queue字段讲解",
            //                 "creator": "cuixucui",
            //                 "detail": "queue字段讲解",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/92203895138?pwd=M2JldTBkbk9jbVJQZFhmYUJUSGZ4dz09",
            //                 "meeting_id": "92203895138",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 103,
            //                 "group_name": "sig-high-performance-network",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-high-performance-network regular meeting",
            //                 "creator": "peanut_huang",
            //                 "detail": "1. sig成员前期工作审视\n2. 下一步计划与分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJfO46cmFZvu1XUSIJTVWuDN3X0PsWOtfsq4rmiadC4DBUlpficDS40Vp5hVQ44ohtcGEAqh1L2Rojg/132",
            //                 "join_url": "https://zoom.us/j/94250990119?pwd=Q0hOVnMyOWhmbGxoMmNNc0JTRENGZz09",
            //                 "meeting_id": "94250990119",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-high-performance-network-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 104,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Gatekeeper-Sig周例会",
            //                 "creator": "georgecao",
            //                 "detail": "周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/98457886155?pwd=UzZQeTFzeXl4dSsyYnZuVlpXUERmUT09",
            //                 "meeting_id": "98457886155",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-20",
            //         "timeData": [
            //             {
            //                 "id": 100,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune & wisdom sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "本次sig会议议程：\n1、启发式学习算法调研与分享，汇报人：xiezhipeng\n2、A-Tune collector模块讲解，汇报人：hanxinke",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/92377266863?pwd=YjFlY2hESGkrSkdZdHBxeU9qbnpJZz09",
            //                 "meeting_id": "92377266863",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 106,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/97366475686?pwd=eFVkTEdNZkRnbzlEZWFsNmlpRnJTUT09",
            //                 "meeting_id": "97366475686",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-23",
            //         "timeData": [
            //             {
            //                 "id": 109,
            //                 "group_name": "dev-utils",
            //                 "startTime": "10:30",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "dev-utils sig组例会",
            //                 "creator": "BruceGW",
            //                 "detail": "systemd重写初步方案讨论\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/TB4lunV5ZEZGp1ib8cWicFK3JoicJRJib6T9sG80zW2PDNT4wIibBJpsibrK6g5eeDSz97iawuApEJhjJOYcO5gibmRRaA/132",
            //                 "join_url": "https://zoom.us/j/99141337445?pwd=Umg3VUV1N0VzK21nYXNMZDkwdTZ0UT09",
            //                 "meeting_id": "99141337445",
            //                 "etherpad": "https://etherpad.openeuler.org/p/dev-utils-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-24",
            //         "timeData": [
            //             {
            //                 "id": 105,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG weekly meeting",
            //                 "creator": "jvmboy",
            //                 "detail": "已收集议题如下：\n1.毕昇jdk &SVE工作进展\n2.社区事务讨论\n\n议题持续收集中，新增议题直接邮件回复申报即可。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/92738644222?pwd=MUFHdXRCVzcvc0x3dTN2cE5mMEVTUT09",
            //                 "meeting_id": "92738644222",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 107,
            //                 "group_name": "doc",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "DOC SIG双周例会",
            //                 "creator": "qiaominna",
            //                 "detail": "1. 对齐 20.03 LTS SP1版本文档需求和进展\n2. 传递提交PR和issue规范\n3. 传递发布MARKDOWN文档规范\n4. 传递文档的常规更新维护渠道\n5. 收集大家对资料的诉求",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/zIw7GFqg2dNpicLpdqyzfibmOKRbY3zrHicwd3PJZUjsXL0yvWjaGib82VXZm59tgKc9kicvmdztfGgMzynBfxTvwcg/132",
            //                 "join_url": "https://zoom.us/j/96908808905?pwd=WTg5eGpYYWtRb2d6dU5PK1Z5bGNKdz09",
            //                 "meeting_id": "96908808905",
            //                 "etherpad": "https://etherpad.openeuler.org/p/doc-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-25",
            //         "timeData": [
            //             {
            //                 "id": 111,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "09:30",
            //                 "endTime": "11:30",
            //                 "duration": 3,
            //                 "duration_time": "09:00-12:00",
            //                 "name": "release-management sig 例会",
            //                 "creator": "yuming_jiang",
            //                 "detail": "议题待收集",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/a1AcG78zPu3UvpicNCcGzXElI893fs48GrKPzPLhpGfqsc7VkLxlgibnAuw0GcRgO5bk5FH1MGA5f5miabibZUtxFg/132",
            //                 "join_url": "https://zoom.us/j/92904726255?pwd=TlRDd21oNWE4VThDZTB4Yk04eHN2QT09",
            //                 "meeting_id": "92904726255",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 115,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openeuler安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "1 社区漏洞感知系统进展\n2 11月漏洞修复和sa计划\n3 漏洞奖励计划进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/99460816408?pwd=WjYvSGowU092VUtxK0Rtdk53K0FuQT09",
            //                 "meeting_id": "99460816408",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-26",
            //         "timeData": [
            //             {
            //                 "id": 114,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "20:30",
            //                 "duration": 3,
            //                 "duration_time": "18:00-21:00",
            //                 "name": "how to apply  account for jumper server",
            //                 "creator": "cuixucui",
            //                 "detail": "栾生德 讲解 how to apply  account for jumper server",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/91036397894?pwd=b3dhK0ZSSUEybzlRd3R5ckwrVXJSZz09",
            //                 "meeting_id": "91036397894",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 117,
            //                 "group_name": "sig-EasyLife",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "EasyLife SIG 例会",
            //                 "creator": "chenyanpanHW",
            //                 "detail": "1. 当前各个子项目进展\n2. 遗留问题解决情况\n3. 其它议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eophIicGiahpgQmvzeAVNRyyutnz9BFXeF3Dg7f81ALWHGUlIEaDSDGiaAwIpePicjYv1wPTJMfE6tSeg/132",
            //                 "join_url": "https://zoom.us/j/91969697923?pwd=a1NoOTZKa3NCS3NRSWlFSFNybUJtQT09",
            //                 "meeting_id": "91969697923",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-EasyLife-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-27",
            //         "timeData": [
            //             {
            //                 "id": 110,
            //                 "group_name": "Virt",
            //                 "startTime": "14:30",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "sig virt meeting",
            //                 "creator": "zhendongchen",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUpvIbIYFyU1E7J7ODWI6rhtvm5CjE4RekpIF7UVicTyH2QWDEaNvoyPfaxCG1LH5ryibNcx22og0w/132",
            //                 "join_url": "https://zoom.us/j/92720104472?pwd=Q3VDY0RPa0V6czFjSEVIc1lxREpIUT09",
            //                 "meeting_id": "92720104472",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 112,
            //                 "group_name": "Kernel",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/97109945953?pwd=SWE3a0lDeFZvY0ZVamw2bkl2Rnh6UT09",
            //                 "meeting_id": "97109945953",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 113,
            //                 "group_name": "sig-ai-bigdata",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-ai-bigdata regular meeting",
            //                 "creator": "Hubble_Zhu",
            //                 "detail": "1、sig成员前期工作审视\n2、下一步工作计划与分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ruxj2Ko6lpWVgRTYW2TvugPrTBQPnS111328F2aO3SO6Tsq53DuxCfEcFQJuUL45JxTEXv4GEnNdbkia24yzjWg/132",
            //                 "join_url": "https://zoom.us/j/94917076776?pwd=WFpGaCtYelUyWVpXdGRmUitmMTg2UT09",
            //                 "meeting_id": "94917076776",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ai-bigdata-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 118,
            //                 "group_name": "sig-wine",
            //                 "startTime": "16:30",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "Wine SIG 例会",
            //                 "creator": "vyloy",
            //                 "detail": "1，项目进展\n2，遗留问题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erZYAUiaYFBuJOm3V6TPuia1AxRpTk6YLUpUL6gZTgpMCwbfrEmcKjtoHMAvgSO1gibZOApQ8ePFaEyQ/132",
            //                 "join_url": "https://zoom.us/j/94960855081?pwd=WmU1WTNlMFBub0JYemQrSHB4eU1XZz09",
            //                 "meeting_id": "94960855081",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-wine-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 119,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/95547912701?pwd=djdocHRFZ1ZvcFVGb3BaVURHcmQvUT09",
            //                 "meeting_id": "95547912701",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-28",
            //         "timeData": [
            //             {
            //                 "id": 120,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder sig组例会",
            //                 "creator": "t_feng",
            //                 "detail": "Sig组近期工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/93871272790?pwd=VnpqNDlWck4xUnFpN0ovWVYvTzlZQT09",
            //                 "meeting_id": "93871272790",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-11-30",
            //         "timeData": [
            //             {
            //                 "id": 122,
            //                 "group_name": "sig-Java",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/99918162930?pwd=QWlBdkhDVldrNXlsYjBkTUk0MDduZz09",
            //                 "meeting_id": "99918162930",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 125,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:30",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openeuler奖励计划发布内容评审",
            //                 "creator": "liujingang09",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/97147529281?pwd=a1FIQjl4ZjhQeDhjSDFZWXJScmJUZz09",
            //                 "meeting_id": "97147529281",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-01",
            //         "timeData": [
            //             {
            //                 "id": 121,
            //                 "group_name": "iSulad",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "SIG例会",
            //                 "creator": "jingxiaolu",
            //                 "detail": "1、近期信息同步\n\n欢迎申报议题~",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJ6vGr1VpUb1icGMBMOsicMGF2w590RJXKdvAYdDuHnu9Yr7Bfm9wQXCxvAF7qYHr5ef3et9VdNfFQ/132",
            //                 "join_url": "https://zoom.us/j/93193761030?pwd=Q0lXZE0xYzZqZnFzVURnQW53SWNUQT09",
            //                 "meeting_id": "93193761030",
            //                 "etherpad": "https://etherpad.openeuler.org/p/iSulad-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 123,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing例会",
            //                 "creator": "chenmaodong",
            //                 "detail": "openeuler-summit展示方案讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://zoom.us/j/92613498894?pwd=OGJrQjVxRzhGblVINFhheDdmOGdjQT09",
            //                 "meeting_id": "92613498894",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 127,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况\n2. 树莓派 4B 添加 Xfce/DDE/UKUI 桌面环境的工作进展\n3. openEuler 移植到 RK3399 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/91300171443?pwd=d0N3R1RNL25neWZuVjlsdnJSQXdPQT09",
            //                 "meeting_id": "91300171443",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 128,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "20:30",
            //                 "duration": 3,
            //                 "duration_time": "18:00-21:00",
            //                 "name": "【培训】How to apply account for jumper server",
            //                 "creator": "cuixucui",
            //                 "detail": "培训讲师：栾生德 \n培训主题：讲解 How to apply account for jumper server（记得录屏哈）\n培训时间：2020.12.1 18：30～20：30\n会议纪要人：任文",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/97018792807?pwd=NXlxUmlZVG5FaTFydzBEK1FKbXZHQT09",
            //                 "meeting_id": "97018792807",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-02",
            //         "timeData": [
            //             {
            //                 "id": 124,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:30",
            //                 "duration": 3,
            //                 "duration_time": "10:00-13:00",
            //                 "name": "12月2日 TC例行会议",
            //                 "creator": "Shinwell_hu",
            //                 "detail": "TC双周例行会议",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI4Tosj3tAYvfwqb5mbqmb5OVtOExb33uoiaDQnfbAVWzNzjRvxp8VtT2hID3ib7zscZibh8EAR11I4Q/132",
            //                 "join_url": "https://zoom.us/j/95909896918?pwd=SFp0Mk5jSjRFalBlWSt0R3krekEwUT09",
            //                 "meeting_id": "95909896918",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 126,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openeuler安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/98329358682?pwd=VnQ5MCtCR2dqVEdTK0ZPREhMQkRkdz09",
            //                 "meeting_id": "98329358682",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-03",
            //         "timeData": [
            //             {
            //                 "id": 132,
            //                 "group_name": "sig-high-performance-network",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-high-performance-network regular meeting",
            //                 "creator": "peanut_huang",
            //                 "detail": "1. sig成员前期工作审视\n2. 下一步计划与分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJfO46cmFZvu1XUSIJTVWuDN3X0PsWOtfsq4rmiadC4DBUlpficDS40Vp5hVQ44ohtcGEAqh1L2Rojg/132",
            //                 "join_url": "https://zoom.us/j/93525169356?pwd=RW43MEFnc2NCSmFIY0JXMnZTcDZTUT09",
            //                 "meeting_id": "93525169356",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-high-performance-network-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 133,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Gatekeeper双周例会",
            //                 "creator": "georgecao",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/93877772326?pwd=ZmFzdXpoaytxb2RXQTJiWXhMYVhLUT09",
            //                 "meeting_id": "93877772326",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-04",
            //         "timeData": [
            //             {
            //                 "id": 129,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune & wisdom sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "本次sig会议议程：\n1、强化学习算法调研与分享，汇报人：songmingcong\n2、新增调优示例方法介绍，汇报人：hanxinke",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/92930493562?pwd=dEE4bnRBRDZKbVhwVDk2Zm5PdFVBQT09",
            //                 "meeting_id": "92930493562",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 134,
            //                 "group_name": "sig-Compatibility-Infra",
            //                 "startTime": "14:15",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "南向兼容性双周例会",
            //                 "creator": "cuixucui",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/91613376069?pwd=aldGV3pSUTlNbjkvaTNHSlJEMmtQQT09",
            //                 "meeting_id": "91613376069",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Compatibility-Infra-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-07",
            //         "timeData": [
            //             {
            //                 "id": 137,
            //                 "group_name": "sig-Java",
            //                 "startTime": "18:00",
            //                 "endTime": "19:00",
            //                 "duration": 1,
            //                 "duration_time": "18:00-19:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/97398402042?pwd=YXkzUHM2STJoeG5QNWJsQThZdmtndz09",
            //                 "meeting_id": "97398402042",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 138,
            //                 "group_name": "sig-Java",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/98499637808?pwd=cUNLK2s5VTR5by9ZRFEwUTEybTVWdz09",
            //                 "meeting_id": "98499637808",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-08",
            //         "timeData": [
            //             {
            //                 "id": 131,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG weekly meeting",
            //                 "creator": "jvmboy",
            //                 "detail": "已收集议题如下：\n1. 毕昇jdk & SVE工作进展\n2. annotation优化机制\n\n议题持续收集中，新增议题直接回复邮件申报即可。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/92014832268?pwd=TEJCWDVVTExodDY1NHZRemJrMFgwQT09",
            //                 "meeting_id": "92014832268",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 141,
            //                 "group_name": "Infrastructure",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "openEuler基础设施双周例会",
            //                 "creator": "georgecao",
            //                 "detail": "openEuler基础设施双周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/99533802195?pwd=S0Z0eUp4MFV2dTRzRFBBeUtiTGdpUT09",
            //                 "meeting_id": "99533802195",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Infrastructure-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 142,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:45",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "openEuler 20.03 LTS SP1系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "支持重大问题解决，遗留问题决策等",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/96774516838?pwd=ajhlUjZFQ0VhSk5UVFdpbjBzZW1MQT09",
            //                 "meeting_id": "96774516838",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-09",
            //         "timeData": [
            //             {
            //                 "id": 135,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "09:30",
            //                 "endTime": "11:00",
            //                 "duration": 2,
            //                 "duration_time": "09:00-11:00",
            //                 "name": "Release SIG 例会",
            //                 "creator": "zyp-rock",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLShu4byH2WM9IaCewXH6jCCF55d7XCUYCfZqutYicwvWEliayttK8SOnfVYhRCKgvIm6DP69rn6yMA/132",
            //                 "join_url": "https://zoom.us/j/94997612639?pwd=MzgrcUExUUxTQ3BoVmJrc003UnFsUT09",
            //                 "meeting_id": "94997612639",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 136,
            //                 "group_name": "sig-QA",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "openEuler社区QA-sig双周会",
            //                 "creator": "charlie_",
            //                 "detail": "遗留问题进展\n版本进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2EXlpc9AJ92BDl86BOCFfz5WEM3RqXVl8ibkQ7nhqSNibcSPia1WH2VD4baJXGNDoYdEGM3JA2XHXg/132",
            //                 "join_url": "https://zoom.us/j/93678159300?pwd=VUVybHNPWXBwc0RndFBsK3JkWmIwQT09",
            //                 "meeting_id": "93678159300",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-QA-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 143,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openeuler安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/97485086908?pwd=TVlCQTJFN01uVHJqSzdkM0J5dlFVdz09",
            //                 "meeting_id": "97485086908",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-10",
            //         "timeData": [
            //             {
            //                 "id": 140,
            //                 "group_name": "sig-ai-bigdata",
            //                 "startTime": "19:00",
            //                 "endTime": "19:30",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-ai-bigdata reguler meeting",
            //                 "creator": "Hubble_Zhu",
            //                 "detail": "1、sig成员前期工作审视\n2、下一步计划与分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ruxj2Ko6lpWVgRTYW2TvugPrTBQPnS111328F2aO3SO6Tsq53DuxCfEcFQJuUL45JxTEXv4GEnNdbkia24yzjWg/132",
            //                 "join_url": "https://zoom.us/j/94081672956?pwd=RUVrZ0NsVUNUREJvUDBXd3NWeWtLQT09",
            //                 "meeting_id": "94081672956",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ai-bigdata-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 147,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "ha测试报告评审",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/92402350960?pwd=emNQamFPdXpOVVdxZ2ltbmZBNlJaQT09",
            //                 "meeting_id": "92402350960",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-11",
            //         "timeData": [
            //             {
            //                 "id": 130,
            //                 "group_name": "Kernel",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "openEuler kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/95008051399?pwd=RVRzNk0zSVUxdmVaaWZjT1d4UEhVQT09",
            //                 "meeting_id": "95008051399",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 148,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "09:30",
            //                 "endTime": "10:30",
            //                 "duration": 2,
            //                 "duration_time": "09:00-11:00",
            //                 "name": "openEuler 20.03 Ltd Sp1 系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "10号延期到11号上午",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/94972330494?pwd=c0VKOXZDSUlCb2p5QzlET29mSVVXUT09",
            //                 "meeting_id": "94972330494",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 149,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "14:30",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "openEuler 20.03 LTS SP1系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/95065436787?pwd=cEhYRHJHOU1hRTE3OEZtYnp3andidz09",
            //                 "meeting_id": "95065436787",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 150,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler 20.03 LTS SP1 系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/99799882877?pwd=MExFMUVrdUhmOThRTHZneW1VNU9Idz09",
            //                 "meeting_id": "99799882877",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-12",
            //         "timeData": [
            //             {
            //                 "id": 139,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder sig例会",
            //                 "creator": "t_feng",
            //                 "detail": "Sig组内工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/97354028776?pwd=RW5hN0RkOFIvM0VVR3UyVUJ1VVZlUT09",
            //                 "meeting_id": "97354028776",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-14",
            //         "timeData": [
            //             {
            //                 "id": 153,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler 20.03 LTS SP1系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/99872442978?pwd=MklqdXNqb0MyWTdHMEROOFVLYjFIQT09",
            //                 "meeting_id": "99872442978",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 158,
            //                 "group_name": "sig-Java",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/91578666541?pwd=ekJjeHM0TE1RQlQ1NUZaTy9jTmNvdz09",
            //                 "meeting_id": "91578666541",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-15",
            //         "timeData": [
            //             {
            //                 "id": 151,
            //                 "group_name": "iSulad",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "container & iSulad SIG 例会",
            //                 "creator": "jingxiaolu",
            //                 "detail": "1、近期信息同步\n\n\n欢迎提交议题~",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJ6vGr1VpUb1icGMBMOsicMGF2w590RJXKdvAYdDuHnu9Yr7Bfm9wQXCxvAF7qYHr5ef3et9VdNfFQ/132",
            //                 "join_url": "https://zoom.us/j/94996668689?pwd=eFJDbTlxL2tsbmJWamhHTURDakJzUT09",
            //                 "meeting_id": "94996668689",
            //                 "etherpad": "https://etherpad.openeuler.org/p/iSulad-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 152,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing 例会",
            //                 "creator": "blue0613",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eovLtFRmict7mrUWRg7ejNiaKjckGXrVjHE8k6uuxZibhapJHPYibGEQWdH28jZs0yB6EdKibZhl1xqj0A/132",
            //                 "join_url": "https://zoom.us/j/94896226567?pwd=dWkzbnJub0MrRUVtOTAvdXhEVVZoQT09",
            //                 "meeting_id": "94896226567",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 154,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 镜像更新和测试情况（SP1）\n2. openEuler 移植到 RK3399 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/94734895363?pwd=SlhVbnZIMXpTTy8rdDFzZzhHeldOZz09",
            //                 "meeting_id": "94734895363",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-16",
            //         "timeData": [
            //             {
            //                 "id": 155,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler 20.03 LTS SP1系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/97394171115?pwd=QklPL3I1M1JaQzd5UVN2U2dYR014QT09",
            //                 "meeting_id": "97394171115",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 160,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openeuler安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "1 漏洞感知工具进展\n2 cvrf漏洞公告介绍\n3 漏洞遗留报备\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/97648141123?pwd=OVNsN0d6VXdWQWZsY3AxNWxMWmlJUT09",
            //                 "meeting_id": "97648141123",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 161,
            //                 "group_name": "Virt",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "virt sig meeting",
            //                 "creator": "zhendongchen",
            //                 "detail": "sp1和21.03进展\neuler robot进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUpvIbIYFyU1E7J7ODWI6rhtvm5CjE4RekpIF7UVicTyH2QWDEaNvoyPfaxCG1LH5ryibNcx22og0w/132",
            //                 "join_url": "https://zoom.us/j/98425078731?pwd=SXptRUZiY2tnWlBpNWVDVEp4d21Odz09",
            //                 "meeting_id": "98425078731",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-17",
            //         "timeData": [
            //             {
            //                 "id": 156,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler 20.03 LTS SP1系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/95004019998?pwd=L0NTZXFhRStQVFJIc0RvQmNPRUQyZz09",
            //                 "meeting_id": "95004019998",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 159,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Gatekeeper双周例会",
            //                 "creator": "miao_kaibo",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJW6PVj7Lvg0S4H9HtE4gmBBfoXia0ZicbrtOFwWRlVEMmFSiaCw8oTnN7zUOG61fTGhWcmVeDefRAgg/132",
            //                 "join_url": "https://zoom.us/j/95338294433?pwd=SzMzeFVrTmhDRkVoc2NjWU1sZVJvZz09",
            //                 "meeting_id": "95338294433",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 162,
            //                 "group_name": "sig-high-performance-network",
            //                 "startTime": "20:00",
            //                 "endTime": "21:00",
            //                 "duration": 1,
            //                 "duration_time": "20:00-21:00",
            //                 "name": "sig-high-performance-network regular meeting",
            //                 "creator": "peanut_huang",
            //                 "detail": "1. sig成员前期工作审视\n2. 下一步计划与分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJfO46cmFZvu1XUSIJTVWuDN3X0PsWOtfsq4rmiadC4DBUlpficDS40Vp5hVQ44ohtcGEAqh1L2Rojg/132",
            //                 "join_url": "https://zoom.us/j/99700036821?pwd=aS9SMEpJbnJQYnJVNThPWjdoc21xdz09",
            //                 "meeting_id": "99700036821",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-high-performance-network-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-18",
            //         "timeData": [
            //             {
            //                 "id": 157,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler 20.03 LTS SP1系统诊断会议",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/98144430781?pwd=TWp4Mzc2Zlc5L0lLNG14SFJQQTdCUT09",
            //                 "meeting_id": "98144430781",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 163,
            //                 "group_name": "sig-Ha",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "sig-HA双周会议",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "1. 前期工作审视\n2. 下一步工作计划和管理安排",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/93885198066?pwd=cG5tUkJSYm5zRnVWOCtSNHkrbVBLUT09",
            //                 "meeting_id": "93885198066",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Ha-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 164,
            //                 "group_name": "sig-Ha",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "sig-HA双周会议",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "1. 前期工作审视\n2. 下一步工作计划和管理安排",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/98502770952?pwd=NWh6dDJ4RVgyMWE2cEhOU2tNUlhCQT09",
            //                 "meeting_id": "98502770952",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Ha-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-21",
            //         "timeData": [
            //             {
            //                 "id": 166,
            //                 "group_name": "sig-Java",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/98359385595?pwd=NHpXYWQ4T2FQYTBBL2tCM1pDUlJPdz09",
            //                 "meeting_id": "98359385595",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-22",
            //         "timeData": [
            //             {
            //                 "id": 165,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "compiler sig双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "已收集议题如下：\n1. SVE工作进展\n2.kae provider实现进展\n3.annotation优化机制\n议题持续收集中，新增议题直接回复邮件申报即可。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/96170472419?pwd=K3o1M2NrR3I0SXM4MG9vR3k1LytKQT09",
            //                 "meeting_id": "96170472419",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-25",
            //         "timeData": [
            //             {
            //                 "id": 167,
            //                 "group_name": "sig-ai-bigdata",
            //                 "startTime": "16:15",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-ai-bigdata annual summary meeting",
            //                 "creator": "Hubble_Zhu",
            //                 "detail": "1. sig-ai-bigdata 2020年成果和实践回顾\n2. openEuler LTS版本选型讨论\n3. 基于openEuler的大数据和AI平台探讨\n4. SIG 技术范围和路标讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ruxj2Ko6lpWVgRTYW2TvugPrTBQPnS111328F2aO3SO6Tsq53DuxCfEcFQJuUL45JxTEXv4GEnNdbkia24yzjWg/132",
            //                 "join_url": "https://zoom.us/j/95246503500?pwd=aUJiV0ZLbmlqajZkNU1EMzBLVFFNQT09",
            //                 "meeting_id": "95246503500",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ai-bigdata-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 168,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler release sig 例会",
            //                 "creator": "yaqiangchen",
            //                 "detail": "议题收集：\n1）openEuler 社区各版本生命周期规划讨论（包括 openEuler 20.03-LTS版本生命周期维护策略、LTS-SPx发布策略）\n2）openEuler 社区合作伙伴侧版本跟",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqLYChgx3cNPBs1dDXiaZIbYhDrTjfo8rWDseTvp04DxjoNEdCpP51dSINBasqViayAcVfARA1Ruvbw/132",
            //                 "join_url": "https://zoom.us/j/93677442580?pwd=U2p5QkRsMDRwb2J6NTdWdDBtWU1Pdz09",
            //                 "meeting_id": "93677442580",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 169,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "14:30",
            //                 "endTime": "15:15",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "Compass-CI开发者友好的测试平台",
            //                 "creator": "baijing",
            //                 "detail": "Compass-CI 开发者友好的测试平台",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhf9NQyvibXhMFKzFgQOib2rg5GUXic8D0WiaAFTAgTLszqxJtEiaARTfOe5kDT0nsWZJ1T7EtWGso30w/132",
            //                 "join_url": "https://zoom.us/j/95689365901?pwd=TnhpbkgvcytKYTJIcDlMYmpWNGU4dz09",
            //                 "meeting_id": "95689365901",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-26",
            //         "timeData": [
            //             {
            //                 "id": 171,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder 例会",
            //                 "creator": "t_feng",
            //                 "detail": "组内工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/92704209831?pwd=cml3d1BBVmx5Y0VDM3AwYXdSbWtvQT09",
            //                 "meeting_id": "92704209831",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-29",
            //         "timeData": [
            //             {
            //                 "id": 172,
            //                 "group_name": "iSulad",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "Container & iSula SIG例会",
            //                 "creator": "jingxiaolu",
            //                 "detail": "1、近期信息同步\n2、镜像仓库信息同步\n\n欢迎上报议题~",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJ6vGr1VpUb1icGMBMOsicMGF2w590RJXKdvAYdDuHnu9Yr7Bfm9wQXCxvAF7qYHr5ef3et9VdNfFQ/132",
            //                 "join_url": "https://zoom.us/j/99612260808?pwd=bldPNnJSQkIrV3QyZGo0QmxEMEVJZz09",
            //                 "meeting_id": "99612260808",
            //                 "etherpad": "https://etherpad.openeuler.org/p/iSulad-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 174,
            //                 "group_name": "sig-Compatibility-Infra",
            //                 "startTime": "15:00",
            //                 "endTime": "17:00",
            //                 "duration": 2,
            //                 "duration_time": "15:00-17:00",
            //                 "name": "南向兼容性双周例会",
            //                 "creator": "cuixucui",
            //                 "detail": "1、兼容性用例引入方案讨论\n主题持续收集中",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/92984213493?pwd=V3BYcFQrQmRCQ2FiWldBcCs5UjIzQT09",
            //                 "meeting_id": "92984213493",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Compatibility-Infra-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-30",
            //         "timeData": [
            //             {
            //                 "id": 175,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/99568856405?pwd=V2dLUmlmeWpFV0Yzdm4rWHJGSXp1QT09",
            //                 "meeting_id": "99568856405",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2020-12-31",
            //         "timeData": [
            //             {
            //                 "id": 170,
            //                 "group_name": "sig-high-performance-network",
            //                 "startTime": "19:00",
            //                 "endTime": "20:45",
            //                 "duration": 2,
            //                 "duration_time": "19:00-21:00",
            //                 "name": "sig-high-performance-network 例会",
            //                 "creator": "MrRlu",
            //                 "detail": "前期工作总结\n后期工作讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYa2dQhybFWq9kjs32ImzU8mWgsFfouF41nDruicwnz0iabiboULgbrjibYHmIia2BWdVxXu7pIXjI1uw/132",
            //                 "join_url": "https://zoom.us/j/94041283864?pwd=YXBPckpISmZ3L0g5bklzRmJqL0diUT09",
            //                 "meeting_id": "94041283864",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-high-performance-network-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 173,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Gatekeeper双周例会",
            //                 "creator": "chong_W",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI0lVtZb7HzKaVYicYM5icgxzs6KZs4Oiaz3LliaxAmiboIq9H4XD0wdZp1JJs2PLrX30IJ7fgRwqm7L5Q/132",
            //                 "join_url": "https://zoom.us/j/96332134367?pwd=WnpXL3hHQVUwdC9aKzhGTHE3ZDNOZz09",
            //                 "meeting_id": "96332134367",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-05",
            //         "timeData": [
            //             {
            //                 "id": 177,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "会议内容：\n1.近期信息同步\n2.kae开发进展\n\n欢迎上报议题！",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/91283497361?pwd=ZnlneGNlN1ZrQ3M5Uk9uTXN2aE5Edz09",
            //                 "meeting_id": "91283497361",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 178,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "Release Management SIG例会",
            //                 "creator": "Ronnie_Jiang",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/hm01iaia6gkKvUYEQhgSnyVYBLg6N978F0SvbvhQiaVp1lFBXdP2W4KzK9PTGIQEibIcTOqFKKia53IICpCjtrrp40w/132",
            //                 "join_url": "https://zoom.us/j/96309142384?pwd=TGFVSmxoelQ3V1FTa0MraHFBWFVDZz09",
            //                 "meeting_id": "96309142384",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 181,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing双周例会",
            //                 "creator": "chenmaodong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://zoom.us/j/98396124623?pwd=dFdmNVVtdDRYdm0zQ3lQSGFvM2RxZz09",
            //                 "meeting_id": "98396124623",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 183,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况（SP1、UKUI/DDE/Xfce）\n2. openEuler 移植到 RK3399 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/98014934633?pwd=OHc1YWRmMXJDclhQdVRnTkI4OU0rQT09",
            //                 "meeting_id": "98014934633",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-06",
            //         "timeData": [
            //             {
            //                 "id": 179,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "14:30",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "Openstack SIG例会",
            //                 "creator": "joec88",
            //                 "detail": "讨论openstack适配工作",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://zoom.us/j/91959828290?pwd=dkZ5ZTlwbGV4NTZlYitLdjYxVm0xUT09",
            //                 "meeting_id": "91959828290",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 182,
            //                 "group_name": "sig-QA",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler社区QA-sig双周会",
            //                 "creator": "charlie_",
            //                 "detail": "1.遗留问题进展\n2.summit议题讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2EXlpc9AJ92BDl86BOCFfz5WEM3RqXVl8ibkQ7nhqSNibcSPia1WH2VD4baJXGNDoYdEGM3JA2XHXg/132",
            //                 "join_url": "https://zoom.us/j/91340097785?pwd=NmttVUljdU5LRStoMmVMbm9PdHZaZz09",
            //                 "meeting_id": "91340097785",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-QA-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 186,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/94931418290?pwd=cVo2Sks1T1c4d3VXdUY3ZWtUajNEUT09",
            //                 "meeting_id": "94931418290",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-07",
            //         "timeData": [
            //             {
            //                 "id": 176,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "14:00",
            //                 "endTime": "17:00",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "兼容性方案讨论",
            //                 "creator": "cuixucui",
            //                 "detail": "1.内核KABI与南向驱动兼容性讨论\n2.软件包兼容性等级与北向应用兼容性讨论\n3.版本间前后兼容策略讨论\n4.oec-hardware工具用例补充方案讨论\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/95362365285?pwd=eHA4S2EyMUNodUVOWHJLdEtvY0Q0dz09",
            //                 "meeting_id": "95362365285",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 185,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "20:30",
            //                 "duration": 3,
            //                 "duration_time": "18:00-21:00",
            //                 "name": "系统启动相关知识",
            //                 "creator": "cuixucui",
            //                 "detail": "主讲人：系统启动相关知识（记得录屏哦）\n会议记录人：卢开毅",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/92182834880?pwd=Rk9sbG9FcHVrdEZVOFFJRFFRQUcxUT09",
            //                 "meeting_id": "92182834880",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-08",
            //         "timeData": [
            //             {
            //                 "id": 180,
            //                 "group_name": "Kernel",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "openEuler kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "1.  openEuler 5.10 内核支持树莓派介绍  -  方亚芬\n\n其他议题欢迎继续申报",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/95058670233?pwd=dUk2WlJ4NWtCTno3c1Z2T2l0azBaZz09",
            //                 "meeting_id": "95058670233",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 184,
            //                 "group_name": "Virt",
            //                 "startTime": "14:30",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt sig meeting",
            //                 "creator": "zhendongchen",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUpvIbIYFyU1E7J7ODWI6rhtvm5CjE4RekpIF7UVicTyH2QWDEaNvoyPfaxCG1LH5ryibNcx22og0w/132",
            //                 "join_url": "https://zoom.us/j/99362542527?pwd=dzU4UFMzaVdyZkg0QTB0Mk5nMjFpUT09",
            //                 "meeting_id": "99362542527",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 188,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "本次sig会议议程：\n1、A-Tune 年度实践回顾以及未来演进路线探讨，汇报人：hanxinke\n1、Wisdom 调度亲和性与映射技术介绍，汇报人：chenmingmin",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/96267522920?pwd=NHUxbkM4OVZlY05LM2JONW9TL1VDQT09",
            //                 "meeting_id": "96267522920",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 189,
            //                 "group_name": "sig-Ha",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "HA sig组双周例会",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "ha项目开源前端开发工作安排",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/95600230732?pwd=TGdEOHBZZVB5anR4bmpCY0xKYVYxZz09",
            //                 "meeting_id": "95600230732",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Ha-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 194,
            //                 "group_name": "sig-Ha",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "HA sig组双周例会",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "ha项目开源前端开发工作安排（因zoom会议冲突推迟）",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/94284760171?pwd=OFdrTHJvRGx6eDJseUR2WFlIYjM3dz09",
            //                 "meeting_id": "94284760171",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Ha-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-09",
            //         "timeData": [
            //             {
            //                 "id": 195,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder例会",
            //                 "creator": "t_feng",
            //                 "detail": "组内工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/94752029305?pwd=aHg2UzM1Y09JNjcyb1ZhRXNlWHMwdz09",
            //                 "meeting_id": "94752029305",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-11",
            //         "timeData": [
            //             {
            //                 "id": 197,
            //                 "group_name": "sig-Java",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-Java工作例会",
            //                 "creator": "rita_dong",
            //                 "detail": "工作例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/91453036527?pwd=S0pkTnJkMk8rL1V6OHlwcFdrVU00dz09",
            //                 "meeting_id": "91453036527",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-12",
            //         "timeData": [
            //             {
            //                 "id": 187,
            //                 "group_name": "doc",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "doc SIG双周例会",
            //                 "creator": "qiaominna",
            //                 "detail": "\n1. openEuler当前文档体系介绍\n2. doc SIG后续计划和重点方向讨论\n3. 如何激励参与社区贡献博客、视频等讨论\n\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/zIw7GFqg2dNpicLpdqyzfibmOKRbY3zrHicwd3PJZUjsXL0yvWjaGib82VXZm59tgKc9kicvmdztfGgMzynBfxTvwcg/132",
            //                 "join_url": "https://zoom.us/j/96572019717?pwd=ZFVPeGs4dU9rdTlZdURqU2lGSWExQT09",
            //                 "meeting_id": "96572019717",
            //                 "etherpad": "https://etherpad.openeuler.org/p/doc-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 196,
            //                 "group_name": "iSulad",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "Container & iSula SIG 例会",
            //                 "creator": "jingxiaolu",
            //                 "detail": "1、近期信息同步\n\n欢迎提交议题~",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJ6vGr1VpUb1icGMBMOsicMGF2w590RJXKdvAYdDuHnu9Yr7Bfm9wQXCxvAF7qYHr5ef3et9VdNfFQ/132",
            //                 "join_url": "https://zoom.us/j/92708639702?pwd=RFRkNFpGYUtvSXJHZVk2VlgvcnZSUT09",
            //                 "meeting_id": "92708639702",
            //                 "etherpad": "https://etherpad.openeuler.org/p/iSulad-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-13",
            //         "timeData": [
            //             {
            //                 "id": 203,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "\n1、漏洞感知工具进展介绍\n2、社区漏洞处理进展介绍\n3、安全委员会运作规则讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/96755448449?pwd=ZjE3bHMrRzlQVVdxK2JkQ0JERW0yZz09",
            //                 "meeting_id": "96755448449",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-14",
            //         "timeData": [
            //             {
            //                 "id": 192,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Gatekeeper双周例会",
            //                 "creator": "liuqi469227928",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/mG8pYHVExwicM3DVEVnZjGeSA8UEviaodWScPz6xqCvj83zS8gFv9UBn097EoR8WZRp1WyzZgzdusyh017jnRWiaQ/132",
            //                 "join_url": "https://zoom.us/j/99280763351?pwd=NUY4a2RNZUdXSUthV1lzTS85aDZVUT09",
            //                 "meeting_id": "99280763351",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 200,
            //                 "group_name": "sig-ai-bigdata",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-ai-bigdata regular meeting",
            //                 "creator": "Hubble_Zhu",
            //                 "detail": "\n1. sig-ai-bigdata 2020年成果和实践回顾\n2. openEuler LTS版本选型讨论\n3. 基于openEuler的大数据和AI平台探讨\n4. SIG 技术范围和路标讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ruxj2Ko6lpWVgRTYW2TvugPrTBQPnS111328F2aO3SO6Tsq53DuxCfEcFQJuUL45JxTEXv4GEnNdbkia24yzjWg/132",
            //                 "join_url": "https://zoom.us/j/94898006833?pwd=eWZHWFkydjBwUkFUR29yek5xYU5oQT09",
            //                 "meeting_id": "94898006833",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ai-bigdata-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 202,
            //                 "group_name": "sig-high-performance-network",
            //                 "startTime": "19:00",
            //                 "endTime": "20:45",
            //                 "duration": 2,
            //                 "duration_time": "19:00-21:00",
            //                 "name": "high-performance-network 例会",
            //                 "creator": "MrRlu",
            //                 "detail": "高性能网络sig例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYa2dQhybFWq9kjs32ImzU8mWgsFfouF41nDruicwnz0iabiboULgbrjibYHmIia2BWdVxXu7pIXjI1uw/132",
            //                 "join_url": "https://zoom.us/j/91509801764?pwd=RzJNZFQwR29OdkFNYW9LcDJOVWp2QT09",
            //                 "meeting_id": "91509801764",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-high-performance-network-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 204,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "版本计划讨论",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/98491699158?pwd=RUt0d2lYbTJucmt6N3NaTEtId2pGdz09",
            //                 "meeting_id": "98491699158",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-18",
            //         "timeData": [
            //             {
            //                 "id": 206,
            //                 "group_name": "sig-ops",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "sig-ops SIG例会-议题收集",
            //                 "creator": "yaqiangchen",
            //                 "detail": "1、openEuler 20.03-LTS-SP/创新版本计划和sig-ops组件集成计划讨论；\n2、A-ops需求进展同步；\n3、NVWA需求进展同步；",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqLYChgx3cNPBs1dDXiaZIbYhDrTjfo8rWDseTvp04DxjoNEdCpP51dSINBasqViayAcVfARA1Ruvbw/132",
            //                 "join_url": "https://zoom.us/j/95086831425?pwd=QWg5OHFwK1ZMSVhnZkxyRFBXVklSUT09",
            //                 "meeting_id": "95086831425",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ops-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-19",
            //         "timeData": [
            //             {
            //                 "id": 205,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "会议内容：\n1. SVE工作进展\n2. KAE Provider开发进展\n\n欢迎上报议题！",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/98947792718?pwd=dTJZUm1mTy91anFZNm1WRXJXb1piQT09",
            //                 "meeting_id": "98947792718",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 208,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing双周例会",
            //                 "creator": "chenmaodong",
            //                 "detail": "1.上周例会遗留问题汇报\n2.鲲鹏支持optee问题讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://zoom.us/j/97808352043?pwd=S1lKK0F2UUlHeUpUaXFrU3gvQnJIUT09",
            //                 "meeting_id": "97808352043",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 210,
            //                 "group_name": "sig-RISC-V",
            //                 "startTime": "15:00",
            //                 "endTime": "16:00",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "RISC-V sig 例会",
            //                 "creator": "whoisxxx",
            //                 "detail": "\n1. RISC-V 进展介绍\n2. 下一阶段定位和路标规划\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erx04wiaNpyDlmls7kU4BoZVYbmAQbHxVQicPSxB7LKCkr3yjCXG5uBYQUiaKMtlIcdVqA4EEIUpk31Q/132",
            //                 "join_url": "https://zoom.us/j/97598507660?pwd=TnNwMTR6L3MxRnF1eVMrbG5uS2VsUT09",
            //                 "meeting_id": "97598507660",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RISC-V-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 212,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况\n2. openEuler 的树莓派镜像添加到树莓派第三方系统镜像列表\n3. openEuler 移植到 RK3399 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/99758060240?pwd=Ty9aeVdkVk1JQ1dwM0ZwZ2ZmYTZ3Zz09",
            //                 "meeting_id": "99758060240",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-20",
            //         "timeData": [
            //             {
            //                 "id": 207,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:30",
            //                 "duration": 3,
            //                 "duration_time": "10:00-13:00",
            //                 "name": "TC例会",
            //                 "creator": "biannm",
            //                 "detail": "TC例会；欢迎大家申报议题，已有议题如下：\n1 .申请sig-compliance\n2.软件包退役规范review\n3.License友好性清单\n4.制品仓门禁License检查改为强管控",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIV3GvJwHUDImtQUib2xiawLyvVibtAHXk4PLXDpumuRDJOtoOsYLgl0s55nu5F40syqlZtgibJQdepuw/132",
            //                 "join_url": "https://zoom.us/j/99214660091?pwd=VHpmY3I3SnF3MGNydjJmZCtoVkFYdz09",
            //                 "meeting_id": "99214660091",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 211,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "yanxiaobing2020",
            //                 "detail": "1.漏洞感知工具进展介绍；\n2.社区漏洞处理进展介绍；\n3.签署CLA的隐私风险审视；",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/GibeAIrANvmegQ3hMzG91xTCneFmWHmfDsxne37VHXokffTsN3nmvZg4Hl96dr0DMxsn2B7Yugic82lW6eicJS8dw/132",
            //                 "join_url": "https://zoom.us/j/91579868100?pwd=eHUzZktKUXgxZ3BVaXhQZENodmYrUT09",
            //                 "meeting_id": "91579868100",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-22",
            //         "timeData": [
            //             {
            //                 "id": 213,
            //                 "group_name": "sig-Ha",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-HA双周例会",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "1. ha-api项目开发进度同步",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/94556026952?pwd=MnljY0tYODhScEVIM1dDZDVydm5CUT09",
            //                 "meeting_id": "94556026952",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Ha-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-23",
            //         "timeData": [
            //             {
            //                 "id": 217,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "oS-Builder sig例会",
            //                 "creator": "t_feng",
            //                 "detail": "组内工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/95197460459?pwd=aVpheXk0ZFhRclhoMzBjZjNwcmh6UT09",
            //                 "meeting_id": "95197460459",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-25",
            //         "timeData": [
            //             {
            //                 "id": 215,
            //                 "group_name": "sig-ops",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "sig-ops例会议题收集",
            //                 "creator": "yaqiangchen",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqLYChgx3cNPBs1dDXiaZIbYhDrTjfo8rWDseTvp04DxjoNEdCpP51dSINBasqViayAcVfARA1Ruvbw/132",
            //                 "join_url": "https://zoom.us/j/96778589371?pwd=MTBMaitPNUxOVUs2NXNXZWdFK3FwZz09",
            //                 "meeting_id": "96778589371",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ops-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 216,
            //                 "group_name": "sig-Compatibility-Infra",
            //                 "startTime": "15:00",
            //                 "endTime": "17:00",
            //                 "duration": 2,
            //                 "duration_time": "15:00-17:00",
            //                 "name": "南向兼容性sig会议",
            //                 "creator": "cuixucui",
            //                 "detail": "南向兼容性sig会议",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://zoom.us/j/99597826231?pwd=ODVIdWVQMllwTTh2dk1aUXRIYkludz09",
            //                 "meeting_id": "99597826231",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Compatibility-Infra-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-26",
            //         "timeData": [
            //             {
            //                 "id": 218,
            //                 "group_name": "doc",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "doc SIG 双周例会",
            //                 "creator": "qiaominna",
            //                 "detail": "\n1. 版本资料进展\n2.社区版本文档维护策略讨论\n3.讨论提升网站客户体验措施\n\n欢迎补充申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/zIw7GFqg2dNpicLpdqyzfibmOKRbY3zrHicwd3PJZUjsXL0yvWjaGib82VXZm59tgKc9kicvmdztfGgMzynBfxTvwcg/132",
            //                 "join_url": "https://zoom.us/j/94853750868?pwd=Z21oaW9kc0ZvVDl4NlZHZUtWV3U4UT09",
            //                 "meeting_id": "94853750868",
            //                 "etherpad": "https://etherpad.openeuler.org/p/doc-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 219,
            //                 "group_name": "Virt",
            //                 "startTime": "14:15",
            //                 "endTime": "15:30",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt sig meeting",
            //                 "creator": "zhendongchen",
            //                 "detail": "openEuler 21.03特性进展\nEulerRobot测试进展\n其他议题欢迎申报",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erUpvIbIYFyU1E7J7ODWI6rhtvm5CjE4RekpIF7UVicTyH2QWDEaNvoyPfaxCG1LH5ryibNcx22og0w/132",
            //                 "join_url": "https://zoom.us/j/99514994334?pwd=N2JGckJYNCtQVjM2d0VETHZsT1hiUT09",
            //                 "meeting_id": "99514994334",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 223,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "17:45",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "SIG-CloudNative",
            //                 "creator": "zklei",
            //                 "detail": "sig-cloudnative开工会和确定性事项",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJUCfWcM6AA8JSlsLZXEZtFtEM2E9ATcOSNm5XA0REYI7grreXzcnbeDpmafXoQENlrEfkJshweIQ/132",
            //                 "join_url": "https://zoom.us/j/93004456815?pwd=dDlpdExQVnFiZ2djaVBQQjFoUThGUT09",
            //                 "meeting_id": "93004456815",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-27",
            //         "timeData": [
            //             {
            //                 "id": 220,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "zhujianwei001",
            //                 "detail": "1. 漏洞感知工具优化进展汇报\n2. 社区漏洞处理进展汇报\n3. 漏洞奖励计划状态更新\n4. 与maintainer交流经验分享",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbgWCULFhKXUcXk1xa3h7GpJ8FSEBfWvdYxfVHMkBEILicxRZ7pTY8bQrPlNBWbBdRqLk3Hlujchw/132",
            //                 "join_url": "https://zoom.us/j/95497252737?pwd=N3pEWmFJYTJ2cGZwcWoxUjdoS1I2dz09",
            //                 "meeting_id": "95497252737",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 224,
            //                 "group_name": "sig-QA",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "QA-sig双周会",
            //                 "creator": "charlie_li",
            //                 "detail": "遗留问题进展\n21.03版本进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2EXlpc9AJ92BDl86BOCFfz5WEM3RqXVl8ibkQ7nhqSNibcSPia1WH2VD4baJXGNDoYdEGM3JA2XHXg/132",
            //                 "join_url": "https://zoom.us/j/93153547541?pwd=Y2NCYkZZd1FmREZBbkJqVTQyU2p3dz09",
            //                 "meeting_id": "93153547541",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-QA-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 227,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "14:30",
            //                 "endTime": "16:30",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "release-sig例会",
            //                 "creator": "yuming_jiang",
            //                 "detail": "openEuler版本节奏与生命周期讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/a1AcG78zPu3UvpicNCcGzXElI893fs48GrKPzPLhpGfqsc7VkLxlgibnAuw0GcRgO5bk5FH1MGA5f5miabibZUtxFg/132",
            //                 "join_url": "https://zoom.us/j/99559469916?pwd=V2E4N281RjFIbGdJSERHR2F1TWJkZz09",
            //                 "meeting_id": "99559469916",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 229,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "20:30",
            //                 "duration": 3,
            //                 "duration_time": "18:00-21:00",
            //                 "name": "Compass-ci平台bisect特性交流会",
            //                 "creator": "baijing",
            //                 "detail": "Compass-ci平台bisect特性交流会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhf9NQyvibXhMFKzFgQOib2rg5GUXic8D0WiaAFTAgTLszqxJtEiaARTfOe5kDT0nsWZJ1T7EtWGso30w/132",
            //                 "join_url": "https://zoom.us/j/92089051944?pwd=YVZoZE9aSkRPcFdQZmY5VnViOXNVZz09",
            //                 "meeting_id": "92089051944",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-29",
            //         "timeData": [
            //             {
            //                 "id": 222,
            //                 "group_name": "Marketing",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Marketing SIG 例会",
            //                 "creator": "ichengxinxin",
            //                 "detail": "分享2021年社区营销计划，对于品牌宣传委员会的一些建议；选举品牌宣传委员会主席",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erDakuFYlbPNgF60mibm1TRNNpmJk1l9hBqsREAcn9xga6f5tWnA8dPFOXlHzxqP2gliaKOMRMiaeZEw/132",
            //                 "join_url": "https://zoom.us/j/94570546525?pwd=dmVmTG1Yb0JZZk5YTHZFZEFyazJTUT09",
            //                 "meeting_id": "94570546525",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Marketing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 228,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:00",
            //                 "endTime": "17:30",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Gatekeeper双周例会",
            //                 "creator": "yaokai13",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erYIlRG0ZZhpfacmVEv5enET8kvKN6ObiaibjE9Feb9gxibpKLGyPyicsdVwn8lhCAbrYlgcJkMLwy0wA/132",
            //                 "join_url": "https://zoom.us/j/93828254242?pwd=ZU05eGpqTG5rQ1U2MnMyVGlhdmVmQT09",
            //                 "meeting_id": "93828254242",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-01-30",
            //         "timeData": [
            //             {
            //                 "id": 237,
            //                 "group_name": "sig-security-facility",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "安全技术例会",
            //                 "creator": "zhujianwei001",
            //                 "detail": "1.openEuler现有安全技术介绍\n2.openEuler密钥证书管理讨论\n3.社区安全技术需求讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbgWCULFhKXUcXk1xa3h7GpJ8FSEBfWvdYxfVHMkBEILicxRZ7pTY8bQrPlNBWbBdRqLk3Hlujchw/132",
            //                 "join_url": "https://zoom.us/j/94742736731?pwd=SnQxNmcxTVRTLzlGVCs5N1c4aUcwUT09",
            //                 "meeting_id": "94742736731",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-security-facility-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-01",
            //         "timeData": [
            //             {
            //                 "id": 238,
            //                 "group_name": "sig-ops",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "sig-ops例会",
            //                 "creator": "yaqiangchen",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqLYChgx3cNPBs1dDXiaZIbYhDrTjfo8rWDseTvp04DxjoNEdCpP51dSINBasqViayAcVfARA1Ruvbw/132",
            //                 "join_url": "https://zoom.us/j/96230471203?pwd=UWk2ZStrelpEbXZWb1RqSSs4WkVoUT09",
            //                 "meeting_id": "96230471203",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ops-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-02",
            //         "timeData": [
            //             {
            //                 "id": 234,
            //                 "group_name": "sig-compliance",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "Compliance-sig双周例会",
            //                 "creator": "king-gao",
            //                 "detail": "常见的40+开源license的解读",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/iap7VwPiaDBwETEmZMhncbyXpp3tzB3Y9ZVly2Lxm1J0l4LlqRrlxYWM0fzU68jFPTEgPfhl5bpDnD4EiaE2rLmdQ/132",
            //                 "join_url": "https://zoom.us/j/97112114181?pwd=cC9hMC9xekd3QkVHOXE0bngxeGZBUT09",
            //                 "meeting_id": "97112114181",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-compliance-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 235,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/99319462897?pwd=Tno3OTZiYkZhMkVrNXNPZ0tGY0FUdz09",
            //                 "meeting_id": "99319462897",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 236,
            //                 "group_name": "Infrastructure",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "Infra基础设施例会",
            //                 "creator": "georgecao",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/97199953715?pwd=TVE4S3piN09WdEQrM1k3cGFrK09OQT09",
            //                 "meeting_id": "97199953715",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Infrastructure-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 242,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-comouting 例会",
            //                 "creator": "chenmaodong",
            //                 "detail": "1.仿真支持说明\n2.secgear版本集成计划说明",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://zoom.us/j/91511952386?pwd=RVpRb080aC8zRyt6ekpwaGt3b0F2Zz09",
            //                 "meeting_id": "91511952386",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 243,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 的树莓派镜像安装 Gnome 桌面环境\n2. 上游树莓派内核代码分支合并到 openEuler 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/95862106602?pwd=MWF2NWVzVExVTnFKcnBLK085RkY2Zz09",
            //                 "meeting_id": "95862106602",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-03",
            //         "timeData": [
            //             {
            //                 "id": 240,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "11:30",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "TC双周会议",
            //                 "creator": "dillon_chen",
            //                 "detail": "双周例会，讨论多版本和license",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmdp01TTUnEtZAHo20plicxIoTr64k3es1w4MKyRDw8H8iaBEMibpOELXZVbGwlXAjCk1BeAhY5RkfQ/132",
            //                 "join_url": "https://zoom.us/j/96182448207?pwd=RWFkNGNyUmhIa2lVeDVhUnEvb25IZz09",
            //                 "meeting_id": "96182448207",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 241,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "gwei3",
            //                 "detail": "1. 漏洞感知工具优化进展汇报\n2. 社区漏洞处理进展汇报",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLqwRD0N1gRquUFAj48915Ox6qa2oaCYF9icZ53KUPxutpuHoCXAwXhEvDHzJ4Hic4icFk8OSUhv4DQg/132",
            //                 "join_url": "https://zoom.us/j/94248704825?pwd=N3VXc0dOYUQxY01yYUNjRlhreGhJQT09",
            //                 "meeting_id": "94248704825",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 244,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "sig openstack 例会",
            //                 "creator": "joec88",
            //                 "detail": "讨论openstack多版本适配议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://zoom.us/j/99984795264?pwd=K2FrQi9ZQlgyd0huMENzcXVJOXlEZz09",
            //                 "meeting_id": "99984795264",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-07",
            //         "timeData": [
            //             {
            //                 "id": 247,
            //                 "group_name": "sig-RISC-V",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "RISC-V SIG 例会",
            //                 "creator": "whoisxxx",
            //                 "detail": "1. 进展介绍：在openEuler RISC-V上运行容器\n2. 技术分享：上交杜东博士分享RISC-V tee技术\n其他议题欢迎提交",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erx04wiaNpyDlmls7kU4BoZVYbmAQbHxVQicPSxB7LKCkr3yjCXG5uBYQUiaKMtlIcdVqA4EEIUpk31Q/132",
            //                 "join_url": "https://zoom.us/j/93852695950?pwd=MnZ1b0tBZ1VNZ1grMTM2NTdsWFFwQT09",
            //                 "meeting_id": "93852695950",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RISC-V-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-09",
            //         "timeData": [
            //             {
            //                 "id": 246,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "sig-cloudnative双周例会",
            //                 "creator": "zklei",
            //                 "detail": "1.遗留问题闭环\n- 基础组件引入进展\n- 容器基础镜像裁剪进展\n- 容器镜像发布件流程打通进展\n2. 下一批开源基础组件选型和社区孵化项目规划\n3. 场景、痛点输入和下一步计划制定\n同时收集其他议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJUCfWcM6AA8JSlsLZXEZtFtEM2E9ATcOSNm5XA0REYI7grreXzcnbeDpmafXoQENlrEfkJshweIQ/132",
            //                 "join_url": "https://zoom.us/j/94155168994?pwd=OXd6dTZJaGQ3azB4SWZ3MlptQk5WZz09",
            //                 "meeting_id": "94155168994",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 248,
            //                 "group_name": "sig-minzuchess",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-minzuchess 9日月例会",
            //                 "creator": "yuandj",
            //                 "detail": "测试交付方案\n石榴派交付方案\n树莓派社区全球漂流计划\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKN9IEzuu5thrgZQtESMoSymtJ0YRlAQg4MLVicF0IFGyKHZkbZJouUYucyjicP1MFHolGUS3MjibFVA/132",
            //                 "join_url": "https://zoom.us/j/93573196027?pwd=NFJEbEhpVW5wYXgzQW1wUFVqYzVWdz09",
            //                 "meeting_id": "93573196027",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-minzuchess-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-19",
            //         "timeData": [
            //             {
            //                 "id": 249,
            //                 "group_name": "Kernel",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "openEuler kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "1.  树莓派补丁合入openEuler 5.10 内核讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/92887086207?pwd=emdmSVVFekh5eXRSczNNTngrcWYzUT09",
            //                 "meeting_id": "92887086207",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-23",
            //         "timeData": [
            //             {
            //                 "id": 252,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "，Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "1. SVE开发进展\n2. KAE Provider开发进展\n3.其他\n欢迎上报议题，新增议题直接回复邮件即可！",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/93092838279?pwd=Ulh0WE5tenFjK0tuQmtDOGM1YVJsdz09",
            //                 "meeting_id": "93092838279",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Qz4y127pc"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-24",
            //         "timeData": [
            //             {
            //                 "id": 250,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员例会",
            //                 "creator": "guoxiaoqi",
            //                 "detail": "1.漏洞感知工具优化进展汇报\n2.社区漏洞处理进展汇报\n3.CVE可视化视图方案讨论\n4.安全委员会准成员以及成员主要工作介绍\n5. SA发布流程",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLAta2U9JU17Xg9hbSUCVPU57Djs4YC3MVAmuh3icIzWicaaTEHKRKJqQ3hAlWibSMwicd0qmKmn46EGQw/132",
            //                 "join_url": "https://zoom.us/j/99498758899?pwd=MklMTCtqbWVUa2thOUZCdldDVXNDUT09",
            //                 "meeting_id": "99498758899",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 251,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "Tc周例会",
            //                 "creator": "hostfj",
            //                 "detail": "技术委员会双周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoW97iaibHC4VtPiaB9Md5KTAvY9l3x4QW4BrVWf2MriceNT9CNygFz6X7UmFchwiawK0J6vlIxUTX1C7w/132",
            //                 "join_url": "https://zoom.us/j/98104018899?pwd=ek0wYStOYWxMbzVRMzQ3UkxyK3pKdz09",
            //                 "meeting_id": "98104018899",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1qV411e7Ry"
            //             },
            //             {
            //                 "id": 257,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:30",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "树莓派进展对齐",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/99585355202?pwd=MWxtOUZINUJDZGVDYXEzd3pZNWFZZz09",
            //                 "meeting_id": "99585355202",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 258,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "20:30",
            //                 "duration": 3,
            //                 "duration_time": "18:00-21:00",
            //                 "name": "bisect 交流会议",
            //                 "creator": "baijing",
            //                 "detail": "bisect 交流会议",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhf9NQyvibXhMFKzFgQOib2rg5GUXic8D0WiaAFTAgTLszqxJtEiaARTfOe5kDT0nsWZJ1T7EtWGso30w/132",
            //                 "join_url": "https://zoom.us/j/91254250349?pwd=QlNnMnhRc0k1KzRPbnFjMDJWY3dRQT09",
            //                 "meeting_id": "91254250349",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-26",
            //         "timeData": [
            //             {
            //                 "id": 253,
            //                 "group_name": "Virt",
            //                 "startTime": "14:00",
            //                 "endTime": "16:30",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "openEuler Virt SIG meeting",
            //                 "creator": "BenchMarkFather",
            //                 "detail": "\n1 固定议题 - openEuler特性开发进展\n2 EulerRobot进展\n3 遗留问题进展更新\n    • CVE修复\n    • issue\n    • 诉求",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epOf1jwGKYolZr4cb66mYJQ3ypQoibnJiaKXk34KiawlWgjJnCSM5crPUUibhbBricdgniaUBzCFc70dnjg/132",
            //                 "join_url": "https://zoom.us/j/93046066479?pwd=NGZmL2RoUENxYVliZnlkazVhZmFjQT09",
            //                 "meeting_id": "93046066479",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 254,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "09:30",
            //                 "endTime": "10:45",
            //                 "duration": 2,
            //                 "duration_time": "09:00-11:00",
            //                 "name": "SIG openstack 例会",
            //                 "creator": "joec88",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://zoom.us/j/91476314130?pwd=ZWdtZUY3V1YreU9qaC8zTlZKUEZhZz09",
            //                 "meeting_id": "91476314130",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 259,
            //                 "group_name": "sig-Ha",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-HA双周例会",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "1. ha-api v1.0版本发布\n2. HA合入openEuler 21.03进度同步",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/92096665546?pwd=N2J6OEZyandDYlJYdjFGUDJjaWpuQT09",
            //                 "meeting_id": "92096665546",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Ha-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 260,
            //                 "group_name": "sig-security-facility",
            //                 "startTime": "14:15",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "安全技术sig例会",
            //                 "creator": "zhujianwei001",
            //                 "detail": "1 安全启动签名进展汇报\n2 secPaver安全策略管理工具介绍\n3 其他安全需求讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbgWCULFhKXUcXk1xa3h7GpJ8FSEBfWvdYxfVHMkBEILicxRZ7pTY8bQrPlNBWbBdRqLk3Hlujchw/132",
            //                 "join_url": "https://zoom.us/j/96493610614?pwd=RzRBclprb01QTVd4dUlDRDFzTThoZz09",
            //                 "meeting_id": "96493610614",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-security-facility-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 263,
            //                 "group_name": "Virt",
            //                 "startTime": "14:30",
            //                 "endTime": "16:30",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "virt SIG 新会议 _ 老会议id冲突",
            //                 "creator": "BenchMarkFather",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epOf1jwGKYolZr4cb66mYJQ3ypQoibnJiaKXk34KiawlWgjJnCSM5crPUUibhbBricdgniaUBzCFc70dnjg/132",
            //                 "join_url": "https://zoom.us/j/98305015347?pwd=K0JPZzdhWE94OFpNNHlKUlhuMitJZz09",
            //                 "meeting_id": "98305015347",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-27",
            //         "timeData": [
            //             {
            //                 "id": 255,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "oS-Builder 例会",
            //                 "creator": "t_feng",
            //                 "detail": "Sig组内工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://zoom.us/j/99262208511?pwd=N29mQ2s3b0lxeEV2OHE4cGpINzBiUT09",
            //                 "meeting_id": "99262208511",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-02-28",
            //         "timeData": [
            //             {
            //                 "id": 264,
            //                 "group_name": "sig-Java",
            //                 "startTime": "11:00",
            //                 "endTime": "12:00",
            //                 "duration": 1,
            //                 "duration_time": "11:00-12:00",
            //                 "name": "Java-sig",
            //                 "creator": "rita_dong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM5eQeBw50EhM2vECNIFPsNhhTI6j9WQYnbkblAMrjbZAlSriaV8raX42U45kcSb3OoMhPftdWCecicw/132",
            //                 "join_url": "https://zoom.us/j/96960946318?pwd=bmQzditGSUdTbnhhTE5lSmoyaHhSUT09",
            //                 "meeting_id": "96960946318",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-01",
            //         "timeData": [
            //             {
            //                 "id": 261,
            //                 "group_name": "sig-ops",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "ops sig例会议题收集",
            //                 "creator": "yaqiangchen",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqLYChgx3cNPBs1dDXiaZIbYhDrTjfo8rWDseTvp04DxjoNEdCpP51dSINBasqViayAcVfARA1Ruvbw/132",
            //                 "join_url": "https://zoom.us/j/96604368201?pwd=alU3TjdXeHYvdk1lM1B2RnpMQWF0QT09",
            //                 "meeting_id": "96604368201",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ops-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-02",
            //         "timeData": [
            //             {
            //                 "id": 256,
            //                 "group_name": "Marketing",
            //                 "startTime": "15:00",
            //                 "endTime": "16:00",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "品牌宣传委员会例会",
            //                 "creator": "ichengxinxin",
            //                 "detail": "讨论3月份品牌宣传委员会工作",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erDakuFYlbPNgF60mibm1TRNNpmJk1l9hBqsREAcn9xga6f5tWnA8dPFOXlHzxqP2gliaKOMRMiaeZEw/132",
            //                 "join_url": "https://zoom.us/j/96941898587?pwd=TEFpZ1dVVzNxcEdWckNFRGR6SkwvZz09",
            //                 "meeting_id": "96941898587",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Marketing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 262,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "[Dev] sig-cloudnative双周例会",
            //                 "creator": "wangwei",
            //                 "detail": "1. 上次例会遗留问题闭环\n - 容器镜像裁剪与embedded SIG的交流\n - 专门为CloudNative开一个仓\n2. 讨论已收集的议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/kTUaeh7XchXDZ8Qc59ZLWf6QAhREE1X0iaEqP0pFGZdnOewAG0ROCAa3icZ1C2zv82stv4GRl74WOdUIkI5Ndk6Q/132",
            //                 "join_url": "https://zoom.us/j/97010387206?pwd=bEZHZlN6YkxhTDlHemxxK0VVWFh0UT09",
            //                 "meeting_id": "97010387206",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 268,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:15",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing",
            //                 "creator": "chenmaodong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://zoom.us/j/93874445293?pwd=SFc3V04vQitWWnMvNkJiMUxvNG1ldz09",
            //                 "meeting_id": "93874445293",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 273,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. 树莓派内核代码合并到 openEuler 21.03 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/91829144593?pwd=RWVLWmRucy9jWGR3U3RZTHVhcWFPUT09",
            //                 "meeting_id": "91829144593",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-03",
            //         "timeData": [
            //             {
            //                 "id": 266,
            //                 "group_name": "sig-compliance",
            //                 "startTime": "15:00",
            //                 "endTime": "17:00",
            //                 "duration": 2,
            //                 "duration_time": "15:00-17:00",
            //                 "name": "Compliance SIG Bi-weekly Meeting",
            //                 "creator": "genedna",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLKrpSbS4Hkukgl2Y1cllR3fhSMchHB8iaomDWV8eK3ENSskiczCxr3UwWTQBiab2b6TKeG9WicVRo7Sg/132",
            //                 "join_url": "https://zoom.us/j/96108390868?pwd=bFEzaHVjNEhsTEdxa2E3ZFdwd3RnUT09",
            //                 "meeting_id": "96108390868",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-compliance-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Ep4y1H7q7"
            //             },
            //             {
            //                 "id": 267,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "release SIG例会",
            //                 "creator": "zyp-rock",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLShu4byH2WM9IaCewXH6jCCF55d7XCUYCfZqutYicwvWEliayttK8SOnfVYhRCKgvIm6DP69rn6yMA/132",
            //                 "join_url": "https://zoom.us/j/99636015091?pwd=Q0VVOWIwaW1LamdLWGtIaVBON3N5QT09",
            //                 "meeting_id": "99636015091",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Vp4y1H7tq"
            //             },
            //             {
            //                 "id": 269,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "yanglijin",
            //                 "detail": "1. 漏洞感知工具优化进展汇报\n2.社区漏洞处理进展汇报",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLFXZEw8WxhxMw5jzPqLl87Asp6J8ppLZYMcmj9eqZstKXzx89Q5icicAK2kiaz1GLcjOiabIVMeVsTOQ/132",
            //                 "join_url": "https://zoom.us/j/97757370441?pwd=VzYvb2NObERRU3RTeEczanFOazdqZz09",
            //                 "meeting_id": "97757370441",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 271,
            //                 "group_name": "sig-QA",
            //                 "startTime": "14:30",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "QA sig",
            //                 "creator": "Kuhnchen18",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkhqVO3TCldYrB0VHvnJX9RCOZypFKzEkUNUHrOz0Mbsj2ejTo8Qk1zTwcdQ0G8nJDg6FmhTOOJg/132",
            //                 "join_url": "https://zoom.us/j/94082275616?pwd=WFdyeVlGdlBldDhXTzhrTXlQcDhvQT09",
            //                 "meeting_id": "94082275616",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-QA-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-05",
            //         "timeData": [
            //             {
            //                 "id": 272,
            //                 "group_name": "Kernel",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "openEuler kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "欢迎申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/99394170993?pwd=Rk4rS3JOc0RaSjhVV21jUldqbW1oUT09",
            //                 "meeting_id": "99394170993",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 274,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "15:00",
            //                 "endTime": "16:00",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-confidential-computing",
            //                 "creator": "chenmaodong",
            //                 "detail": "1.  openEuler 21.03版本集成计划进展\n2. 2021年新特性路标介绍",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://zoom.us/j/96151299922?pwd=UnprSnJYRE1jcklLeHRIb09RMnZFdz09",
            //                 "meeting_id": "96151299922",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-09",
            //         "timeData": [
            //             {
            //                 "id": 275,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "1：SVE开发进展\n2：KAEProvider开发进展\n3：其他\n\n欢迎上报议题，新增议题直接回复邮件即可！",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/97379323950?pwd=RUljWFdkVzBicUVHcm9qcW14UzYwUT09",
            //                 "meeting_id": "97379323950",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Hb4y1979g"
            //             },
            //             {
            //                 "id": 276,
            //                 "group_name": "sig-DDE",
            //                 "startTime": "11:00",
            //                 "endTime": "12:00",
            //                 "duration": 1,
            //                 "duration_time": "11:00-12:00",
            //                 "name": "sig-DDE例会",
            //                 "creator": "weidongkl",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM7fMjcGro78opZfjLjicD4Ft1NdT0m1KUNtvkJRfQQ29yxaMnGGtNKOiaeRn3XXFjvbWJicrx7FI2qAQ/132",
            //                 "join_url": "https://zoom.us/j/92902427792?pwd=RzRZaHBUSCthR3VrOFp1NkFpY0RmQT09",
            //                 "meeting_id": "92902427792",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-DDE-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 277,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "14:30",
            //                 "endTime": "16:30",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "app stream方案交流",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/97994795832?pwd=aGRwUVcrOS96RkliZTEwcHluOUUyUT09",
            //                 "meeting_id": "97994795832",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-10",
            //         "timeData": [
            //             {
            //                 "id": 281,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "TC双周例会",
            //                 "creator": "hostfj",
            //                 "detail": "TC双周例会，共8个议题，1个遗留问题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eoW97iaibHC4VtPiaB9Md5KTAvY9l3x4QW4BrVWf2MriceNT9CNygFz6X7UmFchwiawK0J6vlIxUTX1C7w/132",
            //                 "join_url": "https://zoom.us/j/97614077713?pwd=ZllJcXBWZDN6blc1MDJTYmxKbExaZz09",
            //                 "meeting_id": "97614077713",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 282,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "17:15",
            //                 "endTime": "18:15",
            //                 "duration": 2,
            //                 "duration_time": "17:00-19:00",
            //                 "name": "openEuler21.03系统诊断会议",
            //                 "creator": "xxiaosong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eph7FxAB48zalyYlaPUY5VkhXLCJ73TJw7A3flia3q3tp1jnfKDaTrtjMuItC8aQrGNicoibwXy0E5Qw/132",
            //                 "join_url": "https://zoom.us/j/95500989253?pwd=dUpkUW85dUZsQ2hPNmhreWx5SlVwZz09",
            //                 "meeting_id": "95500989253",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": "https://www.bilibili.com/BV18N411Q7Yf"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-11",
            //         "timeData": [
            //             {
            //                 "id": 279,
            //                 "group_name": "sig-bio",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "BIO-SIG 第一次例会",
            //                 "creator": "zhouzhongyuan1",
            //                 "detail": "Sig 组成立，2021年工作规划和进展同步，SIG组运作模式讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/D8zDu2Md8Z0DLA8enYiaIoDo6akCicb2F8Z2PhEiaDKZeDjAmoS6qevw85MAWU7lhGytZ6ocdn0icTCGl9dVAXU1lQ/132",
            //                 "join_url": "https://zoom.us/j/94506876048?pwd=elZ4ZlphdkNhYjUwVTVXZE9uQjY2QT09",
            //                 "meeting_id": "94506876048",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-bio-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 283,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "openEuler21.03系统诊断会",
            //                 "creator": "xxiaosong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eph7FxAB48zalyYlaPUY5VkhXLCJ73TJw7A3flia3q3tp1jnfKDaTrtjMuItC8aQrGNicoibwXy0E5Qw/132",
            //                 "join_url": "https://zoom.us/j/95960590405?pwd=Ty9WcUZwK3pwYlNwb1RJSS9OS3YvUT09",
            //                 "meeting_id": "95960590405",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": "https://www.bilibili.com/BV17N411Q7XX"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-12",
            //         "timeData": [
            //             {
            //                 "id": 280,
            //                 "group_name": "Virt",
            //                 "startTime": "14:00",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "openEuler virt sig组例会",
            //                 "creator": "BenchMarkFather",
            //                 "detail": "欢迎大家申报议题\n\n当前已有议题\n1 openEuler 特性开发与测试进展\n2 stratovirt 轻量级虚拟化特性演示与分享\n3 虚拟化spec文件对比策略\n4 issue模板讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epOf1jwGKYolZr4cb66mYJQ3ypQoibnJiaKXk34KiawlWgjJnCSM5crPUUibhbBricdgniaUBzCFc70dnjg/132",
            //                 "join_url": "https://zoom.us/j/91572838806?pwd=Y3VPQkZnRGJ4ajNZTkw5L3ZpMU5oQT09",
            //                 "meeting_id": "91572838806",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 284,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "1、A-Tune 新一年开发路标梳理\n2、业界调优技术调研与分享",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/99594812311?pwd=Y2FMUURZdHFRTVI4OFdWV2Fpa1RmQT09",
            //                 "meeting_id": "99594812311",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1oi4y1N79g"
            //             },
            //             {
            //                 "id": 285,
            //                 "group_name": "sig-Ha",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-HA双周例会",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "1. 社区新成员加入，Maintainer人员需要变更；\n2. HA SIG的 RoadMap 的细化",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/94192593239?pwd=dmxzV015VlVidDIrejlKV01lY1NuQT09",
            //                 "meeting_id": "94192593239",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Ha-meetings",
            //                 "video_url": "https://www.bilibili.com/BV12z4y117Zf"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-15",
            //         "timeData": [
            //             {
            //                 "id": 286,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "openEuler21.03系统诊断会",
            //                 "creator": "xxiaosong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eph7FxAB48zalyYlaPUY5VkhXLCJ73TJw7A3flia3q3tp1jnfKDaTrtjMuItC8aQrGNicoibwXy0E5Qw/132",
            //                 "join_url": "https://zoom.us/j/98047435816?pwd=Znd3djVJK0VJQUh5bk8xM1ZNNGoxUT09",
            //                 "meeting_id": "98047435816",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-16",
            //         "timeData": [
            //             {
            //                 "id": 287,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "CloudNative SIG双周例会",
            //                 "creator": "zklei",
            //                 "detail": "1.例行过进展\n2.安装部署工具规划和介绍",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJUCfWcM6AA8JSlsLZXEZtFtEM2E9ATcOSNm5XA0REYI7grreXzcnbeDpmafXoQENlrEfkJshweIQ/132",
            //                 "join_url": "https://zoom.us/j/99563455187?pwd=d0lQTUlwN2pKOFdDS3ByaVo5RDJCQT09",
            //                 "meeting_id": "99563455187",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 291,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "15:00",
            //                 "endTime": "15:30",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况\n2. openEuler 树莓派镜像添加中文输入法和 Xfce 桌面环境",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://zoom.us/j/94481446461?pwd=UndNUnkwYU9aS2ticXZ6UW1YK09WZz09",
            //                 "meeting_id": "94481446461",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-17",
            //         "timeData": [
            //             {
            //                 "id": 288,
            //                 "group_name": "sig-compliance",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "合规组例会",
            //                 "creator": "stonefly",
            //                 "detail": "合规组例会，议题征集。欢迎大家申报。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM6380QjzwemYMktKJQGR8Wyz8BbeGzxwCed2waKY1WlLDWx3fKtwRFEHiaNYtYgkNxmO82QQMSyJDA/132",
            //                 "join_url": "https://zoom.us/j/91938142029?pwd=czJ2amJFODFSOWFwSTkzdkxnZERTZz09",
            //                 "meeting_id": "91938142029",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-compliance-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 289,
            //                 "group_name": "Marketing",
            //                 "startTime": "15:00",
            //                 "endTime": "16:00",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "品牌宣传委员会会议",
            //                 "creator": "ichengxinxin",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erDakuFYlbPNgF60mibm1TRNNpmJk1l9hBqsREAcn9xga6f5tWnA8dPFOXlHzxqP2gliaKOMRMiaeZEw/132",
            //                 "join_url": "https://zoom.us/j/92681456645?pwd=bTBnUzBJUmpZUDRXb1VMa2NIbTNtZz09",
            //                 "meeting_id": "92681456645",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Marketing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 290,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openeuler安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "\n1. 漏洞感知工具进展介绍\n2. 社区漏洞处理进展介绍",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://zoom.us/j/93616254724?pwd=cGZwU3VPT1plVG5OT0ZnY3ZUWGpjQT09",
            //                 "meeting_id": "93616254724",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Zh411Q7Ho"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-18",
            //         "timeData": [
            //             {
            //                 "id": 293,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "14:15",
            //                 "endTime": "16:15",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "openEuler release conference",
            //                 "creator": "solarhu",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/91337175265?pwd=REkwYTZsamJkSXNrK0RCdXhVQUJ4Zz09",
            //                 "meeting_id": "91337175265",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": "https://www.bilibili.com/BV17f4y1t7bu"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-19",
            //         "timeData": [
            //             {
            //                 "id": 294,
            //                 "group_name": "Kernel",
            //                 "startTime": "14:00",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "openEuler kernel sig meeting",
            //                 "creator": "xiexiuqi",
            //                 "detail": "1）kdump 技术分享： 基本原理、使用及案例\n\n欢迎继续申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ5EibtZGtA6ias0J4ROSbyaSwtdMfibeWSfEYg4DGtsibiam98V15BKdp2svdria3ibtk8tIj1nWR4gxBCg/132",
            //                 "join_url": "https://zoom.us/j/93203875140?pwd=d01DUUZrQ1lKV3Q3V3hMN0NnVFFqZz09",
            //                 "meeting_id": "93203875140",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Kernel-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1TX4y1G7Yc"
            //             },
            //             {
            //                 "id": 295,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "openEuler21.03系统诊断会",
            //                 "creator": "xxiaosong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eph7FxAB48zalyYlaPUY5VkhXLCJ73TJw7A3flia3q3tp1jnfKDaTrtjMuItC8aQrGNicoibwXy0E5Qw/132",
            //                 "join_url": "https://zoom.us/j/98565944712?pwd=WXRWSkVVVXVqRFJOVnpZOWc0cmNIZz09",
            //                 "meeting_id": "98565944712",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 296,
            //                 "group_name": "sig-security-facility",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "安全技术sig组例会",
            //                 "creator": "zhujianwei001",
            //                 "detail": "遗留问题对齐\nopenscap安全配置基线讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbgWCULFhKXUcXk1xa3h7GpJ8FSEBfWvdYxfVHMkBEILicxRZ7pTY8bQrPlNBWbBdRqLk3Hlujchw/132",
            //                 "join_url": "https://zoom.us/j/98746500573?pwd=WE1xSUEyUFdvaHpuZzFmc2JzV0NpQT09",
            //                 "meeting_id": "98746500573",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-security-facility-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-23",
            //         "timeData": [
            //             {
            //                 "id": 297,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "1:SVE开发进展\n2:KAEProvider开发进展\n3:版本发布\n欢迎上报议题。新增议题直接回复邮件即可！",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/99363855954?pwd=Qm9pZ2VqcllWSnI5R1daUlVCL3NHdz09",
            //                 "meeting_id": "99363855954",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1964y1U7pY"
            //             },
            //             {
            //                 "id": 298,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing双周例会",
            //                 "creator": "chenmaodong",
            //                 "detail": "1、21.03版本集成secgear进度及特性介绍\n2、兰州大学团队基于机密计算的项目研究介绍",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://zoom.us/j/98670858010?pwd=QTBraTUzd2NkaDRGbXJpeEpJbGZYUT09",
            //                 "meeting_id": "98670858010",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": "https://www.bilibili.com/BV15Z4y1A7T4"
            //             },
            //             {
            //                 "id": 299,
            //                 "group_name": "Infrastructure",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "Infra-Sig双周例会",
            //                 "creator": "georgecao",
            //                 "detail": "1. openEuler 构建系统容器化方案可行性讨论\n2. 用户账号系统开发方案讨论\n3.小程序开发进展\n4. ……",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/t8kyYPfdmuN6vn6TovLAT5ZyUSv6IHvraUSF6ajtXFCByO5AyueajfWGl8Xxj0qFIRv7aTdFjHat2TPZ5Oibv5Q/132",
            //                 "join_url": "https://zoom.us/j/94478780919?pwd=SGhRQnExNmZXV3luVkFjVGhwL2IvUT09",
            //                 "meeting_id": "94478780919",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Infrastructure-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Bh411S7ZU"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-24",
            //         "timeData": [
            //             {
            //                 "id": 300,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "openEuler社区双周例会",
            //                 "creator": "hjimmy",
            //                 "detail": "openEuler社区两周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKkNe9F8w96ibUPxicIO9BmZfZZjyzmahoXoYfojKpWNxEmyp99zE9JHZlibCFekS1IibPn61ibtUEq4Ng/132",
            //                 "join_url": "https://zoom.us/j/96288794370?pwd=YWczUjNwRXNiL1pyL0hVWW9EQVhFUT09",
            //                 "meeting_id": "96288794370",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1wZ4y1A7qQ"
            //             },
            //             {
            //                 "id": 301,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler安全委员会例会",
            //                 "creator": "yanxiaobing2020",
            //                 "detail": "1. 漏洞感知优化进展；\n2.社区漏洞处理进展；\n\n有其它议题，欢迎申报。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/GibeAIrANvmegQ3hMzG91xTCneFmWHmfDsxne37VHXokffTsN3nmvZg4Hl96dr0DMxsn2B7Yugic82lW6eicJS8dw/132",
            //                 "join_url": "https://zoom.us/j/98230650603?pwd=cGNOZ3hwSzNoTWZCV3VYZ3RmL3A3UT09",
            //                 "meeting_id": "98230650603",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 304,
            //                 "group_name": "sig-QA",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "QA-sig双周例会",
            //                 "creator": "charlie_li",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2EXlpc9AJ92BDl86BOCFfz5WEM3RqXVl8ibkQ7nhqSNibcSPia1WH2VD4baJXGNDoYdEGM3JA2XHXg/132",
            //                 "join_url": "https://zoom.us/j/98747590823?pwd=QnZNeXdqdEgrUnYyOFNUaWRLb2N5Zz09",
            //                 "meeting_id": "98747590823",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-QA-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1yU4y1a7Le"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-25",
            //         "timeData": [
            //             {
            //                 "id": 302,
            //                 "group_name": "sig-ai-bigdata",
            //                 "startTime": "19:00",
            //                 "endTime": "20:00",
            //                 "duration": 1,
            //                 "duration_time": "19:00-20:00",
            //                 "name": "sig-ai-bigdata regular meeting",
            //                 "creator": "Hubble_Zhu",
            //                 "detail": "1、sig相关软件包引入进展\n2、下一步分工与计划\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ruxj2Ko6lpWVgRTYW2TvugPrTBQPnS111328F2aO3SO6Tsq53DuxCfEcFQJuUL45JxTEXv4GEnNdbkia24yzjWg/132",
            //                 "join_url": "https://zoom.us/j/99124965310?pwd=eVV5SFk2QWJnT3JpUE5FQ05oNUhudz09",
            //                 "meeting_id": "99124965310",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-ai-bigdata-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 303,
            //                 "group_name": "sig-bio",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-BIO双周例会",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "sig-BIO双周例会，欢迎申报议题。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://zoom.us/j/97645198641?pwd=K01IUDBrSEpTNVZoMzVVZUQzVk1BQT09",
            //                 "meeting_id": "97645198641",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-bio-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1GZ4y1A7gN"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-26",
            //         "timeData": [
            //             {
            //                 "id": 306,
            //                 "group_name": "Virt",
            //                 "startTime": "14:00",
            //                 "endTime": "16:30",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "virt sig例会0326",
            //                 "creator": "BenchMarkFather",
            //                 "detail": "版本开发与验证进展/qemu热补丁/stratovirt 21.03演示/ovmf讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epOf1jwGKYolZr4cb66mYJQ3ypQoibnJiaKXk34KiawlWgjJnCSM5crPUUibhbBricdgniaUBzCFc70dnjg/132",
            //                 "join_url": "https://zoom.us/j/96702053645?pwd=cGxwVGIzUEZINlBUeGUya2M1NEJLUT09",
            //                 "meeting_id": "96702053645",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": "https://www.bilibili.com/BV125411w7Wx"
            //             },
            //             {
            //                 "id": 307,
            //                 "group_name": "A-Tune",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "A-Tune sig meeting",
            //                 "creator": "hanxinke",
            //                 "detail": "1、2021年社区比赛信息与A-Tune课题介绍\n2、业界性能调优论文分享",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIvc0wApgEPKU0lgmQc1c97osyiaib1rxlzg0b6jpNCYibvwUzWibGOpXqen3r08SB7qpvpkiaTu5LzU5w/132",
            //                 "join_url": "https://zoom.us/j/98151178845?pwd=TTFUR0c3UjNrUUh0ZW0vbU9DL0pTdz09",
            //                 "meeting_id": "98151178845",
            //                 "etherpad": "https://etherpad.openeuler.org/p/A-Tune-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1TK411w7aj"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-30",
            //         "timeData": [
            //             {
            //                 "id": 305,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "CloudNative SIG 双周例会",
            //                 "creator": "jianminw",
            //                 "detail": "\n1. Ceph存储等相关镜像推动进展\n2. 更多议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q3auHgzwzM73Bv2AnZ7FJrqibmVWByVq2ljSCwJUyhcFQCD3AZ2mdNTxuWtDCjQib4sy0Q2Atbjnrx2lemjT7vxQ/132",
            //                 "join_url": "https://zoom.us/j/93306108174?pwd=blgvazNYcEdpNmUyRjRoYWx6YVo1dz09",
            //                 "meeting_id": "93306108174",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1vb4y1Q7hL"
            //             },
            //             {
            //                 "id": 308,
            //                 "group_name": "sig-compliance",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "sig-compilance 双周例会",
            //                 "creator": "yanxiaobing2020",
            //                 "detail": "\n1.合规检查插件，软件成分分析代码仓申请；\n\n欢迎申报其它议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/GibeAIrANvmegQ3hMzG91xTCneFmWHmfDsxne37VHXokffTsN3nmvZg4Hl96dr0DMxsn2B7Yugic82lW6eicJS8dw/132",
            //                 "join_url": "https://zoom.us/j/95298427201?pwd=QmVmeXdMdWtmaklOMWg5TGlOa3hvUT09",
            //                 "meeting_id": "95298427201",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-compliance-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-03-31",
            //         "timeData": [
            //             {
            //                 "id": 309,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "10:00",
            //                 "endTime": "11:30",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "release sig例会",
            //                 "creator": "yaqiangchen",
            //                 "detail": "release sig例会，议题持续收集中",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqLYChgx3cNPBs1dDXiaZIbYhDrTjfo8rWDseTvp04DxjoNEdCpP51dSINBasqViayAcVfARA1Ruvbw/132",
            //                 "join_url": "https://zoom.us/j/97352170621?pwd=YWpPdTZqcyt4ZHc2TnIvTnhwTWtJdz09",
            //                 "meeting_id": "97352170621",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-01",
            //         "timeData": [
            //             {
            //                 "id": 310,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "19:30",
            //                 "duration": 2,
            //                 "duration_time": "18:00-20:00",
            //                 "name": "sparrow流程分析/os_mount与rootfs讲解",
            //                 "creator": "baijing",
            //                 "detail": "1.sparrow流程分析和本地部署\n2.os_mount与rootfs讲解",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhf9NQyvibXhMFKzFgQOib2rg5GUXic8D0WiaAFTAgTLszqxJtEiaARTfOe5kDT0nsWZJ1T7EtWGso30w/132",
            //                 "join_url": "https://zoom.us/j/91461131343?pwd=NlZOOVVYVFFqQm5vSkROczlpRjZlQT09",
            //                 "meeting_id": "91461131343",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": "https://www.bilibili.com/BV19U4y1872s"
            //             },
            //             {
            //                 "id": 311,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "19:00",
            //                 "endTime": "20:30",
            //                 "duration": 2,
            //                 "duration_time": "19:00-21:00",
            //                 "name": "openEuler 21.03创新版本发布评审",
            //                 "creator": "solarhu",
            //                 "detail": "评审openeuler 版本发布21.03",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83er6SbxMkBeOrUHfLf9tUktueOULhWJXzBIlRgJOPgqtRSia1wPoSGXoB5PxDxuVbIciabnzAb74wh7w/132",
            //                 "join_url": "https://zoom.us/j/92011262514?pwd=VXFzbC85QkIxY0dSRUdvSnhKQ2h0UT09",
            //                 "meeting_id": "92011262514",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1hA41157QF"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-03",
            //         "timeData": [
            //             {
            //                 "id": 314,
            //                 "group_name": "sig-Java",
            //                 "startTime": "19:30",
            //                 "endTime": "21:00",
            //                 "duration": 2,
            //                 "duration_time": "19:00-21:00",
            //                 "name": "maven仓库项目",
            //                 "creator": "luo-haibo",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/PiajxSqBRaEICzG9pHJoV0Zwf6n9ibBw5V4OkHLGSm47Jlvy9rcpjc3ezzCicCVaHZricpiajEL3UBu5Nb5uVygMSgg/132",
            //                 "join_url": "https://us06web.zoom.us/j/84510102342?pwd=TWpzWURGd2NLSzNSME9XMDcvd3JiUT09",
            //                 "meeting_id": "84510102342",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Java-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-06",
            //         "timeData": [
            //             {
            //                 "id": 312,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "已有议题如下：\n1：3.30版本新特性介绍  （贺东博）\n\n欢迎申报议题，新增议题回复邮件即可",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://zoom.us/j/96323013752?pwd=K2hEQ0ZwZ0gwWGc4S2VDdG1ndXBhZz09",
            //                 "meeting_id": "96323013752",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1bB4y1w7NP"
            //             },
            //             {
            //                 "id": 313,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "云原生专题分享：WebAssembly 在云原生领域的应用",
            //                 "creator": "jingxiaolu",
            //                 "detail": "本场专题分享「WebAssembly 在云原生领域的应用」由我们Cloud Native SIG的合作伙伴、Second State的Michael Yuan老师给我们带来。欢迎大家参与交流~",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erJ6vGr1VpUb1icGMBMOsicMGF2w590RJXKdvAYdDuHnu9Yr7Bfm9wQXCxvAF7qYHr5ef3et9VdNfFQ/132",
            //                 "join_url": "https://zoom.us/j/94336690367?pwd=VFlqM2YrNDdlS2xmRkxMS01yZHhUUT09",
            //                 "meeting_id": "94336690367",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": null
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-07",
            //         "timeData": [
            //             {
            //                 "id": 315,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "TC 例会",
            //                 "creator": "Shinwell_hu",
            //                 "detail": "技术委员会例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI4Tosj3tAYvfwqb5mbqmb5OVtOExb33uoiaDQnfbAVWzNzjRvxp8VtT2hID3ib7zscZibh8EAR11I4Q/132",
            //                 "join_url": "https://us06web.zoom.us/j/81039466641?pwd=a2haTFFoRmhqL2c1NGdJV2dZdHUrdz09",
            //                 "meeting_id": "81039466641",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1rf4y1W7si"
            //             },
            //             {
            //                 "id": 316,
            //                 "group_name": "Marketing",
            //                 "startTime": "15:00",
            //                 "endTime": "17:00",
            //                 "duration": 2,
            //                 "duration_time": "15:00-17:00",
            //                 "name": "品牌宣传委员会例会",
            //                 "creator": "ichengxinxin",
            //                 "detail": "欢迎申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erDakuFYlbPNgF60mibm1TRNNpmJk1l9hBqsREAcn9xga6f5tWnA8dPFOXlHzxqP2gliaKOMRMiaeZEw/132",
            //                 "join_url": "https://us06web.zoom.us/j/89508387515?pwd=dFZRdURyNlpzQ2VRZlhnR0xNNGJCUT09",
            //                 "meeting_id": "89508387515",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Marketing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 319,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "社区安全sig例会",
            //                 "creator": "zhujianwei001",
            //                 "detail": "\n1.遗漏问题进展汇报\n2.漏洞感知工具进展\n3.社区漏洞处理进展\n4.tpm2-tss软件包升级变更讨论\n5.麒麟社区版安全工具框架介绍\n6.安全配置基线工作分工",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLbgWCULFhKXUcXk1xa3h7GpJ8FSEBfWvdYxfVHMkBEILicxRZ7pTY8bQrPlNBWbBdRqLk3Hlujchw/132",
            //                 "join_url": "https://us06web.zoom.us/j/86278251566?pwd=dlNpZWNXalhjSFZSNVVtengwUHZCQT09",
            //                 "meeting_id": "86278251566",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 323,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "20:00",
            //                 "endTime": "20:30",
            //                 "duration": 1,
            //                 "duration_time": "20:00-21:00",
            //                 "name": "RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况\n2. openEuler 树莓派镜像添加中文输入法和 Xfce 桌面环境\n3. raspi-config 移植到 openEuler",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/88324566338?pwd=bTZrZFF0SUR2Z1RiZExDc1I3TElCQT09",
            //                 "meeting_id": "88324566338",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-08",
            //         "timeData": [
            //             {
            //                 "id": 317,
            //                 "group_name": "sig-bio",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-bio双周例会",
            //                 "creator": "reganhe_",
            //                 "detail": "sig-bio双周例会，欢迎申报议题。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKadlFX8zq3ktXVfjN3Tqe4KDWenoEAiacXpqF6b8E6tic9hibBIXeeSxsweCMfF0pNGA26pJ2XWlrVg/132",
            //                 "join_url": "https://us06web.zoom.us/j/81442755975?pwd=M0RUVnY0ZEVZK0UyMGw0R3lRYTRQQT09",
            //                 "meeting_id": "81442755975",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-bio-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Pb4y1D7dK"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-09",
            //         "timeData": [
            //             {
            //                 "id": 322,
            //                 "group_name": "Virt",
            //                 "startTime": "14:00",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt sig例会0409",
            //                 "creator": "Kuhnchen18",
            //                 "detail": "\n1、虚拟机可信启动特性分享\n2、sp2版本计划合入主要特性信息同步\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkhqVO3TCldYrB0VHvnJX9RCOZypFKzEkUNUHrOz0Mbsj2ejTo8Qk1zTwcdQ0G8nJDg6FmhTOOJg/132",
            //                 "join_url": "https://us06web.zoom.us/j/87602251116?pwd=Zit4WTJJRjU0T2RQK0g3M1ZHS2xnQT09",
            //                 "meeting_id": "87602251116",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": "https://www.bilibili.com/BV13f4y1s7Y5"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-13",
            //         "timeData": [
            //             {
            //                 "id": 320,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "CloudNative SIG 双周例会",
            //                 "creator": "pixiake",
            //                 "detail": "CloudNative SIG 双周例会，欢迎申报议题。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKXgcsLsqQU2QlyYmcicyqGZh69vXFlw0XknesCnB2V7mvQXJ16DLI66Hz1qFz6iap9iaICCRDhqt4SA/132",
            //                 "join_url": "https://us06web.zoom.us/j/88934816084?pwd=U1ZVL1dLR3NnMHBhaFBLZkYzZFZyUT09",
            //                 "meeting_id": "88934816084",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1RA41157f3"
            //             },
            //             {
            //                 "id": 324,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing双周例会",
            //                 "creator": "chenmaodong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://us06web.zoom.us/j/83699965636?pwd=VERDaTZkZFI0TDh3b2VjMjA0a1JSdz09",
            //                 "meeting_id": "83699965636",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1D64y1S7pR"
            //             },
            //             {
            //                 "id": 325,
            //                 "group_name": "sig-compliance",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-Compliance双周会",
            //                 "creator": "bugflyfly",
            //                 "detail": "通报SIG组工作进展、讨论后续工作；欢迎申报其它议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLjylWyU6THOwApgb9kO3vZ4Wc2oAzeTlEZQeiakyhJ39Pia98d6Y2S75PW1HwQbZ9h0ndVJBsB8Org/132",
            //                 "join_url": "https://us06web.zoom.us/j/83807887811?pwd=WTFWWjQ5ZGh6QXY1TjVkTHlHQVpNdz09",
            //                 "meeting_id": "83807887811",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-compliance-meetings",
            //                 "video_url": "https://www.bilibili.com/BV15V411H774"
            //             },
            //             {
            //                 "id": 327,
            //                 "group_name": "DB",
            //                 "startTime": "17:00",
            //                 "endTime": "17:30",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "DB SIG Bi-weekly meeting",
            //                 "creator": "bzhaoop",
            //                 "detail": "The first meeting of DB SIG.",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKFdFDCa2UHWrCibQy6yxTviaPq4OBe9N5K9xbxbIknjqYGAAvXCZ1JrYl51QHndJ6vbqsv1d0KR0uQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/87153857593?pwd=eXpmQ3BQa09ROWhseTRnQzQvelZLZz09",
            //                 "meeting_id": "87153857593",
            //                 "etherpad": "https://etherpad.openeuler.org/p/DB-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-14",
            //         "timeData": [
            //             {
            //                 "id": 326,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "15:00",
            //                 "endTime": "16:00",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "OpenStack SIG 例会",
            //                 "creator": "joec88",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://us06web.zoom.us/j/88437091814?pwd=SVJNdkoxOXJwUjhmNTdDbTh2OHBGdz09",
            //                 "meeting_id": "88437091814",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 328,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "sig-release-management 例会",
            //                 "creator": "Ronnie_Jiang",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/hm01iaia6gkKvUYEQhgSnyVYBLg6N978F0SvbvhQiaVp1lFBXdP2W4KzK9PTGIQEibIcTOqFKKia53IICpCjtrrp40w/132",
            //                 "join_url": "https://us06web.zoom.us/j/86389194548?pwd=NGNIZTZzcnZwQjkraEZYVlVvcXVjdz09",
            //                 "meeting_id": "86389194548",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-15",
            //         "timeData": [
            //             {
            //                 "id": 331,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "双周例会",
            //                 "creator": "gaohechao",
            //                 "detail": "双周例会",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJ2nslShe7r4eXgCrtKRmmN3owPb668v2dHg7HS3c7pG4qthA1Y9mCHqx8vicZoAxyd8qqrtHoia4cA/132",
            //                 "join_url": "https://us06web.zoom.us/j/88530201024?pwd=TjM1eVZ5SDhUTVhmdlVENGpBNG0vdz09",
            //                 "meeting_id": "88530201024",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 332,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "19:30",
            //                 "duration": 2,
            //                 "duration_time": "18:00-20:00",
            //                 "name": "kibana的日志查看/生命周期管理",
            //                 "creator": "baijing",
            //                 "detail": "1. kibana的日志查看\n2. 生命周期管理",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhf9NQyvibXhMFKzFgQOib2rg5GUXic8D0WiaAFTAgTLszqxJtEiaARTfOe5kDT0nsWZJ1T7EtWGso30w/132",
            //                 "join_url": "https://us06web.zoom.us/j/86743041683?pwd=WEN0bkg3OHRNUE9rekxsZ3NNS0F1UT09",
            //                 "meeting_id": "86743041683",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1wB4y1A7MH"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-17",
            //         "timeData": [
            //             {
            //                 "id": 333,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder例会",
            //                 "creator": "t_feng",
            //                 "detail": "组内工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://us06web.zoom.us/j/88316961894?pwd=cXphL0pINEErN3o2RjJZaFJobjdwdz09",
            //                 "meeting_id": "88316961894",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1nB4y1A7gb"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-20",
            //         "timeData": [
            //             {
            //                 "id": 334,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会&技术分享",
            //                 "creator": "jvmboy",
            //                 "detail": "已有议题如下：\n1. javac编译器源码概览及调试\n\n欢迎上报议题，新增议题直接回复邮件即可\n\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://us06web.zoom.us/j/82807458186?pwd=SnFkZUFQeGx2aU1iZEZ4S0E5anlNdz09",
            //                 "meeting_id": "82807458186",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-21",
            //         "timeData": [
            //             {
            //                 "id": 335,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "TC双周例会",
            //                 "creator": "Ronnie_Jiang",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/hm01iaia6gkKvUYEQhgSnyVYBLg6N978F0SvbvhQiaVp1lFBXdP2W4KzK9PTGIQEibIcTOqFKKia53IICpCjtrrp40w/132",
            //                 "join_url": "https://us06web.zoom.us/j/84944088720?pwd=ZmIxd0tyenZheVlZVE90WXFjTmdqUT09",
            //                 "meeting_id": "84944088720",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1by4y1476w"
            //             },
            //             {
            //                 "id": 339,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "18:00",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "guoxiaoqi",
            //                 "detail": "1. 漏洞感知工具进展介绍\n2. 社区漏洞处理进展介绍",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/ajNVdqHZLLAta2U9JU17Xg9hbSUCVPU57Djs4YC3MVAmuh3icIzWicaaTEHKRKJqQ3hAlWibSMwicd0qmKmn46EGQw/132",
            //                 "join_url": "https://us06web.zoom.us/j/81002813950?pwd=S2d6TXU0QThCUUEvK3lzSmJXaGp1Zz09",
            //                 "meeting_id": "81002813950",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 340,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "20:00",
            //                 "endTime": "20:30",
            //                 "duration": 1,
            //                 "duration_time": "20:00-21:00",
            //                 "name": "RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况\n2. raspi-config 移植到 openEuler\n3. openEuler 移植到 RK3399 的工作进展",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/88479573928?pwd=RzJCbm5kNjkySVh3T21XTlg2QmpVUT09",
            //                 "meeting_id": "88479573928",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-22",
            //         "timeData": [
            //             {
            //                 "id": 336,
            //                 "group_name": "sig-bio",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-bio双周例会",
            //                 "creator": "zhouzhongyuan1",
            //                 "detail": "sig-bio双周例会，欢迎申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/D8zDu2Md8Z0DLA8enYiaIoDo6akCicb2F8Z2PhEiaDKZeDjAmoS6qevw85MAWU7lhGytZ6ocdn0icTCGl9dVAXU1lQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/84717074055?pwd=TzhzeklNOEYzdDFGeEhSZGxZMXVQdz09",
            //                 "meeting_id": "84717074055",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-bio-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Nh411S7GZ"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-23",
            //         "timeData": [
            //             {
            //                 "id": 342,
            //                 "group_name": "Virt",
            //                 "startTime": "14:15",
            //                 "endTime": "16:15",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "virt sig例会0423",
            //                 "creator": "Kuhnchen18",
            //                 "detail": "\n1、stratovirt之virtio-balloon技术分享\n2、stratovirt之hydropper测试套分享\n3、commiter 及maintainer运作机制讨论\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkhqVO3TCldYrB0VHvnJX9RCOZypFKzEkUNUHrOz0Mbsj2ejTo8Qk1zTwcdQ0G8nJDg6FmhTOOJg/132",
            //                 "join_url": "https://us06web.zoom.us/j/82229489518?pwd=enNxc0l6WVoyR1JXRmhCUjdFbDVodz09",
            //                 "meeting_id": "82229489518",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1hQ4y1Z79J"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-26",
            //         "timeData": [
            //             {
            //                 "id": 344,
            //                 "group_name": "Desktop",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "openEuler支持多版本遗留问题讨论",
            //                 "creator": "small_leek",
            //                 "detail": "关于上一次TC会议的议题遗留的问题与社区各个sig组的maintainer，osv厂商讨论",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK4DbPNKHTTlXGTOKOVVd1or7rzgM1fS7ticyaibSKlVz1LAibjjjj1axlkpiae6SI8F11TuGicO08NaIg/132",
            //                 "join_url": "https://us06web.zoom.us/j/89642285346?pwd=cUZFcUZ3Uk9DUDJBNDhCUWVVMFlRZz09",
            //                 "meeting_id": "89642285346",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Desktop-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-27",
            //         "timeData": [
            //             {
            //                 "id": 347,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "CloudNative SIG双周例会",
            //                 "creator": "zklei",
            //                 "detail": "1.各项工作进展同步\n2.议题待收集\n",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJUCfWcM6AA8JSlsLZXEZtFtEM2E9ATcOSNm5XA0REYI7grreXzcnbeDpmafXoQENlrEfkJshweIQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/87445971925?pwd=bDNJVVdFb1llM29CY21zM1k0Ykx2QT09",
            //                 "meeting_id": "87445971925",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1ff4y1p7y6"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-04-28",
            //         "timeData": [
            //             {
            //                 "id": 343,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "sig-release-management例会",
            //                 "creator": "xxiaosong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eph7FxAB48zalyYlaPUY5VkhXLCJ73TJw7A3flia3q3tp1jnfKDaTrtjMuItC8aQrGNicoibwXy0E5Qw/132",
            //                 "join_url": "https://us06web.zoom.us/j/88081424194?pwd=UU4vZTZDd3FndnlETHlHTU5BOVh0Zz09",
            //                 "meeting_id": "88081424194",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 345,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "15:00",
            //                 "endTime": "16:30",
            //                 "duration": 2,
            //                 "duration_time": "15:00-17:00",
            //                 "name": "OpenStack SIG 例会",
            //                 "creator": "joec88",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://us06web.zoom.us/j/81569130732?pwd=ckNwaGI0S1JsNTNrM09pRytWVXpGZz09",
            //                 "meeting_id": "81569130732",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 348,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "gwei3",
            //                 "detail": "1. 漏洞感知工具进展\n2. 社区漏洞处理进展\n3. 其它待收集议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLqwRD0N1gRquUFAj48915Ox6qa2oaCYF9icZ53KUPxutpuHoCXAwXhEvDHzJ4Hic4icFk8OSUhv4DQg/132",
            //                 "join_url": "https://us06web.zoom.us/j/83591849777?pwd=MjZtU0EvSW1acHJJN3ppb1cybnVPdz09",
            //                 "meeting_id": "83591849777",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 349,
            //                 "group_name": "sig-QA",
            //                 "startTime": "16:00",
            //                 "endTime": "17:15",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "QA-SIG 双周例会",
            //                 "creator": "charlie_li",
            //                 "detail": "\nopenEuler20. 03 LTS SP2版本测试策略评审",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2EXlpc9AJ92BDl86BOCFfz5WEM3RqXVl8ibkQ7nhqSNibcSPia1WH2VD4baJXGNDoYdEGM3JA2XHXg/132",
            //                 "join_url": "https://us06web.zoom.us/j/89300938378?pwd=ZDE4T3FLcFFTVFBUcWRnc3B1ak9nZz09",
            //                 "meeting_id": "89300938378",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-QA-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1kK4y1P7Dt"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-11",
            //         "timeData": [
            //             {
            //                 "id": 351,
            //                 "group_name": "sig-confidential-computing",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-confidential-computing双周例会",
            //                 "creator": "chenmaodong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTI6KypshMmOjp0z8GCncTFB9EibcOt0xlTmFicDpBtsCRelN2raN66OOKm21g2K3wDhMV7WMY4Jwia5A/132",
            //                 "join_url": "https://us06web.zoom.us/j/83676921859?pwd=eUpKa05RQ0k3ZzlGN1FQWVRjb3ZnQT09",
            //                 "meeting_id": "83676921859",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-confidential-computing-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-12",
            //         "timeData": [
            //             {
            //                 "id": 350,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "TC双周例会",
            //                 "creator": "liujingang09",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://us06web.zoom.us/j/83802136408?pwd=NWVzQStkM1V6bEpkTzFqdEc5cFZidz09",
            //                 "meeting_id": "83802136408",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1co4y117Pp"
            //             },
            //             {
            //                 "id": 353,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "17:30",
            //                 "duration": 2,
            //                 "duration_time": "16:00-18:00",
            //                 "name": "openEuler安全委员会例会",
            //                 "creator": "yanglijin",
            //                 "detail": "\n1.漏洞感知优化进展\n2.社区漏洞处理进展\n3.申请在openEuler社区开源开发鲲鹏安全库\n4.CVE遗留申报\n欢迎更多议题申报",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLFXZEw8WxhxMw5jzPqLl87Asp6J8ppLZYMcmj9eqZstKXzx89Q5icicAK2kiaz1GLcjOiabIVMeVsTOQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/84909809506?pwd=c2pNMWRsQllHbUdoeWVxSW9xRnowZz09",
            //                 "meeting_id": "84909809506",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 356,
            //                 "group_name": "Marketing",
            //                 "startTime": "10:00",
            //                 "endTime": "12:00",
            //                 "duration": 2,
            //                 "duration_time": "10:00-12:00",
            //                 "name": "品牌委员会理会",
            //                 "creator": "ichengxinxin",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83erDakuFYlbPNgF60mibm1TRNNpmJk1l9hBqsREAcn9xga6f5tWnA8dPFOXlHzxqP2gliaKOMRMiaeZEw/132",
            //                 "join_url": "https://us06web.zoom.us/j/86514816404?pwd=cldRQ3oxYmdKSjZ3QnRoQjJxQmtMUT09",
            //                 "meeting_id": "86514816404",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Marketing-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 357,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "20:00",
            //                 "endTime": "20:30",
            //                 "duration": 1,
            //                 "duration_time": "20:00-21:00",
            //                 "name": "RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况\n2. raspi-config 移植到 openEuler\n3. openEuler 的 Firefly RK3399 内测镜像发布试用",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/89343049943?pwd=OGZ4QVlKeU9lTjBLVFRtRDltZlorZz09",
            //                 "meeting_id": "89343049943",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-13",
            //         "timeData": [
            //             {
            //                 "id": 354,
            //                 "group_name": "sig-bio",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-bio双周例会",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "sig-BIO双周例会，欢迎大家申报议题。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://us06web.zoom.us/j/82586575431?pwd=Y1lMMEl6STd1ckVLZDhKbi9nS0xYQT09",
            //                 "meeting_id": "82586575431",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-bio-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1w54y1V74w"
            //             },
            //             {
            //                 "id": 359,
            //                 "group_name": "sig-CICD",
            //                 "startTime": "18:30",
            //                 "endTime": "19:30",
            //                 "duration": 2,
            //                 "duration_time": "18:00-20:00",
            //                 "name": "etcd使用的简单介绍",
            //                 "creator": "baijing",
            //                 "detail": "etcd使用的简单介绍",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqhf9NQyvibXhMFKzFgQOib2rg5GUXic8D0WiaAFTAgTLszqxJtEiaARTfOe5kDT0nsWZJ1T7EtWGso30w/132",
            //                 "join_url": "https://us06web.zoom.us/j/89244151708?pwd=TXcwRlpMdlRLMFJCNStNc1NmUndNZz09",
            //                 "meeting_id": "89244151708",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CICD-meetings",
            //                 "video_url": "https://www.bilibili.com/BV11h411v7nT"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-14",
            //         "timeData": [
            //             {
            //                 "id": 358,
            //                 "group_name": "Virt",
            //                 "startTime": "14:15",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt sig例会-20210514",
            //                 "creator": "Kuhnchen18",
            //                 "detail": "1、openEuler 20.03 LTS SP2需求进展介绍\n2、qemu 4.2特性回合需求介绍\n3、StratoVirt快速冷启动bootloader技术分享",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkhqVO3TCldYrB0VHvnJX9RCOZypFKzEkUNUHrOz0Mbsj2ejTo8Qk1zTwcdQ0G8nJDg6FmhTOOJg/132",
            //                 "join_url": "https://us06web.zoom.us/j/85000061143?pwd=VVJVY0Qyak51TFdvdWZUMWJCM2FQQT09",
            //                 "meeting_id": "85000061143",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Ef4y1Y7HK"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-15",
            //         "timeData": [
            //             {
            //                 "id": 360,
            //                 "group_name": "sig-OS-Builder",
            //                 "startTime": "14:30",
            //                 "endTime": "15:00",
            //                 "duration": 1,
            //                 "duration_time": "14:00-15:00",
            //                 "name": "OS-Builder 例会",
            //                 "creator": "t_feng",
            //                 "detail": "组内工作审视",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83epnpe3oXteUAlK0rut2WCDxw6RU9mBTmLb94Z6ialYiaGQhIQgT0RQ8Lt1QJFpaOmpBYrEgvGyBQR0w/132",
            //                 "join_url": "https://us06web.zoom.us/j/82951517152?pwd=KzRzR2lrMGNVdzhCVXc3Q3lFeVA2Zz09",
            //                 "meeting_id": "82951517152",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-OS-Builder-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-18",
            //         "timeData": [
            //             {
            //                 "id": 361,
            //                 "group_name": "Compiler",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compiler SIG双周例会",
            //                 "creator": "jvmboy",
            //                 "detail": "1. bishengjdk发行介绍&如何做发行\n2. 构建bishengjdk rpm包常见的坑\n欢迎上报议题！",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLuyadalIB6fWRGiaY9CatA0TJ0pJzcW1qiaSrMicJ0l7QiaWOtFE2Ej8LYqibcia8EgNkoTqdRVibeMsbDw/132",
            //                 "join_url": "https://us06web.zoom.us/j/89840429300?pwd=Tk5GL3FjdFBpMTlzc1ExODJzT0tJZz09",
            //                 "meeting_id": "89840429300",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Compiler-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1w44y1r7jq"
            //             },
            //             {
            //                 "id": 362,
            //                 "group_name": "sig-compliance",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "Compliance-SIG 双周例会",
            //                 "creator": "smartsyoung",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmkib6GV2NIundr7laMqGc7icJc6NuZlKsjSVg9ZibpVwnWG6gicI7UKtTictUc47Achu9WklBly0Ca6g/132",
            //                 "join_url": "https://us06web.zoom.us/j/81687695070?pwd=Ti9XM2FaSU9XQW1QRVhHa2lCaW5uUT09",
            //                 "meeting_id": "81687695070",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-compliance-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1c84y1F7w7"
            //             },
            //             {
            //                 "id": 363,
            //                 "group_name": "sig-CloudNative",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "sig-CN双周会议",
            //                 "creator": "yangzhao_kl",
            //                 "detail": "欢迎大家积极申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/VZBAlibcNmiboVmfhx3SEUxqBFlvWcpQmAnbx1a2yqIXFXL7xicTgqVobpAQZibiaR4RcXTveTnlHrk0CTzTvqBMpPg/132",
            //                 "join_url": "https://us06web.zoom.us/j/84342802525?pwd=RC9WWk5kbUxPSVl0dldKUVpoeCtDdz09",
            //                 "meeting_id": "84342802525",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-CloudNative-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1RU4y157hn"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-19",
            //         "timeData": [
            //             {
            //                 "id": 364,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "15:00",
            //                 "endTime": "16:00",
            //                 "duration": 1,
            //                 "duration_time": "15:00-16:00",
            //                 "name": "Openstack SIG 例会",
            //                 "creator": "joec88",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://us06web.zoom.us/j/86769967131?pwd=aWhwY2tuL0hUZ2s4SVhTcGZEdWF5dz09",
            //                 "meeting_id": "86769967131",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 365,
            //                 "group_name": "sig-release-management",
            //                 "startTime": "14:30",
            //                 "endTime": "16:30",
            //                 "duration": 3,
            //                 "duration_time": "14:00-17:00",
            //                 "name": "sig-release-management双周例会",
            //                 "creator": "xxiaosong",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eph7FxAB48zalyYlaPUY5VkhXLCJ73TJw7A3flia3q3tp1jnfKDaTrtjMuItC8aQrGNicoibwXy0E5Qw/132",
            //                 "join_url": "https://us06web.zoom.us/j/86057315767?pwd=TTRHUTRaOUwxelhERmQvZVV1UTZ0QT09",
            //                 "meeting_id": "86057315767",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-release-management-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 366,
            //                 "group_name": "sig-QA",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "QA-SIG双周例会",
            //                 "creator": "charlie_li",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2EXlpc9AJ92BDl86BOCFfz5WEM3RqXVl8ibkQ7nhqSNibcSPia1WH2VD4baJXGNDoYdEGM3JA2XHXg/132",
            //                 "join_url": "https://us06web.zoom.us/j/83027847257?pwd=cGtYaFowTUVoaTJRTm9uUWtXUUdVdz09",
            //                 "meeting_id": "83027847257",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-QA-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1oo4y117YQ"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-25",
            //         "timeData": [
            //             {
            //                 "id": 374,
            //                 "group_name": "sig-Compatibility-Infra",
            //                 "startTime": "15:00",
            //                 "endTime": "17:00",
            //                 "duration": 2,
            //                 "duration_time": "15:00-17:00",
            //                 "name": "南向兼容性sig组例会",
            //                 "creator": "cuixucui",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJRicshwUBVb3DicWicFT81fyfKoUHQvfP6MeNBO6z5hTk68G3WoI0PcyE5AHzkWzIv5pYzSpG3QicmA/132",
            //                 "join_url": "https://us06web.zoom.us/j/85499677811?pwd=Zmh4aDVUQ3lGcUpwakN2c3pGSkthQT09",
            //                 "meeting_id": "85499677811",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Compatibility-Infra-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-26",
            //         "timeData": [
            //             {
            //                 "id": 373,
            //                 "group_name": "TC",
            //                 "startTime": "10:00",
            //                 "endTime": "12:45",
            //                 "duration": 3,
            //                 "duration_time": "10:00-13:00",
            //                 "name": "TC双周例会",
            //                 "creator": "charlie_li",
            //                 "detail": "欢迎申报议题",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTL2EXlpc9AJ92BDl86BOCFfz5WEM3RqXVl8ibkQ7nhqSNibcSPia1WH2VD4baJXGNDoYdEGM3JA2XHXg/132",
            //                 "join_url": "https://us06web.zoom.us/j/84460589918?pwd=b3BJRjZBQjNyUzYvQk0zay90WmxMQT09",
            //                 "meeting_id": "84460589918",
            //                 "etherpad": "https://etherpad.openeuler.org/p/TC-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1af4y1h7p4"
            //             },
            //             {
            //                 "id": 375,
            //                 "group_name": "security-committee",
            //                 "startTime": "16:00",
            //                 "endTime": "17:00",
            //                 "duration": 1,
            //                 "duration_time": "16:00-17:00",
            //                 "name": "安全委员会例会",
            //                 "creator": "liujingang09",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIYGTjVzw0sOVsv4BbWJkjArgkIOibXt3ia4y90jAaSiaKVOmnbt2IkK5J6a4eicxD7TQS1HrfQx0noWA/132",
            //                 "join_url": "https://us06web.zoom.us/j/87560481835?pwd=MTBJN2pCR285Uzd0YnMveTZ0dmE4Zz09",
            //                 "meeting_id": "87560481835",
            //                 "etherpad": "https://etherpad.openeuler.org/p/security-committee-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 377,
            //                 "group_name": "sig-openstack",
            //                 "startTime": "15:00",
            //                 "endTime": "16:30",
            //                 "duration": 2,
            //                 "duration_time": "15:00-17:00",
            //                 "name": "sig-openstack 例会",
            //                 "creator": "joec88",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eqiaY34GibOkib8xOEicBz6WQQ4ibneN9UydziciaF0W2PGviazGZicBqcSRA4YSWyVvjJHaGVaj4wgMIpBYCg/132",
            //                 "join_url": "https://us06web.zoom.us/j/88434367751?pwd=d0hzSUY0Nm14cEpVbFV6U0xjc3VDQT09",
            //                 "meeting_id": "88434367751",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-openstack-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 378,
            //                 "group_name": "sig-RaspberryPi",
            //                 "startTime": "20:00",
            //                 "endTime": "20:30",
            //                 "duration": 1,
            //                 "duration_time": "20:00-21:00",
            //                 "name": "sig-RaspberryPi例会",
            //                 "creator": "woqidaideshi",
            //                 "detail": "1. openEuler 树莓派镜像更新和测试情况\n2. raspi-config 移植到 openEuler",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/I7vyaqho3zSMiauqsEshgdoNhic0vRju4cwUWQwUAtuc35bnstHfYkvQumZyhVRwgVwLCs88A6kyku5lHp8WrxNQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/85000982324?pwd=eU9TQWtxMVJaZDV2aG4wQzJKeURQUT09",
            //                 "meeting_id": "85000982324",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-RaspberryPi-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-27",
            //         "timeData": [
            //             {
            //                 "id": 372,
            //                 "group_name": "sig-Gatekeeper",
            //                 "startTime": "17:00",
            //                 "endTime": "18:00",
            //                 "duration": 1,
            //                 "duration_time": "17:00-18:00",
            //                 "name": "sig-Gatekeeper双周例会",
            //                 "creator": "liuqi469227928",
            //                 "detail": "",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/mG8pYHVExwicM3DVEVnZjGeSA8UEviaodWScPz6xqCvj83zS8gFv9UBn097EoR8WZRp1WyzZgzdusyh017jnRWiaQ/132",
            //                 "join_url": "https://us06web.zoom.us/j/81502351967?pwd=cmhuZVF3SjRTU2RJZ0Zudit6dTZuQT09",
            //                 "meeting_id": "81502351967",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-Gatekeeper-meetings",
            //                 "video_url": ""
            //             },
            //             {
            //                 "id": 376,
            //                 "group_name": "sig-bio",
            //                 "startTime": "10:00",
            //                 "endTime": "11:00",
            //                 "duration": 1,
            //                 "duration_time": "10:00-11:00",
            //                 "name": "sig-bio双周例会",
            //                 "creator": "reganhe_",
            //                 "detail": "sig-bio双周例会，欢迎大家申报议题。",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTKadlFX8zq3ktXVfjN3Tqe4KDWenoEAiacXpqF6b8E6tic9hibBIXeeSxsweCMfF0pNGA26pJ2XWlrVg/132",
            //                 "join_url": "https://us06web.zoom.us/j/82330174392?pwd=eE5nTmFpWVRLc25zS1FxN09peFhyZz09",
            //                 "meeting_id": "82330174392",
            //                 "etherpad": "https://etherpad.openeuler.org/p/sig-bio-meetings",
            //                 "video_url": "https://www.bilibili.com/BV1Xb4y1o7Mn"
            //             }
            //         ]
            //     },
            //     {
            //         "date": "2021-05-28",
            //         "timeData": [
            //             {
            //                 "id": 379,
            //                 "group_name": "Virt",
            //                 "startTime": "14:15",
            //                 "endTime": "16:00",
            //                 "duration": 2,
            //                 "duration_time": "14:00-16:00",
            //                 "name": "virt-sig双周例会0528",
            //                 "creator": "Kuhnchen18",
            //                 "detail": "\n1、openEuler 版本需求进展\n2、基于stratovirt的安全容器配置方法和使用演示",
            //                 "url": "https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLkhqVO3TCldYrB0VHvnJX9RCOZypFKzEkUNUHrOz0Mbsj2ejTo8Qk1zTwcdQ0G8nJDg6FmhTOOJg/132",
            //                 "join_url": "https://us06web.zoom.us/j/82747035194?pwd=YTlWRGxwZFZrY1lRYWR3N21rMGxGQT09",
            //                 "meeting_id": "82747035194",
            //                 "etherpad": "https://etherpad.openeuler.org/p/Virt-meetings",
            //                 "video_url": ""
            //             }
            //         ]
            //     }
            // ]
        }
    }
    // __main()
})