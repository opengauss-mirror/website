<script setup lang="ts">
import { computed } from 'vue';
import { useCommon } from '@/stores/common';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/category/summit/summit2022/banner.jpg';
import bannerMo from '@/assets/category/summit/summit2022/banner-mo.png';
import liveLight from '@/assets/category/summit/summit2022/live.png';
import liveDark from '@/assets/category/summit/summit2022/live-dark.png';
import demoPng from '@/assets/category/summit/summit2022/demo.png';
import speakerPng from '@/assets/category/summit/summit2022/speaker.png';
import organizerPng from '@/assets/category/summit/summit2022/organizer.png';

const commonStore = useCommon();
const liveImg = computed(() =>
  commonStore.theme === 'light' ? liveLight : liveDark
);
const bannerInfo = {
  pc_banner: banner,
  mo_banner: bannerMo,
};
const summitData = {
  detail: [
    'openGauss Summit 2022是由openGauss开源数据库社区联合行业组织，伙伴及客户共同举办的年度数据库产业界交流与分享峰会。openGauss作为面向企业核心应用场景的开源数据库，开源两年来，与产业界聚力创新，携手前行。在技术、商业、生态、社区和人才方面取得了令人瞩目的成绩。从数据出发为企业数字化转型提供了强大的动能。',
    '本次峰会将邀请学术专家、行业组织、企业客户、生态伙伴和社区贡献者齐聚openGauss峰会，探讨数据库创新发展新路径、交流数据生态建设的新思维、分享企业数字化转型的新成果，共同加速推动开源数据库产业向前发展。',
  ],
  contentList: [
    {
      name: '展示征集',
      nameEn: 'DEMO',
      img: demoPng,
      link: 'https://shimo.im/forms/Clt43Er77rkQMPUX/fill',
    },
    {
      name: 'KN演讲者征集',
      nameEn: 'KN SPEAKER',
      img: speakerPng,
      link: 'https://shimo.im/forms/PP1S4qJ3YcguslYv/fill',
    },
    {
      name: '分论坛征集',
      nameEn: 'SESSION ORGANIZER',
      img: organizerPng,
      link: 'https://shimo.im/forms/hz1hXko4jW8CeSHK/fill',
    },
  ],
  previous: {
    title: '精彩回顾',
    list: [
      {
        name: 'openGauss Developer Day 2022',
        link: '/zh/summit/summit2022/',
        target: '_blank',
      },
      {
        name: 'openGauss Summit 2021',
        link: '/zh/summit/summit2021/',
        target: '_blank',
      },
    ],
  },
};
</script>
<template>
  <div class="banner">
    <div
      class="summit-banner-pc"
      :style="`background-image:url(${bannerInfo.pc_banner}) ;`"
    ></div>
    <div class="summit-banner-mo">
      <img :src="bannerInfo.mo_banner" alt="" />
    </div>
  </div>

  <AppContent>
    <div class="summit-detail">
      <p>{{ summitData.detail[0] }}</p>
      <p>{{ summitData.detail[1] }}</p>
    </div>
    <div class="content">
      <div
        v-for="item in summitData.contentList"
        :key="item.link"
        class="content-item"
      >
        <a :href="item.link" target="_blank">
          <div class="text">
            <p>CALL FOR</p>
            <p>{{ item.nameEn }}</p>
            <p>{{ item.name }}</p>
          </div>

          <img :src="item.img" :alt="item.name" />
        </a>
      </div>
    </div>
    <div class="previous">
      <div class="previous-title">
        <h3>{{ summitData.previous.title }}</h3>
        <img :src="liveImg" alt="live" />
      </div>
      <div class="link-box">
        <p v-for="item in summitData.previous.list" :key="item.link">
          <a :href="item.link" :target="item.target">{{ item.name }}</a>
        </p>
      </div>
    </div>
  </AppContent>
</template>
<style scoped lang="scss">
.dark img,
.dark .banner {
  filter: brightness(0.8) grayscale(0.2) contrast(1.2);
}
.banner {
  width: 100%;
  .summit-banner-pc {
    height: 380px;
    margin: 0 auto;
    background: no-repeat center/cover;
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
  .summit-banner-mo {
    display: none;

    @media screen and (max-width: 768px) {
      width: 100%;
      display: block;
      img {
        width: 100%;
      }
    }
  }
}
.summit-detail {
  p {
    font-size: var(--o-font-size-h6);
    line-height: var(--o-line-height-h6);
    color: var(--o-color-text1);
    font-weight: 300;
    text-align: justify;
    text-indent: 2em;
    &:not(:last-child) {
      margin-bottom: var(--o-spacing-h6);
    }
    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
}
.content {
  margin: var(--o-spacing-h1) auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media screen and (max-width: 1470px) {
    grid-template-columns: repeat(2, 1fr);
    max-width: 948px;
  }
  @media screen and (max-width: 968px) {
    grid-template-columns: repeat(1, 1fr);
    max-width: 474px;
    gap: 16px;
    margin: var(--o-spacing-h2) auto;
  }

  .content-item {
    @media screen and (max-width: 768px) {
      text-align: center;
    }
    a {
      display: inline-block;
      width: 100%;
      position: relative;
      box-shadow: var(--o-shadow-l1);
      .text {
        width: 100%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 2;
        p {
          color: #fff;
          text-align: center;
          font-size: var(--o-font-size-h4);
          @media screen and (max-width: 768px) {
            font-size: var(--o-font-size-h5);
          }
          &:nth-of-type(3) {
            margin-top: var(--o-spacing-h4);
            @media screen and (max-width: 768px) {
              margin-top: var(--o-spacing-h5);
            }
          }
        }
      }

      img {
        width: 100%;
        // @media screen and (max-width: 490px) {
        //   width: 100%;
        // }
      }
    }
  }
}
.previous {
  .previous-title {
    display: flex;
    h3 {
      font-size: 24px;
      line-height: 30px;
      color: var(--o-color-text1);
      margin-right: var(--o-spacing-h6);
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
        margin-right: var(--o-spacing-h7);
      }
    }
    img {
      @media screen and (max-width: 768px) {
        width: 22px;
      }
    }
  }

  .link-box {
    margin-top: var(--o-spacing-h2);
    @media screen and (max-width: 768px) {
      margin-top: var(--o-spacing-h6);
    }
    p:not(:last-child) {
      margin-bottom: var(--o-spacing-h4);
      @media screen and (max-width: 768px) {
        margin-bottom: var(--o-spacing-h6);
      }
    }
    a {
      font-size: var(--o-font-size-h6);
      line-height: var(--o-line-height-h6);
      display: inline-block;
      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
  }
}
</style>
