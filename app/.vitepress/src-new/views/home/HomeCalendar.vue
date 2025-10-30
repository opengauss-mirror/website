<script setup lang="ts">
import { ref, onMounted, watch, computed, shallowRef } from 'vue';

import { useCommon, useMeeting } from '@/stores/common';
import { getUserAllInfo } from '@/api/api-user';

import {
  OIcon,
  OCollapse,
  OCollapseItem,
  OTab,
  OLink,
  OTabPane,
  ODivider,
  OScroller,
  OIconChevronLeft,
  OIconChevronRight,
  OButton,
  useMessage,
  ODialog,
  type DialogActionT,
} from '@opensig/opendesign';

import IconAll from '~icons/app-new/icon-all.svg';
import IconEvent from '~icons/app-new/icon-event.svg';
import IconSummit from '~icons/app-new/icon-summit.svg';
import IconMeet from '~icons/app-new/icon-meet.svg';

import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404-dark.png';

import MeetingForm from './components/MeetingForm.vue';
import AppSection from '~@/components/AppSection.vue';
import { useData } from 'vitepress';
import eventsAllData from '@/data/events';
import dayjs from 'dayjs';

import { getMeetingDateListApi, getMeetingListApi, getGroupInfosApi, deleteMeetingApi } from '@/api/api-meeting';
import { doLogin, getUserAuth } from '@/shared/login';
import type { MeetingSigT, MeetingPostT, MeetingItemT } from '@/shared/@types/type-meeting';
import { useI18n } from '~@/i18n';
import { useLocale } from '~@/composables/useLocale';

const TODAY = new Date();
const TODAY_FORMATTED = dayjs(TODAY).format('YYYY/MM/DD');

const commonStore = useCommon();
const { lang } = useData();
const meetingStore = useMeeting();
const message = useMessage(null);
const i18n = useI18n();
const { t } = useLocale();
const i18nMeeting = computed(() => i18n.value.home.HOME_CALENDAR);

const recentMeetingDates = ref([] as string[]);
type EventType = (typeof eventsAllData)['zh' | 'en'][number] & { type: 'event'; id: number };

// 活动数据
const eventsData = computed(() => {
  return (lang.value === 'zh' ? eventsAllData.zh : eventsAllData.en)
    .filter((item) => Boolean(item.date))
    .reduce((map, item, index) => {
      const cache = map.get(item.date!);
      if (!cache) {
        return map.set(item.date!, [{ ...item, type: 'event', id: index }]);
      }
      cache.push({ ...item, type: 'event', id: index });
      return map;
    }, new Map<string, EventType[]>());
});

// 当前选择日期的会议事件
const currentCalendarData = shallowRef<Record<string, any>[]>([]);
const selectedDate = ref(TODAY);
// 当前选择日期字符串
const selectedDateStr = computed(() => dayjs(selectedDate.value).format('YYYY-MM-DD'));

const updateCurrentDayMeetings = (date: string) => {
  if (eventsData.value.has(selectedDateStr.value)) {
    currentCalendarData.value = [];
    currentCalendarData.value.push(...eventsData.value.get(selectedDateStr.value)!);
  }
  if (recentMeetingDates.value.includes(date)) {
    queryMeetingDates(date, '');
  }
};

// 计算最新日程
const latestSchedule = computed(() => {
  const today = dayjs().format('YYYY-MM-DD');
  // 检查今天是否有活动
  let latest = recentMeetingDates.value.find((v) => v === today);

  //如果今天没有活动，查找即将发生的最近活动
  if (!latest) {
    const upcomingDates = recentMeetingDates.value.filter((v) => dayjs(v).unix() >= dayjs().unix());

    if (upcomingDates.length > 0) {
      latest = [...upcomingDates].sort((a, b) => dayjs(a).unix() - dayjs(b).unix())[0];
    }
  }
  return latest;
});

// 查询指定日期的会议事件
const queryMeetingDates = async (date: string, group_name: string) => {
  const res = await getMeetingListApi(date, group_name);

  currentCalendarData.value = [];

  if (Array.isArray(res)) {
    currentCalendarData.value = res.map((item) => ({ ...item, type: 'meetings', d: item.mid }));
  }

  activeName.value = currentCalendarData.value.length === 1 ? [currentCalendarData.value[0].id] : [];
};

