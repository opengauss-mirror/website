<script setup lang="ts">
import { ref, nextTick, onMounted, reactive, watch, computed } from 'vue';
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import type { FormInstance, FormRules } from 'element-plus';
import { ElMessage } from 'element-plus';
import {
  giteeLogin,
  meetingLogin,
  meetingReserve,
  meetingDelete,
  meetingUpdate,
  getMeetingData,
  getMeetingSig,
} from '@/api/api-calendar';

import { isValidKey, getNowFormatDate, isBrowser } from '@/shared/utils';
import {
  TableData,
  DayData,
  SigGroupData,
} from '@/shared/@types/type-calendar';
import { useCommon, useMeeting } from '@/stores/common';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';

import IconLeft from '~icons/app/icon-chevron-left.svg';
import IconRight from '~icons/app/icon-chevron-right.svg';
import IconDown from '~icons/app/icon-chevron-down.svg';
import IconCalendar from '~icons/app/icon-calendar.svg';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404-dark.png';

import useWindowResize from '@/components/hooks/useWindowResize';

const { lang } = useData();
const i18n = useI18n();

const commonStore = useCommon();
let currentMeet = reactive<TableData>({
  date: '',
  timeData: [
    {
      creator: '',
      name: '',
      join_url: '',
      startTime: '',
      endTime: '',
      url: '',
      id: '',
      platform: '',
      video_url: '',
      mid: '',
      emaillist: '',
      detail: '',
      topic: '',
      sponsor: '',
      start: '',
      end: '',
      agenda: '',
    },
  ],
});

const renderData = ref<TableData>({
  date: '',
  timeData: [
    {
      creator: '',
      name: '',
      join_url: '',
      startTime: '',
      endTime: '',
      url: '',
      id: '',
      platform: '',
      video_url: '',
      mid: '',
      emaillist: '',
      detail: '',
      topic: '',
      sponsor: '',
      start: '',
      end: '',
      agenda: '',
    },
  ],
});

const calendarData = ref<TableData[]>([
  {
    date: '',
    timeData: [
      {
        creator: '',
        name: '',
        join_url: '',
        startTime: '',
        endTime: '',
        url: '',
        id: '',
        platform: '',
        video_url: '',
        mid: '',
        emaillist: '',
        detail: '',
        topic: '',
        sponsor: '',
        start: '',
        end: '',
        agenda: '',
      },
    ],
  },
]);

const currentDay = ref('');
const activeName = ref('');
const isCollapse = ref(false);

const detailItem = [
  { text: '发起人', key: 'creator', isLink: false },
  { text: '会议平台', key: 'platform', isLink: false },
  { text: '会议ID', key: 'meeting_id', isLink: false },
  { text: '会议链接', key: 'join_url', isLink: true },
  { text: 'Etherpad链接', key: 'etherpad', isLink: true },
  { text: '会议详情', key: 'detail', isLink: false },
  { text: '活动形式', key: 'activity_type', isLink: false },
  { text: '线上链接', key: 'online_url', isLink: true },
  { text: '报名链接', key: 'register_url', isLink: true },
  { text: '回放链接', key: 'replay_url', isLink: true },
  { text: '回放链接', key: 'video_url', isLink: true },
];

const calendar = ref();
const calendarHeight = ref<number | string>(335);

const windowWidth = ref(useWindowResize());

function meetClick(day: string, event: Event) {
  if (new Date(day.replace(/-/g, '/')).getTime() / 1000 < 1610380800) {
    event.stopPropagation();
    return;
  }
  currentDay.value = resolveDate(day);
  try {
    for (let i = 0; i < calendarData.value.length; i++) {
      isCollapse.value = false;
      if (
        calendarData.value[i].date === day ||
        calendarData.value[i].start_date === day
      ) {
        // 深拷贝
        currentMeet = JSON.parse(JSON.stringify(calendarData.value[i]));
        renderData.value = JSON.parse(JSON.stringify(calendarData.value[i]));
        // 只有一个会议默认展开
        if (calendarData.value[i].timeData.length === 1) {
          activeName.value = '0';
          nextTick(() => {
            if (document.querySelector('.meet-item')) {
              (document.querySelector('.meet-item') as HTMLElement).click();
            }
          });
        } else {
          // 会议时间排序
          activeName.value = '';
          renderData.value.timeData.sort((a: DayData, b: DayData) => {
            return (
              parseInt(a.startTime.replace(':', '')) -
              parseInt(b.startTime.replace(':', ''))
            );
          });
          renderData.value.timeData.map((item2) => {
            if (item2.etherpad) {
              item2['duration_time'] = `${item2.startTime}-${item2.endTime}`;
            }
          });
        }
        return;
      } else {
        currentMeet.timeData = [];
        renderData.value.timeData = [];
      }
    }
  } catch (e) {
    throw Error();
  }
}

// 为日历单元格绑定会议次数 (弃用)
function getMeetTimes(day: string): number {
  let times = 0;
  calendarData.value.forEach((item) => {
    if (item.date === day || item.start_date === day) {
      times = item.timeData.length;
      return;
    }
  });
  return times;
}

