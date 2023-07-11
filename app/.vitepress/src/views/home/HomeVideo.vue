<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Autoplay } from 'swiper';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import 'swiper/swiper.min.css';
import useWindowResize from '@/components/hooks/useWindowResize';

import VideoConfig from '@/data/video';

import videoBtn from '@/assets/category/home/video-btn.png';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const modules = [Autoplay];
const perviewNum = ref(4);
const videoList = ref<any>([]);
const { lang } = useData();
const screenWidth = useWindowResize();
const router = useRouter();
const i18n = useI18n();

const isZh = computed(() => (lang.value === 'zh' ? true : false));

function getVideoList() {
  const result = VideoConfig;
  const resultList: any = [];
  result.forEach((item, k) => {
    const data = isZh.value ? item.data.zh : item.data.en;
    data.forEach((el: any, i) => {
      if (i < 1) {
        el['cover'] = item.poster;
        el['name'] = item.name;
        el['nameEn'] = item.nameEn;
        el['id'] = k + 1;
        el['index'] = i;
        resultList.push(el);
      }
    });
  });
  videoList.value = resultList;
}

onMounted(() => {
  getVideoList();
  perviewNum.value =
    screenWidth.value > 1920 ? 6 : screenWidth.value < 994 ? 1 : 4;
});

const handlerVideoDetail = (id: number, index: number) => {
  router.go(`/${lang.value}/video/detail/?id=${id}-${index}`);
};
</script>

<template>
  <div class="video-main">
    <h2 class="caption">{{ i18n.home.VIDEO_TITLE }}</h2>
    <swiper
      :slides-per-view="perviewNum"
      :space-between="24"
      :modules="modules"
      :autoplay="{
        delay: 2500,
        disableOnInteraction: false,
      }"
      :loop="true"
    >
      <swiper-slide
        v-for="item in videoList"
        :key="item.id"
        class="home-video-item"
      >
        <div
          class="home-video-link"
          :style="`background:url(${item.cover}) no-repeat center/cover`"
          @click="handlerVideoDetail(item.id, item.index)"
        >
          <img :src="videoBtn" class="video-btn" />
          <div class="box">
            <p class="title">{{ item.title }}</p>
            <p class="type" :title="item.title">
              {{ isZh ? item.name : item.nameEn }}
            </p>
          </div>
        </div>
      </swiper-slide>
    </swiper>
    <p class="video-more">
      <a :href="`/${lang}/video/`">
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
.dark .home-video-link {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.home-video-item {
  position: relative;

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
</style>