watch(selectedDateStr, updateCurrentDayMeetings);

const activeName = ref<number[]>([]);
const meetingI18n = {
  SIG_GROUP: 'SIG组:',
  NEW_DATE: '最新日程：',
  EMPTY_TEXT: '当日没有活动，敬请期待',
  LEARN_MORE: '查看详情',
};
// 日历展示时间限制
const limitTime = '2021 年 1 月';
const tabList = computed(() => {
  return [
    {
      label: t('home.HOME_CALENDAR.all'),
      value: 'all',
      icon: IconAll,
    },
    {
      label: t('home.HOME_CALENDAR.meeting'),
      value: 'meetings',
      icon: IconMeet,
    },
    {
      label: t('home.HOME_CALENDAR.activity'),
      value: 'event',
      icon: IconEvent,
    },
    {
      label: t('home.HOME_CALENDAR.summit'),
      value: 'summit',
      icon: IconSummit,
    },
  ];
});
const meetingFields = computed(() => {
  return [
    { label: t('home.HOME_CALENDAR.meetingDetail'), key: 'agenda' },
    { label: t('home.HOME_CALENDAR.host'), key: 'sponsor' },
    { label: t('home.HOME_CALENDAR.meetingTime'), key: 'time' },
    { label: t('home.HOME_CALENDAR.meetingPlatform'), key: 'platform' },
    { label: t('home.HOME_CALENDAR.meetingId'), key: 'mid' },
    { label: t('home.HOME_CALENDAR.meetingLink'), key: 'join_url', isLink: true },
    { label: t('home.HOME_CALENDAR.ETHERPAD'), key: 'etherpad', isLink: true },
  ];
});
const tabType = ref(tabList.value[0].value);
const calendarRef = ref();
const calendarHeight = ref<string>('407px');
const isLimit = ref(false);

const displayCalendarData = computed(() => {
  if (tabType.value === 'all') return currentCalendarData.value;
  return currentCalendarData.value.filter((item) => tabType.value === item.type);
});

watch(
  () => displayCalendarData.value.length,
  (length) => {
    if (length === 1) {
      activeName.value = [displayCalendarData.value[0].id];
      return;
    }
    activeName.value = [];
  },
  { immediate: true, flush: 'post' }
);

const selectDate = (val: string, date: string) => {
  if (date === limitTime && val === 'prev-month') {
    isLimit.value = true;
    return;
  }
  isLimit.value = false;
  calendarRef.value.selectDate(val);
};

// --------------------获取会议平台名称-----------------------------
const getMeetingPlatformName = (key: string) => {
  const platformMap: Record<string, string> = {
    welink: 'WeLink',
    zoom: 'Zoom',
    tencent: '腾讯会议',
  };
  return platformMap[key] || key;
};

const removeLeadingZero = (str: string) => {
  // 使用正则表达式匹配以 0 开头的字符串，然后去除开头的 0
  return str.replace(/^0+(?=\d)/, '');
};

// --------------------监听日历高度变化-----------------------------
const watchChange = (element: HTMLElement) => {
  const observe = new MutationObserver(function () {
    calendarHeight.value = `${element.offsetHeight - 2}px`;
  });
  observe.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
  });
};

// --------------------获取近期有会议的日期-----------------------------
const getRecentMeetingDates = async () => {
  recentMeetingDates.value = await getMeetingDateListApi(selectedDateStr.value);
};

onMounted(async () => {
  // 设置右侧 日程列表高度
  const tbody = document.querySelector('.calendar-body .el-calendar__body') as HTMLElement;
  if (tbody) {
    watchChange(tbody);
    calendarHeight.value = `${tbody.offsetHeight - 2}px`;
  }

  if (csrfToken) {
    getPersonalInfo();
    getSigData();
  }

  if (eventsData.value.has(selectedDateStr.value)) {
    currentCalendarData.value.push(...eventsData.value.get(selectedDateStr.value)!);
  }

  // 获取近期有会议的日期
  await getRecentMeetingDates();

  if (recentMeetingDates.value.includes(selectedDateStr.value)) {
    queryMeetingDates(selectedDateStr.value, '');
  }
});

