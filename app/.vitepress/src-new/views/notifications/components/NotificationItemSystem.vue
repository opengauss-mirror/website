<script lang="ts" setup>
import { OIcon } from '@opensig/opendesign';

import IconSystemMessage from '~icons/app/icon-system-message.svg';
import IconMeetingMessage from '~icons/app/icon-meeting-message.svg';

defineProps({
  // 消息类型
  type: {
    type: String,
    default: '',
  },
  // 消息标题
  title: {
    type: String,
    default: '',
  },
  // 消息内容
  summary: {
    type: String,
    default: '',
  },
  // 是否已读
  isRead: {
    type: Boolean,
    default: false,
  },
});

interface IconT {
  [key: string]: string;
}

const iconList = {
  publish: IconSystemMessage,
  meeting: IconMeetingMessage,
} as IconT;
</script>

<template>
  <div class="item-wrapper">
    <div class="item-title">
      <OIcon>
        <component :is="iconList[type]" />
        <div v-if="!isRead" class="red-point"></div>
      </OIcon>
      <div v-dompurify-html="title" class="title"></div>
    </div>
    <div v-dompurify-html="summary" class="item-content" :class="`type-${type}`"></div>
  </div>
</template>

<style scoped lang="scss">
.item-wrapper {
  cursor: pointer;

  padding: 8px 0;
}

.item-title {
  display: flex;
  align-items: center;
  margin-bottom: var(--o-gap-2);
  font-weight: 500;
  color: var(--o-color-info1);
  @include text1;

  .o-icon {
    position: relative;
    margin-right: var(--o-gap-2);
    @include h2;

    .red-point {
      position: absolute;
      top: -2px;
      right: -2px;
      width: 4px;
      height: 4px;
      border-radius: 50%;
      background-color: var(--o-color-danger1);
    }
  }
  .title {
    display: flex;
    align-items: center;
    :deep(span) {
      &:nth-child(2) {
        width: 40px;
        text-align: center;
        height: 20px !important;
        line-height: 20px !important;
        color: var(--o-color-primary1);
        background-color: rgba(var(--o-trafficpurple-6), 0.1);
        margin-left: var(--o-gap-2);
        border-radius: var(--o-radius-xs);
        @include tip1;
      }
    }
  }
}

.item-content {
  @include tip1;
  color: var(--o-color-info2);

  :deep(a) {
    color: var(--o-color-ubmc);
  }
}
:deep(.type-meeting) {
  span + span {
    margin-left: var(--o-gap-section-4);
  }
}
</style>
