<script setup lang="ts">
import { useData } from 'vitepress';
import { useI18n } from '@/i18n';
import AppMdHead from './AppMdHead.vue';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { frontmatter, lang } = useData();
const i18n = useI18n();
const pageInfo = {
  link: `/${lang.value}/events/`,
  name: i18n.value.common.COMMON_CONFIG.EVENTS,
};
</script>

<template>
  <div class="bread">
    <BreadCrumbs
      :bread1="pageInfo.name"
      :bread2="frontmatter.title"
      :link1="pageInfo.link"
    />
  </div>
  <div class="markdown">
    <AppMdHead :frontmatter="frontmatter" />
    <Content />
  </div>
</template>

<style lang="scss" scoped>
.markdown {
  margin-bottom: var(--o-spacing-h1);
  @media (max-width: 1100px) {
    margin-bottom: var(--o-spacing-h2);
  }
}

.bread {
  max-width: 1504px;
  margin: 0 auto;
  padding-top: 40px;
  padding-left: 44px;
  padding-right: 44px;
  @media (max-width: 1439px) {
    padding-right: 24px;
    padding-left: 24px;
  }
  @media (max-width: 1100px) {
    padding-left: 16px;
    padding-right: 16px;
  }
  @media (max-width: 768px) {
    padding-top: 16px;
  }
}
:deep(.award-box) {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
</style>
