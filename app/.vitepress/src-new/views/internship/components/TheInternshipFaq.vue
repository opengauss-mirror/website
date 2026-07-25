<script setup lang="ts">
import { useI18n } from '~@/i18n';
import { computed } from 'vue';

const i18n = useI18n();

const faqList = computed(() => [
  { q: i18n.value.internship.faqQ1, a: i18n.value.internship.faqA1 },
  { q: i18n.value.internship.faqQ2, a: i18n.value.internship.faqA2 },
  { q: i18n.value.internship.faqQ3, a: i18n.value.internship.faqA3 },
]);
</script>

<template>
  <div class="internship-faq-container">
    <div v-for="item in faqList" :key="item.q" class="faq-item">
      <p class="faq-question">{{ item.q }}</p>
      <p class="faq-answer">{{ item.a }}</p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.internship-faq-container {
  background-color: var(--o-color-fill2);
  border-radius: 4px;
  padding: 32px;
  @include respond-to('laptop') {
    padding: 24px;
  }
  @include respond-to('pad_h') {
    padding: 16px;
  }
  @include respond-to('pad_v') {
    padding: 12px;
  }
  @include respond-to('phone') {
    flex-direction: column;
    padding: 12px;
  }
}

.faq-item {
  padding: 16px 0;
  border-bottom: 1px solid var(--o-color-control4);
  @include text1;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    border-bottom: none;
    padding-bottom: 0;
  }

  @include respond-to('phone') {
    font-size: 14px;
    line-height: 22px;
  }
}

.faq-question {
  font-weight: 600;
  margin-bottom: 12px;

  @include respond-to('<=laptop') {
    margin-bottom: 8px;
  }
}

.faq-answer {
  color: var(--o-color-info3);
}

.faq-answer-tip {
  color: var(--o-color-control3);
}
</style>
