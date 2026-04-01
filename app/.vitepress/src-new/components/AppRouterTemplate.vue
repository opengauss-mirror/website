<script lang="ts" setup>
import { useRouter } from 'vitepress';

import BannerLevel2 from '~@/components/BannerLevel2.vue';
import { OIcon } from '@opensig/opendesign';
import { computed } from 'vue';

defineProps<{
  bannerData: {
    bannerImg?: any;
    bannerText?: string;
    bannerTitle?: string;
    subtitle?: string;
  },
  tabsData: {
    title: any;
    name: string;
    href: string;
    icon: any;
  }[],
}>();
const router = useRouter();
const active = computed(() => {
  return router.route.path.split('/');
});

const activeRoute = computed(() => {
  return active.value[active.value.length - 2];
});
</script>
<template>
  <div>
    <BannerLevel2
      :background-image="bannerData.bannerImg"
      :background-text="bannerData.bannerText"
      :title="bannerData.bannerTitle"
      :subtitle="bannerData.subtitle"
    >
    </BannerLevel2>
    <div class="router-tabs">
      <div class="tab-pane">
        <a
          class="pane-content"
          v-for="item in tabsData"
          :href="item.href"
          :class="{ active: item.name === activeRoute }"
          :key="item.name"
        >
          <div class="pane-content-inner">
            <OIcon>
              <component :is="item.icon"></component>
            </OIcon>
            <div class="info">
              <div class="title">{{ item.title }}</div>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.router-tabs {
  margin: 0 auto;
  background-color: var(--e-color-bg2);
}
.tab-pane {
  display: grid;
  min-height: 72px;
  grid-template-columns: repeat(2, 1fr);
}
.pane-content {
  color: var(--o-color-info1);
  background-color: var(--o-color-fill2);
  &:first-child {
    display: flex;
    justify-content: flex-end;
  }
  &:last-child {
    display: flex;
    justify-content: flex-start;
  }
  .pane-content-inner {
    max-width: calc(
      var(--layout-content-max-width) / 2 - var(--layout-content-padding)
    );
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    @include respond-to('<=laptop') {
      max-width: calc(100% - var(--layout-content-padding));
    }
  }
  .o-icon {
    margin-right: 16px;
    font-size: var(--o-icon_size-xl);
  }
  .info {
    display: flex;
    flex-direction: column;
    .title {
      @include text2;
    }
    .subtitle {
      margin-top: 4px;
      @include text1;
    }
  }
}
.active {
  .info {
    .title {
      font-weight: 500;
    }
  }
}
.pane-content.active {
  color: var(--o-color-white);
  background-image: linear-gradient(270deg, rgb(125, 50, 234) 0%, rgba(125, 50, 234, 0.5) 100%);
}
</style>
