<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCommon } from '@/stores/common';

import AppContent from '@/components/AppContent.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import LinkPanel from '@/components/LinkPanel.vue';

import summitData from './data';

import banner from './img/banner.jpg';
import bannerMo from './img/banner-mo.jpg';
import liveLight from './img/live.png';
import liveDark from './img/live-dark.png';
import otherBg from './img/cover.png';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const bannerInfo = {
  pc_banner: banner,
  mo_banner: bannerMo,
};

const tabType = ref(['main', 'main', 'main']);
const otherTabType = ref([0, 0, 0]);

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
  <div class="banner">
    <div class="summit-banner-pc">
      <video
        muted
        playsinline="true"
        autoplay="autoplay"
        height="380"
        loop
        webkit-playsinline="true"
        x5-playsinline="true"
        mtt-playsinline="true"
        :poster="bannerInfo.pc_banner"
        preload=""
      >
        <source
          type="video/mp4"
          src="https://opengauss-showroom-video.obs.cn-north-4.myhuaweicloud.com/openGauss%20Summit%202022/Banner/openGauss%20Banner%E5%8A%A8K_1920x380.mp4"
        />
      </video>
    </div>
    <div class="summit-banner-mo">
      <img :src="bannerInfo.mo_banner" alt="" />
    </div>
  </div>

  <AppContent>
    <div class="summit-detail">
      <p>{{ summitData.detail[0] }}</p>
      <p>{{ summitData.detail[1] }}</p>
    </div>
    <div class="agenda">
      <h3>{{ summitData.agenda.title }}</h3>
      <div
        v-for="(item, index) in summitData.agenda.meetingList"
        :key="item.daytime"
        class="agenda-item"
      >
        <h4 class="meeting-title">
          {{ item.daytime }}
        </h4>
        <OTabs v-model="tabType[index]" class="schedule-tabs">
          <el-tab-pane
            v-for="itemList in summitData.agenda.meetingList[0].list"
            :key="itemList.id"
            :name="itemList.id"
          >
            <template #label>
              <div class="time-tabs">
                {{ itemList.type }}
              </div>
            </template>
          </el-tab-pane>
        </OTabs>
        <OContainer :level-index="1">
          <div
            class="schedule-item"
            :class="{ isShow: tabType[index] === 'main' }"
          >
            <SummitSchedule
              :options="summitData.agenda.meetingList[index].list[0].children"
            />
          </div>
          <div
            class="schedule-item other"
            :class="{ isShow: tabType[index] === 'other' }"
          >
            <OTabs v-model="otherTabType[index]" class="other-tabs">
              <OTabPane
                v-for="itemList in summitData.agenda.meetingList[index].list[1]
                  .children"
                :key="itemList.id"
                :label="itemList.name"
                :name="itemList.id"
              >
                <SummitSchedule :options="itemList.children" />
              </OTabPane>
            </OTabs>
          </div>
        </OContainer>
      </div>
    </div>
    <!-- 线上展厅 -->
    <h3 class="title-bar">线上展厅</h3>
    <div class="exhibition-online">
      <span
        v-for="item in summitData.videolist"
        :key="item.name"
        :title="item.name"
        class="video-item"
        @click="videoClickBtn(item.link)"
      ></span>
      <div v-if="videoDialog" class="video-box">
        <ODialog
          v-model="videoDialog"
          :before-close="handleCloseVideo"
          :show-close="false"
          lock-scroll
          close-on-press-escape
          close-on-click-modal
          destroy-on-close
          width="800px"
        >
          <div class="video-center">
            <video class="exhibition-video" width="100%" controls autoplay>
              <source :src="videoLink" />
            </video>
          </div>
        </ODialog>
      </div>
    </div>
    <div class="summit-partners">
      <h3 class="title-bar">{{ summitData.partnersList.title[0] }}</h3>
      <h4 class="meeting-title">
        {{ summitData.partnersList.title[1] }}
      </h4>
      <LinkPanel
        :link-list="summitData.partnersList.p1"
        :islink="false"
        :row="3"
        class="there"
      />
      <h4 class="meeting-title">
        {{ summitData.partnersList.title[2] }}
      </h4>
      <LinkPanel
        :link-list="summitData.partnersList.p2"
        :islink="false"
        class="one"
      />
      <h4 class="meeting-title">
        {{ summitData.partnersList.title[3] }}
      </h4>
      <LinkPanel :link-list="summitData.partnersList.p3" :islink="false" />
    </div>

    <div class="other-content">
      <div
        v-for="item in summitData.other"
        :key="item.path"
        class="other-content-item"
        :style="`background-image:url(${otherBg}) ;`"
      >
        <div class="cover">
          <img :src="item.cover" :alt="item.name" />
        </div>
        <p class="name">{{ item.name }}</p>
        <a :href="item.path" target="_blank">
          <OButton
            animation
            class="home-banner-btnimport LinkPanel from '@/components/LinkPanel.vue';"
            size="mini"
          >
            {{ item.btn_text }}
            <template #suffixIcon
              ><OIcon><IconArrowRight /></OIcon
            ></template>
          </OButton>
        </a>
      </div>
    </div>

    <div class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <p v-for="item in summitData.previous.list" :key="item.link">
          <a :href="item.link" :target="item.target">{{ item.name }}</a>
        </p>
      </div>
    </div>
  </AppContent>
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

