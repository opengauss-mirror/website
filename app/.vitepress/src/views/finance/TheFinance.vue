<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { ref, computed } from 'vue';
import { useCommon } from '@/stores/common';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import FinanceContentMb from './FinanceContentMb.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import banner from '@/assets/category/finance/banner-financial.png';
import bannerMb from '@/assets/category/finance/banner-financial-mb.png';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconArrow from '~icons/app/icon-chevron-right.svg';
import IconMessage from '~icons/app/icon-message.svg';

import financial from '@/data/financial';

import { useI18n } from '@/i18n';
const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();
const router = useRouter();

const screenWidth = useWindowResize();
const isMobile = computed(() => (screenWidth.value <= 768 ? true : false));

const isLight = computed(() => {
  return commonStore.theme === 'light' ? true : false;
});

const tabShow = ref(0);
// 案例详情
const goCaseDetail = (link: string) => {
  window.open(`/${lang.value}${link}`, '_blank');
};
// 案例官网
const goOfficialWeb = (link: string) => {
  window.open(link, '_blank');
};
// 互动专区
const goInteractiveZone = () => {
  window.open(financial.zh.interaction.jumpLink, '_blank');
};
// 查看更多案例
const secarchMore = () => {
  window.open(`/${lang.value}/userPractice/`, '_blank');
};
// 下载页
const goDownloadPage = () => {
  router.go(`/${lang.value}/download/`);
};
</script>
<template>
  <div class="finaance">
    <BannerLevel2
      :background-image="isMobile ? bannerMb : banner"
      :title="i18n.finance.FINANCIAL_ZONE"
    />

    <template v-if="!isMobile">
      <div class="section">
        <h1 class="section-title">{{ financial.zh.version.title }}</h1>
        <p
          v-for="item in financial.zh.version.descs"
          :key="item"
          class="section-desc"
        >
          {{ item }}
        </p>
      </div>

      <div class="section">
        <h1 class="section-title">{{ financial.zh.advantages.title }}</h1>

        <div class="advantages">
          <div
            v-for="item in financial.zh.advantages.lists"
            :key="item.feature"
            class="advantage-item"
          >
            <img :src="isLight ? item.img : item.img_dark" alt="" />
            <p class="feature">{{ item.feature }}</p>
            <p class="feature-desc">{{ item.desc }}</p>
          </div>
        </div>
      </div>

      <div class="section-1">
        <div class="container">
          <h1 class="section-title">{{ financial.zh.technologies.title }}</h1>

          <OTabs v-model="tabShow">
            <OTabPane
              v-for="(item, index) in financial.zh.technologies.tab_lists"
              :key="item.title"
              :label="item.title"
              :name="index"
            >
              <div v-if="tabShow === 0" class="tab-content">
                <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>

                <div class="img-box">
                  <img
                    class="storage"
                    :src="isLight ? item.img : item.img_dark"
                    alt=""
                  />
                </div>
              </div>

              <div v-if="tabShow === 1" class="tab-content">
                <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>
                <div class="img-box">
                  <img
                    class="capability"
                    :src="isLight ? item.img : item.img_dark"
                    alt=""
                  />
                </div>
              </div>

              <div v-if="tabShow === 2" class="tab-content">
                <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>
                <div class="img-box">
                  <img
                    class="scale-out"
                    :src="isLight ? item.img : item.img_dark"
                    alt=""
                  />
                </div>
              </div>

              <div v-if="tabShow === 3" class="tab-content">
                <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>
                <div class="img-box">
                  <img
                    class="db-mind"
                    :src="isLight ? item.img : item.img_dark"
                    alt=""
                  />
                </div>
              </div>
            </OTabPane>
          </OTabs>
        </div>
      </div>

      <div class="section">
        <h1 class="section-title">{{ financial.zh.cases.title }}</h1>

        <div class="card-box">
          <OCard v-for="card in financial.zh.cases.case_list" :key="card.name">
            <div>
              <p class="card-title">{{ card.name }}</p>

              <p class="card-desc">{{ card.desc }}</p>
            </div>

            <div class="btn-box">
              <OButton
                type="primary"
                size="mini"
                class="more-btn"
                animation
                @click="goCaseDetail(card.detailLink)"
              >
                {{ i18n.finance.CASE_DETAIL }}
                <template #suffixIcon>
                  <IconArrowRight class="btn-icon" />
                </template>
              </OButton>
              <OButton
                size="mini"
                class="website-btn"
                animation
                @click="goOfficialWeb(card.officialLink)"
              >
                {{ i18n.finance.OFFICIAL_WEBSITE }}
                <template #suffixIcon>
                  <IconArrowRight class="btn-icon" />
                </template>
              </OButton>
            </div>
          </OCard>
        </div>

        <OButton type="text" animation class="search-more" @click="secarchMore">
          {{ i18n.finance.SEARCH_MORE }}
          <template #suffixIcon>
            <IconArrowRight class="icon-search" />
          </template>
        </OButton>
      </div>

      <div class="section">
        <h1 class="section-title">{{ financial.zh.interaction.title }}</h1>

        <div class="interaction-card">
          <OIcon><IconMessage /></OIcon>

          <div class="card-content">
            <h1>{{ financial.zh.interaction.card_title }}</h1>
            <p @click="goInteractiveZone">
              <span>{{ financial.zh.interaction.card_desc }}</span>
              <OIcon><IconArrow /></OIcon>
            </p>
          </div>
        </div>
      </div>

      <div class="section-2">
        <h1 class="section-title">{{ financial.zh.download.title }}</h1>

        <div class="version-download">
          <h1 class="experience">{{ i18n.finance.EXPERIENCE }}</h1>

          <OButton
            type="primary"
            size="small"
            animation
            class="download-btn"
            @click="goDownloadPage"
          >
            {{ i18n.finance.DOWNLOAD }}
            <template #suffixIcon>
              <IconArrowRight />
            </template>
          </OButton>
        </div>
      </div>
    </template>

    <FinanceContentMb v-else />
  </div>
