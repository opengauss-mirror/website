<script lang="ts" setup>
import { ref } from 'vue';

import IconDown from '~icons/app/icon-chevron-down.svg';

defineProps({
  label: {
    type: String,
    default: '',
  },
  show: {
    type: Boolean,
    default: false,
  },
});
const emits = defineEmits(['toggle-click']);
const isDown = ref(false);
const toggle = () => {
  isDown.value = !isDown.value;
  emits('toggle-click', isDown.value);
};
</script>

<template>
  <div class="tag-filter">
    <span class="label">{{ label }}</span>
    <div class="tag-filter-box" :class="{ max: isDown }">
      <slot />
    </div>
    <div v-if="show" class="more" :class="{ active: isDown }">
      <OIcon class="icon" @click="toggle">
        <IconDown />
      </OIcon>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.tag-filter {
  display: grid;
  background: var(--o-color-bg2);
  padding: var(--o-spacing-h5) 0;
  grid-template-columns: 60px auto 60px;
  gap: var(--o-spacing-h4);
  position: relative;
  align-items: baseline;
  .label {
    font-size: var(--o-font-size-text);
    color: var(--o-color-text4);
    width: 60px;
    text-align: left;
    line-height: var(--o-line-height-h6);
  }
  .more {
    position: absolute;
    top: var(--o-spacing-h6);
    right: var(--o-spacing-h4);
    transition: all 0.3s;
    .icon {
      font-size: var(--o-font-size-h5);
      cursor: pointer;
      color: var(--o-color-text1);
    }
    &.active {
      transform: rotate(-180deg);
    }
  }
  &-box {
    &.max {
      max-height: 90px;
      overflow: auto;
      &::-webkit-scrollbar-track {
        border-radius: 4px;
        background-color: #fff;
      }

      &::-webkit-scrollbar {
        width: 6px;
        background-color: #fff;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 4px;
        background: #ccc;
      }
    }
  }
}
</style>
