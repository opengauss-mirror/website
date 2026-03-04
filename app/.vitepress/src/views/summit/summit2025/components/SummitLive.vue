<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useData } from 'vitepress';
import useWindowResize from '@/components/hooks/useWindowResize';
import { useScreen } from '@/shared/useScreen';

import { v4 as uniqueId } from 'uuid';

import floorImg from '../img/floor-img.png';

const { lang } = useData();

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

const { lePad } = useScreen();

const screenWidth = useWindowResize();
const liveUrl = ref('');
const renderData = props.liveData.list;
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  createLiveUrl(item.liveId as string);
};

const createUserId = () => {
  let userId = uniqueId();
  if (typeof window !== 'undefined' && localStorage.getItem('oa-openGauss-client')) {
    userId = JSON.parse(localStorage.getItem('oa-openGauss-client') || '')?.value?.id;
  }

  return userId;
};

const createLiveUrl = (liveId: string) => {
  liveUrl.value = `https://hw.vhallyun.com/v2/watch/${liveId}?lang=zh&landScape=true&thirdId=${createUserId()}`;
};

const height = ref(800);
const setHeight = (data: any) => {
  // data.state=0,直播未开始，1正在直播，2直播结束，3回放中
  // 注意pc端对面会传一个高度过来可以直接用，但是移动端不会传，所以要根据直播状态自己写

  if (lePad.value) {
    if (data.state === 1 || data.state === 3) {
      height.value = screenWidth.value * 1.31;
    } else if (data.state === 0 || data.state === 2) {
      height.value = screenWidth.value * 0.5;
    }
  } else {
    height.value = data.height ? parseInt(data.height) : 800;
  }
};

const messageEvent = () => {
  window.addEventListener(
    'message',
    function (event) {
      if (event.origin === 'https://hw.vhallyun.com') {
        let data = {
          state: '',
        };
        try {
          data = JSON.parse(event.data);
        } catch {
          data = event.data;
        }
        setHeight(data);
      }
    },
    false
  );
};

onMounted(async () => {
  createLiveUrl(renderData[0].liveId);
  messageEvent();
});

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
  <div class="summit-live">
    <div class="title-box">
      <p class="title-bg">{{ liveData.titleBg }}</p>
      <p class="title">{{ liveData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
    </div>
    <ClientOnly>
      <div class="select-room">
        <OSelect v-model="liveRoom" clearable filterable @change="changeLive">
          <OOption v-for="item in renderData" :key="item.liveTestId" :label="item.name" :value="item.liveId" />
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
        class="live-video"
      ></iframe>
      <div class="live-room-web">
        <div class="live-room-web-itembox live-btn">
          <div
            v-for="(item, index) in renderData"
            :key="item.liveTestId"
            :class="['link', roomId === index ? 'link-active' : '', index === 0 ? 'link-main' : ' ']"
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
  :deep(.e-select) {
    width: 100%;
    .el-input {
      height: 48px;
    }
  }
  @media (max-width: 1100px) {
    display: block;
    margin-top: var(--e-spacing-h5);
  }
}
.summit-live {
  margin-top: 44px;
  @media (max-width: 767px) {
    margin-top: 31px;
  }
  .live-video {
    margin-top: var(--e-spacing-h2);
    width: 100%;
    display: block;
    border: none;
    margin-bottom: var(--e-spacing-h4);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h6);
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
      &.live-btn {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px 32px;
        width: 100%;
        .link-main {
          grid-column: 1 / 4;
        }
      }
      .link {
        flex: 1;
        padding: var(--e-spacing-h6) 0;
        cursor: pointer;
        background-color: var(--e-color-bg2);
        height: 94px;
        text-align: center;
        display: grid;
        align-items: center;
        border-radius: 4px;
        p {
          color: var(--e-color-text1);
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h7);
        }

        &:hover {
          box-shadow: var(--e-shadow-l2_hover);
        }
      }

      .link-active {
        background-image: url('../img/live-active.jpg');
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        border: none;
      }
      .link-active.link-main {
        background-image: url('../img/live-active-long.png');
      }
    }
  }
}
@include in-dark {
  .summit-live .live-room-web .live-room-web-itembox {
    .link-active {
      background-image: url('../img/live-active-dark.jpg');
    }
    .link-active.link-main {
      background-image: url('../img/live-active-long-dark.jpg');
    }
  }
}
</style>
