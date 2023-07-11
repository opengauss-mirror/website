<script setup lang="ts">
import { useCommon } from '@/stores/common';

import { computed } from 'vue';

import portalInfo from '@/data/migration/migration-portal';

import IconDownload from '~icons/app/icon-download.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

const commonStore = useCommon();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
const downloadData = portalInfo.download;

interface LinkItem {
  name: string;
  link: string;
}

function handleClick(link: string) {
  window.open(link);
}
</script>

<template>
  <div class="migration-download">
    <h2>{{ downloadData.title }}</h2>
    <div class="migration-download-content">
      <OCard>
        <div class="card-box">
          <div class="card-box-left">
            <img
              :src="
                isDark ? downloadData.left.imgDark : downloadData.left.imgLight
              "
            />
            <div class="card-info">
              {{ downloadData.left.name }}
            </div>
          </div>
          <div class="card-box-right">
            <OButton
              :animation="item.btnIcon !== 1"
              type="outline"
              class="btn-box-item"
              v-for="item in downloadData.btns"
              :key="item.name"
              @click="handleClick(item.link)"
            >
              <template v-if="item.btnIcon === 1" #suffixIcon>
                <IconDownload class="btn-box-item-icon"></IconDownload>
              </template>
              <template v-else #suffixIcon>
                <IconArrowRight class="btn-box-item-icon"></IconArrowRight>
              </template>
              {{ item.name }}
            </OButton>
          </div>
        </div>
      </OCard>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep(.el-card) {
  overflow: visible;
  .el-card__body {
    padding: 0;
    @media screen and (max-width: 768px) {
      padding: var(--o-spacing-h5) var(--o-spacing-h6);
    }
  }
}
.migration-download {
  margin-top: var(--o-spacing-h1);
  @media screen and (max-width: 768px) {
    margin-top: var(--o-spacing-h2);
  }
  h2 {
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    line-height: var(--o-line-height-h3);
    width: 100%;
    text-align: center;
    margin-top: 0;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      margin: 0;
    }
  }
  .migration-download-content {
    margin-top: var(--o-spacing-h3);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h5);
    }
    .card-box {
      display: flex;
      justify-content: space-between;
      padding: 23px 0 15px 25px;
      @media screen and (max-width: 768px) {
        flex-direction: column;
      }
      .card-box-left {
        display: flex;
        align-items: center;
        // padding: 23px 0 15px 25px;
        @media screen and (max-width: 768px) {
          padding: 0;
        }
        @media screen and (max-width: 440px) {
            justify-content: center;
          }
        img {
          width: 130px;
          height: 130px;
          @media screen and (max-width: 440px) {
            display: none;
          }
        }

        .card-info {
          font-size: var(--o-font-size-h5);
          font-weight: 500;
          color: var(--o-color-text1);
          line-height: var(--o-line-height-h5);
          @media screen and (max-width: 1410px) {
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
          }
         
          .name {
            margin-right: var(--o-spacing-h6);
          }
        }
      }

      .card-box-right {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding-right: 24px;
        @media screen and (max-width: 1410px) {
          max-width: 576px;
          flex-wrap: wrap;
        }
        @media screen and (max-width: 440px) {
          justify-content: center;
          margin-top: 16px;
        }
        .btn-box-item {
          padding: 0 16px;
          .btn-box-item-icon {
            width: 12px;
            font-size: var(--o-font-size-tip);
          }
        }
        .card-btn {
          align-self: center;
          z-index: 10;
          margin-right: 120px;
          @media screen and (max-width: 1410px) {
            padding: 15px 0 23px 20px;
            margin-right: 0;
          }
          @media screen and (max-width: 768px) {
            padding: 0;
            margin: 16px 0 0 0;
          }
        }
      }
    }
  }
}
</style>