function selectDate(val: string, date: string) {
  if (date === '2021 年 1 月' && val === 'prev-month') {
    return;
  }
  calendar.value.selectDate(val);
}

function changeCollapse() {
  isCollapse.value = !isCollapse.value;
}
function watchChange(element: HTMLElement) {
  const observe = new MutationObserver(function () {
    calendarHeight.value = `${element.offsetHeight - 2}px`;
  });
  observe.observe(element, {
    childList: true,
    subtree: true,
    characterData: true,
  });
}
const resolveDate = (date: string) => {
  const reg = /(\d{4})\-(\d{2})\-(\d{2})/;
  date = date.replace(reg, '$1年$2月$3日');
  if (date.charAt(5) === '0') {
    date = date.substring(6);
  } else {
    date = date.substring(5);
  }
  return date;
};

// 会议列表
const sigSelect = ref('');
const meetingData = async () => {
  calendarData.value = [];
  renderData.value.timeData = [];
  try {
    const params = {
      group: sigSelect.value,
    };
    const res = await getMeetingData(params);
    calendarData.value = res.tableData;
  } catch (e: any) {
    throw new Error(e);
  }
};
// sig 选择
const selectSigChange = () => {
  meetingData();
};
// sig列表
const sigGroup = ref<SigGroupData[]>([]);
const meetingSig = async () => {
  try {
    const res = await getMeetingSig();
    sigGroup.value = res;
  } catch (e: any) {
    throw new Error(e);
  }
};

onMounted(() => {
  const tbody = document.querySelector('.main-body tbody') as HTMLElement;
  if (tbody) {
    watchChange(tbody);
    calendarHeight.value = `${tbody.offsetHeight - 2}px`;
  }
  meetingData();
  meetingSig();
});

watch(
  () => calendarData.value.length,
  () => {
    if (isBrowser()) {
      nextTick(() => {
        const activeBoxs = document.querySelector(
          '.is-today .out-box'
        ) as HTMLElement;
        if (activeBoxs) {
          activeBoxs.click();
        }
      });
    }
  },
  { deep: true, immediate: true }
);

// 会议预定 事件》》》》

const i18nMeeting = computed(() => i18n.value.home.HOME_CALENDAR);
const meetingStore = useMeeting();

