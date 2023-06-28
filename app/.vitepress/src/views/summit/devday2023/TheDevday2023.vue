<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useCommon } from '@/stores/common';

import AppContext from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import SummitGuests from './components/SummitGuests.vue';

import guestsData from './data/guests';
import summitData from './data';
import data1 from './data/agenda1';
import data2 from './data/agenda2';

import liveLight from './img/live.png';
import liveDark from './img/live-dark.png';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);

// 会议时间
const meetingTime = [
  {
    name: 'schedule-25',
    day: 25,
    label: 'MAY',
  },
  {
    name: 'schedule-26',
    day: 26,
    label: 'MAY',
  },
];
const getData: any = ref({
  'schedule-25': {
    name: 'schedule-25',
    content: JSON.parse(data2.content),
  },
  'schedule-26': {
    name: 'schedule-26',
    content: JSON.parse(data1.content),
  },
});
const agendaData2: any = ref([]);

agendaData2.value = getData.value[meetingTime[1].name].content.content.slice(
  0,
  1
);

const showIndex = ref(1);
function setShowIndex(index: number) {
  showIndex.value = index;
}
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
  <SummitBanner :banner-data="summitData.banner" />
  <AppContext>
    <div class="detail">
      <p v-for="item in summitData.detail" :key="item">{{ item }}</p>
    </div>
    <div class="agenda" :class="{ 'min-height': showIndex === 1 }">
      <h3>会议日程</h3>
      <div class="date">
        <div
          v-for="(item, index) in meetingTime"
          :key="item.name"
          class="date-item"
          :class="{ active: showIndex === index }"
          @click="setShowIndex(index)"
        >
          <p class="date-day">{{ item.day }}</p>
          <p class="date-month">{{ item.label }}</p>
        </div>
      </div>
      <!-- 25 -->
      <template
        v-if="
          getData[meetingTime[0].name] &&
          getData[meetingTime[0].name].content.content
        "
      >
        <template
          v-for="item in getData[meetingTime[0].name].content.content"
          :key="item.lable"
        >
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
    <div class="guests">
      <h3 class="title-bar">演讲嘉宾</h3>
      <SummitGuests
        :lecturer-list="guestsData"
        shape="circle"
        :web-columns-num="4"
        :mobile-columns-num="2"
      />
    </div>
    <div class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <p v-for="item in summitData.previous.content" :key="item.link">
          <a :href="item.link" target="_blank" rel="noopener noreferrer">{{ item.title }}</a>
        </p>
      </div>
    </div>
  </AppContext>
</template>
<style scoped lang="scss">
.title-bar {
  text-align: center;
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  color: var(--o-color-text1);
  font-weight: 300;
  margin: 64px 0 40px;
  @media (max-width: 767px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin: 40px 0 24px;
  }
}

@mixin floor-box {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
  }
  .summit-banner-mo {
    display: none;
    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.detail {
  p {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    font-weight: 400;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.collect {
  @include floor-box();
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
  gap: var(--o-spacing-h4);
  @media screen and (max-width: 1170px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 870px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    padding: 0 12px;
    grid-template-columns: auto;
    gap: var(--o-spacing-h4);
  }

  .collect-item {
    width: 100%;
    max-width: 336px;
    height: 352px;
    background-size: cover;
    box-shadow: var(--o-shadow-l2);
    &:hover {
      box-shadow: var(--o-shadow-l2_hover);
    }
    @media screen and (max-width: 768px) {
      width: 100%;
      max-width: 304px;
      height: 304px;
    }
    a {
      display: flex;
      width: 100%;
      height: 100%;
      align-items: center;
      .text {
        width: 100%;
        padding: 0 40px;
        .item-title {
          text-align: center;
          font-size: var(--o-font-size-h3);
          color: #000;
          // @media screen and (max-width: 768px) {
          //   font-size: var(--o-font-size-text);
          // }
          & + .item-title {
            margin-top: var(--o-spacing-h4);
            margin-left: auto;
            margin-right: auto;
            font-size: var(--o-font-size-h4);
            line-height: var(--o-line-height-h4);
            width: 180px;
            // @media screen and (max-width: 768px) {
            //   font-size: var(--o-font-size-text);
            // }
          }
        }
      }
    }
  }
}
.live,
.agenda {
  margin-top: var(--o-spacing-h1);
  @media (max-width: 767px) {
    margin-top: var(--o-spacing-h2);
  }
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 300;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
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
        background-color: var(--o-color-brand1);
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
      border: 1px solid var(--o-color-border2);
      color: var(--o-color-text1);
      text-align: center;
      background: var(--o-color-bg2);
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
      background: var(--o-color-brand1);
      border-color: var(--o-color-brand1);
    }
  }
}
.min-height {
  min-height: 1160px;
  @media screen and (max-width: 1100px) {
    min-height: fit-content;
  }
}
.previous {
  @include floor-box();
  .previous-title {
    display: flex;
    h3 {
      font-size: 26px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-text);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: 36px;
    width: 100%;
    @media screen and (max-width: 768px) {
      width: 100%;
      margin-top: var(--o-spacing-h4);
    }
    p {
      & ~ p {
        margin-top: var(--o-spacing-h4);
      }
      a {
        font-size: var(--o-font-size-h6);
        line-height: var(--o-line-height-h6);
        @media screen and (max-width: 768px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
        & + a {
          margin-top: var(--o-spacing-h4);
          @media screen and (max-width: 768px) {
            margin-top: var(--o-spacing-h8);
          }
        }
      }
    }
  }
}
.dark .collect-item,
.dark img {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
</style>
