<script setup lang="ts">
import { OButton, OCarousel, OCarouselItem, OFigure, OIcon, OIconArrowRight } from '@opensig/opendesign';
import { computed, ref, watchEffect } from 'vue';
import { useData } from 'vitepress';
import homeContent from '#content/home';
import { windowOpen } from '@/shared/utils';
import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '@/stores/common';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useCommon());
const { lePadV, gtPadV, current } = useScreen();
const { locale } = useLocale();
const { lang } = useData();
watchEffect(() => (locale.value = lang.value ?? 'zh'));

function foldBanner(raw: any, langCode: string) {
  const s = (field: string) => raw[`${field}_${langCode}`] ?? raw[field];
  const banners: Record<string, string> = { laptop: raw.bg_pc };
  if (raw.bg_pad) banners.pad_v = raw.bg_pad;
  if (raw.bg_mb) banners.phone = raw.bg_mb;
  const bannersDark: Record<string, string> | undefined =
    raw.bg_pc_dark || raw.bg_mb_dark
      ? { laptop: raw.bg_pc_dark, ...(raw.bg_mb_dark ? { phone: raw.bg_mb_dark } : {}) }
      : undefined;
  return {
    banners: new Proxy(banners, { get: (t, p: string) => t[p] ?? t.laptop }),
    bannersDark: bannersDark
      ? new Proxy(bannersDark, { get: (t, p: string) => t[p] ?? t.laptop })
      : undefined,
    isLightBg: raw.bg_theme === 'light',
    title: s('title') ?? '',
    titleMb: raw[`title_mb_${langCode}`] ?? [],
    subtitle: s('subtitle') ?? '',
    desc: s('desc') ?? [],
    btn: s('btn') ?? '',
    link: s('href') ?? '',
    target: raw.is_blank ? '_blank' : '_self',
    textImg: raw[`text_image_${langCode}`] ?? '',
    textImgMb: raw[`text_image_mb_${langCode}`] ?? '',
    className: raw.class_name ?? '',
    rightInset: raw.attach ?? '',
    rightLink: raw.attach_href ?? '',
  };
}

const homeBanner = computed(() => {
  const currentLang = lang.value ?? 'zh';
  return (homeContent.banner as any[])
    .filter((item) => {
      if (!item.locale) return true;
      return item.locale.split(',').map((s: string) => s.trim()).includes(currentLang);
    })
    .map((item) => foldBanner(item, currentLang));
});

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
      :auto-play="true"
      :data-o-theme="currentBgTheme"
    >
      <OCarouselItem v-for="item in homeBanner" :key="item.title" class="home-banner-item">
        <OFigure
          :class="{ 'banner-bg': true, 'use-dark-style': !item.bannersDark?.[current] }"
          :src="(theme === 'dark' && item.bannersDark?.[current]) || item.banners[current]"
          @click="jump(item, item.btn !== '')"
        >
          <div class="banner-content">
            <div class="content-left" :class="{ 'content-left-img': item.textImg && item.textImgMb, 'teamup-content-left': item.link.includes('team-up') }">
              <div class="content-text" :class="{ 'content-text-img': item.textImg && item.textImgMb }">
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
        </OFigure>
      </OCarouselItem>
    </OCarousel>
  </div>
</template>

<style lang="scss" scoped>
:root.dark {
  .banner-bg.use-dark-style {
    :deep(.o-figure-img) {
      filter: brightness(80%) grayscale(20%) contrast(1.2);
    }
  }
}

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
  --carousel-indicator-bg-color-selected: var(--o-color-info1);
  .banner-bg {
    height: 100%;
    width: 100%;
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
        .content-text-img {
          @include respond-to('<=pad_v') {
            display: flex;
            justify-content: center;
          }
        }
        .btn-box {
          margin-top: var(--e-spacing-h3);
          --d: 20px;
          @include respond-to('<=pad_v') {
            display: none;
          }
          .home-banner-btn {
            color: var(--e-color-white);
          }
        }
      }
      .content-left-img {
        @include respond-to('<=pad_v') {
          justify-content: start;
          padding-top: 10px;
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
    &.no-btn {
      cursor: pointer;
    }
  }
  .text-img {
    object-fit: cover;
    height: 180px;
    display: block;
    @include respond-to('laptop') {
      width: inherit;
      height: 160px;
    }
    @include respond-to('pad_h') {
      width: inherit;
      height: 120px;
    }
    @include respond-to('<=pad_v') {
      width: inherit;
      height: 110px;
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
}
</style>
