<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { useCommon } from '@/stores/common';
import useWindowResize from '@/components/hooks/useWindowResize';
import { useScreen } from '@/shared/useScreen';

import { VHALLYUN_URL } from '@/data/url-config';

import floorImg from '../img/floor-img.png';

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

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const screenWidth = useWindowResize();
const liveUrl = ref('');
const renderData = props.liveData.list;

const createLiveUrl = (liveId: string) => {
  liveUrl.value = `${VHALLYUN_URL}/v2/embed/${liveId}?embed=video&lang=zh&thirdId=`;
};

const height = ref(800);
const setHeight = (data: any) => {
  if (lePad.value) {
    height.value = (screenWidth.value - 32) * (9 / 16);
  } else {
    height.value = data.height ? parseInt(data.height) : 800;
  }
};

const messageEvent = () => {
  window.addEventListener(
    'message',
    function (event) {
      if (event.origin === VHALLYUN_URL) {
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
  createLiveUrl(renderData[0].liveId);
  messageEvent();
});
</script>

<template>
  <div id="live" class="summit-live">
    <div class="title-box" :class="{ 'title-box-dark': !isLight }">
      <p class="title-bg">{{ liveData.titleBg }}</p>
      <p class="title">{{ liveData.title }}</p>
      <img class="floor-img" :src="floorImg" alt="" />
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
    </ClientOnly>
  </div>
</template>

<style scoped lang="scss">
.summit-live {
  margin-top: 72px;
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h3);
  }
  .live-video {
    margin-top: var(--e-spacing-h2);
    width: 100%;
    display: block;
    border: none;
    @media (max-width: 767px) {
      margin-top: var(--e-spacing-h4);
    }
  }
}
</style>
