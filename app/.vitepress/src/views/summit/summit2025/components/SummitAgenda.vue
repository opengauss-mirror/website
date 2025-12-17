<script setup lang="ts">
import { computed, PropType, ref } from 'vue';
import { useCommon } from '@/stores/common';

import SummitSchedule from './SummitSchedule.vue';
import { OIcon, OIconTime } from '@opensig/opendesign';
import floorImg from '../img/floor-img.png';

const props = defineProps({
  liveList: {
    type: Array as PropType<{ name: string; time: string; }[]>,
    default: () => []
  },
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
    return getData.value.content.content;
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
            <div class="time-tabs"><span class="time">上午：</span> 主论坛</div>
          </template>
        </el-tab-pane>
        <el-tab-pane :name="1">
          <template #label>
            <div class="time-tabs"><span class="time">下午：</span> 分论坛</div>
          </template>
        </el-tab-pane>
      </el-tabs>
      <template v-for="item in renderData" :key="item.lable">
        <SummitSchedule :agenda-data="item" />
      </template>
    </div>
    <div class="agenda-cards" v-if="showIndex === 1">
      <template v-for="item in liveList" :key="item.name">
        <div v-if="item.name" class="item">
          <p>{{ item.name }}</p>
          <p class="time">
            <OIcon style="margin-right: 8px; font-size: 1.5em;"><OIconTime /></OIcon>
            {{ item.time }}
          </p>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agenda-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 32px;
  margin-top: 32px;
  @include respond-to('<=pad_v') {
    margin-top: 18px;
    display: block;
  }
  .item {
    box-sizing: border-box;
    background-color: var(--e-color-bg2);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 32px;
    @include h2;
    @include respond-to('<=pad_v') {
      font-size: 14px;
      height: 96px;
      padding: 16px;
      align-items: start;
      &:not(:first-child) {
        margin-top: 16px;
      }
    }

    .time {
      display: flex;
      @include respond-to('<=pad_v') {
        margin-top: 4px;
      }
      margin-top: 16px;

      align-items: center;
      display: flex;
      align-items: center;
      @include text1;
    }
  }
}
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
    @include respond-to('<=pad_v') {
      .time {
        display: none;
      }
    }
  }

  .is-active .time-tabs {
    color: #fff;
    background: var(--e-color-brand1);
    border-color: var(--e-color-brand1);
  }
}
</style>
