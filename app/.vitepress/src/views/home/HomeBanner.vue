<script lang="ts" setup>
import { computed, ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';
import 'swiper/swiper.min.css';
import 'swiper/components/navigation/navigation.min.css';
import 'swiper/components/pagination/pagination.min.css';
import { useData } from 'vitepress';
import HomeConfig from '@/data/home/';
import websiteLink from '@/data/common/websiteLink';

import useWindowResize from '@/components/hooks/useWindowResize';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import VideoGif from '@/assets/category/home/video-player.gif';

SwiperCore.use([Autoplay, Pagination, Navigation]);

const { lang, theme } = useData();
const flag = ref();

const onSwiper = (swiper: any) => {
  flag.value = computed(() => swiper.animating);
};

const windowWidth = ref(useWindowResize());

// 判断语言 banner
const homeBanner = computed(() =>
  lang.value === 'en' ? HomeConfig.HOMEBANNER.en : HomeConfig.HOMEBANNER.zh
);

// banner跳转事件
const jump = (item: any) => {
  if (flag.value && item.link !== '') {
    if (item.targetTap === 1) {
      if (item.link.startsWith('/docs/')) {
        const path = theme.value.docsUrl + '/' + lang.value + item.link;
        window.open(path, '_blank');
      } else {
        window.open(item.link, '_blank');
      }
    } else {
      window.open(item.link, '_self');
    }
  }
};

// video 事件
const videoDialog = ref(false);
const videoLink = ref('');
const handleCloseVideo = () => {
  videoDialog.value = false;
  videoLink.value = '';
};
const onVideoBtnClick = (path: string) => {
  videoLink.value = path;
  videoDialog.value = true;
};

const bannerVideoSrc = `${websiteLink.common.obsVideoLink}openGauss%20Summit%202022/Banner/openGauss%20Banner%E5%8A%A8K_1920x480.mp4`;
</script>

<template>
  <div class="swiper-banner">
    <swiper
      class="home-banner"
      :loop="true"
      :pagination="{
        clickable: true,
      }"
      :autoplay="{
        delay: 5000,
        disableOnInteraction: false,
      }"
      :navigation="true"
      @swiper="onSwiper"
    >
      <swiper-slide v-for="(item, index) in homeBanner" :key="item.link">
        <div class="banner-panel" :class="item.className" @click="jump(item)">
          <div v-if="item.type === 5" class="banner-video">
            <template v-if="windowWidth > 767">
              <video
                muted
                playsinline="true"
                autoplay
                loop
                :poster="item.pcBanner"
                preload=""
              >
                <source type="video/mp4" :src="bannerVideoSrc" />
              </video>
            </template>
            <img v-else :src="item.moBanner" :alt="item.title" />
          </div>
          <div
            v-else
            class="banner-panel-cover"
            :class="{
              'banner-pic': item.title === '',
              'banner-img': item.type === 1,
              'text-center': item.type === 3,
              internship: item.type === 4,
              'no-link': item.link === '',
            }"
            :style="{
              backgroundImage: `url(${
                windowWidth < 767 ? item.moBanner : item.pcBanner
              })`,
            }"
          >
            <div
              v-if="item.title !== ''"
              :class="[{ 'flex-start': index === 1 }]"
              class="banner-panel-content flex-column"
            >
              <div class="box">
                <p class="title" :class="{ experts: index === 1 }">
                  {{ item.title }}
                </p>
                <p
                  v-if="item.subtitle"
                  class="subtitle"
                  :class="{ experts: index === 1 }"
                >
                  {{ item.subtitle }}
                </p>
                <p class="desc" :class="{ experts: index === 1 }">
                  <span
                    v-for="item2 in item.desc"
                    :key="item2"
                    class="inline-desc"
                    >{{ item2 }}</span
                  >
                </p>
              </div>
              <div
                v-if="item.btn"
                class="action"
                :class="{ liveBanner: index === 1 }"
              >
                <OButton animation class="home-banner-btn">
                  {{ item.btn }}
                  <template #suffixIcon
                    ><OIcon><IconArrowRight /></OIcon
                  ></template>
                </OButton>
              </div>
              <div v-if="item.video !== ''" id="video-player">
                <img
                  class="video-player-btn"
                  :src="VideoGif"
                  :alt="item.title"
                  @click.stop="onVideoBtnClick(item.video)"
                />
              </div>
            </div>
            <!-- <div class="hiss-content" v-if="item.className === 'hiss-banner'">
              <img :src="item.textImg" alt="" />
            </div> -->
          </div>
        </div>
      </swiper-slide>
    </swiper>
  </div>
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
          class="home-banner-video"
          :src="videoLink"
          width="100%"
          controls
          autoplay
        ></video>
      </div>
    </ODialog>
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
.banner-panel-cover {
  cursor: pointer;
}
.no-link {
  cursor: default;
}
.dark .banner-panel-cover {
  filter: brightness(80%) grayscale(20%) contrast(1.2);
}
#video-player {
  position: absolute;
  top: 42%;
  right: 11%;
  width: 98px;
  height: 98px;
  z-index: 2;
  cursor: pointer;
  @media screen and (max-width: 1430px) {
    right: 12.5%;
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
  img {
    width: 100%;
  }
}
.video-box {
  :deep(.el-dialog__header) {
    display: none;
  }
  :deep(.el-dialog__body) {
    padding: 0;
  }
}

