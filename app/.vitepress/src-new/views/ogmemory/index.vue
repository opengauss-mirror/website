<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import bannerImg from '~@/assets/category/ogmemory/banner.png';
import interceptIcon from '~icons/ogmemory/six-intercept';
import contextLifecycleIcon from '~icons/ogmemory/context-lifecycle';
import contextTypeIcon from '~icons/ogmemory/context-type';
import { OButton, ODivider, OIcon, OIconChevronRight, OLink } from '@opensig/opendesign';

const designs = [
  {
    title: '上下文有生命周期',
    desc: '上下文会经历抽取、结构化、存储、索引、召回、压缩和归档的完整生命周期。',
    icon: contextLifecycleIcon,
  },
  {
    title: '六个拦截点',
    desc: 'oGMemory在消息到达、推理准备、工具调用、轮次结束、压缩管理和会话关闭这六个边界处理上下文。',
    icon: interceptIcon,
  },
  {
    title: '上下文类型不平等',
    desc: '上下文语义不同，写入策略各异，比如用户画像可变，事件追加，偏好、实体、模式按主题归并',
    icon: contextTypeIcon,
  },
];
</script>

<template>
  <BannerLevel2
    title="oGMemory 专区"
    subtitle="面向AI Agent的长期记忆系统，以AGFS文件为数据源头，openGauss向量索引为加速层，让Agent拥有跨会话的持久记忆能力。"
    :background-image="bannerImg"
    class="ogmemory-banner"
  />

  <AppSection title="快速上手">
    <div class="quickstart-grid">
      <div class="quickstart-item">
        <div class="quickstart-header">
          <h3 class="quickstart-title">安装配置</h3>
          <OButton color="primary" round="pill" variant="outline" href="https://docs.opengauss.org/zh/docs/latest/datavec/ogmem_install.html" target="_blank"
            >查看文档</OButton
          >
        </div>
        <div class="quickstart-body">
          <div class="code-example">
            <code>
              cd oGMemory<br />
              pip install -e .<br />
              ogmem onboard
            </code>
          </div>
        </div>
      </div>
      <div class="quickstart-item">
        <div class="quickstart-header">
          <h3 class="quickstart-title">架构</h3>
          <OButton
            color="primary"
            round="pill"
            variant="outline"
            href="https://docs.opengauss.org/zh/docs/latest/datavec/ogmem_architecture.html"
            target="_blank"
            >查看文档</OButton
          >
        </div>
        <div class="quickstart-body">
          <code>
            Agent + oGMemory<br />
            -> compose 读取上下文<br />
            &ensp;&ensp;-> after_turn 写入记忆<br />
            &ensp;&ensp;-> compact / dispose 压缩归档<br />
            &ensp;&ensp;-> ContextFs + Vector Index 支撑长期召回<br />
          </code>
        </div>
      </div>
      <div class="quickstart-item">
        <div class="quickstart-header">
          <h3 class="quickstart-title">最佳实践</h3>
          <OButton
            color="primary"
            round="pill"
            variant="outline"
            href="https://docs.opengauss.org/zh/docs/latest/datavec/ogmem_api.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E6%8E%A5%E5%8F%A3"
            target="_blank"
            >查看文档</OButton
          >
        </div>
        <div class="quickstart-body">
          <p class="best-practice-title">生命周期、记忆检索、会话、观测、管理接口统一通过HTTP API暴露</p>
          <div class="list-container">
            <div class="list-item">
              <span>POST /api/v1/compose</span>
              <span>读取并组装上下文</span>
            </div>
            <div class="list-item">
              <span>POST /api/v1/after_turn</span>
              <span>写入轮次记忆</span>
            </div>
            <div class="list-item">
              <span>POST /api/v1/search_memory</span>
              <span>搜索长期记忆</span>
            </div>
            <div class="list-item">
              <span>POST /api/v1/compact</span>
              <span>压缩并归档会话</span>
            </div>
            <div class="list-item">
              <span>POST /api/v1/health</span>
              <span>健康检查</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppSection>

  <AppSection
    title="设计哲学"
    footer="查看完整文档"
    footer-href="https://docs.opengauss.org/zh/docs/latest/datavec/ogmem_introduction.html#%E8%AE%BE%E8%AE%A1%E5%93%B2%E5%AD%A6"
  >
    <div class="design-content">
      <div class="design-content-main">
        <template v-for="(item, index) in designs" :key="item.title">
          <div class="design-content-main-item">
            <OIcon class="design-item-icon"><component :is="item.icon" /></OIcon>
            <p class="design-item-title">{{ item.title }}</p>
            <p class="design-item-desc">{{ item.desc }}</p>
          </div>
          <ODivider style="height: unset; align-self: stretch" v-if="index < designs.length - 1" direction="v" />
        </template>
      </div>
    </div>
  </AppSection>

  <AppSection title="典型案例">
    <div class="typical-case">
      <p class="typical-case-title">让学习助手真正记住你：OpenClaw与OGMemory的长期陪伴是学习案例</p>
      <p class="typical-case-desc">查看OpenClaw 与 OGMemory 的长期陪伴式学习案例</p>
      <OLink class="typical-case-link" href="https://docs.opengauss.org/zh/docs/latest/datavec/ogmem_case01.html" target="_blank">
        查看案例
        <template #suffix>
          <OIcon><OIconChevronRight /> </OIcon>
        </template>
      </OLink>
    </div>
  </AppSection>

  <AppSection title="常见问题">
    <div class="ogmemory-faq list-container">
      <div class="list-item">
        <p class="faq-question">1、支持哪些Agent框架？</p>
        <p class="faq-answer">原生支持OpenClaw 即插即用集成，同时提供标准HTTP API，可对接任意Agent系统</p>
      </div>
      <div class="list-item">
        <p class="faq-question">2、记忆是怎么写入的？</p>
        <p class="faq-answer">每轮对话结束后，LLM自动从对话中抽取结构化记忆候选，经过置信度过滤和去重后，按策略写入AGFS文件，并异步建立向量索引。</p>
      </div>
      <div class="list-item">
        <p class="faq-question">3、检索是怎么工作的？</p>
        <p class="faq-answer">
          查询到达后，系统先再向量索引中混合召回 L0/L1/L2 三层命中，再通过层级展开将所有结果递归到 L2 完整内容，最终注入 System Prompt 供 Agent 使用。
        </p>
      </div>
      <div class="list-item">
        <p class="faq-question">4、数据安全吗？</p>
        <p class="faq-answer">所有记忆以文件形式持久化在 AGFS 上，向量索引仅为派生加速层。索引损坏不影响数据，可随时全量重建。</p>
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.ogmemory-banner {
  @include respond-to('<=pad_v') {
    background-color: transparent;
    padding-top: 16px;
    :deep(.banner-bg) {
      display: none;
    }

    :deep(.wrap .banner-text) {
      max-width: 100%;
    }
  }
}

