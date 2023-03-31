<script lang="ts" setup>
import { ref, computed, Ref, watch, toRefs } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { showGuard, useStoreData } from '@/shared/login';
import { useI18n } from '@/i18n';
import { ElMessage, ElMessageBox } from 'element-plus';
import useWindowResize from '@/components/hooks/useWindowResize';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy.svg';
import IconTips from '~icons/app/icon-tips.svg';

const props = defineProps({
  tableData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
  versionShownIndex: {
    required: true,
    type: Number,
    default: -1,
  },
  downloadVersionAuthIndex: {
    required: true,
    type: Number,
    default: NaN,
  },
});
const { tableData, versionShownIndex, downloadVersionAuthIndex } =
  toRefs(props);
const { lang, theme } = useData();
const commonStore = useCommon();
const { guardAuthClient } = useStoreData();
const i18n = useI18n();
const shaText = 'SHA256';
// tips
const hoverTips = computed(() => (type: string) => {
  let tips = '';
  switch (type) {
    case 'enterprise':
      tips = i18n.value.download.ENTERPRISE;
      break;
    case 'simple':
      tips = i18n.value.download.SIMPLE;
      break;
    case 'lite':
      tips = i18n.value.download.LITE;
      break;
    case 'distributed':
      tips = i18n.value.download.DISTRIBUTED;
      break;
  }
  return tips;
});
// 复制
const inputDom: Ref<HTMLElement | null> = ref(null);
async function handleUrlCopy(value: string | undefined) {
  if (!value) return;
  if (inputDom.value) {
    (inputDom.value as HTMLInputElement).value = value;
    (inputDom.value as HTMLInputElement).select();
    document.execCommand('copy');
  }
  ElMessage({
    message: i18n.value.download.COPY_SUCCESS,
    type: 'success',
  });
}
// 选择系统与架构
const selectVersion = ref(props.tableData.content[0].system);
const renderData: any = computed(() => {
  let tempObj = {};
  props.tableData.content.forEach((item: any) => {
    if (item.system === selectVersion.value) {
      tempObj = item;
    }
  });
  return tempObj;
});
watch(
  () => props.tableData.content[0],
  () => {
    selectVersion.value = props.tableData.content[0].system;
  }
);
// 下载权限
const changeDownloadAuth = () => {
  ElMessageBox.confirm(
    i18n.value.download.DONNLOAD_TEXT,
    i18n.value.download.DONNLOAD_TIPS,
    {
      confirmButtonText: i18n.value.download.DONNLOAD_COMFIRM,
      cancelButtonText: i18n.value.download.DONNLOAD_CANCEL,
      type: 'warning',
    }
  )
    .then(() => {
      showGuard();
    })
    .catch((error: any) => {
      throw new Error(error);
    });
};
// 移动端提示
const screenWidth = useWindowResize();
const showIndex = ref(-1);
function setShowIndex(index: number) {
  showIndex.value = index;
}
</script>
<template>
  <div class="content-item">
    <h3>{{ tableData.name }}</h3>
    <div class="select-box">
      <span class="label">{{ i18n.download.SYSTEM }}</span>
      <ClientOnly>
        <OSelect v-model="selectVersion" class="select-version">
          <OOption
            v-for="itemData in tableData.content"
            :key="itemData.system"
            :label="itemData.system"
            :value="itemData.system"
          />
        </OSelect>
      </ClientOnly>
    </div>
    <!-- pc  -->
    <OTable
      v-if="screenWidth > 1100"
      :data="renderData.content"
      class="download-pc"
      style="width: 100%"
    >
      <el-table-column width="300" :label="tableData.thead[0]" prop="name">
        <template #default="scope">
          <div class="name-info">
            {{ scope.row.name }}
            <template v-if="scope.row.table === 'server'">
              <el-tooltip :effect="commonStore.theme" placement="right-start">
                <template #content>
                  <p class="server-name">
                    {{ hoverTips(scope.row.edition) }}
                  </p>
                </template>
                <IconTips class="server-tips" />
              </el-tooltip>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="tableData.thead[1]" prop="size">
        <template #default="scope">
          {{ scope.row.size }}
        </template>
      </el-table-column>
      <el-table-column :label="tableData.thead[2]" prop="down_url">
        <template #default="scope">
          <div v-if="scope.row.down_url !== ''" class="down-action">
            <!-- <template
              v-if="
                versionShownIndex === downloadVersionAuthIndex &&
                !guardAuthClient.username
              "
            >
              <OButton
                size="mini"
                animation
                type="primary"
                @click="changeDownloadAuth"
              >
                {{ i18n.download.BTN_TEXT }}
                <template #suffixIcon>
                  <IconDownload />
                </template>
              </OButton>
            </template> -->
            <template v-if="false">
              <OButton
                size="mini"
                animation
                type="primary"
                @click="changeDownloadAuth"
              >
                {{ i18n.download.BTN_TEXT }}
                <template #suffixIcon>
                  <IconDownload />
                </template>
              </OButton>
            </template>
            <template v-else>
              <a :href="scope.row.down_url">
                <OButton size="mini" type="primary" animation>
                  {{ i18n.download.BTN_TEXT }}
                  <template #suffixIcon>
                    <IconDownload />
                  </template>
                </OButton>
              </a>
            </template>
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="tableData.thead[3]" prop="sha_code">
        <template #default="scope">
          <div v-if="scope.row.x86_url !== ''" class="down-action">
            <OButton
              class="down-copy"
              size="mini"
              type="text"
              animation
              @click="handleUrlCopy(scope.row.sha_code)"
            >
              {{ shaText }}
              <template #suffixIcon>
                <IconCopy />
              </template>
            </OButton>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="renderData.docs ? tableData.thead[4] : ''"
        prop="docsName"
      >
        <template #default="scope">
          <a
            v-if="scope.row.docsName !== ''"
            :href="
              scope.row.docs_url.includes('https')
                ? scope.row.docs_url
                : theme.docsUrl + '/' + lang + scope.row.docs_url
            "
            target="_blank"
            >{{ scope.row.docsName }}</a
          >
        </template>
      </el-table-column>
    </OTable>
    <!-- mobild -->
    <ul v-else class="download-mobile">
      <li
        v-for="(item, index) in renderData.content"
        :key="item.name"
        class="download-item"
      >
        <p class="item-text">
          <span>{{ tableData.thead[0] + ':' }}</span
          ><span class="tips-box"
            >{{ item.name }}
            <template v-if="item.table === 'server'">
              <p v-show="showIndex === index" class="server-name">
                {{ hoverTips(item.edition) }}
              </p>
              <IconTips class="server-tips" @click="setShowIndex(index)" />
              <div
                v-show="showIndex !== -1"
                class="mask-mobile"
                @click="setShowIndex(-1)"
              ></div> </template
          ></span>
        </p>
        <p class="item-text">
          <span>{{ tableData.thead[1] + ':' }}</span
          ><span class="text-size">{{ item.size }}</span>
        </p>
        <p class="item-text">
          <span>{{ tableData.thead[2] + ':' }}</span>
          <!-- <a
            v-if="
              versionShownIndex === downloadVersionAuthIndex &&
              !guardAuthClient.username
            "
            @click="changeDownloadAuth"
          >
            {{ i18n.download.BTN_TEXT_MO }}</a
          > -->
          <a v-if="false" @click="changeDownloadAuth">
            {{ i18n.download.BTN_TEXT_MO }}</a
          >
          <a v-else :href="item.down_url">
            {{ i18n.download.BTN_TEXT_MO }}
          </a>
        </p>
        <p class="item-text">
          <span>{{ tableData.thead[3] + ':' }}</span>
          <OButton
            class="down-copy"
            size="mini"
            type="text"
            animation
            @click="handleUrlCopy(item.sha_code)"
          >
            {{ shaText }}
            <template #suffixIcon>
              <IconCopy />
            </template>
          </OButton>
        </p>
        <p v-if="tableData.thead[4]" class="item-text">
          <span>{{ tableData.thead[4] + ':' }}</span
          ><a
            :href="
              item.docs_url.includes('https')
                ? item.docs_url
                : theme.docsUrl + '/' + lang + item.docs_url
            "
            target="_blank"
            >{{ item.docsName }}</a
          >
        </p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.content-item {
  margin-top: var(--o-spacing-h2);
  @media (max-width: 1100px) {
    margin-top: var(--o-spacing-h4);
  }
  h3 {
    text-align: center;
    font-size: var(--o-font-size-h5);
    line-height: var(--o-line-height-h5);
    color: var(--o-color-text1);
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
    }
  }
  .select-box {
    margin-top: var(--o-spacing-h4);
    text-align: center;
    font-size: var(--o-font-size-h8);
    line-height: var(--o-line-height-h8);
    :deep(.el-input__wrapper) {
      min-width: 252px;
      padding: 0 16px;
    }
    :deep(.el-input__prefix) {
      display: none;
    }
    @media (max-width: 1100px) {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
    .label {
      margin-right: var(--o-spacing-h5);
      color: var(--o-color-text3);
      display: inline-block;
      @media (max-width: 1100px) {
        padding-bottom: var(--o-spacing-h8);
      }
    }
    .select-version {
      color: var(--o-color-text1);
      @media (max-width: 1100px) {
        display: block;
      }
    }
  }
  .download-pc {
    margin-top: var(--o-spacing-h4);
    .name-info {
      display: flex;
      align-items: center;
      gap: var(--o-spacing-h8);
      color: var(--o-color-text1);
      .server-tips {
        width: var(--o-font-size-h6);
        height: var(--o-font-size-h6);
        color: var(--o-color-text4);
      }
    }
    .down-copy {
      font-size: var(--o-font-size-text);
      padding-left: 0;
      color: var(--o-color-brand1);
    }
    :deep(.cell) {
      a {
        word-break: normal;
      }
    }
  }
  .download-mobile {
    margin-top: var(--o-spacing-h5);
    .download-item {
      padding: var(--o-spacing-h5);
      &:nth-of-type(2n + 1) {
        background-color: var(--o-color-bg4);
      }
      .item-text {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-font-height-tip);
        color: var(--o-color-text1);
        display: flex;
        & ~ .item-text {
          margin-top: var(--o-spacing-h8);
        }
        span {
          display: inline-block;
          &:nth-of-type(1) {
            width: 72px;
          }
        }
        .text-size {
          color: var(--o-color-text4);
        }
        .down-copy {
          color: var(--o-color-brand1);
          padding: 0;
          line-height: 0;
        }
        .tips-box {
          display: flex;
          align-items: center;
          position: relative;
          .server-name {
            position: absolute;
            left: 0;
            top: -46px;
            background-color: var(--o-color-bg2);
            padding: var(--o-spacing-h9);
          }
          .server-tips {
            width: var(--o-font-size-tip);
            height: var(--o-font-size-tip);
            color: var(--o-color-text4);
            margin-left: var(--o-spacing-h9);
          }
          .mask-mobile {
            position: fixed;
            left: 0;
            top: 0;
            width: 100vw;
            height: 100vh;
            z-index: 99;
          }
        }
      }
    }
  }
}
</style>