.home-banner-video {
  display: block;
  margin: 0 auto;
  width: 100%;
}

.home-banner-btn {
  border-color: $banner-color !important;
  color: $banner-color !important;
  @media screen and (max-width: 824px) {
    padding: 5px 12px 5px 16px;
    line-height: 22px;
    font-size: 14px;
  }
}

.home-banner {
  height: 480px;
  position: relative;
  .banner-panel {
    position: absolute;
    background-color: var(--o-color-bg2);
    display: flex;
    background-position: 50%;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    opacity: 1;
    transition: all 0.33s;
    .banner-video {
      flex: 1;
      img {
        max-width: 100%;
        object-fit: cover;
      }
    }
    video {
      width: 100%;
      height: 100%;
      cursor: pointer;
      @media screen and (max-width: 1920px) {
        object-fit: cover;
      }
    }
    &-content {
      box-sizing: border-box;
      max-width: 1504px;
      margin: 0 auto;
      padding: 0 44px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      color: #fff;
      position: relative;
      .title {
        font-size: var(--o-font-size-h1);
        line-height: var(--o-line-height-h1);
        // filter: invert(1);
        font-weight: 600;
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h2);
          line-height: var(--o-line-height-h2);
        }
        @media screen and (max-width: 824px) {
          font-size: var(--o-font-size-h4);
          line-height: var(--o-line-height-h4);
        }
      }
      .box {
        color: $banner-color;
      }
      .desc {
        max-width: 56%;
        .inline-desc {
          &:nth-child(2) {
            padding-left: 30px;
            @media screen and (max-width: 768px) {
              padding: 0;
              display: block;
            }
          }
        }

        font-size: var(--o-font-size-h5);
        font-weight: 400;
        line-height: var(--o-line-height-h5);
        margin-top: var(--o-spacing-h6);
        @media screen and (max-width: 1439px) {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
        }
        @media screen and (max-width: 824px) {
          margin-top: var(--o-spacing-h9);
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          max-width: 100%;
        }
      }

      .action {
        margin-top: var(--o-spacing-h3);
        .o-icon {
          @media screen and (max-width: 824px) {
            font-size: 16px;
          }
        }
        @media screen and (max-width: 824px) {
          margin-top: 0;
        }
      }
      // .liveBanner {
      //   @media screen and (max-width: 768px) {
      //     display: none;
      //   }
      // }
      @media screen and (max-width: 1440px) {
        padding: 0 24px;
      }
      @media screen and (max-width: 1100px) {
        padding: 0 16px;
      }
      @media screen and (max-width: 824px) {
        padding: 40px 16px;
        align-items: center;
        box-sizing: border-box;
        text-align: center;
      }
    }

    &-cover {
      background-position: 50%;
      background-repeat: no-repeat;
      background-size: cover;
      width: 100%;
      height: 100%;

      &.text-center {
        .banner-panel-content {
          flex-direction: initial;
          align-items: center !important;
        }
        .title {
          text-align: center;
        }
      }
      &.internship {
        .title,
        .desc {
          color: var(--o-color-black);
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
        .home-banner-btn {
          background-color: #012fa8;
          @media screen and (max-width: 768px) {
            display: none;
          }
        }
      }
    }
    .isH5show {
      display: none;
      object-fit: cover;
      width: 100%;
      @media screen and (max-width: 824px) {
        display: block;
        height: 300px;
      }
    }

    @media screen and (max-width: 767px) {
      position: static !important;
    }
  }
  .version {
    .banner-panel-content {
      @media screen and (max-width: 1100px) {
        justify-content: center;
      }
    }
    .title {
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-h6);
      }
    }
  }
  .ques {
    .banner-panel-content {
      @media screen and (max-width: 824px) {
        justify-content: center;
      }
      .title {
        color: #000;
      }
      .home-banner-btn {
        border-color: var(--o-color-brand1) !important;
        color: var(--o-color-brand1) !important;
      }
      .liveBanner {
        @media screen and (max-width: 824px) {
          margin-top: 22px;
          display: block;
        }
      }
    }
  }
  .devday-banner {
    .box {
      color: #000;
      .title {
        font-size: var(--o-font-size-h2);
        font-weight: 600;
        line-height: var(--o-line-height-h2);
        @media (max-width: 767px) {
          font-size: 32px;
          line-height: 32px;
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
        }
      }
      .desc {
        margin-top: 16px;
        @media screen and (max-width: 824px) {
          margin-top: 8px;
        }
        .inline-desc {
          display: block;
          font-size: var(--o-font-size-h5);
          line-height: 40px;
          @media screen and (max-width: 824px) {
            font-size: var(--o-font-size-text);
            line-height: 24px;
          }
          & ~ .inline-desc {
            padding-left: 0;
            &::before {
              display: inline;
              content: '地点：';
              @media screen and (max-width: 824px) {
                display: none;
              }
            }
          }
        }
      }
    }
    .action {
      margin-top: var(--o-spacing-h5);
      @media screen and (max-width: 824px) {
        margin-top: var(--o-spacing-h5);
      }
      .home-banner-btn {
        color: #000 !important;
        border: 1px solid #000 !important;
      }
    }
  }
  @media screen and (max-width: 1430px) {
    height: 400px;
  }
  @media screen and (max-width: 824px) {
    height: 300px;
  }
}