</template>
<style lang="scss" scoped>
:deep(.o-tabs) {
  .el-tabs__nav-scroll {
    display: flex;
    justify-content: center;
  }
  &.el-tabs .el-tabs__nav-wrap .el-tabs__item.is-active {
    color: var(--o-color-text1);
    font-weight: 500;
  }
  &.el-tabs .el-tabs__nav-wrap .el-tabs__item:hover {
    color: var(--o-color-text1);
    font-weight: 500;
  }
  .el-tabs__active-bar {
    background: var(--o-color-text1);
  }
}
.section {
  max-width: 1504px;
  padding-left: 44px;
  padding-right: 44px;
  margin: 0 auto;
  margin-top: 64px;
  &:first-child {
    margin-top: 0;
  }
}
.section-1 {
  margin-top: 64px;
  padding: 64px 0 24px;
  background-color: var(--o-color-bg2);
  .container {
    max-width: 1504px;
    padding-left: 44px;
    padding-right: 44px;
    margin: 0 auto;
  }
}
.section-2 {
  margin-top: 64px;
  background-color: transparent;
  .container {
    max-width: 1504px;
    padding-left: 44px;
    padding-right: 44px;
    margin: 0 auto;
  }
}
.section-title {
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  font-weight: 300;
  color: var(--o-color-text1);
  text-align: center;
  margin-bottom: 40px;
}
.section-desc {
  font-size: var(--o-font-size-text);
  line-height: var(--o-line-height-text);
  font-weight: 400;
  color: var(--o-color-text1);
  opacity: 0.8;
  padding: 0 126px;
  @media screen and (max-width: 1080px) {
    padding: 0 64px;
  }
}
.advantages {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 46px 40px;
}
.advantage-item {
  width: calc((100% - 132px) / 4);
  text-align: center;
  img {
    width: 56px;
    height: 56px;
  }
  .feature {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    margin-top: 16px;
  }
  .feature-desc {
    margin-top: 12px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    opacity: 0.8;
  }
}
.tab-content {
  padding-top: 24px;
  p {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    font-weight: 400;
    color: var(--o-color-text1);
    opacity: 0.8;
    text-align: center;
  }
  .img-box {
    margin-top: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    .storage {
      width: 326px;
    }
    .capability {
      width: 598px;
    }
    .scale-out {
      width: 890px;
    }
    .db-mind {
      width: 732px;
    }
    .gauss-db {
      width: 880px;
      margin-top: 16px;
    }
  }
}

:deep(.o-card) {
  --el-card-padding: 40px;
  .el-card__body {
    background-image: url('@/assets/category/finance/card-bg.png');
    background-size: 100% 100%;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    @media screen and (max-width: 768px) {
      background-image: url('@/assets/category/finance/card-bg-mb.png');
      padding: 16px 12px;
      flex-direction: row;
      align-items: center;
    }
  }
}
.card-box {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 16px;
  @media screen and (max-width: 1080px) {
    grid-template-columns: repeat(2, 1fr);
  }
  .card-title {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    font-weight: 500;
    color: var(--o-color-white);
  }
  .card-desc {
    margin-top: 12px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    font-weight: 400;
    color: var(--o-color-white);
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .btn-box {
    margin-top: 38px;
    display: flex;
    column-gap: 16px;
    .btn-icon {
      width: 12px;
      height: 12px;
    }
  }
}
.icon-search {
  color: var(--o-color-brand3);
  width: 16px;
  height: 16px;
}
.search-more {
  margin-top: 28px;
  margin-left: 50%;
  transform: translatex(-50%);
}
.more-btn {
  margin-right: 16px;
  color: var(--o-color-white);
}
.website-btn {
  border-color: var(--o-color-white);
  color: var(--o-color-white);
}

.interaction-card {
  width: 692px;
  height: 120px;
  background-color: var(--o-color-bg2);
  padding: 24px 32px;
  margin: 0 auto;
  display: flex;

  .o-icon {
    margin-right: 16px;
    font-size: 48px;
    color: var(--o-color-text1);
  }
  h1 {
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    font-weight: 500;
    color: var(--o-color-text1);
  }
  p {
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    font-weight: 400;
    color: var(--o-color-text4);
    margin-top: 12px;
    display: flex;
    align-items: center;
    cursor: pointer;
    .o-icon {
      font-size: 24px;
      color: var(--o-color-text4);
    }
  }
}

.version-download {
  background: url('@/assets/category/finance/download-bg.png') no-repeat center;
  padding: 62px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.experience {
  font-size: var(--o-font-size-h3);
  line-height: var(--o-line-height-h3);
  font-weight: 500;
  color: var(--o-color-white);
  margin-bottom: 24px;
}
.download-btn {
  color: var(--o-color-white);
}
</style>
