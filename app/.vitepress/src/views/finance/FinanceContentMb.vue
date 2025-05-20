<script setup lang="ts">
import { useData, useRouter } from 'vitepress';
import { ref, computed } from 'vue';
import { useCommon } from '@/stores/common';

import IconArrowRight from '~icons/app/icon-arrow-right.svg';
import IconMessage from '~icons/app/icon-message.svg';

import cardIllustration from '@/assets/illustrations/financial.png';

import financial from '@/data/financial';

import { useI18n } from '@/i18n';

const { lang } = useData();
const i18n = useI18n();
const commonStore = useCommon();
const router = useRouter();

const isLight = computed(() => {
  return commonStore.theme === 'light' ? true : false;
});

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
  window.open(`/${lang.value}/user-practice/`, '_blank');
};
// 下载页
const goDownloadPage = () => {
  router.go(`/${lang.value}/download/finance/`);
};

const activeNames = ref(['0']);
const handleChange = (val: any) => {
  if (val.length > 1) {
    activeNames.value = val.splice(1);
  }
};
</script>
<template>
  <div class="finance">
    <div class="section">
      <p v-for="item in financial.zh.version.title.split('：')" :key="item" class="section-title">
        {{ item }}
      </p>

      <div class="section-content">
        <p v-for="item in financial.zh.version.descs" :key="item" class="section-desc">
          {{ item }}
        </p>
      </div>
    </div>

    <div class="section">
      <p class="section-title">{{ financial.zh.advantages.title }}</p>

      <div class="advantages">
        <div v-for="item in financial.zh.advantages.lists" :key="item.feature" class="advantage-item">
          <img :src="isLight ? item.img : item.img_dark" alt="" />
          <p class="feature">{{ item.feature }}</p>
          <p class="feature-desc">{{ item.desc }}</p>
        </div>
      </div>
    </div>

    <div class="section">
      <p class="section-title">{{ financial.zh.technologies.title }}</p>

      <el-collapse v-for="(item, index) in financial.zh.technologies.tab_lists" :key="item.title" v-model="activeNames" @change="handleChange">
        <el-collapse-item v-if="index === 0" :title="item.title" :name="index + ''">
          <div class="tab-content">
            <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>

            <img class="storage" :src="isLight ? item.img : item.img_dark" alt="" />
          </div>
        </el-collapse-item>

        <el-collapse-item v-if="index === 1" :title="item.title" :name="index + ''">
          <div class="tab-content">
            <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>
            <img class="capability" :src="isLight ? item.img : item.img_dark" alt="" />
          </div>
        </el-collapse-item>

        <el-collapse-item v-if="index === 2" :title="item.title" :name="index + ''">
          <div class="tab-content">
            <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>
            <img class="scale-out" :src="isLight ? item.img : item.img_dark" alt="" />
          </div>
        </el-collapse-item>

        <el-collapse-item v-if="index === 3" :title="item.title" :name="index + ''">
          <div class="tab-content">
            <p v-for="child in item.desc_lists" :key="child">{{ child }}</p>
            <img class="db-mind" :src="isLight ? item.img : item.img_dark" alt="" />
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>

    <div class="section">
      <p class="section-title">{{ financial.zh.cases.title }}</p>

      <div class="card-box">
        <OCard v-for="card in financial.zh.cases.case_list" :key="card.name">
          <div class="card-left">
            <p class="card-title">{{ card.name }}</p>

            <p class="card-desc">{{ card.desc }}</p>

            <div class="btn-box">
              <OButton type="primary" size="mini" class="more-btn" animation @click="goCaseDetail(card.detailLink)">
                {{ i18n.finance.CASE_DETAIL }}
                <template #suffixIcon>
                  <IconArrowRight class="btn-icon" />
                </template>
              </OButton>
              <OButton size="mini" class="website-btn" animation @click="goOfficialWeb(card.officialLink)">
                {{ i18n.finance.OFFICIAL_WEBSITE }}
                <template #suffixIcon>
                  <IconArrowRight class="btn-icon" />
                </template>
              </OButton>
            </div>
          </div>

          <div class="card-right">
            <img :src="cardIllustration" alt="" />

            <p>{{ card.type }}</p>
          </div>
        </OCard>
      </div>

      <OButton type="text" animation class="search-more" @click="secarchMore">
        {{ i18n.finance.SEARCH_MORE_MB }}
        <template #suffixIcon>
          <IconArrowRight class="icon-search" />
        </template>
      </OButton>
    </div>

    <div class="section">
      <p class="section-title">{{ financial.zh.interaction.title }}</p>

      <div class="interaction-card">
        <OIcon><IconMessage /></OIcon>

        <div class="card-content">
          <h1>{{ financial.zh.interaction.card_title }}</h1>
          <p @click="goInteractiveZone">
            <span>{{ financial.zh.interaction.card_desc }}</span>
          </p>
        </div>
      </div>
    </div>

    <div class="section-1">
      <p class="section-title">{{ financial.zh.download.title }}</p>

      <div class="version-download">
        <h1 class="experience">{{ i18n.finance.EXPERIENCE }}</h1>

        <OButton type="primary" size="mini" animation class="download-btn" @click="goDownloadPage">
          {{ i18n.finance.DOWNLOAD }}
          <template #suffixIcon>
            <IconArrowRight />
          </template>
        </OButton>
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.section {
  padding: 0 16px;
  margin-top: 40px;
}
.section-1 {
  margin-top: 40px;
}
.section-title {
  font-size: var(--o-font-size-h8);
  line-height: var(--o-line-height-h8);
  font-weight: 300;
  color: var(--o-color-text1);
  text-align: center;
}
.section-content {
  margin-top: 16px;
}
.section-desc {
  font-size: var(--o-font-size-tip);
  line-height: var(--o-line-height-tip);
  color: var(--o-color-text1);
  font-weight: 400;
}
.advantage-item {
  margin-top: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 56px;
    height: 56px;
  }
  .feature {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    font-weight: 400;
    margin-top: 12px;
  }
  .feature-desc {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    font-weight: 400;
    color: var(--o-color-text-secondary);
    margin-top: 8px;
  }
}
:deep(.el-collapse) {
  margin: 12px 8px 0;
  --el-collapse-header-height: 56px;
  --el-collapse-border-color: none;
  --el-collapse-header-bg-color: var(--o-color-bg2);
  --el-collapse-content-bg-color: var(--o-color-bg2);
  .el-collapse-item__header {
    padding: 0 16px;
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    position: relative;
  }
  .el-collapse-item__content {
    position: relative;
    padding: 16px;
    &::after {
      content: '';
      display: block;
      width: calc(100% - 32px);
      height: 1px;
      background-color: var(--o-color-border2);
      position: absolute;
      top: 0px;
    }
  }
  .el-collapse-item__arrow {
    transform: rotate(-90deg);
    &.is-active {
      transform: rotate(90deg);
    }
  }
}
.tab-content {
  p {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text1);
    font-weight: 400;
    opacity: 0.8;
  }

  img {
    width: 100%;
    margin-top: 16px;
  }
}

