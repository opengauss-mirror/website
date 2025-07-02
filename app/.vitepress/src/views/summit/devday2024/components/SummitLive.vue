<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';

import time from '../img/time.svg';
import timeDark from '../img/time-dark.svg';
import liveActiveBg from '../img/live-active.jpg';
import liveActiveDarkBg from '../img/live-active-dark.jpg';

interface RenderData {
  id?: number;
  liveId?: string;
  liveTestId?: string;
  name?: string;
  date?: string;
  time?: string;
}

const props = defineProps({
  liveData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const screenWidth = useWindowResize();
const liveUrl = ref('');
const renderData = props.liveData.list;
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  createLiveUrl(item.liveId as string);
};

const createLiveUrl = (liveId: string) => {
  liveUrl.value = `https://hwlive.263live.net/clv/live/login/${liveId}`;
};

const height = ref(screenWidth.value <= 1100 ? 600 : 800);
const setHeight = (data: any) => {
  // 响应式尺寸要去除左右两边的padding
  let iframeWidth = 1416;
  if (screenWidth.value >= 1504) {
    iframeWidth = 1416;
  } else if (screenWidth.value >= 1440) {
    iframeWidth = screenWidth.value - 88;
  } else if (screenWidth.value >= 1100) {
    iframeWidth = screenWidth.value - 48;
  } else {
    iframeWidth = screenWidth.value - 32;
  }
  // data.state=0,1直播未开始,2直播中，4直播已结束
  if (screenWidth.value <= 1100) {
    if (data?.data?.liveRoomStatus === 2) {
      height.value = 600;
    } else {
      height.value = iframeWidth * (9 / 16);
    }
  } else {
    if (data?.data?.liveRoomStatus === 4) {
      height.value = iframeWidth * (9 / 16);
    } else {
      height.value = (iframeWidth - 360) * (9 / 16);
    }
  }
};

const messageEvent = () => {
  window.addEventListener(
    'message',
    (event) => {
      if (event.origin === 'https://hwlive.263live.net') {
        let data;
        data = event.data;
        if (data.eventType === 'is_iframe_resize') {
          setHeight(data);
        }
      }
    },
    false
  );
};

onMounted(async () => {
  createLiveUrl(renderData[0].liveId);
  messageEvent();
});

// 背景
const ActiveBg = `url(${liveActiveBg})`;
const ActiveBgDark = `url(${liveActiveDarkBg})`;
</script>

<template>
  <div class="summit-live">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ liveData.titleBg }}</p>
      <p class="title">{{ liveData.title }}</p>
    </div>
    <ClientOnly>
      <iframe
        ref="livePage"
        :height="height"
        allow="camera *;microphone *;"
        border="0"
        scolling="no"
        :src="liveUrl"
        allowfullscreen="true"
        webkitallowfullscreen="true"
        mozallowfullscreen="true"
        class="live-video"
      ></iframe>
      <div class="live-tab">
        <div class="live-tab-itembox">
          <div
            v-for="(item, index) in renderData"
            :key="item.liveTestId"
            :class="['link', roomId === index ? 'link-active' : '', index === 0 ? 'link-main' : ' ', !isLight ? 'link-dark' : 'link-light']"
            @click="setLiveRoom(item, index)"
          >
            <p class="name">{{ item.name }}</p>
            <div class="bottom">
              <span class="date"
                ><img :src="isLight ? time : timeDark" /><span>{{ item.date }}</span></span
              >
              <span class="time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.summit-live {
  margin-bottom: 44px;
  @media (max-width: 767px) {
    margin-bottom: 31px;
  }
  .live-video {
    margin-top: var(--e-spacing-h2);
    width: 100%;
    display: block;
    border: none;
  }
  .live-tab {
    .live-tab-itembox {
      width: 100%;
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
      margin-top: 24px;
      .link-main {
        grid-column: 1/3;
      }
      .link {
        flex: 1;
        padding: var(--e-spacing-h5) var(--e-spacing-h4);
        cursor: pointer;
        background-color: var(--e-color-bg2);
        display: grid;
        align-items: center;
        p {
          color: var(--e-color-text1);
          font-size: 22px;
          line-height: 30px;
        }
        .bottom {
          display: flex;
          align-items: center;
          font-size: var(--e-font-size-h8);
          color: var(--e-color-text1);
          line-height: var(--e-line-height-h8);
          font-weight: 400;
          margin-top: 6px;
          .date {
            display: flex;
            align-items: center;
            img {
              width: 16px;
              margin-right: 8px;
            }
            span {
              margin-top: 2px;
            }
          }
          .time {
            margin-left: var(--e-spacing-h2);
          }
        }

        &:hover {
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.1);
        }
      }

      .link-active {
        p {
          color: var(--e-color-brand1);
        }
      }
      .link-dark {
        &.link-active {
          background: v-bind('ActiveBgDark') no-repeat right/contain;
          background-color: var(--e-color-bg2);
        }
      }
      .link-light {
        &.link-active {
          background: v-bind('ActiveBg') no-repeat right/contain;
          background-color: var(--e-color-bg2);
        }
      }
    }
  }
  @media (max-width: 1100px) {
    .live-tab {
      .live-tab-itembox {
        grid-template-columns: repeat(1, 1fr);
        gap: 12px;
        margin-top: 12px;
        .link-main {
          grid-column: 1/1;
        }
        .link {
          padding: var(--e-spacing-h6) var(--e-spacing-h6);
          p {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
          .bottom {
            font-size: 10px;
            line-height: 16px;
            .date {
              img {
                width: 12px;
                margin-right: 4px;
              }
            }
            .time {
              margin-left: var(--e-spacing-h4);
            }
          }
        }
        .link-dark {
          &.link-active {
            background-size: cover;
          }
        }
        .link-light {
          &.link-active {
            background-size: cover;
          }
        }
      }
    }
  }
}
</style>
