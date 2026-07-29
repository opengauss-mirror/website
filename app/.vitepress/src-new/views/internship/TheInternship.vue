<script setup lang="ts">
import AppSection from '~@/components/AppSection.vue';
import qrCode from '~@/assets/category/internship/qrCode.png';
import qrCodeDark from '~@/assets/category/internship/qrCode-dark.png';
import TheInternshipIntro from './components/intro/TheInternshipIntro.vue';
import TheInternshipFaq from './components/TheInternshipFaq.vue';
import TheInternshipReward from './components/TheInternshipReward.vue';
import TheInternshipTasks from './components/TheInternshipTasks.vue';
import { OIcon, OLink } from '@opensig/opendesign';
import IconOutlink from '~icons/app-new/icon-out-link.svg';
import { GITCODE_LINK } from '~@/data/url-config/index.js';
import { EMAIL_ADDRESS } from './components/types.js';
import { useCommon } from '~@/stores/common.js';
import { storeToRefs } from 'pinia';

const { theme } = storeToRefs(useCommon());
</script>

<template>
  <AppSection title="实习介绍">
    <TheInternshipIntro />
  </AppSection>
  <AppSection title="实习任务">
    <TheInternshipTasks />
    <template #footer>
      <OLink class="view-all-tasks" variant="text" color="primary" :href="`${GITCODE_LINK}/opengauss/opensource-intership/issues`" target="_blank" rel="noopener noreferrer">
        查看全部实习任务
        <template #suffix><OIcon><IconOutlink /></OIcon></template>
      </OLink>
    </template>
  </AppSection>
  <AppSection title="实习薪资与证明">
    <TheInternshipReward />
  </AppSection>
  <AppSection title="实习规则FAQ">
    <TheInternshipFaq />
  </AppSection>
  <AppSection title="帮助咨询">
    <div class="internship-consult">
      <img :src="theme === 'dark' ? qrCodeDark : qrCode" alt="qrcode" class="qrcode">
      <div>
        <p>扫描二维码关注 openGauss 公众号，回复「开源实习」即可加入开源实习交流群。</p>
        <p>联系邮箱： <OLink :href="`mailto:${EMAIL_ADDRESS}`" color="primary">{{ EMAIL_ADDRESS }}</OLink></p>
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.view-all-tasks {
  @include text1;
  @include respond-to('phone') {
    font-size: 14px;
    line-height: 22px;
  }
}

.o-icon svg {
  fill: currentColor;
}

.internship-consult {
  background-color: var(--o-color-fill2);
  border-radius: 4px;
  --padding: 32px;
  padding: var(--padding);
  --img-size: 160px;
  display: flex;
  align-items: center;
  @include text2;

  .qrcode {
    width: var(--img-size);
    height: var(--img-size);
    margin-right: var(--padding);
    @include respond-to('phone') {
      margin-right: 0;
      margin-bottom: var(--padding);
    }
  }

  @include respond-to('laptop') {
    --padding: 24px;
    --img-size: 120px;
  }
  @include respond-to('pad_h') {
    --padding: 16px;
    --img-size: 100px;
  }
  @include respond-to('pad_v') {
    --padding: 12px;
    --img-size: 100px;
  }
  @include respond-to('phone') {
    flex-direction: column;
    --padding: 12px;
    --img-size: 100px;
  }
}
</style>
