<script setup lang="ts">
import { OButton, OCarousel, OCarouselItem, OIcon, OIconArrowRight } from '@opensig/opendesign';
import { computed, ref } from 'vue';
import homeConfig from '@/data/home/';
import { windowOpen } from '@/shared/utils';
import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useCommon());
const { lePadV, gtPadV } = useScreen();
const { isEn } = useLocale();
const homeBanner = computed(() => (isEn.value ? homeConfig.homeBanner.en : homeConfig.homeBanner.zh));

const jump = (item: any, flag: boolean) => {
  if (!lePadV && flag) {
    return;
  }
  if (item.link) {
    windowOpen(item.link, item.target ?? '_blank');
  }
};

const index = ref(0);
const currentItem = computed(() => homeBanner.value[index.value]);
const currentBgTheme = computed(() => {
  if (currentItem.value.isLightBg) {
    return 'light';
  }
  return 'dark';
});
</script>

<template>
  <div class="home-banner-wrap">
    <OCarousel
      v-model:active-index="index"
      ref="slidesRef"
      effect="toggle"
      indicator-click
      loop
      active-class="current-slide"
      class="home-banner"
      pause-on-hover
      :data-o-theme="currentBgTheme"
      style="--carousel-indicator-bg-color-selected: #fff"
    >
      <OCarouselItem v-for="item in homeBanner" :key="item.title" class="home-banner-item">
        <div
          class="banner-img"
          :class="{
            'no-btn': !item.btn && item.link,
            [item.className]: item.className,
          }"
          :style="`background:url(${gtPadV ? (theme === 'dark' && item.pcBannerDark || item.pcBanner) : theme === 'dark' && item.moBannerDark || item.moBanner}) no-repeat top center/cover;`"
          @click="jump(item, item.btn !== '')"
        >
          <div class="banner-content">
            <div class="content-left" :class="{ 'teamup-content-left': item.link.includes('team-up') }">
              <div class="content-text">
                <div v-if="lePadV && item.titleMb.length" class="title">
                  <p v-for="itemTitleMb in item.titleMb" :key="itemTitleMb">
                    {{ itemTitleMb }}
                  </p>
                </div>
                <p v-else class="title" :class="{ 'teamup-title': item.link.includes('team-up') }">
                  {{ item.title }}
                </p>
                <p v-if="item.subtitle" class="subtitle">{{ item.subtitle }}</p>
                <p v-if="item.desc.length" class="desc">
                  <span v-for="itemDesc in item.desc" :key="itemDesc">{{ itemDesc }}</span>
                </p>
                <img v-if="item.textImg" class="text-img" :src="gtPadV ? item.textImg : item.textImgMb" alt="" />
              </div>
              <div v-if="item.btn" class="btn-box">
                <OButton class="home-banner-btn" round="pill" variant="solid" color="primary" :size="lePadV ? 'medium' : 'large'" @click="jump(item, false)">
                  {{ item.btn }}
                  <template #suffixIcon
                    ><OIcon><OIconArrowRight /></OIcon
                  ></template>
                </OButton>
              </div>
            </div>
            <div v-if="item.rightInset && gtPadV" class="content-right">
              <img class="video-player-btn" :src="item.rightInset" :alt="item.title" @click.stop="clickRightInset(item.rightLink)" />
            </div>
          </div>
        </div>
      </OCarouselItem>
    </OCarousel>
  </div>
</template>

<style lang="scss" scoped>
.home-banner-wrap {
  --banner-height: 460px;

  @include respond-to('laptop') {
    --banner-height: 400px;
  }
  @include respond-to('pad_h') {
    --banner-height: 320px;
  }
  @include respond-to('pad_v') {
    --banner-height: 184px;
    padding: 2px 32px 0;
  }
  @include respond-to('phone') {
    width: var(--grid-content-width);
    margin: 0 auto;
    padding: 16px 0;
    --banner-height: 184px;
  }
}

.home-banner-item {
  height: var(--banner-height);
}

.content-text {
  --d: 10px;
  color: var(--o-color-info1);
}

