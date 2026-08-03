<script setup lang="ts">
import IconPage from '~icons/app/icon-page.svg';
import IconChat from '~icons/app/icon-chat.svg';
import { OIcon } from '@opensig/opendesign';
import { useRouter } from 'vitepress';
import { FORUM_LINK } from '@/data/url-config';

const router = useRouter();

const goFaq = () => {
  router.go('/zh/faq');
};
</script>
<template>
  <div class="support-services">
    <div class="item" @click="goFaq" v-analytics.bubble="{ target: $t('tools.FAQs') }">
      <OIcon><IconPage /></OIcon>
      <div>
        <p class="title">{{ $t('tools.FAQs') }}</p>
        <p class="desc">{{ $t('tools.FAQ_DESC') }}</p>
      </div>
    </div>
    <a class="item" :href="FORUM_LINK" target="_blank" rel="noopener noreferrer" v-analytics.bubble="{ target: $t('tools.COMMUNITY_FORUM') }">
      <OIcon><IconChat /></OIcon>
      <div>
        <p class="title">{{ $t('tools.COMMUNITY_FORUM') }}</p>
        <p class="desc">{{ $t('tools.COMMUNITY_FORUM_DESC') }}</p>
      </div>
    </a>
  </div>
</template>
<style lang="scss" scoped>
.support-services {
  display: grid;
  column-gap: 32px;
  row-gap: 32px;
  width: 100%;
  margin-top: 40px;
  @include respond-to('>pad_v') {
    grid-template-columns: repeat(2, 1fr);
  }

  .item {
    padding: 24px 32px;
    background-color: var(--o-color-fill2);
    display: flex;
    font-size: 40px;
    align-items: start;
    color: var(--o-color-info1);
    border-radius: 4px;
    .o-icon {
      margin-right: 12px;
    }

    @include hover {
      cursor: pointer;
      box-shadow: var(--o-shadow-2);
      .title {
        color: var(--o-color-primary1);
      }
    }

    .title {
      font-weight: 500;
      @include h2;
      margin-bottom: 12px;
    }

    .desc {
      @include text1;
      color: var(--o-color-info2);
    }
  }
}
</style>
