<script setup lang="ts">
import { OBreadcrumb, OBreadcrumbItem, OIcon, OLink } from '@opensig/opendesign';
import { useData } from 'vitepress';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from '~@/i18n';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';

import IconDoc from '~icons/app-new/icon-doc.svg';
import ContributorRoleBg from '~@/assets/category/sig/contributor-role-bg.png';
import ContributorRoleBgDark from '~@/assets/category/sig/contributor-role-bg-dark.png';
import Contributor2 from '~@/assets/category/sig/contributor2.png';
import Contributor2Dark from '~@/assets/category/sig/contributor2-dark.png';
import CommitterRoleBg from '~@/assets/category/sig/committer-role-bg.png';
import CommitterRoleBgDark from '~@/assets/category/sig/committer-role-bg-dark.png';
import Committer2 from '~@/assets/category/sig/committer2.png';
import Committer2Dark from '~@/assets/category/sig/committer2-dark.png';
import MaintainerRoleBg from '~@/assets/category/sig/maintainer-role-bg.png';
import MaintainerRoleBgDark from '~@/assets/category/sig/maintainer-role-bg-dark.png';
import Maintainer2 from '~@/assets/category/sig/maintainer2.png';
import Maintainer2Dark from '~@/assets/category/sig/maintainer2-dark.png';
import IconCheck from '~icons/app-new/icon-checkmark.svg';
import IconBulb from '~icons/app-new/icon-bulb.svg';
import IconNewContributor from '~icons/sig/icon-new-contributor.svg';
import IconExistingMembers from '~icons/sig/icon-existing-members.svg';
import contributorRequirementIcon from '~@/assets/category/sig/join-requirement-contributor.png';
import committerRequirementIcon from '~@/assets/category/sig/join-requirement-committer.png';
import maintainerRequirementIcon from '~@/assets/category/sig/join-requirement-maintainer.png';
import { computed } from 'vue';

const i18n = useI18n();

const { lang, frontmatter } = useData();
const { isDark } = storeToRefs(useCommon());
const goBackUrl = computed(() => frontmatter.value!.goBackUrl as string);

const jumpAnchor = (e: MouseEvent) => {
  const target = e.currentTarget as HTMLAnchorElement;
  let id = target.getAttribute('href');
  id = id?.startsWith('#') ? id.slice(1) : id;
  const section = document.getElementById(id!);
  section?.scrollIntoView();
};
</script>

