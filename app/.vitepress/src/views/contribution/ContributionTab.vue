<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vitepress';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';

import banner from '@/assets/category/contribution/banner.png';
import bannerDark from '@/assets/category/contribution/banner-dark.png';

import { useI18n } from '@/i18n';
import BannerTabSticky from '~@/components/BannerTabSticky.vue';

const i18n = useI18n();
const { lang } = useData();
const router = useRouter();
const activeName = ref('');

const themeStore = useCommon();

const tabsData = computed(() => [
  {
    value: 'first',
    label: i18n.value.contribution.LOOK_MAP,
  },
  {
    value: 'second',
    label: i18n.value.contribution.LOOK_DESC,
  },
]);

const initTab = () => {
  if (router.route.path.includes('detail')) {
    activeName.value = 'second';
  } else {
    activeName.value = 'first';
  }
};

onMounted(() => {
  initTab();
});

const handleClick = (tab: string | number) => {
  if (tab === 'first') {
    router.go(`/${lang.value}/contribution/`);
  } else {
    router.go(`/${lang.value}/contribution/detail`);
  }
};
</script>

<template>
  <BannerTabSticky
    v-model="activeName"
    title="贡献攻略"
    :tabs-data="tabsData"
    :hide-description="true"
    :background-image="themeStore.isDark ? bannerDark : banner"
    @change="handleClick"
  ></BannerTabSticky>
</template>
