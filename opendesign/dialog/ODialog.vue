<script setup lang="ts">
import { useAttrs } from 'vue';

const attrs = useAttrs();
</script>

<template>
  <ElDialog class="o-dialog" v-bind="attrs">
    <slot></slot>
  </ElDialog>
</template>

<style lang="scss">
.o-dialog {
  --e-dialog-font-color: var(--e-color-text1);
  --e-dialog-bg-color: var(--e-color-fill2);
  --e-dialog-division-color: var(--e-color-division1);

  &.el-dialog {
    color: var(--e-dialog-font-color);
    border-radius: 0;
    background-color: var(--e-dialog-bg-color);
    transition: none;
    border: none;
    @media screen and (max-width: 768px) {
      width: 90%;
    }
    .el-dialog__title {
      color: var(--e-color-text1);
    }
  }
}
</style>
