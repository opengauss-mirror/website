<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useCommon } from '@/stores/common';
import AppContent from '@/components/AppContent.vue';
import SummitSchedule from './components/SummitSchedule.vue';
import AOS from 'aos';
import SUMMITDATA from '@/data/summit/summit2022';
import LinkPanel from '@/components/LinkPanel.vue';

import banner from '@/assets/category/summit/summit2022/banner.jpg';
import bannerMo from '@/assets/category/summit/summit2022/banner-mo.jpg';
import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';

import otherBg from '@/assets/category/summit/summit2022/cover.png';

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

onMounted(() => {
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
});
</script>
<template>
  <div class="banner">
    <div
      class="summit-banner-pc"
      :style="`background-image:url(${bannerInfo.pc_banner}) ;`"
    ></div>
    <div class="summit-banner-mo">
      <img :src="bannerInfo.mo_banner" alt="" />
    </div>
  </div>

  <AppContent>
    <div class="summit-detail">
      <p>{{ SUMMITDATA.detail[0] }}</p>
      <p>{{ SUMMITDATA.detail[1] }}</p>
    </div>
    <div class="agenda">
      <h3>{{ SUMMITDATA.agenda.title }}</h3>
      <div
        v-for="(item, index) in SUMMITDATA.agenda.meetingList"
        :key="item.daytime"
        class="agenda-item"
        data-aos="fade-up"
      >
        <h4 class="meetingtitle">
          {{ item.daytime }}
        </h4>
        <OTabs v-model="tabType[index]" class="schedule-tabs">
          <el-tab-pane
            v-for="itemList in SUMMITDATA.agenda.meetingList[0].list"
            :key="itemList.id"
            :name="itemList.id"
          >
            <template #label>
              <div class="timeTabs">
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
              :options="SUMMITDATA.agenda.meetingList[index].list[0].children"
            />
          </div>
          <div
            class="schedule-item other"
            :class="{ isShow: tabType[index] === 'other' }"
          >
            <OTabs v-model="otherTabType[index]" class="other-tabs">
              <OTabPane
                v-for="itemList in SUMMITDATA.agenda.meetingList[index].list[1]
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

    <div class="summit-partners">
      <h3 class="titleBar">{{ SUMMITDATA.partnersList.title[0] }}</h3>
      <h4 class="meetingtitle">
        {{ SUMMITDATA.partnersList.title[1] }}
      </h4>
      <LinkPanel
        :link-list="SUMMITDATA.partnersList.p1"
        :islink="false"
        :row="3"
        class="there"
      />
      <h4 class="meetingtitle">
        {{ SUMMITDATA.partnersList.title[2] }}
      </h4>
      <LinkPanel
        :link-list="SUMMITDATA.partnersList.p2"
        :islink="false"
        class="one"
      />
      <h4 class="meetingtitle">
        {{ SUMMITDATA.partnersList.title[3] }}
      </h4>
      <LinkPanel :link-list="SUMMITDATA.partnersList.p3" :islink="false" />
    </div>

    <div class="other-content">
      <div
        v-for="item in SUMMITDATA.other"
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
    <!-- <div class="content">
      <div
        v-for="item in SUMMITDATA.contentList"
        :key="item.link"
        class="content-item"
      >
        <a :href="item.link" target="_blank">
          <div class="text">
            <p>CALL FOR</p>
            <p>{{ item.nameEn }}</p>
            <p>{{ item.name }}</p>
          </div>

          <img :src="item.img" :alt="item.name" />
        </a>
      </div>
    </div> -->
    <div class="previous">
      <div class="previous-title">
        <h3>{{ SUMMITDATA.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <p v-for="item in SUMMITDATA.previous.list" :key="item.link">
          <a :href="item.link" :target="item.target">{{ item.name }}</a>
        </p>
      </div>
    </div>
  </AppContent>
</template>
<style scoped lang="scss">
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

.summit-partners {
  .meetingtitle {
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
    .meetingtitle {
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
      margin-top: 24px;
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
      .timeTabs {
        display: inline-block;
        margin: 0 0 24px;
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

      .is-active .timeTabs {
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
        :deep(.dateList) {
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
</style>
