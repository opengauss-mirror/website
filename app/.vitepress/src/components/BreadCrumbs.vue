<script setup lang="ts">
import { toRefs } from 'vue';
import IconChevronRight from '~icons/app/icon-chevron-right.svg';
const props = defineProps({
  bread1: {
    type: String,
    default: '',
  },
  bread2: {
    type: String,
    default: '',
  },
  link1: {
    type: String,
    default: '#',
  },
  link2: {
    type: String,
    default: '#',
  },
});
const { bread1, bread2, link1, link2 } = toRefs(props);
</script>
<template>
  <div class="bread-crumbs">
    <span>
      <a :href="link1" rel="noopener noreferrer">{{ bread1 }}</a>
    </span>
    <OIcon>
      <IconChevronRight />
    </OIcon>
    <span
      ><a :href="link2" :class="link2 === '#' ? 'no-click' : ''" rel="noopener noreferrer">{{ bread2 }}</a></span
    >
    <slot></slot>
  </div>
</template>
<style lang="scss" scoped>
.bread-crumbs {
  width: 100%;
  font-size: var(--e-font-size-tip);
  line-height: var(--e-line-height-tip);
  display: flex;
  align-items: center;
  span {
    display: inline-block;
  }
  span:nth-of-type(1) {
    a {
      color: var(--e-color-text4);
    }
  }
  span:nth-of-type(2) {
    margin: 0 4px;
    font-size: var(--e-font-size-h8);
  }
  span:nth-of-type(2),
  span:nth-of-type(3) {
    color: var(--e-color-text1);
    a {
      color: var(--e-color-text1);
    }
    .no-click {
      cursor: default;
    }
  }

  span:nth-of-type(3) {
    max-width: calc(100% - 80px);
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
}
</style>
