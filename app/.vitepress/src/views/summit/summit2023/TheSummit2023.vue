<script setup lang="ts">
import { computed, ref } from 'vue';

import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitSchedule from './components/SummitSchedule.vue';

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
const getData = computed<Array<any>>(() => summitData.agenda);
// 控制上下午切换
const tabType = ref(0);
const renderData = computed<Array<Object>>(() => {
  if (tabType.value === 1) {
    return getData.value[0].content.content.slice(1);
  } else if (getData.value) {
    return getData.value[0].content.content.slice(0, 1);
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
      <div class="agenda">
        <h3>会议日程</h3>
        <div class="date">
          {{ getData[0].title }}
        </div>
        <div>
          <el-tabs v-model.number="tabType" class="schedule-tabs">
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
      <div class="previous">
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
    font-weight: 400;
    color: var(--o-color-text1);
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    text-align: center;
    margin-top: var(--o-spacing-h2);
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
</style>
