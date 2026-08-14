<script setup lang="ts">
import { OButton, OCard, OCol, ODivider, OIcon, OIconDone, OLink, ORow } from '@opensig/opendesign';
import IconDownload from '~icons/app/icon-download.svg';
import { computed } from 'vue';
import { useLocale } from '~@/composables/useLocale';
import { applyData } from '~@/data/events';
import { useCommon } from '~@/stores/common';
import { useScreen } from '~@/composables/useScreen';
import { storeToRefs } from 'pinia';

const { t, locale } = useLocale();
const { theme } = storeToRefs(useCommon());
const { gtPadV } = useScreen();

const applySep1 = computed(() => {
  return [applyData[locale.value as 'zh' | 'en'][0], applyData[locale.value as 'zh' | 'en'][1]];
});
const applySep2 = computed(() => {
  return [applyData[locale.value as 'zh' | 'en'][3], applyData[locale.value as 'zh' | 'en'][4]];
});
const applySep3 = computed(() => {
  return applyData[locale.value as 'zh' | 'en'][2];
});

const applyMb = computed(() => {
  return applyData[locale.value];
});
</script>

<template>
  <ORow v-if="gtPadV" gap="32px 0" wrap="nowrap">
    <OCol flex="0 0 66%">
      <div class="top-card">
        <OCard v-for="(item, i) in applySep1" :key="i" :style="{ '--bg-img-src': `url(${item.img})`, '--bg-opacity': theme === 'dark' ? '0.8' : '1' }" class="apply-card">
          <div class="title-box">
            <p class="step">{{ i + 1 }}</p>
            <p class="title">{{ item.title }}</p>
          </div>
          <p v-if="item.desc" class="desc">{{ item.desc }}</p>
          <div v-if="item.email" class="desc">
            {{ item.emailtext1 }}
            <OLink color="primary" variant="text" hoverUnderline :href="`mailto:${item.email}`" target="_blank">
              {{ item.email }}
            </OLink>
            {{ item.emailtext2 }}
          </div>
          <OButton round="pill" v-if="item.href" variant="solid" color="primary" size="large" :href="item.href">
            {{ item.btn }}
          </OButton>
        </OCard>
      </div>
      <OCard v-for="(item, i) in applySep2" :key="i" class="hold-card" :class="{ 'feedback-card': i === 1 }">
        <div style="display: flex; justify-content: space-between">
          <div>
            <div class="title-box">
              <p class="step">{{ i + 4 }}</p>
              <p class="title">{{ item.title }}</p>
            </div>
            <p v-if="item.desc" class="desc">{{ item.desc }}</p>
            <div v-if="item.email" class="desc">
              {{ item.emailtext1 }}
              <OLink color="primary" variant="text" hoverUnderline :href="`mailto:${item.email}`" target="_blank">
                {{ item.email }}
              </OLink>
              {{ item.emailtext2 }}
            </div>
          </div>
          <img :src="item.img" alt="" :style="{ height: '124px', opacity: theme === 'dark' ? '0.8' : '1' }" />
        </div>
      </OCard>
    </OCol>
    <OCol flex="0 0 33%">
      <OCard class="support-card" :class="[theme === 'dark' ? 'support-card-dark' : '']">
        <div class="title-box">
          <p class="step">3</p>
          <p class="title">{{ applySep3.title }}</p>
        </div>
        <p class="text">{{ applySep3.desc }}</p>
        <div v-for="(item, i) in applySep3.list" :key="i" class="item-text">
          <OIcon><OIconDone /></OIcon>
          <div v-if="item.href" class="text-box">
            <span>{{ item.title }}</span>
            <OLink class="tips" :href="item.href" color="primary" variant="text" hoverUnderline>
              <OIcon><IconDownload /></OIcon>{{ t('events.DOWNLOAD_TEXT') }}
            </OLink>
          </div>
          <div v-else class="text-box">
            <p>{{ item.title }}</p>
            <p class="tips">{{ item.text }}</p>
          </div>
        </div>
        <img :src="applySep3.materialPc" alt="" style="width: 100%" />
        <!-- <img class="material2" :src="applySep3.material2" alt="" />
        <img class="material1" :src="applySep3.material1" alt="" /> -->
      </OCard>
    </OCol>
  </ORow>
  <div v-else id="activity-apply" class="section-mb">
    <!-- <p class="section-title-mb">{{ t('eventOverview.applyTitle') }}</p>
    <p class="section-desc-mb">
      {{ t('eventOverview.appltDesc') }}
    </p> -->
    <ORow gap="12px 0" wrap="wrap">
      <OCol flex="0 0 100%" v-for="(item, i) in applyMb" :key="i">
        <div class="apply-col">
          <p class="step">{{ i + 1 }}</p>
          <OCard class="item-card">
            <p class="card-title">{{ item.title }}</p>
            <ODivider />
            <p v-if="item.desc" class="card-desc">{{ item.desc }}</p>
            <div v-if="item.email" class="card-desc">
              {{ item.emailtext1 }}
              <OLink color="primary" variant="text" :href="`mailto:${item.email}`" target="_blank">
                {{ item.email }}
              </OLink>
              {{ item.emailtext2 }}
            </div>
            <OButton v-if="item.href" round="pill" variant="solid" color="primary" size="medium" :href="item.href">
              {{ item.btn }}
            </OButton>
            <div v-for="(val, j) in item.list" :key="j" class="item-text">
              <OIcon><OIconDone /></OIcon>
              <OLink v-if="val.href" class="text-box" :href="val.href" color="primary" variant="text" hoverUnderline>
                <OIcon><IconDownload /></OIcon>{{ val.title }}
              </OLink>
              <div v-else class="text-box">
                <p>{{ val.title }}</p>
                <p class="tips">{{ val.text }}</p>
              </div>
            </div>
            <div v-if="item.materialMb" style="margin-top: 12px; padding: 0 12px">
              <img :src="item.materialMb" alt="" style="width: 100%" />
            </div>
          </OCard>
        </div>
      </OCol>
    </ORow>
  </div>
