<script lang="ts" setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import agendaBg from '../img/agenda-bg.jpg';
import agendaBgDark from '../img/agenda-bg-dark.jpg';
import mainForumBg from '../img/main-forum.png';
import mainForumBgDark from '../img/main-forum-dark.png';
import time from '../img/time.svg';
import timeDark from '../img/time-dark.svg';
defineProps({
  options: {
    type: Object,
    default() {
      return {};
    },
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
</script>

<template>
  <div class="date-list">
    <div v-for="(subitem, i) in options" :key="i" class="data-item">
      <p class="type">{{ subitem.type }}</p>
      <template v-if="!subitem.time">
        <div v-for="(child, j) in subitem.children" :key="j" class="child-item" :style="{ backgroundImage: `url(${isLight ? agendaBg : agendaBgDark})` }">
          <p class="title">{{ child.title }}</p>
          <div class="bottom">
            <span class="date"><img :src="isLight ? time : timeDark" /><span>{{ child.date }}</span></span>
            <span class="time">{{ child.time }}</span>
          </div>
        </div>
      </template>
      <template v-else>
        <ul class="father-am" :style="{ backgroundImage: `url(${isLight ? mainForumBg : mainForumBgDark})` }">
          <li v-for="(child, j) in subitem.children" :key="j" class="child-item">
            <p class="title">{{ child.title }}</p>
            <div class="bottom">
              <span class="date"><img :src="isLight ? time : timeDark" /><span>{{ child.date }}</span></span>
              <span class="time">{{ child.time }}</span>
            </div>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.data-item {
  margin: var(--o-spacing-h2) 0 0 var(--o-spacing-h3);
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: calc(100% + var(--o-spacing-h2));
    top: 18px;
    left: -25px;
    background-color: var(--o-color-brand1);
  }
  &:last-of-type {
    &::before {
      display: none;
    }
  }
  @media (max-width: 767px) {
    margin: var(--o-spacing-h4) 0 0 18px;
    &::before {
      width: 2px;
      height: calc(100% + var(--o-spacing-h4));
      top: 15px;
      left: -14px;
    }
    &:first-of-type {
      margin: var(--o-spacing-h5) 0 0 18px;
    }
  }
}
.type {
  width: 500px;
  background-image: linear-gradient(270deg, rgba(180,97,246,0.00) 2%, var(--o-color-brand1) 100%);
  padding: var(--o-spacing-h10) var(--o-spacing-h6);
  font-size: var(--o-font-size-h6);
  color: var(--o-color-text2);
  line-height: var(--o-line-height-h6);
  font-weight: 500;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    top: 10px;
    left: -32px;
    background-color: var(--o-color-brand1);
  }
  @media (max-width: 767px) {
    width: 100%;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    &::before {
      width: 10px;
      height: 10px;
      top: 10px;
      left: -18px;
    }
  }
}
.child-item {
  width: 100%;
  padding: var(--o-spacing-h4);
  margin-top: var(--o-spacing-h5);
  height: 100%;
  background: no-repeat right/cover;
  .title {
    font-size: 22px;
    color: var(--o-color-text1);
    line-height: 30px;
    font-weight: 500;
    margin-left: 14px;
    position: relative;
    &::before {
      content: '';
      position: absolute;
      width: 6px;
      height: 22px;
      border-radius: 3px;
      top: 4px;
      left: -14px;
      background-color: var(--o-color-brand1);
    }
  }
  .bottom {
    display: flex;
    align-items: center;
    font-size: var(--o-font-size-h8);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h8);
    font-weight: 400;
    margin-top: var(--o-spacing-h4);
    .date {
      display: flex;
      align-items: center;
      img {
        width: 16px;
        margin-right: 8px;
      }
      span {
        margin-top: 2px;
      }
    }
    .time {
      margin-left: var(--o-spacing-h2);
    }
  }
  @media (max-width: 767px) {
    padding: var(--o-spacing-h6);
    .title {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-left: 6px;
      &::before {
        content: '';
        width: 2px;
        height: 12px;
        border-radius: 2px;
        top: 3px;
        left: -6px;
      }
    }
    .bottom {
      font-size: 10px;
      line-height: 16px;
      margin-top: var(--o-spacing-h8);
      .date {
        img {
          width: 12px;
          height: 12px;
          margin-right: var(--o-spacing-h10);
        }
        span {
          margin-top: 0;
        }
      }
      .time {
        margin-left: var(--o-spacing-h4);
      }
    }
  }
}

.father-am {
  margin-top: var(--o-spacing-h5);
  padding: 0 var(--o-spacing-h4);
  width: 100%;
  height: 100%;
  background: no-repeat right/cover;
  background-color: var(--o-color-bg2);
  .child-item {
    margin-top: 0;
    padding: var(--o-spacing-h4) 0;
    position: relative;
    &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 1px;
      left: 0;
      bottom: 0;
      background-color: var(--o-color-division1);
    }
    &:last-of-type {
      &::after {
        display: none;
      }
    }
  }
  @media (max-width: 767px) {
    padding: 0 var(--o-spacing-h6);
    .child-item {
      padding: var(--o-spacing-h6) 0;
    }
  }
}
</style>