const { csrfToken } = getUserAuth();

// --------------------获取SIG组-----------------------------
const sigGroup = ref<MeetingSigT[]>([]);
const getSigData = () => {
  if (meetingStore.userSigs.length > 0) {
    return;
  }
  getGroupInfosApi()
    .then((res) => {
      sigGroup.value = res;
      meetingStore.userSigs = res;
    })
    .catch(() => {
      sigGroup.value = [];
    });
};

// --------------------会议预定弹窗-----------------------------
const isFormDlgVisible = ref(false);

const currentMeetingData = ref<MeetingItemT | null>(null);
const formDlgTitle = ref('');
const createMeetingDlg = () => {
  if (csrfToken) {
    if (sigGroup.value.length > 0) {
      currentMeetingData.value = null;
      isFormDlgVisible.value = true;
      formDlgTitle.value = '创建会议';
    } else {
      message.warning({
        content: i18nMeeting.value.LOGIN_TEXT,
      });
    }
  } else {
    doLogin();
  }
};

// 获取用户信息
const getPersonalInfo = async () => {
  if (meetingStore.username !== '') {
    return;
  }
  try {
    const res = await getUserAllInfo();

    if (res && res.data) {
      const { identities, username } = res.data;
      const userData = identities.find((e) => e.username === username);

      meetingStore.username = userData.username;
    }
  } catch (error: any) {
    console.error(error);
  }
};
// 删除修改会议判断是否是本人
const isSelf = (name: string) => {
  return meetingStore.username === name;
};

// 打开编辑会议弹窗
const meetingModify = (row: MeetingItemT) => {
  isFormDlgVisible.value = true;
  currentMeetingData.value = row;

  formDlgTitle.value = i18nMeeting.value.MODIFY;
};
// --------------------会议取消弹窗-----------------------------
const isCancelDlgVisible = ref(false);
const meetingCancel = (row: MeetingItemT) => {
  currentMeetingData.value = row;
  isCancelDlgVisible.value = true;
};
const cancelDlgActions: Array<DialogActionT> = [
  {
    id: 'save',
    color: 'primary',
    label: '删除会议',
    variant: 'solid',
    size: 'large',
    round: 'pill',
    onClick: () => {
      meetingCancelConfirm();
    },
  },
  {
    id: 'cancel',
    color: 'primary',
    label: '取消',
    variant: 'outline',
    size: 'large',
    round: 'pill',
    onClick: () => {
      isCancelDlgVisible.value = false;
    },
  },
];

