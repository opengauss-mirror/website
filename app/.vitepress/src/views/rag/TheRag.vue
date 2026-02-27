<script setup lang="ts">
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import banner from '@/assets/category/rag/banner.png';
import rag from '@/assets/category/rag/rag-light.png';
import ragDark from '@/assets/category/rag/rag-dark.png';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import { useCommon } from '@/stores/common';
import { storeToRefs } from 'pinia';
import RagEcosystem from './RagEcosystem.vue';

const { gtPadV, lePadV } = useScreen();

const { theme } = storeToRefs(useCommon());
</script>

<template>
  <ClientOnly>
    <BannerLevel2 v-if="gtPadV" :background-image="banner" title="RAG专区" subtitle="了解openGauss在RAG场景的技术生态和适配情况" />
    <div v-else class="pad-banner">
      <p>RAG专区</p>
      <p class="pad-banner-subtitle">了解openGauss在RAG场景的技术生态和适配情况</p>
    </div>
  </ClientOnly>

  <AppSection title="RAG是什么">
    <div class="rag-introduce">
      检索增强生成（Retrieval-Augmented
      Generation，简称RAG），是一种将信息检索技术与大语言模型生成能力相结合的先进人工智能技术。它通过“先检索、再生成”的范式，显著提升了AI在问答、分析和创作任务中的准确性、时效性与可靠性。
    </div>
  </AppSection>
  
  <AppSection title="RAG软件生态">
    <ClientOnly>
      <template v-if="lePadV">
        <div class="rag-eco-phone">
          <img :src="theme === 'dark' ? ragDark : rag" alt="RAG软件生态" style="width: var(--grid-content-width);" />
          <p class="rag-eco-phone-tip">如需访问相关链接，请在PC端下查看</p>
        </div>
      </template>
      <RagEcosystem v-else />
    </ClientOnly>
  </AppSection>

  <AppSection title="RAG典型案例">
    <div class="rag-cases-wrapper">
      <a class="rag-case-item">
        <p class="rag-case-text">openGauss AGEGraph + 大模型实现GraphRAG，助力更强RAG</p>
      </a>
      <a class="rag-case-item">
        <p class="rag-case-text">从数据到智能：openGauss + openEuler Intelligence的RAG架构实战</p>
      </a>
      <a class="rag-case-item">
        <p class="rag-case-text">Spring Boot集成openGauss DataVec实现高效RAG知识问答</p>
      </a>
      <a class="rag-case-item">
        <p class="rag-case-text">基于Qwen3 + openGauss，部署个人专属RAG知识库系统</p>
      </a>
      <a class="rag-case-item">
        <p class="rag-case-text">打破AI黑盒，拥抱开源力量：基于openGauss + DeepSeek的本地知识库，打造你的专属AI助手</p>
      </a>
      <a class="rag-case-item">
        <p class="rag-case-text">openGauss DataVec + Dify，快速搭建你的智能助手平台</p>
      </a>
      <a class="rag-case-item">
        <p class="rag-case-text">openGauss + Ragflow 从部署到集成</p>
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
  display: flex; flex-direction: column; align-items: center;
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
