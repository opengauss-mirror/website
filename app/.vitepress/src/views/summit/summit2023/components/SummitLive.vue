<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';
import useWindowResize from '@/components/hooks/useWindowResize';

import liveActiveBg from '../img/live-active.png';
import liveActiveBgLong from '../img/live-active-long.png';

interface RenderData {
  id: number;
  liveId: string;
  liveTestId: string;
  name: string;
}
const { lang } = useData();
const props = defineProps({
  liveData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
  className: {
    type: String,
    default: '',
  },
});
const screenWidth = useWindowResize();
const liveUrl = ref('');
const renderData: Array<RenderData> = props.liveData as any;
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  createLiveUrl(item.liveId);
};

function createLiveUrl(liveId: string) {
  liveUrl.value = `https://hwlive.263live.net/clv/live/login/${liveId}`;
}
const height = ref(screenWidth.value <= 1100 ? 600 : 800);
function setHeight(data: any) {
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
    if (data.data.liveRoomStatus === 2) {
      height.value = 600;
    } else {
      height.value = iframeWidth * (9 / 16);
    }
  } else {
    if (data.data.liveRoomStatus === 4) {
      height.value = iframeWidth * (9 / 16);
    } else {
      height.value = (iframeWidth - 360) * (9 / 16);
    }
  }
}
function messageEvent() {
  window.addEventListener(
    'message',
    function (event) {
      if (event.origin === 'https://hwlive.263live.net') {
        let data;
        data = event.data;
        setHeight(data);
      }
    },
    false
  );
}
onMounted(async () => {
  createLiveUrl(renderData[0].liveId);
  messageEvent();
});

// 背景
const ActiveBg = `url(${liveActiveBg})`;
const ActiveBgLong = `url(${liveActiveBgLong})`;

const liveRoom = ref(renderData[0].name);
watch(
  lang,
  () => {
    liveRoom.value = renderData[0].name;
  },
  {
    immediate: true,
  }
);
const changeLive = (val: string): void => {
  createLiveUrl(val);
};
</script>

<template>
  <div class="live-room">
    <ClientOnly>
      <div class="select-room">
        <OSelect v-model="liveRoom" clearable filterable @change="changeLive">
          <OOption
            v-for="item in renderData"
            :key="item.liveTestId"
            :label="item.name"
            :value="item.liveId"
          />
        </OSelect>
      </div>
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
        class="live-room-video"
      ></iframe>
      <div class="live-room-web">
        <div class="live-room-web-itembox" :class="className">
          <div
            v-for="(item, index) in renderData"
            :key="item.liveTestId"
            :class="[
              'link',
              roomId === index ? 'link-active' : '',
              index === 0 ? 'link-main' : ' ',
            ]"
            @click="setLiveRoom(item, index)"
          >
            <p class="name">{{ item.name }}</p>
          </div>
        </div>
      </div>
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.select-room {
  display: none;
  :deep(.o-select) {
    width: 100%;
    .el-input {
      height: 48px;
    }
  }
  @media (max-width: 1100px) {
    display: block;
  }
}
.live-room {
  margin-top: var(--o-spacing-h2);
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h4);
  }
  .live-room-video {
    margin-bottom: var(--o-spacing-h4);
    width: 100%;
    display: block;
    border: none;
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
    }
  }
  .live-room-web {
    display: block;
    @media (max-width: 1100px) {
      display: none;
    }
    .live-room-web-itembox {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      &.live-btn1 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        flex-direction: row;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        .link-main {
          grid-column: 1/5;
        }
      }
      &.live-btn2 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        width: 100%;
        .link-main {
          grid-column: 1/5;
        }
      }
      .link {
        flex: 1;
        padding: var(--o-spacing-h6) 0;
        cursor: pointer;
        background-color: var(--o-color-bg2);
        height: 88px;
        text-align: center;
        display: grid;
        align-items: center;
        border: 1px solid var(--o-color-brand1);
        p {
          color: var(--o-color-text1);
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
        }

        &:hover {
          box-shadow: var(--o-shadow-l2_hover);
        }
      }

      .link-active {
        background: v-bind('ActiveBg') no-repeat center/cover;
        p {
          color: #fff;
        }
      }
      .link-active.link-main {
        background: v-bind('ActiveBgLong') no-repeat center/cover;
      }
    }
  }
}
</style>
