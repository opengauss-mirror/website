<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElInput class="o-input" v-bind="attrs"></ElInput>
</template>

<style lang="scss">
.o-input {
  --e-input-height: 36px;
  --e-input-border-color: var(--e-color-border1);
  --e-input-font-color: var(--e-color-text1);
  --e-input-font-size: var(--e-font-size-text);
  --e-input-line-height: var(--e-line-height-text);
  --e-input-color-bg: var(--e-color-bg2);
  --e-input-brand: var(--e-color-brand1);
  --e-input-disabled-color: var(--e-color-bg3);
  --e-input-disabled-border-color: var(--e-color-black);
  &.el-input {
    font-size: var(--e-input-font-size);
    line-height: var(--e-input-font-size);

    .el-input__wrapper {
      border-radius: 0;
      padding: 1px 15px;
      background-color: var(--e-input-color-bg);
      box-shadow: 0 0 0 1px var(--e-input-border-color) inset;

      .el-input__inner {
        height: var(--e-input-height);
        line-height: var(--e-input-font-size);
        color: var(--e-input-font-color);
      }
      &.is-focus {
        box-shadow: 0 0 0 1px var(--e-input-brand) inset;
      }
    }
  }
  &.el-textarea {
    .el-textarea__inner {
      box-shadow: 0 0 0 1px var(--e-input-border-color) inset;
      border-radius: 0;
      background-color: var(--e-input-color-bg);
      color: var(--e-input-font-color);
    }
  }
  &.is-disabled {
    .el-input__wrapper {
      box-shadow: 0 0 0 1px var(--e-input-disabled-border-color) inset;
      background: var(--e-input-disabled-color);

      .el-input__inner {
        color: var(--e-input-font-color);
        -webkit-text-fill-color: var(--e-input-font-color);
      }
    }
  }
}
</style>
