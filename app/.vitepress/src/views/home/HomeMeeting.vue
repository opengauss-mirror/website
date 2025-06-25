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
import { useCommon, useMeeting } from '@/stores/common';

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

const commonStore = useCommon();
const meetingStore = useMeeting();
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

// 获取用户信息
const getPersonalInfo = async () => {
  if (userName.value.length > 0) {
    return;
  }
  try {
    const res = await getUserAllInfo();

    if (res && res.data) {
      const { identities } = res.data;
      const giteeData = identities.find((e) => e.provider?.includes('gitee'));
      userName.value = giteeData.username;

      meetingStore.giteeId = giteeData.username;
    }
  } catch (error: any) {
    console.error(error);
  }
};
// 删除修改会议判断是否是本人
const isSelf = (name: string) => {
  return userName.value === name;
};

onMounted(() => {
  const tbody = document.querySelector('.home-calendar tbody') as HTMLElement;
  if (tbody) {
    watchChange(tbody);
    calendarHeight.value = `${tbody.offsetHeight - 2}px`;
  }

  if (csrfToken) {
    getPersonalInfo();
    getSigData();
  }

  clickMeeting();
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
    let failed = i18nMeeting.value.failed;
    if (err && err.response && err.response.data) {
      failed = err.response.data.msg;
    }
    ElMessage({
      message: failed,
      type: 'error',
    });
    cancelVisible.value = false;
  }
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
            <OIcon @click="selectDate(-1)">
              <icon-left></icon-left>
            </OIcon>
            <span class="month-date">{{ date }}</span>
            <OIcon @click="selectDate(1)">
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
              <ElCalendar ref="calendarRef" class="calendar-mo calender">
                <template #header="{ date }">
                  <div class="left-title">
                    <OIcon @click="selectDate(-1)">
                      <icon-left></icon-left>
                    </OIcon>
                    <span class="month-date">{{ date }}</span>
                    <OIcon @click="selectDate(1)">
                      <icon-right></icon-right>
                    </OIcon>
                  </div>
                </template>
                <template #date-cell="{ data }">
                  <div class="out-box" :class="{ 'be-active': dates.includes(data.day) }" @click="clickMeeting(data.day)">
                    <div class="day-box">
                      <p :class="data.isSelected ? 'is-selected' : ''" class="date-calender">
                        {{ Number(data.day.slice(-2)) }}
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

<style lang="scss" scoped>
:deep(.el-radio-button__inner) {
  border-radius: 0 !important;
  background: var(--e-color-bg1);
  border: 1px solid var(--e-color-border1);
}

.tc {
  text-align: center;
}
.delete-action {
  margin: var(--e-spacing-h4) 0;
  display: flex;
  gap: var(--e-spacing-h5);
  justify-content: center;
  :deep(.o-button) {
    --o-button-padding: 6px 24px;
  }
}
.meeting-content {
  .asterisk-left {
    :deep(.el-input__wrapper) {
      box-shadow: 0 0 0 1px var(--e-color-border1);
    }
    :deep(.el-form-item__content) {
      .el-radio-button__inner {
        border-right: 0;
        border-left: 1px solid var(--e-color-border1);
      }
      .el-radio-button:nth-of-type(2) {
        border-right: 1px solid var(--e-color-border1);
      }
    }
  }
}
.calendar-title {
  text-align: center;
  font-size: var(--e-font-size-h3);
  font-weight: 300;
}
.left-title {
  display: flex;
  margin-bottom: var(--e-spacing-h4);
  align-items: center;
  height: 40px;
  font-size: var(--e-font-size-h8);
  .o-icon {
    font-size: var(--e-font-size-h5);
    color: var(--e-color-text1);
  }
}
.month-date {
  color: var(--e-color-text1);
  padding: 0 var(--e-spacing-h8);
}
@media screen and (max-width: 768px) {
  .month-date {
    font-size: var(--e-font-size-tip);
  }
  .left-title {
    display: none;
  }
}
:deep(.title-list) {
  display: flex;
  gap: var(--e-spacing-h4);

  :deep(.o-select) {
    width: 240px;
  }
  .title-item {
    cursor: pointer;
    padding: 12px;
    &:hover {
      color: var(--e-color-brand1);
    }
  }

  .active {
    background-color: var(--e-color-brand1);
    color: var(--e-color-text2) !important;
  }
  @media screen and (max-width: 768px) {
    gap: var(--e-spacing-h6);
    flex-direction: column;
    align-items: center;
    .o-button {
      order: -1;
    }
  }
}
.o-icon {
  cursor: pointer;
  font-size: var(--e-font-size-h7);
  transition: color 0.2s;
  &:hover {
    color: var(--e-color-brand1);
    svg {
      color: var(--e-color-brand2);
      fill: var(--e-color-brand2);
    }
  }
}
.home-calendar {
  display: flex;
  :deep(.el-calendar) {
    --el-calendar-border: 1px solid var(--e-color-border2);
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
      background-color: var(--e-color-bg2);
      th {
        color: var(--e-color-text4);
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
      margin: var(--e-spacing-h6) 0;
      :deep(.el-collapse-item) {
        background-color: var(--e-color-bg2);
        padding: 0 var(--e-spacing-h8);
        .el-icon {
          font-size: var(--e-font-size-text);
          font-weight: 700;
          transform: rotate(90deg);
          color: var(--e-color-text1);
        }
        .el-icon.is-active {
          transform: rotate(270deg);
        }
        .el-collapse-item__header {
          height: 34px;
          border: none;
          background-color: var(--e-color-bg2);
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
            padding: var(--e-spacing-h8) var(--e-spacing-h1);
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
          color: var(--e-color-text1);
          font-size: var(--e-font-size-h8);
        }
        .month-date {
          padding-left: 8px;
          font-size: var(--e-font-size-tip);
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
      background-color: var(--e-color-bg4);
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
          color: var(--e-color-text4);
          background-color: var(--e-color-bg4);
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
        font-size: var(--e-font-size-tip);
        .is-selected {
          background-color: transparent;
          .el-calendar-day {
            .day-box {
              background-color: var(--e-color-brand1);
              .date-calender {
                color: var(--e-color-text2);
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
            background-color: var(--e-color-bg1);
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
            background-color: var(--e-color-brand2);
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
              line-height: var(--e-line-height-text);
              font-size: var(--e-font-size-h8);
              color: var(--e-color-text1);
            }
          }
        }
        @media screen and (max-width: 768px) {
          .el-calendar-day {
            height: 100%;
            .day-box {
              .date-calender {
                font-size: var(--e-font-size-tip);
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
          padding: var(--e-spacing-h8) 0;
          font-size: var(--e-font-size-tip);
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
    flex: 1;
    .right-title {
      display: flex;
      height: 40px;
      margin-bottom: var(--e-spacing-h4);
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
      padding: var(--e-spacing-h6);
      text-align: center;
      color: var(--e-color-text4);
      background-color: var(--e-color-bg4);
      @media screen and (max-width: 768px) {
        padding: var(--e-spacing-h8) 0;
        font-size: var(--e-font-size-tip);
      }
    }

    .meeting-list {
      padding: var(--e-spacing-h8) 0 0 var(--e-spacing-h8);
      height: v-bind('calendarHeight');
      background-color: var(--e-color-bg2);
      overflow-y: scroll;
      box-shadow: 0 1px 5px rgba(45, 47, 51, 0.1);
      .el-collapse {
        position: relative;
        border: none;
        --el-collapse-header-height: 96px;
        .collapse-box {
          position: relative;
          &:last-child {
            .el-collapse-item {
              margin-bottom: 0;
            }
          }
        }
        .el-collapse-item {
          margin-bottom: var(--e-spacing-h8);
          .el-collapse-item__header {
            padding-left: 0;
            padding-right: 0;
            border: none;
            height: 100%;
          }
        }
        .el-collapse-item__wrap {
          border: none;
          padding: var(--e-spacing-h6) var(--e-spacing-h5);
          background-color: var(--e-collapse-color-bg2);
          .el-collapse-item__content {
            padding: 0;
          }
          @media screen and (max-width: 768px) {
            padding: var(--e-spacing-h6);
            background-color: var(--e-color-bg1);
            .el-collapse-item__content {
              background-color: var(--e-color-bg1);
              padding: 0;
            }
          }
        }
      }
      @media screen and (max-width: 768px) {
        padding: var(--e-spacing-h8);
        height: fit-content;
        overflow: auto;
      }
      @include scrollbar;
      .el-collapse-item__arrow {
        margin-right: 20px;
        position: absolute;
        right: 4px;
        transform: rotateZ(90deg);
        font-size: 20px;
        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-text);
        }
      }
      .el-collapse-item__content {
        @media screen and (max-width: 768px) {
          font-size: var(--e-font-size-tip);
        }
      }
      .meet-item {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        text-align: left;
        padding: var(--e-spacing-h5);
        width: 100%;
        height: 100%;
        background-color: var(--e-color-bg3);
        border: 1px solid var(--e-color-bg3);
        border-left: none;
        position: relative;
        &::before {
          display: block;
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          width: 2px;
          height: 100%;
          background-color: var(--e-color-brand1);
        }
        .left-top {
          display: flex;
          align-items: center;
          .meet-name {
            margin-right: var(--e-spacing-h5);
            max-width: 400px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            font-size: var(--e-font-size-h7);
            color: var(--e-color-text1);
            line-height: var(--e-line-height-tip);
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
        }
        .more-detail {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          width: fit-content;
          height: 24px;
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-text);
          }
          @media screen and (min-width: 768px) {
            &:hover {
              .o-icon {
                transform: translateX(5px);
              }
            }
          }
          .sig {
            margin-left: 12px;
            padding-left: 12px;
            border-left: 1px solid var(--e-color-division1);
          }
          .o-icon {
            margin: 0 5px;
            color: var(--e-color-brand1);
            font-size: var(--e-font-size-h5);
            transition: all 0.3s;
            svg {
              color: var(--e-color-brand1);
            }
          }
        }
        .meeting-time {
          font-size: var(--e-font-size-text);
          color: var(--e-color-text4);
          line-height: var(--e-line-height-text);
          margin-top: 2px;
          @media screen and (min-width: 768px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
          .time-hour {
            margin-left: 6px;
          }
        }
        @media screen and (max-width: 768px) {
          background-color: var(--e-color-bg2);
          padding: var(--e-spacing-h6);
          border-left: 2px solid var(--e-color-brand1);
          .left-top {
            .meet-name {
              font-size: var(--e-font-size-text);
              font-weight: 700;
            }
          }
          .group-name {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: var(--e-font-size-tip);
            color: var(--e-color-text4);
          }
        }
      }
      .detail-time {
        position: absolute;
        top: 41px;
        transform: translateY(-50%);
        right: 55px;
        z-index: 8;
        @media screen and (max-width: 768px) {
          top: 35px;
        }
        .o-button {
          @media screen and (min-width: 768px) {
            &:hover {
              color: var(--e-color-brand1);
            }
          }
          @media screen and (max-width: 768px) {
            color: var(--e-color-brand1);
          }
          .prefix-icon {
            width: 16px;
          }
        }
      }
      .meet-detail {
        color: var(--e-color-text4);
        position: relative;

        .meeting-action {
          position: absolute;
          top: 0;
          right: 0;
          gap: var(--e-spacing-h7);
          display: flex;
          @media screen and (max-width: 768px) {
            position: static;
            margin-top: var(--e-spacing-h7);
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
      color: var(--e-color-text1);
      font-size: var(--e-font-size-h8);
      img {
        height: 216px;
      }
      p {
        margin-top: var(--e-spacing-h5);
      }
      @media screen and (max-width: 768px) {
        img {
          margin-top: var(--e-spacing-h5);
        }
        p {
          padding-bottom: var(--e-spacing-h5);
          font-size: var(--e-font-size-tip);
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .home-calendar {
    margin: 0 auto;
    align-items: center;
    flex-direction: column;
  }
}
</style>

<style lang="scss">
.book-dialog {
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  max-height: calc(100% - 10px);
  max-width: calc(100% - 10px);
  margin: 0;
  transform: translate(-50%, -50%);

  @media screen and (max-width: 768px) {
    .el-dialog__title {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }

    .el-form-item__label {
      font-size: var(--e-font-size-tip);
    }

    .o-button-size-small {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      padding: var(--e-spacing-h9) var(--e-spacing-h6);
    }
  }
}
.book-dialog .el-dialog__body {
  max-height: 100%;
  flex: 1;
  overflow-y: auto;
}
</style>
