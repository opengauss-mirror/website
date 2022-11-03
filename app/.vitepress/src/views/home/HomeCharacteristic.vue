<script lang="ts" setup>
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import IconDownload from '~icons/app/icon-download.svg';

const commonStore = useCommon();

const i18n = useI18n();
const go = (path: string) => {
  window.open(path);
};
</script>

<template>
  <div class="characterr">
    <p class="info">{{ i18n.home.CHARACTERR_INFO.TITLE }}</p>

    <div class="characterr-content">
      <div class="characterr-content-box">
        <div
          v-for="(item, index) in i18n.home.CHARACTERR_INFO.LIST"
          :key="index"
          class="characterr-item"
        >
          <img
            class="cover gif"
            :src="commonStore.theme === 'dark' ? item.GIF_DARK : item.GIF"
            alt=""
          />
          <img
            class="cover"
            :src="commonStore.theme === 'dark' ? item.PNG_DARK : item.PNG"
            alt=""
          />
          <h3 class="title">{{ item.NAME }}</h3>
          <p class="text">{{ item.TEXT }}</p>
        </div>
      </div>
      <p class="down">
        <OButton
          animation
          size="small"
          type="text"
          @click="go(i18n.home.CHARACTERR_INFO.DOWN_link)"
        >
          {{ i18n.home.CHARACTERR_INFO.DOWN_NAME }}
          <template #suffixIcon>
            <IconDownload class="icon-download" />
          </template>
        </OButton>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
html[lang='zh'] .characterr .info {
  white-space: nowrap;
  @media (max-width: 1440px) {
    white-space: inherit;
  }
}
.characterr {
  .info {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    text-align: justify;

    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-bottom: var(--o-spacing-h8);
    }
  }

  .icon-download {
    color: var(--o-color-brand1);
    width: var(--o-font-size-h8);
    height: var(--o-font-size-h8);
  }
  &-content {
    margin: var(--o-spacing-h2) 0 0;
    padding: 0 var(--o-spacing-h1);
    box-shadow: var(--o-shadow-l1);
    background: var(--o-color-bg2);
    text-align: center;
    &-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: var(--o-spacing-h2) 0;
      border-bottom: 1px solid var(--o-color-division1);
      .characterr-item {
        &:hover {
          .cover {
            display: none;
          }
          .gif {
            display: inline-block;
          }
        }
      }
      .cover {
        height: 96px;
        object-fit: contain;
        &.gif {
          display: none;
        }
      }
      .title {
        font-size: var(--o-font-size-h7);
        line-height: var(--o-line-height-h7);
        color: var(--o-color-text1);
        margin: var(--o-spacing-h8) 0;
        font-weight: 500;
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
        }
      }
      .text {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text4);
        font-weight: 400;
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--o-spacing-h2);
      }
    }
    .down {
      line-height: 70px;
      @media (max-width: 1100px) {
        line-height: 48px;
      }
    }
    @media (max-width: 1100px) {
      padding: 0 var(--o-spacing-h4);
      margin: var(--o-spacing-h5) 0 0;
    }
  }
}
</style>