// 确定取消会议
const meetingCancelConfirm = async () => {
  try {
    const res = await deleteMeetingApi(currentMeetingData.value?.id);

    isCancelDlgVisible.value = false;

    message.success({
      content: '删除成功！',
    });

    // confirmForm();
  } catch (err: any) {
    let failed = '删除失败！';
    if (err && err.response && err.response.data) {
      failed = err.response.data.msg;
    }
    message.danger({
      content: failed,
    });
    isCancelDlgVisible.value = false;
  }
};
</script>
<template>
  <AppSection :title="t('home.HOME_CALENDAR.developerCalendar')" class="home-calendar" ref="container">
    <div class="meeting-oper">
      <p class="text">{{ t('home.HOME_CALENDAR.LOGIN_TEXT') }}</p>
      <div class="oper-action">
        <OButton variant="solid" round="pill" color="primary" @click="createMeetingDlg"> {{ t('home.HOME_CALENDAR.RESERVE_MEETING') }} </OButton>
      </div>
    </div>
    <div class="calendar-body">
      <el-calendar ref="calendarRef" class="calender" v-model="selectedDate">
        <template #header="{ date }">
          <div class="left-title">
            <OIcon @click="selectDate('prev-month', date)">
              <OIconChevronLeft :class="{ disable: isLimit }"></OIconChevronLeft>
            </OIcon>
            <span class="month-date">{{ date }}</span>
            <OIcon @click="selectDate('next-month', date)">
              <OIconChevronRight></OIconChevronRight>
            </OIcon>
          </div>
          <div class="right-title">
            {{ t('home.HOME_CALENDAR.latestSchedule') }}:&ensp;
            <span>{{ latestSchedule }}</span>
          </div>
        </template>
        <template #date-cell="{ data }">
          <div class="out-box" :class="{ 'has-calender': recentMeetingDates.includes(data.day) }">
            <div class="day-box">
              <p class="date-calender">
                {{ removeLeadingZero(data.day.split('-').at(-1) || '') }}
              </p>
              <div class="icon-box">
                <OIcon class="calendar-icon" type="meeting" v-if="(tabType === 'all' || tabType === 'meetings') && recentMeetingDates.includes(data.day)">
                  <IconMeet></IconMeet>
                </OIcon>

                <OIcon class="calendar-icon" type="event" v-if="(tabType === 'all' || tabType === 'activity') && eventsData.has(data.day)">
                  <IconEvent></IconEvent>
                </OIcon>
              </div>
            </div>
          </div>
        </template>
      </el-calendar>
      <div class="detail-list">
        <div class="current-day">
          {{ meetingI18n.NEW_DATE }}
          <span>{{ latestSchedule }}</span>
        </div>
        <div class="right-title">
          <OTab v-model="tabType" :line="false">
            <OTabPane v-for="item in tabList" :key="item.value" :value="item.value">
              <template #nav>
                <OIcon>
                  <component :is="item.icon"></component>
                </OIcon>
                {{ item.label }}
              </template>
            </OTabPane>
          </OTab>
        </div>

        <OScroller class="meeting-list" show-type="hover" size="small">
          <OCollapse v-if="displayCalendarData.length" v-model="activeName" accordion :style="{ '--collapse-padding': '0' }">
            <OCollapseItem v-for="calendarData in displayCalendarData" :key="calendarData.id" :value="calendarData.id">
              <template #title>
                <div class="meet-title" :title="calendarData.topic || calendarData.title">
                  <OIcon class="calendar-icon" :type="calendarData.type || 'meeting'">
                    <IconSummit v-if="calendarData.type === 'summit'"></IconSummit>
                    <IconEvent v-else-if="calendarData.type === 'event'"></IconEvent>
                    <IconMeet v-else></IconMeet>
                  </OIcon>
                  <div class="text">{{ calendarData.topic || calendarData.title }}</div>
                </div>
                <div class="meet-info">
                  <span v-if="calendarData.start">{{ calendarData.start }} - {{ calendarData.end }}</span>
                  <span v-else>{{ calendarData.date }}</span>
                  <ODivider direction="v" />
                  <span v-if="calendarData.location">{{ calendarData.location }}</span>
                  <div v-if="calendarData.group_name">{{ meetingI18n.SIG_GROUP }} {{ calendarData.group_name }}</div>
                  <div v-if="calendarData.activity_type">{{ calendarData.activity_type }}</div>
                </div>
                <OLink v-if="calendarData.type !== 'meetings'" :href="calendarData.link" target="_blank">
                  {{ meetingI18n.LEARN_MORE }}
                  <template #suffix>
                    <OIcon><OIconChevronRight /> </OIcon>
                  </template>
                </OLink>
              </template>
              <div class="calendar-info">
                <div v-if="isSelf(calendarData.sponsor)" class="meeting-action">
                  <OButton type="primary" variant="text" size="small" @click="meetingCancel(calendarData)"> 删除会议 </OButton>
                  <OButton type="primary" variant="text" size="small" @click="meetingModify(calendarData)"> 编辑会议 </OButton>
                </div>
                <template v-for="field in meetingFields" :key="field.key">
                  <div class="info-item" v-if="calendarData[field.key]">
                    <div class="item-title">{{ field.label }}:</div>
                    <a v-if="field.isLink" :href="calendarData[field.key]" target="_blank">
                      {{ calendarData[field.key] }}
                    </a>
                    <p v-else-if="field.key === 'time' && calendarData.start">{{ calendarData.start }} - {{ calendarData.end }}</p>
                    <p v-else>
                      {{ field.key === 'platform' ? getMeetingPlatformName(calendarData[field.key]) : calendarData[field.key] }}
                    </p>
                  </div>
                </template>
              </div>
            </OCollapseItem>
          </OCollapse>
          <div v-else class="empty">
            <img v-if="commonStore.theme === 'light'" :src="notFoundImg_light" alt="" />
            <img v-else :src="notFoundImg_dark" alt="" />
            <p>{{ meetingI18n.EMPTY_TEXT }}</p>
          </div>
        </OScroller>
      </div>
    </div>
    <!-- 取消会议弹窗 -->
    <ODialog v-model:visible="isCancelDlgVisible" :unmount-on-hide="true" :actions="cancelDlgActions">
      <template #header>是否确定要删除当前会议？</template>
    </ODialog>

    <!-- 会议预约、编辑 弹窗 -->
    <MeetingForm v-if="isFormDlgVisible" v-model:visible="isFormDlgVisible" :sig-options="sigGroup" :data="currentMeetingData" :title="formDlgTitle" />
  </AppSection>
