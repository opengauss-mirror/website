<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from '@/i18n';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import Banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/advanced.png';
import order1 from '@/assets/category/advanced/1.png';
import order2 from '@/assets/category/advanced/2.png';
import order3 from '@/assets/category/advanced/3.png';
import order4 from '@/assets/category/advanced/4.png';
import order5 from '@/assets/category/advanced/5.png';
const i18n = useI18n();
const order = [order1, order2, order3, order4, order5];
const showIndex = ref(0);
function clickChangeShowIndex(index: number) {
  showIndex.value = index;
}
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.advanced.title"
    :illustration="illustration"
  />
  <AppContent>
    <div class="advanced">
      <h2>{{ i18n.advanced.subhead }}</h2>
      <div class="step-content-pc">
        <div class="step-nav">
          <div
            v-for="(item, index) in i18n.advanced.modules"
            :key="item.name"
            class="step-item"
            :class="showIndex === index ? 'step-item-active' : ''"
            @click="clickChangeShowIndex(index)"
          >
            <img :src="order[index]" alt="" />
            <p>{{ item.name }}</p>
          </div>
        </div>
        <div class="step-body">
          <div
            v-for="(item, index) in i18n.advanced.modules"
            :key="index"
            class="body-item"
          >
            <div v-if="showIndex === index">
              <div
                v-for="itemType in item.itemList"
                :key="itemType.name"
                class="item-list"
              >
                <h4>{{ itemType.name }}</h4>
                <p>{{ itemType.desc }}</p>
                <div class="material">
                  <div v-if="itemType.docsList" class="material-item">
                    <h5>{{ i18n.advanced.type_docs_label }}</h5>
                    <div class="link-box">
                      <a
                        v-for="itemLink in itemType.docsList"
                        :key="itemLink.link"
                        :href="itemLink.link"
                        target="_blank"
                        >{{ itemLink.name }}</a
                      >
                    </div>
                  </div>
                  <div v-if="itemType.videoList" class="material-item">
                    <h5>{{ i18n.advanced.type_video_label }}</h5>
                    <div class="link-box">
                      <a
                        v-for="itemLink in itemType.videoList"
                        :key="itemLink.link"
                        :href="itemLink.link"
                        target="_blank"
                        >{{ itemLink.name }}</a
                      >
                    </div>
                  </div>
                  <div v-if="itemType.optionList" class="material-item">
                    <h5>{{ i18n.advanced.type_practice_label }}</h5>
                    <div class="link-box">
                      <a
                        v-for="itemLink in itemType.optionList"
                        :key="itemLink.link"
                        :href="itemLink.link"
                        target="_blank"
                        >{{ itemLink.name }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="step-content-mobile">
        <div
          v-for="(item, index) in i18n.advanced.modules"
          :key="item.name"
          class="step-item"
        >
          <div class="item-head">
            <img :src="order[index]" alt="" />
            <p>{{ item.name }}</p>
          </div>
          <div class="item-body">
            <el-collapse>
              <el-collapse-item
                v-for="(itemType, itemIndex) in item.itemList"
                :key="itemType.desc"
                :title="itemType.name"
                :name="itemIndex"
              >
                <p class="detail">{{ itemType.desc }}</p>
                <div class="material">
                  <div v-if="itemType.docsList" class="material-item">
                    <h5>{{ i18n.advanced.type_docs_label }}</h5>
                    <div class="link-box">
                      <a
                        v-for="itemLink in itemType.docsList"
                        :key="itemLink.link"
                        :href="itemLink.link"
                        target="_blank"
                        >{{ itemLink.name }}</a
                      >
                    </div>
                  </div>
                  <div v-if="itemType.videoList" class="material-item">
                    <h5>{{ i18n.advanced.type_video_label }}</h5>
                    <div class="link-box">
                      <a
                        v-for="itemLink in itemType.videoList"
                        :key="itemLink.link"
                        :href="itemLink.link"
                        target="_blank"
                        >{{ itemLink.name }}</a
                      >
                    </div>
                  </div>
                  <div v-if="itemType.optionList" class="material-item">
                    <h5>{{ i18n.advanced.type_practice_label }}</h5>
                    <div class="link-box">
                      <a
                        v-for="itemLink in itemType.optionList"
                        :key="itemLink.link"
                        :href="itemLink.link"
                        target="_blank"
                        >{{ itemLink.name }}</a
                      >
                    </div>
                  </div>
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
.advanced {
  h2 {
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    font-weight: 300;
    color: var(--o-color-text1);
    margin: 0 auto;
    width: 150px;
    text-align: center;
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);
    }
  }
  .step-content-pc {
    margin-top: 60px;
    @media screen and (max-width: 768px) {
      display: none;
    }
    .step-nav {
      padding-bottom: 24px;
      display: flex;
      background-color: var(--o-color-brand1);
      justify-content: space-between;
      .step-item {
        padding: 20px 0 16px 0;
        text-align: center;
        cursor: pointer;
        width: 284px;
        &-active {
          background-image: url(@/assets/category/advanced/active.png);
          background-repeat: no-repeat;
          background-size: 100% 100%;
          margin-top: -20px;
        }
        img {
          width: 90px;
        }
        p {
          font-size: var(--o-font-size-h4);
          line-height: var(--o-line-height-h5);
          margin-top: var(--o-spacing-h6);
          color: var(--o-color-white);
        }
      }
    }
    .step-body {
      padding: var(--o-spacing-h2);
      border: 5px solid var(--o-color-brand3);
      border-top: none;
      .body-item {
        .item-list {
          & ~ .item-list {
            margin-top: var(--o-spacing-h4);
          }
          h4 {
            font-size: var(--o-font-size-h7);
            line-height: var(--o-line-height-h7);
            color: var(--o-color-text1);
            font-weight: 300;
          }
          p {
            margin-top: var(--o-spacing-h6);
            font-size: var(--o-font-size-text);
            line-height: var(--o-line-height-text);
            color: var(--o-color-text1);
          }
          .material {
            margin-top: var(--o-spacing-h6);
            padding: var(--o-spacing-h4) var(--o-spacing-h2);
            background-color: var(--o-color-bg4);
            .material-item {
              & ~ .material-item {
                margin-top: var(--o-spacing-h4);
              }
              h5 {
                font-size: var(--o-font-size-h7);
                line-height: var(--o-line-height-h7);
                color: var(--o-color-text1);
              }
              .link-box {
                margin-top: var(--o-spacing-h6);
                a {
                  margin-right: var(--o-spacing-h4);
                  font-size: var(--o-font-size-text);
                  line-height: var(--o-line-height-text);
                }
              }
            }
          }
        }
      }
    }
  }
  .step-content-mobile {
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
      margin-top: var(--o-spacing-h2);
    }
    .step-item {
      border: 6px solid var(--o-color-brand1);
      & ~ .step-item {
        margin-top: var(--o-spacing-h2);
      }
      .item-head {
        height: 48px;
        background-color: var(--o-color-brand1);
        position: relative;
        padding-left: 60px;
        img {
          width: 60px;
          position: absolute;
          left: -6px;
          top: 2px;
        }
        p {
          font-size: var(--o-font-size-h8);
          line-height: 48px;
          color: var(--o-color-white);
        }
      }
      .item-body {
        :deep(.el-collapse) {
          border: none;
          padding: 0 10px;
        }
        :deep(.el-collapse-item__header) {
          border-bottom: none;
          background-color: var(--o-color-bg1);
          justify-content: space-between;
          font-size: var(--o-font-size-tip);
          color: var(--o-color-text1);
          font-weight: 300;
        }
        :deep(.el-collapse-item__wrap) {
          border-bottom: none;
          background-color: transparent;
        }
        .detail {
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          color: var(--o-color-text4);
        }
        .material {
          margin-top: var(--o-spacing-h8);
          padding: var(--o-spacing-h8) var(--o-spacing-h6);
          background-color: var(--o-color-bg-secondary);
          .material-item {
            & ~ .material-item {
              margin-top: var(--o-spacing-h8);
            }
            h5 {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              color: var(--o-color-text4);
              font-weight: 300;
            }
            .link-box {
              font-size: var(--o-font-size-tip);
              line-height: var(--o-line-height-tip);
              margin-top: var(--o-spacing-h8);
              a {
                display: block;
                & ~ a {
                  margin-top: var(--o-spacing-h8);
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
