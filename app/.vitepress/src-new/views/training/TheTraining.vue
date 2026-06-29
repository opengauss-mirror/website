<script setup lang="ts">
import BannerLevel2 from '~@/components/BannerLevel2.vue';
import bannerImg from '~@/assets/category/training/banner.png';
import bannerImgDark from '~@/assets/category/training/banner_dark.png';
import AppSection from '~@/components/AppSection.vue';
import { OButton, OCollapse, OCollapseItem, OIcon, OIconChevronDown, OLink } from '@opensig/opendesign';
import { useI18n } from '@/i18n';
import { computed, ref } from 'vue';
import { useCommon } from '@/stores/common';

import IconOutlink from '~icons/app-new/icon-out-link.svg';
import IconSignup from '~icons/training/signup.svg';
import IconLearning from '~icons/training/learning.svg';
import IconExam from '~icons/training/exam.svg';
import IconCertification from '~icons/training/certification.svg';
import IconArrow from '~icons/training/step-arrow.svg';
import { GITCODE_LINK } from '~@/data/url-config';
import { useScreen } from '~@/composables/useScreen';

const i18n = useI18n();
const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');

const { gtPhone, isPhone } = useScreen();

const stepsExpanded = ref(false);

const onClickStepsExpand = () => {
  stepsExpanded.value = true;
};

const detailPageUrls = {
  ogca: '/zh/training/signup/ogca/',
  ogcp: '/zh/training/signup/ogcp/',
  ogce: '/zh/training/signup/ogce/',
} as Record<string, string>;
</script>