@keyframes fade-up {
  from {
    transform: translateY(var(--d));
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.current-slide {
  .content-text {
    animation: fade-up 400ms ease-in;
  }
  .btn-box {
    animation: fade-up 400ms ease-in;
  }
}

.home-banner {
  height: var(--banner-height);
  max-width: 100vw;
  overflow: hidden;
  @include respond-to('<=pad_v') {
    border-radius: 4px;
  }
  .banner-img {
    height: 100%;
    .banner-content {
      box-sizing: border-box;
      width: var(--grid-content-width);
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      height: 100%;
      position: relative;
      .content-left {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 100%;
        .content-text {
          .title {
            @include display1;
            font-weight: 500;
            white-space: pre-wrap;
            @include respond-to('<=pad_v') {
              font-size: 22px;
              line-height: 30px;
              line-height: var(--e-line-height-h4);
              text-align: center;
            }
          }
          .subtitle {
            margin-top: var(--e-spacing-h8);
            font-size: 30px;
            line-height: 40px;
            font-weight: normal;
            @include respond-to('<=pad_v') {
              margin-top: 8px;
              font-size: var(--e-font-size-h7);
              line-height: var(--e-line-height-h7);
              text-align: center;
            }
          }
          .desc {
            margin-top: 16px;
            @include respond-to('<=pad_v') {
              text-align: center;
              margin-top: 8px;
            }
            span {
              font-size: var(--e-font-size-h5);
              line-height: 40px;
              @include respond-to('<=pad_v') {
                font-size: var(--e-font-size-text);
                line-height: 24px;
              }
              @include respond-to('phone') {
                font-size: 12px;
                line-height: 18px;
              }
            }
          }
          .teamup-title {
            font-size: 56px;
            line-height: 84px;
            font-weight: 600;
            @include respond-to('<=laptop') {
              font-size: var(--e-font-size-h3);
              line-height: var(--e-line-height-h3);
            }
            @include respond-to('<=pad_v') {
              padding-bottom: var(--e-spacing-h5);
              font-size: 20px;
              line-height: 30px;
              text-align: center;
            }
          }
        }
        .btn-box {
          margin-top: var(--e-spacing-h3);
          --d: 20px;
          @include respond-to('<=pad_v') {
            margin-top: var(--e-spacing-h5);
            width: 100%;
            display: flex;
            justify-content: center;
          }
          @include respond-to('phone') {
            display: none;
          }
          .home-banner-btn {
            color: var(--e-color-white);
          }
        }
      }
      .teamup-content-left {
        @include respond-to('<=pad_v') {
          justify-content: flex-end;
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
    /* &.banner-version {
      text-align: center;
      .banner-content .content-left .content-text {
        :deep(.title) {
          font-size: 56px;
          font-weight: 600;

          @include respond-to('<=laptop') {
            font-size: var(--e-font-size-h2);
            line-height: var(--e-line-height-h2);
          }
          @include respond-to('<=pad') {
            font-size: var(--e-font-size-h3);
            line-height: var(--e-line-height-h3);
          }
          @include respond-to('<=pad_v') {
            font-size: var(--e-font-size-h4);
            line-height: var(--e-line-height-h3);
            text-align: center;
          }
        }
      }
    } */
    &.no-btn {
      cursor: pointer;
    }
  }
  .summit202506 {
    .banner-content {
      .content-left {
        .content-text {
          .text-img {
            object-fit: cover;
            height: 183px;
            display: block;
            @include respond-to('<=pad_v') {
              width: inherit;
              height: 90px;
            }
          }
        }
        @include respond-to('<=pad_v') {
          align-items: center;
          .btn-box {
            margin-bottom: var(--e-spacing-h5);
          }
        }
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
    @include respond-to('laptop') {
      padding: 0 24px;
    }
    @include respond-to('pad_h') {
      padding: 0 16px;
    }
    @include respond-to('<=pad_v') {
      text-align: center;
    }
    .el-carousel__indicator {
      .el-carousel__button {
        width: 40px;
        @include respond-to('<=pad_v') {
          width: 20px;
        }
      }
      &.is-active {
        .el-carousel__button {
          background-color: var(--e-color-yellow5);
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
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      margin: 0 auto;
      background: url(@/assets/category/home/banner/banner-summit-2024.jpg) no-repeat center/cover;
      .img-wrap {
        width: 100%;
        max-width: 1504px;
        padding: 0 44px;
        @include respond-to('laptop') {
          padding: 0 24px;
        }
        @include respond-to('<=pad') {
          padding: 0 16px;
          img {
            width: 660px;
          }
        }
      }
      @include respond-to('<=pad') {
        display: none;
      }
    }
    .summit-banner-mo {
      display: none;
      @include respond-to('<=pad') {
        width: 100%;
        height: 100%;
        display: block;
        background-image: url(@/assets/category/home/banner/banner-summit_mo-2024.jpg);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        position: relative;
        img {
          width: 300px;
          position: absolute;
          bottom: 9%;
          left: 50%;
          transform: translateX(-50%);
        }
      }
    }
  }
}
</style>
