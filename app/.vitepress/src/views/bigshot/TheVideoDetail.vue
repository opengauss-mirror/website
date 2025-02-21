<script lang="ts" setup>
import { OBS_JIACAN_LINK } from '@/data/url-config';
import { onMounted, ref, computed, watch } from 'vue';
import { useData, useRouter } from 'vitepress';
import { useI18n } from '@/i18n';
import BigShotData from '@/data/bigshot';

import BreadCrumbs from '@/components/BreadCrumbs.vue';
import AppContent from '@/components/AppContent.vue';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const pId = ref();
const paramId = ref();
const paramIndex = ref();
const paramTotal = ref();

const chapterInfo = ref({
  name: '',
  poster: '',
});

const getData = ref();

// 当前选中节点内容
const currentNode = ref({
  title: '',
  video: '',
  date: '',
});

const page = () => {
  const param = window.location.search.split('=')[1].split('-');
  pId.value = Number(param[0]);
  paramId.value = Number(param[1]);
  paramIndex.value = Number(param[2]);

  BigShotData.forEach((el) => {
    if (el.id === pId.value) {
      el.data.forEach((item, index) => {
        if (index === paramId.value) {
          getData.value = item;
          paramTotal.value = item.list.length;
          currentNode.value.video = dataList.value[paramIndex.value].videoUrl;
          currentNode.value.title = dataList.value[paramIndex.value].name;
          currentNode.value.date = dataList.value[paramIndex.value].desc;

          chapterInfo.value.name = item.title;
          chapterInfo.value.poster = item.poster;
        }
      });
    }
  });
};

const dataList = computed(() => {
  return getData.value?.list;
});

const changeVideo = (index: string | number) => {
  paramIndex.value = index;
  router.go(`/${lang.value}/bigshot-voice/detail/?id=${pId.value}-${paramId.value}-${index}`);
};
onMounted(() => {
  page();
});
watch(
  () => paramIndex.value,
  () => {
    page();
  }
);
</script>

<template>
  <AppContent>
    <BreadCrumbs :bread1="i18n.bigshot.title" :bread2="chapterInfo.name" :link1="`/${lang}/bigshot-voice/`" />
    <div class="page-tile">
      <h2>{{ chapterInfo.name }}</h2>
      <span class="num">{{ i18n.connect.VIDEO_TEXT1 }}{{ paramTotal }}{{ i18n.connect.VIDEO_TEXT }}</span>
    </div>
    <div class="video-content">
      <p class="text">{{ i18n.connect.LIST }}</p>
      <div class="info">
        <h3 class="title">{{ currentNode.title }}</h3>
        <p class="date">{{ currentNode.date }}</p>
      </div>
      <div class="video-detail">
        <div class="video-nav">
          <ul>
            <li v-for="(item, index) in dataList" :key="item.videoUrl" :class="{ active: index === paramIndex }" @click="changeVideo(index)">
              {{ item.name }}
            </li>
          </ul>
        </div>
        <div class="video-main">
          <video v-if="currentNode.video" :src="OBS_JIACAN_LINK + currentNode.video" :poster="chapterInfo.poster" autoplay controls style="width: 100%"></video>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.page-tile {
  margin: var(--o-spacing-h4) 0;
  display: flex;
  align-items: center;
  gap: 24px;
  h2 {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    font-weight: 100;
  }
  .num {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: #fff;
    background: var(--o-color-brand1);
    padding: 2px 10px;
  }
  @media screen and (max-width: 1100px) {
    display: block;
    h2 {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
      margin: 0 0 8px;
    }
  }
}
.video-content {
  background: var(--o-color-bg2);
  box-shadow: var(--o-shadow-l1);
  padding: 80px;
  .text {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    margin: 0 0 var(--o-spacing-h4);
  }
  .info {
    margin: 0 0 var(--o-spacing-h6);
    display: none;
    @media screen and (max-width: 1100px) {
      display: block;
    }
    .date {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-text4);
    }
    .title {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
      font-weight: 100;
    }
  }
  @media screen and (max-width: 1100px) {
    padding: 16px;
    .text {
      display: none;
    }
  }
}
.video-detail {
  display: flex;
  gap: 24px;
  justify-content: space-between;
  height: 500px;
  .video-nav {
    width: 360px;
    background: var(--o-color-bg3);
    height: 100%;
    ul {
      overflow: hidden auto;
      height: 100%;
      @include scrollbar;
      li {
        min-height: 56px;
        display: flex;
        align-items: center;
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        color: var(--o-color-text1);
        padding: 0 var(--o-spacing-h5);
        border-left: 2px solid transparent;
        cursor: pointer;
        transition: all 0.3s;
        &.active {
          background: var(--o-color-bg4);
          border-left-color: var(--o-color-brand1);
          color: var(--o-color-brand1);
        }
        @media screen and (max-width: 1100px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          min-height: inherit;
          display: block;
          padding: var(--o-spacing-h6);
        }
      }
    }
    @media screen and (max-width: 1100px) {
      height: 300px;
      width: 100%;
    }
  }
  .video-main {
    flex: 1;
    background: #000;
    video {
      height: 100%;
      width: 100%;
    }
    @media screen and (max-width: 1100px) {
      order: -1;
      video {
        min-height: 200px;
        object-fit: fill;
      }
    }
  }
  @media screen and (max-width: 1100px) {
    height: auto;
    flex-direction: column;
  }
}
</style>
