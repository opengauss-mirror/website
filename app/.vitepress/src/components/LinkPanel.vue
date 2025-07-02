<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import { useData } from 'vitepress';

interface linkListItemT {
  img: string;
  imgDark: string;
  name: string;
  path?: string;
  pathEn?: string;
}
const props = withDefaults(
  defineProps<{
    linkList: linkListItemT[];
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
</script>

<template>
  <div class="picture-panel">
    <template v-for="(item, index) in props.linkList" :key="index">
      <a
        v-if="props.islink"
        :class="[props.islink ? 'link-item path' : 'link-item']"
        :href="isZh ? item.path : item.pathEn"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img :src="isLight ? item.img : item.imgDark" :alt="item.name" />
      </a>
      <div v-else class="link-item">
        <img :src="isLight ? item.img : item.imgDark" :alt="item.name" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
.picture-panel {
  display: grid;
  padding-top: var(--e-spacing-h4);
  grid-template-columns: repeat(v-bind('props.row'), minmax(82px, 1fr));
  column-gap: 0;
  row-gap: 0;
  .link-item {
    display: flex;
    margin: 0px -2px -2px 0px;
    justify-content: center;
    align-items: center;
    border: 1px solid var(--e-color-division1);
    background-color: var(--e-color-bg2);
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
  @media screen and (max-width: 1100px) {
    padding-top: 0;
    grid-template-columns: repeat(v-bind('(props.row)-1'), minmax(82px, 1fr));
    justify-content: center;
    .link-item {
      min-height: 40px;
      img {
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(v-bind('(props.row)-2'), minmax(82px, 1fr));
  }
}
</style>
