<script lang="ts" setup>
import { computed } from 'vue';
import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';
import AppContent from '@/components/AppContent.vue';
import BannerLevel2 from '@/components/BannerLevel2.vue';
import useWindowResize from '@/components/hooks/useWindowResize';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/meetup.png';
import meetup01 from '@/assets/category/meetup/01.png';
import meetup02 from '@/assets/category/meetup/02.png';
import meetup03 from '@/assets/category/meetup/03.png';
import meetup04 from '@/assets/category/meetup/04.png';
import meetup05 from '@/assets/category/meetup/05.png';
import meetup01Dark from '@/assets/category/meetup/01_dark.png';
import meetup02Dark from '@/assets/category/meetup/02_dark.png';
import meetup03Dark from '@/assets/category/meetup/03_dark.png';
import meetup04Dark from '@/assets/category/meetup/04_dark.png';
import meetup05Dark from '@/assets/category/meetup/05_dark.png';

import meetupIcon01 from '@/assets/category/meetup/icon1.png';
import meetupIcon02 from '@/assets/category/meetup/icon2.png';
import meetupIcon03 from '@/assets/category/meetup/icon3.png';
import meetupIcon04 from '@/assets/category/meetup/icon4.png';
import meetupIcon05 from '@/assets/category/meetup/icon5.png';

import meetupIcon01Dark from '@/assets/category/meetup/icon1_dark.png';
import meetupIcon02Dark from '@/assets/category/meetup/icon2_dark.png';
import meetupIcon03Dark from '@/assets/category/meetup/icon3_dark.png';
import meetupIcon04Dark from '@/assets/category/meetup/icon4_dark.png';
import meetupIcon05Dark from '@/assets/category/meetup/icon5_dark.png';

import meetupImg from '@/assets/category/meetup/img1.png';
import meetupImgMo from '@/assets/category/meetup/img1_mo_dark.png';
import meetupImgDark from '@/assets/category/meetup/img1_dark.png';
import meetupImgMoDark from '@/assets/category/meetup/img1_mo.png';

const i18n = useI18n();

const screenWidth = useWindowResize();
const commonStore = useCommon();
const isLight = computed(() => (commonStore.theme === 'light' ? true : false));
const isMobile = computed(() => (screenWidth.value <= 1024 ? true : false));

const applyName = i18n.value.meetup.plan.applyList;
const applyList = [
  {
    name: applyName[0],
    img: meetupIcon01,
    imgDark: meetupIcon01Dark,
    num: meetup01,
    numDark: meetup01Dark,
  },
  {
    name: applyName[1],
    img: meetupIcon02,
    imgDark: meetupIcon02Dark,
    num: meetup02,
    numDark: meetup02Dark,
  },
  {
    name: applyName[2],
    img: meetupIcon03,
    imgDark: meetupIcon03Dark,
    num: meetup03,
    numDark: meetup03Dark,
  },
  {
    name: applyName[3],
    img: meetupIcon04,
    imgDark: meetupIcon04Dark,
    num: meetup04,
    numDark: meetup04Dark,
  },
  {
    name: applyName[4],
    img: meetupIcon05,
    imgDark: meetupIcon05Dark,
    num: meetup05,
    numDark: meetup05Dark,
  },
];

const planImg = computed(() => (isLight.value ? (isMobile.value ? meetupImgMo : meetupImg) : isMobile.value ? meetupImgMoDark : meetupImgDark));
</script>

<template>
  <ClientOnly>
    <BannerLevel2 :background-image="banner" :title="i18n.meetup.title" :subtitle="i18n.meetup.subTitle" :illustration="illustration" />
    <AppContent>
      <p class="meetup-text">
        {{ i18n.meetup.desc }}
      </p>
      <div class="meetup-plan">
        <h3>{{ i18n.meetup.plan.title }}</h3>
        <p class="desc">{{ i18n.meetup.plan.desc }}</p>
        <div class="apply">
          <h4>{{ i18n.meetup.plan.applyTitle }}</h4>
          <div class="apply-box">
            <div v-for="(item, index) in applyList" :key="item.name" class="apply-item" :class="'step' + (index + 1)">
              <img :src="isLight ? item.img : item.imgDark" class="icon" alt="" />
              <img :src="isLight ? item.num : item.numDark" class="num" alt="" />
              <p class="name">{{ item.name }}</p>
            </div>
          </div>
          <a href="/zh/call-for-meetup/collect/">
            <OButton animation size="mini" class="more-btn">
              查看详情
              <template #suffixIcon>
                <IconArrowRight class="icon-arror" />
              </template>
            </OButton>
          </a>
        </div>
      </div>
      <div class="meetup-plan">
        <h3>{{ i18n.meetup.reviewTitle }}</h3>
        <img :src="planImg" class="img" alt="" />
      </div>
    </AppContent>
  </ClientOnly>
</template>

<style lang="scss" scoped>
@include in-dark {
  img {
    @include img-in-dark;
  }
}
.meetup-text {
  font-size: var(--e-font-size-h8);
  line-height: var(--e-line-height-h8);
  color: var(--e-color-text1);
  text-align: center;
  @media screen and (max-width: 768px) {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
}
.meetup-plan {
  background: var(--e-color-bg2);
  margin: var(--e-spacing-h2) 0;
  padding: var(--e-spacing-h2);
  text-align: center;
  @media screen and (max-width: 768px) {
    padding: 16px;
  }
  .img {
    margin-top: 24px;
    max-width: 100%;
  }
  h3 {
    font-size: var(--e-font-size-h7);
    line-height: var(--e-line-height-h7);
    color: var(--e-color-text1);
  }
  .desc {
    font-size: var(--e-font-size-h8);
    line-height: var(--e-line-height-h8);
    color: var(--e-color-text1);
    margin-top: 8px;
    @media screen and (max-width: 768px) {
      font-size: var(--e-font-size-tip);
      line-height: var(--e-line-height-tip);
    }
  }
  .apply {
    border-top: 1px solid var(--e-color-border2);
    margin: 24px 0 0;
    h4 {
      font-size: var(--e-font-size-h7);
      line-height: var(--e-line-height-h7);
      color: var(--e-color-text1);
      margin: 24px 0;
    }
    .apply-box {
      display: flex;
      justify-content: space-around;
      padding: 0 180px;
      margin: 0 0 24px;
      @media screen and (max-width: 1100px) {
        padding: 0 24px;
      }
      @media screen and (max-width: 768px) {
        padding: 0;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 24px 0;
      }
      .apply-item {
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        text-align: center;
        align-items: center;
        position: relative;
        &:not(:last-child):before {
          content: '';
          width: 45px;
          height: 8px;
          position: absolute;
          top: 30px;
          right: -60px;
          background: url(@/assets/category/meetup/line.png) no-repeat;
          @media screen and (max-width: 768px) {
            display: none;
          }
        }

        .icon {
          width: 64px;
          height: 64px;
          @media screen and (max-width: 768px) {
            width: 48px;
            height: 48px;
          }
        }
        .num {
          margin: 16px 0 8px;
          width: 53px;
          @media screen and (max-width: 768px) {
            margin: 8px 0;
            width: 40px;
          }
        }
        .name {
          font-size: var(--e-font-size-h8);
          line-height: var(--e-line-height-h8);
          color: var(--e-color-text1);
          @media screen and (max-width: 768px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
          }
        }
      }
    }
  }
}
</style>
