<script lang="ts" setup>
import { computed, ref } from 'vue';
import { useRoute } from 'vitepress';
import { OIcon, OTag, ODivider } from '@opensig/opendesign';

import ContentWrapper from './ContentWrapper.vue';
import BannerLevel2 from '~@/components/BannerLevel2.vue';

import IconChevronDown from '~icons/app-new/icon-chevron-down.svg';
import { useScreen } from '~@/composables/useScreen';

const props = defineProps<{
  bannerData: {
    img?: any;
    title?: string;
    subtitle?: string;
  },
  tabsData: {
    title?: string;
    name: string;
    href: string;
    icon?: any;
  }[],
}>();

const route = useRoute();
const { gtPadV, lePadV } = useScreen();

const shownSelect = ref(false);

// ================ 窄屏 ================
const handleToggleDrawer = () => {
  shownSelect.value = !shownSelect.value;
};

const subTitle = computed(() => {
  return props.tabsData.find((item) => route.path === item.href)!.title;
});
</script>
<template>
  <div v-show="gtPadV">
    <BannerLevel2
      :background-image="bannerData.img"
      :title="bannerData.title"
      :subtitle="bannerData.subtitle"
    >
    </BannerLevel2>
    <div class="router-tabs">
      <div class="tab-pane">
        <a
          class="pane-content"
          v-for="item in tabsData"
          :href="item.href"
          :class="{ active: route.path === item.href }"
          :key="item.name"
        >
          <div class="pane-content-inner">
            <OIcon v-if="item.icon">
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
  <!-- ================ 窄屏 ================ -->
  <div v-show="lePadV" class="app-router-template-mo">
    <ContentWrapper
      class="banner-wrapper"
      style="--content-wrapper-vertical-paddingTop: 0; --content-wrapper-vertical-paddingBottom: 0"
      @click="handleToggleDrawer"
    >
      <div class="left-info">
        <span>{{ bannerData.title }}</span>
        <OTag> {{ subTitle }} </OTag>
      </div>
      <div class="right-icon">
        <OIcon :class="{ reversal: shownSelect }"> <IconChevronDown /></OIcon>
      </div>
    </ContentWrapper>
    <div
      v-if="shownSelect"
      class="mask"
      @click.stop="shownSelect = false"
    ></div>
    <ContentWrapper
      v-if="shownSelect"
      class="router-select"
      @click="handleToggleDrawer"
      style="--content-wrapper-vertical-paddingTop: 0; --content-wrapper-vertical-paddingBottom: 0"
    >
      <div class="select" v-for="(item, index) in tabsData" :key="item.name">
        <a :href="item.href">
          {{ item.title }}
        </a>
        <ODivider v-if="index + 1 !== tabsData.length" />
      </div>
    </ContentWrapper>
  </div>
</template>

<style scoped lang="scss">
.router-tabs {
  margin: 0 auto;
  background-color: var(--e-color-bg2);
}
.tab-pane {
  display: grid;
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
    padding: var(--o-r-gap-5) 0;
    width: 100%;
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
      font-weight: 600;
      @include text2;
    }
    .subtitle {
      margin-top: 4px;
      @include text1;
    }
  }
}
.pane-content.active {
  color: var(--o-color-white);
  background-image: linear-gradient(270deg, rgb(125, 50, 234) 0%, rgba(125, 50, 234, 0.5) 100%);
}

// ================ 窄屏 ================
.app-router-template-mo {
  position: relative;
  padding: 8px 0;
  background-image: linear-gradient(270deg, rgba(125, 50, 234, 1) 0%, rgba(125, 50, 234, 0.4) 100%);
}

.reversal {
  transform: rotate(-180deg);
}

.banner-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--o-color-white);
  .left-info {
    span {
      @include h4;
      margin-right: 8px;
    }
    .o-tag {
      background-color: rgba($color: #000000, $alpha: 0.25);
      color: var(--o-color-white);
      border: none;
    }
  }
  .right-icon {
    cursor: pointer;
    display: flex;
    align-items: center;
    font-size: var(--o-icon_size-m);
    .o-icon {
      transition: var(--o-easing-standard);
    }
  }
}
.router-select {
  position: absolute;
  top: 40px;
  left: 0;
  z-index: 2;
  display: block;
  width: 100%;
  background-color: var(--o-color-fill2);
  padding-top: 12px;
  padding-bottom: 12px;
  .select {
    width: var(--grid-content-width);
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    @include text1;
    a {
      color: var(--o-color-info2);
    }
  }
}

.mask {
  position: fixed;
  top: 96px;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1;
}
</style>
