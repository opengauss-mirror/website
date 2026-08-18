<script setup lang="ts">
import { DATA_LINK, DOCS_LINK } from '@/data/url-config';
import AppSection from '~@/components/AppSection.vue';
import { useScreen } from '~@/composables/useScreen';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { OIcon, OIconChevronRight, OLink } from '@opensig/opendesign';

import ExploreBg from '~@/assets/category/home/home-explore-bg.png';
import ExploreBgDark from '~@/assets/category/home/home-explore-bg-dark.png';
import ExploreImg from '~@/assets/category/home/explore-img.png';
import ExploreImgDark from '~@/assets/category/home/explore-img-dark.png';

import { useI18n } from '~@/i18n';

import IconJoinContribute from '~icons/home/icon-join-contribute.svg';
import IconInstall from '~icons/home/icon-install.svg';
import IconService from '~icons/home/icon-service.svg';
import { onMounted, ref } from 'vue';
import { getVigorData } from '~@/api/api-magic';
import { useData } from 'vitepress';

const { lang } = useData();
const { isPhone } = useScreen();
const { isDark } = storeToRefs(useCommon());

const i18n = useI18n();
const data = ref({} as Record<string, number>);

const formatCompactSize = (number: number, precision: number = 1): string => {
  if (Number.isNaN(parseInt(number.toString()))) {
    return number.toString();
  }
  if (number < 1000) return `${number}`;
  const units = ['', 'k', 'M', 'G', 'T'];
  const k = 1000;
  const i = Math.floor(Math.log(number) / Math.log(k));
  return parseFloat((number / Math.pow(k, i)).toFixed(precision)) + units[i];
};

onMounted(async () => {
  data.value = (await getVigorData())?.data ?? {};
});
</script>

<template>
  <AppSection :title="isPhone ? $t('home.HOME_EXPLORE.EXPLORE_TITLE_MO') : $t('home.HOME_EXPLORE.EXPLORE_TITLE')">
    <div class="home-explore" :style="{ backgroundImage: `url(${isDark ? ExploreBgDark : ExploreBg})` }">
      <div class="explore-main">
        <img class="item-img" :src="isDark ? ExploreImgDark : ExploreImg" alt="" />
        <h3>{{ i18n.home.HOME_EXPLORE.LIST[0].NAME }}</h3>
        <p class="home-explore-desc">
          {{ i18n.home.HOME_EXPLORE.LIST[0].DESC }}
          <OLink
            color="primary"
            :href="`${DOCS_LINK}/zh/docs/latest/getting_started/understanding_opengauss.html`"
            target="_blank"
            rel="noopener noreferrer"
            >{{ i18n.home.viewMore }}</OLink
          >
        </p>
        <div class="home-explore-items">
          <div class="item-wrapper">
            <div class="item">
              <OIcon class="title-icon"><IconInstall /></OIcon>
              <p class="item-title">{{ i18n.home.HOME_EXPLORE.LIST[1].NAME }}</p>
              <p class="item-desc">{{ i18n.home.HOME_EXPLORE.LIST[1].DESC }}</p>
              <OLink
                :href="`${DOCS_LINK}/zh/docs/latest/installation_guide/installation_overview.html`"
                :hover-underline="false"
                target="_blank"
                rel="noopener noreferrer"
              >
                <template #suffix
                  ><OIcon><OIconChevronRight /></OIcon
                ></template>
                {{ i18n.home.viewMore }}
              </OLink>
            </div>
          </div>
          <div class="item-wrapper">
            <div class="item">
              <OIcon class="title-icon"><IconJoinContribute /></OIcon>
              <p class="item-title">{{ i18n.home.HOME_EXPLORE.LIST[2].NAME }}</p>
              <p class="item-desc">{{ i18n.home.HOME_EXPLORE.LIST[2].DESC }}</p>
              <OLink :href="i18n.home.HOME_EXPLORE.LIST[2].PATH" target="_blank" rel="noopener noreferrer" :hover-underline="false">
                <template #suffix
                  ><OIcon><OIconChevronRight /></OIcon
                ></template>
                {{ i18n.home.viewMore }}
              </OLink>
            </div>
          </div>
          <div class="item-wrapper">
            <div class="item">
              <OIcon class="title-icon"><IconService /></OIcon>
              <p class="item-title">{{ i18n.home.HOME_EXPLORE.LIST[3].NAME }}</p>
              <p class="item-desc">{{ i18n.home.HOME_EXPLORE.LIST[3].DESC }}</p>
              <OLink :href="`/${lang}/sig/sig-list/`" :hover-underline="false">
                <template #suffix
                  ><OIcon><OIconChevronRight /></OIcon
                ></template>
                {{ i18n.home.viewMore }}
              </OLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="community-vigor">
      <p class="title">{{ i18n.home.HOME_EXPLORE.momentnum }}</p>
      <div class="vigor-detail">
        <div>
          <p class="detail-num">{{ data.contributor_all || 0 }}</p>
          <p class="detail-label">{{ i18n.home.HOME_EXPLORE.contributors }}</p>
        </div>
        <div class="divider"></div>
        <div>
          <p class="detail-num">{{ data.download_all || 0 }}</p>
          <p class="detail-label">{{ i18n.home.HOME_EXPLORE.downloads }}</p>
        </div>
        <div class="divider"></div>
        <div>
          <p class="detail-num">{{ data.company_all || 0 }}</p>
          <p class="detail-label">{{ i18n.home.HOME_EXPLORE.organizations }}</p>
        </div>
        <div class="divider"></div>
        <div>
          <p class="detail-num">{{ data.sig_all || 0 }}</p>
          <p class="detail-label">{{ i18n.home.HOME_EXPLORE.sigs }}</p>
        </div>
        <div class="divider"></div>
        <div>
          <p class="detail-num">{{ formatCompactSize(data.issue_all || 0) }}</p>
          <p class="detail-label">{{ i18n.home.HOME_EXPLORE.issues }}</p>
        </div>
      </div>
      <OLink :href="DATA_LINK" target="_blank" rel="noopener noreferrer" :hover-underline="false">
        <template #suffix
          ><OIcon><OIconChevronRight /></OIcon
        ></template>
        {{ i18n.home.HOME_EXPLORE.learnMore }}
      </OLink>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
