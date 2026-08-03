<script setup lang="ts">
import { storeToRefs } from 'pinia';
import RagEcoGrid from './RagEcoGrid.vue';
import { useCommon } from '@/stores/common';
import { computed } from 'vue';

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

interface EcoItem {
  name: string;
  link?: string;
  active?: boolean;
}

const applications: EcoItem[] = [
  { name: '智能问答服务', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_eulercopilot.html' },
  { name: '智能助手平台', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_dify.html' },
  { name: '私人知识库', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/datavec_qwen3.html' },
  { name: '搜索问答', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_ragflow.html' },
  { name: '图检索增强生成', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_agegraph.html' },
  { name: '代码生成器' },
  { name: '智慧公文助手' },
  { name: '会议纪要助手' },
];

const evaluation: EcoItem[] = [{ name: 'Arize Pheonix' }, { name: 'DeepEval' }, { name: 'ollama qwen3 reranker' }];

const monitoring: EcoItem[] = [{ name: 'Grafana' }, { name: 'Prometheus' }, { name: 'Jaeger' }];

const knowledge: EcoItem[] = [{ name: 'WhyHow' }, { name: 'MindsDB', active: true, link: 'https://docs.mindsdb.com/integrations/data-integrations/opengauss' }];

const dataSources: EcoItem[] = [{ name: 'Airbyte' }, { name: 'Kafka' }, { name: 'Apify' }, { name: 'Docling' }, { name: 'Unstructred' }];

const orchestration: EcoItem[] = [
  { name: 'LangChain', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_agegraph.html' },
  { name: 'LlamaIndex', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/llama_index.html' },
  { name: 'HayStack' },
  { name: 'AnythingLLM', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/anythingllm.html' },
  { name: 'SpringBoot', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_springboot.html' },
  { name: 'Dify', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/dify.html#%E4%BD%BF%E7%94%A8opengauss%E9%83%A8%E7%BD%B2dify' },
  { name: 'RAGFlow', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_ragflow.html' },
  { name: 'MCP', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/mcp.html' },
  { name: 'FastGPT' },
];

const llms: EcoItem[] = [
  { name: 'Sentence Transformer', link: 'https://docs.opengauss.org/zh/docs/latest/datavec/sentence_transformer.html', active: true },
  { name: 'BGE M3', link: 'https://docs.opengauss.org/zh/docs/latest/datavec/embedding_bgem3.html', active: true },
  { name: 'nomic-embed-text', link: 'https://docs.opengauss.org/zh/docs/latest/datavec/embedding_nomic.html', active: true },
  { name: 'Ollama', link: 'https://docs.opengauss.org/zh/docs/latest/datavec/datavec_qwen3.html', active: true },
  { name: 'vLLM', active: true, link: 'https://docs.opengauss.org/zh/docs/latest/datavec/inference_acceleration.html' },
  { name: 'SGLang' },
];

const computingArch: EcoItem[] = [{ name: 'CUDA', active: true }, { name: 'CANN', active: true }];

const cloudNative: EcoItem[] = [
  { name: 'Docker', link: 'https://docs.opengauss.org/zh/docs/latest/installation_guide/installing_the_container_image.html', active: true },
  { name: 'K8s', active: true, link: 'https://opengauss.org/zh/blogs/buter/k8Sinit_guide.html' },
];

const os: EcoItem[] = [{ name: 'openEuler', link: 'https://docs.opengauss.org/zh/docs/latest/datavec/opengauss_eulercopilot.html', active: true }];

const hardware: EcoItem[] = [
  { name: 'CPU', active: true },
  { name: 'GPU/NPU', active: true },
];
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
          <RagEcoGrid :layout="[2, 4]" :data="applications" />
        </div>
      </div>

      <!-- 中间分栏：左侧4行 + 右侧编排框架 -->
      <div class="eco-row" style="flex-direction: column;">
        <div class="eco-row--inner">
          <div class="eco-category">评估</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="evaluation" />
          </div>
        </div>
        <div class="eco-row--inner">
          <div class="eco-category">维测工具</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="monitoring" />
          </div>
        </div>
        <div class="eco-row--inner">
          <div class="eco-category">知识工程</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="knowledge" />
          </div>
        </div>
        <div class="eco-row--inner eco-row--no-border">
          <div class="eco-category">数据源</div>
          <div class="eco-items">
            <RagEcoGrid :layout="[1]" :data="dataSources" />
          </div>
        </div>
      </div>
      <div class="eco-row">
        <div class="eco-category">编排框架</div>
        <div class="eco-items">
          <RagEcoGrid style="height: 100%" :layout="[3, 3]" :data="orchestration" />
        </div>
      </div>

      <!-- LLMs -->
      <div class="eco-row">
        <div class="eco-category">LLMs</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[2, 3]" :data="llms" />
        </div>
      </div>

      <!-- 计算架构 -->
      <div class="eco-row">
        <div class="eco-category">计算架构</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="computingArch" />
        </div>
      </div>

      <!-- 云原生底座 -->
      <div class="eco-row">
        <div class="eco-category">云原生底座</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="cloudNative" />
        </div>
      </div>

      <!-- 操作系统 -->
      <div class="eco-row">
        <div class="eco-category">操作系统</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="os" />
        </div>
      </div>

      <!-- 硬件 -->
      <div class="eco-row eco-row--no-border">
        <div class="eco-category">硬件</div>
        <div class="eco-items">
          <RagEcoGrid :layout="[1]" :data="hardware" />
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
