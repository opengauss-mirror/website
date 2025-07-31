<script setup lang="ts">
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import ContentWrapper from '~@/components/ContentWrapper.vue';

import BannerImg from '~@/assets/category/download/tools-center-banner.png';
import TheToolSet from './TheToolSet.vue';
import TheSupportTools from './TheSupportTools.vue';
import SupportServices from './SupportServices.vue';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import { useData } from 'vitepress';
import { watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';

const { gtPadV } = useScreen();

const { lang } = useData();
const { locale } = useI18n();

watchEffect(() => locale.value = lang.value ?? 'zh');
</script>

<template>
  <BannerLevel2 v-if="gtPadV" :background-image="BannerImg" :title="$t('tools.TOOL_CENTER')" :subtitle="$t('tools.DESC')" />
  <ContentWrapper v-else style="padding-top: 16px;">
    <div class="phone-banner">
      <p class="title">{{ $t('tools.TOOL_CENTER') }}</p>
      <p class="desc">{{ $t('tools.DESC') }}</p>
    </div>
  </ContentWrapper>

  <ContentWrapper :vertical-padding="['32px', '32px']">
    <TheToolSet />
    <TheSupportTools />
    <AppSection :title="$t('tools.SUPPORT_SERVICES')">
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
