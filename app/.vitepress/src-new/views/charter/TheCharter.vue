<script setup lang="ts">
import bannerImg from '~@/assets/category/charter/banner.png';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import { OAnchor, OAnchorItem, throttleRAF } from '@opensig/opendesign';
import { computed, inject, onMounted, Ref, ref } from 'vue';
import { useScreen } from '~@/composables/useScreen';
import { useData, useRoute, useRouter } from 'vitepress';
import TheConduct from './TheConduct.vue';
import TheAICodingAssistant from './TheAICodingAssistant.vue';

const props = defineProps<{
  lang: 'zh' | 'en';
}>();

const { hash } = useData();
const route = useRoute();
const router = useRouter();

const { isPhone } = useScreen();

const showAnchor = ref(false);
const scrollContainerRef = inject<Ref<HTMLElement>>('scrollContainerRef');
  
const activeAnchor = computed({
  get() {
    const path = route.path;
    if (path.endsWith('/conduct/')) {
      return '#conduct';
    }
    if (path.endsWith('/ai-coding-assistants/')) {
      return '#ai-coding-assistants';
    }
    if (hash.value.endsWith('conduct')) {
      return '#conduct';
    }
    if (hash.value.endsWith('ai-coding-assistants')) {
      return '#ai-coding-assistants';
    }
    return '#conduct';
  },
  set(hash: string) {
    let path = hash.startsWith('#') ? hash.slice(1) : hash;
    if (route.path.match(/.+?\/(.+?)\/?$/)?.[1] === path) {
      return;
    }
    router.go(`/${props.lang}/${path}/`);
  }
});

if (route.path.endsWith('/charter/') && hash.value) {
  activeAnchor.value = hash.value.startsWith('#') ? hash.value : `#${hash.value}`;
}

const anchorChange = (link: string) => {
  activeAnchor.value = link || activeAnchor.value;
};

const contentComp = computed(() => {
  if (activeAnchor.value === '#conduct') {
    return TheConduct;
  }
  if (activeAnchor.value === '#ai-coding-assistants') {
    return TheAICodingAssistant;
  }
  return TheConduct;
});

onMounted(() => {
  scrollContainerRef?.value?.addEventListener(
    'scroll',
    throttleRAF(() => {
      showAnchor.value = scrollContainerRef!.value.scrollTop > 98;
    })
  );
});
</script>

<template>
  <BannerLevel2
    :title="lang === 'zh' ? '政策规则' : 'Policies & Rules'"
    :subtitle="
      lang === 'zh'
        ? '了解openGauss社区的行为准则、AI贡献策略等相关内容'
        : 'Learn about the code of conduct and AI contribution policies of the openGauss community.'
    "
    :background-image="bannerImg"
  />

  <OAnchor layout="h" :target-offset="150" size="medium" :change-hash="false" container="#anchor-sticky-demo" v-show="!isPhone || showAnchor" @change="anchorChange">
    <OAnchorItem href="#conduct">
      <template #title>
        <span :class="{'custom-anchor-title': true, 'active': activeAnchor === '#conduct'}">{{
          lang === 'zh' ? '行为准则' : 'Community Code of Conduct'
        }}</span>
      </template>
    </OAnchorItem>
    <OAnchorItem href="#ai-coding-assistants">
      <template #title>
        <span :class="{'custom-anchor-title': true, 'active': activeAnchor === '#ai-coding-assistants'}">{{
          lang === 'zh' ? 'AI贡献策略' : 'AI Contribution Policy'
        }}</span>
      </template>
    </OAnchorItem>
  </OAnchor>

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

.o-anchor {
  --anchor-offset-top: var(--app-header-height);
  --anchor-content-max-width: var(--grid-content-width);
  --anchor-z-index: 1;
}

.custom-anchor-title {
  color: var(--anchor-item-link-color);
  &.active {
    color: var(--o-color-primary1);
    font-weight: 600;
  }
}

:deep(.o-anchor-item-link) {
  @include text1;
}

.o-anchor-stickying {
  box-shadow: var(--o-shadow-1);
}
</style>