<template>
  <BannerLevel2
    title="培训认证"
    subtitle="openGauss培训认证体系由社区与合作伙伴共同推出，旨在为企业培养专业DBA人才，为从业人员提供认证，并吸引技术爱好者共建生态，以推动openGauss的技术发展与推广。"
    :background-image="isDark ? bannerImgDark : bannerImg"
    class="training-banner"
  />

  <!-- 认证体系介绍 -->
  <AppSection class="first-section" title="认证体系介绍">
    <div class="training-intro">
      <div class="training-intro-item" v-for="item in i18n.authentication.system" :key="item.name">
        <p class="training-intro-item-title">{{ item.level }}{{ item.name.toUpperCase() }}</p>
        <p class="training-intro-item-content">{{ item.des }}</p>
        <OButton size="large" class="training-intro-item-btn" color="primary" round="pill" variant="solid" :href="detailPageUrls[item.name]">查看详情</OButton>
      </div>
    </div>
  </AppSection>

  <!-- 认证体系优势 -->
  <AppSection title="认证体系优势">
    <div class="training-system-advantages">
      <div class="advantages-item">
        <div class="advantages-detail-item">
          <p class="advantages-detail-title">权威的认证</p>
          <p class="advantages-detail-desc">社区、软协、合作伙伴三方联手打造</p>
        </div>
        <div class="advantages-detail-item">
          <p class="advantages-detail-title">完善的体系</p>
          <p class="advantages-detail-desc">CA、CP、CE三级认证，层次清晰构建完善体系</p>
        </div>
        <div class="advantages-detail-item">
          <p class="advantages-detail-title">系统的课程</p>
          <p class="advantages-detail-desc">课程内容由浅入深、循序渐进紧跟版本变化</p>
        </div>
      </div>
      <div class="advantages-item">
        <div class="advantages-detail-item">
          <p class="advantages-detail-title">专业的讲师</p>
          <p class="advantages-detail-desc">权威专家结合多年教学实践经验提供专业培训</p>
        </div>
        <div class="advantages-detail-item">
          <p class="advantages-detail-title">灵活的参训</p>
          <p class="advantages-detail-desc">线上线下相结合，打破空间约束灵活参与培训</p>
        </div>
        <div class="advantages-detail-item">
          <p class="advantages-detail-title">可观的前景</p>
          <p class="advantages-detail-desc">生态运营成熟，产业覆盖全面市场未来可期</p>
        </div>
      </div>
    </div>
  </AppSection>

  <!-- 认证人才优选 -->
  <AppSection title="认证人才优选">
    <template #subtitle>
      <p class="talent-title">openGauss培训认证体系致力于为企业、在校大学生和IT从业者提供全方位的支持和帮助，共同推动数据库技术的发展和人才培养。</p>
    </template>
    <div class="training-talent">
      <div v-for="item in i18n.authentication.talentList" :key="item.url" class="talent-item">
        <div class="talent-icon-wrapper">
          <img class="talent-icon" :src="isDark ? item.iconDark : item.icon" />
        </div>
        <p class="talent-item-desc" :title="item.desc">{{ item.desc }}</p>
        <OLink :href="item.url" hover-underline color="primary" target="_blank"
          >查看岗位详情
          <template #suffix
            ><OIcon><IconOutlink /></OIcon>
          </template>
        </OLink>
      </div>
    </div>
  </AppSection>

  <!-- 认证流程介绍 -->
  <AppSection :title="i18n.authentication.steptitle">
    <ul ref="stepsRef" class="training-steps">
      <li class="step-item">
        <OIcon class="step-icon">
          <IconSignup />
        </OIcon>
        <div class="step-item-detail">
          <div class="step-index">01</div>
          <div class="step-name">报名考试</div>
        </div>
      </li>
      <OIcon class="step-arrow-icon"><IconArrow /></OIcon>
      <li class="step-item">
        <OIcon class="step-icon">
          <IconLearning />
        </OIcon>
        <div class="step-item-detail">
          <div class="step-index">02</div>
          <div class="step-name">课程学习</div>
        </div>
      </li>
      <OIcon class="step-arrow-icon"><IconArrow /></OIcon>
      <li class="step-item">
        <OIcon class="step-icon">
          <IconExam />
        </OIcon>
        <div class="step-item-detail">
          <div class="step-index">03</div>
          <div class="step-name">参加考试</div>
        </div>
      </li>
      <OIcon class="step-arrow-icon"><IconArrow /></OIcon>
      <li class="step-item" v-show="gtPhone || stepsExpanded">
        <OIcon class="step-icon">
          <IconCertification />
        </OIcon>
        <div class="step-item-detail">
          <div class="step-index">04</div>
          <div class="step-name">获取证书</div>
        </div>
      </li>
      <li class="step-item" v-show="isPhone && !stepsExpanded">
        <OButton variant="text" @click="onClickStepsExpand">
          展开
          <template #suffix>
            <OIcon><OIconChevronDown /></OIcon>
          </template>
        </OButton>
      </li>
    </ul>
  </AppSection>

  <!-- 认证流程介绍 -->
  <AppSection :title="i18n.authentication.qatitle">
    <template #subtitle>
      <div class="training-qa-subtitle">
        <p>
          关于openGauss培训伙伴认证，openGauss提供了完整的评估标准和流程，详见
          <a :href="`${GITCODE_LINK}/opengauss/training-partner-certification`" target="_blank" rel="noopener noreferrer"> openGauss培训伙伴认证整体介绍</a>。
        </p>
        <p>
          <span>{{ i18n.authentication.contact }}</span>
          <a :href="'mailto:' + i18n.authentication.contactemail">{{ i18n.authentication.contactemail }}</a>
        </p>
      </div>
    </template>

    <OCollapse>
      <OCollapseItem v-for="(item) in i18n.authentication.qa" :key="item.question" :value="item.question" >
        <template #title>{{ item.question }}</template>
        <div class="training-qa-item">
          <template v-if="Array.isArray(item.answer)">
            <p v-for="sub in item.answer" :key="sub">{{ sub }}</p>
          </template>
          <template v-else> {{ item.answer }} </template>
        </div>
        <!-- <p class="qa-answer">
        </p> -->
      </OCollapseItem>
    </OCollapse>
  </AppSection>
</template>

<style lang="scss" scoped>
.first-section {
  --o-gap-section: 40px;
  @include respond-to('laptop') {
    --o-gap-section: 24px;
  }
  @include respond-to('pad_h') {
    --o-gap-section: 16px;
  }
  @include respond-to('pad_v') {
    --o-gap-section: 12px;
  }
  @include respond-to('phone') {
    --o-gap-section: 12px;
  }
}

.training-banner {
  @include respond-to('<=pad_v') {
    background-color: transparent !important;
    padding-top: 16px;
    :deep(.banner-bg) {
      display: none;
    }

    :deep(.wrap .banner-text) {
      max-width: 100%;
    }
  }
}

