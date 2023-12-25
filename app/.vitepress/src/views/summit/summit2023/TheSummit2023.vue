<script setup lang="ts">
import { computed, ref } from 'vue';

import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import SummitGuests from './components/SummitGuests.vue';
import SummitLive from './components/SummitLive.vue';

import liveLight from './img/live.png';
import liveDark from './img/live-dark.png';
import qrcode from './img/qrcode.png';

import summitData from './data';
import { SUMMIT2023_JOIN } from '@/data/url-config';
import { useCommon } from '@/stores/common';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);

// 议程日期切换
const dateList = [
  { day: 27, month: 'DEC' },
  { day: 28, month: 'DEC' },
];
const showIndex = ref(1);
function setShowIndex(index: number) {
  showIndex.value = index;
  tabType.value = 0;
}
const getData = computed<any>(() => summitData.agenda[showIndex.value]);
// 控制上下午切换
const tabType = ref(0);
const renderData = computed<Array<Object>>(() => {
  if (tabType.value === 1) {
    return getData.value.content.content.slice(1);
  } else if (getData.value) {
    return getData.value.content.content.slice(0, 1);
  }
});
</script>
<template>
  <div class="summit-2023">
    <SummitBanner />

    <AppContent :mobile-top="40">
      <div class="summit-intro">
        <p v-for="item in summitData.details" :key="item">{{ item }}</p>
      </div>

      <div class="quick-start">
        <img class="qrcode" :src="qrcode" />
        <a
          class="start-link"
          :href="SUMMIT2023_JOIN"
          target="_blank"
          rel="noopener noreferrer"
        >
          <OButton size="small" type="primary"> 扫码报名 </OButton>
        </a>
      </div>
      <div class="summit-live">
        <h3>{{ summitData.live.title }}</h3>
        <SummitLive
          :live-data="summitData.live.liveData"
          class-name="live-btn2"
        ></SummitLive>
      </div>
      <div class="summit-agenda">
        <h3>会议日程</h3>
        <div class="date">
          <div
            v-for="(item, index) in dateList"
            :key="item.day"
            class="date-item"
            :class="{ active: showIndex === index }"
            @click="setShowIndex(index)"
          >
            <p class="date-day">{{ item.day }}</p>
            <p class="date-month">{{ item.month }}</p>
          </div>
        </div>
        <div>
          <el-tabs
            v-if="showIndex === 1"
            v-model.number="tabType"
            class="schedule-tabs"
          >
            <el-tab-pane :name="0">
              <template #label>
                <div class="time-tabs">上午：主论坛</div>
              </template>
            </el-tab-pane>
            <el-tab-pane :name="1">
              <template #label>
                <div class="time-tabs">下午：分论坛</div>
              </template>
            </el-tab-pane>
          </el-tabs>
          <template v-for="item in renderData" :key="item.lable">
            <SummitSchedule :agenda-data="item" />
          </template>
        </div>
      </div>
      <div class="summit-guest">
        <h3 class="guest-title">
          {{ summitData.guests.title }}
        </h3>
        <h4>
          {{ summitData.guests.guestListMain.title }}
        </h4>
        <SummitGuests
          :lecturer-list="summitData.guests.guestListMain.guestList"
          shape="circle"
          :web-columns-num="4"
          :mobile-columns-num="2"
          class="prime-forum"
        />
        <h4>
          {{ summitData.guests.guestListSub1.title }}
        </h4>
        <SummitGuests
          :lecturer-list="summitData.guests.guestListSub1.guestList"
          shape="circle"
          :web-columns-num="4"
          :mobile-columns-num="2"
        />
        <h4>
          {{ summitData.guests.guestListSub2.title }}
        </h4>
        <SummitGuests
          :lecturer-list="summitData.guests.guestListSub2.guestList"
          shape="circle"
          :web-columns-num="4"
          :mobile-columns-num="2"
          class="last-forum"
        />
        <h4>
          {{ summitData.guests.guestListSub3.title }}
        </h4>
        <SummitGuests
          :lecturer-list="summitData.guests.guestListSub3.guestList"
          shape="circle"
          :web-columns-num="4"
          :mobile-columns-num="2"
        />
        <h4>
          {{ summitData.guests.guestListSub4.title }}
        </h4>
        <SummitGuests
          :lecturer-list="summitData.guests.guestListSub4.guestList"
          shape="circle"
          :web-columns-num="4"
          :mobile-columns-num="2"
          class="last-forum2"
        />
      </div>
      <div class="summit-previous">
        <div class="previous-title">
          <h3>{{ summitData.previous.title }}</h3>
          <img :src="liveImg" alt="live" />
        </div>
        <div class="link-box">
          <p v-for="item in summitData.previous.content" :key="item.link">
            <a :href="item.link" target="_blank" rel="noopener noreferrer">{{
              item.title
            }}</a>
          </p>
        </div>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
