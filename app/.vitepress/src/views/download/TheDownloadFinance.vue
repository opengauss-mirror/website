<script lang="ts" setup>
import DownloadFinanceData from '@/data/download/download-finance';

import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import DownloadTable from './DownloadTable.vue';

import Banner from '@/assets/category/download/download-finance.png';

const BANNER_TITLE = '金融版本软件包';
const TITLE = 'openGauss Finance 5.0.1 (LTS)';
</script>

<template>
  <ClientOnly>
    <BannerLevel2 :background-image="Banner" :title="BANNER_TITLE" />
    <AppContent>
      <div class="download-finance">
        <h2 class="download-finance-title">{{ TITLE }}</h2>
        <div class="download-finance-content">
          <DownloadTable v-for="item in DownloadFinanceData.zh" :key="item.name" :table-data="item" />
        </div>
      </div>
    </AppContent>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.download-finance {
  background-color: var(--e-color-bg2);
  padding: var(--e-spacing-h2) var(--e-spacing-h1);
  box-shadow: var(--e-shadow-l2);
  @media (max-width: 1100px) {
    padding: var(--e-spacing-h4) var(--e-spacing-h8);
  }
  .download-finance-title {
    text-align: center;
    font-size: var(--e-font-size-h3);
    line-height: var(--e-line-height-h3);
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
    }
  }
  .download-finance-content {
    margin-top: var(--e-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h4);
    }
  }
}
</style>
