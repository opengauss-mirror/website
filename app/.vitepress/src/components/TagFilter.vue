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
  background: var(--e-color-bg2);
  padding: var(--e-spacing-h5) 0;
  grid-template-columns: 60px auto 60px;
  gap: var(--e-spacing-h4);
  position: relative;
  align-items: baseline;
  .label {
    font-size: var(--e-font-size-text);
    color: var(--e-color-text4);
    width: 60px;
    text-align: left;
    line-height: var(--e-line-height-h6);
  }
  .more {
    position: absolute;
    top: var(--e-spacing-h6);
    right: var(--e-spacing-h4);
    transition: all 0.3s;
    .icon {
      font-size: var(--e-font-size-h5);
      cursor: pointer;
      color: var(--e-color-text1);
    }
    &.active {
      transform: rotate(-180deg);
    }
  }
  &-box {
    &.max {
      max-height: 90px;
      overflow: auto;
      @include scrollbar;
    }
  }
}
</style>