@include in-dark {
  .qrcode {
    @include img-in-dark;
  }
}

@mixin floor-box {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
}
@mixin floor-title {
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
.summit-intro {
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-size: var(--o-font-size-h6);
  line-height: var(--o-line-height-h5);
  color: var(--o-color-text1);
  font-weight: 400;
  @media screen and (max-width: 768px) {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    gap: 4px;
  }
}

.quick-start {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 24px;
  .start-link {
    margin-top: 16px;
  }

  .qrcode {
    width: 200px;
    @media screen and (max-width: 1200px) {
      width: 180px;
    }
  }
}
.summit-live {
  @include floor-box();
  h3 {
    @include floor-title();
  }
  .live-room {
    @include floor-title();
  }
}
.summit-agenda {
  @include floor-box();
  h3 {
    @include floor-title();
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
      background: var(--o-color-brand1);
      border-color: var(--o-color-brand1);
    }
  }
}
.summit-guest {
  @include floor-box();
  h3 {
    @include floor-title();
  }
  h4 {
    margin-top: 20px;
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    font-weight: 400;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-top: var(--o-spacing-h5);
    }
  }
  .live-box {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--o-spacing-h4);
    }
  }
}
.summit-previous {
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

:deep(.prime-forum) {
  .lecturer-list-item {
    &:nth-child(1),
    &:nth-last-of-type(2) {
      grid-column-start: 2;
      grid-column-end: 3;

      @media (max-width: 1416px) {
        grid-column-start: 1;
        grid-column-end: 2;
      }

      @media (max-width: 768px) {
        grid-column-start: 1;
        grid-column-end: 2;
        margin-right: 0;
      }
    }

    &:nth-child(2),
    &:nth-last-of-type(1) {
      grid-column-start: 3;
      grid-column-end: 5;
      margin-left: -50%;

      @media (max-width: 1416px) {
        grid-column-start: 2;
        grid-column-end: 3;
        margin-left: 0;
      }

      @media (max-width: 768px) {
        grid-column-start: 2;
        grid-column-end: 3;
        margin-left: 0;
      }
    }
    &:nth-last-of-type(2) {
      @media (max-width: 1416px) {
        grid-column-start: 2;
        grid-column-end: 3;
        @media (max-width: 768px) {
          grid-column-start: 1;
          grid-column-end: 2;
          margin-right: 0;
        }
      }
    }
    &:nth-last-of-type(1) {
      @media (max-width: 1416px) {
        grid-column-start: 3;
        grid-column-end: 4;
        @media (max-width: 768px) {
          grid-column-start: 2;
          grid-column-end: 3;
          margin-right: 0;
        }
      }
    }
  }
}
:deep(.last-forum) {
  .lecturer-list-item {
    &:nth-last-of-type(1) {
      grid-column-end: span 4;
      justify-self: center;
      @media (max-width: 1416px) {
        grid-column-end: span 1;
      }
    }
  }
}
:deep(.last-forum2) {
  .lecturer-list-item {
    &:nth-last-of-type(2) {
      grid-column-start: 2;
      grid-column-end: 3;
      @media (max-width: 1416px) {
        grid-column-start: 3;
        grid-column-end: 4;
      }
      @media (max-width: 768px) {
        grid-column-start: 1;
        grid-column-end: 2;
        margin-right: 0;
      }
    }
    &:nth-last-of-type(1) {
      grid-column-start: 3;
      grid-column-end: 4;
      @media (max-width: 1416px) {
        grid-column-start: 1;
        grid-column-end: 2;
        @media (max-width: 768px) {
          grid-column-start: 2;
          grid-column-end: 3;
        }
      }
    }
  }
}
</style>
