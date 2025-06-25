<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { useI18n } from '@/i18n';
import { useRouter, useData } from 'vitepress';

import { getSecurityDetail } from '@/api/api-security';
import { handleError } from '@/shared/utils';

import AppContent from '@/components/AppContent.vue';

import IconChevron from '~icons/app/icon-chevron-right.svg';

const i18n = useI18n();
const router = useRouter();
const { lang } = useData();

const detailData: any = ref({});
const cveIdList = ref<string[]>([]);
const referenceLinkList = ref<string[]>([]);

const queryData = ref('');

function getSecurityDetailInfo(data: any) {
  getSecurityDetail(data).then((res: any) => {
    if (res && res.body && res.body.cveNumbers && res.body.referenceLink) {
      detailData.value = res.body;
      cveIdList.value = res.body.cveNumbers.split(';');
      referenceLinkList.value = res.body.referenceLink.split(';');
    } else {
      handleError();
    }
  });
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
                  <p v-for="(item, index) in cveIdList" :key="index" class="tab-content-item-link" @click="goCveDetail(item)">
                    {{ item }}
                  </p>
                </div>
                <div class="tab-content-item lable-name5">
                  <h5 class="tab-content-item-title">
                    {{ i18n.security.REFERENCE_DOCUMENTS }}
                  </h5>
                  <div v-for="item in referenceLinkList" :key="item" class="tab-content-item-text">
                    <a :href="item" target="_blank" rel="noopener noreferrer">{{ item }}</a>
                  </div>
                </div>
              </div>
            </OTabPane>

            <OTabPane :label="i18n.security.UPDATED_PACKAGES">
              <div class="tab-content">
                <div v-for="item in detailData.versionsBody" :key="item" class="packge-item">
                  <h2 class="packge-item-title">openGauss-{{ item.versions }}</h2>
                  <div v-for="it in item.packageBody" :key="it" class="packge-item-class">
                    <p class="packge-item-class-achitecture">
                      {{ it.groupName }}
                    </p>

                    <div v-for="single in it.tagBody" :key="single.packageName" class="packge-list">
                      <ul class="list-head">
                        <li></li>
                        <li v-for="platItemHead in i18n.security.PACK_LIST" :key="platItemHead">
                          {{ platItemHead }}
                        </li>
                      </ul>
                      <ul class="list-body">
                        <li>{{ single.packageName }}</li>
                        <li v-for="(platItem, index) in single.affectedPlatform" :key="platItem">
                          {{ platItem === i18n.security.PACK_LIST[index] ? '✓' : '' }}
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div v-for="item in detailData.versionsBody" :key="item" class="packge-item-mobile">
                  <h2 class="packge-item-title">openGauss-{{ item.versions }}</h2>
                  <div v-for="it in item.packageBody" :key="it" class="packge-item-class">
                    <p class="packge-item-class-achitecture">
                      {{ it.groupName }}
                    </p>
                    <div v-for="single in it.tagBody" :key="single" class="packge-item-class-rpm">
                      <h5 class="first-title">{{ i18n.security.SOFT_PACK }}</h5>
                      <p>{{ single.packageName }}</p>
                      <h5>{{ i18n.security.PLAT }}</h5>
                      <p v-for="platItem in single.affectedPlatform" :key="platItem">
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
    background-color: var(--e-color-bg2);
    box-shadow: var(--e-shadow-l1);
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
      height: 38px;
      background-color: var(--e-color-bg2);
    }
  }
}
.detail-head {
  background-color: var(--e-color-bg1);
  .breadcrumb {
    color: var(--e-color-text1);
    background: var(--e-color-bg1);
    display: flex;
    @media screen and (max-width: 768px) {
      margin-bottom: var(--e-spacing-h5);
    }
    .last-page {
      color: var(--e-color-text4);
      font-size: var(--e-font-size-tip);
      font-weight: 300;
      line-height: var(--e-line-height-tip);
      cursor: pointer;
    }
    .separtor {
      margin: 0 var(--e-spacing-h10);
      .o-icon {
        color: var(--e-color-text1);
      }
    }
    .current-page {
      color: var(--e-color-text1);
      font-size: var(--e-font-size-tip);
      font-weight: 600;
      line-height: var(--e-line-height-tip);
    }
  }
  .bulletin-head {
    padding: var(--e-spacing-h2) var(--e-spacing-h2) var(--e-spacing-h2) 0;
    background: var(--e-color-bg1);
    @media screen and (max-width: 768px) {
      padding: var(--e-spacing-h5);
      margin: 0 0 var(--e-spacing-h5);
      background: var(--e-color-bg2);
      box-shadow: var(--e-shadow-l1);
    }
    .bulletin-name {
      font-size: var(--e-font-size-h3);
      font-weight: 300;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-h3);
      @media screen and (max-width: 768px) {
        line-height: var(--e-line-height-h8);
        font-size: var(--e-font-size-h8);
        font-weight: 300;
        color: var(--e-color-text1);
        margin-bottom: var(--e-spacing-h8);
      }
    }
    .bulletin-intro {
      font-size: var(--e-font-size-text);
      font-weight: 300;
      color: var(--e-color-text1);
      line-height: var(--e-line-height-text);
      margin-top: var(--e-spacing-h4);
      & div {
        display: flex;
      }
      span {
        display: inline-block;
        margin-right: var(--e-spacing-h8);
      }
      @media screen and (max-width: 768px) {
        margin: 0;
        font-size: var(--e-font-size-tip);
        font-weight: 300;
        color: var(--e-color-text1);
        line-height: var(--e-line-height-tip);
      }
    }
  }
}
.detail-body-pc {
  background-color: var(--e-color-bg1);
  @media screen and (max-width: 768px) {
    width: 100%;
    padding: 0;
  }
  .tabs-container {
    .o-tabs {
      .wrapper1 {
        max-width: 1504px;
        margin: 0 auto;
        background-color: var(--e-color-bg1);
        @media screen and (max-width: 768px) {
          margin: 16px 0 40px;
        }
        .tab-content {
          padding: var(--e-spacing-h2);
          background-color: var(--e-color-bg2);
          @media screen and (max-width: 768px) {
            padding: var(--e-spacing-h5);
            &-item:last-child {
              margin-bottom: 0;
            }
            h5 {
              font-size: var(--e-font-size-text);
              line-height: var(--e-line-height-text);
              color: var(--e-color-text1);
              font-weight: 300;
            }
            .first-title {
              margin-top: 0;
            }
            .tab-content-item-text {
              margin-top: var(--e-spacing-h7);
            }
            .tab-content-item-link {
              color: var(--e-color-brand1);
            }
            .packge-item-class-rpm {
              margin-top: var(--e-spacing-h8);
              padding: var(--e-spacing-h8);
              border: 1px solid var(--e-color-border2);
              &:nth-of-type(2n + 1) {
                background-color: var(--e-color-bg3);
              }
              p {
                color: var(--e-color-text4);
                font-size: var(--e-font-size-tip);
                line-height: var(--e-line-height-tip);
              }
            }
          }
          &-item {
            margin-bottom: var(--e-spacing-h2);
            @media screen and (max-width: 768px) {
              margin-bottom: var(--e-spacing-h4);
            }
            &:last-child {
              margin-bottom: 0;
            }
            &-title {
              font-size: var(--e-font-size-h5);
              font-weight: 300;
              color: var(--e-color-text1);
              line-height: var(--e-line-height-h5);
              margin-bottom: var(--e-spacing-h5);
              @media screen and (max-width: 768px) {
                font-size: var(--e-font-size-text);
                font-weight: 300;
                line-height: var(--e-line-height-text);
              }
            }
            &-link {
              color: var(--e-color-link1);
              font-size: var(--e-font-size-text);
              font-weight: 300;
              line-height: var(--e-line-height-text);
              cursor: pointer;
              @media screen and (max-width: 768px) {
                font-size: var(--e-font-size-tip);
                font-weight: 300;
                line-height: var(--e-line-height-tip);
              }
            }
            &-text {
              font-size: var(--e-font-size-text);
              font-weight: 300;
              color: var(--e-color-text1);
              line-height: var(--e-line-height-text);
              @media screen and (max-width: 768px) {
                font-size: var(--e-font-size-tip);
                font-weight: 300;
                line-height: var(--e-line-height-tip);
              }
              a {
                color: var(--e-color-link1);
              }
            }
          }
          .packge-item {
            @media screen and (max-width: 768px) {
              display: none;
            }
            &-title {
              font-size: var(--e-font-size-h5);
              font-weight: 300;
              line-height: var(--e-line-height-h8);
              margin-bottom: var(--e-spacing-h6);
              color: var(--e-color-text1);
              @media screen and (max-width: 768px) {
                font-size: var(--e-font-size-text);
                line-height: var(--e-line-height-text);
                color: var(--e-color-text1);
              }
            }
            &-class {
              margin-bottom: var(--e-spacing-h4);
              &:last-child {
                margin-bottom: 0;
              }
              &-achitecture {
                color: var(--e-color-text1);
                font-size: var(--e-font-size-h7);
                line-height: 64px;
                @media screen and (max-width: 768px) {
                  margin-top: 10px;
                  font-size: var(--e-font-size-tip);
                  line-height: var(--e-line-height-tip);
                  color: var(--e-color-text1);
                }
              }
              .packge-list {
                .list-head {
                  display: flex;
                  background-color: var(--e-color-bg4);
                  li {
                    width: 280px;
                    height: 52px;
                    line-height: 52px;
                    text-align: center;
                    font-size: var(--e-font-size-text);
                    color: var(--e-color-text1);
                  }
                }
                .list-body {
                  display: flex;
                  li {
                    width: 280px;
                    height: 52px;
                    line-height: 52px;
                    text-align: center;
                    font-size: var(--e-font-size-text);
                    color: var(--e-color-text4);
                    & + li {
                      color: var(--e-color-brand1);
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
