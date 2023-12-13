<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import homeConfig from '@/data/home/';
import { windowOpen } from '@/shared/utils';

import useWindowResize from '@/components/hooks/useWindowResize';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import bannerText from '@/assets/category/home/banner/banner-summit-text.png';

import bannerKv from '@/assets/category/home/banner/summit-kv.mp4';
const { lang } = useData();

const windowWidth = ref(useWindowResize());

// 判断语言 banner
const homeBanner = computed(() =>
  lang.value === 'en' ? homeConfig.homeBanner.en : homeConfig.homeBanner.zh
);

// banner跳转事件
const jump = (item: any, flag: boolean) => {
  if (flag) {
    return;
  }
  if (item.link) {
    windowOpen(item.link, item.target);
  }
};

// video 事件
const isVideoDialog = ref(false);
const videoLink = ref('');
const closeVideo = () => {
  isVideoDialog.value = false;
  videoLink.value = '';
};
const clickRightInset = (path: string) => {
  if (path === '') {
    return;
  }
  const patternVideo = /.mp4/;
  if (patternVideo.test(path)) {
    videoLink.value = path;
    isVideoDialog.value = true;
  } else {
    windowOpen(path);
  }
};
</script>
<template>
  <div class="home-banner">
    <el-carousel
      :height="windowWidth > 767 ? '480px' : '300px'"
      :interval="5000"
      trigger="click"
    >
      <el-carousel-item v-for="item in homeBanner" :key="item.link">
        <div v-if="item.link.includes('/summit')" class="banner-summit" @click="jump(item, item.btn !== '')">
          <div class="summit-banner-pc">
            <video
              muted
              playsinline="true"
              autoplay="true"
              height="480"
              loop
              webkit-playsinline="true"
              x5-playsinline="true"
              mtt-playsinline="true"
              :poster="item.pcBanner"
              preload=""
            >
              <source type="video/mp4" :src="bannerKv" />
            </video>
          </div>
          <div class="summit-banner-mo">
            <img :src="bannerText" alt="" />
          </div>
        </div>
        <div
          v-else
          class="banner-img"
          :class="{ 'no-btn': !item.btn, [item.className]: item.className }"
          :style="`background:url(${
            windowWidth > 767 ? item.pcBanner : item.moBanner
          }) no-repeat top center/cover;`"
          @click="jump(item, item.btn !== '')"
        >
          <div class="banner-content">
            <div class="content-left">
              <div class="content-text">
                <div
                  v-if="windowWidth < 767 && item.titleMb.length"
                  class="title"
                >
                  <p v-for="itemTitleMb in item.titleMb" :key="itemTitleMb">
                    {{ itemTitleMb }}
                  </p>
                </div>
                <p v-else class="title">
                  {{ item.title }}
                </p>
                <p v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</p>
                <p v-if="item.desc.length" class="desc">
                  <span v-for="itemDesc in item.desc" :key="itemDesc">{{
                    itemDesc
                  }}</span>
                </p>
              </div>
              <div v-if="item.btn" class="btn-box">
                <OButton
                  animation
                  class="home-banner-btn"
                  :size="windowWidth < 767 ? 'mini' : 'medium'"
                  @click="jump(item, false)"
                >
                  {{ item.btn }}
                  <template #suffixIcon
                    ><OIcon><IconArrowRight /></OIcon
                  ></template>
                </OButton>
              </div>
            </div>
            <div
              v-if="item.rightInset && windowWidth > 1100"
              class="content-right"
            >
              <img
                class="video-player-btn"
                :src="item.rightInset"
                :alt="item.title"
                @click.stop="clickRightInset(item.rightLink)"
              />
            </div>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <div v-if="isVideoDialog && windowWidth > 767" class="video-box">
      <ODialog
        v-model="isVideoDialog"
        :before-close="closeVideo"
        :show-close="false"
        lock-scroll
        close-on-press-escape
        close-on-click-modal
        width="800px"
        destroy-on-close
      >
        <div class="video-center">
          <video
            class="home-banner-video"
            :src="videoLink"
            width="100%"
            controls
            autoplay
          ></video>
        </div>
      </ODialog>
    </div>
  </div>
</template>

<style lang="scss" scoped>
$banner-color: #fff;
html[lang='zh'] {
  .liveBanner {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .flex-start {
    @media screen and (max-width: 824px) {
      margin: 0;
      padding-top: var(--o-spacing-h3);
      height: 100%;
    }
  }
}
.home-banner {
  .banner-img {
    height: 100%;
    .banner-content {
      box-sizing: border-box;
      max-width: 1504px;
      margin: 0 auto;
      padding: 0 44px;
      display: flex;
      justify-content: space-between;
      height: 100%;
      color: #fff;
      position: relative;
      @media screen and (max-width: 1440px) {
        padding: 0 24px;
      }
      @media screen and (max-width: 1100px) {
        padding: 0 16px;
      }
      .summit-title {
        position: absolute;
        right: 44px;
        bottom: 50%;
        transform: translateY(50%);
        width: 536px;
        height: 208px;
        @media screen and (max-width: 767px) {
          width: 247px;
          height: 96px;
          right: 50%;
          bottom: 28px;
          transform: translateX(50%);
        }
      }
      .content-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        .content-text {
          color: var(--o-color-white);
          .title {
            font-size: var(--o-font-size-h1);
            line-height: var(--o-line-height-h1);
            font-weight: 600;
            @media screen and (max-width: 1439px) {
              font-size: var(--o-font-size-h2);
              line-height: var(--o-line-height-h2);
            }
            @media screen and (max-width: 767px) {
              font-size: var(--o-font-size-h4);
              line-height: var(--o-line-height-h4);
              text-align: center;
            }
          }
          .subtitle {
            margin-top: var(--o-spacing-h8);
            font-size: 30px;
            line-height: 40px;
            font-weight: normal;
            @media (max-width: 767px) {
              margin-top: 8px;
              font-size: var(--o-font-size-h7);
              line-height: var(--o-line-height-h7);
              text-align: center;
            }
          }
          .desc {
            margin-top: 16px;
            @media screen and (max-width: 767px) {
              text-align: center;
              margin-top: 8px;
            }
            span {
              font-size: var(--o-font-size-h5);
              line-height: 40px;
              @media screen and (max-width: 767px) {
                font-size: var(--o-font-size-text);
                line-height: 24px;
              }
            }
          }
        }
        .btn-box {
          margin-top: var(--o-spacing-h3);
          @media screen and (max-width: 767px) {
            margin-top: var(--o-spacing-h5);
            width: 100%;
            display: flex;
            justify-content: center;
          }
          .home-banner-btn {
            color: var(--o-color-white);
            border: 1px solid var(--o-color-white);
          }
        }
      }
      .content-right {
        img {
          width: 100%;
        }
      }
    }
    &.banner-video {
      .banner-content {
        .content-right {
          margin-right: 11%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          img {
            width: 98px;
            cursor: pointer;
          }
        }
      }
    }
    &.no-btn {
      cursor: pointer;
    }
  }
  .video-box {
    :deep(.el-dialog__header) {
      display: none;
    }
    :deep(.el-dialog__body) {
      padding: 0;
    }
    .home-banner-video {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
  }
  :deep(.el-carousel__indicators) {
    width: 100%;
    max-width: 1504px;
    padding: 0 44px;
    @media screen and (max-width: 1440px) {
      padding: 0 24px;
    }
    @media screen and (max-width: 1100px) {
      padding: 0 16px;
    }
    @media screen and (max-width: 767px) {
      text-align: center;
    }
    .el-carousel__indicator {
      .el-carousel__button {
        width: 40px;
        @media screen and (max-width: 767px) {
          width: 20px;
        }
      }
      &.is-active {
        .el-carousel__button {
          background-color: var(--o-color-yellow5);
        }
      }
    }
  }
  .banner-summit {
  height: 100%;
  width: 100%;
  position: relative;
  cursor: pointer;
  .summit-banner-pc {
    height: 100%;
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
      height: 100%;
      display: block;
      background-image: url(@/assets/category/home/banner/banner-summit_mo.png);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
      position: relative;
      img {
        width: 247px;
        position: absolute;
        bottom: 8%;
        left: 50%;
        transform: translateX(-50%);
      }
    }
  }
}
}
@include in-dark {
  .banner-img {
    @include img-in-dark;
  }
}
</style>
