$(document).ready(function () {
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
            require: lang === 'zh' ? '请完成所有必填项' : 'Please enter all required fields',
            netError: lang === 'zh' ? '服务开小差' : 'Network Error, please try again later.'
        },
        formatTime: function (time) {
            let arr = time.split('-');
            arr[0] = parseInt(arr[0].split(':')[0]);
            arr[1] = parseInt(arr[1].split(':')[0]);
            return arr;
        },
        // 筛选出指定 id 的数据
        filterWithId: function (id) {
            let data = cleanData.dataJSON.tableData;
            let current = data.filter(function (day) {
                let dayData = day.timeData.filter(function (time) {
                    return time.id === parseInt(id);
                })
                return dayData.length > 0;
            })
            return current[0];
        },
        insertContentHTML: function(data) {
            let item = data;
            let t = "";
            t += '<div class="content-meeting" data-id="' + item.id + '">';
            t += '<p data-id="' + item.id + '">' + escapeHTML(item.name) + '</p>';
            t += '<p class="hovered" data-id="' + item.id + '">' + escapeHTML(this.fontmatter.time + item.startTime +'-' + item.endTime) + '</p>';

            if (item.video_url === null) {
                t += `<img src="/img/calendar/video_gray.svg" alt="video-gray">`;
            } else if (item.video_url !== '' ) {
                t += `<img src="/img/calendar/video_icon.svg" alt="video">`;
            }
            t += '</div>';
            return t;
        },
        insertListHTML: function (data, key) {
            let t = "";
            Object.entries(data.dealDate).forEach(function (item) {
                let key = item[0];
                let value = item[1];
                if (value.data.length > 0) {
                    let d = value.data[0];
                    let start = key;
                    start = Number(start.split(':')[0]);
                    let top = (start + 1) * (16 + 56);
                    let height = (56) * d.duration + 16 * (d.duration - 1);
                    let width = value.data.length * 220;
                    let isShow = value.data.length > 1 ? 'show' : '';
                    t += `<div class="list-inner-box"  style="height: ${height}px; top: ${top}px;">`;
                    t += `<span class="left btnMy ${isShow}" style="height: ${height}px;line-height: ${height}px;"> < </span>`;
                    t += `<span class="right btnMy ${isShow}" style="height: ${height}px;line-height: ${height}px;"> > </span>`;
                    t += `<span class="index btnMy ${isShow}"> 1 / ${value.data.length}</span>`;
                    t += `<div class="inner-list" style="width: ${width}px; height: ${height}px;">`;
                    for (let i = 0; i < value.data.length; i++) {
                        let item = value.data[i];
                        t += calendarMethods.insertContentHTML(item);
                    }
                    t += '</div></div>';
                }
            });
            return t;
        },
        insertDealHTML: function (data) {
            let t = `<div class="list-content">`;
            for (let i = 0; i < data.length; i++) {
                let e = data[i];
                let key = Number(e.startTime.split(':')[1]) > 0 ? e.startTime.split(':')[0] + ':00' : e.startTime;
                t += calendarMethods.insertListHTML(e, key);
            }
            t += '</div>';
            return t;
        },
        insertRowHTML: function (data) {
            let t = "";
            $('.js-schedule-content').empty();
            for (let i = 0; i < data.length; i++) {
                let day = data[i].date;
                let list = data[i].timeDate;
                t = `<div class="row-list" data-day="${day}">`;
                let l = calendarMethods.insertDealHTML(list);
                t += l;
                t += '</div>';
                $('.js-schedule-content').append(t);
            }
        },
        insertDetailListHTML: function (name, value, className, img) {
            let t = "";
            if (value !== undefined) {
                if ( value !== null && value.includes('http')) {
                    t = '<ul>' +
                        '<li>' + name + '</li>' +
                        '<li><a class="detail-' + className +'" href="' + value + '" target="_blank">' + value + '</a></li>' +
                        '</ul>'
                } else if (value !== '') {
                    let c = name.toLowerCase().includes('id') ? 'mid' : 'detail-' + className;
                    t = '<ul>' +
                        '<li>' + name + '</li>';
                    t += img !== undefined
                        ? '<img class="creator-icon" src="' + img + '">' + '<li class="creator-name">' + value + '</li>' + '</ul>'
                        : '<li class="'+ c + '">' + value + '</li>' + '</ul>';
                }
            }
            return t;

        },
        insertDetailHTML: function (data, date) {
            let info = data[0];
            let duration = escapeHTML(info.startTime) + '-' + escapeHTML(info.endTime);
            let t = '<h5 class="meeting-name">' + escapeHTML(info.name) +'</h5>';
            t += this.insertDetailListHTML(this.fontmatter.creator, escapeHTML(info.creator), 'creator', info.url);
            t += this.insertDetailListHTML(this.fontmatter.sig, escapeHTML(info.group_name), 'sig');
            t += this.insertDetailListHTML(this.fontmatter.day, escapeHTML(date), 'day');
            t += this.insertDetailListHTML(this.fontmatter.time, escapeHTML(duration), 'time');
            t += this.insertDetailListHTML(this.fontmatter.content, escapeHTML(info.detail), 'content');
            t += this.insertDetailListHTML(this.fontmatter.zoomId, escapeHTML(info.meeting_id), 'zoomId');
            t += this.insertDetailListHTML(this.fontmatter.zoomLink, escapeHTML(info.join_url), 'zoomLink');
            t += this.insertDetailListHTML(this.fontmatter.etherpad, escapeHTML(info.etherpad), 'etherpad');
            t += this.insertDetailListHTML(this.fontmatter.video, escapeHTML(info.video_url), 'video');
            t += '<div class="reverse-submit">' +
                '<p class="date-delete cursor">' + this.fontmatter.delete + '</p>' +
                '<p class="date-modify cursor">' + this.fontmatter.modify + '</p>' +
                '</div>';

            t += '<p class="notice-content">' +
                '<img src="/img/calendar/notice.png" alt="notice">' +
                this.fontmatter.detailTip +
                '</p>';
            return t;
        },
        insertTimeList: function() {
            let currentTime = calendarClickEvent.getNowTime().hour;
            let t = '';
            for (let i = 0; i < 24; i++) {
                currentTime = parseInt(currentTime);
                let active = currentTime === i ? 'active' : '';
                t += '<p class="det-item ' + active +'">' + i + ':00-' + (i + 1) + ':00 </p>';
            }
            $('.time-swiper').append(t);
        },
        emptyFormDate: function() {
            $('#id-meeting-name').val('');
            $('#id-meeting-creator').val('');
            $('#id-meeting-sig').val('');
            $('#J-demo-01').val('');
            $('#time-start').val('');
            $('#time-end').val('');
            $('#id-meeting-content').val('');
            $('#id-meeting-email').val('');
            $('#js-meeting-etherpad').val('');
        },
        // 判断是否登录
        isLogin: function(id) {
            let userSigs = window.sessionStorage.userSigs;
            if (userSigs !== undefined) {
                return true;
            } else {
                $('.cal-content-detail').removeClass('hide');
                $('.js-no-login').removeClass('hide').siblings().addClass('hide');
                calendarClickEvent.handleLogin(id);
                return false;
            }
        },
        // 判断是否有权限
        isAuthority: function (userSigs, id) {
            if (userSigs !== '') {
                if (id !== undefined) {
                    requestMethods.meetingCheck(id);
                } else {
                    $('.js-reverse-content').removeClass('hide').siblings().addClass('hide');
                }
                return true;
            } else  {
                $('.cal-content-detail').removeClass('hide');
                $('.js-no-authority').removeClass('hide').siblings().addClass('hide');
                return false;
            }
        },
        // 删除修改会议是，判断是否是本人的权限
        isSelfLogin: function (name, id) {
            let giteeid = window.sessionStorage.giteeId;
            if (giteeid === name) {
                if (id !== undefined) {
                    requestMethods.meetingCheck(id);
                } else {
                    $('.js-reverse-content').removeClass('hide').siblings().addClass('hide');
                }
                return true;
            } else  {
                $('.cal-content-detail').removeClass('hide');
                $('.js-no-edit').removeClass('hide').siblings().addClass('hide');
                return false;
            }
        },
        backToReverse: function () {
            $('.js-back-reverse').on('click', function () {
                $('.dateTimeWrap').removeClass('hide');
                $('.js-reverse-content').removeClass('hide').siblings().addClass('hide');
            })
        },
        // 提示语
        remindError: function (element, info) {
            $('.cal-content-detail').removeClass('hide');
            $(element).find('.fail-info').text(info);
            $(element).removeClass('hide').siblings().addClass('hide');
            calendarMethods.backToReverse();
        },
        initFormData: function(data) {
            let userSigs = data.userSigs.split(',');
            let currentTime = calendarClickEvent.getNowTime();
            $('#id-meeting-creator').val(data.giteeId);
            $("#time-start").val(currentTime.hour + ':' + currentTime.minute);
            $("#time-end").val(currentTime.hour + ':' + currentTime.minute);
            $('#id-meeting-sig').empty();
            userSigs.forEach(item => {
                $('#id-meeting-sig').append('<option value="' + item + '">' + item + '</option>');
            });
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
                date: data.date,
                meeting_id: data.mid,
                video_url: data.video_url ? data.video_url : ''
            }
            return o;
        },
        getStorage: function() {
            let storage = {
                userSigs: window.sessionStorage.userSigs,
                giteeId: window.sessionStorage.giteeId,
                userId: window.sessionStorage.userId
            }
            return storage;
        }
    };
    var cleanData = {
        dataJSON: {},
        unique: function(arr) {
            return Array.from(new Set(arr));
        },
        sliceTime: function (arr, timeStart, timeEnd) {
            return arr.every(meetingItem => {
                let meetingStart = calendarMethods.formatTime(meetingItem.duration_time)[0];
                let meetingEnd = calendarMethods.formatTime(meetingItem.duration_time)[1];
                return (
                    (timeEnd <= meetingStart) ||
                    (timeStart >= meetingEnd)
                );
            })
        },
        sortTime: function (arr, indexTemp) {
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
            return arr
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
                        let findItem = cleanData.sliceTime(arr, timeStart, timeEnd)
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
                    arr = cleanData.sortTime(arr, indexTemp)
                })
                dateItem.timeDate = arr;
            })
            return data;
        },
        dealOriginData: function (item) {
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
                            let times = i + ":00";
                            for (const key in item1.dealDate) {
                                if (key === times) {
                                    item1.dealDate[key].push(item2);
                                }
                            }
                        }
                    });
                    for (const key in item1.dealDate) {
                        let datas = cleanData.unique(item1.dealDate[key]);
                        item1.dealDate[key] = datas;
                    }
                } else {
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
                cleanData.dealOriginData(item)
            });
            return data;

        },
    };
    var calendarClickEvent = {
        swiper: {
            up: -9,
            left: 0,
            checked: true,
        },
        // 时间上下切换
        timeSwiper: function () {
            var timer1 = null;
            var timer2 = null;
            $('.js-up-btn').on('click', function (event) {
                clearTimeout(timer1);
                timer1 = setTimeout(function () {
                    calendarClickEvent.handleRowBtn('up');
                }, 100);
            });
            $('.js-down-btn').on('click', function (event) {
                clearTimeout(timer2);
                timer2 = setTimeout(function () {
                    calendarClickEvent.handleRowBtn('down');
                }, 100);
            });
        },
        // 日期左右切换
        daySwiper: function (size) {
            var timer1 = null;
            var timer2 = null;
            $('.js-left-btn').on('click', function (event) {
                clearTimeout(timer1);
                timer1 = setTimeout(function () {
                    calendarClickEvent.handleLineBtn('left');
                }, 500);
            });
            $('.js-right-btn').on('click', function (event) {
                clearTimeout(timer2);
                timer2 = setTimeout(function () {
                    calendarClickEvent.handleLineBtn('right', size);
                }, 500);
            });
        },
        // 详情页左右切换
        detailSwiper: function () {
            let timer = null;
            $('.list-inner-box').on('click', function (event) {
                let _self = $(this);
                clearTimeout(timer);
                timer = setTimeout(function () {
                    let target = event.target;
                    let text = _self.find('.index').text().split('/');
                    let current = parseInt(text[0]);
                    let total = parseInt(text[1]);
                    let currentLeft = parseInt(_self.find('.inner-list').css('transform').split(',')[4]);
                    let left = null;
                    if (target.className.includes('right')) {
                        if (current < total) {
                            left = currentLeft - 220;
                            current += 1;
                        }
                    } else if (target.className.includes('left')) {
                        if (current > 1) {
                            left = currentLeft + 220;
                            current -= 1;
                        }
                    } else {
                        let id = target.dataset.id;
                        calendarClickEvent.handleDetail(id);
                    }
                    _self.find('.inner-list').css('transform', `matrix(1, 0, 0, 1, ${left}, 0)`);
                    _self.find('.index').text(`${current} / ${total}`);
                }, 500);
            });
        },
        handleRowBtn: function (direction) {
            let trans;
            let contentTrans = $('.js-schedule-content').css('transform');
            let origin = parseInt(contentTrans.split(',')[4]);
            if (direction === 'up') {
                if (this.swiper.up < 0) {
                    this.swiper.up += 1;
                    trans = (56 + 16) * this.swiper.up;
                    $('.js-down-btn').find('img').attr('src', '/img/calendar/btn.svg');
                } else {
                    $('.js-up-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
                }
            } else {
                if (this.swiper.up > -15) {
                    this.swiper.up -= 1;
                    trans = (56 + 16) * this.swiper.up;
                    $('.js-up-btn').find('img').attr('src', '/img/calendar/btn.svg');
                } else {
                    $('.js-down-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
                }
            }
            $('.time-swiper').css('transform', `matrix(1, 0, 0, 1, 0, ${trans})`);
            $('.js-schedule-content').css('transform', `matrix(1, 0, 0, 1, ${origin}, ${trans - 72})`);
        },
        handleLineBtn: function (direction, size) {
            let trans = $('.js-meet-day').css('transform',);
            let contentTrans = $('.js-schedule-content').css('transform');
            let origin = parseInt(contentTrans.split(',')[5]);
            let width = document.body.clientWidth < 1000 ? 185 : 220;
            trans = parseInt(trans.split(',')[4]);
            contentTrans = parseInt(contentTrans.split(',')[4]);

            if (direction === 'left') {
                if (trans < 0) {
                    trans += (width + 24);
                    contentTrans += (width + 24);
                    if (trans <= -232) {
                        $('.js-right-btn').find('img').attr('src', '/img/calendar/btn.svg');
                    }
                    else {
                        $('.js-left-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
                    }
                }
            } else {
                if (trans > size) {
                    trans -= (width + 24);
                    contentTrans -= (width + 24);
                    if (trans >= size + 244) {
                        $('.js-left-btn').find('img').attr('src', '/img/calendar/btn.svg');
                    }else {
                        $('.js-right-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
                    }
                }
            }
            $('.js-meet-day').css('transform', `matrix(1, 0, 0, 1, ${trans}, 0)`);
            $('.js-schedule-content').css('transform', `matrix(1, 0, 0, 1, ${contentTrans}, ${origin})`);
        },
        handleDetail: function (id) {
            let detail = calendarMethods.filterWithId(id);
            let date = detail.date;
            let info = detail.timeData.filter(function (item) {
                return item.id === parseInt(id);
            });
            let html = calendarMethods.insertDetailHTML(info, date);
            $('.js-meeting-content').empty();
            $('.js-meeting-content').append(html);
            $('.js-meeting-content').attr('data-detail', id);
            $('.js-meeting-content').removeClass('hide').siblings().addClass('hide');

            $('.cal-content-detail').removeClass('hide');
            calendarClickEvent.handleDateDelete();
            calendarClickEvent.handleDateUpdate();
        },
        handleCloseDetail: function () {
            $('.cal-content-detail').on('click', function (event) {
                let target = event.target;
                let name = target.className;
                if (name.includes('cal-content-detail') || name.includes('js-close-detail')) {
                    $('.cal-content-detail').addClass('hide');
                    $('.dateTimeWrap').addClass('hide');
                }
            });
        },
        handleClose: function () {
            $('.js-close-detail').on('click', function (event) {
                $('.cal-content-detail').addClass('hide');
                $('.dateTimeWrap').addClass('hide');
            })
        },
        handleAuthority: function (id) {
            let sigs = window.sessionStorage.userSigs;
            if ((sigs === undefined)) {
                if (id !== undefined) {
                    requestMethods.meetingCheck(id);
                }
            } else if (sigs.length <= 0 ) {
                $('.js-no-authority').removeClass('hide').siblings().addClass('hide');
            } else {
                $('.cal-content-detail').removeClass('hide');
                $('.js-reverse-content').removeClass('hide').siblings().addClass('hide');
            }
        },
        handleLogin: function (id) {
            $('.meeting-login').unbind('click');
            $('.meeting-login').click(function (event) {
                requestMethods.giteeLogin();
                calendarClickEvent.handleAuthority(id);
            })
        },
        handleReserve: function () {
            $('.js-reserve-meeting').on('click', function (event) {
                calendarMethods.emptyFormDate();
                $('.date-submit').css('background', '#C7CAD0');
                $('.js-email-checked').addClass('hide');
                let isLogined = calendarMethods.isLogin();
                if (isLogined) {
                    let storage = calendarMethods.getStorage();
                    let isAuthoritied = calendarMethods.isAuthority(storage.userSigs);
                    if (isAuthoritied) {
                        calendarMethods.initFormData(storage);
                        $('.cal-content-detail').removeClass('hide');
                        calendarClickEvent.handleCheckForm('submit');
                    } else {
                        $('.cal-content-detail').removeClass('hide');
                        $('.js-no-authority').removeClass('hide').siblings().addClass('hide');
                    }
                }
            });
        },
        handleRecodeBtn: function() {
            $('.js-meeting-record').on('click', function(event) {
                let src = $('.js-meeting-record').attr('src');
                if (src.includes('off')) {
                    $('.js-meeting-record').attr('src', "/img/calendar/record-on.png");
                } else {
                    $('.js-meeting-record').attr('src', "/img/calendar/record-off.png");
                }
            });
        },
        bindTimePicker: function () {
            let currentTime = this.getNowTime();
            $('#J-demo-01').dateTimePicker({
                limitMin: currentTime.year + '-' + currentTime.month + '-' + currentTime.day
            });
            $("#time-start").datetime({
                type:"time",
                value:[currentTime.hour, currentTime.minute === 0 ? 1 : currentTime.minute],
            });
            $("#time-start").val(currentTime.hour + ':' + currentTime.minute);
            $("#time-end").datetime({
                type:"time",
                value:[currentTime.hour, currentTime.minute === 0 ? 1 : currentTime.minute],
            });
            $("#time-end").val(currentTime.hour + ':' + currentTime.minute);
        },
        getNowTime: function () {
            let dateTime;
            let yy = new Date().getFullYear();
            let mm = new Date().getMonth() + 1;
            let dd = new Date().getDate();
            let hh = new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours();
            let mf = new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes();
            let ss = new Date().getSeconds() < 10 ? '0' + new Date().getSeconds() : new Date().getSeconds();
            dateTime = {
                year: yy,
                month: mm,
                day: dd,
                hour: hh,
                minute: mf,
                second: ss
            };
            return dateTime;
        },
        getFormData: function () {
            let require = {
                formdata: {},
                errorTime: function () {
                    let s = this.formdata.start;
                    let e = this.formdata.end;
                    s = parseInt(s) + parseInt(s.split(':')[1]) / 100;
                    e = parseInt(e) + parseInt(e.split(':')[1]) / 100;
                    let r = (s >= e) && (s !== NaN) && (e !== NaN);
                    return r;
                },
                errorInfo: function () {
                    let _self = this.formdata;
                    return (
                        _self.topic === '' ||
                        _self.date === ''
                    )
                }
            };
            require.formdata.topic = escapeHTML($('#id-meeting-name').val());
            require.formdata.sponsor = escapeHTML($('#id-meeting-creator').val());
            require.formdata.group_name = escapeHTML($('#id-meeting-sig').find('option:selected').text());
            require.formdata.date = escapeHTML($('#J-demo-01').val());
            require.formdata.start = escapeHTML($('#time-start').val());
            require.formdata.end = escapeHTML($('#time-end').val());
            require.formdata.agenda = $('#id-meeting-content').val() === null ? '' : escapeHTML($('#id-meeting-content').val());
            require.formdata.emaillist = $('#id-meeting-email').val() === null ? '' : escapeHTML($('#id-meeting-email').val());
            require.formdata.etherpad = $('#js-meeting-etherpad').val() === null ? '' : escapeHTML($('#js-meeting-etherpad').val());

            let src = $('.js-meeting-record').attr('src');
            require.formdata.record = src.includes('off') ? '' : 'cloud';
            if (require.errorInfo()) {
                $('.dateTimeWrap').removeClass('hide');
                return 'empty';
            } else if (require.errorTime()) {
                $('.dateTimeWrap').removeClass('hide');
                $('.mycontainer input').css('borderColor', 'red');
                $('.js-time-error').removeClass('hide');
                return false;
            } else if (require.errorTime() === false) {
                $('.mycontainer input').css('borderColor', 'rgba(0, 0, 0, 0.5)');
            }
            $('.js-time-error').addClass('hide');
            return require;
        },
        handleDateSubmit: function (eventName) {
            $(".date-submit").unbind("click");
            $('.date-submit').click(function () {
                $('.dateTimeWrap').addClass('hide');
                let require = calendarClickEvent.getFormData().formdata;
                if (require !== undefined) {
                    if (eventName === 'modify') {
                        let mid = $('.js-meeting-content').find('.mid').text();
                        requestMethods.meetingUpdate(mid, require);
                    } else if (eventName === 'submit') {
                        requestMethods.meetingReserve(require);
                    }
                }
            });
            $('.date-reset').on('click', function () {
                $('#id-meeting-name').val('');
                $('#J-demo-01').val('');
                $('#id-meeting-content').val('');
                $('#id-meeting-email').val('');
                $('#js-meeting-etherpad').val('');
            });
        },
        handleDateDelete: function () {
            $('.date-delete').on('click', function () {
                let isLogined = calendarMethods.isLogin();
                if (isLogined) {
                    let storage = calendarMethods.getStorage();
                    let giteeID = $('.creator-name').text();
                    let isAuthoritied = calendarMethods.isSelfLogin(giteeID);
                    if (isAuthoritied) {
                        $('.js-delete-check').removeClass('hide').siblings().addClass('hide');
                    } else {
                        $('.cal-content-detail').removeClass('hide');
                        $('.js-no-edit').removeClass('hide').siblings().addClass('hide');
                    }
                }
            });
        },
        handleDeleteCheck: function () {
            $('.delete-cancel').on('click', function () {
                $('.cal-content-detail').addClass('hide');
            });
            $('.delete-confirm').on('click', function () {
                let mid = $('.js-meeting-content').find('.mid').text();
                requestMethods.meetingDelete(mid);
            });
        },
        handleDateUpdate: function () {
            $('.date-modify').unbind("click");
            $('.date-modify').click(function() {
                let id = $('.js-meeting-content').attr('data-detail');
                calendarMethods.emptyFormDate();
                $('.dateTimeWrap').removeClass('hide');
                let isLogined = calendarMethods.isLogin(id);
                if (isLogined) {
                    let storage = calendarMethods.getStorage();
                    let giteeID = $('.creator-name').text();
                    let isAuthoritied = calendarMethods.isSelfLogin(giteeID, id);
                    if (isAuthoritied) {
                        calendarMethods.initFormData(storage);
                        calendarClickEvent.handleCheckForm('modify');
                        $('.cal-content-detail').removeClass('hide');
                    } else {
                        $('.js-no-edit').removeClass('hide').siblings().addClass('hide');
                    }
                }
            });
        },
        handleSigs: function () {
            $('#id-select-sigs').on('change', function () {
                let sig = $('#id-select-sigs').find('option:selected').text();
                let request = {
                    group: sig
                }
                if (sig === 'All') {
                    requestMethods.meetingData();
                } else {
                    requestMethods.meetingData(request);
                }
            });
        },
        handleCheckForm: function (status) {
            $('.js-reverse-content form').on('click', function () {
                let require = calendarClickEvent.getFormData();
                if (require !== 'empty' && (require !== false)) {
                    $('.date-submit').css('background', '#7D32EA');
                    calendarClickEvent.handleDateSubmit(status);
                } else {
                    $('.date-submit').css('background', '#C7CAD0');
                }
            });
            $('.dateTimeWrap').on('click', function (event) {
                let require = calendarClickEvent.getFormData();
                if (require !== 'empty' && (require !== false)) {
                    calendarClickEvent.handleDateSubmit(status);
                    $('.date-submit').css('background', '#7D32EA');
                } else {
                    $('.date-submit').css('background', '#C7CAD0');
                }
            });
        },
        handleCheckEmail: function () {
            $('#id-meeting-email').blur(function () {
                let val = $('#id-meeting-email').val();
                calendarClickEvent.swiper.checked = true;
                // email 为空返回true
                if (val === '') {
                    $('.js-email-checked').addClass('hide');
                    $('#id-meeting-email').css('borderColor', 'rgba(0, 0, 0, 0.5)');
                    return
                } else {
                    if (!val.includes(',') && !val.includes(';')) {
                        val += ',';
                    }
                    if (val.includes(',')) {
                        val = val.split(',');
                    } else if (val.includes(';')) {
                        val = val.split(';');
                    }
                    let reg = /^[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]*)*@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
                    val.forEach(item => {
                        if (item !== '') {
                            if ( reg.test(item) === false) {
                                $('.js-email-checked').removeClass('hide');
                                $('#id-meeting-email').css('borderColor', 'red');
                                calendarClickEvent.swiper.checked = false;
                            }
                        }
                    });
                }
                if (calendarClickEvent.swiper.checked) {
                    $('.js-email-checked').addClass('hide');
                    $('#id-meeting-email').css('borderColor', 'rgba(0, 0, 0, 0.5)');
                }
            });
        }
    };
    var requestMethods = {
        meetingData: function (data){
            $.ajax({
                type: "GET",
                url: '/calendar/meetingsdata/',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    cleanData.dataJSON = res;
                    initMeeting();
                },
                error: function () {
                    cleanData.dataJSON.tableData = [];
                    initMeeting();
                    let msg = calendarMethods.fontmatter.netError;
                    calendarMethods.remindError('.js-error-info', msg);
                }
            });
        },
        giteeLogin: function () {
            $.ajax({
                type: "GET",
                url: '/calendar/gitee_login/',
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    let url = 'https://gitee.com/oauth/authorize?client_id='+ res.client_id +'&redirect_uri=' + res.redirect_url + '&response_type=code';
                    window.location.href = url;
                }
            });
        },
        meetingLogin: function (data){
            $.ajax({
                type: "GET",
                url: '/calendar/user/',
                headers: {
                    withCredentials: true,
                },
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === 200) {
                        let sigs = res.data.sigs.join(',')
                        window.sessionStorage.userSigs = sigs
                        window.sessionStorage.giteeId = res.data.user.gitee_id
                        window.sessionStorage.userId = res.data.user.id
                    }
                },
                error: function () {
                    let msg = calendarMethods.fontmatter.netError;
                    calendarMethods.remindError('.js-no-authority', msg);
                }
            });
        },
        meetingReserve: function (data){
            $.ajax({
                type: "POST",
                url: '/calendar/meetings/',
                data: JSON.stringify(data),
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === 201) {
                        $('.js-success-reverse').removeClass('hide').siblings().addClass('hide');
                        calendarMethods.mid = res.mid;
                        requestMethods.meetingData();
                    } else {
                        let msg = lang === 'zh' ? res.msg : res.en_msg;
                        calendarMethods.remindError('.js-fail-reverse', msg);
                    }
                },
                error: function () {
                    let msg = calendarMethods.fontmatter.netError;
                    calendarMethods.remindError('.js-fail-reverse', msg);
                }
            });
        },
        meetingDelete: function(mid) {
            $.ajax({
                type: "DELETE",
                url: `/calendar/meeting/action/delete/${mid}/`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === 204) {
                        $('.js-delete-success').removeClass('hide').siblings().addClass('hide');
                        requestMethods.meetingData();
                    } else {
                        let msg = lang === 'zh' ? res.msg : res.en_msg;
                        $('.js-fail-delete').find('.fail-info').text(msg);
                        $('.cal-content-detail').addClass('hide');
                    }
                },
                error: function () {
                    let msg = calendarMethods.fontmatter.netError;
                    calendarMethods.remindError('.js-fail-delete', msg);
                }
            });
        },
        meetingUpdate: function (mid, data){
            $.ajax({
                type: "PUT",
                data: JSON.stringify(data),
                url: `/calendar/meeting/action/update/${mid}/`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (res.code === 204) {
                        $('.js-modify-success').removeClass('hide').siblings().addClass('hide');
                    } else {
                        let msg = lang === 'zh' ? res.msg : res.en_msg;
                        $('.js-fail-modify').find('.fail-info').text(msg);
                        $('.js-fail-modify').removeClass('hide').siblings().addClass('hide');
                        calendarMethods.backToReverse();
                    }
                },
                error: function () {
                    let msg = calendarMethods.fontmatter.netError;
                    calendarMethods.remindError('.js-fail-modify', msg);
                }
            });
        },
        meetingCheck: function(id, isModified) {
            $.ajax({
                type: "GET",
                url: `/calendar/meeting/${id}/`,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    if (isModified) {
                        let d = [];
                        d.push(calendarMethods.cleanResponse(res));
                        let e = res.date;
                        let html = calendarMethods.insertDetailHTML(d, e);
                        $('.js-meeting-content').empty();
                        $('.js-meeting-content').append(html);
                        $('.js-meeting-content').removeClass('hide').siblings().addClass('hide');
                        requestMethods.meetingData();
                    } else {
                        $('#id-meeting-name').val(escapeHTML(res.topic));
                        $('#id-meeting-creator').val(escapeHTML(res.sponsor));
                        $("#id-meeting-sig").get(0).selectedIndex=0;
                        $('#J-demo-01').val(escapeHTML(res.date));
                        $('#id-meeting-content').val(escapeHTML(res.agenda));
                        $('#id-meeting-email').val(escapeHTML(res.emaillist));
                        $('#js-meeting-etherpad').val(escapeHTML(res.etherpad));
                        $('#time-start').val(escapeHTML(res.start));
                        $('#time-end').val(escapeHTML(res.end));
                        $('.js-reverse-content').removeClass('hide').siblings().addClass('hide');
                    }
                },
                error: function () {
                    let msg = calendarMethods.fontmatter.netError;
                    calendarMethods.remindError('.js-error-info', msg);
                }
            });
        },
        meetingSig: function(data) {
            $.ajax({
                type: "GET",
                url: '/calendar/groups/',
                data: data,
                contentType: "application/json; charset=utf-8",
                crossDomain: true,
                datatype: "json",
                success: function (res) {
                    let r = res.sort(function (a, b) {return a.name.localeCompare(b.name);});
                    r.forEach(item => {
                        $('#id-select-sigs').append('<option value="' + escapeHTML(item.name)  + '">' + escapeHTML(item.name) + '</option>');
                    })
                }
            });
        }
    };
    var meetingDate = function () {
        let dataJSON = cleanData.dataJSON;
        let data = dataJSON.tableData;
        data = cleanData.calendarSortData(data);
        data = cleanData.getOriginData(data);
        let top = '';
        $('.js-meet-day').empty();
        let isMobile = document.body.clientWidth < 1000;
        let currentIndex = 0;
        let prevIndex = 0;
        let lastIndex = 0;
        let year = calendarClickEvent.getNowTime().year;
        let month = calendarClickEvent.getNowTime().month < 10 ? '0' +  calendarClickEvent.getNowTime().month :  calendarClickEvent.getNowTime().month;
        let d = calendarClickEvent.getNowTime().day < 10 ?  '0' + calendarClickEvent.getNowTime().day :  calendarClickEvent.getNowTime().day;
        let currentTime = year + '-' + month + '-' + d
        data.forEach((item, index) => {
            let day = item.date;
            let active = currentTime === day ? 'active' : '';
            top += `<p class="day-item ${active}">${escapeHTML(item.date)}</p>`;
            if (currentTime === day) {
                currentIndex = index + 1;
            }
            if ((currentIndex === 0) && (currentTime < day)) {
                prevIndex = prevIndex ? prevIndex : index;
            }
            if (currentIndex === 0) {
                lastIndex = index + 1;
            }
        });
        $('.js-meet-day').append(top);
        let len = (currentIndex ? currentIndex : prevIndex ? prevIndex : lastIndex);
        let w = isMobile ? 185 : 220;
        let width = data.length * (w + 24);
        $('.js-meet-day').css('width', width);
        $('.js-schedule-content').css('width', width);
        calendarClickEvent.swiper.left = len;
        calendarClickEvent.swiper.total = data.length;
        let trans = 0;
        let origin = parseInt($('.js-schedule-content').css('transform').split(',')[5]);
        if (isMobile) {
            len -= 1;
            trans = -len * (w + 24) + 12;
            $('.calendar').show();
            if (data.length === 0) {
                $('.cal-content-empty').removeClass('hide');
            } else {
                $('.cal-content-empty').addClass('hide');
            }
        } else if (data.length > 4) {
            trans = -(len - 4) * (w + 24) + 12;
            $('.calendar').show();
            $('.cal-content-empty').addClass('hide');
            $('.js-left-btn').find('img').attr('src', '/img/calendar/btn.svg');
            $('.js-right-btn').find('img').attr('src', '/img/calendar/btn.svg');
        } else if (data.length === 0) {
            $('.cal-content-empty').removeClass('hide');
        } else {
            $('.calendar').show();
            $('.cal-content-detail').show();
            $('.cal-content-empty').addClass('hide');
            $('.js-left-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
            $('.js-right-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
        }
        if (len <= 4 && !isMobile) {
            $('.js-left-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
        }
        if (len >= data.length && !isMobile) {
            $('.js-right-btn').find('img').attr('src', '/img/calendar/graybtn.svg');
        }
        $('.js-meet-day').css('transform', `matrix(1, 0, 0, 1, ${trans}, 0)`);
        $('.js-schedule-content').css('transform', `matrix(1, 0, 0, 1, ${trans}, ${origin})`);
        let pcSize = -(data.length - 4) * (w + 24) + 12;
        let mobileSize = -(data.length - 1) * (w + 24) + 12;
        let size = isMobile ? mobileSize : pcSize;
        calendarClickEvent.daySwiper(size);
        calendarMethods.insertRowHTML(data);
        $('.js-data-check').on('click', function () {
            let id = $('.js-meeting-content').attr('data-detail');
            requestMethods.meetingCheck(id, true);
        });
    };
    var getCookie = function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    };
    const setCookie = function (name, value) {
        var newCookie = name + '=' + value + ';path=/';
        document.cookie = newCookie;
    }
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
    };
    var initMeeting = function () {
        meetingDate();
        calendarClickEvent.detailSwiper();
    };
    var initPage = function () {
        calendarMethods.insertTimeList();
        calendarClickEvent.timeSwiper();
        calendarClickEvent.bindTimePicker();
        calendarClickEvent.handleReserve();
        calendarClickEvent.handleRecodeBtn();
        calendarClickEvent.handleDeleteCheck();
        calendarClickEvent.handleSigs();
        calendarClickEvent.handleClose();
        calendarClickEvent.handleCheckEmail();
    };
    var currentLanguage = function () {
        let cookie = getCookie('lang');
        let url = window.location.href;
         if (cookie === 'zh') {
            if (url.includes('/en/')) {
                url = url.replace('/en/', '/zh/');
                window.location.href = url;
            }
        } else if (cookie === 'en') {
            if (url.includes('/zh/')) {
                url = url.replace('/zh/', '/en/');
                window.location.href = url;
            }
        } else if (cookie === null) {
            setCookie('lang', lang);
        }
    };
    var __calendarMain = function () {
        requestMethods.meetingData();
        requestMethods.meetingSig();
        initPage();
        let access = getCookie('access_token');
        if (access !== null) {
            requestMethods.meetingLogin();
        }
    };
    currentLanguage();
    __calendarMain();
});