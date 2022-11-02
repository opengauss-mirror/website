<script setup lang="ts">
// import { useData } from 'vitepress';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import Banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/security.png';
// const { frontmatter } = useData();
const i18n = useI18n();
</script>

<template>
  <div class="layout">
    <BannerLevel2
      :background-image="Banner"
      :title="i18n.security.REPORTING"
      :illustration="illustration"
    />
    <Content class="markdown markdown-security" />
  </div>
</template>

<style lang="scss" scoped>
.layout {
  overflow: hidden;
}
.markdown-security {
  margin: var(--o-spacing-h1) auto;
  @media (max-width: 768px) {
    margin: var(--o-spacing-h2) auto;
    box-shadow: none;
  }
  :deep(tr) {
    @media (max-width: 768px) {
      height: 50px;
    }
  }
  :deep(th) {
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
    }
  }
  :deep(h2) {
    margin: var(--o-spacing-h2) 0 20px;
    &:nth-of-type(1) {
      margin-top: 0;
    }
  }
  :deep(h3) {
    margin: var(--o-spacing-h2) 0 20px;
  }
  :deep(h4) {
    margin: var(--o-spacing-h2) 0 20px;
  }
  :deep(.isH5) {
    display: none;
    @media (max-width: 1100px) {
      display: block;
      width: 100%;
    }
  }
  :deep(.isPc) {
    width: 100%;
    @media (max-width: 1100px) {
      display: none;
    }
  }
}
</style>