</template>
<style lang="scss" scoped>
.o-card {
  position: relative;
  --card-main-padding: 24px 32px;
}
.top-card {
  display: flex;
  align-items: center;
}
.apply-card {
  width: calc(50% - 16px);
  height: 320px;
  .title-box, .desc, .o-btn {
    position: relative;
    z-index: 2;
  }
}
.apply-card + .apply-card {
  margin-left: 32px;
}
:deep(.apply-card .o-card-content) {
  &::after {
    content: '';
    background-image: var(--bg-img-src);
    background-size: cover;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: var(--bg-opacity);
    z-index: 1;
    background-position: right bottom;
    background-repeat: no-repeat;
    background-size: 474px auto;
  }
}
.hold-card {
  margin-top: 32px;
  height: 148px;
  background-position: right bottom;
  background-repeat: no-repeat;
  background-size: 269px auto;
}
.feedback-card {
  margin-top: 32px;
  height: 171px;
}
.title-box {
  display: flex;
  align-items: flex-start;
}
.step {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: var(--o-color-link1);
  color: var(--o-color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  margin-top: 6px;
  @include tip1;
}
.title {
  color: var(--o-color-info1);
  font-weight: 500;
  margin-left: 12px;
  @include h2;
}
.desc {
  color: var(--o-color-info2);
  margin-top: 16px;
  @include tip1;
}
.o-btn {
  margin-top: 16px;
}

.support-card {
  background-image: linear-gradient(135deg, rgba(125, 50, 234, 1) 0%, rgba(185, 170, 255, 1) 100%);
  position: relative;
  .step {
    background-color: var(--o-color-white);
    color: var(--o-color-link1);
  }
  .title {
    color: var(--o-color-white);
  }
  .text {
    margin: 16px 0 0 32px;
    color: var(--o-color-white);
    @include tip1;
  }
  .o-link {
    color: var(--o-color-white);
  }
  .tips {
    opacity: 0.8;
  }
}
.support-card-dark {
  background-color: rgba(0, 0, 0, 0.2);
  background-image: linear-gradient(142.13deg, rgba(154, 88, 238, 0.4) 0%, rgb(154, 88, 238, 0.16) 100%);
  background-blend-mode: color;
}

.item-text {
  display: flex;
  align-items: flex-start;
  color: var(--o-color-white);
  margin-top: 8px;
  @include tip1;
}
.text-box {
  margin-left: 8px;
}

@include respond-to('<=pad_v') {
  .section-title-mb {
    color: var(--o-color-info1);
    text-align: center;
    font-weight: 500;
    @include display3;
  }
  .section-desc-mb {
    color: var(--o-color-info2);
    margin-top: 12px;
    @include text1;
  }

  .apply-col {
    display: flex;
    align-items: flex-start;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      width: 1px;
      height: calc(100% - 36px);
      top: 48px;
      left: 9px;
      background-color: var(--o-color-control4);
      z-index: 2;
    }
  }
  .section-mb {
    .o-col {
      &:last-of-type {
        .apply-col {
          &::before {
            display: none;
          }
        }
      }
    }
  }
  .step {
    flex-shrink: 0;
    margin: 12px 12px 0 0;
  }
  .item-card {
    --card-main-padding: 0 0 12px;
    width: 100%;
  }
  .card-title {
    font-weight: 600;
    color: var(--o-color-info2);
    padding: 13px 16px 0;
    @include text2;
  }
  .card-desc {
    padding: 0 12px;
    @include text1;
  }
  .o-btn {
    margin: 12px 0 0 12px;
  }
  .o-col {
    margin-top: 12px;
  }
  .img-mb {
    width: 100%;
    display: flex;
    align-items: flex-start;
    padding: 0 12px;
    margin-top: 12px;
    img {
      width: 50%;
      border-radius: var(--o-radius-xs);
      border: 1px solid var(--o-color-control4);
    }
    img + img {
      margin-left: 8px;
    }
  }
  .item-text {
    color: var(--o-color-info2);
    padding: 0 12px;
    @include text1;
    .o-icon {
      margin-top: 4px;
    }
    .o-link {
      :deep(.o-link-label) {
        display: flex;
        align-items: center;
      }
    }
  }
  .text-link {
    margin-left: 4px;
  }
  .tips {
    color: var(--o-color-info2);
  }
}
</style>