.code-example {
  padding: 12px 16px;
  background-color: rgba(var(--o-trafficpurple-1), 0.4);
  color: var(--o-color-info1);
}

:root.dark .code-example {
  background-color: rgba(var(--o-grey-5), 0.4);
}

.quickstart-grid {
  display: flex;
  flex-direction: row;
  align-items: stretch;
  gap: 16px;

  @include respond-to('<=pad_v') {
    flex-direction: column;
  }
}

.quickstart-item {
  flex: 1;
  border-radius: 4px;
  background: var(--o-color-fill2);
  display: flex;
  flex-direction: column;
  background-repeat: no-repeat;
  background-position: right bottom;
  background-size: cover;
  &:nth-child(1) {
    background-image: url('/category/ogmemory-png/quickstart1-light.png');
  }
  &:nth-child(2) {
    background-image: url('/category/ogmemory-png/quickstart2-light.png');
  }
  &:nth-child(3) {
    background-image: url('/category/ogmemory-png/quickstart3-light.png');
  }
  @include respond-to('<=pad_v') {
    background-image: none !important;
  }
}

:root.dark .quickstart-item {
  &:nth-child(1) {
    background-image: url('/category/ogmemory-png/quickstart1-dark.png');
  }
  &:nth-child(2) {
    background-image: url('/category/ogmemory-png/quickstart2-dark.png');
  }
  &:nth-child(3) {
    background-image: url('/category/ogmemory-png/quickstart3-dark.png');
  }
  @include respond-to('<=pad_v') {
    background-image: none !important;
  }
}

