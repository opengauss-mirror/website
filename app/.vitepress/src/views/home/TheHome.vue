<script lang="ts" setup>
import { useI18n } from '@/i18n';

import AppContent from '@/components/AppContent.vue';
import HomeMeeting from './HomeMeeting.vue';
import HomeBanner from './HomeBanner.vue';
import HomeCharacteristic from './HomeCharacteristic.vue';
import HomeExplore from './HomeExplore.vue';
import HomeShowCase from './HomeShowCase.vue';
import HomeVideo from './HomeVideo.vue';
import HomeNews from './HomeNews.vue';
import LinkPanel from '@/components/LinkPanel.vue';

import homeConfig from '@/data/home/';

const i18n = useI18n();
</script>

<template>
  <ClientOnly>
    <HomeBanner />
    <AppContent>
      <HomeCharacteristic />
    </AppContent>

    <HomeExplore />
    <AppContent>
      <div id="meetings" class="home-calendar">
        <h3 class="home-title">{{ i18n.home.HOME_MEETING }}</h3>
        <p class="meeting-text">{{ i18n.home.HOME_CALENDAR.LOGIN_TEXT }}</p>
        <HomeMeeting />
      </div>
      <HomeNews />
    </AppContent>
    <HomeVideo />
    <AppContent>
      <HomeShowCase />
      <div class="home-partner">
        <h3 class="home-title">{{ i18n.home.ORGANIZATION_TITLE }}</h3>
        <LinkPanel :link-list="homeConfig.organization" :islink="false" />

        <h3 class="home-title">{{ i18n.home.LINK_TITLE }}</h3>
        <LinkPanel :link-list="homeConfig.linkList" :islink="true" />
      </div>
    </AppContent>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.home-title {
  text-align: center;
  color: var(--o-color-text1);
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  font-weight: 300;
  @media screen and (max-width: 1100px) {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    margin-bottom: var(--o-spacing-h5);
  }
}
.meeting-text {
  color: var(--o-color-text4);
  font-size: var(--o-font-size-text);
  line-height: var(--o-line-height-text);
  text-align: center;
  margin: 16px 0 24px;
}
.home-partner {
  h3 {
    margin-top: var(--o-spacing-h1);
    font-weight: 300;
    @media screen and (max-width: 1100px) {
      margin-top: var(--o-spacing-h2);
    }
  }
}
</style>
