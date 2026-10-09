<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';

const { frontmatter, title } = useData();

const heading = computed(() => {
  const value = frontmatter.value?.title ?? title.value ?? '';
  return String(value).replace(/\s*\|\s*openGauss(?:社区官网| Official Website).*$/, '').trim();
});
</script>

<template>
  <h1 v-if="heading" class="visually-hidden">
    <slot>{{ heading }}</slot>
  </h1>
</template>
