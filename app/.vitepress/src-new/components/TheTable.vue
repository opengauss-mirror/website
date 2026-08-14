<script setup lang="ts">
import { OCheckbox, OCheckboxGroup, OIconFilter, OPopover } from '@opensig/opendesign';
import { TableColumnCtx } from 'element-plus';
import OIcon from 'opendesign/icon/OIcon.vue';
import { watch } from 'vue';
import { computed, CSSProperties, effectScope, onUnmounted, ref, shallowRef } from 'vue';
import useCheckbox from '~@/composables/useCheckbox';

const props = withDefaults(
  defineProps<{
    data: any[];
    columns?: { key: string; label: string; minWidth?: string | number; width?: number | string; filter?: { checkboxOptions: { label: string; value: string }[] } }[];
    childrenType?: 'collapse' | 'span';
    cellStyle?: (<T>(data: { row: any; column: TableColumnCtx<T>; rowIndex: number; columnIndex: number }) => CSSProperties) | CSSProperties;
    headerCellStyle?: (<T>(data: { row: any; column: TableColumnCtx<T>; rowIndex: number; columnIndex: number }) => CSSProperties) | CSSProperties;
  }>(),
  {
    childrenType: 'collapse',
  }
);

const emit = defineEmits<{
  (e: 'filterChange', v: { prop: string; value: (string | number)[] }): void;
}>();

const checkboxOptions = shallowRef<Record<string, ReturnType<typeof useCheckbox>>>({});

let currentScope = effectScope();

watch(
  () => props.columns,
  (val) => {
    currentScope?.stop();
    currentScope = effectScope();
    currentScope.run(() => {
      checkboxOptions.value =
        val?.reduce(
          (acc, item) => {
            if (item.filter?.checkboxOptions) {
              acc[item.key] = useCheckbox(item.filter?.checkboxOptions);
              acc[item.key].checkAll.value = [1];
            }
            return acc;
          },
          {} as Record<string, ReturnType<typeof useCheckbox>>
        ) ?? {};
    });
  },
  { immediate: true }
);

onUnmounted(() => currentScope?.stop());

const _cellStyle = computed(() => {
  const cSty = props.cellStyle;
  return (prop: any) => {
    const defaultStyle = prop.columnIndex === 0 ? { 'padding-left': '28px' } : ({} as CSSProperties);
    const input = typeof cSty === 'function' ? cSty(prop) : cSty;
    return {
      ...defaultStyle,
      ...input,
    } as CSSProperties;
  };
});

const _headerCellStyle = computed(() => {
  const cSty = props.headerCellStyle;
  return (prop: any) => {
    const defaultStyle = prop.columnIndex === 0 ? { 'padding-left': '28px' } : ({} as CSSProperties);
    const input = typeof cSty === 'function' ? cSty(prop) : cSty;
    return {
      ...defaultStyle,
      ...input,
    } as CSSProperties;
  };
});

const tableRef = ref();
const tableData = computed(() => {
  if (props.childrenType === 'collapse') return props.data;
  return props.data.flatMap((item) => {
    if (Array.isArray(item.children)) {
      const childrenLen = item.children.length;
      return (item.children as any[]).map((child, index) => ({
        ...child,
        span: index === 0 ? [childrenLen, 1] : [0, 0],
      }));
    }
    return item;
  });
});

const tableSpan = ({ row, columnIndex }: { row: any; columnIndex: number }) => {
  if (columnIndex === 0) {
    return row.span ?? [1, 1];
  }
  return [1, 1];
};

const handleTableRef = (fn: (ref: any) => void) => {
  if (tableRef.value) fn(tableRef.value);
};

const onFilterChange = (prop: string) => {
  emit('filterChange', { prop, value: checkboxOptions.value[prop].checkboxValues.value });
};

defineExpose({
  handleTableRef,
});
</script>

<template>
  <el-table ref="tableRef" v-bind="$attrs" :cell-style="_cellStyle" :header-cell-style="_headerCellStyle" :data="tableData" :span-method="tableSpan">
    <slot>
      <el-table-column v-for="col in columns" :prop="col.key" :label="col.label" :key="col.key" :width="col.width ?? 'auto'" :min-width="col.minWidth ?? ''">
        <template #header="{ column }">
          <div style="display: flex; align-items: center">
            {{ column.label }}
            <o-popover v-if="col.filter?.checkboxOptions" trigger="click" position="bl" :anchor="false">
              <template #target>
                <o-icon class="header-filter-icon"><o-icon-filter /></o-icon>
              </template>

              <o-checkbox
                v-model="checkboxOptions[col.key].checkAll.value"
                :indeterminate="checkboxOptions[col.key].indeterminate.value"
                :value="1"
                @change="() => onFilterChange(col.key)"
                >全选</o-checkbox
              >
              <o-checkbox-group v-model="checkboxOptions[col.key].checkboxValues.value" direction="v" @change="() => onFilterChange(col.key)">
                <o-checkbox v-for="opt in col.filter.checkboxOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</o-checkbox>
              </o-checkbox-group>
            </o-popover>
          </div>
        </template>
        <template #default="{ row, column }">
          <slot :row="row" :name="`td_${column.property}`">
            {{ row[column.property] }}
          </slot>
        </template>
      </el-table-column>
    </slot>
  </el-table>
</template>

<style lang="scss" scoped>
.header-filter-icon {
  margin-left: 4px;
  cursor: pointer;

  &-active {
    color: var(--o-color-primary1);
  }
}

.o-checkbox-group {
  display: flex;
  align-items: start;
}

.o-checkbox {
  margin: 0 !important;
  padding: 0 12px !important;
  --checkbox-text-height: 30px !important;
}

.el-table {
  --el-table-header-bg-color: var(--o-color-control3-light);
  --el-table-header-text-color: var(--o-color-info1);
  --el-table-text-color: var(--o-color-info1);
  --el-table-row-hover-bg-color: var(--o-color-fill3);
  --el-table-tr-bg-color: transparent;
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
    padding: 12px 0;
  }
}
</style>
