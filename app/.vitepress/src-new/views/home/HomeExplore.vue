<script setup lang="ts">
import { OIcon, OIconChevronRight, OLink } from '@opensig/opendesign';
import { DOCS_LINK } from '@/data/url-config';
import { useData } from 'vitepress';
import AppSection from '~@/components/AppSection.vue';

const { lang } = useData();

const handleGo = (path: string) => {
  const link = `${DOCS_LINK}/${lang.value}${path}`;
  return path.startsWith('/docs/') ? link : path;
};
</script>

<template>
  <AppSection :title="$t('home.HOME_EXPLORE.EXPLORE_TITLE')">
    <div class="home-explore-content">
      <div class="home-explore-content-left">
        <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[0].NAME') }}</p>
        <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[0].DESC') }}</p>
        <OLink class="more" :href="handleGo($t('home.HOME_EXPLORE.LIST[0].PATH'))"><template #suffix><OIcon style="font-size: 24px;"><OIconChevronRight /></OIcon></template> 查看更多</OLink>
      </div>
      <div class="home-explore-content-right">
        <div class="home-explore-right-item">
          <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[1].NAME') }}</p>
          <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[1].DESC') }}</p>
          <OLink class="more" :href="handleGo($t('home.HOME_EXPLORE.LIST[1].PATH'))"><template #suffix><OIcon style="font-size: 24px;"><OIconChevronRight /></OIcon></template> 查看更多</OLink>
        </div>
        <div class="home-explore-right-item">
          <p class="home-explore-item-title">{{ $t('home.HOME_EXPLORE.LIST[2].NAME') }}</p>
          <p class="home-explore-item-desc">{{ $t('home.HOME_EXPLORE.LIST[2].DESC') }}</p>
          <OLink class="more" :href="handleGo($t('home.HOME_EXPLORE.LIST[2].PATH'))"><template #suffix><OIcon style="font-size: 24px;"><OIconChevronRight /></OIcon></template> 查看更多</OLink>
        </div>
      </div>
    </div>
  </AppSection>
</template>

<style lang="scss" scoped>
.home-explore-content {
  display: flex;
}

.more {
  display: inline-flex;
  align-items: center;
  margin-top: 24px;
}

.home-explore-item-title {
  @include h3;
  font-weight: bold;
}
.home-explore-item-desc {
  margin-top: 8px;
  @include text1;
  color: var(--o-color-control3);
}

.home-explore-content-left {
  background-image: url('~@/assets/category/home/intro.png');
  transition: box-shadow 0.2s ease-in-out;
  @include hover {
    box-shadow: var(--o-shadow-2);
  }
  margin-right: 32px;
  border-radius: 4px;
  background-color: #fff;
  width: 576px;
  height: 396px;
  border-radius: 4px;
  padding: 238px 32px 0 32px;
}

.home-explore-content-right {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.home-explore-right-item {
  &:nth-child(1) {
    background-image: url('~@/assets/category/home/deploy.png');
  }
  &:nth-child(2) {
    background-image: url('~@/assets/category/home/contribute.png');
  }
  transition: box-shadow 0.2s ease-in-out;
  @include hover {
    box-shadow: var(--o-shadow-2);
  }
  &:not(:last-child) {
    margin-bottom: 32px;
  }
  flex: 1;
  border-radius: 4px;
  background-color: #fff;
  padding-top: 24px;
  padding-left: 32px;
  padding-right: 32px;
}
</style>