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

  <div class="markdown migration-markdown">
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

@include in-dark {
  .migration-markdown {
    --migration-case-table-border-color: var(--o-color-table);
    --migration-case-thead-color: var(--o-color-bg4);
  }
}

.migration-markdown {
  --migration-case-table-border-color: rgba(0, 0, 0, 0.1);
  --migration-case-thead-color: #e8eaed;
  margin-bottom: var(--o-spacing-h1);
  @media (max-width: 1100px) {
    margin-bottom: var(--o-spacing-h2);
  }

  :deep(.copy-icon) {
    cursor: pointer;
    z-index: 1;
    position: absolute;
    top: 12px;
    right: 12px;
    width: 24px;
    height: 24px;
  }
  
  :deep(.markdown-body-title) {
    border-bottom: none;
    padding-bottom: 0;
  }

  :deep(table) {
    font-size: 16px;
    color: var(--o-color-text1);
    line-height: 24px;
  }

  :deep(table th) {
    background: #e8eaed;
    color: var(--o-color-text1);
  }

  :deep(table td) {
    color: var(--o-color-text1);
  }

  :deep(table th:first-of-type) {
    width: 20%;
  }

  :deep(table th:nth-of-type(2)) {
    width: 15%;
  }

  :deep(table th:nth-of-type(3)) {
    width: 15%;
  }

  :deep(table th:nth-of-type(4)) {
    width: 50%;
  }

  @media screen and (max-width: 1100px) {
    :deep(table th:first-of-type) {
      width: 20%;
    }

    :deep(table th:nth-of-type(2)) {
      width: 25%;
    }

    :deep(table th:nth-of-type(3)) {
      width: 20%;
    }

    :deep(table th:nth-of-type(4)) {
      width: 35%;
    }

    :deep(table tr td) {
      padding: 0 var(--o-spacing-h8);
    }
  }

  :deep(table thead) {
    background: var(--migration-case-thead-color);
    border-radius: 4px;
    border: 1px solid var(--migration-case-thead-color);
  }

  :deep(table tr th) {
    background: var(--migration-case-thead-color);
  }

  :deep(table tr th:first-child) {
    border-radius: 4px 0 0 0;
  }

  :deep(table tr th:last-child) {
    border-radius: 0 4px 0 0;
  }

  :deep(tr td:first-child) {
    border-left: 1px solid var(--migration-case-table-border-color);
  }

  :deep(tr td:last-child) {
    border-right: 1px solid var(--migration-case-table-border-color);
  }

  :deep(h2) {
    margin-top: var(--o-spacing-h2);
    margin-bottom: var(--o-spacing-h3);
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h5);

    @media screen and (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
      margin-bottom: var(--o-spacing-h6);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }

  :deep(p) {
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h8);

    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  :deep(pre) {
    padding: 12px;
    font-family: PingFangSC-Regular;
    font-size: var(--o-font-size-h8);
    color: #202329;
    line-height: var(--o-line-height-h8);
    box-shadow: none;
    border-radius: 4px;

    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-text);
    }
  }
}
</style>
