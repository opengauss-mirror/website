<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntro from './components/SummitIntro.vue';
import SummitAgenda from './components/SummitAgenda.vue';
import SummitReview from './components/SummitReview.vue';
// import SummitLive from './components/SummitLive.vue';

import summitData from './data';
import { useCommon } from '@/stores/common';
import { computed, provide } from 'vue';

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

provide('isLight', isLight);
</script>

<template>
  <div class="summit-2025">
    <SummitBanner :banner-data="summitData.banner" />
    <AppContent>
      <SummitIntro :intro-data="summitData.intro" />
      <!-- <SummitLive id="live" :live-data="summitData.live" /> -->
      <SummitAgenda :agenda-data="summitData.agenda" :live-list="summitData.live.list" />
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
}
</style>