.summit-partners {
  .meeting-title {
    @media (max-width: 767px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
  .picture-panel {
    &:not(:last-child) {
      margin-bottom: 40px;
    }
    padding-top: 0;
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
.there {
  max-width: 1068px;
  margin: 0 auto;
  @media (max-width: 767px) {
    width: 100%;
    display: block;
  }
}
.dark img {
  // filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
    video {
      width: 100%;
      @media screen and (max-width: 1920px) {
        object-fit: cover;
      }
    }
    @media screen and (max-width: 768px) {
      display: none;
    }
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
.summit-detail {
  p {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    color: var(--o-color-text1);
    font-weight: 300;
    text-align: justify;
    text-indent: 2em;
    &:not(:last-child) {
      margin-bottom: var(--o-spacing-h6);
    }
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
}
.content {
  margin: var(--o-spacing-h1) auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media screen and (max-width: 1470px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 948px;
  }
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 474px;
    gap: 16px;
    margin: var(--o-spacing-h2) auto;
  }

  .content-item {
    @media screen and (max-width: 768px) {
      text-align: center;
    }
    a {
      display: inline-block;
      width: 100%;
      position: relative;
      box-shadow: var(--o-shadow-l1);
      .text {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        p {
          color: #fff;
          text-align: center;
          font-size: var(--o-font-size-h4);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-h5);
          }
          &:nth-of-type(3) {
            margin-top: var(--o-spacing-h4);
            @media screen and (max-width: 768px) {
              margin-top: var(--o-spacing-h5);
            }
          }
        }
      }

      img {
        width: 100%;
        // @media screen and (max-width: 490px) {
        //   width: 100%;
        // }
      }
    }
  }
}
.previous {
  .previous-title {
    display: flex;
    h3 {
      font-size: 24px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
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
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h6);
    }
    p:not(:last-child) {
      margin-bottom: var(--o-spacing-h4);
      @media screen and (max-width: 768px) {
        margin-bottom: var(--o-spacing-h6);
      }
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      display: inline-block;
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
  }
}
.live {
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
    margin-bottom: var(--o-spacing-h2);
    @media (max-width: 767px) {
      margin-bottom: var(--o-spacing-h4);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  .summit2022-box {
    :deep(.live-room-web-itembox.odd2022) {
      grid-template-columns: repeat(3, 1fr);
      .link-main {
        grid-column: 1/4;
      }
    }
  }
  .live-room {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--o-spacing-h4);
    }
  }
  :deep(.o-container-level1) {
    background-color: transparent;
    box-shadow: none;
  }
  :deep(.el-tabs__item) {
    padding: 0 !important;
  }
  :deep(.el-tabs__nav-scroll) {
    display: flex;
  }
  :deep(.el-tabs__nav) {
    float: none !important;
    display: inline-block;
    margin: 0 auto;
  }
  :deep(.el-tabs__active-bar) {
    display: none;
  }
  .time-tabs {
    padding: 0 var(--o-spacing-h5);
    line-height: 38px;
  }
  .is-active .time-tabs {
    color: #fff;
    background: var(--o-color-brand1);
    border-color: var(--o-color-brand2);
  }
  .summit-kv-box {
    :deep(.live-room-web-itembox.odd2022) {
      grid-template-columns: repeat(5, 1fr);
      .link-main {
        grid-column: 1/6;
      }
    }
  }
  .summit-box {
    :deep(.live-room-web-itembox.odd2022) {
      grid-template-columns: repeat(7, 1fr);
      .link-main {
        grid-column: 1/8;
      }
    }
  }
}
.agenda {
  margin: var(--o-spacing-h1) 0;
  @media (max-width: 767px) {
    margin: var(--o-spacing-h2) 0;
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
  .agenda-item {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 767px) {
      margin-top: var(--o-spacing-h4);
    }
    &:nth-of-type(1) {
      // .el-tabs__active-bar {
      //   display: none;
      // }
      // 暂时取消第一天的分会选中状态
      .other {
        :deep(.o-tabs) {
          // .el-tabs__active-bar {
          //   display: none;
          // }
          .is-active {
            color: var(--o-color-brand1);
          }
          .el-tabs__item:hover {
            color: var(--o-color-text1);
          }
        }
      }
    }
    // 暂时隐藏时间
    &:nth-of-type(2) {
      .other {
        :deep(.dataItem) {
          grid-template-columns: 600px 445px;
          padding-left: 192px;
          @media screen and (max-width: 1328px) {
            grid-template-columns: 500px 445px;
          }
          @media screen and (max-width: 1320px) {
            padding-left: 80px;
          }
          @media screen and (max-width: 1100px) {
            padding-left: 100px;
            grid-template-columns: 348px;
            .box {
              grid-column-start: 1;
              grid-column-end: 2;
            }
          }
          @media screen and (max-width: 820px) {
            padding-left: 2vw;
          }
          @media screen and (max-width: 420px) {
            grid-template-columns: auto;
          }
          .show-more {
            color: var(--o-color-brand1);
          }
          .time {
            display: none;
          }
          .desc {
            display: block;
            &:hover {
              color: var(--o-color-brand1);
            }
          }
        }
      }
    }
    // 暂时隐藏时间
    .meeting-title {
      font-weight: 400;
      color: var(--o-color-text1);
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      text-align: center;
      margin-bottom: 24px;
      @media (max-width: 767px) {
        margin-bottom: 12px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .schedule-tabs {
      text-align: center;
      margin: 24px 0;
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
      .time-tabs {
        display: inline-block;
        cursor: pointer;
        border: 1px solid var(--o-color-border2);
        color: var(--o-color-text1);
        width: 120px;
        text-align: center;
        background: var(--o-color-bg2);
        font-size: var(--o-font-size-text);
        line-height: 38px;
        padding: 0 var(--o-spacing-h5);
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          padding: 0 var(--o-spacing-h6);
        }
      }

      .is-active .time-tabs {
        color: #fff;
        background: var(--o-color-brand1);
        border-color: var(--o-color-brand2);
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
      }
    }
    .schedule-item {
      display: none;
      padding: 24px;
      @media (max-width: 1100px) {
        padding: 16px;
      }
      &.isShow {
        display: block;
      }
      &.other {
        :deep(.el-tabs__nav-scroll) {
          text-align: center;
        }
        :deep(.el-tabs__content) {
          overflow: visible;
        }
        :deep(.el-tabs__nav) {
          float: none;
          display: inline-block;
          @media (max-width: 1100px) {
            line-height: 44px;
          }
        }
        .other-text {
          margin: 24px auto 0 auto;
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          text-align: center;
          display: flex;
          justify-content: center;
          align-items: center;
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            margin: 16px 0;
          }
          svg {
            margin-right: var(--o-spacing-h8);
          }
        }
        :deep(.date-list) {
          .detail {
            display: none;
          }
          .show-detail {
            .detail {
              display: block;
            }
          }
        }
      }
      :deep(.detail) {
        display: none;
      }
    }
  }
}

.other-content {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin: var(--o-spacing-h1) 0;
  justify-content: center;
  @media screen and (max-width: 767px) {
    grid-template-columns: repeat(1, 1fr);
    gap: 16px;
    margin: var(--o-spacing-h2) 0;
  }
  &-item {
    flex: 1;
    position: relative;
    height: auto;
    text-align: center;
    padding: var(--o-spacing-h4);
    background: no-repeat center/cover;
    @media screen and (max-width: 1440px) {
      width: 100%;
      margin: 0 auto;
      padding: var(--o-spacing-h5);
    }
    .cover {
      height: 220px;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        max-width: 80%;
        object-fit: cover;
      }
      @media screen and (max-width: 767px) {
        height: 165px;
      }
    }

    .name {
      font-size: var(--o-font-size-h5);
      line-height: var(--o-line-height-h5);
      color: var(--o-color-text1);
      margin-bottom: var(--o-spacing-h5);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
  }
}

.exhibition-online {
  width: 1416px;
  height: 844px;
  position: relative;
  margin: 0 auto;
  background: url(./img/exhibition.png) no-repeat;
  background-size: 100% 100%;
  @media screen and (max-width: 1460px) {
    width: 1100px;
    height: 649px;
  }
  @media screen and (max-width: 1100px) {
    width: 100%;
    height: 58vw;
  }
  .video-item {
    position: absolute;
    // background: rgba($color: #ff0000, $alpha: 0.3);
    border-radius: 30px;
    display: block;
    cursor: pointer;
    &:nth-of-type(1) {
      width: 230px;
      height: 58px;
      left: 384px;
      top: 43px;
      @media screen and (max-width: 1460px) {
        width: 178px;
        height: 42px;
        left: 300px;
        top: 34px;
      }
      @media screen and (max-width: 1100px) {
        width: 16%;
        height: 4vw;
        top: 3vw;
        left: 25vw;
      }
    }
    &:nth-of-type(2) {
      width: 178px;
      height: 58px;
      left: 681px;
      top: 44px;
      @media screen and (max-width: 1460px) {
        width: 138px;
        height: 42px;
        top: 34px;
        left: 529px;
      }
      @media screen and (max-width: 1100px) {
        width: 13%;
        height: 4vw;
        top: 3vw;
        left: 44vw;
      }
    }
    &:nth-of-type(3) {
      width: 195px;
      height: 52px;
      right: 152px;
      top: 169px;
      @media screen and (max-width: 1460px) {
        width: 150px;
        height: 42px;
        right: 120px;
        top: 128px;
      }
      @media screen and (max-width: 1100px) {
        width: 14%;
        height: 4vw;
        top: 11.5vw;
        right: 10vw;
      }
    }
    &:nth-of-type(4) {
      width: 195px;
      height: 54px;
      right: 127px;
      top: 293px;
      @media screen and (max-width: 1460px) {
        width: 150px;
        height: 42px;
        right: 100px;
        top: 224px;
      }
      @media screen and (max-width: 1100px) {
        width: 14%;
        height: 4vw;
        top: 20vw;
        right: 8vw;
      }
    }
    &:nth-of-type(5) {
      width: 195px;
      height: 54px;
      right: 97px;
      top: 418px;
      @media screen and (max-width: 1460px) {
        width: 150px;
        height: 42px;
        right: 76px;
        top: 320px;
      }
      @media screen and (max-width: 1100px) {
        width: 14%;
        height: 4vw;
        top: 28.5vw;
        right: 6.5vw;
      }
    }
    &:nth-of-type(6) {
      width: 195px;
      height: 54px;
      right: 66px;
      top: 545px;
      @media screen and (max-width: 1460px) {
        width: 150px;
        height: 42px;
        right: 54px;
        top: 419px;
      }
      @media screen and (max-width: 1100px) {
        width: 14%;
        height: 4vw;
        top: 37.5vw;
        right: 4.5vw;
      }
    }
    &:nth-of-type(7) {
      width: 195px;
      height: 54px;
      right: 38px;
      top: 670px;
      @media screen and (max-width: 1460px) {
        width: 150px;
        height: 42px;
        right: 31px;
        top: 516px;
      }
      @media screen and (max-width: 1100px) {
        width: 14%;
        height: 4vw;
        top: 46vw;
        right: 2.5vw;
      }
    }
    &:nth-of-type(8) {
      width: 234px;
      height: 58px;
      left: 104px;
      top: 226px;
      @media screen and (max-width: 1460px) {
        width: 182px;
        height: 42px;
        left: 81px;
        top: 175px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 17%;
        height: 4vw;
        top: 16vw;
        left: 7vw;
      }
    }
    &:nth-of-type(9) {
      width: 234px;
      height: 58px;
      left: 382px;
      top: 226px;
      @media screen and (max-width: 1460px) {
        width: 181px;
        height: 42px;
        left: 296px;
        top: 175px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 16%;
        height: 4vw;
        top: 15vw;
        left: 25vw;
      }
    }
    &:nth-of-type(10) {
      width: 234px;
      height: 58px;
      left: 71px;
      top: 379px;
      @media screen and (max-width: 1460px) {
        width: 183px;
        height: 42px;
        left: 54px;
        top: 294px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 16%;
        height: 4vw;
        top: 26vw;
        left: 5vw;
      }
    }
    &:nth-of-type(11) {
      width: 235px;
      height: 54px;
      left: 369px;
      top: 381px;
      @media screen and (max-width: 1460px) {
        width: 180px;
        height: 42px;
        left: 288px;
        top: 294px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 17%;
        height: 4vw;
        top: 26vw;
        left: 24vw;
      }
    }
    &:nth-of-type(12) {
      width: 258px;
      height: 56px;
      right: 536px;
      top: 305px;

      @media screen and (max-width: 1460px) {
        width: 200px;
        height: 42px;
        right: 417px;
        top: 235px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 18%;
        height: 4vw;
        top: 21vw;
        right: 36vw;
      }
    }
    &:nth-of-type(13) {
      width: 270px;
      height: 52px;
      right: 340px;
      top: 230px;
      @media screen and (max-width: 1460px) {
        width: 207px;
        height: 42px;
        right: 266px;
        top: 176px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 19%;
        height: 4vw;
        top: 16vw;
        right: 23vw;
      }
    }
    &:nth-of-type(14) {
      width: 257px;
      height: 54px;
      right: 307px;
      top: 381px;
      @media screen and (max-width: 1460px) {
        width: 200px;
        height: 42px;
        right: 238px;
        top: 294px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 18%;
        height: 4vw;
        top: 26vw;
        right: 20vw;
      }
    }
    &:nth-of-type(15) {
      width: 208px;
      height: 55px;
      left: 365px;
      bottom: 212px;
      @media screen and (max-width: 1460px) {
        width: 164px;
        height: 42px;
        left: 283px;
        bottom: 163px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 14.5vw;
        left: 24vw;
      }
    }
    &:nth-of-type(16) {
      width: 211px;
      height: 55px;
      left: 37px;
      bottom: 119px;
      @media screen and (max-width: 1460px) {
        width: 161px;
        height: 42px;
        left: 31px;
        bottom: 90px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 15%;
        height: 4vw;
        bottom: 8vw;
        left: 2vw;
      }
    }
    &:nth-of-type(17) {
      width: 255px;
      height: 58px;
      right: 544px;
      bottom: 211px;
      @media screen and (max-width: 1460px) {
        width: 200px;
        height: 42px;
        right: 421px;
        bottom: 164px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 18%;
        height: 4vw;
        bottom: 14.5vw;
        right: 36vw;
      }
    }
    &:nth-of-type(18) {
      width: 255px;
      height: 58px;
      right: 298px;
      bottom: 117px;
      @media screen and (max-width: 1460px) {
        width: 196px;
        height: 42px;
        right: 234px;
        bottom: 92px;
        border-radius: 19px;
      }
      @media screen and (max-width: 1100px) {
        width: 18%;
        height: 4vw;
        bottom: 8vw;
        right: 20vw;
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