.training-intro {
  display: flex;
  --item-gap: 32px;
  --item-padding: 24px 32px;
  --item-content-text-gap: 16px;
  --item-desc-btn-gap: 24px;
  
  @include respond-to('laptop') {
    --item-padding: 16px 24px;
    --item-content-text-gap: 12px;
    --item-gap: 24px;
    --item-desc-btn-gap: 16px;
  }
  
  @include respond-to('pad_h') {
    --item-padding: 12px 16px;
    --item-content-text-gap: 8px;
    --item-gap: 16px;
    --item-desc-btn-gap: 12px;
  }
  
  @include respond-to('pad_v') {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    --item-padding: 12px 12px;
    --item-content-text-gap: 8px;
    --item-gap: 0;
    --item-desc-btn-gap: 12px;
  }
  
  @include respond-to('phone') {
    display: grid;
    grid-template-columns: 1fr;
    gap: 12px;
    --item-padding: 12px 12px;
    --item-content-text-gap: 8px;
    --item-gap: 0;
    --item-desc-btn-gap: 12px;
  }

  .training-intro-item {
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    flex: 1;
    padding: var(--item-padding);
    background-position: bottom right;
    background-size: cover;
    &:not(:last-child) {
      margin-right: var(--item-gap);
    }
    &:nth-child(1) {
      background-image: url('/category/training/ogca_item_bg.png');
    }
    &:nth-child(2) {
      background-image: url('/category/training/ogcp_item_bg.png');
    }
    &:nth-child(3) {
      background-image: url('/category/training/ogce_item_bg.png');
    }
  }

  .training-intro-item-title {
    @include h3;
    font-weight: 600;
    margin-bottom: var(--item-content-text-gap);
  }

  .training-intro-item-content {
    --line-height: calc(1em + 8px);
    height: calc(2 * var(--line-height));
    color: var(--o-color-info3);
    margin-bottom: var(--item-desc-btn-gap);
    display: -webkit-box;              /* 必须配合 -webkit-box 才能生效 */
    -webkit-line-clamp: 2;             /* 限制显示 2 行 */
    -webkit-box-orient: vertical;      /* 垂直排列 */
    overflow: hidden;                  /* 超出隐藏 */
    text-overflow: ellipsis;
    @include text1;
    @include respond-to('<=pad_v') {
      font-size: 14px;
    }
    @include respond-to('phone') {
      --line-height: calc(1em + 6px);
    }
  }

  .training-intro-item-btn {
    width: fit-content;
    margin-top: auto;
  }
}

@include in-dark {
  .training-intro .training-intro-item {
    &:nth-child(1) {
      background-image: url('/category/training/ogca_item_bg_dark.png');
    }
    &:nth-child(2) {
      background-image: url('/category/training/ogcp_item_bg_dark.png');
    }
    &:nth-child(3) {
      background-image: url('/category/training/ogce_item_bg_dark.png');
    }
  }
}

.training-system-advantages {
  padding: 32px;
  border-radius: 4px;
  background-color: var(--o-color-fill2);
  display: flex;
  flex-direction: column;
  align-items: center;

  --half-item-gap: 16px;

  @include respond-to('laptop') {
    padding: 24px;
    --half-item-gap: 12px;
  }
  
  @include respond-to('pad_h') {
    padding: 16px;
    --half-item-gap: 8px;
  }
  
  @include respond-to('pad_v') {
    padding: 16px 8px;
    --half-item-gap: 6px;
  }
  
  @include respond-to('phone') {
    padding: 16px 2px;
    --half-item-gap: 6px;
  }

  .advantages-item {
    display: flex;
    width: 100%;
    flex-shrink: 0;
    &:last-child {
      .advantages-detail-item {
        padding-top: var(--half-item-gap);
      }
    }
    &:first-child {
      .advantages-detail-item {
        padding-bottom: var(--half-item-gap);
      }
    }
  }

  .advantages-detail-item {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0 16px;
    &:not(:last-child) {
      border-right: 1px solid var(--o-color-control4);
    }
  }

  .advantages-detail-title {
    @include h4;
    font-weight: 600;
    @include respond-to('<=pad_v') {
      @include tip1;
      font-weight: 500;
    }
    @include respond-to('phone') {
      font-size: 12px;
      font-weight: 500;
    }
  }

  .advantages-detail-desc {
    color: var(--o-color-info3);
    margin-top: 8px;
    text-align: center;

    @include text1;
    @include respond-to('<=pad_v') {
      display: none;
    }
  }
}

.talent-title {
  text-align: center;
}

