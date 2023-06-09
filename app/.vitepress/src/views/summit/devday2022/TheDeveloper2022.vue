<script lang="ts" setup>
import { ref } from 'vue';
import AppContent from '@/components/AppContent.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import SummitGuests from './components/SummitGuests.vue';
import LinkPanel from './components/LinkPanel.vue';

import summitData from './data';

import banner from './img/banner.jpg';
import banner_mo from './img/banner_mo.png';
import bannerText_mo from './img/text_mo.png';
import bannerText from './img/text@2x.png';

import IconTime from '~icons/app/icon-time.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const tabType = ref('main');
const otherTabType = ref(0);
</script>

<template>
  <div class="summit-banner">
    <img class="banner-img pc" :src="banner" alt="" />
    <img class="banner-img mo" :src="banner_mo" alt="" />
    <div class="inner">
      <div>
        <img class="cover pc" :src="bannerText" alt="" />
        <img class="cover mo" :src="bannerText_mo" alt="" />
      </div>
    </div>
  </div>
  <AppContent>
    <div class="summit-info">
      <p class="text">{{ summitData.desc[0] }}</p>
      <p class="text">{{ summitData.desc[1] }}</p>
    </div>
    <h3 class="title-bar">{{ summitData.titleBar[1] }}</h3>
    <div class="offline-panel">
      <h4 class="meeting-title">{{ summitData.offline.daytime }}</h4>
      <div class="agenda-list">
        <div
          v-for="item in summitData.offline.list"
          :key="item.time"
          class="agenda-item"
        >
          <span class="time"><IconTime />{{ item.time }}</span>
          <div class="info">
            <span v-for="sub in item.option" :key="sub" class="inline">{{
              sub
            }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="online-panel">
      <h4 class="meeting-title">{{ summitData.online.daytime }}</h4>
      <OTabs v-model="tabType" class="schedule-tabs">
        <el-tab-pane
          v-for="item in summitData.online.list"
          :key="item.id"
          :name="item.id"
        >
          <template #label>
            <div class="time-tabs">
              <span class="taber-top"> {{ item.type }}</span>
              <span class="taber-bottom"> {{ item.time }}</span>
            </div>
          </template>
        </el-tab-pane>
      </OTabs>
      <OContainer :level-index="1">
        <div class="schedule-item" :class="{ isShow: tabType === 'main' }">
          <SummitSchedule :options="summitData.online.list[0].children" />
        </div>
        <div
          class="schedule-item other"
          :class="{ isShow: tabType === 'other' }"
        >
          <OTabs v-model="otherTabType" class="other-tabs">
            <OTabPane
              v-for="item in summitData.online.list[1].children"
              :key="item.id"
              :label="item.name"
              :name="item.id"
            >
              <p class="other-text">联合主办：{{ item.desc }}</p>
              <SummitSchedule :options="item.children" />
            </OTabPane>
          </OTabs>
        </div>
        <div class="schedule-item" :class="{ isShow: tabType === 'sig' }">
          <div class="sig-box">
            <h3>{{ summitData.online.list[2].name }}</h3>
            <a
              class="link"
              :href="summitData.online.list[2].path"
              target="_blank"
            >
              {{ summitData.online.list[2].desc }}
              <IconArrowRight />
            </a>
          </div>
          <div class="sig-list">
            <span class="time"
              ><IconTime />{{ summitData.online.list[2].time1 }}</span
            >
            <ul>
              <li
                v-for="item in summitData.online.list[2].children"
                :key="item.name"
              >
                <span class="name">{{ item.name }}</span>
                <span class="desc">{{ item.desc }}</span>
                <a :href="item.link" target="_blank" class="link">报名</a>
              </li>
            </ul>
          </div>
        </div>
      </OContainer>
    </div>
    <h3 class="title-bar">{{ summitData.titleBar[2] }}</h3>
    <SummitGuests
      :lecturer-list="summitData.guestsList"
      shape="circle"
      :web-columns-num="4"
      :mobile-columns-num="2"
    />
    <div class="summit-partners">
      <h3 class="title-bar">{{ summitData.titleBar[3] }}</h3>
      <h4 class="meeting-title">
        {{ summitData.partnersList.title[0] }}
      </h4>
      <LinkPanel
        :link-list="summitData.partnersList.p1"
        :islink="false"
        class="one"
      />
      <h4 class="meeting-title">
        {{ summitData.partnersList.title[1] }}
      </h4>
      <LinkPanel
        :link-list="summitData.partnersList.p2"
        :islink="false"
        class="one"
      />
      <h4 class="meeting-title">
        {{ summitData.partnersList.title[2] }}
      </h4>
      <LinkPanel :link-list="summitData.partnersList.p3" :islink="false" />
      <h4 class="meeting-title">
        {{ summitData.partnersList.title[3] }}
      </h4>
      <LinkPanel :link-list="summitData.partnersList.p4" :islink="false" />
    </div>
    <div class="previous">
      <h4 class="meeting-title">{{ summitData.titleBar[4] }}</h4>
      <a
        v-for="item in summitData.previous"
        :key="item.link"
        :href="item.link"
        target="_blank"
        >{{ item.title }}</a
      >
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.pc {
  display: block;
  @media (max-width: 767px) {
    display: none;
  }
}
.mo {
  display: none;
  @media (max-width: 767px) {
    display: block;
  }
}
.summit-banner {
  height: 380px;
  position: relative;
  .banner-img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
  .inner {
    max-width: 1504px;
    padding: 0 44px;
    margin: 0 auto;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    .cover {
      object-fit: cover;
      height: 140px;
      @media (max-width: 767px) {
        width: inherit;
        height: 106px;
      }
    }
    .cover2 {
      margin-top: 12px;
      display: block;
    }
    .ill {
      position: absolute;
      right: 44px;
      top: 50%;
      transform: translateY(-50%);
      @media (max-width: 767px) {
        display: none;
      }
    }
    .banner-btn {
      margin: 16px 0 0;
      color: #fff;
    }
    @media (max-width: 767px) {
      justify-content: center;
      text-align: center;
    }
  }
  @media (max-width: 767px) {
    height: 320px;
  }
}

.one {
  max-width: 356px;
  display: block;
  margin: 0 auto;
  @media (max-width: 767px) {
    width: 100%;
  }
}
.summit-partners {
  .meeting-title {
    @media (max-width: 767px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .picture-panel {
    margin-bottom: 40px;
    padding-top: 0;
  }
}
.summit-info {
  .text {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    text-indent: 2em;
    text-align: justify;
    margin-bottom: 8px;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
}
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
.meeting-title {
  font-weight: 400;
  color: var(--o-color-text1);
  font-size: var(--o-font-size-h5);
  line-height: var(--o-line-height-h5);
  text-align: center;
  margin-bottom: 24px;
  @media (max-width: 767px) {
    margin-bottom: 12px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
}
.agenda-list {
  margin: 0 0 40px;
  @media (max-width: 767px) {
    margin: 0 0 24px;
  }
}
.agenda-item {
  display: flex;
  line-height: 32px;
  margin-bottom: 16px;
  align-items: center;
  .time {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text4);
    width: 192px;
    display: flex;
    align-items: center;
    svg {
      width: 18px;
      height: 18px;
      color: var(--o-color-text4);
      margin-right: 6px;
      @media screen and (max-width: 1100px) {
        display: none;
      }
    }
    @media screen and (max-width: 1100px) {
      font-size: 12px;
      width: 80px;
      white-space: nowrap;
    }
  }
  .info {
    flex: 1;
    display: flex;
    align-items: center;
    height: 64px;
    justify-content: center;
    gap: 24px;
    span {
      color: var(--o-color-text1);
      line-height: 64px;
      background-color: var(--o-color-bg1);
      border-radius: 2px;
      border: 1px solid #7d32ea;
      flex: 1;
      font-size: var(--o-font-size-h7);
      text-align: center;
      @media (max-width: 1100px) {
        line-height: 48px;
        font-size: 12px;
        min-height: 40px;
        line-height: 1.25;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 6px;
      }
    }
    @media (max-width: 1100px) {
      width: auto;
      margin-right: 0;
      height: auto;
      gap: 8px;
    }
  }
}

.schedule-item {
  display: none;
  padding: 24px;
  &.isShow {
    display: block;
  }
  @media (max-width: 1100px) {
    padding: 16px;
  }
}
.other-tabs {
  margin-bottom: 24px;
  :deep(.el-tabs__nav) {
    float: none;
    display: inline-block;
    @media (max-width: 1100px) {
      line-height: 44px;
    }
  }
  :deep(.el-tabs__header) {
    text-align: center;
    .el-tabs__item {
      @media (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
  }
  .other-text {
    text-align: center;
    margin: 24px 0;
    color: var(--o-color-text1);
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    text-align: center;
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin: 16px 0;
    }
  }
}
.schedule-tabs {
  text-align: center;
  margin-top: 24px;
  :deep(.el-tabs__nav) {
    float: none;
    display: inline-block;
    .el-tabs__active-bar {
      display: none;
    }
    .el-tabs__item {
      padding: 0 10px;
    }
  }
  .time-tabs {
    display: inline-block;
    margin: 0 0 24px;
    cursor: pointer;
    border-radius: 8px;
    border: 1px solid var(--o-color-border2);
    color: var(--o-color-text1);
    width: 120px;
    text-align: center;
    background: var(--o-color-bg2);
    .taber-top {
      line-height: 64px;
      font-size: 24px;
      @media (max-width: 1100px) {
        line-height: 48px;
        font-size: 16px;
      }
    }
    .taber-bottom {
      border-top: 1px solid var(--o-color-border2);
      font-size: 20px;
      line-height: 36px;
      display: block;
      @media (max-width: 1100px) {
        font-size: 14px;
        line-height: 32px;
      }
    }
    @media (max-width: 1100px) {
      width: 88px;
    }
  }

  .is-active .time-tabs {
    color: #fff;
    background: var(--o-color-brand1);
    border-color: var(--o-color-brand2);
  }
}
.sig-box {
  text-align: center;
  margin: 12px 0 24px;
  h3 {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .link {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    margin-top: 12px;
    display: inline-flex;
    align-items: center;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
    svg {
      width: 18px;
      height: 18px;
      margin-left: 8px;
      @media screen and (max-width: 1100px) {
        display: none;
      }
    }
  }
}
.sig-list {
  display: flex;
  justify-content: space-between;
  .time {
    width: 192px;
    color: var(--o-color-text4);
    height: 20px;
    white-space: nowrap;
    font-size: 18px;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      width: 80px;
    }
    svg {
      width: 18px;
      height: 18px;
      color: var(--o-color-text4);
      margin-right: 6px;
      @media screen and (max-width: 1100px) {
        display: none;
      }
    }
  }
  ul {
    flex: 1;
    li {
      background: var(--o-color-bg2);
      border-radius: 2px;
      border: 1px solid var(--o-color-brand1);
      font-size: 18px;
      padding: 16px 24px;
      position: relative;
      margin-bottom: 16px;
      .name {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text1);
        display: block;
        font-weight: 500;
      }
      .desc {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text4);
        margin-top: 10px;
        display: block;
      }
      .link {
        position: absolute;
        top: 0;
        right: 0;
        width: 60px;
        line-height: 40px;
        background: rgba(125, 50, 234, 0.1);
        border-radius: 0px 2px 0px 0px;
        font-size: 14px;
        color: var(--o-color-brand1);
        display: block;
        text-align: center;
      }
      @media screen and (max-width: 1100px) {
        padding: 8px 36px 8px 16px;
        margin-bottom: 8px;
        .name {
          font-size: 14px;
          line-height: 24px;
        }
        .desc {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          margin-top: 4px;
        }
        .link {
          width: 32px;
          bottom: 0;
          padding: 0 5px;
          line-height: 24px;
          display: flex;
          align-items: center;
        }
      }
    }
  }
}
.previous {
  margin: 0 auto;
  text-align: center;
  h2 {
    margin-bottom: 24px;
  }
  a {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    @media screen and(max-width:767px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
}
</style>
