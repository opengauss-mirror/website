<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue';
import { useRoute, useData } from 'vitepress';
import { useResizeObserver } from '@vueuse/core';

import { useScreen } from '~@/composables/useScreen';
import { useCommon, useGuideStore } from '@/stores/common';

import IconClose from '~icons/app-new/icon-close.svg';

import { FIRST_TOUR_STEPS, NEW_GUIDE_TOUR_STEPS } from '~@/data/tour';
import { OFigure, OButton, OIcon, OCheckbox } from '@opensig/opendesign';

const route = useRoute();
const { lang } = useData();
const { size } = useScreen();
const commonStore = useCommon();
const guideStore = useGuideStore();

const isLight = computed(() => (commonStore.theme === 'light' ? true : false));

const open = ref(false);
const currentStep = ref(0);
const homeVisible = ref(false);
const newGuideVisible = ref(false);
const promptVisible = ref<number[]>([]);
const total = ref(0);

const steps = [...FIRST_TOUR_STEPS, ...NEW_GUIDE_TOUR_STEPS];

const arrowColor = computed(() => {
  return steps[currentStep.value]?.color;
});

total.value = FIRST_TOUR_STEPS.length + NEW_GUIDE_TOUR_STEPS.length;

const handleStopWheel = (e: Event) => {
  e.preventDefault();
  e.stopPropagation();
};

// -------------------- 首页 中文页面  pc端 --------------------
const isHome = computed(() => {
  return route.path === '/zh/' && lang.value === 'zh' && size.width > 1200;
});

watch(
  () => isHome.value,
  (val) => {
    open.value = false;
    if (val) {
      if (!localStorage.getItem('tour_guide') || localStorage.getItem('tour_guide') !== 'guided') {
        window.addEventListener('wheel', handleStopWheel, {
          passive: false,
        });
        open.value = true;
      }
    }
  },
  { immediate: true }
);

// 跳过引导
const skip = () => {
  open.value = false;
};

// 上一步
const prevStep = () => {
  if (currentStep.value > 0) {
    currentStep.value -= 1;
  }
};

// 下一步
const nextStep = (current: number, total: number) => {
  if (current === total - 1) {
    localStorage.setItem('tour_guide', 'guided');
    open.value = false;
    window.scrollTo(0, 0);
  } else {
    currentStep.value += 1;
  }
};

watch(
  () => currentStep.value,
  (val) => {
    homeVisible.value = false;
    newGuideVisible.value = false;

    if (currentStep.value === 9) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    if (val < FIRST_TOUR_STEPS.length) {
      homeVisible.value = true;
    } else {
      newGuideVisible.value = true;
    }
  },
  { immediate: true }
);

watch(
  () => open.value,
  (val) => {
    guideStore.$patch({
      isOpen: val,
    });

    const length = promptVisible.value.length;

    if (length) {
      if (!val && lang.value === 'zh' && size.width > 1200) {
        localStorage.setItem('tour_guide', 'guided');
      }
    }
    if (!val) {
      window.removeEventListener('wheel', handleStopWheel);
    }
  },
  { immediate: true }
);

// 解决窗口尺寸改变导致遮罩不全屏的问题
useResizeObserver(window.document.body, () => {
  if (!open.value) {
    return;
  }

  const path = window.document.querySelector('.el-tour__hollow');
  if (!path) {
    return;
  }

  const d = path.getAttribute('d');
  if (!d) {
    return;
  }

  const width = window.innerWidth;
  const height = window.innerHeight;
  const newD = `M${width},0 L0,0 L0,${height} L${width},${height} L${width},0 Z`;
  path.setAttribute('d', d.replace(/M(\d+),0 L0,0 L0,(\d+) L(\d+),(\d+) L(\d+),0 Z/, newD));
});

onUnmounted(() => {
  window.removeEventListener('wheel', handleStopWheel);
  guideStore.$reset();
});
</script>