//用户登录
const meetingLoginApi = async () => {
  try {
    const res = await meetingLogin();
    if (res.code === 200) {
      meetingStore.userSigs = res.data.sigs;
      meetingStore.giteeId = res.data.user.gitee_id;
      meetingStore.userId = res.data.user.id;
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
onMounted(() => {
  const access = document.cookie.includes('access_token');
  if (access !== null) {
    meetingLoginApi();
  }
});

const isZh = computed(() => (lang.value === 'zh' ? true : false));

const dialogTitle = ref(i18nMeeting.value.LOGIN);
const meetingDialog = ref(false);
// 会议id
const mId = ref<number | null>(null);
const isModify = ref(false);
const isReserve = ref(false);
// 预订登录提示
const dialogNoLogin = ref(false);
// 删除提示
const deleteTips = ref(false);

const handleClose = () => {
  clearData();
  clearDialogState();
};

// 登录鉴权点击
const handleGiteeLogin = () => {
  requestGiteeLogin();
};

const meetingRecord = ref(false);
const meetingForm = ref({
  platform: '',
  group_name: '',
  join_url: '',
  date: '',
  etherpad: '',
  emaillist: '',
  record: meetingRecord.value ? 'cloud' : '',
  topic: '',
  sponsor: '',
  start: '',
  end: '',
  agenda: '',
});

// 验证
const ruleFormRef = ref<FormInstance>();
const rules = reactive<FormRules>({
  topic: [
    {
      required: true,
      message: i18nMeeting.value.NAME_TEXT,
      trigger: 'blur',
    },
  ],
  sponsor: [
    {
      required: true,
      message: 'Please select sponsor',
      trigger: 'change',
    },
  ],
  group_name: [
    {
      required: true,
      message: i18nMeeting.value.SIG_TEXT,
      trigger: 'change',
    },
  ],
  platform: [
    {
      required: true,
      message: i18nMeeting.value.PLATFORM_TEXT,
      trigger: 'change',
    },
  ],
  date: [
    {
      required: true,
      message: i18nMeeting.value.DATA_TEXT,
      trigger: 'change',
    },
  ],
  start: [
    {
      required: true,
      message: i18nMeeting.value.STARTTIME,
      trigger: 'change',
    },
  ],
  end: [
    {
      required: true,
      message: i18nMeeting.value.ENDTIME,
      trigger: 'change',
    },
  ],
});

// 判断是否登录
const isLogin = () => {
  return meetingStore.giteeId !== '' ? true : false;
};
// 判断是否有权限
const isAuthority = () => {
  return meetingStore.userSigs.length >= 1 ? true : false;
};
// 删除修改会议判断是否是本人
const isSelfLogin = (name: string) => {
  return meetingStore.giteeId === name ? true : false;
};

// 编辑数据格式化
const formatterResponse = (item: any, date: string) => {
  meetingForm.value = {
    platform: item.platform,
    group_name: item.group_name,
    join_url: item.join_url || '',
    date: date,
    etherpad: item.etherpad || '',
    emaillist: item.emaillist || '',
    record: item.record || '',
    topic: item.name,
    sponsor: item.creator || '',
    start: item.startTime || '',
    end: item.endTime || '',
    agenda: item.detail || '',
  };
  meetingRecord.value = item.record;
};
// 修改会议
const handleModifyMeeting = (item: any, date: string) => {
  if (isSelfLogin(item.creator)) {
    isModify.value = true;
    meetingDialog.value = true;
    dialogTitle.value = i18nMeeting.value.MODIFY;
    // 深拷贝
    const itemData = JSON.parse(JSON.stringify(item));
    formatterResponse(itemData, date);
    mId.value = itemData.mid;
  } else {
    ElMessage({
      message: i18nMeeting.value.PERMISSION_TEXT1,
      type: 'warning',
    });
  }
};

//修改会议请求
const requestMeetingUpdate = async () => {
  try {
    const res = await meetingUpdate(mId.value, meetingForm.value);
    if (res.code < 300) {
      meetingDialog.value = false;
      ElMessage({
        message: isZh.value ? res.msg : res.en_msg,
        type: 'success',
      });
      meetingData();
    } else {
      ElMessage({
        message: isZh.value ? res.msg : res.en_msg,
        type: 'warning',
      });
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
//新增会议请求
const requestMeetingReserve = async () => {
  try {
    const res = await meetingReserve(meetingForm.value);
    if (res.code < 300) {
      if (res.code > 200) {
        meetingDialog.value = false;
        ElMessage({
          message: i18nMeeting.value.SUCCESS,
          type: 'success',
        });
        meetingData();
      }
    } else {
      ElMessage({
        message: isZh.value ? res.msg : res.en_msg,
        type: 'warning',
      });
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
//删除会议
const requestMeetingDelete = async () => {
  try {
    const res = await meetingDelete(mId.value);
    if (res.code < 300) {
      meetingDialog.value = false;
      ElMessage({
        message: i18nMeeting.value.DELETE_SUCCESS,
        type: 'success',
      });
      meetingData();
    }
  } catch (e: any) {
    throw new Error(e);
  }
};
//gitee登录鉴权
const requestGiteeLogin = async () => {
  try {
    const res = await giteeLogin();
    const url =
      'https://gitee.com/oauth/authorize?client_id=' +
      res.client_id +
      '&redirect_uri=' +
      res.redirect_url +
      '&response_type=code';
    window.open(url, '_self');
  } catch (e: any) {
    throw new Error(e);
  }
};

// 预订会议按钮事件
const handleMeetingReserve = () => {
  clearDialogState();
  if (isLogin()) {
    if (isAuthority()) {
      isReserve.value = true;
      meetingDialog.value = true;
      dialogTitle.value = i18nMeeting.value.RESERVE_MEETING;
      clearData();
    } else {
      ElMessage({
        message: i18nMeeting.value.PERMISSION_TEXT,
        type: 'warning',
      });
    }
  } else {
    meetingDialog.value = true;
    dialogTitle.value = i18nMeeting.value.LOGIN;
    dialogNoLogin.value = true;
  }
};

// 取消会议
const handleMeetingClose = () => {
  clearDialogState();
};
// 重置会议
const handleResetMeeting = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
  clearData();
  clearDialogState();
};

// 删除会议
const handleDeleteMeeting = (item: any) => {
  mId.value = item.mid;
  if (isSelfLogin(item.creator)) {
    dialogTitle.value = i18nMeeting.value.DELETE;
    meetingDialog.value = true;
    deleteTips.value = true;
  } else {
    ElMessage({
      message: i18nMeeting.value.PERMISSION_TEXT1,
      type: 'warning',
    });
  }
};

// 清除弹框状态
const clearDialogState = () => {
  meetingDialog.value = false;
  isModify.value = false;
  isReserve.value = false;
  dialogNoLogin.value = false;
  deleteTips.value = false;
};

const clearData = () => {
  meetingForm.value = {
    platform: '',
    group_name: meetingStore.userSigs[0] || '',
    join_url: '',
    date: '',
    etherpad: '',
    emaillist: '',
    record: '',
    topic: '',
    sponsor: meetingStore.giteeId || '',
    start: '',
    end: '',
    agenda: '',
  };
};

// 提交
const handleSubmitMeeting = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      if (isModify.value) {
        requestMeetingUpdate();
      } else {
        requestMeetingReserve();
      }
    } else {
      console.log('error submit!', fields);
    }
  });
};

const changeRecord = () => {
  meetingForm.value.record = meetingRecord.value ? 'cloud' : '';
};
</script>
<template>
  <div class="main-body">
    <el-config-provider :locale="zhCn">
      <div class="calendar">
        <el-calendar v-if="windowWidth > 768" ref="calendar" class="calender">
          <template #header="{ date }">
            <div class="left-title">
              <OIcon @click="selectDate('prev-month', date)">
                <icon-left></icon-left>
              </OIcon>
              <span class="month-date">{{ date }}</span>
              <OIcon @click="selectDate('next-month', date)">
                <icon-right></icon-right>
              </OIcon>
            </div>
          </template>
          <template #date-cell="{ data }">
            <div
              class="out-box"
              :class="{ 'be-active': getMeetTimes(data.day) }"
              @click="meetClick(data.day, $event)"
            >
              <div class="day-box">
                <p
                  :class="data.isSelected ? 'is-selected' : ''"
                  class="date-calender"
                >
                  {{ data.day.split('-').slice(2)[0] }}
                </p>
              </div>
            </div>
          </template>
        </el-calendar>
      </div>
      <div class="detail-list">
        <div class="right-title">
          <div class="title-list">
            <OSelect
              v-model="sigSelect"
              clearable
              filterable
              @change="selectSigChange"
            >
              <OOption
                value=""
                :label="lang === 'zh' ? '全部sig组' : 'All SIGs'"
              />
              <OOption
                v-for="item in sigGroup"
                :key="item.name"
                :label="item.name"
                :value="item.name"
              />
            </OSelect>
            <OButton
              animation
              size="mini"
              type="primary"
              @click="handleMeetingReserve"
              >{{ i18nMeeting.RESERVE_MEETING }}</OButton
            >
          </div>
        </div>
        <el-collapse v-if="windowWidth < 768" class="calendar calendar-mo">
          <div class="collapse-box-mo">
            <OCollapse-item>
              <template #title>
                <div class="mo-collapse">
                  <OIcon>
                    <icon-calendar></icon-calendar>
                  </OIcon>
                  <span class="month-date">
                    {{ getNowFormatDate() }}
                  </span>
                </div>
              </template>
              <div class="meet-detail">
                <el-calendar ref="calendar" class="calendar-mo calender">
                  <template #header="{ date }">
                    <div class="left-title">
                      <OIcon @click="selectDate('prev-month', date)">
                        <icon-left></icon-left>
                      </OIcon>
                      <span class="month-date">{{ date }}</span>
                      <OIcon @click="selectDate('next-month', date)">
                        <icon-right></icon-right>
                      </OIcon>
                    </div>
                  </template>
                  <template #date-cell="{ data }">
                    <div
                      class="out-box"
                      :class="{ 'be-active': getMeetTimes(data.day) }"
                      @click="meetClick(data.day, $event)"
                    >
                      <div class="day-box">
                        <p
                          :class="data.isSelected ? 'is-selected' : ''"
                          class="date-calender"
                        >
                          {{ data.day.split('-').slice(2)[0] }}
                        </p>
                      </div>
                    </div>
                  </template>
                </el-calendar>
              </div>
            </OCollapse-item>
          </div>
        </el-collapse>
        <div class="detail-head">
          {{ i18nMeeting.NEW_DATE }}
          <span>{{ currentDay }}</span>
        </div>
        <div class="meeting-list">
          <div
            v-if="
              (renderData.timeData.length && renderData.date) ||
              (renderData.timeData.length && renderData.start_date)
            "
            class="demo-collapse"
          >
            <o-collapse
              v-model="activeName"
              accordion
              @change="changeCollapse()"
            >
              <div
                v-for="(item, index) in renderData.timeData"
                :key="item.id"
                class="collapse-box"
              >
                <o-collapse-item :name="index">
                  <template #title>
                    <div class="meet-item">
                      <div class="meet-left">
                        <div class="left-top">
                          <p class="meet-name">{{ item.name || item.title }}</p>
                        </div>
                        <div
                          v-if="item.group_name"
                          class="group-name more-detail"
                        >
                          {{ i18nMeeting.SIG_GROUP }}
                          {{ item.group_name }}
                        </div>
                        <div v-else class="group-name more-detail">
                          openEuler
                        </div>
                      </div>
                      <div class="item-right">
                        <div class="detail-time">
                          <span class="start-time"
                            ><i v-if="!item.schedules">{{ item.startTime }}</i>
                            <i v-else>{{ item.schedules[0].start }}</i></span
                          >
                          <span v-if="windowWidth < 768">-</span>
                          <span class="end-time">
                            <i v-if="!item.schedules">{{ item.endTime }}</i>
                            <i v-else>{{
                              item.schedules[item.schedules.length - 1].end
                            }}</i>
                          </span>
                        </div>
                        <div class="extend">
                          <OIcon
                            :class="{
                              reversal:
                                isCollapse && activeName == index.toString(),
                            }"
                          >
                            <icon-down></icon-down>
                          </OIcon>
                        </div>
                      </div>
                    </div>
                  </template>
                  <div class="meet-detail">
                    <template v-for="keys in detailItem" :key="keys.key">
                      <div
                        v-if="isValidKey(keys.key, item) && item[keys.key]"
                        class="meeting-item"
                      >
                        <div class="item-title">{{ keys.text }}:</div>
                        <p v-if="!keys.isLink && keys.key !== 'date'">
                          {{ item[keys.key] }}
                        </p>
                        <p
                          v-else-if="
                            keys.isLink &&
                            item[keys.key] &&
                            !(item[keys.key] as string).startsWith('http')
                          "
                        >
                          {{ item[keys.key] }}
                        </p>
                        <a
                          v-else-if="keys.isLink"
                          :href="item[keys.key]"
                          target="_blank"
                          >{{ item[keys.key] }}</a
                        >
                        <p v-else>{{ currentDay }}</p>
                      </div>
                    </template>
                    <div
                      v-if="isAuthority() || isLogin()"
                      class="meeting-action"
                    >
                      <OButton
                        size="mini"
                        type="outline"
                        @click.stop="handleDeleteMeeting(item)"
                      >
                        {{ i18nMeeting.DELETE_MEETING }}
                      </OButton>
                      <OButton
                        size="mini"
                        type="outline"
                        @click.stop="handleModifyMeeting(item, renderData.date)"
                      >
                        {{ i18nMeeting.MODIFY }}
                      </OButton>
                    </div>
                  </div>
                </o-collapse-item>
              </div>
            </o-collapse>
          </div>
          <div v-else class="empty">
            <img
              v-if="commonStore.theme === 'light'"
              :src="notFoundImg_light"
              alt=""
            />
            <img v-else :src="notFoundImg_dark" alt="" />
            <p>{{ i18nMeeting.EMPTY_TEXT }}</p>
          </div>
        </div>
      </div>
    </el-config-provider>
  </div>
  <!-- 提示 -->
  <ODialog
    v-model="meetingDialog"
    :title="dialogTitle"
    :before-close="handleClose"
    center
    lock-scroll
    close-on-press-escape
    close-on-click-modalf
    append-to-body
    width="550px"
  >
    <!-- 未登录 -->
    <div v-if="dialogNoLogin" class="no-login tc">
      <p class="text">{{ i18nMeeting.LOGIN_TEXT }}</p>
      <div class="tc action">
        <OButton type="primary" @click="handleGiteeLogin">
          {{ i18nMeeting.GITEE_BEN }}
        </OButton>
      </div>
      <p class="text tc">
        {{ i18nMeeting.LOGIN_TIPS }}<a href="">{{ i18nMeeting.PRIVACY }}</a>
      </p>
    </div>

    <!-- 删除提示 -->
    <div v-if="deleteTips" class="no-login tc">
      <p class="text">{{ i18nMeeting.DELETE_TEXT }}</p>
      <div class="action">
        <OButton @click="requestMeetingDelete">
          {{ i18nMeeting.DELETE_MEETING }}
        </OButton>
        <OButton type="primary" @click="handleGiteeLogin">
          {{ i18nMeeting.MODIFY }}
        </OButton>
      </div>
    </div>
    <!-- 预定、编辑表单 -->
    <div v-if="isModify || isReserve" class="">
      <ElForm
        ref="ruleFormRef"
        :model="meetingForm"
        label-width="120px"
        :rules="rules"
        class="meeting-form"
      >
        <ElFormItem :label="i18nMeeting.REVERSE" prop="topic">
          <OInput
            v-model="meetingForm.topic"
            :placeholder="i18nMeeting.NAME_TEXT"
          />
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.CREATOR" prop="sponsor">
          <OInput v-model="meetingForm.sponsor" disabled />
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.SIG" prop="group_name">
          <OSelect v-model="meetingForm.group_name" style="width: 100%">
            <OOption
              v-for="item in meetingStore.userSigs"
              :key="item"
              :label="item"
              :value="item"
            />
          </OSelect>
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.PLATFORM" prop="platform">
          <el-radio-group v-model="meetingForm.platform">
            <el-radio-button label="zoom" />
            <el-radio-button label="welink" />
          </el-radio-group>
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.DAY" prop="date">
          <ODatePicker
            v-model="meetingForm.date"
            :placeholder="i18nMeeting.DATA_TEXT"
            value-format="YYYY-MM-DD"
            style="width: 100%"
          />
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.TIME" required>
          <div class="time-select">
            <ElFormItem prop="start">
              <OTimeSelect
                v-model="meetingForm.start"
                :max-time="meetingForm.end"
                class="mr-4"
                :placeholder="i18nMeeting.STARTTIME"
                start="08:00"
                end="23:30"
                style="width: 175px"
              />
            </ElFormItem>
            <span class="line"> - </span>
            <ElFormItem prop="end">
              <OTimeSelect
                v-model="meetingForm.end"
                :min-time="meetingForm.start"
                :placeholder="i18nMeeting.ENDTIME"
                start="08:00"
                end="23:30"
                style="width: 175px"
              />
            </ElFormItem>
          </div>
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.CONTENT">
          <OInput v-model="meetingForm.agenda" type="textarea" :rows="2" />
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.EMAIL">
          <OInput
            v-model="meetingForm.emaillist"
            :placeholder="i18nMeeting.EMAIL_TEXT"
            type="textarea"
            :rows="2"
          />
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.ETHERPAD">
          <OInput v-model="meetingForm.etherpad" />
        </ElFormItem>
        <ElFormItem :label="i18nMeeting.RECORD">
          <el-checkbox v-model="meetingRecord" @change="changeRecord" />
          <p class="tips">{{ i18nMeeting.RECORD_TEXT }}</p>
        </ElFormItem>
        <ElFormItem>
          <div class="meeting-action-box">
            <OButton v-if="isModify" size="small" @click="handleMeetingClose">
              {{ i18nMeeting.CANCEL }}
            </OButton>
            <OButton
              v-else
              size="small"
              @click="handleResetMeeting(ruleFormRef)"
            >
              {{ i18nMeeting.RESET }}
            </OButton>
            <OButton
              size="small"
              type="primary"
              @click="handleSubmitMeeting(ruleFormRef)"
            >
              {{ isModify ? i18nMeeting.MODIFY_SUBMIT : i18nMeeting.SUBMIT }}
            </OButton>
          </div>
        </ElFormItem>
      </ElForm>
    </div>
  </ODialog>
</template>
<style lang="scss" scoped>
:deep(.el-radio-button__inner) {
  border-radius: 0 !important;
  background: var(--o-color-bg1);
  border: 1px solid var(--o-color-border1);
}

.meeting-form {
  .time-select {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin: 0;
  }
  :deep(.el-form-item__label) {
    height: 38px;
    line-height: 38px;
  }
  .tips {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text4);
  }

  .meeting-action-box {
    display: flex;
    gap: var(--o-spacing-h5);
  }
}
.tc {
  text-align: center;
}
.no-login {
  .text {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text3);
  }
  .action {
    margin: var(--o-spacing-h4) 0;
    display: flex;
    gap: var(--o-spacing-h5);
    justify-content: center;
  }
  .failed-img {
    width: 108px;
    margin: var(--o-spacing-h4) 0;
  }
}
.calendar-title {
  text-align: center;
  font-size: var(--o-font-size-h3);
  font-weight: 300;
}
.left-title {
  display: flex;
  margin-bottom: var(--o-spacing-h4);
  align-items: center;
  height: 40px;
  font-size: var(--o-font-size-h8);
  .o-icon {
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text1);
  }
}
.month-date {
  color: var(--o-color-text1);
  padding: 0 var(--o-spacing-h8);
}
@media screen and (max-width: 768px) {
  .month-date {
    font-size: var(--o-font-size-tip);
  }
  .left-title {
    display: none;
  }
}
:deep(.title-list) {
  display: flex;
  gap: var(--o-spacing-h4);

  .title-item {
    cursor: pointer;
    padding: 12px;
    &:hover {
      color: var(--o-color-brand1);
    }
  }
  .o-button {
    height: 42px;
    @media screen and (max-width: 768px) {
      height: 34px;
    }
  }
  .active {
    background-color: var(--o-color-brand1);
    color: var(--o-color-text2) !important;
  }
  @media screen and (max-width: 768px) {
    gap: var(--o-spacing-h6);
    flex-direction: column;
    align-items: center;
    .o-button {
      order: -1;
    }
  }
}
.o-icon {
  cursor: pointer;
  font-size: var(--o-font-size-h7);
  transition: color 0.2s;
  &:hover {
    color: var(--o-color-brand1);
    svg {
      color: var(--o-color-brand2);
      fill: var(--o-color-brand2);
    }
  }
}
.main-body {
  display: flex;
  :deep(.el-calendar) {
    --el-calendar-border: 1px solid var(--o-color-border2);
    background: none;
    .el-collapse-item__content {
      padding: 0;
      background-color: transparent;
    }
    .el-calendar__header {
      display: block;
      padding: 0;
      border: none;
    }
    .el-calendar__body {
      background-color: var(--o-color-bg2);
      th {
        color: var(--o-color-text4);
      }
    }
  }

  .collapse-box-mo {
    .left-title {
      display: none;
    }
  }
  @media screen and (max-width: 768px) {
    .collapse-box-mo {
      margin: var(--o-spacing-h6) 0;
      :deep(.el-collapse-item) {
        background-color: var(--o-color-bg2);
        padding: 0 var(--o-spacing-h8);
        .el-icon {
          font-size: var(--o-font-size-text);
          font-weight: 700;
          transform: rotate(90deg);
          color: var(--o-color-text1);
        }
        .el-icon.is-active {
          transform: rotate(270deg);
        }
        .el-collapse-item__header {
          height: 34px;
          border: none;
          background-color: var(--o-color-bg2);
        }
        .el-collapse-item__wrap {
          border: 0;
          .el-collapse-item__content {
            padding: 0;
          }
        }
        .meet-detail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          .left-title {
            display: flex;
            padding: var(--o-spacing-h8) var(--o-spacing-h1);
            align-items: center;
            justify-content: space-between;
            margin: 0;
            svg {
              cursor: pointer;
              width: 16px;
            }
          }
        }
      }
      .mo-collapse {
        display: flex;
        align-items: center;
        width: 100%;
        .o-icon {
          color: inherit;
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h8);
        }
        .month-date {
          padding-left: 8px;
          font-size: var(--o-font-size-tip);
          line-height: 16px;
        }
      }
    }
  }
  :deep(.calendar) {
    width: 100%;
    max-width: 500px;
    flex-shrink: 0;
    text-align: center;
    thead {
      th {
        text-align: center;
      }
      background-color: var(--o-color-bg4);
    }
    @media screen and (max-width: 1100px) {
      max-width: 400px;
    }
    @media screen and (max-width: 768px) {
      max-width: 100%;
      display: none;
    }

    .is-today {
      .el-calendar-day {
        .day-box {
          color: var(--o-color-text4);
          background-color: var(--o-color-bg4);
        }
      }
    }

    .el-calendar__body {
      padding: 0;

      thead {
        height: 44px;
      }
      tbody {
        box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
      }
      .el-calendar-table__row {
        -moz-user-select: none; /*火狐*/
        -webkit-user-select: none; /*webkit浏览器*/
        -ms-user-select: none; /*IE10*/
        -khtml-user-select: none; /*早期浏览器*/
        user-select: none;
        font-size: var(--o-font-size-tip);
        .is-selected {
          background-color: transparent;
          .el-calendar-day {
            .day-box {
              background-color: var(--o-color-brand1);
              .date-calender {
                color: var(--o-color-text2);
              }
            }
          }
        }

        .el-calendar-day {
          display: flex;
          justify-content: center;
          padding: 0;
          height: 66px;
          &:hover {
            background-color: var(--o-color-bg1);
          }
          @media screen and (max-width: 768px) {
            background-color: inherit !important;
          }
          .out-box {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
          }
          .be-active {
            position: relative;
            overflow: hidden;
          }
          .be-active::after {
            position: absolute;
            top: -6px;
            right: -6px;
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 0 0 0 20px;
            background-color: var(--o-color-brand2);
            @media screen and (max-width: 768px) {
              width: 12px;
              height: 12px;
              top: -4px;
              right: -4px;
              border-radius: 0 0 0 12px;
            }
          }
          .day-box {
            display: flex;
            box-sizing: border-box;
            justify-content: center;
            width: 32px;
            height: 32px;
            border-radius: 50%;
            align-items: center;
            .date-calender {
              line-height: var(--o-line-height-text);
              font-size: var(--o-font-size-h8);
              color: var(--o-color-text1);
            }
          }
        }
        @media screen and (max-width: 768px) {
          .el-calendar-day {
            height: 100%;
            .day-box {
              .date-calender {
                font-size: var(--o-font-size-tip);
              }
            }
          }
          .el-calendar-day::after {
            display: block;
            padding-top: 100%;
            content: '';
          }
        }
      }
    }
  }
  :deep(.calendar-mo) {
    display: none;
    @media screen and (max-width: 768px) {
      border: none;
      display: block;
      width: 100%;
      thead {
        th {
          padding: var(--o-spacing-h8) 0;
          font-size: var(--o-font-size-tip);
        }
      }
      tbody {
        width: 300px;
      }
      tr {
        td {
          border: none;
          justify-content: center;
        }
      }
      .current {
        flex-direction: column;
        justify-content: center;
      }
    }
  }
  :deep(.detail-list) {
    width: 100%;
    .right-title {
      display: flex;
      height: 40px;
      margin-bottom: var(--o-spacing-h4);
      justify-content: flex-end;
      @media screen and (max-width: 768px) {
        margin-bottom: 0;
        justify-content: center;
        height: auto;
      }
      .el-tabs__header {
        margin: 0;
      }
    }
    .detail-head {
      line-height: 21px;
      padding: var(--o-spacing-h6);
      text-align: center;
      color: var(--o-color-text4);
      background-color: var(--o-color-bg4);
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h8) 0;
        font-size: var(--o-font-size-tip);
      }
    }

    .meeting-list {
      padding: var(--o-spacing-h8) 0 0 var(--o-spacing-h8);
      height: v-bind('calendarHeight');
      background-color: var(--o-color-bg2);
      overflow-y: scroll;
      box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
      .el-collapse {
        border: none;
        --el-collapse-header-height: 96px;
        .collapse-box:last-child {
          .el-collapse-item {
            margin-bottom: 0;
          }
        }
        .el-collapse-item {
          margin-bottom: var(--o-spacing-h8);
          .el-collapse-item__header {
            padding-left: 0;
            padding-right: 0;
            border: none;
            height: 100%;
          }
        }
        .el-collapse-item__wrap {
          border: none;
          padding: var(--o-spacing-h6) var(--o-spacing-h5);
          background-color: var(--o-collapse-color-bg2);
          @media screen and (max-width: 768px) {
            padding: var(--o-spacing-h6);
            background-color: var(--o-color-bg1);
            .el-collapse-item__content {
              background-color: var(--o-color-bg1);
              padding: 0;
            }
          }
        }
      }
      @media screen and (max-width: 768px) {
        padding: var(--o-spacing-h8);
        height: fit-content;
        overflow: auto;
      }
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background-color: var(--o-color-bg2);
      }

      &::-webkit-scrollbar {
        width: 6px;
        background-color: var(--o-color-bg2);
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: var(--o-color-division1);
      }
      .el-collapse-item__arrow {
        display: none;
      }
      .el-collapse-item__content {
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-tip);
        }
      }
      .meet-item {
        display: flex;
        justify-content: space-between;
        padding: var(--o-spacing-h5);
        width: 100%;
        height: 100%;
        background-color: var(--o-color-bg3);
        border: 1px solid var(--o-color-bg3);
        border-left: 2px solid var(--o-color-brand1);
        .meet-left {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          text-align: left;
          .left-top {
            display: flex;
            align-items: center;
            .meet-name {
              margin-right: var(--o-spacing-h5);
              max-width: 400px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: var(--o-font-size-h7);
              color: var(--o-color-text1);
              line-height: var(--o-line-height-tip);
            }
            .el-collapse-item__content {
              padding: 0 20px;
            }
            p {
              margin: 0;
              height: fit-content;
              justify-content: center;
              align-items: center;
              line-height: normal;
            }
            // .introduce {
            //   padding: 1px 7px;
            //   display: -webkit-box;
            //   -webkit-box-orient: vertical;
            //   -webkit-line-clamp: 1;
            //   overflow: hidden;
            //   color: #fff;
            //   background: linear-gradient(225deg, #feb32a 0%, #f6d365 100%);
            // }
          }
          .more-detail {
            display: flex;
            flex-shrink: 0;
            align-items: center;
            width: fit-content;
            height: 24px;
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
            @media screen and (max-width: 768px) {
              font-size: var(--o-font-size-text);
            }
            .o-icon {
              margin: 0 5px;
              color: var(--o-color-brand1);
              font-size: var(--o-font-size-h5);
              transition: all 0.3s;
              svg {
                color: var(--o-color-brand1);
              }
            }
            &:hover {
              .o-icon {
                transform: translateX(5px);
              }
            }
          }
        }
        .item-right {
          display: flex;
          font-size: var(--o-font-size-text);
          .o-button {
            flex-shrink: 0;
            padding: 0;
            .o-icon {
              color: var(--o-color-brand1);
              font-size: var(--o-font-size-h5);
            }
            &:hover {
              color: var(--o-color-brand1);
            }
            @media screen and (max-width: 768px) {
              display: none;
            }
          }

          .detail-time {
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding: 0 var(--o-spacing-h5);
            font-weight: 300;
            text-align: center;
            font-size: var(--o-font-size-h8);
            span {
              line-height: var(--o-line-height-h8);
              i {
                font-style: normal;
              }
            }
          }
          .extend {
            display: flex;
            align-items: center;
            width: 24px;
            .o-icon {
              font-size: var(--o-font-size-h5);
              color: var(--o-color-text1);
              transition: all 0.3s;
            }
            .reversal {
              transform: rotate(180deg);
            }
          }
        }
        @media screen and (max-width: 768px) {
          background-color: var(--o-color-bg2);
          padding: var(--o-spacing-h6);
          border-left: 2px solid var(--o-color-brand1);
          .meet-left {
            max-width: 200px;
            .left-top {
              .meet-name {
                font-size: var(--o-font-size-text);
                font-weight: 700;
              }
            }
            .group-name {
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: var(--o-font-size-tip);
              color: var(--o-color-text4);
            }
          }
          .item-right {
            .detail-time {
              flex-direction: row;
              align-items: flex-end;
              padding: 0 var(--o-spacing-h8);
              font-size: var(--o-font-size-tip);
            }
            .extend {
              align-items: flex-end;
              .o-icon {
                display: inline-block;
                height: var(--o-line-height-h8);
                line-height: var(--o-line-height-h8);
                font-size: var(--o-font-size-h8);
                svg {
                  vertical-align: middle;
                }
              }
            }
          }
        }
      }
      .meet-detail {
        color: var(--o-color-text4);
        position: relative;
        .meeting-item {
          display: flex;
          padding-bottom: var(--o-spacing-h8);
          line-height: var(--o-line-height-tip);
          word-break: break-all;
          .item-title {
            flex-shrink: 0;
            width: 90px;
          }
          .sponsor {
            display: flex;
            align-items: center;
            .head-logo {
              width: 60px;
              border-radius: 50%;
              overflow: hidden;
            }
            .sponsor-name {
              padding-left: var(--o-spacing-h5);
              font-size: var(--o-font-size-text);
            }
          }
        }
        .meeting-action {
          position: absolute;
          top: 0;
          right: 0;
          gap: var(--o-spacing-h7);
          display: flex;
          @media screen and (max-width: 768px) {
            position: static;
            margin-top: var(--o-spacing-h7);
          }
        }
      }
    }
    .empty {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h8);
      img {
        height: 216px;
      }
      p {
        margin-top: var(--o-spacing-h5);
      }
      @media screen and (max-width: 768px) {
        img {
          margin-top: var(--o-spacing-h5);
        }
        p {
          padding-bottom: var(--o-spacing-h5);
          font-size: var(--o-font-size-tip);
        }
      }
    }
  }
}
.is-home {
  .el-calendar {
    background-color: var(--o-color-bg2);
  }
  .detail-list {
    background-color: var(--o-color-bg2);
    .right-title {
      visibility: hidden;
    }
  }
}
@media screen and (max-width: 768px) {
  .head-title {
    flex-direction: column;
    padding: 0;
  }
  .main-body {
    margin: 0 auto;
    align-items: center;
    flex-direction: column;
  }
}
</style>
