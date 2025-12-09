<script setup lang="ts">
import { computed, onMounted, onUpdated, ref, withDefaults } from 'vue';
import { OPopover } from '@opensig/opendesign';

const contentRef = ref(null); // 内容节点

const ellipsis = ref(true); // 是否需要省略号

const props = withDefaults(defineProps<{
  lines?: number;
  width?: number | string;
  type?: 'link';
  size?: string | number;
}>(), {
  lines: 1,
  size: 14
});

const slots = defineSlots();
onUpdated(() => {
  determineWidth();
  setTimeout(() => {
    determineWidth();
  }, 1000);
});
onMounted(() => {
  determineWidth();
});
const determineWidth = () => {
  const ele = contentRef.value;
  if (ele) {
    const range = document.createRange();
    range.setStart(ele, 0);
    range.setEnd(ele, ele.childNodes.length);
    ellipsis.value = range.getBoundingClientRect().width > ele.offsetWidth || ele.scrollWidth > ele.offsetWidth;
  }
};

const getTextFromNode = (node) => {
  const children = node.children || '';
  if (Array.isArray(children)) {
    return children.map((v) => getTextFromNode(v)).join('');
  } else {
    return node.children;
  }
};

const contentText = computed(() => {
  return (slots.default?.() || []).map((node) => getTextFromNode(node)).join('\n');
});

const wrapperStyle = computed(() => {
  return {
    width: Number.isNaN(Number(props.width)) ? props.width : `${props.width}px`,
  };
});

const wrapperRef = ref(null);
</script>

<template>
  <div v-if="ellipsis" class="tooltip-text-wrapper" :style="wrapperStyle" ref="wrapperRef">
    <OPopover anchor position="top">
      <div :class="['popup-box2', `fz${size}`]">{{ contentText }}</div>
      <template #target>
        <div :class="['tooltip-text', type, ellipsis && 'ellipsis', lines > 1 && 'multi-lines']" ref="contentRef" :style="`--lines: ${lines};`">
          <slot></slot>
        </div>
      </template>
    </OPopover>
  </div>
  <div v-else :style="wrapperStyle" ref="contentRef" class="tooltip-text-wrapper">
    <span :class="type"><slot></slot></span>
  </div>
</template>

<style scoped lang="scss">
.tooltip-text-wrapper {
  * {
    white-space: nowrap;
    overflow: hidden;
    word-break: keep-all;
  }
  .tooltip-text {
    &.ellipsis {
      text-overflow: ellipsis;
    }

    &.multi-lines {
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: var(--lines);
      overflow: hidden;
    }
  }

  .link {
    color: var(--o-color-primary1);
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.o-popup-wrap {
  border-radius: var(--o-radius-xs);
}
.tooltip-text-wrapper {
  .popup-box2 {
    &.fz14 {
      font-size: 14px;
    }
  }
}
</style>
