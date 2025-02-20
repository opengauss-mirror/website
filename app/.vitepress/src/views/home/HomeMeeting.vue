<script lang="ts" setup>
import { ref, onMounted, computed, nextTick, watch } from 'vue';
import { ElMessage, ElTooltip } from 'element-plus';
import dayjs from 'dayjs';
import { getUserAllInfo } from '@/api/api-user';
import { useI18n } from '@/i18n';
import MeetingForm from '@/components/meeting/MeetingForm.vue';
import MeetingDetail from '@/components/meeting/MeetingDetail.vue';

import type { GroupItemT, MeetingItemT } from '/@types/type-meeting';
import { getGroupInfosApi, getMeetingDateListApi, getMeetingListApi, deleteMeetingApi } from '@/api/api-meeting';
import { isBrowser } from '@/shared/utils';

import { doLogin, getUserAuth } from '@/shared/login';
import { useCommon } from '@/stores/common';

import IconLeft from '~icons/app/icon-chevron-left.svg';
import IconRight from '~icons/app/icon-chevron-right.svg';
import IconCalendar from '~icons/app/icon-calendar.svg';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404-dark.png';
import IconCopy from '~icons/app/icon-copy.svg';

import useWindowResize from '@/components/hooks/useWindowResize';

// 账号信息
const { csrfToken } = getUserAuth();
const userName = ref('');

const i18n = useI18n();
const i18nMeeting = computed(() => i18n.value.home.HOME_CALENDAR);

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const activeName = ref('');
const renderData = ref<MeetingItemT[]>([]); // 某天的会议列表
const sig = ref(''); // 已选sig组
// sig组列表
const sigOptions = ref<GroupItemT[]>([]);
const currentRow = ref<MeetingItemT | null>(null); // 当前激活行，用于取消事件

const isCollapse = ref(false);
const changeCollapse = () => {
  isCollapse.value = !isCollapse.value;
};

const calendar = ref();
const windowWidth = ref(useWindowResize());

// 根据日期互殴前后存在会议的日期
const dates = ref<string[]>([]); //存在会议的日期
const loading = ref(false); // 数据加载状态
const newestDate = ref<string>(dayjs().format('YYYY-MM-DD')); // 最新日期

// 根据日期互殴前后存在会议的日期
const getMeetingDays = async (day?: string) => {
  try {
    loading.value = true;
    const date = dayjs(day).format('YYYY-MM-DD');
    dates.value = await getMeetingDateListApi(date);

    if (dates.value.length) {
      newestDate.value = dates.value.sort().find((date) => date >= dayjs().format('YYYY-MM-DD')) || dayjs().format('YYYY-MM-DD');
    }
  } finally {
    loading.value = false;
  }
};

const calendarRef = ref();
const selectDate = (step: -1 | 1) => {
  const instance = calendarRef.value;
  instance.selectDate(step > 0 ? 'next-month' : 'prev-month');
};

// 获取所选日期的会议列表
const currentDay = ref('');
const clickMeeting = async (day?: string) => {
  if (currentDay.value !== day) {
    currentDay.value = day;

    try {
      loading.value = true;
      const date = dayjs(day).format('YYYY-MM-DD');
      const res = await getMeetingListApi(date, sig.value);

      renderData.value = res.map((v) => {
        return {
          ...v,
          time: `${v.start}-${v.end}`,
        };
      });
      // 更新日历
      setTimeout(() => {
        getMeetingDays(day);
      }, 100);

      // 只有一个会议默认展开
      if (renderData.value.length === 1) {
        activeName.value = '0';
        nextTick(() => {
          if (document.querySelector('.meet-item')) {
            (document.querySelector('.meet-item') as HTMLElement).click();
          }
        });
      }
      isRefresh.value = false;
      sigOptions.value = [...new Set(renderData.value.map((v) => v.group_name))].map((v) => ({ group_name: v }));

      if (!sigOptions.value.find((v) => v.group_name === sig.value)) {
        sig.value = '';
      }
    } finally {
      loading.value = false;
    }
  }
};

// 监听高度
const calendarHeight = ref<number | string>(335);
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
// sig组
const sigGroup = ref([]);
const getSigData = () => {
  getGroupInfosApi()
    .then((res) => {
      sigGroup.value = res;
    })
    .catch(() => {
      sigGroup.value = [];
    });
};

