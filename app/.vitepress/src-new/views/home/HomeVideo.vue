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
    <OScroller>
      <div class="home-videos">
        <a v-for="(item, index) in videoList" class="home-videos-item" :key="item.id" :href="item.videoUrl" target="_blank" rel="noopener noreferrer">
          <OCard>
            <div class="item-img">
              <div class="mask" v-if="theme === 'dark'"></div>
              <img :src="coverList[index]" />
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
  @include respond-to('phone') {
    padding-right: 0 !important;
  }
}

.o-card {
  border-radius: 4px;
  --card-main-padding: 0;
  @include hover {
    box-shadow: var(--o-shadow-2);
  }
}

.home-videos {
  display: flex;
  --item-gap: 32px;
  width: fit-content;

  @include respond-to('phone') {
    --item-gap: 12px;
  }
  @include respond-to('phone') {
    padding-right: var(--layout-content-padding);
  }
}

.home-videos-item {
  cursor: pointer;
  flex-shrink: 0;

  @include respond-to('phone') {
    --size: calc((100vw - 48px - 12px) / 2);
    width: var(--size);
    height: var(--size);
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
    height: auto;
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
      @include respond-to('phone') {
        width: 100%;
        height: 60%;
        object-fit: cover;
      }
    }
  }
}

.home-videos-item-desc {
  padding: 24px;
  @include respond-to('phone') {
    padding: 8px;
    min-height: 2em;
  }
  @include h4;
  margin-bottom: var(--e-spacing-h10);
  -webkit-line-clamp: 2;
  line-clamp: 2;
}
</style>
