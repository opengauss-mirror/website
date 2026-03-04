<script lang="ts" setup>
import { computed } from 'vue';
import { useCommon } from '@/stores/common';

import time from '../img/time.svg';
import timeDark from '../img/time-dark.svg';
import cardBg from '../img/card-bg.png';

defineProps({
  agendaData: {
    type: Object,
    required: true,
    default: () => {
      return {
        title: '',
        content: [],
      };
    },
  },
});

const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const onButtonClick = (href: string) => {
  window.open(href, '_blank');
};
</script>

<template>
  <div class="schedule">
    <div class="type">{{ agendaData.title }}</div>
    <div class="schedule-content" :style="{ backgroundImage: `url(${cardBg})` }">
      <div v-for="subItem in agendaData.content" :key="subItem.time" class="schedule-item" :class="{ 'schedule-item-list': !subItem.desc }">
        <span class="time">
          <img :src="isLight ? time : timeDark" />
          {{ subItem.time }}
        </span>
        <span v-if="subItem.desc" class="desc">
          <span v-for="item in subItem.desc.split('\n')" :key="item + '1'">{{ item }}</span>
        </span>
        <div v-if="subItem.person[0]" class="name-box">
          <div v-for="personItem in subItem.person" :key="personItem.name">
            <span class="name">
              {{ personItem.name }}
            </span>
            <span v-if="personItem.post" class="post">
              <div v-for="item in personItem.post.split('\n')" :key="item">
                {{ item }}
              </div>
            </span>
          </div>
        </div>
        <div v-if="subItem.list?.length" class="schedule-list">
          <div v-for="item in subItem.list" :key="item.title" class="item-list">
            <div class="item-left">
              <p class="item-title">{{ item.title }}</p>
              <p class="item-desc">{{ item.desc }}</p>
            </div>
            <OButton type="outline" size="small" class="item-btn" @click="onButtonClick(item.href)">
              {{ item.text }}
            </OButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.schedule {
  margin-top: var(--e-spacing-h3);
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h4);
  }
  .type {
    width: 160px;
    font-size: var(--e-font-size-h6);
    line-height: var(--e-line-height-h6);
    background-image: linear-gradient(90deg, rgba(125, 50, 234, 1) 0%, rgba(125, 50, 234, 0) 100%);
    padding: var(--e-spacing-h10) var(--e-spacing-h4);
    color: #fff;
    font-weight: 500;
    border-radius: 4px;
    @media (max-width: 767px) {
      width: 128px;
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
      padding: var(--e-spacing-h10) var(--e-spacing-h6);
    }
  }
}
.schedule-content {
  width: 100%;
  padding: 32px;
  background-color: var(--e-color-bg2);
  margin-top: var(--e-spacing-h4);
  border-radius: 4px;
  background-size: auto 329px;
  background-position: right bottom;
  background-repeat: no-repeat;
  @media (max-width: 1200px) {
    background-size: auto 264px;
  }
  @media (max-width: 1100px) {
    padding: 16px;
  }
  @media (max-width: 767px) {
    margin-top: var(--e-spacing-h5);
    background-size: auto 127px;
  }
}
.schedule-item {
  display: grid;
  grid-template-columns: 224px 539px 546px;
  border-bottom: 1px solid var(--e-color-border2);
  padding: 24px 0px;
  transition: all 0.25s ease;
  align-items: center;
  position: relative;
  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }
  &:first-child {
    padding-top: 0;
  }
  @media screen and (max-width: 1430px) {
    grid-template-columns: 224px 539px 480px;
  }
  @media screen and (max-width: 1328px) {
    grid-template-columns: 185px 410px 450px;
  }
  @media screen and (max-width: 1200px) {
    grid-template-columns: 185px 360px 400px;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 80px auto;
    padding: 6px 0;
    position: static;
    align-items: flex-start;
  }
  .time {
    width: 185px;
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    color: var(--e-color-text3);
    display: flex;
    align-items: center;
    @media screen and (max-width: 1100px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      width: 80px;
    }
    img {
      width: 18px;
      height: 18px;
      color: var(--e-color-text3);
      margin-right: 8px;
      @media screen and (max-width: 1100px) {
        display: none;
      }
    }
  }
  .desc {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    color: var(--e-color-text1);
    display: block;
    margin-right: 56px;
    > span {
      display: block;
    }
    span + span {
      margin-top: 12px;
    }
    @media (max-width: 1100px) {
      margin-right: 0;
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      span + span {
        margin-top: 4px;
      }
    }
  }

  .name-box {
    @media screen and (max-width: 1100px) {
      grid-column-end: 3;
    }
    div {
      display: flex;
      align-items: center;
      @media screen and (max-width: 1100px) {
        grid-column-start: 2;
        grid-column-end: 3;
        display: block;
      }
    }
    div + div {
      margin-top: 12px;
      @media screen and (max-width: 1100px) {
        margin-top: 6px;
      }
    }
  }

  .name {
    min-width: 104px;
    display: inline-block;
    color: var(--e-color-text3);
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    @media (max-width: 1100px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  .post {
    width: 100%;
    display: inline-block;
    color: var(--e-color-text3);
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    flex: 1;
    div {
      @media (max-width: 1100px) {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-line-height-tip);
      }
    }
  }
  .info .desc {
    width: 460px;
    margin-right: 40px;
    display: inline-block;
  }
}
.schedule-item-list {
  grid-template-columns: 224px auto;
  @media screen and (max-width: 1328px) {
    grid-template-columns: 185px auto;
  }
  @media screen and (max-width: 1100px) {
    grid-template-columns: 80px auto;
  }
}
.item-list {
  display: flex;
  align-items: center;
  justify-content: space-between;
  @media screen and (max-width: 1100px) {
    align-items: flex-start;
    flex-direction: column;
  }
}
.item-list + .item-list {
  margin-top: 24px;
}
.item-left {
  width: 911px;
  @media screen and (max-width: 1400px) {
    width: 728px;
  }
  @media screen and (max-width: 1200px) {
    width: 600px;
  }
  @media screen and (max-width: 1100px) {
    width: auto;
  }
}
.item-title {
  font-size: var(--e-font-size-h7);
  line-height: var(--e-line-height-h7);
  font-weight: 500;
  @media (max-width: 1100px) {
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
  }
}
.item-desc {
  font-size: var(--e-font-size-h8);
  line-height: var(--e-line-height-h8);
  margin-top: 12px;
  color: var(--e-color-text1);
  opacity: 0.8;
  @media (max-width: 1100px) {
    font-size: var(--e-font-size-tip);
    line-height: var(--e-line-height-tip);
  }
}
.item-btn {
  --o-button-padding-small: 8px 24px;
  border-radius: 41px;
  flex-shrink: 0;
  @media (max-width: 1100px) {
    margin-top: 12px;
  }
}
</style>
