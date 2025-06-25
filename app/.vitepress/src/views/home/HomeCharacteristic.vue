<script lang="ts" setup>
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import IconDownload from '~icons/app/icon-download.svg';

const commonStore = useCommon();

const i18n = useI18n();
</script>

<template>
  <div class="home-character">
    <p class="info">{{ i18n.home.CHARACTERR_INFO.TITLE }}</p>
    <div class="character-content">
      <div class="character-content-box">
        <div v-for="(item, index) in i18n.home.CHARACTERR_INFO.LIST" :key="index" class="character-item">
          <img class="cover gif" :src="commonStore.theme === 'dark' ? item.GIF_DARK : item.GIF" alt="" />
          <img class="cover" :src="commonStore.theme === 'dark' ? item.PNG_DARK : item.PNG" alt="" />
          <h3 class="title">{{ item.NAME }}</h3>
          <p class="text">{{ item.TEXT }}</p>
        </div>
      </div>
      <p class="down">
        <a :href="i18n.home.CHARACTERR_INFO.DOWN_link" download target="_blank" rel="noopener noreferrer">
          <OButton animation size="small" type="text">
            {{ i18n.home.CHARACTERR_INFO.DOWN_NAME }}
            <template #suffixIcon>
              <IconDownload class="icon-download" />
            </template>
          </OButton>
        </a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
html[lang='zh'] .home-character .info {
  white-space: nowrap;
  @media (max-width: 1440px) {
    white-space: inherit;
  }
}
.home-character {
  .info {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    color: var(--e-color-text1);
    text-align: justify;

    @media (max-width: 1100px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
      margin-bottom: var(--e-spacing-h8);
    }
  }

  .icon-download {
    color: var(--e-color-brand1);
    width: var(--e-font-size-h8);
    height: var(--e-font-size-h8);
  }
  .character-content {
    margin: var(--e-spacing-h2) 0 0;
    padding: 0 var(--e-spacing-h1);
    box-shadow: var(--e-shadow-l1);
    background: var(--e-color-bg2);
    text-align: center;
    .character-content-box {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      padding: var(--e-spacing-h2) 0;
      border-bottom: 1px solid var(--e-color-division1);
      .character-item {
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
        font-size: var(--e-font-size-h7);
        line-height: var(--e-line-height-h7);
        color: var(--e-color-text1);
        margin: var(--e-spacing-h8) 0;
        font-weight: 500;
        @media (max-width: 1100px) {
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
        }
      }
      .text {
        font-size: var(--e-font-size-text);
        line-height: var(--e-line-height-text);
        color: var(--e-color-text4);
        font-weight: 400;
        @media (max-width: 1100px) {
          font-size: var(--e-font-size-tip);
          line-height: var(--e-line-height-tip);
        }
      }
      @media (max-width: 1100px) {
        grid-template-columns: repeat(2, 1fr);
        gap: var(--e-spacing-h2);
      }
    }
    .down {
      line-height: 70px;
      @media (max-width: 1100px) {
        line-height: 48px;
      }
    }
    @media (max-width: 1100px) {
      padding: 0 var(--e-spacing-h4);
      margin: var(--e-spacing-h5) 0 0;
    }
  }
}
</style>
