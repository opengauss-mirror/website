<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import IconCancel from '~icons/app/icon-cancel.svg';

import { windowOpen } from '@/shared/utils';

const props = defineProps({
  placeholder: {
    type: String,
    default: '',
  },
  link: {
    type: String,
    default: '',
  },
  popList: {
    type: Array<string>,
    default: () => {
      return [''];
    },
  },
  isShowDrawer: {
    type: Boolean,
    default: false,
  },
});
const { lang } = useData();
const emits = defineEmits(['close', 'focus-input']);
const searchInput = ref('');
// 搜索抽屉
const showDrawer = () => {
  if (props.isShowDrawer) {
    emits('focus-input');
  }
};
const hiddenSearchBox = () => {
  emits('close');
};
// 搜索事件
function handleSearchEvent() {
  windowOpen(`${props.link}?q=${encodeURIComponent(searchInput.value)}`, '_self');
  hiddenSearchBox();
}
// 点击热搜标签
const onTopSearchItemClick = (val: string) => {
  searchInput.value = val;
  handleSearchEvent();
};
const topSearch = computed(() => (lang.value === 'zh' ? '热门搜索' : 'Top search'));
</script>
<template>
  <div class="header-search">
    <div class="header-search-box">
      <OSearch v-model="searchInput" :placeholder="placeholder" @change="handleSearchEvent" @focus="showDrawer">
        <template #suffix>
          <OIcon class="close" @click="hiddenSearchBox"><IconCancel /></OIcon>
        </template>
      </OSearch>
    </div>
    <div v-show="isShowDrawer" class="drawer">
      <div class="hots">
        <div class="hots-title">
          <p class="hots-text">{{ topSearch }}</p>
        </div>
        <div class="hots-list">
          <OTag v-for="item in popList" :key="item" type="text" class="hots-list-item" @click="onTopSearchItemClick(item)">{{ item }}</OTag>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-search {
  position: relative;
  width: 900px;
  margin-left: var(--e-spacing-h2);
  @media (max-width: 1100px) {
    :deep(.o-search) {
      --o-search-height: 28px;
    }
    margin-left: 0;
    z-index: 2;
    position: fixed;
    width: calc(100vw - 32px);
    left: 16px;
    right: 16px;
  }

  .header-search-box {
    .close {
      cursor: pointer;
      color: var(--e-color-text1);
    }
  }
  .drawer {
    position: absolute;
    height: auto;
    width: 100%;
    margin-top: 21px;
    box-shadow: var(--e-shadow-l4);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    padding: var(--e-spacing-h3);
    @media (max-width: 1100px) {
      background: rgba(255, 255, 255, 1);
      backdrop-filter: blur(0px);
      margin-top: 8px;
      left: -16px;
      right: 0;
      width: 100vw;
      padding: var(--e-spacing-h5);
    }
    .hots {
      .hots-title {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
        color: var(--e-color-text1);
      }
      .hots-list {
        .hots-list-item {
          margin-top: var(--e-spacing-h5);
          margin-right: var(--e-spacing-h5);
          background-color: var(--e-color-bg4);
          color: var(--e-color-text-secondary);
          cursor: pointer;
          @media (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
          @media (max-width: 768px) {
            margin-right: var(--e-spacing-h8);
          }
        }
      }
    }
  }
}
@include in-dark {
  .drawer {
    background: rgba($color: #2e2e2e, $alpha: 0.9);
    @media screen and (max-width: 1439px) {
      background: rgba($color: #2e2e2e, $alpha: 1);
    }
  }
}
</style>
