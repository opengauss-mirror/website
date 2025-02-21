<script lang="ts" setup>
import AppContent from '@/components/AppContent.vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import banner from '@/assets/category/team-up/banner.jpg';
import bannerIcon from '@/assets/category/team-up/banner-icon.png';

import IconStepArrow from '~icons/app/icon-step-arrow.svg';
import IconRight from '~icons/teamup/icon-right.svg';
import IconArrowRight from '~icons/app/icon-arrow-right.svg';

import teamUpData from '@/data/team-up';

const data = teamUpData.zh;
</script>

<template>
  <BannerLevel2 class="app-banner" :background-image="banner" :illustration="bannerIcon" :title="data.title" :subtitle="data.subtitle" />

  <AppContent>
    <div class="team-up">
      <div class="desc">{{ data.desc }}</div>

      <div class="divider"></div>

      <!-- 结队流程 -->
      <div class="team-process">
        <div class="section-title">{{ data.process.title }}</div>
        <div class="process">
          <div v-for="(item, i) in data.process.steps" :key="item.title" class="process-item-wrap">
            <div class="process-item">
              <div>
                <OIcon class="process-icon">
                  <component :is="item.icon"></component>
                </OIcon>
              </div>
              <div>
                <OIcon class="process-step-icon">
                  <component :is="item.stepIcon"></component>
                </OIcon>
              </div>
              <div class="process-title">{{ item.title }}</div>
              <div class="process-text-wrap" :class="{ 'process-first-text': i === 0 }">
                <div v-for="subItem in item.list" :key="subItem">{{ subItem }}</div>
              </div>
            </div>

            <IconStepArrow v-if="i !== data.process.steps.length - 1" class="step-arrow" />
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <!-- 结队详情 -->
      <div class="team-detail">
        <div class="section-title">{{ data.detail.title }}</div>
        <div class="detail-card-wrap">
          <div v-for="item in data.detail.list" :key="item.title" class="detail-card">
            <div>
              <div class="detail-card-title">{{ item.title }}</div>
              <div class="detail-card-desc">
                <template v-if="Array.isArray(item.desc)">
                  <div v-for="subItem in item.desc" :key="subItem" class="desc-point">
                    <OIcon class="right-icon">
                      <IconRight class="right-icon" />
                    </OIcon>
                    <span>{{ subItem }}</span>
                  </div>
                </template>
                <span v-else>{{ item.desc }}</span>
              </div>
            </div>

            <a :href="item.href" target="_blank" rel="noopener noreferrer">
              <OButton v-if="item.href" class="action-btn" animation>
                <span>{{ item.hrefTitle }}</span>
                <template #suffixIcon>
                  <OIcon class="action-btn-icon"><IconArrowRight /></OIcon>
                </template>
              </OButton>
            </a>
          </div>
        </div>
      </div>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
@include in-dark {
  img {
    @include img-in-dark;
  }

  .team-up {
    --team-up-sub-text-color: #ffffff;
    --team-up-card-bg-color: #131313;
    --team-up-divider: var(--o-color-division1);
  }
}

.team-up {
  --team-up-sub-text-color: rgba(0, 0, 0, 0.8);
  --team-up-card-bg-color: #f4f5f7;
  --team-up-divider: rgba(0, 0, 0, 0.1);
  background-color: var(--o-color-bg2);
  padding: 40px;

  @media screen and (max-width: 1280px) {
    padding: 30px;
  }

  @media screen and (max-width: 768px) {
    padding: 10px;
  }

  .desc {
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    text-align: center;

    @media screen and (max-width: 1280px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }

    @media screen and (max-width: 768px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  .divider {
    margin: 40px 0;
    border-bottom: 1px solid var(--team-up-divider);

    @media screen and (max-width: 1280px) {
      margin: 30px 0;
    }

    @media screen and (max-width: 768px) {
      margin: 10px 0;
    }
  }

  .section-title {
    margin-bottom: var(--o-spacing-h4);
    font-size: var(--o-font-size-h7);
    line-height: var(--o-line-height-h7);
    text-align: center;
    font-weight: 500;

    @media screen and (max-width: 1280px) {
      margin-bottom: var(--o-spacing-h6);
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
    }

    @media screen and (max-width: 768px) {
      margin-bottom: var(--o-spacing-h8);
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }

  .team-process {
    text-align: center;

    .process {
      display: flex;
      justify-content: center;

      @media screen and (max-width: 768px) {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 16px;
        text-align: center;
      }
    }

    .process-item-wrap {
      display: flex;

      @media screen and (max-width: 768px) {
        justify-content: center;
      }
    }

    .process-item {
      text-align: center;
    }

    .process-icon {
      font-size: 60px;

      @media screen and (max-width: 1280px) {
        font-size: 40px;
      }

      @media screen and (max-width: 768px) {
        font-size: 30px;
      }
    }

    .process-step-icon {
      font-size: 70px;

      @media screen and (max-width: 1280px) {
        font-size: 50px;
      }

      @media screen and (max-width: 768px) {
        font-size: 40px;
      }
    }

    .step-arrow {
      margin: 18px 42px 0 42px;

      @media screen and (max-width: 1280px) {
        margin: 16px 32px 0 32px;
      }

      @media screen and (max-width: 768px) {
        display: none;
      }
    }

    .process-title {
      margin-top: -20px;
      padding: 8px 0;
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);

      @media screen and (max-width: 1280px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }

      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }

    .process-text-wrap {
      max-width: 148px;
      font-size: var(--o-font-size-text);
      color: var(--team-up-sub-text-color);
      line-height: var(--o-line-height-text);
      text-align: left;

      @media screen and (max-width: 1280px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }

    .process-first-text {
      text-align: center;
    }
  }

  .team-detail {
    .detail-card {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 24px 32px;
      background: var(--team-up-card-bg-color);

      @media screen and (max-width: 1280px) {
        padding: 18px 24px;
      }

      @media screen and (max-width: 768px) {
        padding: 12px 18px;
      }
    }

    .detail-card:not(:last-child) {
      margin-bottom: 24px;

      @media screen and (max-width: 1280px) {
        margin-bottom: 18px;
      }

      @media screen and (max-width: 768px) {
        margin-bottom: 12px;
      }
    }

    .detail-card-title {
      font-size: var(--o-font-size-h7);
      line-height: var(--o-line-height-h7);

      @media screen and (max-width: 1280px) {
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }

      @media screen and (max-width: 768px) {
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }

    .detail-card-desc {
      display: flex;
      flex-wrap: wrap;
      margin-top: 12px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      color: var(--team-up-sub-text-color);

      @media screen and (max-width: 1280px) {
        margin-top: 8px;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }

      @media screen and (max-width: 768px) {
        margin-top: 4px;
      }
    }

    .right-icon {
      margin-right: 4px;
      font-size: 22px;

      @media screen and (max-width: 1280px) {
        margin-top: 2px;
        margin-right: 2px;
        font-size: var(--o-font-size-h8);
        line-height: var(--o-line-height-h8);
      }

      @media screen and (max-width: 768px) {
        margin-top: 2px;
        margin-right: 2px;
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);
      }
    }

    .desc-point {
      display: flex;
      align-items: center;
      margin-right: 16px;
    }

    .action-btn {
      min-width: 98px;
      padding: var(--o-spacing-h10) var(--o-spacing-h5);
      margin-left: 10px;
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);

      @media screen and (max-width: 800px) {
        padding: var(--o-spacing-h10) var(--o-spacing-h6);
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }

    .action-btn-icon {
      font-size: var(--o-font-size-tip);
    }
  }
}
</style>
