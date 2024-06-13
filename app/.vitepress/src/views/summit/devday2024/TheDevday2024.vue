<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntro from './components/SummitIntro.vue';
import SummitAgenda from './components/SummitAgenda.vue';
import SummitNow from './components/SummitNow.vue';
import SummitReview from './components/SummitReview.vue';

import summitData from './data';
</script>

<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContent>
    <SummitIntro :intro-data="summitData.intro" />
    <SummitAgenda :agenda-data="summitData.agenda" />
    <SummitNow :now-data="summitData.now" />
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
      margin-top: -18px;
    }
  }
}
</style>
