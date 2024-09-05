<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import useWindowResize from '@/components/hooks/useWindowResize';

import VideoConfig from '@/data/video/new';

import type { VideoItemT } from '@/shared/@types/type-video';

import videoBtn from '@/assets/category/home/video-btn.png';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const perviewNum = ref(4);
const videoList = ref<Array<VideoItemT>>([]);
const { lang } = useData();
const screenWidth = useWindowResize();
const router = useRouter();
const i18n = useI18n();

const isZh = computed(() => (lang.value === 'zh' ? true : false));

function getVideoList() {
  videoList.value = VideoConfig.map((item) => {
    return {
      id: item.id,
      cover: item.poster,
      name: item.name,
      nameEn: item.nameEn,
      title: isZh.value ? item.name : item.nameEn,
      videoUrl: `/${lang.value}/video/?id=${item.id}`,
      date: '',
    };
  });
}

onMounted(() => {
  getVideoList();
  perviewNum.value =
    screenWidth.value > 1920 ? 6 : screenWidth.value < 994 ? 1 : 4;
});

const goVideoDetail = (item: VideoItemT) => {
  if (item.id !== undefined) {
    router.go(`/${lang.value}/video/?id=${item.id}`);
  }
};
const windowWidth = useWindowResize();
</script>

<template>
  <div class="home-video">
    <h2 class="caption">{{ i18n.home.VIDEO_TITLE }}</h2>
    <div v-if="windowWidth > 1100" class="scroll-content">
      <div class="video-list">
        <div v-for="item in videoList" :key="item.id" class="home-video-item">
          <div
            class="home-video-link"
            :style="`background:url(${item.cover}) no-repeat center/cover`"
            @click="goVideoDetail(item)"
          >
            <img :src="videoBtn" class="video-btn" />
            <div class="box">
              <p class="title">{{ isZh ? item.name : item.nameEn }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-carousel
      v-else
      class="video-list-mb"
      :interval="5000"
      height="236px"
      indicator-position="none"
      arrow="never"
    >
      <el-carousel-item
        v-for="item in videoList"
        :key="item.id"
        class="home-video-item"
      >
        <div
          class="home-video-link"
          :style="`background:url(${item.cover}) no-repeat center/cover`"
          @click="goVideoDetail(item)"
        >
          <img :src="videoBtn" class="video-btn" />
          <div class="box">
            <p class="title">{{ item.title }}</p>
            <p class="type" :title="item.title">
              {{ isZh ? item.name : item.nameEn }}
            </p>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>
    <p class="video-more">
      <a :href="`/${lang}/video/`" rel="noopener noreferrer">
        <OButton animation type="text">
          {{ i18n.common.VIEW_MORE }}
          <template #suffixIcon>
            <IconArrowRight class="video-more-icon"></IconArrowRight>
          </template>
        </OButton>
      </a>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.home-video {
  .caption {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-bottom: var(--o-spacing-h2);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin-top: 0;
      margin-bottom: var(--o-spacing-h5);
    }
  }
  .scroll-content {
    width: 100%;
    .video-list {
      display: grid;
      gap: 24px;
      grid-template-columns: repeat(4, 1fr);
      .home-video-item {
        .home-video-link {
          height: 236px;
          cursor: pointer;
          position: relative;
          .box {
            display: grid;
            align-items: center;
            justify-content: center;
            text-align: center;
            height: 100%;
            padding: var(--o-spacing-h4);
            box-sizing: border-box;
          }
          .video-btn {
            width: 72px;
            height: 72px;
            display: block;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
          }
          .title {
            color: #fff;
            font-size: var(--o-font-size-h6);
            line-height: var(--o-line-height-h6);
            font-weight: 500;
          }
          .type {
            color: #fff;
            font-size: var(--o-font-size-h8);
            line-height: var(--o-line-height-h8);
          }
        }
      }
    }
  }
  .video-list-mb {
    .home-video-item {
      .home-video-link {
        height: 236px;
        cursor: pointer;
        position: relative;
        .box {
          display: grid;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 100%;
          padding: var(--o-spacing-h4);
          box-sizing: border-box;
        }
        .video-btn {
          width: 72px;
          height: 72px;
          display: block;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        .title {
          color: #fff;
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          font-weight: 500;
        }
        .type {
          color: #fff;
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
        }
      }
    }
  }
  .video-more {
    display: flex;
    padding-top: var(--o-spacing-h4);
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1000px) {
      padding: var(--o-spacing-h5) 0 0;

      .o-button {
        font-size: 14px;
      }
    }

    :deep(.o-button) {
      padding: 0;
    }

    .video-more-icon {
      width: var(--o-font-size-h8);
      height: var(--o-font-size-h8);
      color: var(--o-color-brand1);
    }
  }
}

@include in-dark {
  .home-video-link {
    @include img-in-dark;
  }
}
</style>
