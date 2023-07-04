<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { useI18n } from '@/i18n';
import { getCveDetail } from '@/api/api-security';
import { useRouter, useData } from 'vitepress';
import { AffectProduct } from '@/shared/@types/type-security';
import { handleError } from '@/shared/utils';

import AppContent from '@/components/AppContent.vue';

import IconChevron from '~icons/app/icon-chevron-right.svg';

const { lang } = useData();
const i18n = useI18n();
const router = useRouter();

const cveDetailData: any = ref({});
const affectedProductList = ref<AffectProduct[]>([]);
const advisories: any = ref([]);
const cvssList: any = ref([]);

function goBackPage() {
  const i = router.route.path.lastIndexOf('d');
  router.go(`${router.route.path.substring(0, i)}`);
}

function jumpBulletinDetail(val: any) {
  if (val === '') {
    return;
  }
  router.go(`/${lang.value}/security-advisories/detail/?id=${val}`);
}

onMounted(() => {
  const i1 = window.location.href.indexOf('=');
  const cveNum = window.location.href.substring(i1 + 1);
  try {
    getCveDetail(cveNum).then((res: any) => {
      cveDetailData.value = res.body;
      cvssList.value = [
        {
          cate: 'CVSS评分',
          NVD: cveDetailData.value.CVSSV3.NVDScore,
          openGauss: cveDetailData.value.CVSSV3.openGaussScore,
        },
        {
          cate: 'Attack Vector',
          NVD: cveDetailData.value.CVSSV3.nAttackVector,
          openGauss: cveDetailData.value.CVSSV3.oAttackVector,
        },
        {
          cate: 'Attack Complexity',
          NVD: cveDetailData.value.CVSSV3.nAttackComplexity,
          openGauss: cveDetailData.value.CVSSV3.oAttackComplexity,
        },
        {
          cate: 'Privileges Required',
          NVD: cveDetailData.value.CVSSV3.nPrivilegeRequired,
          openGauss: cveDetailData.value.CVSSV3.oPrivilegeRequired,
        },
        {
          cate: 'User Interaction',
          NVD: cveDetailData.value.CVSSV3.nUserInteraction,
          openGauss: cveDetailData.value.CVSSV3.oUserInteraction,
        },
        {
          cate: 'Scope',
          NVD: cveDetailData.value.CVSSV3.nScope,
          openGauss: cveDetailData.value.CVSSV3.oScope,
        },
        {
          cate: 'Confidentiality',
          NVD: cveDetailData.value.CVSSV3.nConfidentiality,
          openGauss: cveDetailData.value.CVSSV3.oConfidentiality,
        },
        {
          cate: 'Integrity',
          NVD: cveDetailData.value.CVSSV3.nIntegrity,
          openGauss: cveDetailData.value.CVSSV3.oIntegrity,
        },
        {
          cate: 'Availability',
          NVD: cveDetailData.value.CVSSV3.nAvailability,
          openGauss: cveDetailData.value.CVSSV3.oAvailability,
        },
      ];
      advisories.value = [res.body.saBody];
      affectedProductList.value = res.body.affectBody;
    });
  } catch (e: any) {
    handleError('Error!')
  }
});
</script>
<template>
  <AppContent :mobile-top="16">
    <div class="breadcrumb">
      <p class="last-page" @click="goBackPage">
        {{ i18n.security.CVE }}
      </p>
      <span class="separtor"
        ><o-icon><icon-chevron></icon-chevron></o-icon
      ></span>
      <p class="current-page">{{ i18n.security.CVE_DETAIL }}</p>
    </div>
    <div class="cve-head">
      <p class="cve-name">{{ cveDetailData.cveNum }}</p>
      <div class="cve-intro">
        <div>
          <span>{{ i18n.security.RELEASE_DATE }}:</span>
          <p>{{ cveDetailData.releaseDate }}</p>
        </div>
        <div>
          <span>{{ i18n.security.MODIFIED_TIME }}: </span>
          <p>{{ cveDetailData.updateTime }}</p>
        </div>
      </div>
    </div>
    <div class="cve-detail-body">
      <!-- 概要 -->
      <div class="detail-item">
        <h2 class="detail-item-title">{{ i18n.security.SYNOPSIS }}</h2>
        <p
          v-dompurify-html="cveDetailData.description"
          class="detail-item-content"
        ></p>
      </div>
      <!-- CVSS v3指标 -->
      <div class="detail-item">
        <h2 class="detail-item-title">{{ i18n.security.METRICS_V3 }}</h2>
        <OTable class="pc-list" :data="cvssList" style="width: 100%">
          <OTableColumn label="" prop="cate"> </OTableColumn>
          <OTableColumn label="NVD" prop="NVD"> </OTableColumn>
          <OTableColumn label="openGauss" prop="openGauss"> </OTableColumn>
        </OTable>
      </div>
      <!-- 安全公告 -->
      <div class="detail-item">
        <h2 class="detail-item-title">
          {{ i18n.security.SECURITY_ADVISORIES }}
        </h2>
        <OTable class="affect-list" :data="advisories">
          <el-table-column :label="i18n.security.ADVISORY">
            <template #default="scope">
              <span
                class="detail-page"
                @click="jumpBulletinDetail(scope.row.gaussSaNum)"
              >
                {{ scope.row.gaussSaNum }}
              </span>
            </template>
          </el-table-column>
          <OTableColumn :label="i18n.security.SYNOPSIS" prop="summary">
          </OTableColumn>
          <OTableColumn :label="i18n.security.RELEASE_DATE" prop="releaseDate">
          </OTableColumn>

          <!-- <OTableColumn :label="i18n.security.RELEASE_DATE" prop="releaseTime">
          </OTableColumn> -->
        </OTable>
        <ul class="mobile-list">
          <li v-for="item in advisories" :key="item.saId" class="item">
            <ul>
              <li>
                <span>{{ i18n.security.ADVISORY }}:</span
                ><a
                  class="detail-link"
                  @click="jumpBulletinDetail(item.gaussSaNum)"
                  >{{
                    item.gaussSaNum
                      ? item.gaussSaNum
                      : i18n.security.EMPTY_SEARCH_RESULT
                  }}</a
                >
              </li>
              <li>
                <span>{{ i18n.security.SYNOPSIS }}:</span
                >{{
                  item.summary
                    ? item.summary
                    : i18n.security.EMPTY_SEARCH_RESULT
                }}
              </li>
              <li>
                <span>{{ i18n.security.RELEASE_DATE }}:</span
                >{{
                  item.releaseDate
                    ? item.releaseDate
                    : i18n.security.EMPTY_SEARCH_RESULT
                }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!-- 影响产品 -->
      <div class="detail-item">
        <h2 class="detail-item-title">
          {{ i18n.security.AFFECTED_PRODUCTS }}
        </h2>

        <OTable class="affect-list" :data="affectedProductList">
          <OTableColumn :label="i18n.security.PRODUCT" prop="affectProduct">
          </OTableColumn>
          <OTableColumn :label="i18n.security.PACKAGE" prop="packName">
          </OTableColumn>
          <OTableColumn :label="i18n.security.STATUS" prop="fixLabel">
          </OTableColumn>
        </OTable>
        <ul class="mobile-list">
          <li
            v-for="item in affectedProductList"
            :key="item.affectProduct"
            class="item"
          >
            <ul>
              <li>
                <span>{{ i18n.security.PRODUCT }}:</span
                >{{ item.affectProduct }}
              </li>
              <li>
                <span>{{ i18n.security.PACKAGE }}:</span>{{ item.packName }}
              </li>
              <li>
                <span>{{ i18n.security.STATUS }}:</span>{{ item.fixLabel }}
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </AppContent>
</template>
<style lang="scss" scoped>
.detail-link {
  color: var(--o-color-link1);
  cursor: pointer;
}
.breadcrumb {
  display: flex;
  color: var(--o-color-text1);
  background: var(--o-color-bg1);
  @media screen and (max-width: 768px) {
    margin-bottom: var(--o-spacing-h5);
  }
  .last-page {
    font-weight: 300;
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text4);
    cursor: pointer;
  }
  .separtor {
    margin: 0 var(--o-spacing-h10);
    .o-icon {
      color: var(--o-color-text1);
    }
  }
  .current-page {
    font-size: var(--o-font-size-tip);
    font-weight: 600;
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text1);
  }
}
.cve-head {
  padding: var(--o-spacing-h2) var(--o-spacing-h2) var(--o-spacing-h2) 0;
  background: var(--o-color-bg1);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h5);
    background: var(--o-color-bg2);
    box-shadow: var(--o-shadow-l1);
  }
  .cve-name {
    font-weight: 300;
    font-size: var(--o-font-size-h3);
    line-height: var(--o-line-height-h3);
    color: var(--o-color-text1);
    @media screen and (max-width: 768px) {
      margin-bottom: var(--o-spacing-h8);
      font-size: var(--o-font-size-h8);
      font-weight: 300;
      line-height: var(--o-line-height-h8);
      color: var(--o-color-text1);
    }
  }
  .cve-intro {
    font-size: var(--o-font-size-text);

    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    div {
      display: flex;
    }
    span {
      display: inline-block;
      margin-right: var(--o-spacing-h8);
    }
    @media screen and (max-width: 768px) {
      margin: 0;
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.cve-detail-body {
  background-color: var(--o-color-bg2);
  padding: var(--o-spacing-h2);
  @media screen and (max-width: 768px) {
    padding: var(--o-spacing-h5);
  }
  .detail-item {
    margin-bottom: var(--o-spacing-h2);
    &:last-child {
      margin-bottom: 0;
    }
    @media screen and (max-width: 768px) {
      background-color: var(--o-color-bg2);
    }
    &-title {
      margin-bottom: var(--o-spacing-h4);
      font-size: var(--o-font-size-h5);
      font-weight: 300;
      color: var(--o-color-text1);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        margin-bottom: var(--o-spacing-h8);
      }
    }
    .pc-list {
      box-shadow: none;
    }
    &-content {
      color: var(--o-color-text4);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      margin-bottom: var(--o-spacing-h2);
      word-break: break-word;
      text-align: justify;
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
        margin-bottom: var(--o-spacing-h4);
      }
    }
    .metrics-list,
    .affect-list {
      margin-bottom: var(--o-spacing-h2);
      .detail-page {
        color: var(--o-color-link1);
        cursor: pointer;
      }
      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .mobile-list {
      display: none;
      @media screen and (max-width: 768px) {
        display: block;
      }
      .item {
        padding: var(--o-spacing-h5);
        font-size: var(--o-font-size-tip);
        font-weight: 300;
        color: var(--o-color-neutral8);
        line-height: var(--o-line-height-tip);
        background-color: var(--o-color-bg4);
        &:nth-child(2n) {
          background: var(--o-color-bg1);
        }
        & li {
          margin-bottom: var(--o-spacing-h8);
        }
        li:nth-child(2) {
          display: flex;
        }
        li:last-child {
          margin-bottom: 0;
          a {
            color: var(--o-color-link1);
          }
        }
        span {
          color: var(--o-color-text1);
          margin-right: var(--o-spacing-h8);
        }
      }
    }
  }
  :deep(thead) {
    tr th .cell {
      font-weight: 700;
    }
  }
}
</style>
