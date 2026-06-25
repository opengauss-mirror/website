<script setup lang="ts">
import { onMounted, computed, shallowRef } from 'vue';
import { OBreadcrumb, OBreadcrumbItem, OTag, OIcon } from '@opensig/opendesign';

import ContentWrapper from '~@/components/ContentWrapper.vue';

import banner from '~@/assets/category/events/detail/banner.png';
import bannerDark from '~@/assets/category/events/detail/banner-dark.png';

import IconTime from '~icons/app-new/icon-time.svg';
import IconAddress from '~icons/app-new/icon-address.svg';

import { useCommon } from '@/stores/common';
import { useLocale } from '~@/composables/useLocale';
import { useScreen } from '~@/composables/useScreen';
import { EventState } from '~@/data/events/content-bridge';
import { useData } from 'vitepress';

const { t, locale } = useLocale();
const { lePadV, isPadVToLaptop } = useScreen();
const { frontmatter } = useData();

const commonStore = useCommon();
const isDark = computed(() => (commonStore.theme === 'dark' ? true : false));

const verticalPadding = computed(() => {
  if (isPadVToLaptop.value) {
    return ['16px', '40px'];
  } else if (lePadV.value) {
    return ['16px', '32px'];
  } else {
    return ['32px', '72px'];
  }
});

const today = shallowRef<Date>();

onMounted(() => (today.value = new Date()));

const expirationState = computed(() => {
  try {
    if (!today.value || !frontmatter.value.date) {
      return '';
    }
    const dateStr = frontmatter.value.date.replace(/\//g, '-');
    if (isNaN(Date.parse(dateStr))) {
      return '';
    }
    const _today = new Date(today.value.getFullYear(), today.value.getMonth(), today.value.getDate()).getTime();
    const date = new Date(dateStr);
    const _date = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();
    if (_today > _date) {
      return 1;
    }
    if (_today <= _date) {
      return 2;
    }
    return '';
  } catch {
    return '';
  }
});
</script>

<template>
  <div class="event-detail">
    <ContentWrapper :vertical-padding="verticalPadding">
      <OBreadcrumb v-if="!lePadV">
        <OBreadcrumbItem :href="`/${locale}/events/list/`">
          {{ t('events.list.list') }}
        </OBreadcrumbItem>
        <OBreadcrumbItem>{{ frontmatter?.title }}</OBreadcrumbItem>
      </OBreadcrumb>
      <div
        class="banner"
        :style="{
          backgroundImage: `url(${isDark ? bannerDark : banner})`,
        }"
      >
        <div>
          <div class="title-box">
            <span class="title">{{ frontmatter?.title }}</span>
            <ClientOnly>
              <OTag v-if="expirationState" class="type-tag" :class="{ 'tag-completed': expirationState === 1 }">
                <span class="tag-text">
                  {{ EventState.get(expirationState)?.label[locale] }}
                </span>
              </OTag>
            </ClientOnly>
          </div>
          <p class="synopsis">{{ frontmatter?.summary }}</p>
          <div class="date">
            <OIcon><IconTime /></OIcon>
            {{ frontmatter?.date }}
          </div>
          <div class="address">
            <OIcon><IconAddress /></OIcon>
            {{ frontmatter?.location }}
          </div>
        </div>
        <!-- <OButton
          v-if="frontmatter?.activity_type === 1 && frontmatter?.new_url"
          variant="solid"
          color="primary"
          :size="lePadV ? 'medium' : 'large'"
          :href="frontmatter?.new_url"
          target="_blank"
          class="review-btn"
        >
          <span>{{ t('events.list.review') }}</span>
        </OButton>
        <OButton
          v-if="frontmatter?.activity_type === 2 && frontmatter?.signup_url"
          variant="solid"
          color="primary"
          :size="lePadV ? 'medium' : 'large'"
          :href="isPhone ? frontmatter?.signup_url_mb : frontmatter?.signup_url"
          target="_blank"
          class="review-btn"
        >
          <span>{{ t('events.list.signup') }}</span>
        </OButton> -->
      </div>
      <div class="content markdown" :class="{ 'content-dark': isDark }">
        <Content />
      </div>
    </ContentWrapper>
  </div>
