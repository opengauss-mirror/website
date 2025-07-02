<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElTimeSelect class="o-time-select" v-bind="attrs" />
</template>

<style lang="scss">
.o-time-select {
  --e-time-select-height: 38px;
  --e-time-select-border-color: var(--e-color-border1);
  --e-time-select-font-color: var(--e-color-text1);
  --e-time-select-font-size: var(--e-font-size-text);
  --e-time-select-line-height: var(--e-line-height-text);
  --e-time-select-color-bg: var(--e-color-bg2);
  --e-time-select-brand: var(--e-color-brand1);
  .el-input {
    font-size: var(--e-time-select-font-size);
    line-height: var(--e-time-select-font-size);
    height: var(--e-time-select-height);
    .el-input__wrapper {
      border-radius: 0;
      padding: 1px 15px;
      background-color: var(--e-time-select-color-bg);
      box-shadow: 0 0 0 1px var(--e-time-select-border-color) inset;

      .el-input__inner {
        height: var(--e-time-select-height);
        line-height: var(--e-time-select-font-size);
        color: var(--e-time-select-font-color);
      }
      &.is-focus {
        box-shadow: 0 0 0 1px var(--e-time-select-brand) inset;
      }
    }
  }
}
</style>
