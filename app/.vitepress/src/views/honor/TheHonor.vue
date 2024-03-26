<script setup lang="ts">
import { ref } from 'vue';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import AppContent from '@/components/AppContent.vue';
import honorData from '@/data/honor';
import { windowOpen } from '@/shared/utils';

import banner from '@/assets/illustrations/banner-secondary.png';
import illustration from '@/assets/illustrations/honor.png';

import IconChecked from '~icons/app/icon-checked.svg';
import IconUnchecked from '~icons/app/icon-unchecked.svg';
import IconRight from '~icons/app/icon-arrow-right.svg';

const activeYear = ref('2023');
const showNumber = ref(-1);
const useClickTab = (year: string) => {
  activeYear.value = year;
};
const clickBtn = (href: string) => {
  windowOpen(href, '_blank');
};
const clickDetail = (index: number) => {
  showNumber.value = index;
};
</script>

<template>
  <BannerLevel2
    :background-image="banner"
    :title="honorData.title"
    :illustration="illustration"
  />
  <ul class="h5-time">
    <li
      v-for="item in honorData.honorList"
      :key="item.id"
      :class="activeYear === item.id ? 'active' : ''"
      @click="useClickTab(item.id)"
    >
      {{ item.id }}
    </li>
  </ul>
  <AppContent>
    <div class="honor-time">
      <ul class="o-timeline-list pc-time">
        <li
          v-for="item in honorData.honorList"
          :key="item.id"
          class="o-timeline-item"
          :class="activeYear === item.id ? 'active' : ''"
          @click="useClickTab(item.id)"
        >
          <p class="o-timeline-day">{{ item.id }}</p>
          <IconChecked v-if="activeYear === item.id" class="o-timeline-icon" />
          <IconUnchecked v-else class="o-timeline-icon" />
        </li>
      </ul>
    </div>
    <div class="content">
      <template v-for="item in honorData.honorList" :key="item.name">
        <div v-show="activeYear === item.id" class="certificate-box">
          <OCard
            v-for="(subItem, index) in item.data"
            :key="subItem.name"
            class="certificate-item"
          >
            <p>{{ subItem.name }}</p>
            <OButton
              v-if="subItem.href"
              class="detail-btn"
              type="text"
              animation
              size="nomral"
              @click="clickBtn(subItem.href)"
            >
              {{ honorData.readNews }}
              <template #suffixIcon>
                <OIcon class="detail-icon">
                  <IconRight />
                </OIcon>
              </template>
            </OButton>
            <OButton
              v-if="subItem.img"
              class="detail-btn"
              type="text"
              animation
              size="nomral"
              @click="clickDetail(index)"
            >
              {{ honorData.viewCertificate }}
              <template #suffixIcon>
                <OIcon class="detail-icon">
                  <IconRight />
                </OIcon>
              </template>
            </OButton>
            <div
              v-if="showNumber === index"
              class="certificate"
              @click="clickDetail(-1)"
            >
              <img :class="'img' + index" :src="subItem.img" alt="" />``
            </div>
          </OCard>
        </div>
      </template>
    </div>
  </AppContent>
</template>

<style lang="scss" scoped>
.honor-time {
  .o-timeline-list {
    max-width: 660px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;

    .o-timeline-item {
      position: relative;
      z-index: 3;
      list-style: none;
      text-align: center;
      cursor: pointer;

      .o-timeline-day {
        font-size: var(--o-font-size-h6);
        color: var(--o-color-text4);
        line-height: var(--o-line-height-h6);
        margin-bottom: var(--o-spacing-h10);
        transition: all 0.2s;
      }

      .o-timeline-icon {
        cursor: pointer;
        width: var(--o-font-size-h5);
        height: var(--o-font-size-h5);
        color: var(--o-color-text4);
        display: inline-block;
        background-color: var(--o-color-bg1);
        transition: all 0.2s;
      }

      &.active .o-timeline-day,
      &.active .o-timeline-icon {
        color: var(--o-color-brand1);
      }
    }

    &::after {
      width: 89%;
      height: 2px;
      background-color: var(--o-color-neutral11);
      content: '';
      display: block;
      position: absolute;
      top: 43px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 2;
    }
  }

  .pc-time {
    @media (max-width: 768px) {
      display: none;
    }
  }
}

.h5-time {
  display: none;

  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    width: 100%;
    background-color: var(--o-color-bg2);
    height: 34px;
  }

  li {
    font-size: var(--o-font-size-text);
    line-height: 34px;
    color: var(--o-color-text1);
    margin-right: 20px;

    &:last-child {
      margin-right: 0;
    }

    &::after {
      content: '';
      display: block;
      width: 100%;
      height: 2px;
      background-color: transparent;
    }
  }

  .active {
    color: var(--o-color-brand1);

    &::after {
      background-color: var(--o-color-brand1);
    }
  }
}

.content {
  margin-top: var(--o-spacing-h3);

  @media (max-width: 768px) {
    margin-top: 0;
  }

  .certificate-box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: var(--o-spacing-h4);

    @media (max-width: 768px) {
      grid-template-columns: repeat(1, 1fr);
      gap: var(--o-spacing-h5);
    }

    .certificate-item {
      background-image: url(@/assets/category/honor/bg.png);
      background-repeat: no-repeat;
      background-size: cover;
      position: relative;
      padding: var(--o-spacing-h2);

      @media (max-width: 768px) {
        padding: var(--o-spacing-h5);
      }

      :deep(.el-card__body) {
        padding: 0;
      }

      p {
        min-height: 64px;
        font-size: var(--o-font-size-h5);
        line-height: var(--o-line-height-h5);
        color: var(--o-color-text1);
        font-weight: 500;
        @media (max-width: 768px) {
          max-width: 100%;
          min-height: auto;
          font-size: var(--o-font-size-h8);
          line-height: var(--o-line-height-h8);
        }
      }

      .detail-btn {
        margin-top: 26px;
        padding-left: 0;
        padding-bottom: 0;
        color: var(--o-color-text3);
        font-size: var(--o-font-size-text);
        line-height: var(--o-line-height-text);

        @media (max-width: 768px) {
          margin-top: 24px;
          font-size: var(--o-font-size-tip);
          line-height: var(--o-line-height-tip);
          padding-bottom: 0;
          padding-top: 0;
        }

        .detail-icon {
          color: var(--o-color-brand1);
          font-size: 16px;
        }
      }

      .certificate {
        position: fixed;
        left: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.4);
        z-index: 99;
        display: flex;
        justify-content: center;
        align-items: center;

        img {
          height: 72vh;
          position: relative;

          @media (max-width: 768px) {
            width: 80%;
            height: auto;
          }
        }
      }
    }
  }
}
</style>
