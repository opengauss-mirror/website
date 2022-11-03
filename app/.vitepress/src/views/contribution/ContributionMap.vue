<script lang="ts" setup>
import { computed } from 'vue';
import { useRouter, useData } from 'vitepress';

import { useI18n } from '@/i18n';
import { useCommon } from '@/stores/common';

import contributionMap_light_zh from '@/assets/category/contribution/contribution-map_light_zh.png';
import contributionMap_light_en from '@/assets/category/contribution/contribution-map_light_en.png';
import contributionMap_dark_zh from '@/assets/category/contribution/contribution-map_dark_zh.png';
import contributionMap_dark_en from '@/assets/category/contribution/contribution-map_dark_en.png';
import contributionMap_light_zh_mobile from '@/assets/category/contribution/contribution-map_light_zh_mobile.png';
import contributionMap_light_en_mobile from '@/assets/category/contribution/contribution-map_light_en_mobile.png';
import contributionMap_dark_zh_mobile from '@/assets/category/contribution/contribution-map_dark_zh_mobile.png';
import contributionMap_dark_en_mobile from '@/assets/category/contribution/contribution-map_dark_en_mobile.png';

const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();
const router = useRouter();

const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));
const isZh = computed(() => (lang.value === 'zh' ? true : false));

const goLink = (url: string, isBlank: boolean) => {
  if (isBlank) {
    window.open(url, '_blank');
    return;
  }
  router.go(url);
};
</script>
<template>
  <div class="content-map">
    <div class="content-map-img">
      <img
        v-show="!isDark"
        :src="isZh ? contributionMap_light_zh : contributionMap_light_en"
      />
      <img
        v-show="isDark"
        :src="isZh ? contributionMap_dark_zh : contributionMap_dark_en"
      />
      <!-- 定位的空标签 -->
      <div
        v-for="(item, index) in i18n.contribution.LINK_LIST"
        :key="index"
        :class="isZh ? 'link' : 'link en'"
        @click="goLink(item.URL, item.BLANK)"
      ></div>
    </div>
    <div class="content-map-mobile-img">
      <img
        v-show="!isDark"
        :src="
          isZh
            ? contributionMap_light_zh_mobile
            : contributionMap_light_en_mobile
        "
      />
      <img
        v-show="isDark"
        :src="
          isZh ? contributionMap_dark_zh_mobile : contributionMap_dark_en_mobile
        "
      />
      <div
        v-for="(item, index) in i18n.contribution.LINK_LIST"
        :key="index"
        :class="isZh ? 'mobile-link' : 'mobile-link en'"
        @click="goLink(item.URL, item.BLANK)"
      ></div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.content-map {
  width: 100%;
  padding-bottom: var(--o-spacing-h1);
  @media screen and (max-width: 1439px) {
    padding-left: 24px;
    padding-right: 24px;
    background-color: var(--o-color-bg2);
    padding-bottom: var(--o-spacing-h2);
  }
  @media screen and (max-width: 767px) {
    padding-left: 16px;
    padding-right: 16px;
    background-color: inherit;
  }
  &-img {
    width: 1416px;
    position: relative;
    display: block;
    margin: var(--o-spacing-h2) auto 0;

    background-color: var(--o-color-bg1);
    box-shadow: var(--o-shadow-l1);
    img {
      width: 1416px;
      display: block;
      margin: 0 auto;
      @media screen and (min-width: 768px) and (max-width: 1439px) {
        width: 100%;
      }
    }
    .link {
      position: absolute;
      display: block;
      cursor: pointer;
    }
    @media screen and (max-width: 767px) {
      display: none;
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 755px;
      margin: var(--o-spacing-h2) auto;
      background-color: inherit;
      box-shadow: none;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 1000px;
      margin: var(--o-spacing-h2) auto;
      background-color: inherit;
      box-shadow: none;
    }
  }
  &-print {
    position: absolute;
    cursor: pointer;
    width: 100px;
    height: 30px;
    top: 22px;
    right: 22px;
    background-color: var(--o-color-bg2);
    color: var(--o-color-brand1);
    border: 1px solid var(--o-color-brand1);
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-h6);
    text-align: center;
    border-radius: 1px;
    text-decoration: none;
  }
  .link:nth-of-type(1) {
    width: 137px;
    height: 20px;
    top: 231px;
    left: 370px;
    &.en {
      width: 224px;
      top: 223px;
      left: 321px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 160px;
        height: 10px;
        top: 161px;
        left: 227px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 130px;
        top: 119px;
        left: 171px;
        height: 10px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 100px;
      top: 123px;
      left: 171px;
      height: 10px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 98px;
      top: 164px;
      left: 260px;
      height: 10px;
    }
  }
  .link:nth-of-type(2) {
    width: 168px;
    height: 18px;
    top: 325px;
    left: 320px;
    &.en {
      width: 150px;
      top: 319px;
      left: 404px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 106px;
        height: 12px;
        top: 226px;
        left: 286px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 82px;
        top: 170px;
        left: 214px;
        height: 10px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 89px;
      top: 173px;
      left: 171px;
      height: 10px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 118px;
      height: 12px;
      top: 230px;
      left: 228px;
    }
  }
  .link:nth-of-type(3) {
    width: 168px;
    height: 18px;
    top: 343px;
    left: 350px;
    &.en {
      width: 176px;
      top: 355px;
      left: 322px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 124px;
        height: 12px;
        top: 251px;
        left: 227px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 91px;
        top: 189px;
        left: 171px;
        height: 10px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 91px;
      top: 183px;
      left: 188px;
      height: 10px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 118px;
      height: 12px;
      top: 242px;
      left: 249px;
    }
  }
  .link:nth-of-type(4) {
    width: 171px;
    height: 18px;
    top: 368px;
    left: 341px;
    &.en {
      width: 153px;
      top: 380px;
      left: 356px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 112px;
        height: 12px;
        top: 268px;
        left: 250px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 88px;
        top: 202px;
        left: 188px;
        height: 10px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 91px;
      top: 196px;
      left: 182px;
      height: 10px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 122px;
      height: 14px;
      top: 261px;
      left: 242px;
    }
  }
  .link:nth-of-type(5) {
    width: 232px;
    height: 24px;
    top: 482px;
    left: 325px;
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 124px;
      top: 256px;
      left: 173px;
      height: 14px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 165px;
      height: 19px;
      top: 339px;
      left: 229px;
    }
  }

  .link:nth-of-type(6) {
    width: 68px;
    height: 56px;
    top: 533px;
    left: 325px;
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 31px;
      height: 33px;
      top: 282px;
      left: 175px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 41px;
      height: 42px;
      top: 374px;
      left: 231px;
    }
  }
  .link:nth-of-type(7) {
    width: 68px;
    height: 56px;
    top: 533px;
    left: 405px;
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 31px;
      height: 33px;
      top: 282px;
      left: 221px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 41px;
      height: 42px;
      top: 374px;
      left: 292px;
    }
  }
  .link:nth-of-type(8) {
    width: 68px;
    height: 56px;
    top: 533px;
    left: 493px;
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 31px;
      height: 33px;
      top: 282px;
      left: 267px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 41px;
      height: 42px;
      top: 374px;
      left: 354px;
    }
  }

  .link:nth-of-type(9) {
    width: 76px;
    height: 100px;
    top: 875px;
    left: 236px;
    &.en {
      top: 900px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 61px;
        height: 66px;
        top: 640px;
        left: 162px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 43px;
        height: 50px;
        top: 483px;
        left: 124px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 43px;
      height: 55px;
      top: 464px;
      left: 124px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 61px;
      height: 76px;
      top: 615px;
      left: 162px;
    }
  }
  .link:nth-of-type(10) {
    width: 76px;
    height: 100px;
    top: 875px;
    left: 350px;
    &.en {
      top: 900px;
      left: 340px;
      width: 95px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 61px;
        height: 66px;
        top: 640px;
        left: 243px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 46px;
        height: 50px;
        top: 483px;
        left: 183px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 43px;
      height: 55px;
      top: 464px;
      left: 187px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 61px;
      height: 76px;
      top: 615px;
      left: 246px;
    }
  }
  .link:nth-of-type(11) {
    width: 140px;
    height: 18px;
    top: 270px;
    left: 848px;
    &.en {
      width: 195px;
      top: 288px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 139px;
        height: 12px;
        top: 204px;
        left: 600px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 106px;
        height: 10px;
        top: 153px;
        left: 453px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 72px;
      height: 11px;
      top: 143px;
      left: 453px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 95px;
      height: 14px;
      top: 190px;
      left: 600px;
    }
  }
  .link:nth-of-type(12) {
    width: 62px;
    height: 18px;
    top: 573px;
    left: 905px;

    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 33px;
      height: 11px;
      top: 304px;
      left: 484px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 41px;
      height: 12px;
      top: 405px;
      left: 643px;
    }
    &.en {
      width: 244px;
      height: 18px;
      top: 557px;
      left: 759px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 177px;
        height: 12px;
        top: 394px;
        left: 537px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 133px;
        height: 10px;
        top: 296px;
        left: 404px;
      }
    }
  }
  .link:nth-of-type(13) {
    width: 88px;
    height: 18px;
    top: 714px;
    left: 875px;
    &.en {
      width: 64px;
      top: 680px;
      left: 972px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 44px;
        height: 12px;
        top: 480px;
        left: 688px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 36px;
        height: 10px;
        top: 362px;
        left: 518px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 48px;
      height: 10px;
      top: 380px;
      left: 466px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 64px;
      height: 12px;
      top: 505px;
      left: 618px;
    }
  }
  .link:nth-of-type(14) {
    width: 80px;
    height: 18px;
    top: 741px;
    left: 802px;
    &.en {
      width: 104px;
      top: 716px;
      left: 831px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 72px;
        height: 12px;
        top: 506px;
        left: 588px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 56px;
        height: 10px;
        top: 382px;
        left: 444px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 42px;
      height: 10px;
      top: 395px;
      left: 428px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 56px;
      height: 12px;
      top: 525px;
      left: 567px;
    }
  }
  .link:nth-of-type(15) {
    width: 100px;
    height: 18px;
    top: 925px;
    left: 935px;
    &.en {
      width: 162px;
      top: 892px;
      left: 937px;
      @media screen and (min-width: 1100px) and (max-width: 1439px) {
        width: 113px;
        height: 12px;
        top: 630px;
        left: 664px;
      }
      @media screen and (min-width: 768px) and (max-width: 1100px) {
        width: 87px;
        height: 10px;
        top: 475px;
        left: 499px;
      }
    }
    @media screen and (min-width: 768px) and (max-width: 1100px) {
      width: 52px;
      height: 10px;
      top: 492px;
      left: 499px;
    }
    @media screen and (min-width: 1100px) and (max-width: 1439px) {
      width: 75px;
      height: 12px;
      top: 653px;
      left: 660px;
    }
  }
  &-mobile-img {
    width: 100%;
    height: auto;
    position: relative;
    display: block;
    margin: 0 auto;
    margin-top: var(--o-spacing-h2);
    @media screen and (min-width: 768px) {
      display: none;
    }
    img {
      width: 100%;
    }
  }
  .mobile-link {
    position: absolute;
    display: block;
    cursor: pointer;
    height: 1%;
  }
  .mobile-link:nth-of-type(1) {
    width: 40%;
    left: 39%;
    top: 6.6%;
    &.en {
      width: 69%;
      left: 24%;
      top: 8.3%;
    }
  }
  .mobile-link:nth-of-type(2) {
    width: 50%;
    left: 25%;
    top: 13%;
    &.en {
      width: 54%;
      left: 40%;
      top: 13.6%;
    }
  }
  .mobile-link:nth-of-type(3) {
    width: 50%;
    left: 34%;
    top: 14%;
    &.en {
      width: 54%;
      left: 25%;
      top: 15.6%;
    }
  }
  .mobile-link:nth-of-type(4) {
    width: 50%;
    left: 31%;
    top: 15.6%;
    &.en {
      width: 50%;
      left: 32%;
      top: 17.1%;
    }
  }
  .mobile-link:nth-of-type(5) {
    width: 71%;
    height: 1.6%;
    left: 25%;
    top: 23.2%;
  }
  .mobile-link:nth-of-type(6) {
    width: 19%;
    height: 3.8%;
    left: 26%;
    top: 26.2%;
  }
  .mobile-link:nth-of-type(7) {
    width: 19%;
    height: 3.8%;
    left: 52%;
    top: 26.2%;
  }
  .mobile-link:nth-of-type(8) {
    width: 19%;
    height: 3.8%;
    left: 77%;
    top: 26.2%;
  }
  .mobile-link:nth-of-type(9) {
    width: 25%;
    height: 6%;
    left: 32%;
    top: 44%;
    &.en {
      top: 41.8%;
    }
  }
  .mobile-link:nth-of-type(10) {
    width: 25%;
    height: 6%;
    left: 66%;
    top: 44%;
    &.en {
      top: 41.8%;
    }
  }
  .mobile-link:nth-of-type(11) {
    width: 18%;
    left: 64%;
    top: 57%;
    &.en {
      width: 70%;
      left: 25%;
      top: 54.4%;
      height: 1.5%;
    }
  }
  .mobile-link:nth-of-type(12) {
    width: 26%;
    left: 49%;
    top: 67.4%;
    &.en {
      width: 20%;
      left: 77%;
      top: 64.8%;
    }
  }
  .mobile-link:nth-of-type(13) {
    width: 24%;
    left: 70%;
    top: 69.2%;
    &.en {
      width: 34%;
      left: 49%;
      top: 67.6%;
    }
  }
  .mobile-link:nth-of-type(14) {
    width: 31%;
    left: 28%;
    top: 82.2%;
    &.en {
      width: 54%;
      left: 42%;
      top: 82%;
    }
  }
  .mobile-link:nth-of-type(15) {
    width: 41%;
    left: 24%;
    top: 91.2%;
    &.en {
      width: 59%;
      top: 92.9%;
    }
  }
}
</style>
