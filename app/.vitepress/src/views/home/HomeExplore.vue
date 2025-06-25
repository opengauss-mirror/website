<script lang="ts" setup>
import { useI18n } from '@/i18n';
import AppContent from '@/components/AppContent.vue';
import { useData } from 'vitepress';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import ExploreBg from '@/assets/category/home/explore-bg.png';

import { DOCS_LINK } from '@/data/url-config';

const i18n = useI18n();
const { lang } = useData();

const handleGo = (path: string) => {
  return path.startsWith('/docs/') ? DOCS_LINK + lang.value + path : path;
};
</script>

<template>
  <div class="home-explore" :style="`background:url(${ExploreBg}) no-repeat top center/cover;`">
    <AppContent>
      <h3>{{ i18n.home.HOME_EXPLORE.EXPLORE_TITLE }}</h3>
      <div class="home-explore-action">
        <a v-for="(item, index) in i18n.home.HOME_EXPLORE.LIST" :key="index" :href="handleGo(item.PATH)" target="_blank" rel="noopener noreferrer">
          <OButton size="small" animation class="home-explore-btn" @click="handleGo(item.PATH)">
            {{ item.NAME }}
            <template #suffixIcon>
              <IconArrowRight class="icon"></IconArrowRight>
            </template>
          </OButton>
        </a>
      </div>
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
$explore-color: #fff;
.home-explore {
  height: 300px;
  @media screen and (max-width: 760px) {
    height: auto;
  }
  h3 {
    text-align: center;
    font-size: var(--e-font-size-h3);
    color: #fff;
    font-weight: 300;
    line-height: var(--e-line-height-h3);
    @media screen and (max-width: 760px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  .home-explore-action {
    display: flex;
    justify-content: center;
    gap: var(--e-spacing-h1);
    margin-top: var(--e-spacing-h2);
    @media screen and (max-width: 760px) {
      gap: var(--e-spacing-h5);
      flex-direction: column;
      max-width: 85%;
      margin: var(--e-spacing-h5) auto 0;
    }
  }
  .home-explore-btn {
    border-color: $explore-color !important;
    color: $explore-color !important;
    .icon {
      color: $explore-color;
      width: var(--e-font-size-h8);
      height: var(--e-font-size-h8);
    }
    @media screen and (max-width: 760px) {
      justify-content: center;
    }
  }
}
</style>
