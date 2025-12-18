<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntro from './components/SummitIntro.vue';
import SummitAgenda from './components/SummitAgenda.vue';
import SummitReview from './components/SummitReview.vue';
import SummitLive from './components/SummitLive.vue';

import summitData from './data';
import { useCommon } from '@/stores/common';
import { computed, provide, onMounted } from 'vue';

import { getUrlParams } from '@/shared/utils';
import { oaReport } from '@/shared/analytics';

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

provide('isLight', isLight);

// 埋点统计投放流量
function collectAdvertisedData() {
  const { href } = window.location;
  const regex = /[\\?&]utm_source=/;
  const containsUtmSource = regex.test(href);
  if (!containsUtmSource) {
    return;
  }
  const paramsArr = getUrlParams(href);
  oaReport('fromAdvertised', {
    origin: href,
    ...paramsArr,
  });
  history.pushState(null, '', location.origin + location.pathname);
}
onMounted(() => {
  setTimeout(() => {
    collectAdvertisedData();
  }, 300);
});
</script>

<template>
  <div class="summit-2025">
    <SummitBanner :banner-data="summitData.banner" />
    <AppContent>
      <SummitIntro :intro-data="summitData.intro" />
      <SummitLive id="live" :live-data="summitData.live" />
      <SummitAgenda :agenda-data="summitData.agenda" />
      <SummitReview :review-data="summitData.review" />
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
.app-content {
  max-width: var(--grid-content-width);
  width: var(--grid-content-width);
  margin: 0 auto;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
:deep(.title-box) {
  text-align: center;
  .title-bg {
    position: relative;
    font-size: 40px;
    --the-line-height: 56px;
    top: calc(var(--the-line-height) / 1.5);
    line-height: var(--the-line-height);
    font-weight: 600;
    background-image: linear-gradient(to bottom, rgba(#b461f6, 0.24) 0, rgba(#7d32ea, 0) 100%);
    -webkit-background-clip: text;
    color: transparent;
    @media screen and (max-width: 1440px) {
      font-size: var(--e-font-size-h3);
      --the-line-height: var(--e-line-height-h3);
    }
    @media (max-width: 767px) {
      font-size: var(--e-font-size-h7);
      --the-line-height: var(--e-line-height-h7);
    }
  }
  .title {
    font-size: 40px;
    color: var(--e-color-text1);
    line-height: 56px;
    font-weight: 500;
    @media screen and (max-width: 1440px) {
      font-size: var(--e-font-size-h3);
      line-height: var(--e-line-height-h3);
    }
    @media (max-width: 767px) {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
    }
  }
  .floor-img {
    width: 228px;
    margin-top: -44px;
    @media screen and (max-width: 1440px) {
      width: 182px;
      margin-top: -32px;
    }
    @media (max-width: 767px) {
      width: 110px;
      margin-top: -20px;
    }
  }
}
</style>