.quickstart-header {
  padding: 24px;
  @include respond-to('phone') {
    padding: 12px;
  }
  border-bottom: 1px solid var(--o-color-control4);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.quickstart-title {
  margin: 0;
  @include h3;
  font-weight: 600;
}

.quickstart-body {
  padding: 24px;
  @include respond-to('phone') {
    padding: 12px;
  }
  color: var(--o-color-info2);
  line-height: 1.6;
  code {
    font-family:
      'SF Mono',
      ui-monospace,
      SFMono-Regular,
      Menlo,
      Consolas,
      Liberation Mono,
      monospace;
  }
  p {
    margin: 0;
  }
  .best-practice-title {
    margin-bottom: 24px;
    @include respond-to('phone') {
      margin-bottom: 12px;
    }
  }
  .list-item {
    @include respond-to('pad_h') {
      flex-direction: column;
      span:last-child {
        margin-top: 8px;
      }
    }
  }
  @include text1;
  @include respond-to('>laptop') {
    font-size: 14px;
  }
}

.list-container {
  .list-item {
    display: flex;
    justify-content: space-between;
    padding: 12px 0;
    &:not(:last-child) {
      border-bottom: 1px solid var(--o-color-control4);
    }

    @include respond-to('phone') {
      padding: 8px 0;
    }

    &:first-child {
      padding-top: 0;
    }

    &:last-child {
      padding-bottom: 0;
    }
  }
}

.design-content {
  border: 2px solid var(--e-color-bg2);
  border-radius: 4px;
  box-sizing: border-box;
  backdrop-filter: blur(32px);
  background: linear-gradient(180deg, rgb(255, 255, 255, 0.45) 0%, rgb(254.74, 254.83, 255, 0.9) 100%);
  padding: 32px;
  @include respond-to('laptop') {
    padding: 24px;
  }
  @include respond-to('pad_h') {
    padding: 16px;
  }
  @include respond-to('pad_v') {
    padding: 16px 8px;
  }
  @include respond-to('phone') {
    padding: 16px 8px 12px;
  }
}

:root.dark .design-content {
  background: linear-gradient(180deg, rgb(36, 36, 39, 0.45) 0%, rgb(36, 36, 39, 0.9) 100%);
}

.design-content-main {
  display: flex;
  flex-wrap: nowrap;
  align-items: start;
  width: 100%;
  min-width: 0;

  .o-divider {
    height: 100%;
    flex-shrink: 0;
  }
}

.design-content-main-item {
  flex: 1 1 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  color: var(--o-color-info1);

  .design-item-icon {
    font-size: 40px;
    @include respond-to('laptop') {
      font-size: 32px;
    }
    @include respond-to('pad_h') {
      font-size: 32px;
    }
    @include respond-to('<=pad_v') {
      font-size: 24px;
    }
    color: inherit;
  }

  .design-item-title {
    font-weight: 600;
    align-self: stretch;
    text-align: center;
    word-break: break-word;
    margin-top: 16px;
    @include h4;
    @include respond-to('phone') {
      margin-top: 4px;
      @include text1;
    }
  }

  .design-item-desc {
    text-align: center;
    color: var(--o-color-info3);
    margin-top: 8px;
    @include text1;
    @include respond-to('<=pad_v') {
      display: none;
    }
  }
}

.typical-case {
  border-radius: 4px;
  padding: 32px 32px 24px 32px;
  background-image: url('/category/ogmemory-png/case-bg-light.png');
  background-position: bottom right;
  background-size: cover;
  @include respond-to('phone') {
    padding: 12px;
    background-image: url('/category/ogmemory-png/case-bg-light-phone.png');
  }

  @include hover {
    box-shadow: var(--o-shadow-2);
  }

  .typical-case-title {
    font-weight: 600;
    @include h3;
    margin-bottom: 12px;
    @include respond-to('phone') {
      margin-bottom: 8px;
    }
  }

  .typical-case-desc {
    color: var(--o-color-info3);
    @include text1;
  }

  .typical-case-link {
    width: max-content;
    @include text1;
    display: flex;
    align-items: center;
    margin-top: 24px;
    @include respond-to('phone') {
      margin-top: 16px;
    }
    .o-icon {
      font-size: 24px;
    }
  }
}

:root.dark .typical-case {
  background-image: url('/category/ogmemory-png/case-bg-dark.png');
  @include respond-to('phone') {
    background-image: url('/category/ogmemory-png/case-bg-dark-phone.png');
  }
}

.ogmemory-faq {
  padding: 16px 32px;
  background-color: var(--o-color-fill2);
  border-radius: 4px;

  @include respond-to('phone') {
    padding: 12px;
  }

  .list-item {
    display: block;
    padding: 16px 0;
    @include respond-to('phone') {
      padding: 8px 0;
    }
  }

  .faq-question {
    font-weight: 600;
    @include text1;
    margin-bottom: 12px;
    @include respond-to('phone') {
      margin-bottom: 8px;
    }
  }
  .faq-answer {
    @include text1;
    color: var(--o-color-info3);
  }
}
</style>
