<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import VideoConfig from '@/data/video/new';
import { computed } from 'vue';

import cover1 from '~@/assets/category/home/videos/cover1.png';
import cover2 from '~@/assets/category/home/videos/cover2.png';
import cover3 from '~@/assets/category/home/videos/cover3.png';
import cover4 from '~@/assets/category/home/videos/cover4.png';
import { OCard, OScroller } from '@opensig/opendesign';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';

const coverList = [cover1, cover2, cover3, cover4];

const { t, isZh, locale } = useLocale();
const { theme } = storeToRefs(useCommon());

const videoList = computed(() => {
  return VideoConfig.map((item) => {
    return {
      id: item.id,
      cover: item.poster,
      name: item.name,
      nameEn: item.nameEn,
      title: isZh.value ? item.name : item.nameEn,
      videoUrl: `/${locale.value}/video/?id=${item.id}`,
    };
  });
});
</script>

<template>
  <AppSection :title="t('home.VIDEO_TITLE')">
    <OScroller style="white-space: nowrap;">
      <div class="home-videos">
        <a v-for="(item, index) in videoList" class="home-videos-item" :key="item.id" :href="item.videoUrl" target="_blank" rel="noopener noreferrer">
          <OCard>
            <div class="item-img">
              <div class="mask" v-if="theme === 'dark'"></div>
              <img style="height: 100%" :src="coverList[index]" />
            </div>
            <p class="home-videos-item-desc">{{ item.title }}</p>
          </OCard>
        </a>
      </div>
    </OScroller>
  </AppSection>
</template>

<style lang="scss" scoped>
:deep(.section-body) {
  @include respond-to('<=pad_v') {
    width: 100% !important;
    padding-right: 0 !important;
    padding-left: 0 !important;
  }
}

.o-card {
  border-radius: 4px;
  --card-main-padding: 0;

  --title-color: var(--o-color-info2);
  @include hover {
    --title-color: var(--o-color-primary1);
  }
}

.home-videos {
  display: flex;
  --item-gap: 32px;
  padding-bottom: 24px;
  @include respond-to('<=pad') {
    width: fit-content;
    --ltpad-content-width: calc(100vw - var(--layout-content-padding) * 2);
  }

  @include respond-to('laptop') {
    --item-gap: 24px;
  }
  @include respond-to('pad') {
    --item-gap: 16px;
  }
  @include respond-to('phone') {
    --item-gap: 12px;
  }
  @include respond-to('<=pad_v') {
    padding: var(--layout-content-padding);
  }
}

.home-videos-item {
  width: calc((100vw - var(--layout-content-padding) * 2 - var(--item-gap) * 3) / 4);
  cursor: pointer;
  @include hover {
    box-shadow: var(--o-shadow-2);
  }

  @include respond-to('pad_v') {
    width: calc((var(--ltpad-content-width) + var(--item-gap)) / 3.5 - var(--item-gap));
  }
  @include respond-to('phone') {
    width: calc((var(--ltpad-content-width) + var(--item-gap)) / 2 - var(--item-gap));
  }
  .el-card {
    --el-card-padding: 0;
    @include respond-to('phone') {
      border-radius: 4px;
    }
  }
  &:not(:last-child) {
    margin-right: var(--item-gap);
  }

  .item-img {
    width: 100%;
    position: relative;

    .mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.1);
      z-index: 1;
    }

    img {
      width: 100%;
      height: auto;
      transform-origin: center;
      transition: transform 0.3s ease;
      @include hover {
        transform: scale(1.05);
      }
    }
  }
}

.home-videos-item-desc {
  color: var(--title-color);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2; /* 设置你想要显示的行数 */
  overflow: hidden;
  font-weight: bold;
  padding: 16px;
  @include respond-to('laptop') {
    padding: 12px;
  }
  @include respond-to('pad_h') {
    padding: 12px;
  }
  @include respond-to('<=pad_v') {
    padding: 8px;
  }
  white-space: normal;
  @include h4;
  margin-bottom: var(--e-spacing-h10);
}
</style>
