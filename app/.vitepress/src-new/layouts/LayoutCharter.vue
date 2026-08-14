<script setup lang="ts">
import bannerImg from '~@/assets/category/charter/banner.png';
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import { OTab, OTabPane, throttleRAF, useMessage } from '@opensig/opendesign';
import { inject, nextTick, onMounted, onUnmounted, Ref, ref, useTemplateRef, watch } from 'vue';
import { useData, useRoute, useRouter } from 'vitepress';
import { useElementSize } from '@vueuse/core';
import AppSection from '~@/components/AppSection.vue';
import AppRouterTemplate from '~@/components/AppRouterTemplate.vue';
import { useClipboard } from '~@/composables/useClipboard';
import { useI18n } from '~@/i18n';

const { lang } = useData();

const { hash, frontmatter } = useData();
const route = useRoute();
const router = useRouter();
const i18n = useI18n();

const message = useMessage();

const onCopyClick = (e: MouseEvent) => {
  const text = (e.currentTarget as HTMLElement).parentElement?.textContent ?? '';
  useClipboard({
    text,
    target: e,
    success: () => {
      message.success({
        content: i18n.value.common.COPY_SUCCESS,
      });
    },
    error: () => {
      message.danger({
        content: i18n.value.common.COPY_FAILED,
      });
    },
  });
};

const setupCopyButtons = () => {
  const card = document.querySelector('.charter-content-card');
  if (!card) return;
  const btns = card.querySelectorAll('button.copy') as NodeListOf<HTMLButtonElement>;
  btns?.forEach((btn) => {
    btn.addEventListener('click', onCopyClick);
  });
};

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
    router.go(`/${lang.value}/${hashVal}`);
  }
}

watch(activeAnchor, (val) => {
  const current = location.pathname.match(/\/?(?:zh|en)\/([^/]+?)\/?/)?.[1];
  if (current && current !== val) {
    router.go(`/${lang.value}/${val}`);
  }
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
  setupCopyButtons();
});

onUnmounted(() => {
  scrollContainerRef?.value?.removeEventListener('scroll', onScroll);
});

watch(
  () => route.path,
  () => nextTick(setupCopyButtons)
);
</script>

<template>
  <BannerLevel2
    class="charter-banner"
    ref="bannerLevel2"
    :title="frontmatter.title"
    :subtitle="frontmatter.description"
    :background-image="bannerImg"
  />

  <div class="charter-tab-wrapper" :class="{ 'is-stickying': stickying }">
    <OTab v-model="activeAnchor" :key="tabKey" :class="{ 'is-stickying': stickying }" variant="text" size="medium" round="pill" :line="false">
      <OTabPane value="conduct" :label="lang === 'zh' ? '行为准则' : 'Community Code of Conduct'"></OTabPane>
      <OTabPane value="ai-coding-assistants" :label="lang === 'zh' ? 'AI贡献策略' : 'AI Contribution Policy'"></OTabPane>
    </OTab>
  </div>

  <div>
    <AppSection :title="frontmatter.charterTitle">
      <div class="charter-content-card">
        <Content />
      </div>
    </AppSection>
  </div>
</template>

<style lang="scss" scoped>
.charter-banner {
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

.charter-tab-wrapper {
  position: sticky;
  top: var(--app-header-height);
  background-color: var(--o-color-fill2);
  padding-top: 16px;
  z-index: 1;

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

<style lang="scss">
@mixin trim {
  &:first-child {
    margin-top: 0;
  }
  &:last-child {
    margin-bottom: 0;
  }
}

.charter-content-card {
  border-radius: 4px;
  background-color: var(--o-color-fill2);
  padding: 40px;
  color: var(--o-color-info2);

  .lang {
    display: none;
  }

  p {
    margin-top: 8px;
    margin-bottom: 8px;
    @include text1;
    &:not(:last-child) {
      margin-bottom: 16px;
    }
  }

  h2 + p,
  h3 + p,
  h4 + p {
    margin-top: 16px;
    margin-bottom: 16px;
  }

  h2 {
    font-weight: 600;
    &:not(:first-child) {
      margin-top: 40px;
    }
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    @include h3;
  }

  h3 {
    font-weight: 600;
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  
  ul {
    @include text1;
    list-style: disc outside;
    padding-left: calc(1em + 7px);
    &:not(:last-child) {
      margin-bottom: 16px;
    }
    li {
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  .code-block {
    position: relative;

    @include hover {
      .copy {
        opacity: 1;
      }
    }
  }

  pre {
    overflow: auto;
    background-color: var(--o-color-fill1) !important;
    color: var(--o-color-info2) !important;
    border-radius: 4px;
    padding: 12px;

    code {
      font-family: 'Consolas', 'Microsoft YaHei';
      white-space: no-wrap;
      font-size: 14px;
      line-height: 22px;
    }
  }

  .copy {
    cursor: pointer;
    position: absolute;
    top: calc(var(--o-gap-2) + 2px);
    right: var(--o-gap-3);
    border-radius: 4px;
    width: 24px;
    height: 24px;
    background-color: var(--o-color-fill1);
    background-image: url('@/assets/svg-icons/icon-copy2.svg');
    background-position: 50%;
    background-size: 20px;
    background-repeat: no-repeat;
    border: none;
    opacity: 0;
    transition: all var(--o-duration-m1) var(--o-easing-standard-in);

    @include respond-to('<=pad') {
      top: var(--o-gap-2);
    }

    @include respond-to('phone') {
      top: 12px;
      opacity: 1;
      width: 16px;
      height: 16px;
      background-size: 14px;
    }
  }

  @include respond-to('pad_h') {
    padding: 12px 16px;
  }
  @include respond-to('pad_v') {
    padding: 24px;
  }
  @include respond-to('phone') {
    padding: 12px;
  }
}

@include in-dark {
  .charter-content-card {
    .copy {
      background-image: url('@/assets/svg-icons/icon-copy-dark.svg');
    }
  }
}
</style>
