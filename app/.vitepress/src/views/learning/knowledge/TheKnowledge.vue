<script lang="ts" setup>
import { useI18n } from '@/i18n';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import Banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/knowledge.png';
const i18n = useI18n();
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.knowledge.title"
    :illustration="illustration"
  />
  <AppContent>
    <div class="knowledge-pc">
      <div
        v-for="(item, index) in i18n.knowledge.module"
        :key="item.name"
        class="module-item"
      >
        <div class="item-left" :class="'left' + (index + 1)">
          {{ item.name }}
        </div>
        <div class="item-right">
          <div
            v-for="itemType in item.moduleTypes"
            :key="itemType.name"
            class="type-item"
          >
            <h4>{{ itemType.name }}</h4>
            <div class="link-box">
              <a
                v-for="itemList in itemType.list"
                :key="itemList.name"
                :href="itemList.link"
                target="_blank"
                rel="noopener noreferrer"
                >{{ itemList.name }}</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="knowledge-mobile">
      <div
        v-for="item in i18n.knowledge.module"
        :key="item.name"
        class="module-item"
      >
        <div class="item-head">
          {{ item.name }}
        </div>
        <div class="item-body">
          <div
            v-for="(itemType, index) in item.moduleTypes"
            :key="itemType.name"
            class="type-item"
          >
            <el-collapse>
              <el-collapse-item :title="itemType.name" :name="index">
                <div class="link-box">
                  <a
                    v-for="itemList in itemType.list"
                    :key="itemList.name"
                    :href="itemList.link"
                    >{{ itemList.name }}</a
                  >
                </div>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.knowledge-pc {
  @media screen and (max-width: 768px) {
    display: none;
  }
  .module-item {
    display: grid;
    grid-template-columns: 240px 1fr;
    grid-column-gap: var(--o-spacing-h4);
    & ~ .module-item {
      margin-top: var(--o-spacing-h4);
    }
    .item-left {
      width: 100%;
      // height: 416px;
      color: var(--o-color-white);
      font-size: var(--o-font-h3);
      // line-height: 416px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: var(--o-color-bg2);
      margin-right: var(--o-spacing-h4);
      background-size: cover;
      background-repeat: no-repeat;
      box-shadow: var(--o-shadow-l2);
    }
    .left1 {
      background-image: url(@/assets/category/knowledge/left-bg1.png);
    }
    .left2 {
      background-image: url(@/assets/category/knowledge/left-bg2.png);
    }
    .left3 {
      background-image: url(@/assets/category/knowledge/left-bg3.png);
    }
    .left4 {
      background-image: url(@/assets/category/knowledge/left-bg4.png);
    }
    .item-right {
      max-width: 1150px;
      flex-grow: 1;
      .type-item {
        padding: var(--o-spacing-h4);
        background-color: var(--o-color-bg2);
        box-shadow: var(--o-shadow-l2);
        & ~ .type-item {
          margin-top: 10px;
        }
        h4 {
          font-size: var(--o-font-size-h7);
          line-height: var(--o-line-height-h7);
          color: var(--o-color-text1);
          font-weight: 500;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--o-color-division1);
        }
        .link-box {
          padding-top: 10px;
          a {
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-h7);
            margin-right: var(--o-spacing-h4);
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.knowledge-mobile {
  display: none;
  @media screen and (max-width: 768px) {
    display: block;
  }
  .module-item {
    & + .module-item {
      margin-top: var(--o-spacing-h6);
    }
    .item-head {
      width: 100%;
      height: 64px;
      background: url(@/assets/category/knowledge/bg-title-mo.png) no-repeat;
      background-size: cover;
      padding-left: var(--o-spacing-h6);
      line-height: 64px;
      font-size: var(--o-font-size-text);
      color: var(--o-color-white);
      font-weight: 500;
    }
    .item-body {
      padding: var(--o-spacing-h8);
      background-color: var(--o-color-bg2);
      .type-item {
        .link-box {
          a {
            display: block;
            font-size: var(--o-font-size-tip);
            & + a {
              margin-top: var(--o-spacing-h5);
            }
          }
        }
        & + .type-item {
          margin-top: var(--o-spacing-h8);
        }
        :deep(.el-collapse) {
          border-top: none;
          border-bottom: none;
        }
        :deep(.el-collapse-item__wrap) {
          border-bottom: none;
        }
        :deep(.el-collapse-item__header) {
          padding-left: var(--o-spacing-h6);
          border: 1px solid var(--o-color-border2);
          position: relative;
          font-size: var(--o-font-size-text);
          color: var(--o-color-text1);
          font-weight: 500;
          background-color: var(--o-color-bg2);
          &.is-active::before {
            content: '';
            display: block;
            width: 2px;
            height: calc(100% + 2px);
            position: absolute;
            left: 0;
            top: -1px;
            background-color: var(--o-color-brand1);
          }
        }
        :deep(.el-collapse-item__arrow) {
          margin-right: var(--o-spacing-h6);
        }
        :deep(.el-collapse-item__content) {
          background-color: var(--o-color-bg4);
          padding: var(--o-spacing-h5);
        }
      }
    }
  }
}
</style>
