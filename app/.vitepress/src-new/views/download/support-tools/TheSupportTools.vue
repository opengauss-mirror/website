<script setup lang="ts">
import { ODialog, OIcon, OIconChevronRight, OLink, OOption, ORadio, ORadioGroup, OScroller, OSelect, OTag, OToggle } from '@opensig/opendesign';
import supportToolsContent from '#content/tools';
import { useLocale } from '~@/composables/useLocale';
import { computed } from 'vue';
import { ref } from 'vue';
import { useCommon } from '@/stores/common';
import { useScreen } from '~@/composables/useScreen';

const { gtPadV } = useScreen();
const { isZh, t } = useLocale();

const supporttoolsInfo = computed(() => isZh.value ? supportToolsContent.zh : supportToolsContent.en);

// 通过工具分类ID来查找工具分类名称的map，用来在页面上显示人类可读的工具名称
const typeIdNameMap = computed(() => {
  return [...supporttoolsInfo.value].reduce((map, item) => {
    return map.set(item.id, item.name);
  }, new Map<string, string>());
});

// 所有工具的类型(id和名称)
const toolTypes = computed(() => {
  return [{ label: t('common.COMMON_CONFIG.ALL'), value: 'all' }].concat(...supporttoolsInfo.value.map((item) => ({ label: item.name, value: item.id })));
});

// 当前选择的工具类型
const selectedType = ref(toolTypes.value[0].value);

// 筛选后的工具列表
const filteredTools = computed(() => {
  if (selectedType.value === 'all') {
    // 筛选全部工具类型，直接吧所有工具分类下的children取出来打平成一个array
    return supporttoolsInfo.value.flatMap((item) => item.children);
  }
  // 只返回选定工具类型下的children
  const selectedCategory = supporttoolsInfo.value.find((item) => item.id === selectedType.value);
  return selectedCategory ? selectedCategory.children : [];
});

const commonStore = useCommon();
const isDark = computed(() => commonStore.theme === 'dark');

const showDialog = ref(false);
const selectedItem = ref();
const onClickTool = (item: any) => {
  selectedItem.value = item;
  showDialog.value = true;
};
</script>

<template>
  <section>
    <h2>{{ $t('common.COMMON_CONFIG.SUPPORTTOOLS') }}</h2>
    <div class="tools-type">
      <p class="label">{{ $t('tools.TOOL_TYPE') }}</p>
      <OScroller v-if="gtPadV" show-type="hover" disabled-y>
        <ORadioGroup v-model="selectedType" style="--radio-group-gap: 8px">
          <ORadio
            v-for="item in toolTypes"
            :key="item.value"
            :value="item.value"
            v-analytics="{
              properties: {
                module: 'download',
                level1: t('tools.TOOL_CENTER'),
                level2: t('common.COMMON_CONFIG.SUPPORTTOOLS'),
                level3: $t('tools.TOOL_TYPE'),
                target: item.label,
              },
            }"
          >
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ item.label }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </OScroller>
      <OSelect v-else v-model="selectedType">
        <OOption v-for="item in toolTypes" :key="item.value" :value="item.value" :label="item.label"></OOption>
      </OSelect>
    </div>
    <div v-if="gtPadV" :class="{ container: true, dark: isDark }">
      <div
        class="item"
        v-for="item in filteredTools"
        :key="item.name"
        v-analytics.catchBubble="{
          properties: {
            module: 'download',
            level1: t('tools.TOOL_CENTER'),
            level2: t('common.COMMON_CONFIG.SUPPORTTOOLS'),
          },
        }"
      >
        <h3>{{ item.name }}</h3>
        <OTag variant="outline">{{ typeIdNameMap.get(item.iden) }}</OTag>
        <p class="desc">{{ item.desc }}</p>
        <div class="links">
          <OLink
            :href="item.address"
            target="_blank"
            color="primary"
            v-analytics.bubble.addUrl="(ev: any) => ({
              to: ev.currentTarget.href,
              level3: item.name,
              target: $t('tools.SOURCE_CODE_ADDR'),
            })"
            >{{ $t('tools.SOURCE_CODE_ADDR') }}</OLink
          >
          <OLink
            :href="item.guide"
            target="_blank"
            color="primary"
            v-analytics.bubble.addUrl="(ev: any) => ({
              to: ev.currentTarget.href,
              level3: item.name,
              target: $t('tools.OPERATION_GUIDE'),
            })"
            >{{ $t('tools.OPERATION_GUIDE') }}</OLink
          >
        </div>
      </div>
    </div>
    <template v-else>
      <div class="mobile-tool-item" @click="onClickTool(item)" v-for="item in filteredTools" :key="item.name">
        <p>{{ item.name }}</p>
        <OIcon><OIconChevronRight /></OIcon>
      </div>
    </template>
    <ODialog v-model:visible="showDialog" size="medium" style="--dlg-radius: 4px">
      <div class="support-tools-dlg-content">
        <p class="item-name">{{ selectedItem.name }}</p>
        <OTag variant="outline">{{ typeIdNameMap.get(selectedItem.iden) }}</OTag>
        <p class="desc">{{ selectedItem.desc }}</p>
        <div class="links">
          <OLink :href="selectedItem.address" target="_blank" color="primary">{{ $t('tools.SOURCE_CODE_ADDR') }}</OLink>
          <OLink :href="selectedItem.guide" target="_blank" color="primary">{{ $t('tools.OPERATION_GUIDE') }}</OLink>
        </div>
      </div>
    </ODialog>
  </section>