<template>
  <AppSection>
    <OBreadcrumb>
      <OBreadcrumbItem :href="goBackUrl">{{ i18n.sig.sigCenter }}</OBreadcrumbItem>
      <OBreadcrumbItem>{{ i18n.sig.roles.title }}</OBreadcrumbItem>
    </OBreadcrumb>
    <div class="role-overview">
      <div class="roles">
        <div class="role-item" :style="{ backgroundImage: `url(${isDark ? ContributorRoleBgDark : ContributorRoleBg})` }">
          <p class="title">{{ i18n.sig.roles.contributor }}</p>
          <p
            class="desc"
            v-for="(item, idx) in i18n.sig.roles.contributorDesc"
            :class="{ 'last-desc': idx === i18n.sig.roles.contributorDesc.length - 1 }"
            :key="item"
          >
            {{ item }}
          </p>
          <OLink color="normal" href="#contributor" @click="jumpAnchor"
            ><template #icon><IconDoc /></template>{{ i18n.common.viewDetails }}</OLink
          >
        </div>
        <div class="role-item" :style="{ backgroundImage: `url(${isDark ? CommitterRoleBgDark : CommitterRoleBg})` }">
          <p class="title">{{ i18n.sig.roles.committer }}</p>
          <p
            class="desc"
            v-for="(item, idx) in i18n.sig.roles.committerDesc"
            :class="{ 'last-desc': idx === i18n.sig.roles.committerDesc.length - 1 }"
            :key="item"
          >
            {{ item }}
          </p>
          <OLink color="normal" href="#committer" @click="jumpAnchor"
            ><template #icon><IconDoc /></template>{{ i18n.common.viewDetails }}</OLink
          >
        </div>
        <div class="role-item" :style="{ backgroundImage: `url(${isDark ? MaintainerRoleBgDark : MaintainerRoleBg})` }">
          <p class="title">{{ i18n.sig.roles.maintainer }}</p>
          <p
            class="desc"
            v-for="(item, idx) in i18n.sig.roles.maintainerDesc"
            :class="{ 'last-desc': idx === i18n.sig.roles.maintainerDesc.length - 1 }"
            :key="item"
          >
            {{ item }}
          </p>
          <OLink color="normal" href="#maintainer" @click="jumpAnchor"
            ><template #icon><IconDoc /></template>{{ i18n.common.viewDetails }}</OLink
          >
        </div>
      </div>

      <div class="roles2">
        <div class="item">
          <OIcon class="item-left">
            <IconNewContributor />
          </OIcon>
          <div class="item-right">
            <div class="item-title">{{ i18n.sig.roles.newContributors }}</div>
            <div class="item-desc">
              {{ i18n.sig.roles.welcomNewContributors }} <OLink color="primary" :href="`/${lang}/contribution/`">{{ i18n.sig.roles.contributorGuide }}</OLink>
            </div>
          </div>
        </div>
        <div class="item">
          <OIcon class="item-left">
            <IconExistingMembers />
          </OIcon>
          <div>
            <div class="item-title">{{ i18n.sig.roles.existingMembers }}</div>
            <div class="item-desc">
              {{ i18n.sig.roles.existingMembersDesc1 }} <OLink color="primary" :href="`/${lang}/conduct/`">{{ i18n.sig.roles.codeOfConduct }}</OLink
              >{{ i18n.sig.roles.existingMembersDesc2 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </AppSection>

  <!-- 贡献者 -->
  <AppSection id="contributor" :title="i18n.sig.roles.contributorTitle" :subtitle="i18n.sig.roles.contributorSubTitle">
    <div class="contributor-desc">
      <div class="item" :style="{ backgroundImage: `url(${isDark ? Contributor2Dark : Contributor2})` }">
        <p class="title">
          <img :src="contributorRequirementIcon" />
          <span>{{ i18n.sig.roles.joinRequirement }}</span>
        </p>
        <div>
          <p class="desc" v-for="item in i18n.sig.roles.contributorRequirements" :key="item">
            <OIcon><IconCheck /></OIcon>
            {{ item }}
          </p>
        </div>
      </div>
      <div class="item" :style="{ backgroundImage: `url(${isDark ? Contributor2Dark : Contributor2})` }">
        <p class="title">
          <img :src="contributorRequirementIcon" />
          <span>{{ i18n.sig.roles.responsibilityAndRights }}</span>
        </p>
        <div>
          <p class="desc" v-for="item in i18n.sig.roles.contributorResponsibility" :key="item">
            <OIcon><IconCheck /></OIcon>
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </AppSection>

  <!-- 审核者 -->
  <AppSection id="committer" :title="i18n.sig.roles.committerTitle" :subtitle="i18n.sig.roles.committerSubTitle">
    <div class="committer-desc">
      <div class="item" :style="{ backgroundImage: `url(${isDark ? Committer2Dark : Committer2})` }">
        <p class="title">
          <img :src="committerRequirementIcon" />
          <span>{{ i18n.sig.roles.joinRequirement }}</span>
        </p>
        <div>
          <p class="desc" v-for="item in i18n.sig.roles.committerRequirements" :key="item">
            <OIcon><IconCheck /></OIcon>
            {{ item }}
          </p>
        </div>
      </div>
      <div class="item" :style="{ backgroundImage: `url(${isDark ? Committer2Dark : Committer2})` }">
        <p class="title">
          <img :src="committerRequirementIcon" />
          <span>{{ i18n.sig.roles.responsibilityAndRights }}</span>
        </p>
        <div>
          <p class="desc" v-for="(item, idx) in i18n.sig.roles.committerResponsibility" :key="item">
            <OIcon><IconCheck v-if="idx < i18n.sig.roles.committerResponsibility.length - 1" /><IconBulb v-else /></OIcon>
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </AppSection>

  <!-- 维护者 -->
  <AppSection id="maintainer" :title="i18n.sig.roles.maintainerTitle" :subtitle="i18n.sig.roles.maintainerSubTitle">
    <div class="committer-desc maintainer-desc">
      <div class="item" :style="{ backgroundImage: `url(${isDark ? Maintainer2Dark : Maintainer2})` }">
        <p class="title">
          <img :src="maintainerRequirementIcon" />
          <span>{{ i18n.sig.roles.joinRequirement }}</span>
        </p>
        <div>
          <p class="desc" v-for="item in i18n.sig.roles.maintainerRequirements" :key="item">
            <OIcon><IconCheck /></OIcon>
            {{ item }}
          </p>
        </div>
      </div>
      <div class="item" :style="{ backgroundImage: `url(${isDark ? Maintainer2Dark : Maintainer2})` }">
        <p class="title">
          <img :src="maintainerRequirementIcon" />
          <span>{{ i18n.sig.roles.responsibilityAndRights }}</span>
        </p>
        <div>
          <p class="desc" v-for="(item, idx) in i18n.sig.roles.maintainerResponsibility" :key="item">
            <OIcon><IconCheck v-if="idx < i18n.sig.roles.maintainerResponsibility.length - 1" /><IconBulb v-else /></OIcon>
            {{ item }}
          </p>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.o-breadcrumb {
  @include respond-to('<=pad_v') {
    display: none;
  }
}

.o-link-normal {
  --link-color: var(--o-color-info1);
}

:deep(.o-link .o-link-label) {
  display: inline;
}

.app-section:first-child {
  :deep(.section-wrapper) {
    margin-top: var(--o-r-gap-6) !important;
  }
}

.role-overview {
  margin-top: var(--o-r-gap-5);

  .roles {
    display: flex;
    @include respond-to('<=pad_v') {
      flex-direction: column;
    }
  }

  .role-item {
    flex: 1 0;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    padding: var(--o-r-gap-6);
    background-size: cover;

    & + .role-item {
      margin-left: var(--o-r-gap-6);
    }
    @include respond-to('<=pad_v') {
      & + .role-item {
        margin-left: 0;
        margin-top: var(--o-r-gap-6);
      }
    }

    .title {
      display: flex;
      font-weight: 600;
      font-size: var(--o-r-font_size-h2);
      line-height: var(--o-r-line_height-h2);
    }

    .desc {
      color: var(--o-color-info2);
      margin-top: var(--o-r-gap-2);
      @include text1;
      &.last-desc {
        margin-bottom: var(--o-r-gap-5);
      }
    }

    .o-link {
      display: block;
      margin-top: auto;
      font-size: var(--o-r-font_size-text1);
      line-height: var(--o-r-line_height-text1);
    }
  }

  .roles2 {
    margin-top: var(--o-r-gap-7);
    display: flex;
    @include respond-to('<=pad_v') {
      flex-direction: column;
    }

    .item {
      flex: 1 0;
      padding: var(--o-r-gap-5) var(--o-r-gap-6);
      background-color: var(--o-color-fill2);
      border-radius: 4px;

      display: flex;
      align-items: flex-start;

      & + .item {
        margin-left: var(--o-r-gap-6);
      }
      @include respond-to('<=pad_v') {
        & + .item {
          margin-left: 0;
          margin-top: var(--o-r-gap-6);
        }
      }

      .item-left {
        --size: var(--o-control_size-xl);
        font-size: var(--size);
        height: var(--size);
        width: var(--size);
        margin-right: var(--o-r-gap-4);
        flex-shrink: 0;
        @include respond-to('laptop') {
          --size: 40px;
        }
        @include respond-to('pad_h') {
          --size: 40px;
        }
        @include respond-to('<=pad_v') {
          --size: 32px;
        }
      }
      .item-title {
        margin-bottom: var(--o-r-gap-3);
        font-weight: 500;
        @include h3;
        @include respond-to('phone') {
          margin-bottom: var(--o-gap-2);
        }
      }
      .item-desc {
        @include text1;
      }
    }
  }
}

.contributor-desc {
  display: flex;

  .item {
    background-size: cover;
    border-radius: 4px;
    flex: 1 0;
    padding: var(--o-r-gap-5) var(--o-r-gap-6);
    @include text1;

    .title {
      display: flex;
      align-items: center;
      font-size: var(--o-r-font_size-h4);
      font-weight: 600;

      img {
        width: var(--o-r-font_size-display3);
        height: var(--o-r-font_size-display3);
        margin-right: var(--o-r-gap-4);
      }
    }

    .desc {
      display: flex;
      align-items: start;
      color: var(--o-color-info2);
      & + .desc {
        margin-top: var(--o-r-gap-4);
      }
      &:first-child {
        margin-top: var(--o-r-gap-5);
      }
      .o-icon {
        font-size: var(--o-r-font_size-h2);
        margin-right: var(--o-r-gap-4);
        margin-top: 2px;
        color: rgb(164, 201, 255);
      }
    }

    & + .item {
      margin-left: var(--o-r-gap-6);
    }
    @include respond-to('<=pad_v') {
      & + .item {
        margin-top: var(--o-r-gap-6);
        margin-left: 0;
      }
    }
  }

  @include respond-to('<=pad_v') {
    flex-direction: column;
  }
}

.committer-desc {
  display: flex;

  .item {
    flex: 3;
    background-size: cover;
    border-radius: 4px;
    padding: var(--o-r-gap-5) var(--o-r-gap-6);
    @include text1;

    & + .item {
      flex: 7;
      margin-left: var(--o-r-gap-6);
    }

    .title {
      display: flex;
      align-items: center;
      font-size: var(--o-r-font_size-h4);
      font-weight: 600;

      img {
        width: var(--o-r-font_size-display3);
        height: var(--o-r-font_size-display3);
        margin-right: var(--o-r-gap-4);
      }
    }

    .desc {
      display: flex;
      align-items: start;
      color: var(--o-color-info2);
      & + .desc {
        margin-top: var(--o-r-gap-4);
      }
      &:first-child {
        margin-top: var(--o-r-gap-5);
      }
      .o-icon {
        font-size: var(--o-r-font_size-h2);
        color: rgb(226, 190, 255);
        margin-right: var(--o-r-gap-4);
        margin-top: 2px;
      }
    }
    @include respond-to('<=pad_v') {
      & + .item {
        margin-top: var(--o-r-gap-6);
        margin-left: 0;
      }
    }
  }

  @include respond-to('<=pad_v') {
    flex-direction: column;
  }
}

.maintainer-desc {
  .item {
    .desc {
      .o-icon {
        color: rgb(131, 150, 255);
      }
    }
  }
}
</style>
