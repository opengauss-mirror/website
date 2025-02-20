<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

import AppContent from '@/components/AppContent.vue';
import SummitBanner from './components/SummitBanner.vue';
import SummitIntro from './components/SummitIntro.vue';
import SummitLive from './components/SummitLive.vue';
import SummitAgenda from './components/SummitAgenda.vue';
import SummitGuests from './components/SummitGuests.vue';
import SummitReview from './components/SummitReview.vue';

import summitData from './data';
import guestsData from './data/mainForumGuests';
import dataSubForumGuests from './data/dataSubForumGuests';
import yunSubForumGuests from './data/yunSubForumGuests';
import fullSubForumGuests from './data/fullSubForumGuests';
import appSubForumGuests from './data/appSubForumGuests';

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>

<template>
  <SummitBanner :banner-data="summitData.banner" />
  <AppContent>
    <SummitIntro :intro-data="summitData.intro" />
    <SummitLive :live-data="summitData.live" />
    <SummitAgenda :agenda-data="summitData.agenda" />
    <div class="summit-guests">
      <div class="title-box" :class="{ 'title-box-dark': !isLight }">
        <p class="title-bg">{{ summitData.guests.titleBg }}</p>
        <p class="title">{{ summitData.guests.title }}</p>
      </div>
      <SummitGuests
        :title="summitData.guests.mainForumTitle"
        :lecturer-list="guestsData"
        class="main-forum"
      />
      <SummitGuests
        :title="summitData.guests.dataSubForumTitle"
        :lecturer-list="dataSubForumGuests"
        class="data-forum"
      />
      <SummitGuests
        :title="summitData.guests.yunSubForumTitle"
        :lecturer-list="yunSubForumGuests"
        class="yun-forum"
      />
      <SummitGuests
        :title="summitData.guests.fullSubForumTitle"
        :lecturer-list="fullSubForumGuests"
        class="full-forum"
      />
      <SummitGuests
        :title="summitData.guests.appSubForumTitle"
        :lecturer-list="appSubForumGuests"
        class="app-forum"
      />
    </div>
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
    background-image: linear-gradient(
      to bottom,
      rgba(#b461f6, 0.24) 0,
      rgba(#7d32ea, 0) 100%
    );
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
:deep(.title-box-dark) {
  .title-bg {
    background-image: linear-gradient(
      to bottom,
      rgba(#b461f6, 0.4) 0,
      rgba(#7d32ea, 0) 100%
    );
  }
}
</style>
