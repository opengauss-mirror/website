<script setup lang="ts">
import { Ref, ref, computed } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import BrandConfig from '@/data/brand';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/brand.png';

const i18n = useI18n();
const { lang } = useData();

const isZh = computed(() => (lang.value === 'zh' ? true : false));
const pptList = computed(() =>
  isZh.value ? BrandConfig.pptList.zh : BrandConfig.pptList.en
);
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="i18n.brand.BRAND"
    :illustration="illustration"
  />
  <AppContent class="brand">
    <div class="brand-all-word">
      <h3 class="brand-title">{{ i18n.brand.MOBILETITLE }}</h3>
      <div class="brand-word">
        {{ i18n.brand.WORDS }}
        <p>
          {{ i18n.brand.WORDS1[0]
          }}<a :href="i18n.brand.WORDS1[2]" download>{{
            i18n.brand.WORDS1[1]
          }}</a>
        </p>
      </div>
    </div>
    <div class="brand-list">
      <OCard
        v-for="item in BrandConfig.brandList"
        :key="item.id"
        class="brand-item"
        shadow="hover"
      >
        <div class="brand-item-img">
          <img
            :style="{ backgroundColor: item.backgroundColor }"
            :src="item.url"
          />
        </div>
        <div class="button-group">
          <a
            v-for="item2 in item.downloadContent"
            :key="item2.url"
            :href="item2.url"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <OButton size="mini" class="button-item">{{ item2.type }} </OButton>
          </a>
        </div>
      </OCard>
    </div>

    <div class="brand-ppt">
      <h3>{{ i18n.brand.PPT_TEXT }}</h3>
      <div class="ppt-list">
        <OCard
          v-for="ppt in pptList"
          :key="ppt.URL"
          shadow="hover"
          class="ppt-item"
          :style="{ padding: '0px' }"
        >
          <a
            :href="ppt.FILE"
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <img :src="ppt.URL" alt="" />
            <div class="ppt-word">
              {{ ppt.TEXT }}
            </div>
          </a>
        </OCard>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.button-group {
  width: 100%;
  display: grid;
  margin: 0 auto;
  margin-top: var(--o-spacing-h5);
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h6);
  a {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  .button-item {
    width: 100%;
    max-width: 70px;
    justify-content: center;
    padding-left: 0;
    padding-right: 0;
    @media (max-width: 768px) {
      max-width: 80px;
    }
  }
  .button-item:hover {
    background-color: var(--o-color-brand1);
    color: var(--o-color-text2);
  }
}
.brand {
  .brand-title {
    width: 100%;
    font-size: var(--o-font-size-h3);
    font-weight: 300;
    line-height: var(--o-line-height-h3);
    text-align: center;
    color: var(--o-color-text1);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }

  .brand-word {
    font-size: var(--o-font-size-text);
    color: var(--o-color-text1);
    line-height: var(--o-line-height-text);
    margin-top: var(--o-spacing-h4);
    font-weight: 300;
    @media (max-width: 768px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      margin-top: var(--o-spacing-h5);
    }
  }

  .brand-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 1280px){
      grid-template-columns: repeat(3, 1fr);
    }
    @media (max-width: 880px){
      grid-template-columns: repeat(2, 1fr);
    margin-top: var(--o-spacing-h4);
    }
    @media (max-width: 600px){
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .brand-item {
    width: 100%;
    padding: 0;
    @media (max-width: 768px) {
    }
    :deep(.el-card__body) {
      padding: var(--o-spacing-h4) 60px;
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5) var(--o-spacing-h6);
      }
    }

    .brand-item-title {
      font-size: var(--o-font-size-h7);
      font-weight: 300;
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h7);
      margin-top: var(--o-spacing-h10);
      @media (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }
    .brand-item-img {
      height: 120px;
      width: 100%;
      margin-top: var(--o-spacing-h5);
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        object-fit: contain;
        max-width: 220px;
        width: 100%;
        height: 100%;
        background-color: #fff;
        @media (max-width: 768px) {
          max-width: 240px;
        }
      }
    }
  }

  .brand-ppt {
    margin-top: var(--o-spacing-h1);
    width: 100%;

    h3 {
      font-size: var(--o-font-size-h3);
      color: var(--o-color-text1);
      line-height: var(--o-line-height-h3);
      width: 100%;
      font-weight: 300;
      text-align: center;
      @media (max-width: 768px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }
    }
  }
}

.ppt {
  &-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--o-spacing-h4);
    @media (max-width: 768px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }
  }
  &-item {
    width: 100%;

    a {
      width: 100%;
      img {
        width: 100%;
      }
    }
    :deep(.el-card__body) {
      padding: 0;
    }
  }

  &-word {
    padding: var(--o-spacing-h4);
    color: var(--o-color-text1);
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    @media (max-width: 768px) {
      padding: var(--o-spacing-h6);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      font-weight: 300;
    }
  }
}

@media (max-width: 1280px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 880px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(2, 1fr);
    margin-top: var(--o-spacing-h4);
  }
}

@media (max-width: 600px) {
  .ppt-list,
  .brand-list {
    grid-template-columns: repeat(1, 1fr);
  }
}
</style>
