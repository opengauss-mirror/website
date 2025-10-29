<script setup lang="ts">
import { OLink } from '@opensig/opendesign';
import { DOCS_LINK } from '@/data/url-config';
import { useData } from 'vitepress';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from '~@/i18n';
import { useScreen } from '~@/composables/useScreen';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';

const { lang } = useData();
const { isPhone } = useScreen();
const { theme } = storeToRefs(useCommon())
const i18n = useI18n();

const handleGo = (path: string) => {
  const link = `${DOCS_LINK}/${lang.value}${path}`;
  return path.startsWith('/docs/') ? link : path;
};
</script>

<template>
  <AppSection :title="isPhone ? $t('home.HOME_EXPLORE.EXPLORE_TITLE_MO') : $t('home.HOME_EXPLORE.EXPLORE_TITLE')">
    <div v-if="!isPhone" class="home-explore-content">
      <OLink class="home-explore-content-left" :href="handleGo($t('home.HOME_EXPLORE.LIST[0].PATH'))">
        <div class="mask" v-if="theme === 'dark'"></div>
        <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[0].NAME') }}</p>
        <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[0].DESC') }}</p>
      </OLink>
      <div class="home-explore-content-right">
        <OLink class="home-explore-right-item" :href="handleGo($t('home.HOME_EXPLORE.LIST[1].PATH'))">
          <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[1].NAME') }}</p>
          <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[1].DESC') }}</p>
        </OLink>
        <OLink class="home-explore-right-item" :href="handleGo($t('home.HOME_EXPLORE.LIST[2].PATH'))">
          <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[2].NAME') }}</p>
          <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[2].DESC') }}</p>
        </OLink>
      </div>
    </div>
    <template v-else>
      <a v-for="item in i18n.home.HOME_EXPLORE.LIST" class="home-explore-mobile-item" :href="handleGo(item.PATH)" target="_blank" rel="noopener noreferrer">
        <p class="home-explore-item-title">{{ item.NAME }}</p>
        <p class="home-explore-item-desc">{{ item.DESC }}</p>
      </a>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
.app-section {
  --items-gap: 32px;
}
.home-explore-content {
  display: flex;
  align-items: stretch;
}

@media (840px < width <= 1200px) {
  .app-section {
    --items-gap: 16px;
  }
}

@media (max-width: 840px) {
  .app-section {
    --items-gap: 12px;
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
  --link-color: var(--o-color-info1);
}

.home-explore-item-desc {
  z-index: 2;
  position: relative;
  margin-top: 8px;
  @include text1;
  color: var(--o-color-control3);
}

.home-explore-content-left {
  position: relative;
  background-color: var(--e-color-bg2);
  background-image: url('~@/assets/category/home/intro.png');
  background-repeat: no-repeat;
  transition: box-shadow 0.2s ease-in-out;
  @include hover {
    box-shadow: var(--o-shadow-2);
  }
  margin-right: var(--items-gap);
  flex: 0 1 50%;
  max-width: 576px;
  border-radius: 4px;
  padding: 238px 32px 0 32px;

  .mask {
    position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.2);
  }
}

@media (840px < width <= 1200px) {
  .home-explore-content-left {
    padding-top: 172px;
  }
}

.home-explore-content-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.home-explore-right-item {
  &:nth-child(1) {
    background-image: url('~@/assets/category/home/deploy.png');
  }
  &:nth-child(2) {
    background-image: url('~@/assets/category/home/contribute.png');
  }
  &:not(:last-child) {
    margin-bottom: var(--items-gap);
  }

  min-height: 182px;
  box-sizing: border-box;

  transition: box-shadow 0.2s ease-in-out;
  @include hover {
    box-shadow: var(--o-shadow-2);
  }

  background-color: var(--e-color-bg2);
  background-size: 100% 100%;
  flex: 1;
  border-radius: 4px;
  padding: 24px 32px 16px;

  @include respond-to('<=pad') {
    padding: 12px 16px 8px;
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
  background-position-y: 65%;
  background-color: var(--e-color-bg2);
  color: var(--o-color-control3);

  .home-explore-item-title {
    @include h4;
    font-weight: bold;
  }

  .home-explore-item-desc {
    @include text2;
  }

  &:first-child {
    padding-top: 48px;
    background-image: url('~@/assets/category/home/intro.png');
    background-size: cover;
  }
  &:not(:last-child) {
    margin-bottom: var(--items-gap);
  }
}
</style>
