<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from '~@/i18n';
import { useData } from 'vitepress';
import banner from '~@/assets/category/events/banner.png';

import IconEventOverview from '~icons/events/icon-event-overview.svg';
import IconEventList from '~icons/events/icon-event-list.svg';
import AppRouterTemplate from '~@/components/AppRouterTemplate.vue';
import AppRouterTemplateMo from '~@/components/AppRouterTemplateMo.vue';
import { useScreen } from '~@/composables/useScreen';

const i18n = useI18n();
const { lang } = useData();

const { lePadV } = useScreen();

const bannerData = computed(() => ({
  bannerTitle: '活动',
  bannerImg: banner,
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
    <component :is="lePadV ? AppRouterTemplateMo : AppRouterTemplate" :banner-data="bannerData" :tabs-data="tabsData"></component>
    <Content />
  </div>
</template>
