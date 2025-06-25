<script setup lang="ts">
import { ref } from 'vue';
import { OIcon, useMessage } from '@opensig/opendesign';
import IconCopy from '~icons/app/icon-copy.svg';
const domRef = ref();
const message = useMessage();
const copy = () => {
  navigator.clipboard.writeText(domRef.value?.innerText);
  message.success({ content: '复制成功' });
};
</script>

<template>
  <div class="code-block-wrapper">
    <div class="copy-btn">
      <OIcon @click="copy">
        <IconCopy></IconCopy>
      </OIcon>
    </div>
    <div ref="domRef">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.code-block-wrapper {
  margin: var(--o-gap-2) 0;
  padding: 12px 16px;
  background-color: var(--o-color-fill3);
  border-radius: 8px;
  position: relative;
  .copy-btn {
    position: absolute;
    z-index: 2;
    top: var(--o-gap-1);
    right: var(--o-gap-3);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
    width: 24px;
    background-color: var(--o-color-fill3);
    border-radius: 4px;
    opacity: 0;
    transition: opacity var(--o-duration-s) var(--o-easing-standard);
    .o-icon {
      font-size: 20px;
      cursor: pointer;
      @include hover {
        color: var(--o-color-ubmc-hover);
      }
      @include respond-to('<=pad_v') {
        opacity: 1;
      }
    }
  }
  &:hover {
    .copy-btn {
      opacity: 1;
    }
  }
}
:deep(.code-block-wrapper) {
  code {
    padding-top: 0;
  }
}
.markdown .code-block-wrapper {
  padding: 24px 0 0;
}
</style>
