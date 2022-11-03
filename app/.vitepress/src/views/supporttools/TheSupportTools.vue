<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';

import AppContent from '@/components/AppContent.vue';
import SupportToolsConfig from '@/data/supporttools';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import Banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/supporttools.png';

import SupportPanoramaZh from '@/assets/category/download/support-panorama-zh.png';
import SupportPanoramaEn from '@/assets/category/download/support-panorama-en.png';
import SupportPanoramaZh_dark from '@/assets/category/download/support-panorama-zh_dark.png';
import SupportPanoramaEn_dark from '@/assets/category/download/support-panorama-en_dark.png';

const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();

const isZh = computed(() => (lang.value === 'zh' ? true : false));
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const ToolsData = computed(() =>
  isZh.value ? SupportToolsConfig.zh : SupportToolsConfig.en
);

const panoramaImg = computed(() =>
  isZh.value ? SupportPanoramaZh : SupportPanoramaEn
);
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.supporttools.PAGE_TITLE"
    :illustration="illustration"
  />
  <AppContent>
    <div class="supporttools-info" data-aos="fade-up">
      <p class="text">{{ i18n.supporttools.INFO }}</p>

      <img v-show="!isDark" :src="panoramaImg" class="cover" />
      <img
        v-show="isDark"
        :src="isZh ? SupportPanoramaZh_dark : SupportPanoramaEn_dark"
        class="cover"
      />
    </div>

    <div class="tool-content">
      <OCard v-for="item in ToolsData" :key="item.id" class="tool-item">
        <h3 class="title">{{ item.name }}</h3>
        <div :id="item.id" class="tool-item-detail" data-aos="fade-up">
          <div
            v-for="subitem in item.children"
            :key="subitem.iden"
            class="item-box"
          >
            <p class="item-name">{{ subitem.name }}</p>
            <p class="item-desc">
              {{ subitem.desc }}
            </p>
            <p class="item-link">
              <a :href="subitem.address" target="_blank">
                {{
                  subitem.site && subitem.site
                    ? i18n.supporttools.SITE_TEXT
                    : i18n.supporttools.CODE_TEXT
                }}
              </a>

              <a v-if="subitem.guide" :href="subitem.guide" target="_blank">{{
                i18n.supporttools.GUIDE_TEXT
              }}</a>
            </p>
          </div>
        </div>
      </OCard>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.dark .cover {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.supporttools-info {
  margin-bottom: var(--o-spacing-h4);
  .text {
    margin-bottom: var(--o-spacing-h2);
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    color: var(--o-color-text1);
    text-align: justify;
    @media screen and (max-width: 1100px) {
      margin-bottom: var(--o-spacing-h4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .cover {
    width: 100%;
  }
}
.tool-main {
  display: flex;
  gap: var(--o-spacing-h4);
  .tool-side {
    width: 245px;
    position: relative;
  }
}
.tool-content {
  // flex: 1;
  .tool-item {
    &:not(:last-child) {
      margin-bottom: var(--o-spacing-h4);
    }
    :deep(.el-card__body) {
      padding: 0 var(--o-spacing-h2);
      @media screen and (max-width: 1100px) {
        padding: 0 var(--o-spacing-h5);
      }
    }
    .title {
      font-size: var(--o-font-size-h5);
      font-weight: 500;
      line-height: 80px;
      color: var(--o-color-text1);
      border-bottom: 1px solid var(--o-color-border2);
      @media screen and (max-width: 1100px) {
        line-height: 48px;
        font-size: var(--o-font-size-h8);
      }
    }
    .tool-item-detail {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: var(--o-spacing-h4);
      .item-box {
        padding: var(--o-spacing-h4) 0;
        .item-name {
          font-size: var(--o-font-size-h6);
          line-height: var(--o-line-height-h6);
          color: var(--o-color-text1);
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
          }
        }
        .item-desc {
          font-size: var(--o-font-size-text);
          line-height: var(--o-line-height-text);
          color: var(--o-color-text4);
          margin: var(--o-spacing-h8) 0;
          @media screen and (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
          }
        }
        .item-link {
          display: flex;
          gap: var(--o-spacing-h4);
          a {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-brand1);
            @media screen and (max-width: 1100px) {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
            }
          }
        }
        @media screen and (max-width: 1100px) {
          padding: var(--o-spacing-h6) 0;
        }
      }
      @media screen and (max-width: 1100px) {
        display: block;
      }
    }
  }
}
</style>
