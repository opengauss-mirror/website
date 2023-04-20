<script lang="ts" setup>
import { ref, computed, Ref, watch, toRefs, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useCommon } from '@/stores/common';
import { showGuard, useStoreData } from '@/shared/login';
import { useI18n } from '@/i18n';
import { ElMessage, ElMessageBox } from 'element-plus';
import useWindowResize from '@/components/hooks/useWindowResize';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy.svg';
import IconTips from '~icons/app/icon-tips.svg';

import TagFilter from '@/components/TagFilter.vue';

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
onMounted(() => {
  inputDom.value = document.getElementById('useCopy');
});
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

// tag筛选
const architectureList = computed(() => {
  const temp: any = [];
  props.tableData.content.forEach((item: any) => {
    if (!temp.includes(item.architecture)) {
      temp.push(item.architecture);
    }
  });
  return temp;
});
const osList = computed(() => {
  const temp: any = [];
  props.tableData.content.forEach((item: any) => {
    if (!temp.includes(item.os)) {
      temp.push(item.os);
    }
  });
  return temp;
});

const activeArchitecture = ref('');
const activeOs = ref('');
const initActiveTag = function () {
  activeArchitecture.value = props.tableData.content[0].architecture;
  activeOs.value = props.tableData.content[0].os;
};
const onArchitectureTagClick = (i: number, select: string) => {
  activeArchitecture.value = select;
};
const onOSTagClick = (i: number, select: string) => {
  activeOs.value = select;
};
const renderData: any = ref({});
function setRenderData() {
  props.tableData.content.forEach((item: any) => {
    if (
      item.architecture === activeArchitecture.value &&
      item.os === activeOs.value
    ) {
      renderData.value = item;
    }
  });
}
onMounted(() => {
  initActiveTag();
  watch(
    () => props.tableData.content,
    () => {
      initActiveTag();
      setTempTag();
      setRenderData();
    }
  ),
    {
      immediate: true,
    };
});
// 控制不能组合的tag的禁用
const tempTag = ref('');
function setTempTag() {
  let flag = true;
  props.tableData.content.forEach((item: any) => {
    if (item.architecture === activeArchitecture.value) {
      if (flag) {
        tempTag.value = item.os;
        flag = false;
      }
    }
  });
}
function isDisable(tag: string) {
  let flag = false;
  props.tableData.content.forEach((item: any) => {
    if (item.architecture === activeArchitecture.value && item.os === tag) {
      flag = true;
    }
  });
  if (!flag) {
    if (activeOs.value === tag) {
      activeOs.value = tempTag.value;
    }
  }
  return !flag;
}
watch(
  activeArchitecture,
  () => {
    setTempTag();
    setRenderData();
  },
  {
    immediate: true,
  }
);
watch(
  activeOs,
  () => {
    setRenderData();
  },
  {
    immediate: true,
  }
);
</script>
<template>
  <div class="content-item">
    <h3>{{ tableData.name }}</h3>
    <div class="filter-card">
      <TagFilter
        class="architecture-box"
        :label="i18n.download.ARCHITECTURE"
        :show="false"
      >
        <OTag
          v-for="(item, index) in architectureList"
          :key="'tag' + index"
          checkable
          :type="activeArchitecture === item ? 'primary' : 'text'"
          @click="onArchitectureTagClick(index, item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
      <TagFilter class="os-box" :label="i18n.download.OS" :show="false">
        <OTag
          v-for="(item, index) in osList"
          :key="item + index"
          checkable
          :type="activeOs === item ? 'primary' : 'text'"
          :class="{ disable: isDisable(item) }"
          @click="isDisable(item) ? '' : onOSTagClick(index, item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
    </div>

    <!-- pc  -->
    <div v-if="screenWidth > 1100" class="download-pc">
      <OTable :data="renderData.content" style="width: 100%">
        <el-table-column
          width="320"
          :label="i18n.download.TABLE_HEAD[0]"
          prop="name"
        >
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
        <el-table-column :label="i18n.download.TABLE_HEAD[1]" prop="size">
          <template #default="scope">
            {{ scope.row.size }}
          </template>
        </el-table-column>
        <el-table-column :label="i18n.download.TABLE_HEAD[2]" prop="down_url">
          <template #default="scope">
            <div v-if="scope.row.down_url !== ''" class="down-action">
              <template
                v-if="
                  versionShownIndex === downloadVersionAuthIndex &&
                  !guardAuthClient.username
                "
              >
                <OButton
                  size="mini"
                  type="primary"
                  animation
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
        <el-table-column :label="i18n.download.TABLE_HEAD[3]" prop="sha_code">
          <template #default="scope">
            <div v-if="scope.row.x86_url !== ''" class="down-action">
              <OButton
                class="down-copy"
                size="mini"
                type="text"
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
          :label="renderData.docs ? i18n.download.TABLE_HEAD[4] : ''"
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
    </div>
    <!-- mobild -->
    <ul v-else class="download-mobile">
      <li
        v-for="(item, index) in renderData.content"
        :key="item.name"
        class="download-item"
      >
        <p class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[0] + ':' }}</span
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
          <span>{{ i18n.download.TABLE_HEAD[1] + ':' }}</span
          ><span class="text-size">{{ item.size }}</span>
        </p>
        <p class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[2] + ':' }}</span>
          <a
            v-if="
              versionShownIndex === downloadVersionAuthIndex &&
              !guardAuthClient.username
            "
            @click="changeDownloadAuth"
          >
            {{ i18n.download.BTN_TEXT_MO }}</a
          >
          <a v-else :href="item.down_url">
            {{ i18n.download.BTN_TEXT_MO }}
          </a>
        </p>
        <p class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[3] + ':' }}</span>
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
        <p v-if="item.docsName" class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[4] + ':' }}</span
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
  <div class="input-box">
    <!-- 用于复制RSNC的值 -->
    <input id="useCopy" type="text" />
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
  .filter-card {
    margin-top: var(--o-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
    }
    :deep(.tag-filter) {
      padding: 0 var(--o-spacing-h2);
      display: flex;
      justify-content: start;
      @media (max-width: 1100px) {
        padding: 0;
      }
      &.architecture-box {
        @media (max-width: 1100px) {
          padding-left: 0;
        }
      }
      &.os-box {
        margin-top: var(--o-spacing-h5);
        @media (max-width: 1100px) {
          margin-top: 8px;
        }
        .disable {
          color: var(--o-color-text5);
          cursor: not-allowed;
        }
      }
      .label {
        white-space: nowrap;
        color: var(--o-color-text1);
        @media (max-width: 1100px) {
          font-size: var(--o-font-size-tip);
          min-width: 60px;
        }
      }
      .tag-filter-box {
        .o-tag {
          @media (max-width: 1100px) {
            font-size: var(--o-font-size-tip);
            line-height: var(--o-line-height-tip);
            padding: 3px 8px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }

  .download-pc {
    margin-top: var(--o-spacing-h3);
    @media (max-width: 1100px) {
      margin-top: var(--o-spacing-h5);
    }
    :deep(.el-table) {
      box-shadow: none !important;
      .el-table__inner-wrapper::before {
        display: none;
      }
      .cell {
        padding-left: var(--o-spacing-h2);
        a {
          word-break: normal;
          &:hover {
            color: var(--o-color-brand2);
          }
        }
      }
      table {
        position: relative;
        .el-table__row {
          &:hover {
            > td.el-table__cell {
              background-color: transparent;
            }
          }
        }
      }
      .el-table__body-wrapper {
        border-bottom: 1px solid var(--o-color-border2);
      }
    }
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
      &:hover {
        color: var(--o-color-brand2);
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
.input-box #useCopy {
  position: absolute;
  opacity: 0;
}
</style>
