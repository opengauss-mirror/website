<script setup lang="ts">
import { ref, onMounted } from 'vue';
import AOS from 'aos';

import liveActiveBg from '@/assets/category/summit/live-active-bg.png';

interface RENDERDATA {
  ID: number;
  LIVEID: number;
  LIVETESTID: number;
  NAME: string;
}

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
const isTest = ref(false);
const liveUrl = ref('');
const renderData: Array<RENDERDATA> = props.liveData as any;
const roomId = ref(0);
const tabLiveRoom = (item: RENDERDATA, index: number): void => {
  roomId.value = index;
  creatUserId(isTest.value ? item.LIVETESTID : item.LIVEID);
};

function creatUserId(liveId: number) {
  let digit = Math.round(Math.random() * 10);
  digit > 3 ? digit : (digit = 3);

  let returnId = '',
    userName = '';
  const charStr =
    '0123456789@#$%&~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  for (let i = 0; i < digit; i++) {
    const index = Math.round(Math.random() * (charStr.length - 1));
    returnId += charStr.substring(index, index + 1);
  }
  userName = returnId;
  liveUrl.value = `https://vhall.huawei.com/v2/watch/${liveId}?lang=zh&thirdId=${userName}`;
}
onMounted(async () => {
  AOS.init({
    offset: 200,
    duration: 800,
    delay: 100,
  });
  isTest.value = window.location.host.includes('test.osinfra');
  creatUserId(isTest.value ? renderData[0].LIVETESTID : renderData[0].LIVEID);
});

// 背景
const activeBg = `url(${liveActiveBg})`;

const liveRoom = ref(
  isTest.value ? renderData[0].LIVETESTID : renderData[0].LIVEID
);
const selectliveChange = (val: number): void => {
  creatUserId(val);
};
</script>

<template>
  <div class="live-room">
    <div class="select-room">
      <OSelect
        v-model="liveRoom"
        clearable
        filterable
        @change="selectliveChange"
      >
        <OOption
          v-for="item in renderData"
          :key="item.ID"
          :label="item.NAME"
          :value="isTest ? item.LIVETESTID : item.LIVEID"
        />
      </OSelect>
    </div>
    <iframe
      ref="livePage"
      height="740"
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
          :key="item.ID"
          :class="[
            'link',
            roomId === index ? 'link-active' : '',
            index === 0 ? 'link-main' : ' ',
          ]"
          @click="tabLiveRoom(item, index)"
        >
          <p class="name">{{ item.NAME }}</p>
          <p v-if="className === 'odd2022' && index !== 0" class="sub">
            分论坛
          </p>
        </div>
      </div>
    </div>
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
  &-video {
    margin-bottom: var(--o-spacing-h4);
    width: 100%;
    display: block;
    border: none;
    @media (max-width: 780px) {
      margin-top: var(--o-spacing-h5);
    }
  }
  &-web {
    display: block;
    @media (max-width: 1100px) {
      display: none;
    }
    &-itembox {
      display: flex;
      flex-direction: row;
      width: 100%;
      flex-wrap: wrap;
      justify-content: space-between;
      &.odd2022 {
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
      &.odd2021 {
        display: grid;
        grid-template-columns: 300px 1fr 300px;
        grid-template-areas: 'a b c';
        gap: 16px;
        width: 100%;
        .link-main {
          grid-area: b;
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
        border-radius: 2px;
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
        background: v-bind('activeBg') no-repeat center/cover;
        p {
          color: #fff;
        }
      }
    }
  }
}
</style>
