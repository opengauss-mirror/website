<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '~@/i18n';
import { useData } from 'vitepress';
import banner from '~@/assets/category/events/banner.png';

import IconEventOverview from '~icons/events/icon-event-overview.svg';
import IconEventList from '~icons/events/icon-event-list.svg';
import BannerTabHeader from '~@/components/BannerTabHeader.vue';

const i18n = useI18n();
const { lang } = useData();

const bannerData = computed(() => ({
  title: '活动',
  img: banner,
  subtitle: i18n.value.events.list.knowFullYearActivities,
}));

const tabsData = computed(() => [
  {
    title: i18n.value.events.LATEST_OVERVIEW,
    name: 'events',
    href: `/${lang.value}/events/`,
    icon: IconEventOverview,
    subtitle: '',
  },
  {
    title: i18n.value.events.LATEST_EVENTS,
    name: 'list',
    href: `/${lang.value}/events/list/`,
    icon: IconEventList,
    subtitle: '',
  },
]);
</script>

<template>
  <div>
    <BannerTabHeader :banner-data="bannerData" :tabs-data="tabsData"></BannerTabHeader>
    <Content />
  </div>
</template>
