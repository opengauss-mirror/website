<script setup lang="ts">
import { OCard, OIcon, OLink } from '@opensig/opendesign';

import SigApply from '~@/assets/category/sig/sig-apply.png';
import SigApplyDark from '~@/assets/category/sig/sig-apply-dark.png';

import iconArrow from '~@/assets/category/sig/arrow.png';
import IconStep01 from '~icons/sig/icon-apply-step1.svg';
import IconStep02 from '~icons/sig/icon-apply-step2.svg';
import IconStep03 from '~icons/sig/icon-apply-step3.svg';
import IconStep04 from '~icons/sig/icon-apply-step4.svg';
import IconStep05 from '~icons/sig/icon-apply-step5.svg';
import IconStep06 from '~icons/sig/icon-apply-step6.svg';

import IconNum01 from '~icons/sig/icon-num-01.svg';
import IconNum02 from '~icons/sig/icon-num-02.svg';
import IconNum03 from '~icons/sig/icon-num-03.svg';
import IconNum04 from '~icons/sig/icon-num-04.svg';
import IconNum05 from '~icons/sig/icon-num-05.svg';
import IconNum06 from '~icons/sig/icon-num-06.svg';
import { useI18n } from '~@/i18n';
import { computed } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { storeToRefs } from 'pinia';

const stepIconMap = [IconNum01, IconNum02, IconNum03, IconNum04, IconNum05, IconNum06];

const i18n = useI18n();
const { lang } = useData();
const { isDark } = storeToRefs(useCommon());

const steps = computed(() => [
  { icon: IconStep01, title: i18n.value.sig.understand.apply1 },
  { icon: IconStep02, title: i18n.value.sig.understand.apply2 },
  { icon: IconStep03, title: i18n.value.sig.understand.apply3 },
  { icon: IconStep04, title: i18n.value.sig.understand.apply4 },
  { icon: IconStep05, title: i18n.value.sig.understand.apply5 },
  { icon: IconStep06, title: i18n.value.sig.understand.apply6 },
]);
</script>

<template>
  <OCard class="steps-wrapper">
    <template #header>
      <div class="step-header">
        <img :src="isDark ? SigApplyDark : SigApply" alt="" />
        <div class="header-title">
          <div class="title">
            <img :src="isDark ? SigApplyDark : SigApply" alt="" />
            <span>{{ i18n.sig.understand.title3 }}</span>
          </div>
          <div class="desc">{{ i18n.sig.understand.desc3 }} <OLink color="primary" :href="`/${lang}/sig/apply`">{{ i18n.sig.understand.viewApplicationProcess }}</OLink> </div>
        </div>
      </div>
    </template>
    <div class="step-list">
      <template v-for="(step, sIdx) in steps" :key="step.title">
        <div v-if="sIdx !== 0" class="step-line" :style="{ backgroundImage: `url(${iconArrow})` }"></div>
        <div class="step-item">
          <div class="step-title">
            <OIcon class="num">
              <component :is="stepIconMap[sIdx]" class="initial-fill"></component>
            </OIcon>
            <div class="title">{{ step.title }}</div>
          </div>
          <OIcon><component :is="step.icon"></component></OIcon>
        </div>
      </template>
    </div>
  </OCard>
</template>

<style scoped lang="scss">
.step-header {
  --card-title-icon-size: 48px;
  @include respond-to('<=laptop') {
    --card-title-icon-size: 32px;
  }
  img {
    width: var(--card-title-icon-size);
    height: var(--card-title-icon-size);
    @include respond-to('phone') {
      display: none;
    }
  }

  .title {
    img {
      display: none;
      @include respond-to('phone') {
        display: flex;
      }
    }
  }
}

.steps-wrapper {
  --padding-x: 0px;
  background: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  margin-top: var(--o-r-gap-5);

  .step-header {
    display: flex;
    align-items: center;
    gap: var(--card-title-icon-gap);
    .o-icon {
      font-size: var(--o-icon_size-2xl);
      font-weight: 400;
    }
    .header-title {
      .title {
        color: var(--o-color-info1);
        font-weight: 500;
        display: flex;
        align-items: center;
        column-gap: var(--o-r-gap-3);
        @include h4;
      }
      .desc {
        color: var(--o-color-info2);
        margin-top: var(--o-gap-1);
        @include tip1;
        @include respond-to('phone') {
          margin-top: var(--o-r-gap-3);
        }
      }
    }
  }
  .step-list {
    margin-top: var(--o-r-gap-5);
    --padding: 128px;
    padding: 0 calc(var(--padding) + var(--padding-x));
    display: flex;
    justify-content: space-between;
    align-items: center;
    @include respond-to('laptop') {
      --padding: 100px;
    }
    @include respond-to('pad_h') {
      --padding: 64px;
    }
    @include respond-to('<=pad_v') {
      padding: 0 2px;
    }
    .step-line {
      height: 4px;
      width: 32px;
      background-size: contain;
      background-repeat: no-repeat;
      @include respond-to('phone') {
        display: none;
      }
    }
    .step-item {
      display: flex;
      align-items: center;
      flex-direction: row-reverse;

      @include respond-to('pad_v') {
        flex-direction: column;
      }

      .o-icon {
        font-size: 48px;
        @include respond-to('laptop') {
          font-size: 40px;
        }
        @include respond-to('pad_h') {
          font-size: 40px;
        }
        @include respond-to('<=pad_v') {
          font-size: 24px;
        }
      }
      .step-title {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 6px;
        @include respond-to('<=pad_v') {
          gap: 4px;
        }
        .num {
          color: var(--o-color-primary1);
          opacity: 0.3;
          font-size: var(--o-icon_size-xl);
          height: calc(var(--o-icon_size-xl) / 2 - 2px);
          overflow: hidden;
          @include respond-to('phone') {
            --o-icon_size-xl: 24px;
          }
        }
        .title {
          color: var(--o-color-info1);
          padding-left: 4px;
          white-space: nowrap;
          @include tip2;
          @include respond-to('phone') {
            font-size: 8px;
            line-height: 12px;
          }
        }
      }
      @include respond-to('phone') {
        flex-direction: column-reverse;
        gap: 4px;
      }
    }
  }
}
</style>
