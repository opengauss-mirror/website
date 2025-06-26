<script setup lang="ts">
import { useCommon } from '@/stores/common';

import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntro from './components/SummitIntro.vue';
import SummitLive from './components/SummitLive.vue';
import SummitAgenda from './components/SummitAgenda.vue';
import SummitActivity from './components/SummitActivity.vue';
import SummitReview from './components/SummitReview.vue';

import summitData from './data';
</script>

<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContent>
    <SummitIntro :intro-data="summitData.intro" />
    <SummitLive :live-data="summitData.live" />
    <SummitAgenda :agenda-data="summitData.agenda" />
    <SummitActivity :active-data="summitData.activity" />
    <SummitReview :review-data="summitData.review" />
  </AppContent>
</template>

<style lang="scss" scoped>
:deep(.title-box) {
  text-align: center;
  .title-bg {
    font-size: 40px;
    line-height: 56px;
    font-weight: 600;
    background-image: linear-gradient(to bottom, rgba(#b461f6, 0.24) 0, rgba(#7d32ea, 0) 100%);
    -webkit-background-clip: text;
    color: transparent;
    @media screen and (max-width: 1440px) {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
    }
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }
  .title {
    font-size: 40px;
    color: var(--o-color-text1);
    line-height: 56px;
    font-weight: 500;
    margin-top: -36px;
    @media screen and (max-width: 1440px) {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
      margin-top: -30px;
    }
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      margin-top: -15px;
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
:deep(.title-box-dark) {
  .title-bg {
    background-image: linear-gradient(to bottom, rgba(#b461f6, 0.4) 0, rgba(#7d32ea, 0) 100%);
  }
}
</style>
