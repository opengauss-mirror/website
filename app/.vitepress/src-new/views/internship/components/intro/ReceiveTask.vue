<script setup lang="ts">
import { OIcon, OButton, OLink } from '@opensig/opendesign';
import IconOutlink from '~icons/app-new/icon-out-link.svg';
import IconDownload from '~icons/app/icon-download.svg';
import { downloadByUrl, internshipTaskLinks } from '../internshipTask';
import { internshipTaskEmailTemplate } from '../types';
import { useScreen } from '~@/composables/useScreen';
import { useI18n } from '~@/i18n';
const i18n = useI18n();
const { lePadV } = useScreen();
</script>

<template>
  <div class="receive-task-container" :class="{ 'mobile-receive-task': lePadV }">
    <h2 class="receive-task-title">{{ i18n.internship.receiveTaskTitle1 }}</h2>
    <ol>
      <li class="receive-steps">
        <span>01、</span>
        在AtomGit查看任务，找到你想做的任务issue。
      </li>
      <li class="receive-steps">
        <span>02、</span>
        <span
          >在任务issue下方评论区输入
          <code class="code">/intern-assign</code>命令，认领该任务，然后发送邮件给任务导师请求审核。邮件需包括你的简历和该任务的开发方案。</span
        >
      </li>
      <li class="receive-steps">
        <OButton
          variant="outline"
          size="small"
          class="icon-download"
          color="primary"
          @click="downloadByUrl(internshipTaskEmailTemplate.file, internshipTaskEmailTemplate.filename)"
          target="_blank"
          :icon="IconDownload"
        >
          {{ i18n.internship.internshipTaskEmailTemplate }}
        </OButton>
      </li>
      <li class="receive-steps">
        <span>03、</span>
        <span
          >导师收到邮件后对申请人进行评审，在该任务issue评论下通过输入命令反馈结果，<code class="code">/intern-approve</code
          >代表审核通过，学生成功领取任务，可以开始进行任务处理；<code class="code">/intern-unapprove</code>代表领取失败，该学生可再去领取其他任务。</span
        >
      </li>
      <li class="receive-steps">
        <span>04、</span>
        <span
          >如果领取后无法完成，可通过在issue下输入<code class="code">/intern-unassign</code>放弃任务。<strong
            >放弃超过3次，账号被限制一个月不能领取任务。</strong
          ></span
        >
      </li>
    </ol>
    <div class="attention">
      <span class="attention-text">{{ i18n.internship.attention }}</span>
      <div>
        <p>{{ i18n.internship.receiveTaskDesc6 }}</p>
        <div>
          <span>{{ i18n.internship.releaseTask1 }}</span>
          <code class="code">{{ i18n.internship.releaseTask2 }}</code>
          <span>{{ i18n.internship.releaseTask3 }}</span>
        </div>
      </div>
    </div>
    <h2 class="other-title">{{ i18n.internship.OtherInternship }}</h2>
    <div class="step">{{ i18n.internship.receiveTaskDesc8 }}</div>
    <div class="link-row" :class="{ 'mobile-link-row': lePadV }">
      <div class="link-group">
        <OLink class="contact" color="primary" :href="internshipTaskLinks.mindsporeLink" target="_blank">
          <template #suffix><OIcon><IconOutlink /></OIcon></template>
          {{ i18n.internship.mindspore }}
        </OLink>
      </div>
      <div class="link-group">
        <OLink class="contact" color="primary" :href="internshipTaskLinks.openeulerLink" target="_blank">
          <template #suffix><OIcon><IconOutlink /></OIcon></template>
          {{ i18n.internship.openeuler }}
        </OLink>
      </div>
      <div class="link-group">
        <OLink class="contact" color="primary" :href="internshipTaskLinks.openubmcLink" target="_blank">
          <template #suffix><OIcon><IconOutlink /></OIcon></template>
          {{ i18n.internship.openubmc }}
        </OLink>
      </div>
      <div class="link-group">
        <OLink class="contact" color="primary" :href="internshipTaskLinks.vllmAscendLink" target="_blank">
          <template #suffix><OIcon><IconOutlink /></OIcon></template>
          {{ i18n.internship.vLLM }}
        </OLink>
      </div>
    </div>
    <div class="attention" :class="{ 'mobile-attention': lePadV }">
      <span class="attention-text">{{ i18n.internship.attention }}</span>
      <span>{{ i18n.internship.receiveTaskDesc9 }}</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.receive-task-container,
.other-internship-container {
  background-color: var(--content-bg);
  padding: var(--content-padding);
  border-radius: 4px;
  color: var(--o-color-info2);
  @include text1;
  @include respond-to('<=pad_v') {
    font-size: 14px;
    line-height: 22px;
  }
}

.code {
  display: inline-block;
  height: fit-content;
  padding-left: 4px;
  padding-right: 4px;
  border: 1px solid var(--o-color-control1-light);
  border-radius: 4px;
  background-color: rgb(var(--o-mixedgray-5), 0.4);
  color: var(--o-color-info1);
  margin-left: 4px;
  margin-right: 4px;
  white-space: nowrap;
  line-height: 1.2em !important;
  @include tip1;
  @include respond-to('<=pad_v') {
    font-size: 14px;
    line-height: 22px;
  }
}

.single-line {
  padding-left: 30px;
}

.other-internship-container {
  margin-top: 24px;
}

.receive-task-title {
  @include h3;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--o-color-info1);
}

.receive-steps {
  display: flex;

  &:not(:first-child) {
    margin-top: 8px;
  }

  .o-btn.o-btn-outline:not(.ghost-btn):not(.o-btn-disabled):hover {
    background-color: transparent;
    color: var(--o-color-primary2);
    --btn-bd-color-hover: var(--o-color-primary2);
  }

  .icon-download {
    font-size: 14px;
    :deep(.o-btn-prefix) {
      width: 16px;
      height: 16px;
    }
  }
  @include respond-to('<=pad_v') {
    display: list-item;
  }
}

.step {
  margin-bottom: 8px;

  .limit {
    font-weight: 600;
    color: var(--o-color-info1);
  }

  &:last-child {
    margin-bottom: 16px;
  }
}

.download-file {
  margin-top: 8px;
  margin-bottom: 8px;
}

.attention {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 16px;

  .attention-text {
    font-weight: 600;
    margin-right: 8px;
    white-space: nowrap;
    color: var(--o-color-info1);
  }
}

.other-title {
  @include h3;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--o-color-info1);
  margin-top: 24px;

  @include respond-to('phone') {
    margin-top: 12px;
    margin-bottom: 8px;
  }
}

.link-row {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 16px;

  .link-group {
    display: flex;
    align-items: center;
    margin-right: 24px;

    .contact {
      // color: var(--o-color-primary1);
      cursor: pointer;
    }

    // .jump-out-icon {
    //   --icon-size: 16px;
    //   color: var(--o-color-primary1);
    //   transition: color 0.2s;
    // }

    // &:hover .contact,
    // &:hover .jump-out-icon {
    //   color: var(--o-color-primary2);
    // }
  }
}

.icon-download {
  font-size: 14px;
}

.mobile-link-row {
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 0;

  .link-group {
    width: 100%;
    padding-left: 12px;
    padding-right: 12px;
    margin-bottom: 18px;
  }
}

.mobile-attention {
  margin-top: 0;
}

.mobile-receive-task {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

.mobile-other-internship {
  padding: 0;
  background-color: transparent;
  border-radius: 0;
}

</style>
