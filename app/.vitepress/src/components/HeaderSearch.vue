<script setup lang="ts">
import { computed, ref } from 'vue';
import { useData } from 'vitepress';
import IconCancel from '~icons/app/icon-cancel.svg';

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
    type: Array,
    default: () => {
      return [];
    },
  },
  isShowDrawer: {
    type: Boolean,
    default: false,
  },
});
const { lang } = useData();
const emits = defineEmits(['click-close', 'focus-input']);
// const isShowDrawer = ref(false);
const searchInput = ref('');
// 搜索抽屉
const showDrawer = () => {
  if (props.isShowDrawer) {
    // isShowDrawer.value = true;
    emits('focus-input');
  }
};
const hiddenSearchBox = () => {
  emits('click-close');
};
// 搜索事件
function handleSearchEvent() {
  window.open(`${props.link}?search=${searchInput.value}`, '_self');
  hiddenSearchBox();
}
// 点击热搜标签
const onTopSearchItemClick = (val: any) => {
  searchInput.value = val;
  handleSearchEvent();
};
const topSearch = computed(() =>
  lang.value === 'zh' ? '热门搜索' : 'Top search'
);
</script>
<template>
  <div class="header-search">
    <div class="header-search-box">
      <OSearch
        v-model="searchInput"
        :placeholder="placeholder"
        @change="handleSearchEvent"
        @focus="showDrawer"
      >
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
          <OTag
            v-for="item in popList"
            :key="item"
            type="text"
            class="hots-list-item"
            @click="onTopSearchItemClick(item)"
            >{{ item }}</OTag
          >
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.header-search {
  position: relative;
  width: 900px;
  margin-left: var(--o-spacing-h2);
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
      color: var(--o-color-text1);
    }
  }
  .drawer {
    position: absolute;
    height: auto;
    width: 100%;
    margin-top: 21px;
    box-shadow: var(--o-shadow-l4);
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(5px);
    padding: var(--o-spacing-h3);
    @media (max-width: 1100px) {
      background: rgba(255, 255, 255, 1);
      backdrop-filter: blur(0px);
      margin-top: 8px;
      left: -16px;
      right: 0;
      width: 100vw;
      padding: var(--o-spacing-h5);
    }
    .hots {
      .hots-title {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        color: var(--o-color-text1);
      }
      .hots-list {
        .hots-list-item {
          margin-top: var(--o-spacing-h5);
          margin-right: var(--o-spacing-h5);
          background-color: var(--o-color-bg4);
          color: var(--o-color-text-secondary);
          cursor: pointer;
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
          @media (max-width: 768px) {
            margin-right: var(--o-spacing-h8);
          }
        }
      }
    }
  }
}
.dark {
  .drawer {
    background: rgba($color: #2e2e2e, $alpha: 0.9);
    @media screen and (max-width: 1439px) {
      background: rgba($color: #2e2e2e, $alpha: 1);
    }
  }
}
</style>