// 获取用户信息
const getPersonalInfo = async () => {
  if (userName.value.length > 0) {
    return;
  }
  try {
    const res = await getUserAllInfo();

    if (res && res.data) {
      const { username } = res.data;
      userName.value = username;
    }
  } catch (error: any) {
    console.error(error);
  }
};

onMounted(() => {
  const tbody = document.querySelector('.home-calendar tbody') as HTMLElement;
  if (tbody) {
    watchChange(tbody);
    calendarHeight.value = `${tbody.offsetHeight - 2}px`;
  }

  if (csrfToken) {
    getPersonalInfo();
  }

  clickMeeting();
  getSigData();
});

// 弹窗信息
const dialogVisible = ref(false);
const dialogTitle = ref(i18nMeeting.value.RESERVE_MEETING);
const handleClose = () => {
  dialogVisible.value = false;
};

// 打开创建会议弹窗
const addMeeting = () => {
  if (csrfToken) {
    if (sigGroup.value.length > 0) {
      currentRow.value = null;
      dialogVisible.value = true;
      dialogTitle.value = i18nMeeting.value.RESERVE_MEETING;
    } else {
      ElMessage({
        message: i18nMeeting.value.LOGIN_TEXT,
        type: 'warning',
      });
    }
  } else {
    doLogin();
  }
};
// 打开编辑会议弹窗
const editMeeting = (row: MeetingItemT) => {
  dialogVisible.value = true;
  dialogTitle.value = i18nMeeting.value.MODIFY;
  currentRow.value = row;
};
// 打开取消会议弹窗
const cancelVisible = ref(false);
const cancelMeeting = (row: MeetingItemT) => {
  currentRow.value = row;
  cancelVisible.value = true;
};

// 确定取消会议
const confirmCancel = async () => {
  try {
    const res = await deleteMeetingApi(currentRow.value.id);

    cancelVisible.value = false;
    if (res && res.code === 200) {
      ElMessage({
        message: i18nMeeting.value.DELETE_SUCCESS,
        type: 'success',
      });
    }
    confirmForm();
  } catch (err) {
    const { code, msg } = err?.response?.data;
    ElMessage({
      message: msg || i18nMeeting.value.failed,
      type: 'error',
    });
    cancelVisible.value = false;
  }
};

// 删除修改会议判断是否是本人
const isSelf = (name: string) => {
  return userName.value === name;
};

// -------------------- 表单事件 --------------------
const closeForm = () => {
  dialogVisible.value = false;
  currentRow.value = null;
};
const confirmForm = () => {
  closeForm();
  isRefresh.value = true;
};

// 会议详情组件实例
const detailRefs = ref({});
const getDetailRefs = (insRef, id) => {
  if (insRef && id) {
    detailRefs.value[id] = insRef;
  }
};
// 复制会议信息
const copyInfo = async (id: number) => {
  const instance = detailRefs.value[id];
  await instance?.copyInfo();
  popoverContent.value = i18n.value.common.COPY_SUCCESS;
};
const popoverContent = ref(i18nMeeting.value.COPY_INFO_MB); // tooltip内容

