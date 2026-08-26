<script setup lang="ts">
import { OIcon, OIconArrowLeft, OLink } from '@opensig/opendesign';
import { useLocale } from '~@/composables/useLocale';

const { locale } = useLocale();
</script>

<template>
  <OLink :href="`/${locale}/events/list/`" :hover-underline="false">
    <template #icon>
      <OIcon style="font-size: 24px"><OIconArrowLeft /></OIcon>
    </template>
    活动列表
  </OLink>
</template>

<style lang="scss" scoped>
.o-link {
  --link-color: var(--o-color-info1);
}
</style>
