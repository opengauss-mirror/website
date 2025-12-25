<script setup lang="ts">
import { OIcon, ODropdown, ODropdownItem, OScroller } from '@opensig/opendesign';
import { ref, watch } from 'vue';

import IconFilter from '~icons/app-new/icon-filter.svg';

const props = defineProps<{
  modelValue: string | number;
  options: { value: string | number; label: string }[];
}>();

const emits = defineEmits(['update:modelValue', 'change']);
const checked = ref('');

watch(
  () => props.modelValue,
  (newValue) => {
    checked.value = newValue;
  },
  {
    immediate: true,
  }
);

const change = (val) => {
  if (val === props.modelValue) {
    val = ''
  }
  emits('update:modelValue', val);
  emits('change', val);
};
</script>

<template>
  <div class="th-filter-container">
    <div class="slot">
      <slot></slot>
    </div>
    <ODropdown v-if="options.length > 0" optionWrapClass="th-filter-dropdown" v-model="checked" placeholder="bottom">
      <OIcon class="filter-icon" :class="checked && 'has-checked'">
        <IconFilter></IconFilter>
      </OIcon>
      <template #dropdown>
        <OScroller disabled-x style="max-height: 300px" show-type="always">
          <ODropdownItem
            v-for="item in options"
            :class="[{ 'is-active': item.value === modelValue }]"
            :key="item.value"
            :label="item.label"
            @click="change(item.value)"
          />
        </OScroller>
      </template>
    </ODropdown>
  </div>
</template>

<style scoped lang="scss">
.o-dropdown {
  display: flex;
  align-items: center;
  margin-left: 8px;
  width: 16px;
  height: 22px;
}
.th-filter-container {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  .slot {
    font-weight: 500;
    color: var(--o-color-info1);
    font-size: 14px;
    line-height: 22px;
    word-break: keep-all;
  }
  .filter-icon {
    font-size: 16px;
    cursor: pointer;
    &.has-checked {
      color: var(--o-color-primary1);
      :deep(.o-icon) {
        path {
          fill: currentColor;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.o-popup .o-popup-body {
  border: none;
  border-radius: var(--o-radius_control-xs);
}
.th-filter-dropdown {
  .o-dropdown-item {
    padding-left: 16px;
    padding-right: 16px;
    border-radius: var(--o-radius_control-xs);
    &.is-active {
      background-color: var(--dropdown-item-bg-color-hover);
      color: var(--dropdown-item-color-hover);
    }
  }
}
</style>
