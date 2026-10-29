<script setup lang="ts">
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import { useIntersectionObserver } from '@vueuse/core';
import { computed, inject, ref, Ref, useTemplateRef, watch } from 'vue';
import { OTab, OTabPane } from '@opensig/opendesign';

const props = defineProps<{
  tabsData: {
    value: string;
    label: string;
  }[];
  // BannerLevel2 props
  backgroundImage: string;
  imageAlt?: string;
  backgroundColor?: string;
  title?: string;
  description?: string;
  /** @deprecated 替换为 description*/
  subtitle?: string;
  hideDescription?: boolean;
  /** 右边的额外图片 */
  illustration?: string;
}>();

const model = defineModel<string | number>();
const emits = defineEmits<{
  change: [v: string | number];
}>();

const onChange = (v: string | number) => emits('change', v);

const bannerLevel2Props = computed(() => {
  const { tabsData: _, ...rest } = props;
  return rest;
});

const appHeaderHeight = inject<Ref<number>>('appHeaderHeight')!;
const stickyingSentinelRef = useTemplateRef('stickyingSentinelRef');
const stickying = ref(false);

useIntersectionObserver(stickyingSentinelRef, ([entry]) => (stickying.value = entry.intersectionRatio <= 0), {
  threshold: [0],
  rootMargin: () => `-${appHeaderHeight.value}px 0px 0px 0px`,
});

const tabKey = ref(0);
watch(stickying, () => tabKey.value++);
</script>
<template>
  <BannerLevel2 v-bind="bannerLevel2Props" />

  <div ref="stickyingSentinelRef" class="stickying-sentinel"></div>
  <div class="charter-tab-wrapper" :class="{ 'is-stickying': stickying }">
    <OTab v-model="model" :key="tabKey" @change="onChange" :class="{ 'is-stickying': stickying }" variant="text" size="medium" round="pill" :line="false">
      <OTabPane v-for="item in tabsData" :key="item.value" :value="item.value" :label="item.label"></OTabPane>
    </OTab>
  </div>
</template>
<style lang="scss" scoped>
.stickying-sentinel {
  width: 100%;
  height: 1px;
  visibility: hidden;
}

:deep(.o-tab-nav) {
  padding: var(--o-r-gap-4) 0;
  font-size: var(--o-r-font_size-h4);
  line-height: var(--o-r-line_height-h4);

  @include respond('<=pad_v') {
    padding-top: 0;
    font-size: 14px;
    line-height: 22px;
  }
}

.is-stickying :deep(.o-tab-nav) {
  padding-top: var(--o-r-gap-4);
}

.charter-tab-wrapper {
  position: sticky;
  top: var(--app-header-height);
  background-color: var(--o-color-fill2);
  z-index: 1;
  min-height: 60px;

  @include respond('laptop') {
    min-height: 50px;
  }

  @include respond('<=pad') {
    min-height: 40px;
  }

  @include respond('<=pad_v') {
    background-color: transparent;
  }

  &.is-stickying {
    background-color: var(--o-color-fill2);
    box-shadow: var(--o-shadow-1);
  }
}

.o-tab {
  width: var(--o-r-grid-section-width);
  margin: 0 auto;

  &.is-stickying {
    --tab-nav-justify: start;
  }
}
</style>
