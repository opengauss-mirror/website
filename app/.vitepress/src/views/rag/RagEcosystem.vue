<script setup lang="ts">
import { storeToRefs } from 'pinia';
import RagEcoGrid from './RagEcoGrid.vue';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';
import * as ragData from '@/data/rag/index.js';

const { theme } = storeToRefs(useCommon());

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
        已支持
      </span>
      <span class="legend-item">
        <span class="legend-dot" :style="{ 'background-color': nonActiveColor }"></span>
        待支持
      </span>
    </div>

    <div class="eco-table">
      <!-- 应用 -->
      <div class="eco-row">
        <div class="eco-category">应用</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[2, 4]" :data="ragData.applications" />
        </div>
      </div>

      <!-- 中间分栏：左侧4行 + 右侧编排框架 -->
      <div class="eco-row" style="flex-direction: column;">
        <div class="eco-row--inner">
          <div class="eco-category">评估</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="ragData.evaluation" />
          </div>
        </div>
        <div class="eco-row--inner">
          <div class="eco-category">维测工具</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="ragData.monitoring" />
          </div>
        </div>
        <div class="eco-row--inner">
          <div class="eco-category">知识工程</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="ragData.knowledge" />
          </div>
        </div>
        <div class="eco-row--inner eco-row--no-border">
          <div class="eco-category">数据源</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="ragData.dataSources" />
          </div>
        </div>
      </div>
      <div class="eco-row">
        <div class="eco-category">编排框架</div>
        <div class="eco-items">
          <RagEcoGrid style="height: 100%" :layout="[3, 3]" :data="ragData.orchestration" />
        </div>
      </div>

      <!-- LLMs -->
      <div class="eco-row">
        <div class="eco-category">LLMs</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[2, 3]" :data="ragData.llms" />
        </div>
      </div>

      <!-- 计算架构 -->
      <div class="eco-row">
        <div class="eco-category">计算架构</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="ragData.computingArch" />
        </div>
      </div>

      <!-- 云原生底座 -->
      <div class="eco-row">
        <div class="eco-category">云原生底座</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="ragData.cloudNative" />
        </div>
      </div>

      <!-- 操作系统 -->
      <div class="eco-row">
        <div class="eco-category">操作系统</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="ragData.os" />
        </div>
      </div>

      <!-- 硬件 -->
      <div class="eco-row eco-row--no-border">
        <div class="eco-category">硬件</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="ragData.hardware" />
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
  white-space: nowrap;
  flex-shrink: 0;
  @include h3;

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
