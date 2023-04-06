<script lang="ts" setup>
import { computed, ref } from 'vue';
import IconArrowTraingleRight from '~icons/app/icon-arrow-traingle-right.svg';

const props = defineProps({
  info: {
    type: Object,
    default: () => {
      return {};
    },
  },
  activeId: {
    type: String,
    default: '',
  },
});

const isActive = computed(() => {
  return props.info.children.some((item: any) => {
    return item.link === props.activeId;
  });
});

const isOpen = ref(isActive.value);

const emit = defineEmits(['item-click']);

const toggleVisible = (flag: boolean | undefined) => {
  if (flag === undefined) {
    isOpen.value = !isOpen.value;
  } else {
    isOpen.value = flag;
  }
};
// 导航点击事件
const clickMenuItem = (id: string) => {
  emit('item-click', id);
};

const beforeEnter = (el: HTMLUListElement) => {
  el.style.height = '0px';
};
const enter = (el: HTMLUListElement) => {
  const height = el.scrollHeight;
  el.style.height = `${height}px`;
};
const beforeLeave = (el: HTMLUListElement) => {
  el.style.height = `${el.offsetHeight}px`;
};
const leave = (el: HTMLUListElement) => {
  el.style.height = '0px';
};
</script>

<template>
  <div class="sidebar-menu">
    <div
      class="menu-title"
      :class="{ open: isOpen, active: isActive }"
      @click="toggleVisible(!isOpen)"
    >
      {{ info.label }}
      <OIcon class="menu-title-icon"> <IconArrowTraingleRight /></OIcon>
    </div>
    <transition
      name="menu"
      @before-enter="beforeEnter"
      @enter="enter"
      @before-leave="beforeLeave"
      @leave="leave"
    >
      <ul v-show="isOpen" class="menu-list">
        <li
          v-for="item in info.children"
          :key="item.link"
          class="menu-item"
          :class="{ active: activeId === item.link }"
          @click="clickMenuItem(item.link)"
        >
          {{ item.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style lang="scss" scoped>
.sidebar-menu {
  position: relative;
  color: var(--o-color-white);

  .menu-title {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 40px;
    font-size: var(--o-font-size-text);
    height: 70px;
    line-height: 70px;
    cursor: pointer;

    &::before {
      position: absolute;
      top: 0;
      width: calc(100% - 80px);
      height: 1px;
      // background-color: #e5e5e5;
      background-color: #ffffff;
      opacity: 0.1;
      content: '';
    }

    &-icon {
      font-size: var(--o-font-size-h5);
      transform: rotate(0);
      transition: 0.3s transform cubic-bezier(0.645, 0.045, 0.355, 1);
    }

    &:hover {
      color: var(--o-color-yellow5);
    }

    &.active {
      color: var(--o-color-yellow5);
    }

    &.open {
      .menu-title-icon {
        transform: rotate(90deg);
      }
    }
  }

  .menu-list {
    overflow-y: hidden;
    transition: 0.3s height cubic-bezier(0.645, 0.045, 0.355, 1);
    background-color: var(--o-color-kleinblue4);
    padding: 0 40px;

    .menu-item {
      display: flex;
      align-items: center;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      cursor: pointer;

      &:first-child {
        margin-top: 32px;
      }

      &:last-child {
        margin-bottom: 32px;
      }

      & + .menu-item {
        margin-top: var(--o-spacing-h4);
      }

      &:hover {
        color: var(--o-color-yellow5);
      }

      &.active {
        color: var(--o-color-yellow5);
      }
    }
  }
}
</style>