<template>
  <el-tour
    v-model="open"
    v-model:current="currentStep"
    :show-close="false"
    :close-on-press-escape="false"
    :mask="true"
    :gap="{ offset: 0 }"
    :scroll-into-view-options="{ behavior: 'auto', block: 'end' }"
    :content-style="{ '--el-tour-bg-color': arrowColor }"
    :class="{
      'home-tour': homeVisible,
      'guide-tour': newGuideVisible,
    }"
  >
    <el-tour-step v-for="item in steps" :key="item.target" :target="item.target || undefined" :placement="item.placement || undefined">
      <template #header>
        <div class="header-img">
          <OFigure :src="isLight ? item.bg : item.darkBg" />
        </div>
      </template>

      <div class="tour-text">
        <div class="tour-title">{{ item.title }}</div>

        <div v-if="item.desc.length" class="tour-desc">
          <div v-for="(subItem, subIndex) in item.desc" :key="subIndex">
            {{ subItem }}
          </div>
        </div>

        <div v-if="item.extra.length" class="tour-extra">
          <div v-for="(subItem, subIndex) in item.extra" :key="subIndex">
            {{ subItem }}
          </div>
        </div>

        <OIcon class="tour-close" @click="skip">
          <IconClose />
        </OIcon>
      </div>

      <div class="tour-footer">
        <div class="footer-item left-item">
          <div class="check-btn">
            <OCheckbox v-model="promptVisible" :value="1">不再提示</OCheckbox>
          </div>

          <span v-if="newGuideVisible" class="indicator-text">
            {{ currentStep + 1 - FIRST_TOUR_STEPS.length }}
            /
            {{ NEW_GUIDE_TOUR_STEPS.length }}
          </span>
        </div>

        <div class="footer-item">
          <span v-if="currentStep > 0" class="prev-step" @click="prevStep()">上一步</span>

          <OButton class="next-step" variant="solid" color="primary" size="small" round="pill" @click="nextStep(currentStep, total)">
            {{ currentStep === total - 1 ? '知道了' : '下一步' }}
          </OButton>
        </div>
      </div>
    </el-tour-step>
  </el-tour>
</template>

<style lang="scss">
.el-tour {
  .el-tour__content {
    width: 720px;
    padding: 0;
    border-radius: var(--o-radius-xs);
    background: var(--o-color-fill2);
  }

  .el-tour__header {
    padding: 0;
  }

  .header-img {
    width: 100%;

    .o-figure {
      width: 100%;
      height: 192px;
      border-radius: var(--o-radius-xs) var(--o-radius-xs) 0 0;
    }
  }

  .el-tour__arrow {
    z-index: -1;
  }

  .tour-text {
    padding: 24px 24px 32px;
  }
  .tour-title {
    @include tip1;
    font-weight: 500;
  }
  .tour-desc {
    @include tip2;
    margin-top: 16px;
    color: var(--o-color-info2);
  }
  .tour-extra {
    @include tip2;
    font-weight: 500;
    margin-top: 16px;
  }
  .indicator-text {
    @include tip2;
    color: var(--o-color-info4);
  }

  .tour-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 24px 36px;
  }
  .footer-item {
    display: flex;
    align-items: center;
  }
  .left-item {
    width: 50%;
    justify-content: space-between;
  }
  .check-btn {
    height: 24px;
    .o-checkbox {
      color: var(--o-color-info3);
      @include tip2;
    }
    .o-checkbox-label {
      color: var(--o-color-info3);
    }
  }
  .prev-step {
    @include tip2;
    margin-right: 14px;
    color: var(--o-color-info3);
    cursor: pointer;
    @include hover {
      color: var(--o-color-info1);
    }
  }
  .next-step {
    @include tip2;
    padding: 13px 11px;
    border-radius: var(--o-radius-l);
  }

  .el-tour__footer {
    display: none;
  }
}

.home-tour {
  .skip {
    margin-left: 0px;
  }

  .tour-close {
    width: 32px;
    height: 32px;
    background-color: rgba(var(--o-mixedgray-14), 0.25);
    border-radius: 50%;
    font-size: 24px;
    color: var(--o-color-fill2);
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    @include x-svg-hover;

    @include hover {
      color: var(--o-color-primary2);
    }

    &.active {
      color: var(--o-color-primary3);
    }
  }
}

.guide-tour {
  .el-tour__content {
    width: 416px;
  }

  .header-img {
    .o-figure {
      height: 100px;
    }
  }

  .tour-close {
    width: 32px;
    height: 32px;
    background-color: rgba(var(--o-mixedgray-14), 0.25);
    border-radius: 50%;
    font-size: 24px;
    color: var(--o-color-fill2);
    position: absolute;
    top: 8px;
    right: 8px;
    cursor: pointer;
    @include x-svg-hover;

    @include hover {
      color: var(--o-color-primary2);
    }

    &.active {
      color: var(--o-color-primary3);
    }
  }

  .tour-text {
    min-height: 122px;
    padding: 24px 24px 12px;
  }
  .tour-desc {
    margin-top: 8px;
  }

  .tour-footer {
    padding: 0 24px 24px;
  }
}
</style>
