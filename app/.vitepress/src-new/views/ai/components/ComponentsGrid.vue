<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { OIconChevronRight } from '@opensig/opendesign';
import OIcon from 'opendesign/icon/OIcon.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

const props = defineProps<{
  cols?: number;
  gap?: [number, number];
  data: {
    active?: boolean;
    name: string;
    link?: string;
  }[];
}>();

const gridVars = computed(() => {
  const style: Record<string, string | number> = {
    '--cols': props.cols ?? props.data.length,
  };
  if (props.gap) {
    style['--grid-gap'] = `${props.gap[1] ?? props.gap[0]}px`;
    style.gap = `${props.gap[0]}px ${props.gap[1] ?? props.gap[0]}px`;
  }
  return style;
});

const { theme } = storeToRefs(useCommon());

const activeColor = computed(() => {
  if (theme.value === 'dark') {
    return 'rgba(255, 255, 255, 0.1)';
  }
  return 'rgba(125, 50, 234, 0.08)';
});

const nonActiveColor = computed(() => {
  if (theme.value === 'dark') {
    return 'rgb(var(--o-grey-5))';
  }
  return 'rgb(var(--o-grey-2))';
});
</script>

<template>
  <div
    class="components-grid"
    :style="gridVars"
  >
    <template v-for="item in data" :key="item.name">
      <a v-if="item.link" class="grid-item link" :href="item.link" :target="item.link.startsWith('http') ? '_blank' : undefined" :rel="item.link.startsWith('http') ? 'noopener noreferrer' : 'noopener'" :style="{ 'background-color': item.active ? activeColor : nonActiveColor, 'border-radius': '4px' }">
        <span>{{ item.name }}</span>
        <OIcon style="font-size: 1.5em">
          <OIconChevronRight v-if="item.active" />
        </OIcon>
      </a>
      <div v-else class="grid-item" :style="{ 'background-color': item.active ? activeColor : nonActiveColor, 'border-radius': '4px' }">
        <span>{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.components-grid {
  --grid-gap: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: var(--grid-gap);
  width: 100%;
  @include respond-to('<=laptop') {
    --grid-gap: 8px;
  };
}

.grid-item {
  color: inherit;
  display: flex;
  flex: 1 1 calc((100% - (var(--cols, 1) - 1) * var(--grid-gap) - 1px) / var(--cols, 1));
  padding: 12px;
  justify-content: center;
  align-items: center;
  white-space: nowrap;
  @include text1;
  @include respond-to('<=laptop') {
    padding: 8px;
  };
}

.grid-item.link {
  @include hover {  
    color: var(--o-color-primary2);
  }
}
</style>