</template>
<style lang="scss" scoped>
.calendar-icon {
  color: inherit;
  &[type='meeting'] {
    background-color: var(--o-color-primary1);
    color: #fff;
    z-index: 3;
  }
  &[type='summit'] {
    background-color: #3422ff;
    color: #fff;
    z-index: 2;
  }
  &[type='event'] {
    background-color: #ffa122;
    color: #fff;
    z-index: 1;
  }
}
.o-link {
  --link-icon-size: 16px;
}

.home-calendar {
  :deep(.section-body) {
    position: relative;
    width: 100%;
    z-index: 1;
  }
  .meeting-oper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .text {
      color: var(--o-color-info2);
      @include tip2;
    }
    .oper-action {
      margin-left: 24px;
    }
  }
  .calendar-body {
    display: flex;
    margin-top: 24px;
    border-radius: var(--o-radius-xs);
    background-color: var(--o-color-fill2);
    overflow: hidden;
    @include respond-to('<=pad_v') {
      margin-top: 12px;
      background-color: transparent;
      flex-direction: column;
    }
    :deep(.calender) {
      width: 56%;
      --el-calendar-borde: none;
      --el-calendar-selected-bg-color: none;
      @include respond-to('<=pad_v') {
        width: 100%;
        flex-direction: column;
        background-color: var(--o-color-fill2);
        border-radius: var(--o-radius-xs);
      }
      .el-calendar__header {
        height: 60px;
        padding: 14px 24px;
        border-bottom: 1px solid var(--o-color-control4);
        @include respond-to('<=pad_v') {
          justify-content: center;
          padding: 16px 16px 12px;
          height: auto;
          border-bottom: none;
        }
        td {
          border: none;
        }
        .left-title {
          display: flex;
          align-items: center;
          @include text2;
          .o-icon {
            cursor: pointer;
            font-size: 24px;
          }
          .month-date {
            font-weight: 500;
            margin: 0 4px;
          }
          .date {
            color: var(--o-color-primary1);
          }
          .o-icon {
            font-size: 24px;
            margin-right: 8px;
          }
        }
        .right-title {
          display: flex;
          align-items: center;
          @include text2;
          color: var(--o-color-info2);
          @include respond-to('<=pad_v') {
            display: none;
          }
        }
      }
      .el-calendar__body {
        padding: 12px 24px 32px;
        border-right: 1px solid var(--o-color-control4);
        thead {
          th {
            &:first-child {
              padding-left: 12px;
            }
            padding: 12px 0 16px 20px;
            text-align: left;
            color: var(--o-color-info3);
            @include text1;
            @include respond-to('<=pad_v') {
              padding: 0 !important;
              text-align: center;
            }
          }
        }
        td:first-child {
          .el-calendar-day {
            margin-left: 0 !important;
          }
        }
        tr:last-child {
          .el-calendar-day {
            margin-bottom: 0 !important;
          }
        }
        @include respond-to('<=pad_v') {
          border: none;
          padding: 0 16px 16px;
          thead {
            background-color: var(--o-color-control4-light);
            overflow: hidden;
            th {
              padding: 9px 0;
            }
            th:first-child {
              border-top-left-radius: var(--o-radius-xs);
              border-bottom-left-radius: var(--o-radius-xs);
            }
            th:last-child {
              border-top-right-radius: var(--o-radius-xs);
              border-bottom-right-radius: var(--o-radius-xs);
            }
          }
          tr:last-child {
            .out-box {
              margin-bottom: 0 !important;
            }
          }
        }
      }
      td {
        border: none;
      }
      .el-calendar-day {
        padding: 0;
        margin-left: 8px;
        margin-bottom: 8px;
        max-width: 100px;
        height: 64px;
        color: var(--o-color-info1);
        @include respond-to('<=pad') {
          height: fit-content;
        }
        @include respond-to('<=pad_v') {
          display: flex;
          justify-content: center;
          padding: 0;
          height: fit-content;
        }

        .out-box {
          position: relative;
          border-radius: var(--o-radius-xs);
          padding: 6px 12px;
          width: 100%;
          height: 100%;
          background-color: var(--o-color-control2-light);
          border: 1px solid transparent;
          @include tip1;
          @include hover {
            background-color: var(--o-color-control3-light);
            @include respond-to('<=pad_v') {
              @include hover {
                background-color: inherit;
                border: 1px solid transparent;
              }
            }
          }
          .day-box {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
          }
          .icon-box {
            display: flex;
            margin-top: 4px;
            color: var(--o-color-white);
            height: 20px;
            .o-icon {
              flex-shrink: 0;
              position: relative;
              border-radius: 50%;
              padding: 2px;
              width: 20px;
              height: 20px;
              font-size: 20px;
              margin-left: -6px;
              @include respond-to('<=pad_v') {
                height: 6px;
                width: 6px;
                margin-left: -2px;
              }
              &:first-child {
                margin: 0;
              }
            }
          }
          @include respond-to('<=pad_v') {
            background-color: transparent;
            padding: 0;
            margin: 6px 8px;
            text-align: center;
            width: 24px;
            height: 24px;
            .day-box {
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              font-size: 14px;
              line-height: 22px;
            }
            .icon-box {
              display: flex;
              justify-content: center;
              margin-top: 0;
              position: absolute;
              left: 50%;
              bottom: -2px;
              height: 6px;
              transform: translate(-50%, 100%);
            }
            .o-icon {
              width: 6px;
              height: 6px;
              svg {
                display: none;
              }
            }
          }
        }
      }
      .is-selected {
        .out-box {
          background-color: var(--o-color-control3-light);
          border: 1px solid var(--o-color-primary1);
          @include respond-to('<=pad_v') {
            background-color: transparent;
            border: 1px solid transparent;
            .date-calender {
              position: relative;
              color: var(--o-color-white);
              z-index: 1;
              &::after {
                content: '';
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 24px;
                width: 40px;
                background-color: var(--o-color-primary1);
                border-radius: var(--o-radius-l);
                z-index: -1;
              }
            }
          }
        }
      }
      .is-today {
        .date-calender {
          $size: 32px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: fit-content;
          height: 24px;
          line-height: 24px;
          z-index: 1;
          &::after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: $size;
            height: $size;
            background-color: var(--o-color-control3-light);
            border-radius: 50%;
            z-index: -1;
          }
          @include respond-to('<=pad_v') {
            height: auto;
            width: auto;
            &::after {
              content: '';
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              height: 24px;
              width: 40px;
              background-color: var(--o-color-control1-light);
              border-radius: var(--o-radius-l);
              z-index: -1;
            }
          }
        }
      }
    }
    .detail-list {
      width: 44%;
      @include respond-to('<=pad_v') {
        margin-top: 12px;
        background-color: var(--o-color-fill2);
        width: 100%;
        border-radius: var(--o-radius-xs);
      }
      @include respond-to('>pad_v') {
        .current-day {
          display: none;
        }
      }
      @include respond-to('<=pad_v') {
        .current-day {
          @include text2;
          display: flex;
          margin: 16px 16px 12px;
          padding: 7px 12px;
          justify-content: center;
          border-radius: var(--o-radius-s);
          background-color: var(--o-color-control4-light);
        }
      }
      .o-tab {
        display: flex;
        justify-content: flex-end;
        align-items: flex-end;
        height: 60px;
        border-bottom: 1px solid var(--o-color-control4);
        padding-right: 24px;
        @include respond-to('pad_v-laptop') {
          --tab-nav-padding: 0 0 14px;
        }
        @include respond-to('<=pad_v') {
          height: auto;
          .o-icon {
            display: none;
          }
        }
      }
      $icon-size: 24px;

      .meet-title {
        display: flex;
        align-items: center;
        color: var(--o-color-info1);
        @include text2;
        .o-icon {
          flex-shrink: 0;
          padding: 2px;
          border-radius: 50%;
          overflow: hidden;
          // color: var(--o-color-white);
          margin-right: 12px;
          width: 24px;
          height: 24px;
          font-size: 24px;
          @include respond-to('<=pad_v') {
            font-size: 20px;
            width: 20px;
            height: 20px;
          }
        }
        .text {
          @include text-truncate(1);
          display: block;
          width: 100%;
        }
      }
      .meet-info {
        margin-left: calc($icon-size + 12px);
        margin-top: 8px;
        display: flex;
        align-items: center;
        @include tip1;
        color: var(--o-color-info3);
        text-decoration: none;
        @include respond-to('<=pad_v') {
          margin-left: 32px;
        }
        .o-divider {
          @include tip1;
        }
      }
      .o-link {
        font-weight: 400;
        font-size: var(--o-font_size-tip1);
        line-height: var(--o-line_height-tip1);
        margin-left: calc($icon-size + 12px);
        @include respond-to('<=pad_v') {
          margin-left: 32px;
          padding: 0;
        }
      }
    }
    .meeting-list {
      height: v-bind('calendarHeight');
      @include respond-to('<=pad_v') {
        height: auto;
      }
      .empty {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 32px;
        img {
          max-width: 250px;
        }
        p {
          @include text1;
          color: var(--o-color-info3);
          margin-top: 16px;
        }
      }
    }
    :deep(.o-collapse) {
      .o-collapse-item {
        position: relative;
        border-top: none;
        &::after {
          position: absolute;
          content: '';
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: calc(100% - 2 * 24px);
          height: 1px;
          background-color: var(--collapse-division-color);
        }
        @include hover {
          .text {
            color: var(--o-color-primary1);
          }
        }
        @include respond-to('<=pad_v') {
          &::after {
            width: calc(100% - 2 * 16px);
          }
          &:last-child {
            &::after {
              display: none;
            }
          }
        }
      }
      .o-collapse-item-icon {
        height: min-content;
      }
      .o-collapse-item-header {
        align-items: center;
        padding: 16px 24px;
        @include respond-to('<=pad_v') {
          padding: 12px 16px;
        }
      }
      .o-collapse-item-body {
        background-color: var(--o-color-fill3);
        margin-bottom: 0;
        a {
          word-break: break-all;
        }
      }
    }

    .calendar-info {
      display: flex;

      color: var(--o-color-info3);
      flex-direction: column;
      padding: 16px 60px;
      position: relative;
      @include tip1;
      @include respond-to('<=pad_v') {
        padding: 12px 16px;
      }
      .meeting-action {
        position: absolute;
        top: 16px;
        right: 16px;
        display: flex;
        gap: 8px;
      }
      .info-item {
        display: flex;
        margin-top: 8px;
        .item-title {
          min-width: 110px;
        }
      }
      .info-item:first-child {
        margin-top: 0;
      }
    }
  }
}

@include in-dark {
  .home-calendar {
    .calendar-body {
      :deep(.o-collapse) {
        .o-collapse-item-body {
          background-color: #2b2b2f;
        }
      }
    }
  }
}

.cube-1,
.cube-2 {
  position: absolute;
  top: -104px;
  left: -110px;
  width: 320px;
  z-index: -1;
  @include respond-to('laptop') {
    width: 327px;
    top: -180px;
    left: -210px;
  }
  @include respond-to('pad_h') {
  }
  @include respond-to('<=pad_v') {
    width: 84px;
    top: -50px;
    left: -4px;
  }
  @include respond-to('phone') {
    width: 54px;
    top: -32px;
    left: 3px;
  }
}
.cube-2 {
  left: inherit;
  top: inherit;
  width: 380px;
  bottom: -181px;
  right: -220px;
  @include respond-to('laptop') {
    width: 400px;
    bottom: -200px;
    right: -240px;
  }
  @include respond-to('pad_h') {
    right: -140px;
    bottom: -150px;
  }
  @include respond-to('<=pad_v') {
    width: 71px;
    bottom: -40px;
    right: -8px;
  }
}
</style>
