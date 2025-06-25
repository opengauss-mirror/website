<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElDatePicker class="o-date-picker" v-bind="attrs" />
</template>

<style lang="scss">
.o-date-picker {
  --e-date-picker-height: 38px;
  --e-date-picker-border-color: var(--e-color-border1);
  --e-date-picker-font-color: var(--e-color-text1);
  --e-date-picker-font-size: var(--e-font-size-text);
  --e-date-picker-line-height: var(--e-line-height-text);
  --e-date-picker-color-bg: var(--e-color-bg2);
  --e-date-picker-brand: var(--e-color-brand1);
  &.el-input {
    font-size: var(--e-date-picker-font-size);
    line-height: var(--e-date-picker-font-size);
    height: var(--e-date-picker-height);
    .el-input__wrapper {
      border-radius: 0;
      padding: 1px 15px;
      background-color: var(--e-date-picker-color-bg);
      box-shadow: 0 0 0 1px var(--e-date-picker-border-color) inset;

      .el-input__inner {
        height: var(--e-date-picker-height);
        line-height: var(--e-date-picker-font-size);
        color: var(--e-date-picker-font-color);
      }
      &.is-focus {
        box-shadow: 0 0 0 1px var(--e-date-picker-brand) inset;
      }
    }
  }
}
</style>
