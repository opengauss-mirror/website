<script setup lang="ts">
import { computed, ref } from 'vue';
import { useCommon } from '@/stores/common';

import SummitSchedule from './SummitSchedule.vue';
import floorImg from '../img/floor-img.png';

const props = defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => null,
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

// 议程日期切换
const dateList = [
  { day: 25, month: 'DEC' },
  { day: 26, month: 'DEC' },
];
const showIndex = ref(0);
function setShowIndex(index: number) {
  showIndex.value = index;
  tabType.value = 0;
}

const getData = computed<any>(() => props.agendaData.list[showIndex.value]);
// 控制上下午切换
const tabType = ref(0);
const renderData = computed(() => {
  if (tabType.value === 1) {
    return getData.value.content.content.slice(1);
  } else if (getData.value) {
    return getData.value.content.content.slice(0, 1);
  }
  return [];
});
</script>
<template>
  <div class="summit-agenda">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ agendaData.titleBg }}</p>
      <p class="title">{{ agendaData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
    </div>
    <div class="date">
      <div v-for="(item, index) in dateList" :key="item.day" class="date-item" :class="{ active: showIndex === index }" @click="setShowIndex(index)">
        <p class="date-day">{{ item.day }}</p>
        <p class="date-month">{{ item.month }}</p>
      </div>
    </div>
    <div>
      <el-tabs v-if="showIndex === 1" v-model.number="tabType" class="schedule-tabs">
        <el-tab-pane :name="0">
          <template #label>
            <div class="time-tabs">主论坛</div>
          </template>
        </el-tab-pane>
        <el-tab-pane :name="1">
          <template #label>
            <div class="time-tabs">分论坛</div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <div class="time-schedule">
        <div class="time">
          <span class="time-title">12月{{ dateList[showIndex].day }}</span>
        </div>
        <span class="time-en">{{ dateList[showIndex].month }} {{ dateList[showIndex].day }}</span>
      </div>
      <div v-if="showIndex === 1" class="type">{{ tabType === 1 ? '下午' : '上午' }}</div>
      <template v-for="item in renderData" :key="item.lable">
        <SummitSchedule :agenda-data="item" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.summit-agenda {
  margin-top: 44px;
  @media (max-width: 767px) {
    margin-top: 31px;
  }
}
.date {
  display: flex;
  justify-content: center;
  margin-top: 24px;
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
    }
    &.active {
      color: #fff;
      background-color: var(--o-color-primary1);
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
  margin-top: 24px;
  display: flex;
  align-items: center;
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
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      padding: 0;
    }
  }
  :deep(.el-tabs__header) {
    margin: 0;
  }
  :deep(.el-tabs__nav-wrap) {
    &::after {
      display: none;
    }
  }
  .time-tabs {
    display: inline-block;
    cursor: pointer;
    border: 1px solid var(--e-color-border2);
    color: var(--e-color-text1);
    text-align: center;
    background: var(--e-color-bg2);
    font-size: 14px;
    line-height: 38px;
    padding: 0 16px;
    min-width: 172px;
    @media (max-width: 1100px) {
      line-height: 28px;
      font-size: 12px;
      padding: 0 12px;
      min-width: 100px;
    }
  }

  .is-active .time-tabs {
    color: #fff;
    background: var(--o-color-primary1);
    border-color: var(--o-color-primary1);
  }
}

.time-schedule {
  position: relative;
  margin-top: 16px;
  .time {
    padding: 11px 0 16px;
    border-bottom: 1px solid rgba(125, 50, 234, 0.25);
    @media (max-width: 767px) {
      padding: 0 0 3px;
      margin-top: var(--e-spacing-h4);
    }
  }
  .time-title {
    font-size: 22px;
    line-height: 30px;
    font-weight: 500;
    color: var(--e-color-brand1);
    padding: 13px 0 17px;
    border-bottom: 2px solid var(--e-color-brand1);
    @media (max-width: 767px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      padding: 0 0 4px;
    }
  }
  .time-en {
    opacity: 0.25;
    font-size: 32px;
    color: var(--e-color-brand1);
    font-weight: 500;
    position: absolute;
    top: 0;
    right: 0;
    @media (max-width: 767px) {
      font-size: var(--e-font-size-h8);
    }
  }
}
.type {
  width: 160px;
  font-size: var(--e-font-size-h6);
  line-height: var(--e-line-height-h6);
  background-image: linear-gradient(90deg, rgba(125, 50, 234, 1) 0%, rgba(125, 50, 234, 0) 100%);
  padding: var(--e-spacing-h10) var(--e-spacing-h4);
  color: #fff;
  font-weight: 500;
  border-radius: 4px;
  margin-top: 40px;
  @media (max-width: 767px) {
    width: 128px;
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    padding: var(--e-spacing-h10) var(--e-spacing-h6);
    margin-top: 16px;
  }
}
</style>
