<script setup lang="ts">
import { storeToRefs } from 'pinia';
import ComponentsGrid from '../components/ComponentsGrid.vue';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';
import ragContent from '#content/ai/rag';
import { useData } from 'vitepress';

const { theme } = storeToRefs(useCommon());
const { lang } = useData();
const isZh = computed(() => lang.value === 'zh');

const ecosystem = computed(() => (isZh.value ? ragContent.zh : ragContent.en).software_ecosystem);
const categories = computed(() => ecosystem.value.categories);

const activeColor = computed(() => {
  if (theme.value === 'dark') {
    return 'rgba(255, 255, 255, 0.1)';
  }
  return 'rgba(125, 50, 234, 0.08)';
});

const nonActiveColor = computed(() => {
  if (theme.value === 'dark') {
    return 'rgb(var(--o-grey-5))';
  }
  return 'rgb(var(--o-grey-2))';
});
</script>

<template>
  <div class="rag-ecosystem">
    <div class="legend">
      <span class="legend-item">
        <span class="legend-dot" :style="{ 'background-color': activeColor }"></span>
        {{ ecosystem.legend_supported }}
      </span>
      <span class="legend-item">
        <span class="legend-dot" :style="{ 'background-color': nonActiveColor }"></span>
        {{ ecosystem.legend_coming_soon }}
      </span>
    </div>

    <div class="eco-table">
      <!-- 应用 -->
      <div class="eco-row">
        <div class="eco-category">{{ categories.applications.name }}</div>
        <div class="eco-items">
          <ComponentsGrid :cols="4" :data="categories.applications.items" />
        </div>
      </div>

      <!-- 中间分栏：左侧4行 + 右侧编排框架 -->
      <div class="eco-row" style="flex-direction: column;">
        <div class="eco-row--inner">
          <div class="eco-category">{{ categories.evaluation.name }}</div>
          <div class="eco-items">
            <ComponentsGrid :data="categories.evaluation.items" />
          </div>
        </div>
        <div class="eco-row--inner">
          <div class="eco-category">{{ categories.om_tools.name }}</div>
          <div class="eco-items">
            <ComponentsGrid :data="categories.om_tools.items" />
          </div>
        </div>
        <div class="eco-row--inner">
          <div class="eco-category">{{ categories.knowledge_engineering.name }}</div>
          <div class="eco-items">
            <ComponentsGrid :data="categories.knowledge_engineering.items" />
          </div>
        </div>
        <div class="eco-row--inner eco-row--no-border">
          <div class="eco-category">{{ categories.data_sources.name }}</div>
          <div class="eco-items">
            <ComponentsGrid :data="categories.data_sources.items" />
          </div>
        </div>
      </div>
      <div class="eco-row">
        <div class="eco-category">{{ categories.orchestration_frameworks.name }}</div>
        <div class="eco-items">
          <ComponentsGrid style="height: 100%" :cols="3" :data="categories.orchestration_frameworks.items" />
        </div>
      </div>

      <!-- LLMs -->
      <div class="eco-row">
        <div class="eco-category">{{ categories.llms.name }}</div>
        <div class="eco-items">
          <ComponentsGrid :cols="3" :data="categories.llms.items" />
        </div>
      </div>

      <!-- 计算架构 -->
      <div class="eco-row">
        <div class="eco-category">{{ categories.compute_architecture.name }}</div>
        <div class="eco-items">
            <ComponentsGrid :data="categories.compute_architecture.items" />
        </div>
      </div>

      <!-- 云原生底座 -->
      <div class="eco-row">
        <div class="eco-category">{{ categories.cloud_native.name }}</div>
        <div class="eco-items">
            <ComponentsGrid :data="categories.cloud_native.items" />
        </div>
      </div>

      <!-- 操作系统 -->
      <div class="eco-row">
        <div class="eco-category">{{ categories.os.name }}</div>
        <div class="eco-items">
            <ComponentsGrid :data="categories.os.items" />
        </div>
      </div>

      <!-- 硬件 -->
      <div class="eco-row eco-row--no-border">
        <div class="eco-category">{{ categories.hardware.name }}</div>
        <div class="eco-items">
            <ComponentsGrid :data="categories.hardware.items" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.rag-ecosystem {
  background: var(--o-color-fill2);
  border-radius: 4px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;

  @include respond-to('laptop') {
    padding: 16px;
  }
  @include respond-to('pad') {
    padding: 12px;
  }
  @include respond-to('phone') {
    padding: 12px;
  }
}

// Legend
.legend {
  display: flex;
  align-items: center;
  gap: 16px;
}

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

// Table
.eco-table {
  border-radius: 4px;
  overflow: hidden;
}

.eco-row {
  display: flex;
  align-items: stretch;
  border: 1px solid var(--o-color-control1);
  border-radius: 4px;
  padding: 12px 16px;

  &:not(:first-child) {
    margin-top: 16px;
  }
  @include respond-to('<=laptop') {
    padding: 8px;
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
}

.eco-row--inner {
  display: flex;
  border: none;
  &.eco-row--no-border {
    border-bottom: none;
  }
  &:not(:first-child) {
    margin-top: 12px;
  }
  @include respond-to('<=laptop') {
    &:not(:first-child) {
      margin-top: 8px;
    }
  }
}

.eco-category {
  display: flex;
  align-items: center;
  min-width: 88px;
  width: 120px;
  box-sizing: content-box;
  font-size: 16px;
  font-weight: 600;
  color: var(--o-color-info1);
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
}

.eco-items {
  padding-left: 16px;
  flex: 1;
  flex-wrap: wrap;
}

// Item chips
.eco-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  min-width: 0;
  padding: 8px 16px;
  background: var(--o-color-fill2);
  border-radius: 4px;
  font-size: 14px;
  color: var(--o-color-info1);
  text-decoration: none;
  white-space: nowrap;

  &--link {
    cursor: pointer;

    @include hover {
      color: var(--o-color-brand1);
      background: rgba(var(--o-color-brand1-rgb, 125, 50, 234), 0.08);
    }
  }

  // Fill the row equally (for rows with fewer items)
  &--fill {
    min-height: 52px;
  }
}

.eco-arrow {
  margin-left: 4px;
  font-size: 15px;
  line-height: 1;
}

// Middle split section
.eco-split-left {
  flex: 565;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid var(--o-color-control1);
}

.eco-split-right {
  margin-left: 16px;
  flex: 435;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  border: 1px solid var(--o-color-control1);
}

// 编排框架
.eco-framework {
  display: flex;
  flex: 1;
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
}

.eco-framework-title {
  font-size: 18px;
  font-weight: 600;
  color: var(--o-color-info1);
  text-align: center;
  padding-bottom: 12px;
  margin-bottom: 12px;
}

.eco-framework-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  flex: 1;

  .eco-item {
    flex: unset;
    height: 48px;
  }
}
</style>
