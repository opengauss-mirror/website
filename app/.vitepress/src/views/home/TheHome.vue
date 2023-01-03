<script lang="ts" setup>
import { onMounted, onUnmounted, ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import AOS from 'aos';
import AppContent from '@/components/AppContent.vue';
import HomeCalendar from './HomeCalendar.vue';
import HomeBanner from './HomeBanner.vue';
import HomeCharacteristic from './HomeCharacteristic.vue';
import HomePlayground from './HomePlayground.vue';
import CommunityActivity from './CommunityActivity.vue';
import HomeExplore from './HomeExplore.vue';
import HomeShowCase from './HomeShowCase.vue';
import HomeVideo from './HomeVideo.vue';
import HomeNews from './HomeNews.vue';
import LinkPanel from '@/components/LinkPanel.vue';

import { getSortData } from '@/api/api-search';

import HomeConfig from '@/data/home/';

import summaryTips from '@/assets/category/home/summary-tips.png';
import summaryTipsClosed from '@/assets/category/home/closed.png';

const { lang } = useData();
const i18n = useI18n();
const newsData = ref(undefined);
const blogData = ref(undefined);

// 最新活动数据
const eventsData = computed(() =>
  lang.value === 'zh' ? HomeConfig.HOME_EVENTS.zh : HomeConfig.HOME_EVENTS.en
);
// 年度报告显示控制
const isSummaryShow = ref(false);
const summaryTipsClick = () => {
  isSummaryShow.value = false;
  sessionStorage.setItem('summary-tips', 'false');
};
onMounted(async () => {
  const body = document.querySelector('body');
  if (body) {
    body.classList.add('home-loading');
  }
  AOS.init({
    offset: 50,
    duration: 800,
    delay: 100,
    once: true,
  });
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
    newsData.value = responeData.obj.records;
  } catch (e: any) {
    throw new Error(e);
  }
  try {
    const responeData = await getSortData(paramsBlog);
    blogData.value = responeData.obj.records;
  } catch (e: any) {
    throw new Error(e);
  }
  // 年度报告
  const summaryShow = sessionStorage.getItem('summary-tips');
  isSummaryShow.value =
    lang.value === 'en' ? false : summaryShow ? false : true;
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
    <div data-aos="fade-up">
      <HomeCharacteristic />
      <HomePlayground />
    </div>
    <CommunityActivity />
  </AppContent>

  <HomeExplore data-aos="fade-down" />
  <AppContent>
    <ClientOnly>
      <div id="meetings" class="home-calendar" data-aos="fade-up">
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
  <HomeVideo data-aos="fade-up" />
  <AppContent>
    <HomeShowCase />
    <div class="home-partner">
      <h3 class="home-title">{{ i18n.home.ORGANIZATION_TITLE }}</h3>
      <LinkPanel :link-list="HomeConfig.ORGANIZATION" :islink="false" />

      <h3 class="home-title">{{ i18n.home.LINK_TITLE }}</h3>
      <LinkPanel :link-list="HomeConfig.LINK_LIST" :islink="true" />
    </div>
  </AppContent>
  <div v-if="isSummaryShow" class="smmary-code">
    <a href="https://summary.opengauss.org/zh/2022/" target="_blank">
      <img class="code" :src="summaryTips" alt="扫描二维码" />
    </a>
    <img
      :src="summaryTipsClosed"
      class="close"
      alt="扫描二维码"
      @click="summaryTipsClick"
    />
  </div>
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
.smmary-code {
  position: fixed;
  left: 1vw;
  top: 65vh;
  z-index: 99;

  .code {
    width: 141px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      width: 85px;
    }
  }
  .close {
    position: absolute;
    right: -10px;
    top: -10px;
    width: 24px;
    height: 24px;
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
