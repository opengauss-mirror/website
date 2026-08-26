<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import { useI18n } from '@/i18n';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

import newsData from '@/data/news';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const userCaseData = computed(() => i18n.value.common.COMMON_CONFIG);
const newsList = computed(() => {
  return lang.value === 'zh' ? newsData.zh : newsData.en;
});
const newsInfo = {
  link: `/${lang.value}/news/`,
  name: i18n.value.common.COMMON_CONFIG.NEWS,
};

const newsTitle = ref<any>([]);
const newsLint = ref<any>([]);
const prev = ref('');
const prevLint = ref('');
const nextLint = ref('');
const next = ref('');
const getNewsData = () => {
  newsList.value.forEach((item: any) => {
    newsTitle.value.push(item.title);
    newsLint.value.push(item.path);
  });
  newsTitle.value.forEach((item: any, index: number) => {
    if (item === frontmatter.value.title && index !== 0) {
      prev.value = newsTitle.value[index - 1];
      prevLint.value = newsLint.value[index - 1];
    }
    if (item === frontmatter.value.title && index !== newsList.value.length - 1) {
      next.value = newsTitle.value[index + 1];
      nextLint.value = newsLint.value[index + 1];
    }
  });
};

const route = useRoute();

watch(
  () => route.path,
  () => {
    getNewsData();
  }
);

onMounted(() => {
  getNewsData();
});
</script>

<template>
  <div class="bread">
    <BreadCrumbs :bread1="newsInfo.name" :bread2="frontmatter.title" :link1="newsInfo.link" />
  </div>
  <div class="markdown">
    <div class="news-markdown-detail">
      <AppMdHead :frontmatter="frontmatter" />
      <Content />
    </div>
    <hr />
    <div class="news-markdown-detail">
      <a v-if="prev !== ''" class="skip" :href="`/${prevLint}`">
        <span>{{ userCaseData.PREV }}</span>
        <p>{{ prev }}</p>
      </a>
      <a v-if="next !== ''" class="skip" :href="`/${nextLint}`">
        <span>{{ userCaseData.NEXT }}</span>
        <p>{{ next }}</p>
      </a>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.markdown {
  margin-bottom: var(--e-spacing-h1);
  @media (max-width: 1100px) {
    margin-bottom: var(--e-spacing-h2);
  }
}
.news-markdown-detail {
  margin: 0 auto;
}
.bread {
  padding: 40px 44px 0 44px;
  max-width: 1504px;
  margin: 0 auto;
  @media (max-width: 1439px) {
    padding-left: 24px;
    padding-right: 24px;
  }
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    padding-top: 16px;
  }
}
.skip {
  margin-top: var(--e-spacing-h5);
  cursor: pointer;
  text-decoration: none;
  display: block;
  span {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
    color: var(--e-color-text1);
    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  p {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    color: var(--e-color-text1);
    margin: 0;
    display: inline-block;

    @media (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  p:hover {
    @media (min-width: 1100px) {
      color: var(--e-color-link2);
    }
  }
}
</style>
<style lang="scss">
.markdown .version-box img {
  @media screen and (max-width: 767px) {
    width: 33% !important;
  }
}
</style>
