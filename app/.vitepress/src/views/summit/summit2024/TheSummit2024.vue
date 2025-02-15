<script setup lang="ts">
import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntro from './components/SummitIntro.vue';
import SummitAgenda from './components/SummitAgenda.vue';
import SummitPartner from './components/SummitPartner.vue';
import SummitReview from './components/SummitReview.vue';
import SummitLive from './components/SummitLive.vue';

import summitData from './data';
</script>
<template>
  <div class="summit-2024">
    <SummitBanner :banner-data="summitData.banner" />
    <AppContent>
      <SummitIntro :intro-data="summitData.intro" />
      <SummitLive id="live" :live-data="summitData.live" />
      <SummitAgenda :agenda-data="summitData.agenda" />
      <SummitPartner :partner-data="summitData.partner" />
      <SummitReview :review-data="summitData.review" />
    </AppContent>
  </div>
</template>

<style lang="scss" scoped>
:deep(.title-box) {
  text-align: center;
  .title {
    font-size: 40px;
    color: var(--o-color-text1);
    line-height: 56px;
    font-weight: 500;
    @media screen and (max-width: 1440px) {
      font-size: var(--o-font-size-h3);
      line-height: var(--o-line-height-h3);
    }
    @media (max-width: 767px) {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }
}
</style>
