<script setup lang="ts">
import { OCard, OIcon, OLink } from '@opensig/opendesign';
import { GITCODE_LINK } from '~@/data/url-config';
import IconOutlink from '~icons/app-new/icon-out-link.svg';

const internshipTasks = [
  {
    title: 'openGauss 工具链',
    link: `${GITCODE_LINK}/opengauss/opensource-intership/issues/101`,
    desc: '修复和补齐 Datakit API 自动化测试框架',
  },
  {
    title: 'openGauss AI 生态组件',
    link: `${GITCODE_LINK}/opengauss/opensource-intership/issues/103`,
    desc: '对接主流 AI 框架和记忆系统',
  },
  {
    title: 'openGauss 性能测试工具',
    link: `${GITCODE_LINK}/opengauss/opensource-intership/issues/102`,
    desc: '在基准测试框架中新增向量索引测试',
  },
  {
    title: 'openGauss 应用适配',
    link: `${GITCODE_LINK}/opengauss/opensource-intership/issues/104`,
    desc: '适配 MySQL 原生语法和生态，覆盖五大语言主流框架，系统性提升兼容能力',
  },
  {
    title: 'openGauss MySQL兼容性提升',
    link: `${GITCODE_LINK}/opengauss/opensource-intership/issues/100`,
    desc: '适配 MySQL 原生语法',
  },
  {
    title: 'oGRAC 易用性',
    link: `${GITCODE_LINK}/opengauss/opensource-intership/issues/99`,
    desc: '扩充监控指标并补充参数文档',
  },
];
</script>

<template>
  <div class="internship-tasks">
    <OCard class="internship-task-item" v-for="item in internshipTasks" :key="item.title" :title="item.title" hoverable>
      <p class="internship-task-item-desc">{{ item.desc }}</p>
      <OLink variant="text" color="primary" :href="item.link" target="_blank" rel="noopener noreferrer">
        <template #suffix
          ><OIcon><IconOutlink /></OIcon
        ></template>
        查看实习任务
      </OLink>
    </OCard>
  </div>
</template>

<style lang="scss" scoped>
.internship-tasks {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  --card-padding: 24px 32px;
  
  @include respond-to('laptop') {
    --card-padding: 16px 24px;
  }

  @include respond-to('pad_h') {
    gap: 16px;
    --card-padding: 12px 16px;
  }

  @include respond-to('<=pad_v') {
    gap: 12px;
    --card-padding: 12px 12px;
    grid-template-columns: 1fr;
  }
}

:deep(.o-card-title) {
  font-weight: 600;
}

.internship-task-item {
  --card-main-padding: var(--card-padding);
  --link-margin-top: 24px;

  .o-link {
    margin-top: var(--link-margin-top);
    display: inline-flex;
    align-items: center;
    @include text1;

    @include respond-to('phone') {
      font-size: 14px;
      line-height: 22px;
    }
  }

  @include respond-to('laptop') {
    --link-margin-top: 20px;
  }

  @include respond-to('<=pad') {
    --link-margin-top: 16px;
  }

  .o-icon {
    svg {
      fill: currentColor;
    }
  }
}

.internship-task-item-title {
  font-weight: 600;
  @include h3;
}

.internship-task-item-desc {
  margin-top: 8px;
  color: var(--o-color-control2);
  @include text1;
  @include respond-to('phone') {
    font-size: 14px;
    line-height: 22px;
  }
}
</style>
