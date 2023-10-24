<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import { handleError } from '@/shared/utils';

import AppContent from '@/components/AppContent.vue';
import HomeCalendar from './HomeCalendar.vue';
import HomeBanner from './HomeBanner.vue';
import HomeCharacteristic from './HomeCharacteristic.vue';
import CommunityActivity from './CommunityActivity.vue';
import HomeExplore from './HomeExplore.vue';
import HomeShowCase from './HomeShowCase.vue';
import HomeVideo from './HomeVideo.vue';
import HomeNews from './HomeNews.vue';
import LinkPanel from '@/components/LinkPanel.vue';
import HomePlayground from './HomePlayground.vue';

import { getSortData } from '@/api/api-search';

import homeConfig from '@/data/home/';

const { lang } = useData();
const i18n = useI18n();
const newsData = ref(undefined);
const blogData = ref(undefined);

// 最新活动数据
const eventsData = computed(() =>
  lang.value === 'zh' ? homeConfig.homeEvents.zh : homeConfig.homeEvents.en
);
onMounted(async () => {
  const body = document.querySelector('body');
  if (body) {
    body.classList.add('home-loading');
  }
  const paramsNews = {
    category: 'news',
    lang: lang.value,
    page: 1,
    pageSize: 4,
  };
  const paramsBlog = {
    category: 'blog',
    lang: lang.value,
    page: 1,
    pageSize: 4,
  };
  try {
    const responeData = await getSortData(paramsNews);
    if (responeData.obj && responeData.obj.records) {
      newsData.value = responeData.obj.records;
    }
  } catch (e: any) {
    handleError('Error!');
  }
  try {
    const responeData = await getSortData(paramsBlog);
    if (responeData.obj && responeData.obj.records) {
      blogData.value = responeData.obj.records;
    }
  } catch (e: any) {
    handleError('Error!');
  }
});
onUnmounted(() => {
  const body = document.querySelector('body');
  if (body) {
    body.classList.remove('home-loading');
  }
});
</script>

<template>
  <HomeBanner />
  <AppContent>
    <HomeCharacteristic />
    <HomePlayground />
    <CommunityActivity />
  </AppContent>

  <HomeExplore />
  <AppContent>
    <ClientOnly>
      <div id="meetings" class="home-calendar">
        <h3 class="home-title">{{ i18n.home.HOME_MEETING }}</h3>
        <HomeCalendar />
      </div>
    </ClientOnly>
    <HomeNews
      v-if="blogData && newsData"
      :blog-data="blogData"
      :news-data="newsData"
      :events-data="eventsData"
    />
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
