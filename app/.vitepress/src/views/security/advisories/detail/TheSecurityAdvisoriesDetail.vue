<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from '@/i18n';
import { useRouter, useData } from 'vitepress';

import { getSecurityDetail } from '@/api/api-security';

import AppContent from '@/components/AppContent.vue';

import IconChevron from '~icons/app/icon-chevron-right.svg';

// import type { AxiosResponse } from '@/shared/axios';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const detailData: any = ref({});
const cveIdList = ref<string[]>([]);
const referenceLinkList = ref<string[]>([]);

const queryData = ref('');

function getSecurityDetailInfo(data: any) {
  try {
    getSecurityDetail(data).then((res: any) => {
      if (res) {
        detailData.value = res.body;
        cveIdList.value = res.body.cveNumbers.split(';');
        referenceLinkList.value = res.body.referenceLink.split(';');
      }
    });
  } catch (e: any) {
    throw new Error(e);
  }
}

function goBackPage() {
  const i = router.route.path.lastIndexOf('d');
  router.go(`${router.route.path.substring(0, i)}`);
}

function goCveDetail(val: string) {
  router.go(`/${lang.value}/cve/detail/?cveNum=${val}`);
}

onMounted(() => {
  const index1 = window.location.href.indexOf('=');
  queryData.value = window.location.href.substring(index1 + 1);
  getSecurityDetailInfo(queryData.value);
});
</script>
<template>
  <AppContent :mobile-top="16">
    <div class="detail-head">
      <div class="breadcrumb">
        <p class="last-page" @click="goBackPage">
          {{ i18n.security.SECURITY_ADVISORIES }}
        </p>
        <span class="separtor">
          <o-icon><icon-chevron></icon-chevron></o-icon
        ></span>
        <p class="current-page">
          {{ i18n.security.SECURITY_ADVISORIES_DETAIL }}
        </p>
      </div>
      <div class="bulletin-head">
        <p class="bulletin-name">{{ detailData.gaussSaNum }}</p>
        <div class="bulletin-intro">
          <div>
            <span>{{ i18n.security.SYNOPSIS }}:</span>
            <p>{{ detailData.summary }}</p>
          </div>
          <div>
            <span>{{ i18n.security.RELEASE_DATE }}:</span>
            <p>{{ detailData.releaseDate }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="detail-body-pc">
      <div class="tabs-container">
        <OTabs class="o-tabs">
          <div class="wrapper1">
            <OTabPane :label="i18n.security.OVERVIEW">
              <div class="tab-content">
                <div class="tab-content-item">
                  <h5 class="tab-content-item-title lable-name">
                    {{ i18n.security.BRIEF_INTRODUCTION }}
                  </h5>
                  <p class="tab-content-item-text">
                    {{ detailData.introduction }}
                  </p>
                </div>
                <div class="tab-content-item lable-name">
                  <h5 class="tab-content-item-title">
                    {{ i18n.security.SEVERITY }}
                  </h5>
                  <p class="tab-content-item-text">
                    {{ detailData.cveLevel }}
                  </p>
                </div>
                <div class="tab-content-item">
                  <h5 class="tab-content-item-title lable-name">
                    {{ i18n.security.THEME }}
                  </h5>
                  <p class="tab-content-item-text">
                    {{ detailData.theme }}
                  </p>
                </div>
                <div class="tab-content-item lable-name2">
                  <h5 class="tab-content-item-title">
                    {{ i18n.security.DESCRIPTION }}
                  </h5>
                  <p class="tab-content-item-text">
                    {{ detailData.description }}
                  </p>
                </div>
                <div class="tab-content-item lable-name3">
                  <h5 class="tab-content-item-title">
                    {{ i18n.security.AFFECTED_COMPONENTS }}
                  </h5>
                  <p class="tab-content-item-text">
                    {{ detailData.influenceComponent }}
                  </p>
                </div>
                <div class="tab-content-item lable-name4">
                  <h5 class="tab-content-item-title">
                    {{ i18n.security.CVE }}
                  </h5>
                  <p
                    v-for="(item, index) in cveIdList"
                    :key="index"
                    class="tab-content-item-link"
                    @click="goCveDetail(item)"
                  >
                    {{ item }}
                  </p>
                </div>
                <div class="tab-content-item lable-name5">
                  <h5 class="tab-content-item-title">
                    {{ i18n.security.REFERENCE_DOCUMENTS }}
                  </h5>
                  <div
                    v-for="item in referenceLinkList"
                    :key="item"
                    class="tab-content-item-text"
                  >
                    <a :href="item" target="_blank" rel="noopener noreferrer">{{
                      item
                    }}</a>
                  </div>
                </div>
              </div>
            </OTabPane>

            <OTabPane :label="i18n.security.UPDATED_PACKAGES">
              <div class="tab-content">
                <div
                  v-for="item in detailData.versionsBody"
                  :key="item"
                  class="packge-item"
                >
                  <h2 class="packge-item-title">
                    openGauss-{{ item.versions }}
                  </h2>
                  <div
                    v-for="it in item.packageBody"
                    :key="it"
                    class="packge-item-class"
                  >
                    <p class="packge-item-class-achitecture">
                      {{ it.groupName }}
                    </p>

                    <div
                      v-for="single in it.tagBody"
                      :key="single.packageName"
                      class="packge-list"
                    >
                      <ul class="list-head">
                        <li></li>
                        <li
                          v-for="platItemHead in i18n.security.PACK_LIST"
                          :key="platItemHead"
                        >
                          {{ platItemHead }}
                        </li>
                      </ul>
                      <ul class="list-body">
                        <li>{{ single.packageName }}</li>
                        <li
                          v-for="(platItem, index) in single.affectedPlatform"
                          :key="platItem"
                        >
                          {{
                            platItem === i18n.security.PACK_LIST[index]
                              ? '✓'
                              : ''
                          }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div
                  v-for="item in detailData.versionsBody"
                  :key="item"
                  class="packge-item-mobile"
                >
                  <h2 class="packge-item-title">
                    openGauss-{{ item.versions }}
                  </h2>
                  <div
                    v-for="it in item.packageBody"
                    :key="it"
                    class="packge-item-class"
                  >
                    <p class="packge-item-class-achitecture">
                      {{ it.groupName }}
                    </p>
                    <div
                      v-for="single in it.tagBody"
                      :key="single"
                      class="packge-item-class-rpm"
                    >
                      <h5 class="first-title">{{ i18n.security.SOFT_PACK }}</h5>
                      <p>{{ single.packageName }}</p>
                      <h5>{{ i18n.security.PLAT }}</h5>
                      <p
                        v-for="platItem in single.affectedPlatform"
                        :key="platItem"
                      >
                        {{ platItem }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </OTabPane>
          </div>
        </OTabs>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
:deep(.el-tabs) {
  .el-tabs__header {
    margin-bottom: 0;
    background-color: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
    z-index: 20;
    @media screen and (max-width: 768px) {
      box-shadow: none;
    }
  }
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
    height: 48px;
    @media screen and (max-width: 768px) {
      // margin: var(--o-spacing-h5) 0 0 0;
      height: 38px;
      background-color: var(--o-color-bg2);
    }
  }
}
.detail-head {
  background-color: var(--o-color-bg1);
  .breadcrumb {
    color: var(--o-color-text1);
    background: var(--o-color-bg1);
    display: flex;
    @media screen and (max-width: 768px) {
      margin-bottom: var(--o-spacing-h5);
    }
    .last-page {
      color: var(--o-color-text4);
      font-size: var(--o-font-size-tip);
      font-weight: 300;
      line-height: var(--o-line-height-tip);
      cursor: pointer;
    }
    .separtor {
      margin: 0 var(--o-spacing-h10);
      .o-icon {
        color: var(--o-color-text1);
      }
    }
    .current-page {
      color: var(--o-color-text1);
      font-size: var(--o-font-size-tip);
      font-weight: 600;
      line-height: var(--o-line-height-tip);
    }
  }
  .bulletin-head {
    padding: var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2) 0;
    background: var(--o-color-bg1);
    @media screen and (max-width: 768px) {
      padding: var(--o-spacing-h5);
      margin: 0 0 var(--o-spacing-h5);
      background: var(--o-color-bg2);
      box-shadow: var(--o-shadow-l1);
    }
    .bulletin-name {
      font-size: var(--o-font-size-h3);
      font-weight: 300;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h3);
      @media screen and (max-width: 768px) {
        line-height: var(--o-line-height-h8);
        font-size: var(--o-font-size-h8);
        font-weight: 300;
        color: var(--o-color-text1);
        margin-bottom: var(--o-spacing-h8);
      }
    }
    .bulletin-intro {
      font-size: var(--o-font-size-text);
      font-weight: 300;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-text);
      margin-top: var(--o-spacing-h4);
      & div {
        display: flex;
      }
      span {
        display: inline-block;
        margin-right: var(--o-spacing-h8);
      }
      @media screen and (max-width: 768px) {
        margin: 0;
        font-size: var(--o-font-size-tip);
        font-weight: 300;
        color: var(--o-color-text1);
        line-height: var(--o-line-height-tip);
      }
    }
  }
}
.detail-body-pc {
  background-color: var(--o-color-bg1);
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
    // display: none;
  }
  .tabs-container {
    .o-tabs {
      .wrapper1 {
        max-width: 1504px;
        margin: 0 auto;
        background-color: var(--o-color-bg1);
        @media screen and (max-width: 768px) {
          // background-color: var(--o-color-bg1);
          // margin: var(--o-spacing-h5) 0 var(--o-spacing-h2) 0;
          margin: 16px 0 40px;
        }
        .tab-content {
          padding: var(--o-spacing-h2);
          background-color: var(--o-color-bg2);
          @media screen and (max-width: 768px) {
            // margin: var(--o-spacing-h5) var(--o-spacing-h5) 0;
            padding: var(--o-spacing-h5);
            &-item:last-child {
              margin-bottom: 0;
            }
            h5 {
              font-size: var(--o-font-size-text);
              line-height: var(--o-line-height-text);
              color: var(--o-color-text1);
              font-weight: 300;
            }
            .first-title {
              margin-top: 0;
            }
            .tab-content-item-text {
              margin-top: var(--o-spacing-h7);
            }
            .tab-content-item-link {
              color: var(--o-color-brand1);
            }
            .packge-item-class-rpm {
              margin-top: var(--o-spacing-h8);
              padding: var(--o-spacing-h8);
              border: 1px solid var(--o-color-border2);
              &:nth-of-type(2n + 1) {
                background-color: var(--o-color-bg3);
              }
              p {
                color: var(--o-color-text4);
                font-size: var(--o-font-size-tip);
                line-height: var(--o-line-height-tip);
              }
            }
          }
          &-item {
            margin-bottom: var(--o-spacing-h2);
            @media screen and (max-width: 768px) {
              margin-bottom: var(--o-spacing-h4);
            }
            &:last-child {
              margin-bottom: 0;
            }
            &-title {
              font-size: var(--o-font-size-h5);
              font-weight: 300;
              color: var(--o-color-text1);
              line-height: var(--o-line-height-h5);
              margin-bottom: var(--o-spacing-h5);
              @media screen and (max-width: 768px) {
                font-size: var(--o-font-size-text);
                font-weight: 300;
                line-height: var(--o-line-height-text);
              }
            }
            &-link {
              color: var(--o-color-link1);
              font-size: var(--o-font-size-text);
              font-weight: 300;
              line-height: var(--o-line-height-text);
              cursor: pointer;
              @media screen and (max-width: 768px) {
                font-size: var(--o-font-size-tip);
                font-weight: 300;
                line-height: var(--o-line-height-tip);
              }
            }
            &-text {
              font-size: var(--o-font-size-text);
              font-weight: 300;
              color: var(--o-color-text1);
              line-height: var(--o-line-height-text);
              @media screen and (max-width: 768px) {
                font-size: var(--o-font-size-tip);
                font-weight: 300;
                line-height: var(--o-line-height-tip);
              }
              a {
                color: var(--o-color-link1);
              }
            }
          }
          .packge-item {
            // margin-bottom: 40px;
            @media screen and (max-width: 768px) {
              display: none;
            }
            &-title {
              font-size: var(--o-font-size-h5);
              font-weight: 300;
              line-height: var(--o-line-height-h8);
              margin-bottom: var(--o-spacing-h6);
              color: var(--o-color-text1);
              @media screen and (max-width: 768px) {
                font-size: var(--o-font-size-text);
                line-height: var(--o-line-height-text);
                color: var(--o-color-text1);
              }
            }
            &-class {
              margin-bottom: var(--o-spacing-h4);
              &:last-child {
                margin-bottom: 0;
              }
              &-achitecture {
                color: var(--o-color-text1);
                font-size: var(--o-font-size-h7);
                line-height: 64px;
                @media screen and (max-width: 768px) {
                  margin-top: 10px;
                  font-size: var(--o-font-size-tip);
                  line-height: var(--o-line-height-tip);
                  color: var(--o-color-text1);
                }
                // border-bottom: 1px solid var(--o-color-border1);
              }
              .packge-list {
                .list-head {
                  display: flex;
                  background-color: var(--o-color-bg4);
                  li {
                    width: 280px;
                    height: 52px;
                    line-height: 52px;
                    text-align: center;
                    font-size: var(--o-font-size-text);
                    color: var(--o-color-text1);
                  }
                }
                .list-body {
                  display: flex;
                  li {
                    width: 280px;
                    height: 52px;
                    line-height: 52px;
                    text-align: center;
                    font-size: var(--o-font-size-text);
                    color: var(--o-color-text4);
                    & + li {
                      color: var(--o-color-brand1);
                    }
                  }
                }
              }
            }
          }
          .packge-item-mobile {
            display: none;
            @media screen and (max-width: 768px) {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