</template>

<style lang="scss" scoped>
:deep(.markdown p, .markdown ul, .markdown ol) {
  color: var(--o-color-info2);
}
.o-breadcrumb {
  --breadcrumb-color-hover: var(--o-color-primary1);
  --breadcrumb-color-active: var(--o-color-primary1);
  --breadcrumb-color-selected: var(--o-color-primary1);
}
.banner {
  background-color: var(--o-color-fill2);
  padding: 32px 68px 32px 32px;
  border-radius: var(--o-radius-xs);
  margin-top: 24px;
  color: var(--o-color-info2);
  background-position: left top;
  background-repeat: no-repeat;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: space-between;
  @include tip1;
}
.title-box {
  display: flex;
  align-items: center;
}
.title {
  font-weight: 500;
  color: var(--o-color-info2);
  @include h2;
}
.type-tag {
  margin-left: 16px;
  --tag-padding: 1px 8px;
  --tag-bg-color: rgba(var(--o-blue-6));
  --tag-bd-color: rgba(var(--o-blue-6));
  --tag-color: var(--o-color-white);
}
.tag-completed {
  --tag-bg-color: rgba(var(--o-mixedgray-14), 0.4);
  --tag-bd-color: transparent;
}
.synopsis {
  width: 932px;
  margin-top: 16px;
}
.date {
  margin-top: 24px;
}
.address {
  margin-top: 12px;
}

.date,
.address {
  display: flex;
  align-items: center;
  .o-icon {
    margin-right: 8px;
    @include text1;
  }
}

.review-btn {
  --btn-min-width: 112px;
}

.content {
  width: var(--grid-content-width);
  max-width: var(--grid-content-width);
  background-color: var(--o-color-fill2);
  border-radius: var(--o-radius-xs);
  margin-top: 32px;
  margin-left: 0;
  margin-right: 0;
  box-shadow: none;
}

:deep(.content h2) {
  font-weight: 600;
  &:first-child {
    margin-top: 0 !important;
  }
}

:deep(.content.markdown img) {
  max-width: 60%;
}
/* .o-figure {
  margin-top: 32px;
  max-width: 800px;
}
.content-dark {
  .o-figure {
    @include img-in-dark;
  }
} */

@include respond-to('laptop') {
  .synopsis {
    width: 860px;
  }
}

@include respond-to('pad_h') {
  .banner {
    padding: 24px;
  }
  .synopsis {
    width: 580px;
  }
}

@include respond-to('<=pad_v') {
  .banner {
    background-image: none !important;
    padding: 16px;
    align-items: flex-start;
    flex-direction: column;
    margin-top: 0;
  }
  .title-box {
    display: inline-block;
  }
  .title {
    @include h1;
  }
  .synopsis {
    width: 100%;
    @include tip2;
  }
  .date {
    margin-top: 12px;
    @include tip2;
  }
  .address {
    margin-top: 8px;
    align-items: flex-start;
    @include tip2;
  }
  .o-icon {
    font-size: 16px !important;
    margin-top: 1px;
  }
  .review-btn {
    margin-top: 16px;
    --btn-min-width: 80px;
  }
  .content {
    background-color: var(--o-color-fill2);
    box-sizing: border-box;
    padding: 16px;
    margin-top: 16px;
    box-shadow: none;
  }
  .o-figure {
    margin-top: 12px;
    --figure-radius: var(--o-radius-xs);
  }
}
@include respond-to('phone') {
  .title {
    @include display3;
  }
  .synopsis {
    width: 100%;
    @include text1;
  }
  .date {
    @include text1;
  }
  .address {
    @include text1;
  }
}
</style>
