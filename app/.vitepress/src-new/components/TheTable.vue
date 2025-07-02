<script setup lang="ts">
defineProps<{
  data: any[];
  columns?: { key: string; label: string; width?: number | string }[];
}>();
</script>

<template>
  <el-table v-bind="$attrs" :data="data">
    <slot>
      <el-table-column v-for="col in columns" :prop="col.key" :label="col.label" :key="col.key">
        <template #default="{ row, column }">
          <slot :row="row" :name="`td_${column.property}`"></slot>
        </template>
      </el-table-column>
    </slot>
  </el-table>
</template>

<style lang="scss" scoped>
.el-table {
  --el-table-header-bg-color: var(--o-color-control3-light);
  --el-table-header-text-color: var(--o-color-info1);
  --el-table-text-color: var(--o-color-info1);
  --el-table-row-hover-bg-color: var(--o-color-control2-light);
  :deep(.el-table__header-wrapper) {
    border-radius: 4px 4px 0 0;
  }
  :deep(th) {
    font-weight: normal;
  }

  :deep(.el-table__cell) {
    .cell {
      @include text1;
    }
    &:nth-of-type(1) {
      .cell {
        padding-left: 40px;
      }
    }
    padding: 12px 0;
  }
}
</style>
