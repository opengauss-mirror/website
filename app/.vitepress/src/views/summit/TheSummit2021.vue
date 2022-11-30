<script lang="ts" setup>
import { ref } from 'vue';

import AppContent from '@/components/AppContent.vue';
import SummitLive from './components/SummitLive.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import SummitBanner from './components/SummitBanner.vue';
import LinkPanel from '@/components/LinkPanel.vue';

import SummitConfig from '@/data/summit/';

import banner from '@/assets/category/summit/2021/banner.jpg';
import banner_mo from '@/assets/category/summit/2021/banner_mo.png';
import bannerText from '@/assets/category/summit/2021/text.png';
import illustration from '@/assets/category/summit/2021/illustration.png';
import text2 from '@/assets/category/summit/2021/text2.png';

const SummitData: any = SummitConfig.data2021.list;

const tabType = ref('main');
const otherTabType = ref(0);

const bannerInfo = {
  pc_banner: banner,
  pc_text: bannerText,
  mo_banner: banner_mo,
  mo_text: null,
  link: '',
  pc_ill: illustration,
  pc_text2: text2,
};

// video 事件
const videoDialog = ref(false);
const videoLink = ref('');
const handleCloseVideo = () => {
  videoDialog.value = false;
  videoLink.value = '';
};
const videoClickBtn = (path: string) => {
  videoLink.value = path;
  videoDialog.value = true;
};
</script>

