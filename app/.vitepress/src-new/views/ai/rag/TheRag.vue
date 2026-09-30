<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import { storeToRefs } from 'pinia';
import RagEcosystem from './RagEcosystem.vue';
import aiCommonContent from '#content/ai/common';
import ragContent from '#content/ai/rag';
import BannerTabHeader from '~@/components/BannerTabHeader.vue';
import { computed } from 'vue';
import { useI18n } from '~@/i18n/index.js';
import { useData } from 'vitepress';

const { isDark } = storeToRefs(useCommon());
const { lePadV } = useScreen();
const { lang } = useData();
const isZh = computed(() => lang.value === 'zh');
const i18n = useI18n();

const aiCommonData = computed(() => (isZh.value ? aiCommonContent.zh : aiCommonContent.en));
const ragData = computed(() => (isZh.value ? ragContent.zh : ragContent.en));

const bannerData = computed(() => ({ subtitle: i18n.value.ai.description, img: isDark.value ? '/category/ai/banner-dark.png' : '/category/ai/banner.png' }));
</script>

<template>
  <BannerTabHeader :banner-data="bannerData" :tabs-data="aiCommonData.tabs"></BannerTabHeader>

  <AppSection :title="ragData.what_is_rag.title">
    <div class="rag-introduce">
      {{ ragData.what_is_rag.description }}
    </div>
  </AppSection>

  <AppSection :title="ragData.software_ecosystem.title">
    <ClientOnly>
      <template v-if="lePadV">
        <div class="rag-eco-phone">
          <img :src="isDark ? ragData.software_ecosystem.image_dark : ragData.software_ecosystem.image_light" :alt="ragData.software_ecosystem.title" style="width: var(--o-r-grid-section-width)" />
          <p class="rag-eco-phone-tip">{{ ragData.software_ecosystem.pc_only_tip }}</p>
        </div>
      </template>
      <RagEcosystem v-else />
    </ClientOnly>
  </AppSection>

  <AppSection :title="ragData.use_cases.title">
    <div class="rag-cases-wrapper">
      <a v-for="rag in ragData.use_cases.cases" :key="rag.label" class="rag-case-item" :href="rag.href" target="_blank" rel="noopener noreferrer">
        {{ rag.label }}
      </a>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.pad-banner {
  width: var(--grid-content-width);
  margin: auto;
  padding-top: 16px;
  @include display2;
}

.pad-banner-subtitle {
  opacity: 0.8;
  margin-top: 16px;
  @include h4;
}

.rag-introduce {
  @include text2;
  width: var(--grid-content-width);
  background-color: var(--o-color-fill2);
  margin: auto;
  padding: 40px 32px;
  @include respond-to('laptop') {
    padding: 24px;
  }
  @include respond-to('pad_h') {
    padding: 16px;
  }
  @include respond-to('pad_v') {
    padding: 12px;
  }
  @include respond-to('phone') {
    padding: 12px;
  }
}

.rag-eco-phone {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.rag-eco-phone-tip {
  margin-top: 12px;
  font-size: 14px;
  opacity: 0.6;
}

.rag-cases-wrapper {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 32px;
  row-gap: 32px;
  @include respond-to('laptop') {
    column-gap: 24px;
    row-gap: 24px;
  }
  @include respond-to('pad_h') {
    column-gap: 16px;
    row-gap: 16px;
  }
  @include respond-to('pad_v') {
    column-gap: 28px;
    row-gap: 28px;
    grid-template-columns: repeat(2, 1fr);
  }
  @include respond-to('phone') {
    display: block;
  }
}

.rag-case-item {
  display: block;
  border-radius: 4px;
  background-color: var(--o-color-fill2);
  padding: 32px 24px;
  cursor: pointer;
  color: var(--o-color-info1);
  @include hover {
    box-shadow: var(--o-shadow-2);
    color: var(--e-color-link1);
  }
  @include respond-to('laptop') {
    padding: 16px 24px;
  }
  @include respond-to('pad_h') {
    padding: 12px 16px;
  }
  @include respond-to('pad_v') {
    padding: 12px;
  }
  @include respond-to('phone') {
    padding: 12px;
    margin-top: 28px;
  }
  &:first-child {
    margin-top: 0;
  }
}

.rag-case-text {
  @include h3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  font-weight: 600;
}
</style>
