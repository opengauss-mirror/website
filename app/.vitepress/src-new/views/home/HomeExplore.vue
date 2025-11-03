<script setup lang="ts">
import { DOCS_LINK } from '@/data/url-config';
import { useData } from 'vitepress';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from '~@/i18n';
import { useScreen } from '~@/composables/useScreen';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import introBg from '~@/assets/category/home/intro.png';
import introBgMo from '~@/assets/category/home/intro_mo.png';
import rightBg1 from '~@/assets/category/home/deploy.png';
import rightBg2 from '~@/assets/category/home/contribute.png';

const { lang } = useData();
const { isPhone, lePadV } = useScreen();
const { theme } = storeToRefs(useCommon());
const i18n = useI18n();

const handleGo = (path: string) => {
  const link = `${DOCS_LINK}/${lang.value}${path}`;
  return path.startsWith('/docs/') ? link : path;
};
</script>

<template>
  <AppSection :title="isPhone ? $t('home.HOME_EXPLORE.EXPLORE_TITLE_MO') : $t('home.HOME_EXPLORE.EXPLORE_TITLE')">
    <div class="home-explore-content">
      <a class="home-explore-content-left" :href="handleGo($t('home.HOME_EXPLORE.LIST[0].PATH'))">
        <img v-show="!lePadV" :src="introBg" alt="" />
        <div class="mask" v-if="theme === 'dark'"></div>
        <div class="item-content">
          <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[0].NAME') }}</p>
          <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[0].DESC') }}</p>
        </div>
      </a>
      <div class="home-explore-content-right">
        <a class="home-explore-right-item" :href="handleGo($t('home.HOME_EXPLORE.LIST[1].PATH'))">
          <img v-show="!lePadV" :src="rightBg1" alt="" />
          <div class="item-content">
            <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[1].NAME') }}</p>
            <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[1].DESC') }}</p>
          </div>
        </a>
        <a class="home-explore-right-item" :href="handleGo($t('home.HOME_EXPLORE.LIST[2].PATH'))">
          <img v-show="!lePadV" :src="rightBg2" alt="" />
          <div class="item-content">
            <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[2].NAME') }}</p>
            <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[2].DESC') }}</p>
          </div>
        </a>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.app-section {
  --items-gap: 32px;
  @include respond-to('laptop') {
    --items-gap: 24px;
  }
  @include respond-to('pad') {
    --items-gap: 16px;
  }
  @include respond-to('phone') {
    --items-gap: 12px;
  }
}

.home-explore-content {
  display: flex;
  align-items: stretch;
  @include respond-to('<=pad_v') {
    flex-direction: column;
  }
}

.more {
  display: inline-flex;
  align-items: center;
  margin-top: 24px;
}

.home-explore-item-title {
  z-index: 2;
  position: relative;
  @include h3;
  font-weight: bold;
  // --link-color: var(--o-color-info1);
}

.home-explore-item-desc {
  z-index: 2;
  position: relative;
  margin-top: 8px;
  @include text1;
  color: var(--o-color-info3);
}

.home-explore-content-left {
  position: relative;
  box-sizing: border-box;
  background-color: var(--e-color-bg2);
  transition: box-shadow 0.2s ease-in-out;
  color: var(--o-color-info1);
  @include hover {
    color: var(--e-color-link1);
    box-shadow: var(--o-shadow-2);
  }
  margin-right: var(--items-gap);

  flex: 0 0 auto;
  width: calc(9 * var(--raster-width) + 8 * var(--raster-gap));
  border-radius: 4px;
  padding: 0;

  @include respond-to('pad_h') {
    width: calc(5 * var(--raster-width) + 4 * var(--raster-gap));
  }

  @include respond-to('<=pad_v') {
    padding: 48px 12px 12px 12px;
    min-height: 114px;
    margin-right: 0;
    margin-bottom: var(--items-gap);
    background-image: url('~@/assets/category/home/intro_mo.png');
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
  }

  .item-content {
    width: calc(100% - 64px);
    position: absolute;
    left: 50%;
    bottom: 68px;
    transform: translateX(-50%);

    @include respond-to('laptop') {
      width: calc(100% - 48px);
    }
    @include respond-to('pad_h') {
      width: calc(100% - 32px);
    }
    @include respond-to('<=pad_v') {
      position: static;
      transform: none;
    }
  }

  img {
    width: 100%;
    height: auto;
    object-fit: cover;
    @include respond-to('<=pad_v') {
      height: 114px;
    }
  }

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.2);
  }
}

.home-explore-content-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.home-explore-right-item {
  &:nth-child(1) {
    margin-bottom: var(--items-gap);
  }
  padding: 0;
  position: relative;
  box-sizing: border-box;
  transition: box-shadow 0.2s ease-in-out;
  color: var(--o-color-info1);
  @include hover {
    color: var(--e-color-link1);
    box-shadow: var(--o-shadow-2);
  }
  overflow: hidden;

  background-color: var(--e-color-bg2);
  flex: 1;
  border-radius: 4px;

  .item-content {
    position: absolute;
    top: 24px;
    left: 32px;
    right: 32px;
    @include respond-to('pad_h') {
      top: 12px;
      left: 16px;
      right: 16px;
    }
    @include respond-to('<=pad_v') {
      position: static;
      transform: none;
      padding: 12px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

@media (840px < width <= 1200px) {
  .home-explore-right-item {
    min-height: 144px;
  }
}

.home-explore-mobile-item {
  padding: 12px;
  display: block;
  border-radius: 4px;
  background-color: var(--e-color-bg2);
  color: var(--o-color-control3);

  .home-explore-item-title {
    @include h3;
    font-weight: bold;
  }

  .home-explore-item-desc {
    @include text2;
  }

  &:first-child {
    padding-top: 48px;
    background-image: url('~@/assets/category/home/intro_mo.png');
    background-size: cover;
    &[type='dark'] {
      background-image: url('~@/assets/category/home/intro_mo_dark.png');
    }
  }
  &:not(:last-child) {
    margin-bottom: var(--items-gap);
  }
}
</style>
