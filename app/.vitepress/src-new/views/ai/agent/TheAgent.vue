<script setup lang="ts">
import { computed } from 'vue';
import { storeToRefs } from 'pinia';
import { OCard } from '@opensig/opendesign';
import aiCommonContent from '#content/ai/common';
import agentContent from '#content/ai/agent';
import BannerTabHeader from '~@/components/BannerTabHeader.vue';
import AppSection from '~@/components/AppSection.vue';
import { useCommon } from '@/stores/common';
import ComponentsGrid from '../components/ComponentsGrid.vue';
import { useI18n } from '~@/i18n/index.js';
import { useData } from 'vitepress';

const { lang } = useData();
const isZh = computed(() => lang.value === 'zh');
const { isDark } = storeToRefs(useCommon());
const i18n = useI18n();

const aiCommonData = computed(() => (isZh.value ? aiCommonContent.zh : aiCommonContent.en));
const agentData = computed(() => (isZh.value ? agentContent.zh : agentContent.en));

const bannerData = computed(() => ({ subtitle: i18n.value.ai.description, img: isDark.value ? '/category/ai/banner-dark.png' : '/category/ai/banner.png' }));

const activeColor = computed(() => {
  if (isDark.value) {
    return 'rgba(255, 255, 255, 0.1)';
  }
  return 'rgba(125, 50, 234, 0.16)';
});

const nonActiveColor = computed(() => {
  if (isDark.value) {
    return 'rgb(var(--o-grey-5))';
  }
  return 'rgb(var(--o-grey-2))';
});

const categoryLayouts: Record<string, number> = {
  dev_orchestration_frameworks: 3,
};

const categoryLayout = (id: string): number | undefined => categoryLayouts[id];
</script>

<template>
  <BannerTabHeader :banner-data="bannerData" :tabs-data="aiCommonData.tabs"></BannerTabHeader>

  <AppSection :title="agentData.ecosystem_map.title">
    <OCard>
      <div class="legend">
        <span class="legend-item">
          <span class="legend-dot" :style="{ 'background-color': activeColor }"></span>
          {{ agentData.ecosystem_map.legend_supported }}
        </span>
        <span class="legend-item">
          <span class="legend-dot" :style="{ 'background-color': nonActiveColor }"></span>
          {{ agentData.ecosystem_map.legend_coming_soon }}
        </span>
      </div>
      <section v-for="item in agentData.ecosystem_map.categories" :key="item.id" class="graph-section">
        <header class="section-category">{{ item.name }}</header>
        <ComponentsGrid v-if="item.items" :cols="categoryLayout(item.id)" :data="item.items!"></ComponentsGrid>
        <div v-else-if="item.children" style="width: 100%">
          <div v-for="child in item.children" :key="child.id" class="child-items">
            <p class="child-item-title">{{ child.name }}</p>
            <ComponentsGrid :data="child.items!"></ComponentsGrid>
          </div>
        </div>
      </section>
    </OCard>
  </AppSection>
</template>

<style lang="scss" scoped>
.legend {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: var(--o-r-gap-5);
  
  .legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 14px;
    color: var(--o-color-info1);
  }
  
  .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
}

.graph-section {
  display: flex;
  align-items: center;
  border: 1px solid var(--o-color-control1);
  padding: var(--o-r-gap-5) var(--o-r-gap-3);
  border-radius: 4px;
  & + .graph-section {
    margin-top: var(--o-r-gap-4);
  }

  @include respond-to('phone') {
    flex-direction: column;
    align-items: center;
  }
}
.child-items {
  background-color: rgba(var(--o-grey-14), 0.02);
  padding: var(--o-r-gap-3);
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  .child-item-title {
    font-size: var(--o-r-font_size-text1);
    line-height: var(--o-r-line_height-text1);
    margin-bottom: var(--o-r-gap-3);
    font-weight: 600;
  }
  & + .child-items {
    margin-top: var(--o-r-gap-3);
  }
}
.section-category {
  display: flex;
  align-items: center;
  min-width: 88px;
  width: 120px;
  font-weight: 600;
  // font-size: var(--o-r-font_size-h4);
  // line-height: var(--o-r-line_height-h4);
  font-size: var(--o-r-font_size-text1);
  color: var(--o-color-info1);
  margin-right: var(--o-r-gap-4);
  flex-shrink: 0;

  @include respond-to('laptop') {
    width: 80px;
  }
  @include respond-to('pad_h') {
    width: 60px;
  }
  @include respond-to('pad_v') {
    width: 40px;
  }
  @include respond-to('phone') {
    min-width: unset;
    width: auto;
    margin-bottom: var(--o-r-gap-4);
  }
}
</style>
