<script setup lang="ts">
import bannerImg from '~@/assets/category/charter/banner.png';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import { OTab, OTabPane, throttleRAF } from '@opensig/opendesign';
import { computed, inject, onMounted, onUnmounted, Ref, ref, useTemplateRef, watch } from 'vue';
import { useData, useRoute } from 'vitepress';
import TheConduct from './TheConduct.vue';
import TheAICodingAssistant from './TheAICodingAssistant.vue';
import { useElementSize } from '@vueuse/core';

const props = defineProps<{
  lang: 'zh' | 'en';
}>();

const { hash } = useData();
const route = useRoute();

const stickying = ref(false);
const scrollContainerRef = inject<Ref<HTMLElement>>('scrollContainerRef');

const getAnchorValue = () => {
  const path = route.path;
  if (path.endsWith('/conduct/')) {
    return 'conduct';
  }
  if (path.endsWith('/ai-coding-assistants/')) {
    return 'ai-coding-assistants';
  }
  if (hash.value.endsWith('conduct')) {
    return 'conduct';
  }
  if (hash.value.endsWith('ai-coding-assistants')) {
    return 'ai-coding-assistants';
  }
  return 'conduct';
};

const activeAnchor = ref(getAnchorValue());

if (typeof document !== 'undefined' && route.path.includes('/charter') && hash.value) {
  const current = location.pathname.match(/\/?(?:zh|en)\/([^/]+?)\/?/)?.[1];
  const hashVal = hash.value.startsWith('#') ? hash.value.slice(1) : hash.value;
  if (current && current !== hashVal) {
    history.pushState({}, '', `/${props.lang}/${hashVal}`);
  }
}

watch(activeAnchor, (val) => {
  const current = location.pathname.match(/\/?(?:zh|en)\/([^/]+?)\/?/)?.[1];
  if (current && current !== val) {
    history.pushState({}, '', `/${props.lang}/${val}`);
  }
});

const contentComp = computed(() => {
  if (activeAnchor.value === 'conduct') {
    return TheConduct;
  }
  if (activeAnchor.value === 'ai-coding-assistants') {
    return TheAICodingAssistant;
  }
  return TheConduct;
});

const bannerRef = useTemplateRef('bannerLevel2');

const { height } = useElementSize(bannerRef);

const onScroll = throttleRAF(() => {
  stickying.value = scrollContainerRef!.value.scrollTop >= height.value;
});

const tabKey = ref(0);

watch(stickying, () => tabKey.value++);

onMounted(() => {
  scrollContainerRef?.value?.addEventListener('scroll', onScroll);
});

onUnmounted(() => {
  scrollContainerRef?.value?.removeEventListener('scroll', onScroll);
});
</script>

<template>
  <BannerLevel2
    ref="bannerLevel2"
    :title="lang === 'zh' ? '政策规则' : 'Policies & Rules'"
    :subtitle="
      lang === 'zh'
        ? '了解openGauss社区的行为准则、AI贡献策略等相关内容'
        : 'Learn about the code of conduct and AI contribution policies of the openGauss community.'
    "
    :background-image="bannerImg"
  />

  <div class="tab-wrapper" :class="{ 'is-stickying': stickying }">
    <OTab v-model="activeAnchor" :key="tabKey" :class="{ 'is-stickying': stickying }" variant="text" size="medium" round="pill" :line="false">
      <OTabPane value="conduct" :label="lang === 'zh' ? '行为准则' : 'Community Code of Conduct'"></OTabPane>
      <OTabPane value="ai-coding-assistants" :label="lang === 'zh' ? 'AI贡献策略' : 'AI Contribution Policy'"></OTabPane>
    </OTab>
  </div>

  <component :lang="lang" :is="contentComp" />
</template>
<style lang="scss" scoped>
.banner-level2 {
  @include respond-to('<=pad_v') {
    background-color: transparent !important;
    padding-top: 16px;
    :deep(.banner-bg) {
      display: none;
    }

    :deep(.wrap .banner-text) {
      max-width: 100%;
    }
  }
}

.tab-wrapper {
  position: sticky;
  top: var(--app-header-height);
  background-color: var(--o-color-fill2);
  padding-top: 16px;

  @include respond-to('<=laptop') {
    padding-top: 10px;
  }

  @include respond-to('phone') {
    padding-top: 4px;
    background-color: transparent;
  }

  &.is-stickying {
    background-color: var(--o-color-fill2);
    box-shadow: var(--o-shadow-1);
  }
}

.o-tab {
  width: var(--grid-content-width);
  margin: 0 auto;

  &.is-stickying {
    --tab-nav-justify: start;
  }
}

:deep(.o-anchor-item-link) {
  @include text1;
}
</style>