:deep(.o-link .o-link-label) {
  display: inline;
}

.o-link-normal {
  --link-color: var(--o-color-info1);
}

.home-explore {
  background-size: cover;
  border-radius: 4px;
}

.explore-main {
  padding: var(--o-r-gap-6);
  position: relative;
  h3 {
    font-weight: 600;
    font-size: var(--o-r-font_size-h1);
    line-height: var(--o-r-line_height-h1);
  }
  .item-img {
    position: absolute;
    width: 264px;
    right: 0;
    top: var(--o-r-gap-5);

    @include respond-to('laptop') {
      width: 192px;
    }
    @include respond-to('pad_h') {
      width: 160px;
    }
    @include respond-to('<=pad_v') {
      width: 128px;
    }
    @include respond-to('phone') {
      display: none;
    }
  }
}

.home-explore-desc {
  position: relative;
  margin-top: 12px;
  font-size: var(--o-r-font_size-text2);
  line-height: var(--o-r-line_height-text2);
  color: var(--o-color-info3);
  z-index: 1;
  @include respond-to('pad_v') {
    margin-right: 120px;
  }
}

.home-explore-items {
  margin-top: var(--o-r-gap-6);
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: auto;
  gap: var(--o-r-gap-5);

  @include respond-to('pad_v') {
    grid-template-columns: repeat(2, 1fr);
  }

  @include respond-to('phone') {
    grid-template-columns: repeat(1, 1fr);
  }

  .item-wrapper {
    --border-color: linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));
    --background-color: linear-gradient(rgba(255, 255, 255, 0.5) 20%, rgba(255, 255, 255, 1) 99%);
    position: relative;
    padding: 2px;
    &::after {
      content: '';
      box-sizing: border-box;
      position: absolute;
      top: -50%;
      right: -50%;
      bottom: -50%;
      left: -50%;
      transform: scale(0.5);
      z-index: 1;

      /* 圆角大小，注意scale的缩放*/
      border-radius: 8px;
      /* 边框大小，不能小于0.5，注意scale的缩放 */
      padding: 4px;
      /* 边框颜色 */
      background: var(--border-color);

      /* 核心，兼容性 ios2+ android2+ */
      -webkit-mask:
        linear-gradient(#fff 0 100%) content-box,
        linear-gradient(#fff 0 100%);
      mask:
        linear-gradient(#fff 0 100%) content-box,
        linear-gradient(#fff 0 100%);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
    }
  }

  .item {
    z-index: 2;
    position: relative;
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    align-items: start;
    height: 100%;
    padding: var(--o-r-gap-5);
    background: var(--background-color);
    backdrop-filter: blur(10px);

    .title-icon {
      font-size: var(--o-r-font_size-display3);
      margin-bottom: var(--o-r-gap-2);

      @include respond-to('<=pad_v') {
        display: none;
      }
    }
  }

  .o-link {
    margin-top: auto;
    @include text1;
  }

  .item-title {
    font-weight: 600;
    @include h3;
  }

  .item-desc {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
    color: var(--o-color-info3);
    margin-top: var(--o-r-gap-2);
    @include text1;
    margin-bottom: var(--o-r-gap-5);
  }
}

@include in-dark {
  .home-explore-items .item-wrapper {
    --background-color: linear-gradient(180deg, rgba(0, 0, 0, 0.09), rgba(0, 0, 0, 0.18));
    --border-color: linear-gradient(rgba(201, 191, 255, 0.4), rgba(201, 191, 255, 0));
  }

  .community-vigor {
    background-image: url('/category/home/home-vigor-bg-dark.png');
  }
}

.community-vigor {
  display: flex;
  color: var(--o-color-white);
  border-radius: 4px;
  background-size: cover;
  justify-content: space-between;
  align-items: center;
  margin-top: var(--o-r-gap-6);
  padding: var(--o-r-gap-5) var(--o-r-gap-6);
  background-image: url('/category/home/home-vigor-bg.png');

  .title {
    @include h1;
    font-weight: 600;
    white-space: nowrap;
  }

  .vigor-detail {
    flex: 1;
    margin-left: var(--o-r-gap-10);
    display: flex;
    justify-content: space-between;

    .divider {
      width: 1px;
      background-color: var(--o-color-white);
    }
    .detail-num {
      font-weight: 600;
      @include display3;
    }

    .detail-label {
      margin-top: var(--o-r-gap-1);
      @include text1;
    }

    @include respond-to('<=pad_v') {
      // justify-content: flex-start;
      margin-left: 0;
      margin-top: 24px;
      width: 100%;
    }
    @include respond-to('phone') {
      justify-content: flex-start;
      flex-wrap: wrap;
      gap: 24px;
    }
  }

  .o-link {
    margin-left: var(--o-r-gap-10);
    @include text1;
    --link-color: var(--o-color-white);

    @include respond-to('<=pad_v') {
      margin-left: 0;
      margin-top: 24px;
    }
  }

  @include respond-to('<=pad_v') {
    align-items: start;
    flex-direction: column;
  }
}
</style>