</template>
<style lang="scss">
h2 {
  font-weight: 600;
}
.o-toggle:not(.o-toggle-disabled):not(.o-toggle-checked) {
  --toggle-size: 32px;
  --toggle-padding: 3px 15px;
  --toggle-radius: 4px;
  max-height: 32px;
  color: var(--o-color-info1);
  --toggle-bg-color: var(--o-color-fill1);
  --toggle-bg-color-hover: var(--o-color-control2-light);
  @include text1;

  &.active {
    background-color: transparent;
    border: 1px solid var(--o-color-primary1);
  }
}

.support-tools-dlg-content {
  width: 100vh;
  .item-name {
    @include h2;
    margin-bottom: 8px;
  }
  .o-tag-label {
    @include text2;
  }
  .desc {
    @include text2;
    color: var(--o-color-info3);
    margin-top: 12px;
    margin-bottom: 21px;
  }
  .links {
    display: flex;
    flex-direction: column;
  }
  .o-link {
    @include h3;
    &:last-child {
      margin-top: 26px;
    }
  }
}
</style>
<style lang="scss" scoped>
section {
  margin-top: 72px;

  @include respond-to('<=pad_v') {
    margin-top: 32px;
  }
}

.o-scroller {
  --scroller-padding: 28px 0;
  width: 0;
  flex-grow: 1;
}

.mobile-tool-item {
  align-self: stretch;
  border-radius: 4px;
  padding: 13px;
  background-color: var(--o-color-fill2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 12px;
  @include text2;

  .o-icon {
    font-size: 32px;
  }
}

.tools-type {
  display: flex;
  align-items: center;
  background: var(--o-color-fill2);
  margin-top: 40px;
  padding: 0 32px;
  border-radius: 4px;
  width: 100%;
  max-width: 100%;

  @include respond-to('<=pad_v') {
    display: block;
    padding: 16px 12px;
    margin-top: 16px;
  }

  .label {
    margin-right: 40px;
    white-space: nowrap;
    @include respond-to('<=pad_v') {
      margin-bottom: 8px;
    }
  }
}

.o-radio-group {
  width: fit-content;
  flex-wrap: nowrap;
}

.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 32px;
  row-gap: 32px;
  margin-top: 32px;
  width: 100%;

  --item-bg-1: url('~@/assets/category/download/supporttools/tool-bg1_light.png');
  --item-bg-2: url('~@/assets/category/download/supporttools/tool-bg2_light.png');
  --item-bg-3: url('~@/assets/category/download/supporttools/tool-bg3_light.png');
  --item-bg-4: url('~@/assets/category/download/supporttools/tool-bg4_light.png');

  &.dark {
    --item-bg-1: url('~@/assets/category/download/supporttools/tool-bg1_dark.png');
    --item-bg-2: url('~@/assets/category/download/supporttools/tool-bg2_dark.png');
    --item-bg-3: url('~@/assets/category/download/supporttools/tool-bg3_dark.png');
    --item-bg-4: url('~@/assets/category/download/supporttools/tool-bg4_dark.png');
  }

  .item {
    padding: 24px 32px;
    background-color: var(--o-color-fill2);
    background-size: cover;
    height: 216px;
    position: relative;
    border-radius: 4px;

    &:nth-child(4n + 1) {
      background-image: var(--item-bg-1);
    }
    &:nth-child(4n + 2) {
      background-image: var(--item-bg-2);
    }
    &:nth-child(4n + 3) {
      background-image: var(--item-bg-3);
    }
    &:nth-child(4n + 4) {
      background-image: var(--item-bg-4);
    }

    transition: box-shadow 0.2s ease-in-out;

    @include hover {
      box-shadow: var(--o-shadow-2);
    }

    h3 {
      font-weight: 500;
      @include h3;
    }

    .o-tag {
      --o-tag-font-color_active: inherit;
      &:active {
        border: 1px solid var(--tag-bd-color);
      }
      margin-top: 8px;
      @include tip2;
    }

    .desc {
      margin-top: 24px;
      @include tip1;
    }

    .links {
      margin-top: 38px;
      display: flex;
      position: absolute;
      bottom: 24px;
      left: 32px;

      .o-link {
        @include tip1;
        &:first-child {
          margin-right: 32px;
        }
      }
    }
  }
}
</style>
