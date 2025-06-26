<script setup lang="ts">
import IconPage from '~icons/app/icon-page.svg';
import IconChat from '~icons/app/icon-chat.svg';
import { OIcon } from '@opensig/opendesign';
import { useRouter } from 'vitepress';

const router = useRouter();

const goFaq = () => {
  router.go('/zh/faq');
}
</script>
<template>
  <div class="support-services">
    <div class="item" @click="goFaq">
      <OIcon><IconPage /></OIcon>
      <div>
        <p class="title">常见FAQ</p>
        <p class="desc">在使用时遇到问题？请浏览常见FAQ快速找到常见问题的答案</p>
      </div>
    </div>
    <a class="item" href="https://discuss.opengauss.org" target="_blank" rel="noopener noreferrer">
      <OIcon><IconChat /></OIcon>
      <div>
        <p class="title">社区论坛</p>
        <p class="desc">需要更多的支撑？欢迎使用社区论坛进行问题讨论和求助</p>
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
    .o-icon {
      margin-right: 12px;
    }

    @include hover {
      cursor: pointer;
    }

    .title {
      @include h2;
      margin-bottom: 12px;
    }

    .desc {
      @include text1;
      color: var(--o-color-control3)
    }
  }
}
</style>