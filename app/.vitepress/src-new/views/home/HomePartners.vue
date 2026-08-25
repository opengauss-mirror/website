<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { OLogoSwiper, OLogoSwiperItems, OPlusConfigProvider } from '@opendesign-plus/components';
import type { OLogoSwiperItemT } from '@opendesign-plus/components';
import homeContent from '#content/home';
import AppSection from '~@/components/AppSection.vue';
import { useLocale } from '~@/composables/useLocale';
import { useCommon } from '~@/stores/common';

const { t } = useLocale();
const { theme } = storeToRefs(useCommon());

type OrganizationItemT = (typeof homeContent)['organization'][number];

const mapFunc = (item: OrganizationItemT): OLogoSwiperItemT => ({
  logo: item.img_light,
  logoDark: item.img_dark,
});

const ROW_COUNT = 3;

const rows = computed<OLogoSwiperItemT[][]>(() => {
  const list = homeContent.organization.map(mapFunc);
  const partLen = Math.floor(list.length / ROW_COUNT) || 1;
  const buckets: OLogoSwiperItemT[][] = Array.from({ length: ROW_COUNT }, () => []);
  list.forEach((item, index) => {
    const groupIndex = Math.min(Math.floor(index / partLen), ROW_COUNT - 1);
    buckets[groupIndex].push(item);
  });
  return buckets;
});

const durationMap = computed(() => rows.value.map(row => Math.floor(row.length / 4) * 30));

const swiperTheme = computed<'light' | 'dark'>(() => (theme.value === 'dark' ? 'dark' : 'light'));
</script>

<template>
  <AppSection class="home-partner" :title="t('home.partners.title')" :full="true">
    <OPlusConfigProvider :theme="swiperTheme">
      <OLogoSwiper class="partner-swiper">
        <OLogoSwiperItems
          v-for="(row, index) in rows"
          :key="index"
          :data="row"
          :reverse="index % 2 === 1"
          :duration="durationMap[index]"
        />
        <template #tip>
          <p class="partner-tip">{{ t('home.partners.orderDesc') }}</p>
        </template>
      </OLogoSwiper>
    </OPlusConfigProvider>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-partner {
  margin: 0 auto;
}

.partner-tip {
  @include tip1;
  text-align: center;
  color: var(--o-color-info3);
}
</style>
