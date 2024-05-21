<script setup lang="ts">
import { useData } from 'vitepress';
import BreadCrumbs from '@/components/BreadCrumbs.vue';

const { frontmatter } = useData();

console.log(frontmatter);

const migrationInfo = {
  link: `/zh/migration/`,
  name: '迁移专区',
};
</script>

<template>
  <div class="bread">
    <BreadCrumbs
      :bread1="migrationInfo.name"
      :bread2="frontmatter.title"
      :link1="migrationInfo.link"
    />
  </div>

  <div class="markdown">
    <Content />
  </div>
</template>

<style lang="scss" scoped>
.markdown {
  margin-bottom: var(--o-spacing-h1);
  @media (max-width: 1100px) {
    margin-bottom: var(--o-spacing-h2);
  }

  :deep(h1) {
    margin-top: 0;
  }
}

.bread {
  max-width: 1504px;
  padding: 40px 44px 0 44px;
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
</style>
