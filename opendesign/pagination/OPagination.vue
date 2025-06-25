<script setup lang="ts">
import { useAttrs, computed } from 'vue';

const attrs = useAttrs();

const classNames = computed(() => {
  return `${attrs['poper-class']}` ? `${attrs['poper-class']} o-pagination-popper` : 'o-pagination-popper';
});
</script>

<template>
  <ElPagination class="o-pagination" v-bind="attrs" :popper-class="classNames">
    <slot></slot>
  </ElPagination>
</template>

<style lang="scss">
.o-pagination {
  --e-pagination-font-color: var(--e-color-text1);
  --e-pagination-font-color_active: var(--e-color-white);
  --e-pagination-bg-color: var(--e-color-text5);
  --e-pagination-bg-color_hover: var(--e-color-brand1);
  --e-pagination-bg-color_selected: var(--e-color-brand1);
  --e-pagination-number-border-color_active: var(--e-color-brand1);

  &.el-pagination {
    justify-content: center;
    @media screen and (max-width: 768px) {
      display: none;
    }
    .el-pagination__sizes {
      margin: 0 var(--e-spacing-h8) 0 0;
    }
    .el-input {
      --el-input-bg-color: var(--e-pagination-bg-color);
      --el-input-text-color: var(--e-pagination-font-color);
    }
    .el-input__wrapper {
      border-radius: 0px;
      box-shadow: none;
      height: 36px;
    }
    .el-pagination__editor {
      justify-content: center !important;
    }
    .el-select {
      --el-select-border-color-hover: none;
      --el-select-input-focus-border-color: none;
      & .el-input .el-select__caret {
        color: var(--e-pagination-font-color);
      }
    }
    .el-select-dropdown__wrap {
      background-color: #000 !important;
    }
    .el-pager li {
      color: var(--e-pagination-font-color);
      background: var(--e-pagination-bg-color);
      border-radius: 0px;
      line-height: 36px;
      height: 36px;
      width: 36px;
      &:hover {
        color: var(--e-pagination-font-color_active) !important;
        background-color: var(--e-pagination-bg-color_hover);
      }
    }
    .el-pager li.is-active.number {
      background: var(--e-pagination-bg-color_selected);
      font-weight: 300;
      font-size: var(--e-font-size-text);
    }
    .btn-next,
    .btn-prev {
      width: 36px;
      height: 36px;
      color: var(--e-pagination-font-color);
      border-radius: 0px;
      background: var(--e-pagination-bg-color);
    }
    .btn-prev:disabled {
      background: var(--e-color-text5);
    }
    .btn-next {
      margin-right: var(--e-spacing-h5) !important;
    }
    .btn-next:disabled {
      background: var(--e-color-text5);
    }

    .el-pagination__jump {
      height: 36px;
      font-size: var(--e-font-size-text);
      font-weight: 300;
      line-height: var(--e-line-height-text);
      color: var(--e-color-neutral8);
      border-radius: 0px;
      margin-left: var(--e-spacing-h4);
      .el-input__wrapper {
        flex-grow: 0.273;
      }
    }
  }
}
.o-pagination-popper {
  box-shadow: var(--e-shadow-l3);
  &.el-popper {
    box-shadow: none !important;
    --el-popper-border-radius: none;
    border: none;
    .el-popper__arrow {
      display: none;
    }

    .el-select-dropdown__item {
      color: var(--e-color-text1);

      &:hover {
        color: var(--e-color-brand1);
        background: var(--e-color-bg1);
      }
    }
    .hover {
      color: var(--e-color-brand1);
      background: var(--e-color-bg1);
    }

    .el-select-dropdown__item.selected {
      background-color: var(--e-color-bg1);
    }

    .el-select-dropdown__item.selected {
      font-weight: 300;
      color: var(--e-color-brand1);
    }

    .el-select-dropdown__wrap {
      background-color: var(--e-color-bg2);
    }
  }
}
</style>
