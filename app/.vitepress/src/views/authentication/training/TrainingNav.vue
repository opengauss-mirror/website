<script lang="ts" setup>
import { toRefs } from 'vue';
const props = defineProps({
  currentIndex: {
    type: Number,
    default: NaN,
  },
  dataList: {
    type: Array,
    default: () => [],
  },
});
const { currentIndex, dataList } = toRefs(props);
</script>

<template>
  <ul class="title-nav">
    <li
      v-for="(item, index) in dataList"
      :key="index"
      :class="+index === currentIndex ? 'active' : ''"
    >
      <a :href="item.key">
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scpoed>
.title-nav {
  position: fixed;
  cursor: pointer;
  top: 148px;
  right: 100px;
  z-index: 1000;
  display: block;
  @media screen and (max-width: 1880px) {
    display: none;
  }
  li {
    width: 100%;
    padding: 8px 16px;
    border-left: 1px solid var(--o-color-border2);
    a {
      color: var(--o-color-text4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .active {
    border-left: 1px solid var(--o-color-brand1);
    a {
      color: var(--o-color-brand1);
    }
  }
}
</style>
