<script lang="ts" setup>
import { PropType, onMounted, onUnmounted, ref, nextTick } from 'vue';

interface NavItemT {
  key: string;
  name: string;
}

const props = defineProps({
  target: {
    type: Object as PropType<HTMLElement>,
    default: () => {},
  },
  list: {
    type: Array<NavItemT>,
    default: () => [],
  },
  currentIndex: {
    type: Number,
    default: 0,
  },
});

const emits = defineEmits(['update:currentIndex']);

const left = ref('0');
const top = ref('0');

const updatePosition = () => {
  if (props.target) {
    const rect = props.target.getBoundingClientRect();
    left.value = `${rect.left + rect.width + 24}px`;
    top.value = `${rect.top < 104 ? 104 : rect.top}px`;
  }
};

// 滚动到指定位置
let scrolling = false;
const scrollToTarget = (id: string) => {
  const el = document.body.querySelector(id) as HTMLElement;
  const { top } = el.getBoundingClientRect();
  const offsetTop = top - document.documentElement.clientTop;
  const scrollTop = window.scrollY;
  const y = scrollTop + offsetTop - 100;
  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};

const onClick = (index: number, key: string) => {
  scrolling = true;
  emits('update:currentIndex', index);
  scrollToTarget(`#${key}`);
  setTimeout(() => {
    scrolling = false;
  }, 1);
};

// 滚动激活导航
const onScrollTop = () => {
  updatePosition();

  if (scrolling) {
    return;
  }

  const scrollTop =
    document.body.scrollTop || document.documentElement.scrollTop;
  const activeList: Array<number> = [];
  props.list.forEach((item: NavItemT, index: number) => {
    const el = document.body.querySelector(`#${item.key}`) as HTMLElement;
    if (el && scrollTop + 200 > el.offsetTop) {
      activeList.push(index);
    }
  });

  emits('update:currentIndex', activeList[activeList.length - 1]);
};

// 窗口位置变化
const onResize = () => {
  updatePosition();
};

// 监听/移除事件
onMounted(() => {
  window.addEventListener('scroll', onScrollTop);
  window.addEventListener('resize', onResize);
  nextTick(() => {
    updatePosition();
  });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScrollTop);
  window.removeEventListener('resize', onResize);
});
</script>

<template>
  <ul class="title-nav">
    <li
      v-for="(item, index) in list"
      :key="index"
      :class="index === currentIndex ? 'active' : ''"
      @click="onClick(index, item.key)"
    >
      <a rel="noopener noreferrer">
        {{ item.name }}
      </a>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.title-nav {
  position: fixed;
  cursor: pointer;
  left: v-bind(left);
  top: v-bind(top);
  z-index: 2;
  display: block;
  @media screen and (max-width: 1800px) {
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
