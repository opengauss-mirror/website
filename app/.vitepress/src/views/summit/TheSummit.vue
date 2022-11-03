<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';
import SummitLive from './components/SummitLive.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitGuests from './components/SummitGuests.vue';
import LinkPanel from '@/components/LinkPanel.vue';

import SummitConfig from '@/data/summit/';

import banner from '@/assets/category/summit/2022/banner.jpg';
import banner_mo from '@/assets/category/summit/2022/banner_mo.png';
import bannerText_mo from '@/assets/category/summit/2022/text_mo.png';
import bannerText from '@/assets/category/summit/2022/text@2x.png';

import IconTime from '~icons/app/icon-time.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const i18n = useI18n();

const SummitData = SummitConfig.online.list;

const tabType = ref('main');
const otherTabType = ref(0);

const bannerInfo = {
  pc_banner: banner,
  pc_text: bannerText,
  mo_banner: banner_mo,
  mo_text: bannerText_mo,
  link: '',
  button: '观看直播',
};
</script>

<template>
  <SummitBanner :banner="bannerInfo" />
  <AppContent>
    <div class="summit-info">
      <p class="text">{{ SummitConfig.desc[0] }}</p>
      <p class="text">{{ SummitConfig.desc[1] }}</p>
    </div>
    <h3 class="titleBar">{{ SummitConfig.titleBar[0] }}</h3>
    <SummitLive :live-data="SummitConfig.LIVEDATA" class-name="odd2022" />
    <h3 class="titleBar">{{ SummitConfig.titleBar[1] }}</h3>
    <div class="offline-panel">
      <h4 class="meetingtitle">{{ SummitConfig.offline.daytime }}</h4>
      <div class="agendaList">
        <div
          v-for="item in SummitConfig.offline.list"
          :key="item.time"
          class="agendaItem"
        >
          <span class="time"><IconTime />{{ item.time }}</span>
          <div class="info">
            <span v-for="sub in item.option" class="inline">{{ sub }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="online-panel">
      <h4 class="meetingtitle">{{ SummitConfig.online.daytime }}</h4>
      <OTabs v-model="tabType" class="schedule-tabs">
        <el-tab-pane v-for="item in SummitData" :key="item.id" :name="item.id">
          <template #label>
            <div class="timeTabs">
              <span class="taber-top"> {{ item.type }}</span>
              <span class="taber-bottom"> {{ item.time }}</span>
            </div>
          </template>
        </el-tab-pane>
      </OTabs>
      <OContainer :level-index="1">
        <div class="schedule-item" :class="{ isShow: tabType === 'main' }">
          <SummitSchedule :options="SummitData[0].children" />
        </div>
        <div
          class="schedule-item other"
          :class="{ isShow: tabType === 'other' }"
        >
          <OTabs v-model="otherTabType" class="other-tabs">
            <OTabPane
              v-for="item in SummitData[1].children"
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
            <h3>{{ SummitData[2].name }}</h3>
            <a class="link" :href="SummitData[2].path" target="_blank">
              {{ SummitData[2].desc }}
              <IconArrowRight />
            </a>
          </div>
          <div class="sig-list">
            <span class="time"><IconTime />{{ SummitData[2].time1 }}</span>
            <ul>
              <li v-for="item in SummitData[2].children" :key="item.name">
                <span class="name">{{ item.name }}</span>
                <span class="desc">{{ item.desc }}</span>
                <a :href="item.link" target="_blank" class="link">报名</a>
              </li>
            </ul>
          </div>
        </div>
      </OContainer>
    </div>
    <h3 class="titleBar">{{ SummitConfig.titleBar[2] }}</h3>
    <SummitGuests
      :lecturer-list="SummitConfig.LECTURER_LIST"
      shape="circle"
      :web-columns-num="4"
      :mobile-columns-num="2"
    />
    <div class="summit-partners">
      <h3 class="titleBar">{{ SummitConfig.titleBar[3] }}</h3>
      <h4 class="meetingtitle">{{ SummitConfig.partnersList.title[0] }}</h4>
      <LinkPanel
        :link-list="SummitConfig.partnersList.p1"
        :islink="false"
        class="one"
      />
      <h4 class="meetingtitle">{{ SummitConfig.partnersList.title[1] }}</h4>
      <LinkPanel
        :link-list="SummitConfig.partnersList.p2"
        :islink="false"
        class="one"
      />
      <h4 class="meetingtitle">{{ SummitConfig.partnersList.title[2] }}</h4>
      <LinkPanel :link-list="SummitConfig.partnersList.p3" :islink="false" />
      <h4 class="meetingtitle">{{ SummitConfig.partnersList.title[3] }}</h4>
      <LinkPanel :link-list="SummitConfig.partnersList.p4" :islink="false" />
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.one {
  width: 356px;
  display: block;
  margin: 0 auto;
}
.summit-partners {
  .meetingtitle {
    @media (max-width: 767px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .picture-panel {
    margin-bottom: 40px;
    padding-top: 0;
  }
  :deep(.picture-panel) {
    img {
      transform: scale(0.7);
    }
  }
}
.summit-info {
  .text {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    text-indent: 2em;
    text-align: justify;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.titleBar {
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
.meetingtitle {
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
.agendaList {
  margin: 0 0 40px;
  @media (max-width: 767px) {
    margin: 0 0 24px;
  }
}
.agendaItem {
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
  .timeTabs {
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

  .is-active .timeTabs {
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
</style>