// 监听是否更新数据 刷新日历
const isRefresh = ref(false);
watch(
  () => isRefresh.value,
  (v) => {
    if (isBrowser() && v) {
      nextTick(() => {
        const activeBoxs = document.querySelector('.is-today .out-box') as HTMLElement;
        if (activeBoxs) {
          activeBoxs.click();
        }
      });
    }
  },
  { deep: true, immediate: true }
);
</script>
<template>
  <div class="home-calendar" @click="onCalendarClick">
    <div class="calendar">
      <ElCalendar v-if="windowWidth > 768" ref="calendarRef" class="calender">
        <template #header="{ date }">
          <div class="left-title lable-name">
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
          <div class="out-box lable-name" :class="{ 'be-active': dates.includes(data.day) }" @click="clickMeeting(data.day)">
            <div class="day-box">
              <p :class="data.isSelected ? 'is-selected' : ''" class="date-calender lable-name">
                {{ Number(data.day.slice(-2)) }}
              </p>
            </div>
          </div>
        </template>
      </ElCalendar>
    </div>
    <div class="detail-list">
      <div class="right-title">
        <div class="title-list">
          <OSelect v-model="sig" clearable filterable size="large" style="width: 240px">
            <OOption v-for="item in sigOptions" :key="item.group_name" :label="item.group_name" :value="item.group_name" />
          </OSelect>
          <OButton animation size="mini" type="primary" @click="addMeeting">{{ i18nMeeting.RESERVE_MEETING }}</OButton>
        </div>
      </div>
      <OCollapse v-if="windowWidth < 768" class="calendar calendar-mo">
        <div class="collapse-box-mo">
          <OCollapse-item>
            <template #title>
              <div class="mo-collapse">
                <OIcon>
                  <IconCalendar />
                </OIcon>
                <span class="month-date">
                  {{ dayjs().format('YYYY-MM-DD') }}
                </span>
              </div>
            </template>
            <div class="meet-detail">
              <ElCalendar ref="calendar" class="calendar-mo calender">
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
                  <div class="out-box" :class="{ 'be-active': dates.includes(data.day) }" @click="clickMeeting(data.day)">
                    <div class="day-box">
                      <p :class="data.isSelected ? 'is-selected' : ''" class="date-calender">
                        {{ data.day.split('-').slice(2)[0] }}
                      </p>
                    </div>
                  </div>
                </template>
              </ElCalendar>
            </div>
          </OCollapse-item>
        </div>
      </OCollapse>
      <div class="detail-head">
        {{ i18nMeeting.NEW_DATE }}
        <span>{{ newestDate }}</span>
      </div>
      <div class="meeting-list">
        <div v-if="renderData.length" class="demo-collapse">
          <OCollapse v-model="activeName" accordion @change="changeCollapse()">
            <div v-for="(item, index) in renderData.filter((v) => !sig || v.group_name === sig)" :key="item.id" class="collapse-box">
              <div class="detail-time">
                <ElTooltip placement="top" :content="popoverContent">
                  <OIcon class="copy-btn" @click.stop="() => copyInfo(item.id)">
                    <IconCopy></IconCopy>
                  </OIcon>
                </ElTooltip>
              </div>
              <OCollapseItem :name="index">
                <template #title>
                  <div class="meet-item">
                    <div class="left-top">
                      <p class="meet-name">{{ item.topic || item.title }}</p>
                    </div>
                    <div class="meeting-time more-detail">
                      <span class="time-title" v-if="windowWidth > 852">{{ i18nMeeting.TIME }}</span>
                      <div class="time-box">
                        <span class="time-day">{{ item.date }}</span>
                        <span class="time-hour">{{ item.time }}</span>

                        <span class="sig">{{ i18nMeeting.SIG_GROUP }} : {{ item.group_name }}</span>
                      </div>
                    </div>
                  </div>
                </template>
                <div class="meet-detail">
                  <MeetingDetail :data="item" :ref="(insRef) => getDetailRefs(insRef, item.id)" />
                  <div v-if="isSelf(item.sponsor)" class="meeting-action">
                    <OButton size="mini" type="outline" @click="cancelMeeting(item)">
                      {{ i18nMeeting.DELETE_MEETING }}
                    </OButton>
                    <OButton size="mini" type="outline" @click="editMeeting(item)">
                      {{ i18nMeeting.MODIFY }}
                    </OButton>
                  </div>
                </div>
              </OCollapseItem>
            </div>
          </OCollapse>
        </div>
        <div v-else class="empty">
          <img :src="isLight ? notFoundImg_light : notFoundImg_dark" alt="" />

          <p>{{ i18nMeeting.EMPTY_TEXT }}</p>
        </div>
      </div>
    </div>
  </div>
  <ODialog
    v-model="cancelVisible"
    :title="i18nMeeting.DELETE_TEXT"
    center
    lock-scroll
    close-on-press-escape
    close-on-click-modalf
    destroy-on-close
    append-to-body
    width="550px"
  >
    <div class="delete-action">
      <OButton @click="cancelVisible = false">
        {{ i18nMeeting.CANCEL }}
      </OButton>
      <OButton type="primary" @click="confirmCancel">
        {{ i18nMeeting.DELETE_MEETING }}
      </OButton>
    </div>
  </ODialog>
  <ODialog
    v-model="dialogVisible"
    :title="dialogTitle"
    :before-close="handleClose"
    center
    lock-scroll
    close-on-press-escape
    close-on-click-modalf
    destroy-on-close
    append-to-body
    width="600px"
    class="book-dialog"
  >
    <MeetingForm :data="currentRow" :sig="sigGroup" @close="closeForm" @confirm="confirmForm" />
  </ODialog>
</template>
