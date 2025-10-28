<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import HomeSwiper from './HomeSwiper.vue';
import homeConfig from '@/data/home/';
import { useLocale } from '~@/composables/useLocale';

const { t } = useLocale();

const data = homeConfig.organization;

const partLen = Math.floor(data.length / 3);

const displayData = data
  .reduce(
    (acc, curr, index) => {
      const groupIndex = Math.min(Math.floor(index / partLen), 2);
      acc[groupIndex].push(curr);
      return acc;
    },
    [[], [], []] as (typeof data)[number][][]
  )
  .map((part) => [...part, ...part]);
</script>

<template>
  <AppSection class="home-partner" :title="t('home.partners.title')" :full="true">
    <HomeSwiper v-for="(part, index) in displayData" :key="index" :reverse-direction="index === 1" :data="part" class="partner-swiper"></HomeSwiper>
    <template #footer>
      <p class="partner-tips">{{ t('home.partners.orderDesc') }}</p>
    </template>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-partner {
  margin: 0 auto;
}
.partner-swiper:not(:first-child) {
  margin-top: 24px;
  @include respond-to('laptop') {
    margin-top: 20px;
  }
  @include respond-to('pad_h') {
    margin-top: 16px;
  }
  @include respond-to('<=pad_v') {
    margin-top: 12px;
  }
}

.parterner-tips {
  @include tip1;
  text-align: center;
  color: var(--o-color-info3);
}
</style>

<style lang="scss">
@include in-dark {
  .partner-swiper {
    .o-figure img {
      filter: none;
    }
  }
}
</style>