.card-box {
  margin-top: 16px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-gap: 16px;
  .card-right {
    margin-left: 12px;
    img {
      width: 80px;
    }
    p {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      font-weight: 500;
      color: #ad9cd3;
      text-align: center;
    }
  }

  .card-title {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    font-weight: 500;
    color: var(--o-color-white);
  }
  .card-desc {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    font-weight: 400;
    color: var(--o-color-white);
    margin-top: 8px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .btn-box {
    margin-top: 22px;
    display: flex;
    column-gap: 8px;
    .btn-icon {
      width: 12px;
      height: 12px;
    }
    .website-btn {
      border-color: var(--o-color-white);
      color: var(--o-color-white);
    }
    .more-btn {
      color: var(--o-color-white);
    }
  }
}
.search-more {
  margin-top: 5px;
  margin-left: 50%;
  transform: translatex(-50%);
  font-size: var(--o-font-size-text);
  line-height: var(--o-line-height-text);
  color: var(--o-color-text1);
  font-weight: 400;
}
.icon-search {
  color: var(--o-color-brand3);
  width: 14px;
  height: 14px;
}
.interaction-card {
  width: 100%;
  background-color: var(--o-color-bg2);
  padding: 16px;
  display: flex;
  margin-top: 16px;
  .o-icon {
    margin-right: 12px;
    font-size: var(--o-font-size-h5);
    color: var(--o-color-text1);
  }
  h1 {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    color: var(--o-color-text1);
    font-weight: 500;
  }
  p {
    font-size: var(--o-font-size-tip);
    line-height: var(--o-line-height-tip);
    color: var(--o-color-text-secondary);
    font-weight: 400;
    margin-top: 12px;
    display: flex;
  }
}
.version-download {
  background: url('@/assets/category/finance/download-bg.png') no-repeat center;
  background-size: cover;
  padding: 24px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}
.experience {
  font-size: 14px;
  font-weight: 500;
  color: var(--o-color-white);
  line-height: 22px;
}
.download-btn {
  color: var(--o-color-white);
  margin-top: 12px;
}
</style>
