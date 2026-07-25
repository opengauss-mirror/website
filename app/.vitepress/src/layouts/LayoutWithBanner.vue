<script setup lang="ts">
import { useData } from 'vitepress';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import { useCommon } from '@/stores/common';

const { frontmatter } = useData();

const commonStore = useCommon();
</script>

<template>
  <BannerLevel2
    :title="frontmatter.bannerTitle || frontmatter.title"
    :subtitle="frontmatter.subTitle || frontmatter.description"
    :background-image="commonStore.theme === 'dark' && frontmatter.bannerImgDark ? frontmatter.bannerImgDark : frontmatter.bannerImg"
  ></BannerLevel2>
  <Content />
</template>

<style lang="scss" scoped>
.banner-level2 {
  @include respond-to('<=pad_v') {
    background-color: transparent !important;
    padding-top: 16px;
    :deep(.banner-bg) {
      display: none;
    }

    :deep(.wrap .banner-text) {
      max-width: 100%;
    }
  }
}
</style>