.training-talent {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 默认三列 */
  gap: 32px;
  --item-padding: 24px 32px;
  --item-content-gap: 24px;
  --item-icon-width: 140px;
  --item-icon-height: 40px;
  --link-text-size: 16px;
  --link-text-height: 24px;
  
  @include respond-to('laptop') {
    --item-icon-width: 112px;
    --item-icon-height: 32px;
    --item-padding: 16px 24px;
    --item-content-gap: 16px;
    --link-text-size: 14px;
    --link-text-height: 22px;
    gap: 24px;
  }
  
  @include respond-to('pad_h') {
    --item-icon-width: 112px;
    --item-icon-height: 32px;
    --item-padding: 12px 16px;
    --item-content-gap: 12px;
    --link-text-size: 14px;
    --link-text-height: 22px;
    gap: 16px;
  }
  
  /* 740px - 361px: 两列 */
  @include respond-to('pad_v') {
    --item-icon-width: 98px;
    --item-icon-height: 28px;
    --item-padding: 12px 12px;
    --item-content-gap: 12px;
    --link-text-size: 14px;
    --link-text-height: 22px;
    gap: 12px;
    grid-template-columns: repeat(2, 1fr);
  }
  
  /* 360px及以下: 一列 */
  @include respond-to('phone') {
    --item-icon-width: 98px;
    --item-icon-height: 28px;
    --item-padding: 12px 12px;
    --item-content-gap: 12px;
    --link-text-size: 14px;
    --link-text-height: 22px;
    gap: 12px;
    grid-template-columns: 1fr;
  }

  .talent-item {
    display: flex;
    flex-direction: column;
    background-color: var(--o-color-fill2);
    padding: var(--item-padding);
    border-radius: 4px;

    .talent-icon-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: var(--item-content-gap);
      width: var(--item-icon-width);
      height: var(--item-icon-height);
    }

    .talent-icon {
      width: var(--item-icon-width);
      max-height: var(--item-icon-height);
    }
  }

  .o-link {
    margin-top: auto;
  }

  .talent-item-desc {
    color: var(--o-color-info3);
    margin-bottom: var(--item-content-gap);
    display: -webkit-box;              /* 必须配合 -webkit-box 才能生效 */
    -webkit-line-clamp: 2;             /* 限制显示 2 行 */
    -webkit-box-orient: vertical;      /* 垂直排列 */
    overflow: hidden;                  /* 超出隐藏 */
    text-overflow: ellipsis;
    @include text1;
    @include respond-to('<=pad_v') {
      font-size: 14px;
      line-height: 22px;
    }
  }
}

.training-steps {
  display: flex;
  --step-icon-size: 48px;
  --step-arrow-icon-size: 44px;
  position: relative;

  @include respond-to('laptop') {
    --step-icon-size: 40px;
    --step-arrow-icon-size: 36px;
  }
  
  @include respond-to('pad_h') {
    --step-icon-size: 40px;
    --step-arrow-icon-size: 36px;
  }
  
  @include respond-to('pad_v') {
    --step-icon-size: 32px;
    --step-arrow-icon-size: 30px;
  }
  
  @include respond-to('phone') {
    padding: 16px 20px;
    background-color: var(--o-color-fill2);
    border-radius: 4px;
    flex-direction: column;
  }
  
  .step-item {
    display: flex;
    flex: 1;
    flex-direction: column;
    padding-bottom: 12px;
    @include respond-to('phone') {
      padding-bottom: 0;
    }

    &:last-child {
      @include tip1;
      bottom: 0px;
      left: 0;
      background-color: var(--o-color-fill2);
      width: 100%;
      padding-top: 12px;
      border-radius: 4px;
    }

    @include respond-to('phone') {
      &:not(:first-child) .step-index::before {
        content: "";
        display: block;
        border-left: 1px dashed rgb(var(--o-mixedgray-6));
        height: 22px;
        width: 1px;
      }
    }
  }

  .step-icon {
    font-size: var(--step-icon-size);
    @include respond-to('phone') {
      display: none;
    }
  }
  
  .step-arrow-icon {
    font-size: var(--step-arrow-icon-size);
    @include respond-to('phone') {
      display: none;
    }
  }

  .step-item-detail {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    @include display3;
    @include respond-to('phone') {
      @include text2;
      flex-direction: row;
      align-items: end;
    }
  }

  .step-index {
    font-weight: 600;
    width: fit-content;
    height: 1em;
    overflow: hidden;
    opacity: 0.1;
    @include respond-to('pad_v') {
      font-size: calc(1em + 2px);
    }
    @include respond-to('phone') {
      opacity: 1;
      height: auto;
      display: flex;
      flex-direction: column;
      align-items: center;
      line-height: 24px;
      margin-right: 12px;
    }
  }

  .step-name {
    position: absolute;
    bottom: 0;
    left: 50%;
    width: max-content;
    transform: translate(-50%, 50%);
    @include text1;
    @include respond-to('phone') {
      @include text2;
      position: static;
      transform: none;
      line-height: 24px;
      height: 24px;
    }
  }
}

.training-qa-subtitle {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.training-qa-item {
  color: var(--o-color-info2);
  @include text1;
  @include respond-to('phone') {
    font-size: 14px;
  }
}

.o-collapse {
  --collapse-radius: 4px;
  padding-top: 0;
  padding-bottom: 0;
}

:deep(.o-collapse-item-title) {
  @include h3;
}
</style>
