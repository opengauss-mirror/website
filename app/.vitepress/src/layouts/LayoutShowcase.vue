<script setup lang="ts">
import { useData } from 'vitepress';
// import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
// import BreadCrumbs from '@/components/BreadCrumbs.vue';

import banner from '@/assets/banner/banner-secondary.png';

const { frontmatter } = useData();
// const caseInfo = {
//   link: `/${lang.value}/userPractice/`,
//   name: '用户实践',
// };
</script>

<template>
  <div class="layout">
    <BannerLevel2
      :background-image="banner"
      :title="frontmatter.title"
      :subtitle="frontmatter.summary"
    />
    <!-- <div class="bread">
      <BreadCrumbs
        :bread1="caseInfo.name"
        :bread2="frontmatter.title"
        :link1="caseInfo.link"
      />
    </div> -->
    <Content class="markdown" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.case-img) {
  text-align: center;
  margin-top: var(--o-spacing-h4);
  img {
    @media screen and (max-width: 768px) {
      width: 100%;
    }
  }
}
.markdown {
  margin: var(--o-spacing-h2) auto var(--o-spacing-h1);
  @media (max-width: 768px) {
    margin: var(--o-spacing-h2) auto;
    box-shadow: none;
  }
  :deep(h2:nth-of-type(1)) {
    margin-top: 0;
  }
  :deep(.img-right) {
    display: flex;
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
    .case-right {
      width: 360px;
      align-items: flex-end;
      img {
        width: 100%;
      }
    }
  }
  :deep(.cloud-table) {
    tr {
      border: 1px solid var(--o-color-table);
      td:nth-of-type(1) {
        width: 20%;
        border-right: 1px solid var(--o-color-table);
      }
    }
  }
  :deep(.logo) {
    width: 100%;
    display: flex;
    justify-content: center;
    @media (max-width: 768px) {
      flex-wrap: wrap;
    }
    img {
      width: auto !important;
      height: 120px;
      background-color: #ffffff;
      &:nth-of-type(1) {
        padding-right: var(--o-spacing-h8);
      }
      &:nth-of-type(2) {
        position: relative;
        padding-left: var(--o-spacing-h8);
        border-left: 3px solid #1e1e1e;
        @media (max-width: 448px) {
          border-left: none;
        }
      }
      @media (max-width: 768px) {
        height: 60px;
      }
    }
  }
}
:deep(.banner-level2) {
  .wrap .banner-text {
    max-width: 100%;
  }
}
</style>
