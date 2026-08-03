<script setup lang="ts">
import { OCard } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from '~@/i18n';

import SigRoleDesc from '~@/assets/category/sig/sig-role-desc.png';
import SigMeetingGuide from '~@/assets/category/sig/sig-meeting-guide.png';
import SigRoleDescDark from '~@/assets/category/sig/sig-role-desc-dark.png';
import SigMeetingGuideDark from '~@/assets/category/sig/sig-meeting-guide-dark.png';
import RoleDescIcon from '~@/assets/category/sig/role-desc-icon.png';
import RoleDescIconDark from '~@/assets/category/sig/role-desc-icon-dark.png';
import MeetingGuideIcon from '~@/assets/category/sig/meeting-guide-icon.png';
import MeetingGuideIconDark from '~@/assets/category/sig/meeting-guide-icon-dark.png';
import TheSigSteps from './components/TheSigSteps.vue';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common.js';
import { useData } from 'vitepress';

const i18n = useI18n();

const { isDark } = storeToRefs(useCommon());
const { lang } = useData();
</script>

<template>
  <AppSection :title="i18n.sig.understand.title">
    <div class="understand-sig">
      <OCard
        :href="`/${lang}/sig/role-description/`"
        :hoverable="true"
        :title="i18n.sig.understand.title1"
        :title-icon="isDark ? RoleDescIconDark : RoleDescIcon"
      >
        <p class="desc">{{ i18n.sig.understand.desc1 }}</p>
        <img :src="isDark ? SigRoleDescDark : SigRoleDesc" alt="" />
      </OCard>
      <OCard href="/zh/blogs/20260812-openGauss%20SIG%20Meeting%20Guide/openGauss-SIG会议指南.html?from=sig" :hoverable="true" :title="i18n.sig.understand.title2"  :title-icon="isDark ? MeetingGuideIconDark : MeetingGuideIcon">
        <p class="desc">{{ i18n.sig.understand.desc2 }}</p>
        <img :src="isDark ? SigMeetingGuideDark : SigMeetingGuide" alt="" />
      </OCard>
    </div>
    <TheSigSteps></TheSigSteps>
  </AppSection>
</template>

<style lang="scss" scoped>
.understand-sig {
  display: flex;

  @include respond-to('<=pad_v') {
    flex-direction: column;
  }

  .o-card {
    flex: 0 1 50%;
    --card-radius: 4px;
    --card-title-icon-size: 48px;
    --card-header-text-size: var(--o-r-font_size-h4);

    .desc {
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      line-clamp: 2;
      overflow: hidden;
      font-size: var(--o-r-font_size-tip1);
      line-height: var(--o-r-line_height-tip1);
    }
    img {
      margin-top: 12px;
      width: 100%;
    }

    & + .o-card {
      margin-left: var(--o-r-gap-5);
      @include respond-to('<=pad_v') {
        margin-left: 0;
        margin-top: var(--o-r-gap-5);
      }
    }

    @include respond-to('<=laptop') {
      --card-title-icon-size: 32px;
    }

    @include hover {
      --card-header-color: var(--o-color-primary1);
    }
  }
}

:deep(.understand-sig .o-card-main) {
  padding-bottom: 0;
}
</style>
