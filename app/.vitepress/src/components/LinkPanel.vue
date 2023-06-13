<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import { useData } from 'vitepress';

const props = withDefaults(
  defineProps<{
    linkList: any[];
    row?: number;
    islink: boolean;
  }>(),
  {
    row: 4,
    islink: true,
  }
);
const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
const { lang } = useData();
const isZh = computed(() => (lang.value === 'zh' ? true : false));

const handerClick = (item: any) => {
  if (props.islink) {
    const path = isZh.value ? item.PATH : item.PATH_EN;
    window.open(path, '_blank');
  }
};
</script>

<template>
  <div class="picture-panel">
    <div
      v-for="(item, index) in props.linkList"
      :key="index"
      :class="[props.islink ? 'link-item path' : 'link-item']"
      @click="handerClick(item)"
    >
      <img :src="isLight ? item.IMG : item.DARK" :alt="item.NAME" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.picture-panel {
  display: grid;
  padding-top: var(--o-spacing-h4);
  grid-template-columns: repeat(v-bind('props.row'), minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  .link-item {
    display: flex;
    margin: 0px -2px -2px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--o-color-division1);
    background-color: var(--o-color-bg2);
    max-height: 120px;
    overflow: hidden;
    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    &.path {
      cursor: pointer;
    }
  }
  @media screen and (max-width: 1416px) {
    padding-top: 0;
    grid-template-columns: repeat(v-bind('(props.row)-1'), minmax(82px, 270px));
    justify-content: center;
    .link-item {
      min-height: 40px;
      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(v-bind('(props.row)-2'), minmax(82px, 270px));
  }
}
</style>
