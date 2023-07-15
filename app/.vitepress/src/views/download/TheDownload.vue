<script lang="ts" setup>
import { ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';

import DownloadConfig from '@/data/download';

import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import DownloadContent from './DownloadContent.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/download.png';

const i18n = useI18n();
const { lang, theme } = useData();
const downloadData = i18n.value.download;

// 设置显示版本
const idList = [DownloadConfig[0].id, DownloadConfig[1].id];
const versionShown = ref(DownloadConfig.length - 1);
function setVersionShown(index: number) {
  versionShown.value = index;
}
//控制需要登录后才能下载的版本(默认仅为最新版需要登录后下载)
const downloadVersionAuthIndex = ref(DownloadConfig.length - 1);

// 获取版版本数据
const getData: any = computed(() => {
  return DownloadConfig.filter((el) => el.id === versionShown.value);
});
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.download.PAGE_TITLE"
    :illustration="illustration"
  />
  <AppContent>
    <div class="download-wrap">
      <div class="description-wrap">
        <div class="description-item">
          <p v-for="item in downloadData.DESCRIPTION" :key="item">{{ item }}</p>
          <p>
            {{ downloadData.MORE_DETAIL
            }}<a
              :href="downloadData.SPECIFICATION_LINK"
              target="_blank"
              rel="noopener noreferrer"
              >{{ downloadData.VIEW_SPECIFICATION }}</a
            ><span>{{ lang === 'zh' ? '。' : '.' }}</span>
          </p>
        </div>
        <div class="description-item">
          <p>
            {{ downloadData.PECULIARITY_DETAIL
            }}<a
              :href="theme.docsUrl + downloadData.RELEASE_LINK"
              target="_blank"
              rel="noopener noreferrer"
              >{{
                lang === 'zh'
                  ? getData[0].docs_list[0].name
                  : getData[0].docs_list[0].nameEn
              }}</a
            >{{ downloadData.WELCOME }}
          </p>
          <p>
            {{ downloadData.MORE_HISTORY
            }}<a :href="'/' + lang + '/' + downloadData.HISTORY_LINK">{{
              downloadData.CLICK_VIEW
            }}</a
            ><span>{{ lang === 'zh' ? '。' : '.' }}</span>
          </p>
        </div>
      </div>
      <div class="download-content">
        <div class="content-selection">
          <div
            class="selection-item"
            :class="{ active: versionShown === idList[0] }"
            @click="setVersionShown(idList[0])"
          >
            {{ 'openGauss ' + DownloadConfig[0].name }}
          </div>
          <div
            class="selection-item"
            :class="{ active: versionShown === idList[1] }"
            @click="setVersionShown(idList[1])"
          >
            {{ 'openGauss ' + DownloadConfig[1].name }}
          </div>
        </div>
        <DownloadContent
          :content-data="getData"
          :version-shown-index="versionShown"
          :download-version-auth-index="downloadVersionAuthIndex"
        />
      </div>
    </div>
  </AppContent>
  <div class="input-box">
    <!-- 用于复制RSNC的值 -->
    <input id="useCopy" type="text" />
  </div>
</template>

<style lang="scss" scoped>
.download-wrap {
  .description-wrap {
    .description-item {
      p {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
        color: var(--o-color-text1);
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
        }
      }
      & + .description-item {
        margin-top: var(--o-spacing-h4);
        @media (max-width: 1100px) {
          margin-top: var(--o-spacing-h5);
        }
      }
    }
  }
  .download-content {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h4);
    }
    .content-selection {
      display: flex;
      .selection-item {
        flex-grow: 1;
        text-align: center;
        background-color: var(--o-color-bg2);
        border: 1px solid var(--o-color-border2);
        color: var(--o-color-text1);
        font-size: var(--o-font-size-h8);
        line-height: 40px;
        cursor: pointer;
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-text);
          line-height: 22px;
          padding: 10px 0;
        }
        &.active {
          background-color: var(--o-color-brand1);
          border: 1px solid var(--o-color-brand1);
          color: var(--o-color-white);
        }
      }
    }
  }
}
.input-box #useCopy {
  position: absolute;
  opacity: 0;
}
</style>
