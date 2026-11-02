<script setup lang="ts">
import { onMounted, ref, computed, watch, reactive } from 'vue';
import { useData, useRoute } from 'vitepress';
import { storeToRefs } from 'pinia';
import { useI18n } from '@/i18n';
import { useI18n as useI18nNew } from '~@/i18n';
import { useCommon } from '@/stores/common';
import { OArticle } from '@opendesign-plus/components';
import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';

import blogsAllData from '@/data/blogs';

import headerBgLight from '@/assets/category/news/light.png';
import headerBgDark from '@/assets/category/news/dark.png';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const i18nNew = useI18nNew();
const { theme } = storeToRefs(useCommon());
const headerBg = computed(() => (theme.value === 'dark' ? headerBgDark : headerBgLight));
const blogsList = computed(() => {
  return lang.value === 'zh' ? blogsAllData.zh : blogsAllData.en;
});
const blogInfo = reactive({
  link: `/${lang.value}/blogs/`,
  name: i18n.value.common.COMMON_CONFIG.BLOG,
});

const blogTitle = ref<any>([]);
const blogLint = ref<any>([]);
const prev = ref('');
const prevLint = ref('');
const nextLint = ref('');
const next = ref('');
const getBlogsData = () => {
  blogsList.value.forEach((item: any) => {
    blogTitle.value.push(item.title);
    blogLint.value.push(item.path);
  });
  blogTitle.value.forEach((item: any, index: number) => {
    if (item === frontmatter.value.title && index !== 0) {
      prev.value = blogTitle.value[index - 1];
      prevLint.value = blogLint.value[index - 1];
    }
    if (item === frontmatter.value.title && index !== blogsList.value.length - 1) {
      next.value = blogTitle.value[index + 1];
      nextLint.value = blogLint.value[index + 1];
    }
  });
};

const prevItem = computed(() => {
  return prev.value ? { title: prev.value, url: `/${prevLint.value}` } : null;
});
const nextItem = computed(() => {
  return next.value ? { title: next.value, url: `/${nextLint.value}` } : null;
});

const route = useRoute();

watch(
  () => route.path,
  () => {
    getBlogsData();
  }
);

onMounted(() => {
  if (new URLSearchParams(location.search).get('from') === 'sig') {
    blogInfo.link = `/${lang.value}/sig/sig-list`;
    blogInfo.name = i18nNew.value.sig.sigCenter;
  }
  getBlogsData();
});
</script>

<template>
  <div class="layout-blog">
    <div class="bread">
      <OBreadcrumb>
        <OBreadcrumbItem :href="blogInfo.link">{{ blogInfo.name }}</OBreadcrumbItem>
        <OBreadcrumbItem>{{ frontmatter.title }}</OBreadcrumbItem>
      </OBreadcrumb>
    </div>
    <div class="blog-detail">
      <OArticle
        community="openGauss"
        :title="frontmatter.title"
        :tags="frontmatter.tags?.filter?.((item: string) => item?.toLowerCase() !== 'opengauss')"
        :header-bg="headerBg"
        :update-time="frontmatter.date"
        :prev="prevItem"
        :next="nextItem"
      >
        <Content />
      </OArticle>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '@opensig/opendesign/es/_styles/mixin.scss' as opendesign;

.layout-blog {
  margin: 0 auto;
  max-width: 1488px;
  padding-top: 32px;
  padding-bottom: 72px;

  @include opendesign.respond('<=laptop') {
    max-width: min(1245px, calc(100% - 64px * 2));
    padding-top: 24px;
    padding-bottom: 56px;
  }

  @include opendesign.respond('<=pad') {
    max-width: 100%;
    padding-top: 16px;
    padding-bottom: 40px;
    padding-left: 32px;
    padding-right: 32px;
  }

  @include opendesign.respond('<=pad_v') {
    padding-bottom: 32px;
  }

  @include opendesign.respond('phone') {
    padding-left: 24px;
    padding-right: 24px;
  }

  .bread {
    padding-bottom: 16px;

    @include opendesign.respond('<=pad') {
      padding-bottom: 12px;
    }

    @include opendesign.respond('<=pad_v') {
      display: none;
    }
  }
}
</style>
