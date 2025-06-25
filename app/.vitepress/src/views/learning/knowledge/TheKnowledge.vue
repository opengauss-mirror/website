<script lang="ts" setup>
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import useWindowResize from '@/components/hooks/useWindowResize';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/knowledge.png';
const i18n = useI18n();
const screenWidth = useWindowResize();
</script>

<template>
  <ClientOnly>
    <BannerLevel2 :background-image="Banner" :title="i18n.knowledge.title" :illustration="illustration" />
    <AppContent>
      <div v-if="screenWidth > 768" class="knowledge-pc">
        <div v-for="(item, index) in i18n.knowledge.module" :key="item.name" class="module-item">
          <div class="item-left" :class="'left' + (index + 1)">
            {{ item.name }}
          </div>
          <div class="item-right">
            <div v-for="itemType in item.moduleTypes" :key="itemType.name" class="type-item">
              <h4>{{ itemType.name }}</h4>
              <p>{{ itemType.desc }}</p>
              <div class="link-box">
                <a v-for="itemList in itemType.list" :key="itemList.name" :href="itemList.link" target="_blank" rel="noopener noreferrer">{{
                  itemList.name
                }}</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="knowledge-mobile">
        <div v-for="item in i18n.knowledge.module" :key="item.name" class="module-item">
          <div class="item-head">
            {{ item.name }}
          </div>
          <div class="item-body">
            <div v-for="(itemType, index) in item.moduleTypes" :key="itemType.name" class="type-item">
              <el-collapse>
                <el-collapse-item :name="index">
                  <template #title>
                    <div class="mb-collapse-header">
                      <div class="mb-title">{{ itemType.name }}</div>
                      <div class="mb-desc">{{ itemType.desc }}</div>
                    </div>
                  </template>
                  <div class="link-box">
                    <a v-for="itemList in itemType.list" :key="itemList.name" :href="itemList.link" rel="noopener noreferrer">{{ itemList.name }}</a>
                  </div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
        </div>
      </div>
    </AppContent>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.knowledge-pc {
  .module-item {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-column-gap: var(--e-spacing-h4);
    & ~ .module-item {
      margin-top: var(--e-spacing-h4);
    }
    .item-left {
      width: 100%;
      color: var(--e-color-white);
      font-size: var(--e-font-size-h4);
      font-weight: 500;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--e-color-bg2);
      margin-right: var(--e-spacing-h4);
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: var(--e-shadow-l2);
    }
    .left1 {
      background-image: url(@/assets/category/knowledge/left-bg1.jpg);
    }
    .left2 {
      background-image: url(@/assets/category/knowledge/left-bg2.jpg);
    }
    .left3 {
      background-image: url(@/assets/category/knowledge/left-bg3.jpg);
    }
    .left4 {
      background-image: url(@/assets/category/knowledge/left-bg4.jpg);
    }
    .item-right {
      max-width: 1150px;
      flex-grow: 1;
      .type-item {
        padding: var(--e-spacing-h4) var(--e-spacing-h4) var(--e-spacing-h5) var(--e-spacing-h4);
        background-color: var(--e-color-bg2);
        box-shadow: var(--e-shadow-l2);
        & ~ .type-item {
          margin-top: 10px;
        }
        h4 {
          font-size: var(--e-font-size-h7);
          line-height: var(--e-line-height-h7);
          color: var(--e-color-text1);
          font-weight: 500;
          padding-bottom: 12px;
        }
        p {
          padding-bottom: 12px;
          font-size: var(--e-font-size-text);
          line-height: var(--e-line-height-text);
          color: var(--e-color-text1);
        }
        .link-box {
          padding-top: 20px;
          border-top: 1px solid var(--e-color-division1);
          a {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-h7);
            margin-right: var(--e-spacing-h4);
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.knowledge-mobile {
  --color-text: 0, 0, 0;

  .module-item {
    & + .module-item {
      margin-top: var(--e-spacing-h6);
    }
    .item-head {
      width: 100%;
      height: 64px;
      background: url(@/assets/category/knowledge/bg-title-mo.jpg) no-repeat;
      background-size: cover;
      padding-left: var(--e-spacing-h6);
      line-height: 64px;
      font-size: var(--e-font-size-text);
      color: var(--e-color-white);
      font-weight: 500;
    }
    .item-body {
      padding: var(--e-spacing-h8);
      background-color: var(--e-color-bg2);
      .type-item {
        .link-box {
          a {
            display: block;
            font-size: var(--e-font-size-tip);
            & + a {
              margin-top: var(--e-spacing-h5);
            }
          }
        }
        & + .type-item {
          margin-top: var(--e-spacing-h8);
        }
        :deep(.el-collapse) {
          border-top: none;
          border-bottom: none;
        }
        :deep(.el-collapse-item__wrap) {
          border-bottom: none;
        }
        :deep(.el-collapse-item__header) {
          padding: var(--e-spacing-h6) 0 var(--e-spacing-h6) var(--e-spacing-h6);
          height: auto;
          border: 1px solid var(--e-color-border2);
          position: relative;
          font-size: var(--e-font-size-text);
          color: var(--e-color-text1);
          font-weight: 500;
          background-color: var(--e-color-bg2);
          &.is-active::before {
            content: '';
            display: block;
            width: 2px;
            height: calc(100% + 2px);
            position: absolute;
            left: 0;
            top: -1px;
            background-color: var(--e-color-brand1);
          }
          .mb-collapse-header {
            margin-right: var(--e-spacing-h4);
          }
          .mb-title {
            font-size: var(--e-font-size-text);
            line-height: var(--e-line-height-text);
          }
          .mb-desc {
            margin-top: 4px;
            font-size: var(--e-font-size-tip);
            line-height: 20px;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            font-weight: 400;
            color: rgba(var(--color-text), 0.6);
          }
        }
        :deep(.el-collapse-item__arrow) {
          margin-right: var(--e-spacing-h6);
          transform: rotate(90deg);
        }
        :deep(.el-collapse-item__arrow.is-active) {
          transform: rotate(-90deg);
        }
        :deep(.el-collapse-item__content) {
          background-color: var(--e-color-bg1);
          padding: var(--e-spacing-h5);
        }
      }
    }
  }
}

@include in-dark {
  .knowledge-mobile {
    --color-text: 255, 255, 255;
  }
}
</style>
