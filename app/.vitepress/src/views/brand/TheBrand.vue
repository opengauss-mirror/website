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

const list: Ref<any[]> = ref([]);
const initList = () => {
  const result = [];
  const cndata = BrandConfig.BRAND_LIST;

  const nameList = [
    'VERTICAL_LEFT_IMAGE',
    'VERTICAL_CENTER_IMAGE',
    'VERTICAL_RIGHT_IMAGE',
    'HORIZONTAL_LEFT_IMAGE',
    'HORIZONTAL_CENTER_IMAGE',
    'HORIZONTAL_RIGHT_IMAGE',
    'BOTTOM_LEFT_IMAGE',
    'BOTTOM_CENTER_IMAGE',
  ];
  const imageList = [
    '/category/brand/view/logo1.png',
    '/category/brand/view/logo2.png',
    '/category/brand/view/logo3.png',
    '/category/brand/view/logo4-view.png',
    '/category/brand/view/logo5.png',
    '/category/brand/view/logo6.png',
    '/category/brand/view/logo7.png',
    '/category/brand/view/logo8-view.png',
  ];

  for (let i = 0; i < imageList.length; i++) {
    const temp = {
      id: i,
      url: imageList[i],
      image: cndata[nameList[i]],
    };
    result.push(temp);
  }
  return result;
};

list.value = initList();
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
        v-for="item in list"
        :key="item.id"
        class="brand-item"
        shadow="hover"
      >
        <div class="brand-item-img">
          <img :src="item.url" />
        </div>
        <div class="button-group">
          <a
            v-for="item2 in item.image"
            :key="item2.STYLE"
            :href="item2.URL"
            target="_blank"
            download
          >
            <OButton size="mini" class="button-item"
              >{{ item2.STYLE }}
            </OButton>
          </a>
        </div>
      </OCard>
    </div>

    <div class="brand-ppt">
      <h3>{{ i18n.brand.PPT_TEXT }}</h3>
      <div class="ppt-list">
        <OCard
          v-for="ppt in BrandConfig.PPT_LIST"
          :key="ppt.URL"
          shadow="hover"
          class="ppt-item"
          :style="{ padding: '0px' }"
        >
          <a :href="ppt.FILE" target="_blank" download>
            <img :src="ppt.URL" alt="" />
            <div class="ppt-word">
              {{ isZh ? ppt.TEXT : ppt.TEXT_EN }}
            </div>
          </a>
        </OCard>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.button-group {
  display: grid;
  width: 100%;
  margin-top: var(--o-spacing-h5);
  justify-items: center;
  align-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: var(--o-spacing-h8);
  a {
    width: 100%;
    display: flex;
    flex-flow: row;
    justify-content: center;
    align-items: center;
  }

  .button-item {
    max-width: 70px;
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
  &-title {
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

  &-word {
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

  &-list {
    display: grid;
    width: 100%;
    margin-top: var(--o-spacing-h2);
    justify-items: center;
    align-items: center;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: var(--o-spacing-h4);
  }

  &-item {
    width: 100%;
    padding: 0;
    @media (max-width: 768px) {
    }
    :deep(.el-card__body) {
      padding: var(--o-spacing-h4);
      @media (max-width: 768px) {
        padding: var(--o-spacing-h5) var(--o-spacing-h6);
      }
    }

    &-title {
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
    &-img {
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
        @media (max-width: 768px) {
          max-width: 240px;
        }
      }
    }
  }

  &-ppt {
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
