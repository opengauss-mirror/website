<script setup lang="ts">
import ContentWrapper from '~@/components/ContentWrapper.vue';
import HomeBanner from './HomeBanner.vue';
import HomeFeature from './HomeFeature.vue';
import HomeExplore from './HomeExplore.vue';
import { useData } from 'vitepress';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import HomeCalendar from './HomeCalendar.vue';
import HomeDynamic from './HomeDynamic.vue';

const { lang } = useData();
const { locale } = useI18n();

watchEffect(() => (locale.value = lang.value));
</script>

<template>
  <HomeBanner />
  <ContentWrapper vertical-padding style="">
    <HomeFeature style="--layout-content-padding: 0" />
    <HomeExplore style="--layout-content-padding: 0" />
    <HomeCalendar style="--layout-content-padding: 0" />
  </ContentWrapper>
</template>

<style lang="scss" scoped>
.home-section-sub-title {
  @include tip1;
}
</style>
