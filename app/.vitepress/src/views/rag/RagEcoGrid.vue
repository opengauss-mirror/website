<script setup lang="ts">
import { useCommon } from '@/stores/common';
import { OIconChevronRight } from '@opensig/opendesign';
import OIcon from 'opendesign/icon/OIcon.vue';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';

defineProps<{
  layout: [number, number] | [number];
  gap?: [number, number];
  data: {
    active?: boolean;
    name: string;
    link?: string;
  }[];
}>();

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
    class="rag-eco-grid"
    :style="{
      display: 'grid',
      'grid-template-columns': `repeat(${layout[1] ?? data.length}, 1fr)`,
      'grid-template-rows': `repeat(${layout[0]}, 1fr)`,
      width: '100%',
    }"
  >
    <template v-for="item in data" :key="item.name">
      <a v-if="item.link" class="rag-eco-item link" :href="item.link" :style="{ 'background-color': item.active ? activeColor : nonActiveColor, 'border-radius': '4px' }">
        <span>{{ item.name }}</span>
        <OIcon style="font-size: 1.5em">
          <OIconChevronRight v-if="item.active" />
        </OIcon>
      </a>
      <div v-else class="rag-eco-item" :style="{ 'background-color': item.active ? activeColor : nonActiveColor, 'border-radius': '4px' }">
        <span>{{ item.name }}</span>
      </div>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.rag-eco-grid {
  row-gap: 12px;
  column-gap: 12px;
  @include respond-to('<=laptop') {
    row-gap: 8px;
    column-gap: 8px;
  };
}

.rag-eco-item {
  color: inherit;
  display: flex;
  padding: 12px 0;
  justify-content: center;
  align-items: center;
  @include text1;
  @include respond-to('<=laptop') {
    padding: 8px 0;
  };
}

.rag-eco-item.link {
  @include hover {  
    color: var(--o-color-primary2);
  }
}
</style>