<template>
  <SummitBanner :banner="bannerInfo" />
  <AppContent>
    <div class="summit-info">
      <p class="text">{{ SummitConfig.data2021.desc[0] }}</p>
      <p class="text">{{ SummitConfig.data2021.desc[1] }}</p>
    </div>
    <!-- 精彩回顾 -->
    <h3 id="live" class="titleBar">{{ SummitConfig.data2021.titleBar[0] }}</h3>
    <SummitLive
      :live-data="SummitConfig.data2021.LIVEDATA"
      class-name="odd2021"
    />
    <!-- 峰会日程 -->
    <h3 class="titleBar">{{ SummitConfig.data2021.titleBar[1] }}</h3>
    <div class="time">
      <OTabs v-model="tabType" class="schedule-tabs">
        <el-tab-pane
          v-for="item in SummitConfig.data2021.list"
          :key="item.id"
          :name="item.id"
        >
          <template #label>
            <div class="timeTabs">
              {{ item.time }}
            </div>
          </template>
        </el-tab-pane>
      </OTabs>
    </div>
    <div class="online-panel">
      <OContainer :level-index="1">
        <div class="schedule-item" :class="{ isShow: tabType === 'main' }">
          <h4 class="meetingtitle">{{ SummitData[0].type }}</h4>
          <SummitSchedule :options="SummitData[0].children" />
        </div>
        <div
          class="schedule-item other"
          :class="{ isShow: tabType === 'other' }"
        >
          <h4 class="meetingtitle">{{ SummitData[1].type }}</h4>
          <OTabs v-model="otherTabType" class="other-tabs">
            <OTabPane
              v-for="item in SummitData[1].children"
              :key="item.id"
              :label="item.name"
              :name="item.id"
            >
              <SummitSchedule :options="item.children" />
            </OTabPane>
          </OTabs>
        </div>
      </OContainer>
    </div>
    <!-- 线上展厅 -->
    <h3 class="titleBar">{{ SummitConfig.data2021.titleBar[2] }}</h3>
    <div class="exhibition-online">
      <a
        v-for="item in SummitConfig.data2021.videolist"
        :key="item.name"
        href=""
        :name="item.name"
        @click="videoClickBtn(item.link)"
      ></a>
      <div v-if="videoDialog" class="video-box">
        <ODialog
          v-model="videoDialog"
          :before-close="handleCloseVideo"
          :show-close="false"
          lock-scroll
          close-on-press-escape
          close-on-click-modal
          width="800px"
        >
          <div class="video-center">
            <video
              class="exhibition-video"
              :src="videoLink"
              width="100%"
              controls
              autoplay
            ></video>
          </div>
        </ODialog>
      </div>
    </div>
    <!-- 共建单位 -->
    <div class="summit-partners">
      <h3 class="titleBar">{{ SummitConfig.data2021.titleBar[3] }}</h3>
      <h4 class="meetingtitle">
        {{ SummitConfig.data2021.partnersList.title[0] }}
      </h4>
      <LinkPanel
        :link-list="SummitConfig.data2021.partnersList.p1"
        :islink="false"
        class="one"
      />
      <h4 class="meetingtitle">
        {{ SummitConfig.data2021.partnersList.title[1] }}
      </h4>
      <LinkPanel
        :link-list="SummitConfig.data2021.partnersList.p2"
        :islink="false"
        class="one"
      />
      <h4 class="meetingtitle">
        {{ SummitConfig.data2021.partnersList.title[2] }}
      </h4>
      <LinkPanel
        :link-list="SummitConfig.data2021.partnersList.p3"
        :islink="false"
      />
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.one {
  max-width: 356px;
  display: block;
  margin: 0 auto;
  @media (max-width: 767px) {
    width: 100%;
  }
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
}
.summit-info {
  .text {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    text-indent: 2em;
    margin-bottom: 8px;
    text-align: justify;
    @media (max-width: 767px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
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
.time {
  :deep(.schedule-tabs) {
    .el-tabs__nav {
      float: left;
    }
    .timeTabs {
      width: auto;
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text1);
      border: none;
      border-radius: 0;
      padding-bottom: 6px;
      background-color: transparent;
      @media (max-width: 1100px) {
        font-size: 16px;
      }
    }
    .is-active {
      .timeTabs {
        color: var(--o-color-brand1);
        background-color: transparent;
        border-bottom: 1px solid var(--o-color-brand1);
      }
    }
  }
}
.other {
  :deep(.el-tabs__nav) {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
    .el-tabs__item {
      flex: 1;
      padding: var(--o-spacing-h6) 0;
      cursor: pointer;
      background-color: var(--o-color-bg2);
      // height: 88px;
      text-align: center;
      display: grid;
      align-items: center;
      border: 1px solid var(--o-color-brand1);
      border-radius: 2px;
    }
    .el-tabs__active-bar {
      display: none;
    }
    .is-active {
      background: url(@/assets/category/summit/live-active-bg.png) no-repeat
        center/cover;
      color: #fff !important;
    }
  }
  :deep(.el-tabs__content) {
    margin-top: 24px;
  }
}
.exhibition-online {
  width: 1416px;
  height: 852px;
  position: relative;
  margin: 0 auto;
  background: url(@/assets/category/summit/2021/exhibition.png) no-repeat;
  background-size: 100% 100%;
  @media screen and (max-width: 1460px) {
    width: 1100px;
    height: 536px;
  }
  @media screen and (max-width: 1100px) {
    width: 100%;
    height: 58vw;
  }
  a {
    position: absolute;
    &:nth-of-type(1) {
      width: 172px;
      height: 104px;
      left: 174px;
      top: 0px;
      @media screen and (max-width: 1460px) {
        width: 134px;
        height: 65px;
        left: 136px;
      }
      @media screen and (max-width: 1100px) {
        width: 12%;
        height: 7vw;
        left: 11vw;
      }
    }
    &:nth-of-type(2) {
      width: 202px;
      height: 58px;
      left: 366px;
      top: 17px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        top: 8px;
        left: 284px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 1vw;
        left: 23vw;
      }
    }
    &:nth-of-type(3) {
      width: 202px;
      height: 58px;
      left: 589px;
      top: 17px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        top: 8px;
        left: 458px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 1vw;
        left: 38vw;
      }
    }
    &:nth-of-type(4) {
      width: 202px;
      height: 58px;
      right: 402px;
      top: 17px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        top: 8px;
        right: 310px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 1vw;
        right: 25vw;
      }
    }
    &:nth-of-type(5) {
      width: 202px;
      height: 58px;
      right: 178px;
      top: 17px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        top: 8px;
        right: 138px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 1vw;
        right: 11vw;
      }
    }
    &:nth-of-type(6) {
      width: 202px;
      height: 58px;
      left: 140px;
      top: 244px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        top: 154px;
        left: 108px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 16.5vw;
        left: 9vw;
      }
    }
    &:nth-of-type(7) {
      width: 202px;
      height: 58px;
      left: 552px;
      top: 244px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 428px;
        top: 154px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 16.5vw;
        left: 35vw;
      }
    }
    &:nth-of-type(8) {
      width: 202px;
      height: 58px;
      left: 342px;
      top: 317px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 266px;
        top: 198px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 21.5vw;
        left: 22vw;
      }
    }
    &:nth-of-type(9) {
      width: 202px;
      height: 58px;
      left: 112px;
      top: 398px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 86px;
        top: 251px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 27vw;
        left: 7vw;
      }
    }
    &:nth-of-type(10) {
      width: 202px;
      height: 58px;
      left: 556px;
      top: 398px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 428px;
        top: 251px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 27vw;
        left: 35vw;
      }
    }
    &:nth-of-type(11) {
      width: 202px;
      height: 58px;
      right: 380px;
      top: 244px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        right: 293px;
        top: 154px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 16.5vw;
        right: 24vw;
      }
    }
    &:nth-of-type(12) {
      width: 202px;
      height: 58px;
      right: 366px;
      top: 368px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        right: 285px;
        top: 232px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        top: 25vw;
        right: 23vw;
      }
    }
    &:nth-of-type(13) {
      width: 172px;
      height: 62px;
      right: 114px;
      top: 255px;
      @media screen and (max-width: 1460px) {
        width: 138px;
        height: 38px;
        right: 84px;
        top: 160px;
      }
      @media screen and (max-width: 1100px) {
        width: 12%;
        height: 4vw;
        top: 17.5vw;
        right: 7vw;
      }
    }
    &:nth-of-type(14) {
      width: 202px;
      height: 58px;
      left: 246px;
      bottom: 218px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 190px;
        bottom: 136px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 15vw;
        left: 15vw;
      }
    }
    &:nth-of-type(15) {
      width: 202px;
      height: 58px;
      left: 476px;
      bottom: 218px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 371px;
        bottom: 136px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 15vw;
        left: 30vw;
      }
    }
    &:nth-of-type(16) {
      width: 202px;
      height: 58px;
      left: 707px;
      bottom: 218px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 548px;
        bottom: 136px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 15vw;
        left: 45vw;
      }
    }
    &:nth-of-type(17) {
      width: 202px;
      height: 58px;
      right: 276px;
      bottom: 218px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        right: 214px;
        bottom: 136px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 15vw;
        right: 18vw;
      }
    }
    &:nth-of-type(18) {
      width: 202px;
      height: 58px;
      right: 46px;
      bottom: 218px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        right: 35px;
        bottom: 136px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 15vw;
        right: 3vw;
      }
    }
    &:nth-of-type(19) {
      width: 202px;
      height: 58px;
      left: 235px;
      bottom: 101px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 183px;
        bottom: 62px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 6.5vw;
        left: 15vw;
      }
    }
    &:nth-of-type(20) {
      width: 202px;
      height: 58px;
      left: 472px;
      bottom: 101px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 368px;
        bottom: 62px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 6.5vw;
        left: 30vw;
      }
    }
    &:nth-of-type(21) {
      width: 202px;
      height: 58px;
      left: 712px;
      bottom: 101px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        left: 554px;
        bottom: 62px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 6.5vw;
        left: 45vw;
      }
    }
    &:nth-of-type(22) {
      width: 202px;
      height: 58px;
      right: 264px;
      bottom: 101px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        right: 204px;
        bottom: 62px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 6.5vw;
        right: 17vw;
      }
    }
    &:nth-of-type(23) {
      width: 202px;
      height: 58px;
      right: 26px;
      bottom: 101px;
      border-radius: 29px;
      @media screen and (max-width: 1460px) {
        width: 158px;
        height: 38px;
        right: 18px;
        bottom: 62px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 6.5vw;
        right: 1vw;
      }
    }
  }
  .video-box {
    :deep(.el-dialog__header) {
      display: none;
    }
    :deep(.el-dialog__body) {
      padding: 0;
    }
    .exhibition-video {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
  }
}
</style>
