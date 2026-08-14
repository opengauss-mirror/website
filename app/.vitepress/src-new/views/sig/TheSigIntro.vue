<script lang="ts" setup>
import iconIntro1 from '~icons/sig/icon-sig-intro1.svg';
import iconIntro2 from '~icons/sig/icon-sig-intro2.svg';
import iconIntro3 from '~icons/sig/icon-sig-intro3.svg';

import { OIcon, OLink } from '@opensig/opendesign';
import AppSection from '~@/components/AppSection.vue';
import { useI18n } from '~@/i18n';
import { useData } from 'vitepress';

const i18n = useI18n();
const { lang } = useData();
</script>
<template>
  <AppSection :title="i18n.sig.intro.title" class="sig-welcome">
    <div class="sig-welcome-card">
      <div class="card-item">
        <OIcon class="icon"><iconIntro1 /></OIcon>
        <div class="sig-info">
          <div class="title">{{ i18n.sig.intro.subTitle1 }}</div>
          <div class="subtitle">{{ i18n.sig.intro.desc1 }}</div>
        </div>
      </div>
      <div class="card-item">
        <OIcon class="icon"><iconIntro2 /></OIcon>
        <div class="sig-info">
          <div class="title">{{ i18n.sig.intro.subTitle2 }}</div>
          <div class="subtitle">{{ i18n.sig.intro.desc2 }}</div>
        </div>
      </div>
      <div class="card-item">
        <OIcon class="icon"><iconIntro3 /></OIcon>
        <div class="sig-info">
          <div class="title">{{ i18n.sig.intro.subTitle3 }}</div>
          <div class="subtitle" v-for="(item, idx) in i18n.sig.intro.desc3" :key="item">
            {{ item }}
            <OLink v-if="idx === i18n.sig.intro.desc3.length - 1" color="primary" :href="`/${lang}/contribution/`" target="_blank" rel="noopener noreferrer">{{
              i18n.sig.intro.sigContributeGuide
            }}</OLink>
          </div>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style scoped lang="scss">
.sig-welcome {
  .sig-welcome-card {
    --title-gap: var(--o-r-gap-2);
    --title-icon-size: var(--o-icon_size-2xl);
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 80px;
    background-color: var(--o-color-fill2);
    padding: var(--o-r-gap-5) var(--o-r-gap-8);
    border-radius: var(--o-radius-xs);
    @include respond-to('laptop') {
      --title-icon-size: 40px;
    }
    @include respond-to('pad_h') {
      --title-icon-size: 40px;
    }
    @include respond-to('<=pad_v') {
      --title-icon-size: 32px;
      display: flex;
      flex-direction: column;
      padding: 12px;
      gap: 24px;
    }

    .card-item {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      &:not(:first-child) {
        .sig-info {
          &::after {
            position: absolute;
            content: '';
            left: -40px;
            bottom: 0;
            width: 1px;
            height: 100%;
            background-color: var(--o-color-control4);
            @include respond-to('<=pad_v') {
              width: 100%;
              height: 1px;
              left: 0;
              top: -12px;
            }
          }
        }
      }

      .o-icon {
        margin-bottom: var(--title-gap);
        font-size: var(--title-icon-size);
        @include respond-to('<=pad_v') {
          height: min-content;
        }
      }

      .title {
        font-weight: 500;
        @include h4;
        @include respond-to('<=pad_v') {
          margin-top: 0;
        }
        @include respond-to('phone') {
          @include h3;
        }
      }

      .subtitle {
        margin-top: var(--o-r-gap-4);
        color: var(--o-color-info2);
        @include tip1;
        @include respond-to('<=pad_v') {
          margin-top: 8px;
        }
        @include respond-to('phone') {
          @include text1;
        }
        & + .subtitle {
          margin-top: 0;
        }
      }

      .sig-info {
        position: relative;
        flex: 1;
        @include respond-to('<=pad_v') {
          position: initial;
        }
      }
    }
  }

  :deep(.underline-link) {
    --link-color-hover: var(--o-color-primary1);
    --link-underline-x: 100%;

    color: var(--o-color-primary1);
    background: linear-gradient(0deg, var(--link-color-hover), var(--link-color-hover)) no-repeat var(--link-underline-x) bottom;
    background-size: 0 1px;
    transition: background-size var(--o-easing-standard) var(--o-duration-m2);

    @include hover {
      background-size: var(--link-underline-x) 1px;
      background-position-x: left;
    }
  }

  .o-divider {
    --o-divider-label-gap: 0 40px;
    @include respond-to('<=pad_v') {
      margin-top: var(--o-divider-gap);
      height: auto;
    }
  }
}
</style>
