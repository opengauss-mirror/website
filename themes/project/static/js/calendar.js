$(document).ready(function () {
    const log = console.log.bind(console)
    var lang = window.location.href.includes('/zh/') ? 'zh' : 'en';

    var calendarMethods = {
        fontmatter: {
            reverseTitle: lang === 'zh' ? '预定会议' : 'Schedule a meeting:',
            reverse: lang === 'zh' ? '会议名称:' : 'Name:',
            creator: lang === 'zh' ? '发起人:' : 'Organizer:',
            sig: lang === 'zh' ? '所属SIG组:' : 'SIG name:',
            day: lang === 'zh' ? '会议日期:' : 'Date:',
            time: lang === 'zh' ? '会议时间:' : 'Time:',
            content: lang === 'zh' ? '会议内容:' : 'Agenda:',
            zoomId: lang === 'zh' ? 'Zoom会议ID:' : 'Zoom Meeting ID:',
            zoomLink: lang === 'zh' ? 'Zoom链接:' : 'Zoom link:',
            etherpad: lang === 'zh' ? 'Etherpad链接:' : 'Etherpad link:',
            video: lang === 'zh' ? '回放链接:' : 'Playback link:',
            record: lang === 'zh' ? '是否录制此会议' : 'Record Meeting',
            delete: lang === 'zh' ? '删除会议' : 'Delete Meeting',
            modify: lang === 'zh' ? '修改会议' : 'Modify Meeting',
            detailTip: lang === 'zh' ? '编辑已预定会议需要验证用户Gitee身份权限' : 'Editing a scheduled meeting requires verifying the user\'s Gitee identity and permissions.',
        },
        formatTime: function (time) {
            let arr = time.split('-');
            arr[0] = parseInt(arr[0].split(':')[0]);
            arr[1] = parseInt(arr[1].split(':')[0]);
            return arr;
        },
        filterWithId: function (id) {
            let data = cleanData.dataJSON.tableData
            let current = data.filter(function (day) {
                let dayData = day.timeData.filter(function (time) {
                    return time.id === parseInt(id)
                })
                return dayData.length > 0
            })
            return current[0]
        },
        insertContentHTML: function(data) {
            let item = data
            let t = ""
            t += '<div class="content-meeting" data-id="' + item.id + '">'
            t += '<p data-id="' + item.id + '">' + item.name + '</p>'
            t += '<p class="hovered" data-id="' + item.id + '">' + this.fontmatter.time + item.startTime +'-' + item.endTime + '</p>'

            if (item.video_url !== '') {
                t += `<img src="/img/calendar/video_icon.svg" alt="">`
            } else if (item.record) {
                t += `<img src="/img/calendar/video_gray.svg" alt="">`
            }
            t += '</div>'
            return t
        },
        insertListHTML: function (data, key) {
            let t = ""
            Object.entries(data.dealDate).forEach(function (item) {
                let key = item[0]
                let value = item[1]

                if (value.data.length > 0) {
                    let d = value.data[0]

                    let start = key
                    start = Number(start.split(':')[0])
                    let top = (start + 1) * (16 + 56)
                    let height = (56) * d.duration + 16 * (d.duration - 1)
                    let width = value.data.length * 220

                    let isShow = value.data.length > 1 ? 'show' : ''

                    t += `<div class="list-inner-box"  style="height: ${height}px; top: ${top}px;">`
                    t += `<span class="left btnMy ${isShow}" style="height: ${height}px;line-height: ${height}px;"> < </span>`
                    t += `<span class="right btnMy ${isShow}" style="height: ${height}px;line-height: ${height}px;"> > </span>`
                    t += `<span class="index btnMy ${isShow}"> 1 / ${value.data.length}</span>`
                    t += `<div class="inner-list" style="width: ${width}px; height: ${height}px;">`

                    for (let i = 0; i < value.data.length; i++) {
                        let item = value.data[i]
                        t += calendarMethods.insertContentHTML(item)
                    }
                    t += '</div>'
                    t += '</div>'
                }
            })
            return t
        },
        insertDealHTML: function (data) {
            let t = `<div class="list-content">`
            for (let i = 0; i < data.length; i++) {
                let e = data[i]
                let key = Number(e.startTime.split(':')[1]) > 0 ? e.startTime.split(':')[0] + ':00' : e.startTime
                t += calendarMethods.insertListHTML(e, key)
            }
            t += '</div>'
            return t
        },
        insertRowHTML: function (data) {

            let t = ""
            $('.js-schedule-content').empty();

            for (let i = 0; i < data.length; i++) {
                let day = data[i].date
                let list = data[i].timeDate
                t = `<div class="row-list" data-day="${day}">`

                let l = calendarMethods.insertDealHTML(list)
                t += l
                t += '</div>'

                $('.js-schedule-content').append(t)
            }
        },
        insertDetailListHTML: function (name, value, className, img) {
            let t = ""
            if (value !== undefined) {
                if ( value !== null && value.includes('http')) {
                    t = '<ul>' +
                        '<li>' + name + '</li>' +
                        '<li><a class="detail-' + className +'" href="' + value + '" target="_blank">' + value + '</a></li>' +
                        '</ul>'
                } else if (value !== '') {
                    let c = name.toLowerCase().includes('id') ? 'mid' : 'detail-' + className;
                    t = '<ul>' +
                        '<li>' + name + '</li>'

                    t += img !== undefined
                        ? '<img class="creator-icon" src="' + img + '">' + '<li class="creator-name">' + value + '</li>' + '</ul>'
                        : '<li class="'+ c + '">' + value + '</li>' + '</ul>';
                }
            }
            return t

        },
        insertDetailHTML: function (data, date) {
            let info = data[0]
            let duration = info.startTime + '-' + info.endTime

            let t = '<h5 class="meeting-name">' + info.name + '</h5>'
            t += this.insertDetailListHTML(this.fontmatter.creator, info.creator, 'creator', info.url)
            t += this.insertDetailListHTML(this.fontmatter.sig, info.group_name, 'sig')
            t += this.insertDetailListHTML(this.fontmatter.day, date, 'day')
            t += this.insertDetailListHTML(this.fontmatter.time, duration, 'time')
            t += this.insertDetailListHTML(this.fontmatter.content, info.detail, 'content')
            t += this.insertDetailListHTML(this.fontmatter.zoomId, info.meeting_id, 'zoomId')
            t += this.insertDetailListHTML(this.fontmatter.zoomLink, info.join_url, 'zoomLink')
            t += this.insertDetailListHTML(this.fontmatter.etherpad, info.etherpad, 'etherpad')
            t += this.insertDetailListHTML(this.fontmatter.video, info.video_url, 'video')

            t += '<div class="reverse-submit">' +
                '<p class="date-delete cursor">' + this.fontmatter.delete + '</p>' +
                '<p class="date-modify cursor">' + this.fontmatter.modify + '</p>' +
                '</div>'

            t += '<p class="notice-content">' +
                '<img src="/img/calendar/notice.png" alt="">' +
                this.fontmatter.detailTip +
                '</p>'
            return t
        },
        insertTimeList: function() {
            let currentTime = calendarClickEvent.getNowTime().hour
            let t = ''
            for (let i = 0; i < 25; i++) {
                currentTime = parseInt(currentTime)
                let active = currentTime === i ? 'active' : ''
                t += '<p class="det-item ' + active +'">' + i + ':00-' + (i + 1) + ':00 </p>'
            }

            $('.time-swiper').append(t)
        },
        emptyFormDate: function() {
            // 主题 -会议名称
            $('#id-meeting-name').val('')
            // 发起人
            $('#id-meeting-creator').val('')
            // sig组
            $('#id-meeting-sig').val('')
            // 会议日期
            $('#J-demo-01').val('')
            // 开始时间
            $('#time-start').val('')
            // 结束时间
            $('#time-end').val('')
            // 议程 - 会议内容
            $('#id-meeting-content').val('')
            // 邮件列表
            $('#id-meeting-email').val('')
            $('#js-meeting-etherpad').val('')
        },
        isLogin: function(id) {
            // let userSigs = getCookie('userSigs')
            let userSigs = window.sessionStorage.userSigs
            log('usersig', userSigs)
            // 判断缓存里是否有用户信息
            if (userSigs !== undefined) {
                // 有用户信息 已登录
                return true
            } else {
                // 无用户信息 未登录
                $('.cal-content-detail').removeClass('hide')

                $('.js-no-login').removeClass('hide').siblings().addClass('hide')

                calendarClickEvent.handleLogin(id)

                return false
            }
        },
        isAuthority: function (userSigs, id) {
            // 判断有没有权限
            if (userSigs !== '') {
                // 有权限
                if (id !== undefined) {
                    requestMethods.meetingCheck(id)
                } else {
                    $('.js-reverse-content').removeClass('hide').siblings().addClass('hide')
                }
                return true
            } else  {
                // 无权限
                $('.cal-content-detail').removeClass('hide')
                $('.js-no-authority').removeClass('hide').siblings().addClass('hide')
                return false
            }
        },
        isSelfLogin: function (name, id) {
            // let giteeid = getCookie('giteeId')
            let giteeid = window.sessionStorage.giteeId
            log('gitee name', giteeid, name)
            if (giteeid === name) {
                // 有权限
                if (id !== undefined) {
                    requestMethods.meetingCheck(id)
                } else {
                    $('.js-reverse-content').removeClass('hide').siblings().addClass('hide')
                }
                return true
            } else  {
                // 无权限
                $('.cal-content-detail').removeClass('hide')
                $('.js-no-edit').removeClass('hide').siblings().addClass('hide')
                return false
            }
        },
        backToReverse: function () {
            $('.js-back-reverse').on('click', function () {
                $('.js-reverse-content').removeClass('hide').siblings().addClass('hide')
            })
        },
        remindError: function (info) {
            $('.js-fail-reverse').find('.fail-info').text(info)

            $('.js-fail-reverse').removeClass('hide').siblings().addClass('hide')

            calendarMethods.backToReverse()
        },
        initFormData: function(data) {
            log('data', data)
            let userSigs = data.userSigs.split(',')
            let currentTime = calendarClickEvent.getNowTime()
            $('#id-meeting-creator').val(data.giteeId)
            $("#time-start").val(currentTime.hour + ':' + currentTime.minute)
            $("#time-end").val(currentTime.hour + ':' + currentTime.minute)
            $('#id-meeting-sig').empty()
            userSigs.forEach(item => {
                $('#id-meeting-sig').append('<option value="' + item + '">' + item + '</option>')
            })
        },
        cleanResponse: function(data) {
            let o = {
                creator: data.sponsor,
                detail: data.agenda,
                url: data.avatar,
                group_name: data.group_name,
                startTime: data.start,
                endTime: data.end,
                name: data.topic,
                etherpad: data.etherpad,
                join_url: data.join_url,
                date: data.date
            }
            return o
        },
        getStorage: function() {
            let storage = {
                userSigs: window.sessionStorage.userSigs,
                giteeId: window.sessionStorage.giteeId,
                userId: window.sessionStorage.userId
            }
            return storage
        }
     }
    var cleanData = {
        dataJSON: {},
        unique: function(arr) {
            return Array.from(new Set(arr));
        },
        calendarSortData: function (data) {
            data.forEach(dateItem => {
                let arr = [];
                dateItem.timeData.forEach(timeItem => {
                    let timeStart = calendarMethods.formatTime(timeItem.duration_time)[0];
                    let timeEnd = calendarMethods.formatTime(timeItem.duration_time)[1];
                    let indexTemp = null;
                    if (!arr.length) {
                        arr.push({
                            startTime: timeItem.startTime,
                            endTime: timeItem.endTime,
                            duration: timeItem.duration,
                            duration_time: timeItem.duration_time,
                            meetingData: [
                                timeItem
                            ]
                        })
                    } else {

                        let findItem = arr.every(meetingItem => {
                            let meetingStart = calendarMethods.formatTime(meetingItem.duration_time)[0];
                            let meetingEnd = calendarMethods.formatTime(meetingItem.duration_time)[1];
                            return (
                                (timeEnd <= meetingStart) ||
                                (timeStart >= meetingEnd)
                            );
                        })
                        if (findItem) {
                            arr.push({
                                startTime: timeItem.startTime,
                                endTime: timeItem.endTime,
                                duration: timeItem.duration,
                                duration_time: timeItem.duration_time,
                                meetingData: [
                                    timeItem
                                ]
                            })
                            return;
                        }
                        let eachFlag = false;
                        arr.forEach((meetingItem, index) => {
                            if (eachFlag) {
                                return;
                            }
                            indexTemp = index;
                            let meetingStart = calendarMethods.formatTime(meetingItem.duration_time)[0];
                            let meetingEnd = calendarMethods.formatTime(meetingItem.duration_time)[1];
                            if (
                                (meetingStart
                                    <= timeStart) &&
                                (timeStart
                                    <= meetingEnd) &&
                                (meetingStart
                                    <= timeEnd) &&
                                (timeEnd
                                    <= meetingEnd)
                            ) {
                                eachFlag = true;
                                meetingItem.meetingData.push(timeItem);
                            }


                            if (
                                (timeStart < meetingStart) &&
                                ((meetingStart < timeEnd) &&
                                    (timeEnd <= meetingEnd))
                            ) {
                                eachFlag = true;
                                meetingItem.startTime = timeItem.startTime;
                                meetingItem.duration = meetingEnd - timeStart;
                                meetingItem.duration_time = timeStart + ':00-' + meetingEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                            if (
                                (timeEnd > meetingEnd) &&
                                ((meetingStart <= timeStart) &&
                                    (timeStart < meetingEnd))
                            ) {
                                eachFlag = true;
                                meetingItem.endTime = timeItem.endTime;
                                meetingItem.duration = timeEnd - meetingStart;
                                meetingItem.duration_time = meetingStart + ':00-' + timeEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                            if (
                                (timeStart < meetingStart) &&
                                (timeEnd > meetingEnd)
                            ) {
                                eachFlag = true;
                                meetingItem.startTime = timeItem.startTime;
                                meetingItem.endTime = timeItem.endTime;
                                meetingItem.duration = timeEnd - timeStart;
                                meetingItem.duration_time = timeStart + ':00-' + timeEnd + ':00';
                                meetingItem.meetingData.push(timeItem);
                            }

                        })
                    }
                    let arrTemp = [];
                    let notCheckArr = [];
                    if (indexTemp !== null) {
                        let curItemStartTime = arr[indexTemp].startTime;
                        let curItemEndTime = arr[indexTemp].endTime;
                        let curItemStart = calendarMethods.formatTime(arr[indexTemp].duration_time)[0];
                        let curItemEnd = calendarMethods.formatTime(arr[indexTemp].duration_time)[1];
                        arr.forEach((item, index) => {
                            let itemStart = calendarMethods.formatTime(item.duration_time)[0];
                            let itemEnd = calendarMethods.formatTime(item.duration_time)[1];
                            if (index != indexTemp) {
                                if (
                                    (itemStart < curItemStart) &&
                                    ((curItemStart < itemEnd) &&
                                        (itemEnd <= curItemEnd))
                                ) {
                                    curItemStart = itemStart;
                                    curItemStartTime = item.startTime;
                                    arrTemp.push(item);
                                    return;
                                }

                                if (
                                    (itemEnd > curItemEnd) &&
                                    ((curItemStart <= itemStart) &&
                                        (itemStart < curItemEnd))
                                ) {
                                    curItemEnd = itemEnd;
                                    curItemEndTime = item.endTime;
                                    arrTemp.push(item);
                                    return;
                                }

                                if (
                                    (itemStart < curItemStart) &&
                                    (itemEnd > curItemEnd)
                                ) {
                                    curItemStart = itemStart;
                                    curItemEnd = itemEnd;
                                    curItemStartTime = item.startTime;
                                    curItemEndTime = item.endTime;
                                    arrTemp.push(item);
                                    return;
                                }
                                notCheckArr.push(item);
                            }
                        })
                        let selItem = [];
                        if (arrTemp.length) {
                            arr[indexTemp].startTime = curItemStartTime;
                            arr[indexTemp].duration = curItemEnd - curItemStart;
                            arr[indexTemp].endTime = curItemEndTime;
                            arr[indexTemp].duration_time = curItemStart + ':00-' + curItemEnd + ':00';
                            selItem.push(arr[indexTemp]);

                            arrTemp.forEach((item, index) => {
                                selItem[0].meetingData = selItem[0].meetingData.concat(item.meetingData);
                            })
                            selItem = selItem.concat(notCheckArr);
                            arr = selItem;
                        }
                    }
                })
                dateItem.timeDate = arr;
            })
            return data;
        },
        getOriginData: function (data) {
            let timestamp = Date.now();
            let min;
            let index = 0;
            data.forEach((item, dateIndex) => {
                let itemStamp = new Date(item.date).getTime();
                let interVal = Math.abs(timestamp - itemStamp);
                if (min === void 0) {
                    min = interVal
                } else {
                    if (min > interVal) {
                        min = interVal;
                        index = dateIndex;
                    }
                }
                item.timeDate.forEach(item1 => {
                    item1.dealDate = {};
                    let flags = true;
                    item1.meetingData.forEach(meetItem => {
                        if (
                            meetItem.duration !== item1.duration &&
                            meetItem.startTime !== item1.startTime
                        ) {
                            flags = false;
                        }
                    });

                    if (!flags) {
                        for (let i = 0; i < item1.duration; i++) {
                            // let times = (parseInt(item1.startTime) + i ) < 10 ? "0" + (parseInt(item1.startTime) + i )+ ":00" : parseInt(item1.startTime) + i + ":00";
                            let times = parseInt(item1.startTime) + i + ":00";
                            item1.dealDate[times] = [];
                        }
                        item1.meetingData.forEach(item2 => {
                            if (item2.startTime === item1.startTime) {
                                for (const key in item1.dealDate) {
                                    if (key === item2.startTime) {
                                        item1.dealDate[key].push(item2);
                                    }
                                }
                            }
                            for (
                                let i = parseInt(item2.startTime);
                                i < parseInt(item2.endTime);
                                i++
                            ) {
                                // let times = i < 10 ? "0" + i + ":00" : i + ":00";
                                let times = i + ":00";
                                for (const key in item1.dealDate) {
                                    if (key === times) {
                                        item1.dealDate[key].push(item2);
                                    }
                                }
                            }
                        });
                        //去重
                        for (const key in item1.dealDate) {
                            let datas = cleanData.unique(item1.dealDate[key]);
                            item1.dealDate[key] = datas;
                        }
                    } else {
                        // let times = parseInt(item1.startTime) < 10 ? "0" + parseInt(item1.startTime) + ":00" : parseInt(item1.startTime) + ":00";
                        let times = parseInt(item1.startTime) + ":00";

                        item1.dealDate[times] = item1.meetingData;
                    }
                    let flag = true;
                    item1.meetingData.forEach(items => {
                        if (items.duration !== item1.duration) {
                            flag = false;
                        }
                    });
                    if (flag) {
                        for (const key in item1.dealDate) {
                            if (key !== item1.startTime && !flags) {
                                delete item1.dealDate[key];
                            }
                        }
                    } else {
                        for (const key in item1.dealDate) {
                            item1.dealDate[key].forEach(items => {
                                items.duration = 1;
                            });
                        }
                    }
                    for (const key in item1.dealDate) {
                        let datas = item1.dealDate[key];
                        item1.dealDate[key] = {};
                        item1.dealDate[key].index = 1;
                        item1.dealDate[key].data = datas;
                    }
                });
            });
            return data;

        },
    }

    var calendarClickEvent = {
        timeSwiper: function () {
            var timer1 = null
            var timer2 = null

            // up btn
            $('.js-up-btn').on('click', function (event) {
                clearTimeout(timer1);
                timer1 = setTimeout(function () {
                    calendarClickEvent.handleRowBtn('up')
                }, 500)
            });
            // down btn
            $('.js-down-btn').on('click', function (event) {
                clearTimeout(timer2);
                timer2 = setTimeout(function () {
                    calendarClickEvent.handleRowBtn('down')
                }, 500)
            })
        },
        daySwiper: function (size) {
            var timer1 = null
            var timer2 = null

            // left btn
            $('.js-left-btn').on('click', function (event) {
                clearTimeout(timer1);
                timer1 = setTimeout(function () {
                    calendarClickEvent.handleLineBtn('left')
                }, 500)
            });
            // right btn
            $('.js-right-btn').on('click', function (event) {
                clearTimeout(timer2);
                timer2 = setTimeout(function () {
                    calendarClickEvent.handleLineBtn('right', size)
                }, 500)
            })
        },
        detailSwiper: function () {
            $('.list-inner-box').on('click', function (event) {
                let target = event.target
                // 点击右键
                let text = $(this).find('.index').text().split('/')
                let current = parseInt(text[0])
                let total = parseInt(text[1])
                let currentLeft = parseInt($(this).find('.inner-list').css('transform').split(',')[4])
                let left = null

                if (target.className.includes('right')) {
                    if (current < total) {
                        left = currentLeft - 220
                        current += 1
                    }
                } else if (target.className.includes('left')) {
                    if (current > 1) {
                        left = currentLeft + 220
                        current -= 1
                    }
                } else {
                    let id = target.dataset.id
                    calendarClickEvent.handleDetail(id)
                }
                $(this).find('.inner-list').css('transform', `matrix(1, 0, 0, 1, ${left}, 0)`)
                $(this).find('.index').text(`${current} / ${total}`)
            })
        },
        handleRowBtn: function (direction) {
            let trans = $('.time-swiper').css('transform')
            let contentTrans = $('.js-schedule-content').css('transform')
            let origin = parseInt(contentTrans.split(',')[4])
            trans = parseInt(trans.split(',')[5])
            contentTrans = parseInt(contentTrans.split(',')[5])
            if (direction === 'up') {
                if (trans < 0) {
                    trans += (56 + 16)
                    contentTrans += (56 + 16)
                }
            } else {
                if (trans > -1080) {
                    trans -= (56 + 16)
                    contentTrans -= (56 + 16)
                }
            }

            $('.time-swiper').css('transform', `matrix(1, 0, 0, 1, 0, ${trans})`)
            $('.js-schedule-content').css('transform', `matrix(1, 0, 0, 1, ${origin}, ${contentTrans})`)
        },
        handleLineBtn: function (direction, size) {
            let trans = $('.js-meet-day').css('transform',)
            let contentTrans = $('.js-schedule-content').css('transform')
            let origin = parseInt(contentTrans.split(',')[5])
            let width = document.body.clientWidth < 1000 ? 185 : 220;
            trans = parseInt(trans.split(',')[4])
            contentTrans = parseInt(contentTrans.split(',')[4])

            if (direction === 'left') {
                if (trans < 0) {
                    trans += (width + 24)
                    contentTrans += (width + 24)
                }
            } else {
                if (trans > size) {
                    trans -= (width + 24)
                    contentTrans -= (width + 24)
                }
            }
            $('.js-meet-day').css('transform', `matrix(1, 0, 0, 1, ${trans}, 0)`)
            $('.js-schedule-content').css('transform', `matrix(1, 0, 0, 1, ${contentTrans}, ${origin})`)
        },
        handleDetail: function (id) {
            let detail = calendarMethods.filterWithId(id)
            let date = detail.date
            let info = detail.timeData.filter(function (item) {
                return item.id === parseInt(id)
            })
            let html = calendarMethods.insertDetailHTML(info, date)
            $('.js-meeting-content').empty()
            $('.js-meeting-content').append(html)
            $('.js-meeting-content').attr('data-detail', id)
            $('.js-meeting-content').removeClass('hide').siblings().addClass('hide')

            $('.cal-content-detail').removeClass('hide')
            calendarClickEvent.handleCloseDetail()
            calendarClickEvent.handleDateDelete()
            // 修改会议
            calendarClickEvent.handleDateUpdate()
        },
        // 关闭提示卡片
        handleCloseDetail: function () {
            $('.cal-content-detail').on('click', function (event) {
                let target = event.target
                let name = target.className
                if (name.includes('cal-content-detail') || name.includes('js-close-detail')) {
                    $('.cal-content-detail').addClass('hide')
                    $('.dateTimeWrap').addClass('hide')
                }
            })
        },
        // 登录授权
        handleAuthority: function (id) {
            // let sigs = getCookie('userSigs')
            let sigs = window.sessionStorage.userSigs
            console.log(window.sessionStorage);
            // 判断是否 有权限
            // sig 是数组，数组不为空，即有数据
            if ((sigs === undefined)) {
                // 未登录，直接登录
                // 说明页面无状态
                // requestMethods.meetingLogin()

                if (id !== undefined) {
                    requestMethods.meetingCheck(id)
                }

            } else if (sigs.length <= 0 ) {
                // 已登录，无权限
                // //登录之后，调用 user 接口，获取用户信息
                // requestMethods.meetingLogin()
                $('.js-no-authority').removeClass('hide').siblings().addClass('hide')
            } else {
                // 有权FIFO限
                $('.cal-content-detail').removeClass('hide')
                $('.js-reverse-content').removeClass('hide').siblings().addClass('hide')
            }
        },
        // 点击登录按钮，跳转 gitee 登录
        handleLogin: function (id) {
            $('.meeting-login').unbind('click')
            $('.meeting-login').click(function (event) {
                // window.location.href = 'https://gitee.com/oauth/authorize?client_id=c5b7a0d3b370e7ec56e0343a777e6dd91059929e7b7379b8c7691feca159fcd1&redirect_uri=http://119.8.32.82/opengauss/gitee_back/&response_type=code'
                requestMethods.giteeLogin()
                calendarClickEvent.handleAuthority(id)
                calendarClickEvent.handleCloseDetail()
            })
        },
        // 点击预定按钮，提示用户登录
        handleReserve: function () {
            $('.js-reserve-meeting').on('click', function (event) {
                //清空表单
                calendarMethods.emptyFormDate()
                calendarClickEvent.handleCloseDetail()
                $('.dateTimeWrap').removeClass('hide')
                let isLogined = calendarMethods.isLogin()
                log('isLogined?', isLogined)
                if (isLogined) {
                    // 已登录
                    let storage = calendarMethods.getStorage()
                    let isAuthoritied = calendarMethods.isAuthority(storage.userSigs)

                    if (isAuthoritied) {
                        // 有权限
                        calendarMethods.initFormData(storage)
                        $('.cal-content-detail').removeClass('hide')
                        calendarClickEvent.handleCloseDetail()
                        // 绑定会议信息提交事件
                        calendarClickEvent.handleDateSubmit('submit')
                    } else {
                        // 无权限
                        $('.cal-content-detail').removeClass('hide')
                        $('.js-no-authority').removeClass('hide').siblings().addClass('hide')
                    }
                }
            })
        },
        // 点击会议录制按钮
        handleRecodeBtn: function() {
            $('.js-meeting-record').on('click', function(event) {
                let src = $('.js-meeting-record').attr('src')
                if (src.includes('off')) {
                    $('.js-meeting-record').attr('src', "/img/calendar/record-on.png")
                } else {
                    $('.js-meeting-record').attr('src', "/img/calendar/record-off.png")
                }
            })
        },
        // 点击时间上下切换
        bindTimePicker: function () {
            let currentTime = this.getNowTime()

            $('#J-demo-01').dateTimePicker({
                limitMin: currentTime.year + '-' + currentTime.month + '-' + currentTime.day
            });
            $("#time-start").datetime({
                type:"time",
                value:[currentTime.hour, currentTime.minute === 0 ? 1 : currentTime.minute],
            })
            $("#time-start").val(currentTime.hour + ':' + currentTime.minute)

            $("#time-end").datetime({
                type:"time",
                value:[currentTime.hour, currentTime.minute === 0 ? 1 : currentTime.minute],
            })
            $("#time-end").val(currentTime.hour + ':' + currentTime.minute)

        },
        getNowTime: function () {
            let dateTime
            let yy = new Date().getFullYear()
            let mm = new Date().getMonth() + 1
            let dd = new Date().getDate()
            let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds()
            dateTime = {
                year: yy,
                month: mm,
                day: dd,
                hour: hh,
                minute: mf,
                second: ss
            }

            return dateTime
        },
        getFormData: function () {
            let require = {
                formdata: {},
                errorTime: function () {
                    let s = this.formdata.start
                    let e = this.formdata.end

                    s = parseInt(s) + parseInt(s.split(':')[1]) / 100
                    e = parseInt(e) + parseInt(e.split(':')[1]) / 100

                    // 开始时间 大于 结束时间返回 true, 同时两者均不为 NaN
                    let r = (s >= e) && (s !== NaN) && (e !== NaN)
                    return r
                },
                errorInfo: function () {
                    // 必填项 未填写完整 返回 true
                    let _self = this.formdata
                    return (
                        _self.topic === undefined ||
                        _self.sponsor === undefined ||
                        _self.group_name === undefined ||
                        _self.date === undefined
                    )
                }
            }

            // 主题 -会议名称
            require.formdata.topic = $('#id-meeting-name').val()
            // 发起人
            require.formdata.sponsor = $('#id-meeting-creator').val()
            // sig组
            require.formdata.group_name = $('#id-meeting-sig').find('option:selected').text()
            // 会议日期
            require.formdata.date = $('#J-demo-01').val()
            // 开始时间
            require.formdata.start = $('#time-start').val()
            // 结束时间
            require.formdata.end = $('#time-end').val()
            // 议程 - 会议内容
            require.formdata.agenda = $('#id-meeting-content').val()
            // 邮件列表
            require.formdata.emaillist = $('#id-meeting-email').val()
            require.formdata.etherpad = $('#js-meeting-etherpad').val()

            let src = $('.js-meeting-record').attr('src')
            require.formdata.record = src.includes('off') ? '' : 'cloud'

            if (require.errorTime()) {
                calendarMethods.remindError('请输入正确的时间')

                return false
            } else if (require.errorInfo()) {
                calendarMethods.remindError('请输入必填项')
                return false
            }

            return require
        },
        // 预定会议
        handleDateSubmit: function (eventName) {
            $(".date-submit").unbind("click");
            $('.date-submit').click(function () {
                let require = calendarClickEvent.getFormData().formdata
                if (require !== undefined) {
                    if (eventName === 'modify') {
                        // 执行会议预定
                        let mid = $('.js-meeting-content').find('.mid').text()
                        requestMethods.meetingUpdate(mid, require)
                    } else if (eventName === 'submit') {
                        // 执行会议预定
                        requestMethods.meetingReserve(require)
                    }

                }
            })

            // 重置表单信息
            $('.date-reset').on('click', function () {

                // 主题 -会议名称
                $('#id-meeting-name').val('')

                // 会议日期
                $('#J-demo-01').val('')

                // 议程 - 会议内容
                $('#id-meeting-content').val('')
                // 邮件列表
                $('#id-meeting-email').val('')
                $('#js-meeting-etherpad').val('')
            })
        },
        // 删除会议
        handleDateDelete: function () {
            $('.date-delete').on('click', function () {
                let isLogined = calendarMethods.isLogin()
                // 判断权限
                if (isLogined) {
                    // 已登录
                    let storage = calendarMethods.getStorage()
                    let giteeID = $('.creator-name').text()
                    let isAuthoritied = calendarMethods.isSelfLogin(giteeID)
                    if (isAuthoritied) {
                        // 有权限
                        $('.js-delete-check').removeClass('hide').siblings().addClass('hide')
                    } else {
                        // 无权限
                        $('.cal-content-detail').removeClass('hide')
                        $('.js-no-edit').removeClass('hide').siblings().addClass('hide')
                    }
                }
            })
        },
        handleDeleteCheck: function () {
          $('.delete-cancel').on('click', function () {
              // 取消删除
              $('.cal-content-detail').addClass('hide')
          })
            $('.delete-confirm').on('click', function () {
                // 确认删除
                let mid = $('.js-meeting-content').find('.mid').text()
                requestMethods.meetingDelete(mid)
            })
        },
        // 修改会议
        handleDateUpdate: function () {
            $('.date-modify').unbind("click");
            $('.date-modify').click(function() {
                let id = $('.js-meeting-content').attr('data-detail')
                //清空表单
                calendarMethods.emptyFormDate()
                $('.dateTimeWrap').removeClass('hide')
                let isLogined = calendarMethods.isLogin(id)
                // 判断权限
                if (isLogined) {
                    // 已登录
                    let storage = calendarMethods.getStorage()
                    let giteeID = $('.creator-name').text()
                    let isAuthoritied = calendarMethods.isSelfLogin(giteeID, id)
                    if (isAuthoritied) {
                        // 有权限
                        calendarMethods.initFormData(storage)
                        calendarClickEvent.handleCloseDetail()
                        // 绑定会议信息提交事件
                        calendarClickEvent.handleDateSubmit('modify')
                        $('.cal-content-detail').removeClass('hide')
                    } else {
                        // 无权限
                        $('.js-no-edit').removeClass('hide').siblings().addClass('hide')
                    }
                }
            })
        },
        handleSigs: function () {
            $('#id-select-sigs').on('change', function () {
                let sig = $('#id-select-sigs').find('option:selected').text()
                let request = {
                    group: sig
                }
                if (sig === 'All') {
                    requestMethods.meetingData()

                } else {
                    requestMethods.meetingData(request)
                }
            })

        }
    }

    var requestMethods = {
        meetingData: function (data){
            $.ajax({
                type: "GET",
                url: '/calendar/opengauss/meetingsdata/',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    cleanData.dataJSON = res
                    initMeeting()
                }
            });
        },
        giteeLogin: function () {
            $.ajax({
                type: "GET",
                url: '/calendar/opengauss/gitee_login/',
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    log('res in login', res)

                    let url = 'https://gitee.com/oauth/authorize?client_id='+ res.client_id +'&redirect_uri=' + res.redirect_url + '&response_type=code'
                    log('url', url)
                    window.location.href = url
                }
            });
        },
        meetingLogin: function (data){
            $.ajax({
                type: "GET",
                url: '/calendar/opengauss/user/',
                headers: {
                    withCredentials: true,
                },
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    // 判断是否登录
                    if (res.code === 200) {
                        // 判断是否有权限
                        console.log('res', res);
                        let sigs = res.data.sigs.join(',')
                        log('sigs', sigs)
                        log('')
                        // let info = {
                        //     userSigs: sigs,
                        //     giteeId: res.data.user.gitee_id,
                        //     userId: res.data.user.id
                        // }
                        // setCookie('userSigs', info.userSigs)
                        // setCookie('giteeId', info.giteeId)
                        // setCookie('userId', info.userId)

                        window.sessionStorage.userSigs = sigs
                        window.sessionStorage.giteeId = res.data.user.gitee_id
                        window.sessionStorage.userId = res.data.user.id
                        console.log('session', window.sessionStorage);

                        // calendarMethods.initFormData(info)
                        calendarMethods.initFormData(window.sessionStorage)
                        if (res.data.sigs.length > 0) {
                            // 有权限, 不操作
                            // $('.js-reverse-content').removeClass('hide').siblings().addClass('hide')
                        } else {
                            // 无权限
                            $('.cal-content-detail').removeClass('hide')
                            $('.js-no-authority').removeClass('hide').siblings().addClass('hide')
                        }
                        calendarClickEvent.handleCloseDetail()
                    } else  {
                        // 登录
                        $('.js-no-login').removeClass('hide').siblings().addClass('hide')
                        $('.js-no-authority').removeClass('hide').siblings().addClass('hide')
                        calendarClickEvent.handleCloseDetail()
                    }
                }
            });
        },
        meetingReserve: function (data){
            $.ajax({
                type: "POST",
                url: '/calendar/opengauss/meetings/',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === 201) {
                        // 预定成功！
                        $('.js-success-reverse').removeClass('hide').siblings().addClass('hide')
                        calendarMethods.mid = res.mid
                        requestMethods.meetingData()
                    } else {
                        // 预定失败
                        $('.js-fail-reverse').find('.fail-info').text(res.msg)
                        $('.js-fail-reverse').removeClass('hide').siblings().addClass('hide')
                        calendarMethods.remindError(res.message)
                    }
                }
            });
        },
        meetingDelete: function(mid) {
            $.ajax({
                type: "DELETE",
                url: `/calendar/opengauss/meeting/action/delete/${mid}/`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === 204) {
                        $('.js-delete-success').removeClass('hide').siblings().addClass('hide')
                    } else {
                        $('.js-fail-modify').find('.fail-info').text(res.msg)
                        $('.cal-content-detail').addClass('hide')
                    }
                }
            });
        },
        meetingUpdate: function (mid, data){
            $.ajax({
                type: "PUT",
                data: JSON.stringify(data),
                url: `/calendar/opengauss/meeting/action/update/${mid}/`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === 204) {
                        $('.js-modify-success').removeClass('hide').siblings().addClass('hide')
                    } else {
                        $('.js-fail-modify').find('.fail-info').text(res.msg)
                        $('.js-fail-modify').removeClass('hide').siblings().addClass('hide')
                        calendarMethods.backToReverse()
                    }

                }
            });
        },
        // 创建会议后查看会议调用的接口
        meetingCheck: function(id, isModified) {
            $.ajax({
                type: "GET",
                url: `/calendar/opengauss/meeting/${id}/`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (isModified) {
                        let d = []
                        d.push(calendarMethods.cleanResponse(res))
                        let e = res.date
                        let html = calendarMethods.insertDetailHTML(d, e)
                        $('.js-meeting-content').empty()
                        $('.js-meeting-content').append(html)
                        $('.js-meeting-content').removeClass('hide').siblings().addClass('hide')
                        requestMethods.meetingData()
                    } else {
                        // 主题 -会议名称
                        $('#id-meeting-name').val(res.topic)
                        $('#id-meeting-creator').val(res.sponsor)
                        // sig组
                        $("#id-meeting-sig").get(0).selectedIndex=0;
                        // 会议日期
                        $('#J-demo-01').val(res.date)
                        // 议程 - 会议内容
                        $('#id-meeting-content').val(res.agenda)
                        // 邮件列表
                        $('#id-meeting-email').val(res.emaillist)
                        $('#js-meeting-etherpad').val(res.etherpad)
                        $('#time-start').val(res.start)
                        $('#time-end').val(res.end)
                        $('.js-reverse-content').removeClass('hide').siblings().addClass('hide')
                    }
                }
            });
        },
        meetingSig: function(data) {
            $.ajax({
                type: "GET",
                url: '/calendar/opengauss/groups/',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    res.forEach(item => {
                        $('#id-select-sigs').append('<option value="' + item.name  + '">' + item.name + '</option>')
                    })
                }
            });
        }
    }
    const meetingDate = function () {
        let dataJSON = cleanData.dataJSON
        let data = dataJSON.tableData

        data = cleanData.calendarSortData(data)
        data = cleanData.getOriginData(data)

        // 时间初始化 上移 576px  transform: translateY(-576px);
        // 每次上移或下移，移动 56 + 16 px,其中 56 是高度， 16 是边距

        // 这个公式是移到数组最左
        // 日期初始化 往左移 -(len - 4) * (220 + 24) + 12px
        // len 是日期列表长度
        // 4 是保留 4 个可视日期
        // 220 是日期宽度
        // 24 是日期右边距
        // 12 是留出 12px 内边距

        // 需要移到当前日期 + 1 个位置

        // 渲染日期数据
        let top = ''

        $('.js-meet-day').empty()
        let isMobile = document.body.clientWidth < 1000
        let currentTime = calendarClickEvent.getNowTime().day
        let currentIndex = 0
        let prevIndex = 0
        let lastIndex = 0
        data.forEach((item, index) => {
            let day = item.date.split('-')[2];
            let active = currentTime === parseInt(day) ? 'active' : ''
            top += `<p class="day-item ${active}">${item.date}</p>`

            if (currentTime === parseInt(day)) {
                currentIndex = index
            }
            if ((currentIndex === 0) && (currentTime < parseInt(day))) {
                prevIndex = prevIndex ? prevIndex : index - 1
            }
            if (currentIndex === 0) {
                lastIndex = index
            }
        })
        $('.js-meet-day').append(top)
        // 左移议程
        let len = (currentIndex ? currentIndex : prevIndex ? prevIndex : lastIndex) + 1
        let w = isMobile ? 185 : 220;
        // 议程长度，跟数据长度有关
        let width = data.length * (w + 24);
        // 设置 打横日期长度
        $('.js-meet-day').css('width', width);
        $('.js-schedule-content').css('width', width);

        let trans = 0
        let origin = parseInt($('.js-schedule-content').css('transform').split(',')[5])

        if (isMobile) {
            len -= 1
            // 左移距离，跟当前日期有关，
            trans = -len * (w + 24) + 12
            $('.calendar').show()
        } else if (data.length > 4) {
            // 左移距离，跟当前日期有关，
            trans = -(len - 4) * (w + 24) + 12

            $('.calendar').show()
        } else if (data.length === 0) {
            // 暂无数据
        } else {
            $('.calendar').show()
            $('.cal-content-detail').show()
        }
        $('.js-meet-day').css('transform', `matrix(1, 0, 0, 1, ${trans}, 0)`)
        $('.js-schedule-content').css('transform', `matrix(1, 0, 0, 1, ${trans}, ${origin})`)
        let pcSize = -(data.length - 4) * (w + 24) + 12
        let mobileSize = -(data.length - 1) * (w + 24) + 12
        let size = isMobile ? mobileSize : pcSize
        calendarClickEvent.daySwiper(size)

        calendarMethods.insertRowHTML(data)

        $('.js-data-check').on('click', function () {
            let id = $('.js-meeting-content').attr('data-detail')
            // 查看创建成功后的会议
            requestMethods.meetingCheck(id, true)
        })
    }
    const getCookie = function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;

    };
    const setCookie = function (name, value) {
        var currentTime = new Date();
        currentTime.setTime(currentTime.getTime() + 24 * 60 * 60 * 1000);
        var newCookie = name + '=' + value + ';expires=' + currentTime.toGMTString() + ';path=/';
        document.cookie = newCookie;
    }
    const deleteCookie = function (name, value) {
        var currentTime = new Date();
        currentTime.setTime(currentTime.getTime() + 30 * 24 * 60 * 60 * 1000);
        var newCookie = name + '=' + value + ';expires=Thu, 01 Jan 1970 00:00:00 UTC' + ';path=/';
        document.cookie = newCookie;
    }
    const initMeeting = function () {
        // 日期初始化，并渲染日历数据
        meetingDate()
        // 日历详情事件
        calendarClickEvent.detailSwiper()
    }
    // 页面初始化
    const initPage = function () {
        // 渲染时间
        calendarMethods.insertTimeList()
        // 绑定议程切换事件
        calendarClickEvent.timeSwiper()
        // 绑定日期时间选择器
        calendarClickEvent.bindTimePicker()
        // 绑定会议预定表单事件
        calendarClickEvent.handleReserve()
        // 绑定是否录制
        calendarClickEvent.handleRecodeBtn()
        // 删除检测事件（确认删除、取消删除）
        calendarClickEvent.handleDeleteCheck()
        // 绑定 sig 组切换
        calendarClickEvent.handleSigs()
    }

    var __calendarMain = function () {
        // 请求日历数据
        requestMethods.meetingData()
        // 请求sig组数据
        requestMethods.meetingSig()
        initPage()
        $('#clean').on('click', function () {
            window.localStorage.clear()
        })
        $('#cleancookie').on('click', function () {
            deleteCookie('userSigs', "");
            deleteCookie('giteeId', "");
            deleteCookie('userId', "");
            deleteCookie('access_token', '')
        })
        $('#setCookie').on('click', function () {
            setCookie('userSigs', '')
            setCookie('giteeId', 'lesliexx')
            setCookie('userId', 'Leslie-L')
        })
        $('#setYCookie').on('click', function () {
            setCookie('userSigs', 'template')
            setCookie('giteeId', 'lesliexx')
            setCookie('userId', 'Leslie-L')
        })

        let access = getCookie('access_token')
        if (access !== null) {
            requestMethods.meetingLogin()
        }
        // setCookie('access_token', 'b6051205eb841b9968f1491f2e71175e')
        // requestMethods.meetingLogin()
    }
    __calendarMain()
})