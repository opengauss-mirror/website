<script lang="ts" setup>
import { onMounted } from 'vue';
import { PropType, watch, nextTick } from 'vue';

interface TabItem {
  id: number;
  name: string;
}

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  tabData: {
    type: Array as PropType<TabItem[]>,
    default() {
      return [];
    },
  },
});

const emits = defineEmits(['update:modelValue']);

const scorllToActiveTab = () => {
  const container = document.body.querySelector('.video-tab');
  const dom = document.body.querySelector('.video-tab-item-active');
  if (container && dom) {
    container.scrollLeft = dom.getBoundingClientRect().left - 10;
  }
};

watch(
  () => props.modelValue,
  () => {
    nextTick(() => {
      scorllToActiveTab();
    });
  }
);

onMounted(() => {
  scorllToActiveTab();
});
</script>

<template>
  <div class="video-tab-container">
    <div class="mask-left"></div>
    <div class="video-tab">
      <div
        v-for="item in tabData"
        :key="item.id"
        class="video-tab-item"
        :class="{
          'video-tab-item-active': item.id === modelValue,
        }"
        @click="emits('update:modelValue', item.id)"
      >
        {{ item.name }}
      </div>
    </div>
    <div class="mask-right"></div>
  </div>
</template>

<style lang="scss" scoped>
.video-tab-container {
  position: relative;
  width: 100%;

  .video-tab {
    background-color: var(--e-color-bg2);
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 16px;
    overflow-x: auto;
    overflow-y: hidden;
    box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.1);
    scroll-behavior: smooth;

    @media screen and (max-width: 768px) {
      justify-content: flex-start;
    }

    .video-tab-item {
      flex-shrink: 0;
      display: flex;
      align-items: center;
      height: 48px;
      font-size: var(--e-font-size-h8);
      line-height: var(--e-line-height-h8);
      cursor: pointer;

      @media screen and (max-width: 1100px) {
        height: 32px;
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
      }
    }

    .video-tab-item:not(:last-child) {
      margin-right: 40px;
      @media screen and (max-width: 1100px) {
        margin-right: 20px;
      }
    }

    .video-tab-item-active {
      color: var(--e-color-brand1);
      border-bottom: 1px solid var(--e-color-brand1);
    }
  }

  .video-tab::-webkit-scrollbar {
    display: none;
  }

  .mask-left {
    --mask-bg-left: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 26px;
    background: var(--mask-bg-left);
  }

  .mask-right {
    --mask-bg-right: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 26px;
    background: var(--mask-bg-right);
  }
}

@include in-dark {
  .mask-left {
    --mask-bg-left: linear-gradient(-90deg, rgba(255, 255, 255, 0) 0%, #303030 100%);
  }

  .mask-right {
    --mask-bg-right: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #303030 100%);
  }
}
</style>
