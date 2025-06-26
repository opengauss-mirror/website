<script setup lang="ts">
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import BannerImg from '~@/assets/category/download/tools-center-banner.png';
import TheToolSet from './TheToolSet.vue';
import TheSupportTools from './TheSupportTools.vue';
import SupportServices from './SupportServices.vue';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';

const { gtPadV } = useScreen();
</script>

<template>
  <BannerLevel2 v-if="gtPadV" :background-image="BannerImg" title="工具中心" subtitle="主要面向开发者和ISV，提供六大类开发工具客户端工具、数据导入导出工具、数据复制/同步工具、监控运维接口及工具集、备份恢复接口及工具集、通用数据框架。" />
  <ContentWrapper v-else style="padding-top: 16px;">
    <div class="phone-banner">
      <p class="title">工具中心</p>
      <p class="desc">主要面向开发者和ISV，提供六大类开发工具客户端工具、数据导入导出工具、数据复制/同步工具、监控运维接口及工具集、备份恢复接口及工具集、通用数据框架</p>
    </div>
  </ContentWrapper>

  <ContentWrapper :vertical-padding="['32px', '32px']">
    <TheToolSet />
    <TheSupportTools />
    <AppSection title="支持与服务">
      <SupportServices />
    </AppSection>
  </ContentWrapper>
</template>

<style lang="scss" scoped>
.phone-banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  .title {
    @include h1;
    margin-bottom: 16px;
  }
  .desc {
    @include text1;
  }
}
.app-section {
  --layout-content-padding: 0;
}

section {
  display: flex;
  flex-direction: column;
  align-items: center;

  :deep(h2) {
    @include display3;
  };
}
</style>