.swiper-banner {
  :deep(.swiper-container) {
    .swiper-pagination {
      width: 1416px !important;
      bottom: 16px;
      left: 50% !important;
      transform: translateX(-50%);
      text-align: left;
      font-size: 0;
      .swiper-pagination-bullet {
        width: 40px;
        opacity: 1;
        background: none;
        border-radius: 0;
        margin: 0 4px;
        height: 2px;
        padding: 3px 0;
      }
      .swiper-pagination-bullet::after {
        height: 2px;
        width: 100%;
        background: rgba(207, 211, 215, 0.6);
        content: '';
        display: block;
      }
      .swiper-pagination-bullet-active {
        opacity: 1;
      }
      .swiper-pagination-bullet-active::after {
        background: var(--o-color-yellow5);
      }
      @media screen and (max-width: 1439px) {
        width: 1080px !important;
        padding: 0 16px;
        left: 0 !important;
        transform: translateX(0);
      }
      @media screen and (max-width: 1100px) {
        width: 100% !important;

        .swiper-pagination-bullet {
          width: 20px !important;
          margin: 0 4px 0 0;
        }
      }
      @media screen and (max-width: 824px) {
        left: 50% !important;
        transform: translateX(-50%);
        text-align: center;
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
      width: 32px;
      height: 32px;
      background: rgba(56, 56, 56, 0.5);
      border-radius: 50%;
      opacity: 0;
      transition: all 0.5s;
      &:after {
        font-size: 16px;
        color: #fff;
      }
      &.show {
        opacity: 1;
      }
    }
    &:hover {
      .swiper-button-prev,
      .swiper-button-next {
        opacity: 1;
      }
    }
  }
}
</style>
