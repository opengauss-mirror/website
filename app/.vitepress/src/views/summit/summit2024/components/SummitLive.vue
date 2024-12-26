<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue';
import { useData } from 'vitepress';
import useWindowResize from '@/components/hooks/useWindowResize';
import { useScreen } from '@/shared/useScreen';

import liveActiveBg from '../img/live-active.jpg';
import liveActiveBgLong from '../img/live-active-long.jpg';

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
const isTest = ref(false);
const liveUrl = ref('');
const renderData = props.liveData.list;
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  createUserId((isTest.value ? item.liveTestId : item.liveId) as string);
};

const createUserId = (liveId: string) => {
  let returnId = '';
  let userName = '';
  if (localStorage.getItem('live-user-name')) {
    userName = localStorage.getItem('live-user-name') || '';
  } else {
    let digit = Math.round(Math.random() * 10);
    digit > 3 ? digit : (digit = 3);

    const charStr =
      '0123456789@#$%&~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    for (let i = 0; i < digit; i++) {
      const index = Math.round(Math.random() * (charStr.length - 1));
      returnId += charStr.substring(index, index + 1);
    }
    userName = returnId;
    localStorage.setItem('live-user-name', userName);
  }

  liveUrl.value = `https://hw.vhallyun.com/v2/watch/${liveId}?lang=zh&thirdId=${userName}&landScape=true`;
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
        } catch (e) {
          data = event.data;
        }
        setHeight(data);
      }
    },
    false
  );
};

onMounted(async () => {
  isTest.value =
    window.location.host.includes('test.osinfra') ||
    window.location.host.includes('localhost');
  createUserId(isTest.value ? renderData[0].liveTestId : renderData[0].liveId);
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
  createUserId(val);
};
</script>

<template>
  <div class="summit-live">
    <div class="title-box">
      <p class="title">{{ liveData.title }}</p>
    </div>
    <ClientOnly>
      <div class="select-room">
        <OSelect v-model="liveRoom" clearable filterable @change="changeLive">
          <OOption
            v-for="item in renderData"
            :key="item.liveTestId"
            :label="item.name"
            :value="isTest ? item.liveTestId : item.liveId"
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
        class="live-video"
      ></iframe>
      <div class="live-room-web">
        <div class="live-room-web-itembox live-btn">
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
    margin-top: var(--o-spacing-h5);
  }
}
.summit-live {
  margin-top: 44px;
  @media (max-width: 767px) {
    margin-top: 31px;
  }
  .live-video {
    margin-top: var(--o-spacing-h2);
    width: 100%;
    display: block;
    border: none;
    margin-bottom: var(--o-spacing-h4);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h6);
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
        grid-template-columns: repeat(2, 1fr);
        gap: 24px 32px;
        width: 100%;
        .link-main {
          grid-column: 1/3;
        }
      }
      .link {
        flex: 1;
        padding: var(--o-spacing-h6) 0;
        cursor: pointer;
        background-color: var(--o-color-bg2);
        height: 94px;
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
        border: none;
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
@include in-dark {
  .link-active {
    @include img-in-dark;
  }
}
</style>
