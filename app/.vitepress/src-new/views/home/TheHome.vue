<script setup lang="ts">
import HomeBanner from './HomeBanner.vue';
import HomeFeature from './HomeFeature.vue';
import HomeExplore from './HomeExplore.vue';
import { useData } from 'vitepress';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import HomeCalendar from './HomeCalendar.vue';
import HomeDynamic from './HomeDynamic.vue';
import HomeVideo from './HomeVideo.vue';
import HomePartners from './HomePartners.vue';

const { lang } = useData();
const { locale } = useI18n();

watchEffect(() => (locale.value = lang.value));
</script>

<template>
  <HomeBanner />
  <HomeFeature />
  <HomeExplore />
  <HomeCalendar />
  <HomeDynamic />
  <HomeVideo />
  <HomePartners />
</template>

<style lang="scss" scoped>
.home-section-sub-title {
  @include tip1;
}
</style>
