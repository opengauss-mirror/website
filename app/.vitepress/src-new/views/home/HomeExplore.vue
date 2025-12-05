<script setup lang="ts">
import { DOCS_LINK } from '@/data/url-config';
import { useData } from 'vitepress';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';

const { lang } = useData();
const { isPhone } = useScreen();
const { theme } = storeToRefs(useCommon());

const handleGo = (path: string) => {
  const link = `${DOCS_LINK}/${lang.value}${path}`;
  return path.startsWith('/docs/') ? link : path;
};
</script>

<template>
  <AppSection :title="isPhone ? $t('home.HOME_EXPLORE.EXPLORE_TITLE_MO') : $t('home.HOME_EXPLORE.EXPLORE_TITLE')">
    <div class="home-explore-content">
      <a class="home-explore-content-left" :data-o-theme="theme" :href="handleGo($t('home.HOME_EXPLORE.LIST[0].PATH'))">
        <div class="item-content">
          <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[0].NAME') }}</p>
          <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[0].DESC') }}</p>
        </div>
      </a>
      <a class="home-explore-right-item" :href="handleGo($t('home.HOME_EXPLORE.LIST[1].PATH'))">
        <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[1].NAME') }}</p>
        <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[1].DESC') }}</p>
      </a>
      <a class="home-explore-right-item" :href="handleGo($t('home.HOME_EXPLORE.LIST[2].PATH'))">
        <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[2].NAME') }}</p>
        <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[2].DESC') }}</p>
      </a>
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
  display: grid;
  grid-template-columns: var(--grid-8) 1fr;
  grid-template-rows: 1fr 1fr;
  gap: var(--grid-column-gutter);

  @media (min-width: 1201px) and (max-width: 1680px) {
    grid-template-columns: var(--grid-9) 1fr;
  }

  @include respond-to('pad_h') {
    grid-template-columns: var(--grid-5) 1fr;
  }

  @include respond-to('<=pad_v') {
    grid-template-rows: auto auto auto;
    grid-template-columns: 1fr;
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
}

.home-explore-item-desc {
  z-index: 2;
  position: relative;
  margin-top: 8px;
  @include text1;
  color: var(--o-color-info3);
}

.home-explore-content-left {
  grid-row: 1 / span 2;
  position: relative;
  box-sizing: border-box;
  background-color: var(--e-color-bg2);
  transition: box-shadow 0.2s ease-in-out;
  color: var(--o-color-info1);
  @include hover {
    color: var(--e-color-link1);
    box-shadow: var(--o-shadow-2);
  }
  background-image: url("~@/assets/category/home/intro.png");
  border-radius: 4px;
  padding: 0;

  background-repeat: no-repeat;

  min-height: 396px;
  @include respond-to('laptop') {
    min-height: 320px;
  }
  @include respond-to('pad_h') {
    min-height: 304px;
  }

  @include respond-to('<=pad_v') {
    padding: 48px 12px 12px 12px;
    min-height: 114px;
    margin-right: 0;
    background-image: url('~@/assets/category/home/intro_mo.png');
    &[data-o-theme='dark'] {
      background-image: url("~@/assets/category/home/intro_mo_dark.png");
    }
    background-repeat: no-repeat;
    background-size: cover;
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

.home-explore-right-item {
  background-size: cover;
  background-repeat: no-repeat;
  padding: 24px 32px;
  background-image: url("~@/assets/category/home/deploy.png");
  &:nth-child(1) {
    background-image: url("~@/assets/category/home/contribute.png");
  }

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
  border-radius: 4px;

  @include respond-to('laptop') {
    padding: 16px 24px;
  }
  @include respond-to('pad_h') {
    padding: 12px 16px;
  }
  @include respond-to('<=pad_v') {
    background-image: none;
    padding: 12px;
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
</style>
