<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useCommon } from '@/stores/common';
import SummitSchedule from './SummitSchedule.vue';

import { handleError } from '@/shared/utils';

import data1 from '../data/agenda1';
import data2 from '../data/agenda2';

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

// 会议时间
const meetingTime = [
  {
    name: 'schedule-20',
    day: 20,
    label: 'JUNE',
  },
  {
    name: 'schedule-21',
    day: 21,
    label: 'JUNE',
  },
];

const dataContent1 = computed(() => {
  let temp;
  try {
    temp = JSON.parse(data1.content.replace(/\n/g, '\\n'));
  } catch (error) {
    handleError();
  }
  return temp;
});
const dataContent2 = computed(() => {
  let temp;
  try {
    temp = JSON.parse(data2.content.replace(/\n/g, '\\n'));
  } catch (error) {
    handleError();
  }
  return temp;
});

const getData: any = ref({
  'schedule-20': {
    name: 'schedule-20',
    content: dataContent1.value,
  },
  'schedule-21': {
    name: 'schedule-21',
    content: dataContent2.value,
  },
});

const agendaData2: any = ref([]);
agendaData2.value = getData.value[meetingTime[1].name].content.content.slice(0, 1);

const showIndex = ref(1);
const setShowIndex = (index: number) => {
  showIndex.value = index;
};

// 控制上下午切换
const tabType = ref(0);
watch(
  tabType,
  () => {
    const DATA = getData.value && getData.value[meetingTime[1].name];
    if (tabType.value === 1 && DATA) {
      agendaData2.value = DATA.content.content.slice(1);
    } else if (DATA) {
      agendaData2.value = DATA.content.content.slice(0, 1);
    }
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="summit-agenda">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ agendaData.titleBg }}</p>
      <p class="title">{{ agendaData.title }}</p>
    </div>
    <div class="date">
      <div v-for="(item, index) in meetingTime" :key="item.name" class="date-item" :class="{ active: showIndex === index }" @click="setShowIndex(index)">
        <p class="date-day">{{ item.day }}</p>
        <p class="date-month">{{ item.label }}</p>
      </div>
    </div>
    <template v-if="getData[meetingTime[0].name] && getData[meetingTime[0].name].content.content">
      <template v-for="item in getData[meetingTime[0].name].content.content" :key="item.lable">
        <SummitSchedule v-show="showIndex === 0" :agenda-data="item" />
      </template>
    </template>
    <div v-show="showIndex === 1">
      <el-tabs v-model.number="tabType" class="schedule-tabs">
        <el-tab-pane :name="0">
          <template #label>
            <div class="time-tabs">上午</div>
          </template>
        </el-tab-pane>
        <el-tab-pane :name="1">
          <template #label>
            <div class="time-tabs">下午</div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <template v-for="item in agendaData2" :key="item.lable">
        <SummitSchedule :agenda-data="item" />
      </template>
    </div>
  </div>
</template>
<style scoped lang="scss">
.summit-agenda {
  margin-bottom: 44px;
  @media (max-width: 767px) {
    margin-bottom: 31px;
  }
}

.date {
  display: flex;
  justify-content: center;
  margin-top: 40px;
  @media (max-width: 767px) {
    margin-top: 24px;
  }
  .date-item {
    cursor: pointer;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #cbcbcb;
    border-radius: 8px;
    border: 1px solid #cbcbcb;
    transition: all 0.3s ease-out;

    & ~ div {
      margin-left: 40px;
      @media (max-width: 767px) {
        margin-left: 24px;
      }
    }
    &.active {
      color: #fff;
      background-color: var(--e-color-brand1);
      border: 1px solid #fff;
    }
    .date-day {
      padding: 13px 17px 3px 15px;
      line-height: 48px;
      font-size: 48px;
      font-weight: 700;
      border-bottom: 1px solid #cbcbcb;
      @media screen and (max-width: 1120px) {
        padding: 6px 16px;
        font-size: 32px;
        line-height: 32px;
      }
    }
    .date-month {
      padding: 6px 0;
      font-size: 24px;
      font-weight: 100;
      line-height: 24px;
      @media screen and (max-width: 1120px) {
        padding: 4px 0;
        font-size: 16px;
      }
    }
  }
}
.schedule-tabs {
  position: relative;
  text-align: center;
  margin-top: 24px;
  :deep(.el-tabs__content) {
    overflow: visible;
    .el-button {
      position: absolute;
      left: 0;
      top: -75px;
      z-index: 1;
    }
  }
  :deep(.el-tabs__nav) {
    float: none;
    display: inline-block;
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      padding: 0;
    }
  }
  :deep(.el-tabs__nav-wrap) {
    &::after {
      display: none;
    }
  }
  .time-tabs {
    display: inline-block;
    margin: 0 0 24px;
    cursor: pointer;
    border: 1px solid var(--e-color-border2);
    color: var(--e-color-text1);
    text-align: center;
    background: var(--e-color-bg2);
    font-size: 14px;
    line-height: 38px;
    padding: 0 16px;
    min-width: 160px;
    @media (max-width: 1100px) {
      line-height: 28px;
      font-size: 12px;
      padding: 0 12px;
      min-width: 100px;
    }
  }

  .is-active .time-tabs {
    color: #fff;
    background: var(--e-color-brand1);
    border-color: var(--e-color-brand1);
  }
}
</style>
