<script setup lang="ts">
import { ref, onMounted } from 'vue';
import liveActiveBg from '../img/active-bg1.png';

interface RenderData {
  id: number;
  liveId: number;
  liveTestId: number;
  videoLink: string;
  name: string;
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
const liveUrl = ref('');
function setLiveUrl(link: string) {
  liveUrl.value = link;
}
const renderData: Array<RenderData> = props.liveData as any;
const roomId = ref(0);
const setLiveRoom = (item: RenderData, index: number): void => {
  roomId.value = index;
  setLiveUrl(item.videoLink);
};

onMounted(async () => {
  setLiveUrl(renderData[0].videoLink);
});

// 背景
const ActiveBg = `url(${liveActiveBg})`;

const liveRoom = ref(renderData[0].name);
const changeLive = (val: string): void => {
  setLiveUrl(val);
};
</script>

<template>
  <div class="live-room">
    <div class="select-room">
      <OSelect v-model="liveRoom" filterable @change="changeLive">
        <OOption
          v-for="item in renderData"
          :key="item.id"
          :label="item.name"
          :value="item.videoLink"
        />
      </OSelect>
    </div>
    <video :src="liveUrl" class="live-room-video" controls></video>
    <div class="live-room-web">
      <div class="live-room-web-itembox" :class="className">
        <div
          v-for="(item, index) in renderData"
          :key="item.id"
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
      &.odd-box {
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
          color: #000;
        }
      }
      .link-active.link-main {
        background: v-bind('ActiveBg') no-repeat center/cover;
      }
    }
  }
}
</style>
