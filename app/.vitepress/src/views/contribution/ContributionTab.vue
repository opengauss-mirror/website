<script lang="ts" setup>
// TODO:建议，建议js、html、css之间有换行，js中不同逻辑块也使用换行区分
import { ref } from 'vue';
import { useRouter } from 'vitepress';
import { useData } from 'vitepress';

import { useI18n } from '@/i18n';
import type { TabsPaneContext } from 'element-plus';

const i18n = useI18n();
const { lang } = useData();
const router = useRouter();
const activeName = ref('');
// TODO:一般，规范注释
// init:
if (router.route.path.includes('detail')) {
  activeName.value = 'second';
} else {
  activeName.value = 'first';
}
const handleClick = (tab: TabsPaneContext) => {
  if (tab.props.name === activeName.value) return;
  if (tab.props.name === 'first') {
    router.go(`/${lang.value}/contribution/`);
  } else {
    router.go(`/${lang.value}/contribution/detail`);
  }
};
</script>
<template>
  <!-- TODO:建议，建议最外层class命名使用业务相关词汇 -->
  <div class="tab-wrapper">
    <OTabs v-model="activeName" @tab-click="handleClick">
      <OTabPane :label="i18n.contribution.LOOK_MAP" name="first"></OTabPane>
      <OTabPane :label="i18n.contribution.LOOK_DESC" name="second"></OTabPane>
    </OTabs>
  </div>
</template>

<style lang="scss" scoped>
.tab-wrapper {
  background-color: var(--o-color-bg2);
  display: flex;
  justify-content: center;
  :deep(.el-tabs__header) {
    margin-bottom: 0;
  }
}
</style>
