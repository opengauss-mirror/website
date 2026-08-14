<script setup lang="ts">
import { OPlusConfigProvider, OSigList } from '@opendesign-plus/components';
import { useData } from 'vitepress';
import { computed, onMounted, ref } from 'vue';
import { getSigList, sigSearch } from '~@/api/api-sig';
import AppSection from '~@/components/AppSection.vue';
import TheSigIntro from './TheSigIntro.vue';
import TheSigDesc from './TheSigDesc.vue';
import { windowOpen } from '@/shared/utils';
import { sigInfo } from '~@/data/sig/index';

const { lang } = useData();
const sigDetailInfoData = ref<any[]>([]);
const detailInfoMap = computed(() => {
  const map = new Map();
  if (sigDetailInfoData.value?.length) {
    for (const item of sigDetailInfoData.value) {
      map.set(item.name, item);
    }
  }
  return map;
});

onMounted(async () => {
  sigDetailInfoData.value = (await getSigList())?.data ?? [];
});

const toSigDetail = (sigName: string) => {
  windowOpen(`/${lang.value}/sig/${sigName}`, '_blank');
};

const list = computed(() => {
  const map = detailInfoMap.value;
  return sigInfo[lang.value as 'zh' | 'en'].map((sig) => {
    const landscapeData = map.get(sig.sig_name);
    return {
      ...sig,
      ...(landscapeData?.committer_info && { committer_info: landscapeData.committer_info }),
      ...(landscapeData?.maintainer_info && { maintainer_info: landscapeData.maintainer_info }),
      ...(landscapeData?.repositories && { repositories: landscapeData.repositories }),
      name: sig.sig_name,
      atomgitUrl: `https://gitcode.com/opengauss/tc/tree/master/sigs/${sig.sig_name}`,
      subscribeUrl: sig.mailweb_link,
    };
  });
});
</script>

<template>
  <TheSigIntro />
  <TheSigDesc />
  <OPlusConfigProvider :locale="lang">
    <AppSection title="openGauss SIGs">
      <OSigList :sigList="list" :searchFn="sigSearch" @to-sig-detail="toSigDetail" />
    </AppSection>
  </OPlusConfigProvider>
</template>

<style lang="scss" scoped>
:deep(.o-sig-list .o-sig-card-list) {
  margin-top: var(--o-r-grid-column-gutter);
}

:deep(.o-sig-item-header .o-tag) {
  display: none;
}

:deep(.o-sig-list .o-sig-pagination) {
  --grid-column-gutter:var(--o-r-grid-column-gutter);
}

:deep(.o-pagination) {
  --pagination-radius: 4px
}

:deep(.o-sig-list .o_box-main) {
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
}

:deep(.o-sig-filter-box--no-filter-type) {
  padding: 0;
  background-color: transparent;
}

:deep(.o-sig-filter-box--no-filter-type .o-sig-filter-select-box) {
  justify-content: flex-start !important;
}

:deep(.o-sig-bottom) {
  margin-top: var(--o-r-gap-4);
}

:deep(.o-sig-description) {
  font-size: var(--o-r-font_size-tip1);
  line-height: var(--o-r-line_height-tip1);
  min-height: calc(2 * var(--o-r-line_height-tip1));
}

:deep(.o-sig-popup-repos .o-sig-popup-content) {
  height: auto !important;
}
:deep(.o-sig-popup-maintainers .o-sig-popup-content) {
  height: auto !important;
}
</style>
