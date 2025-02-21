<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from '@/i18n';
import { isBrowser } from '@/shared/utils';

import VideoConfig from '@/data/video/new';
import AppContent from '@/components/AppContent.vue';
import VideoCard from './VideoCard.vue';
import VideoMobileCard from './VideoMobileCard.vue';
import VideoTab from './VideoTab.vue';
import VideoNav from './VideoAnchor.vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/blog.png';

const i18n = useI18n();

// ------------------------------ tab ------------------------------
const activeMobile = ref(0);
const activeTab = ref(1);

const initActiveTab = () => {
  if (isBrowser()) {
    const url = new URL(location.href);
    const id = Number(url.searchParams.get('id'));
    if (VideoConfig.find((e) => e.id === id)) {
      activeTab.value = id;
    }
  }
};
initActiveTab();

watch(activeTab, () => {
  activeMobile.value = 0;
  const url = new URL(location.href);
  url.searchParams.set('id', activeTab.value.toString());
  history.pushState({}, '', url);
  activeIndex.value = 0;
});

// ------------------------------ 当前数据 ------------------------------
const videoItem = computed(() => {
  return VideoConfig.find((item) => item.id === activeTab.value);
});
const videoData = computed(() => {
  return videoItem.value?.data.zh || [];
});

// ------------------------------锚点 ------------------------------
const activeIndex = ref(0);
const pcContainer = ref<HTMLDivElement>();
</script>

<template>
  <BannerLevel2 :background-image="Banner" :title="i18n.connect.VIDEO_TITLE" :illustration="illustration" />
  <!-- Tab -->
  <VideoTab v-model="activeTab" :tab-data="VideoConfig" />
  <!-- Content -->
  <AppContent :pcTop="0">
    <!-- PC端 -->
    <div class="video-pc">
      <div ref="pcContainer" class="pc">
        <VideoNav v-if="Array.isArray(videoItem?.data?.navList)" v-model:current-index="activeIndex" :target="pcContainer" :list="videoItem?.data?.navList" />
        <VideoCard v-for="item in videoData" :key="item.id" :data-source="item" />
      </div>
    </div>
    <!-- 移动端 -->
    <div class="video-mobile">
      <OCollapse v-model="activeMobile" accordion>
        <OCollapseItem v-for="(item, index) in videoData" :key="item.id" :name="index" :class="{ 'single-video-item': videoData.length === 1 }">
          <template #title>
            <p class="caption">{{ item.name }}</p>
          </template>
          <VideoMobileCard
            v-for="(subitem, i) in item.data"
            :key="i"
            :cover="item.poster"
            :cover-title="subitem.title"
            :title="subitem.title"
            :href="subitem.videoUrl"
          />
        </OCollapseItem>
      </OCollapse>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
@include in-dark {
  .cover {
    @include img-in-dark;
  }
}
.app-content {
  @media screen and (max-width: 1100px) {
    padding-left: 0;
    padding-right: 0;
  }
}
.tag-box {
  :deep(.el-card__body) {
    padding-top: 0;
    padding-bottom: 0;
  }
}
.video-pc {
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.video-mobile {
  display: none;
  .o-collapse {
    :deep(.el-collapse-item__content) {
      padding: var(--o-spacing-h5);
      background-color: var(--o-color-bg1);
    }
    .caption {
      padding-left: var(--o-spacing-h5);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      font-weight: 400;
    }

    :deep(.el-collapse-item__header) {
      height: 54px;
      padding-right: 24px;
    }

    :deep(.el-collapse-item__content) {
      padding: var(--o-spacing-h4) var(--o-spacing-h5);
    }

    :deep(.el-collapse-item__arrow) {
      transform: rotate(90deg);
    }

    :deep(.el-collapse-item__arrow.is-active) {
      transform: rotate(-90deg);
    }

    :deep(.el-collapse-item__header::after) {
      right: 0;
    }

    .single-video-item {
      :deep(.el-collapse-item__header) {
        display: none;
      }
      :deep(.el-collapse-item__content) {
        padding: 0 var(--o-spacing-h5);
      }
    }
  }
  @media screen and (max-width: 1100px) {
    display: block;
  }
}
</style>
