<script lang="ts" setup>
import { ref, computed, watch, toRefs, onMounted } from 'vue';
import { useData } from 'vitepress';
import { useCommon, useCookieStore } from '@/stores/common';
import { useI18n } from '@/i18n';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useClipboard } from '@/components/hooks/useClipboard';

import useWindowResize from '@/components/hooks/useWindowResize';
import { DownloadItemT } from '@/shared/@types/type-download';

import { getCustomCookie } from '@/shared/utils';
import { doLogin } from '@/shared/login';
import { useUserInfoStore } from '@/stores/user';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy.svg';
import IconTips from '~icons/app/icon-tips.svg';

import TagFilter from '@/components/TagFilter.vue';

import { DOCS_LINK } from '@/data/url-config';
import { oaReport } from '@/shared/analytics';

const props = defineProps({
  tableData: {
    required: true,
    type: Object,
    default: () => {
      return {};
    },
  },
  downloadVersionAuth: {
    required: true,
    type: Array,
    default: () => {
      return [];
    },
  },
  versionShown: {
    required: true,
    type: String,
    default: '',
  },
});
const { tableData, versionShown, downloadVersionAuth } = toRefs(props);

const { lang } = useData();
const commonStore = useCommon();
const i18n = useI18n();
const shaText = 'SHA256';
const cookieStore = useCookieStore();
// tips
const hoverTips = computed(() => (type: string | undefined) => {
  let tips = '';
  switch (type) {
    case 'simple':
      tips = i18n.value.download.SIMPLE;
      break;
    case 'enterprise':
      tips = i18n.value.download.ENTERPRISE;
      break;
    case 'distributed':
      tips = i18n.value.download.DISTRIBUTED;
      break;
    case 'lite':
      tips = i18n.value.download.LITE;
      break;
    case 'finance':
      tips = i18n.value.download.FINANCE;
      break;
    default:
      tips = '';
      break;
  }
  return tips;
});

// 复制sha值
const isClipboard = ref(true);
const initClipboard = (text: string, e: MouseEvent) => {
  isClipboard.value = false;
  useClipboard({
    text,
    target: e,
    success: () => {
      ElMessage({
        message: i18n.value.common.COPY_SUCCESS,
        type: 'success',
        onClose: () => {
          isClipboard.value = true;
        },
      });
    },
    error: () => {
      ElMessage({
        message: i18n.value.common.COPY_FAILED,
        type: 'error',
        onClose: () => {
          isClipboard.value = true;
        },
      });
    },
  });
};

function handleUrlCopy(value: string | undefined, e: MouseEvent) {
  if (!value) {
    return;
  }

  if (isClipboard.value) {
    initClipboard(value, e);
  }
}

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
  const temp: Array<string> = [];
  props.tableData.content.forEach((item: DownloadItemT) => {
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
const onOSTagClick = (select: string) => {
  activeOs.value = select;
};
const renderData = ref<DownloadItemT>({
  architecture: '',
  content: [],
  os: '',
  system: '',
});
function setRenderData() {
  props.tableData.content.forEach((item: DownloadItemT) => {
    if (item.architecture === activeArchitecture.value && item.os === activeOs.value) {
      renderData.value = item;
    }
  });
}

// 替换空格
const replaceSpace = (v: string) => {
  return v.replace(/ /g, '-');
};

onMounted(() => {
  initActiveTag();
  // 迁移专区跳转锚点显示
  if (window.location.hash) {
    setTimeout(() => {
      const toolId = window.location.hash?.split('#')[1] as string;
      const top = document.getElementById(toolId)?.offsetTop;
      window.scrollTo({
        top,
        behavior: 'smooth',
      });
    }, 300);
  }
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
  props.tableData.content.forEach((item: DownloadItemT) => {
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
  props.tableData.content.forEach((item: DownloadItemT) => {
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
// 下载权限
const userInfoStore = useUserInfoStore();
const changeDownloadAuth = () => {
  ElMessageBox.confirm(i18n.value.download.DONNLOAD_TEXT, i18n.value.download.DONNLOAD_TIPS, {
    confirmButtonText: i18n.value.download.DONNLOAD_COMFIRM,
    cancelButtonText: i18n.value.download.DONNLOAD_CANCEL,
    type: 'warning',
  })
    .then(() => {
      doLogin();
    })
    .catch(() => {
      return '';
    });
};

// 下载埋点  新版本判断
const collectDownloadData = (name: string) => {
  if (cookieStore.isAllAgreed || userInfoStore.username) {
    const { href } = window.location;
    const downloadTime = new Date();
    const _U_T_ = getCustomCookie('_U_T_') || 'notLog';
    oaReport('download', {
      profileType: 'download',
      origin: href,
      softwareName: name,
      softwareArchitecture: activeArchitecture.value,
      softwareOs: activeOs.value,
      downloadTime,
      _U_T_,
    });
  }
};

const getNewLink = (path: string) => {
  const link = `${DOCS_LINK}/${lang.value}${path}`;
  return path.includes('https') ? path : link;
};
</script>
<template>
  <div :id="replaceSpace(tableData.name) + '-' + replaceSpace(versionShown)" class="content-item">
    <h3>{{ tableData.name }}</h3>
    <div class="filter-card">
      <TagFilter class="architecture-box" :label="i18n.download.ARCHITECTURE" :show="false">
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
          @click="isDisable(item) ? '' : onOSTagClick(item)"
        >
          {{ item }}
        </OTag>
      </TagFilter>
    </div>

    <!-- pc  -->
    <div v-if="screenWidth > 1100" class="download-pc">
      <OTable :data="renderData.content" style="width: 100%">
        <el-table-column width="360" :label="i18n.download.TABLE_HEAD[0]" prop="name">
          <template #default="scope">
            <div class="name-info">
              {{ scope.row.name }}
              <template v-if="tableData.name.includes('Server') && scope.row.name.includes('noLSE')">
                <el-tooltip :effect="commonStore.theme" placement="top">
                  <template #content>
                    <p class="lse-content">
                      支持ARMv8.1以下芯片，适配飞腾2000和鲲鹏916平台（LSE即大型系统扩展指令集从ARMv8.1开始引入，ARMv8.1以下芯片不支持该特性）
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
              <template v-if="downloadVersionAuth.includes(versionShown) && !userInfoStore.username">
                <OButton size="mini" type="primary" animation @click="changeDownloadAuth">
                  {{ i18n.download.BTN_TEXT }}
                  <template #suffixIcon>
                    <IconDownload />
                  </template>
                </OButton>
              </template>
              <template v-else>
                <a :href="scope.row.down_url" @click="collectDownloadData(scope.row.name)">
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
              <OButton class="down-copy" size="mini" type="text" @click="handleUrlCopy(scope.row.sha_code, $event)">
                {{ shaText }}
                <template #suffixIcon>
                  <IconCopy />
                </template>
              </OButton>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="renderData.docs ? i18n.download.TABLE_HEAD[4] : ''" prop="docsName">
          <template #default="scope">
            <a v-if="scope.row.docsName !== ''" :href="getNewLink(scope.row.docs_url)" target="_blank" rel="noopener noreferrer">{{ scope.row.docsName }}</a>
          </template>
        </el-table-column>
      </OTable>
    </div>
    <!-- mobild -->
    <ul v-else class="download-mobile">
      <li v-for="(item, index) in renderData.content" :key="item.name" class="download-item">
        <p class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[0] + ':' }}</span
          ><span class="tips-box"
            >{{ item.name }}
            <template v-if="item.table === 'server'">
              <p v-show="showIndex === index" class="server-name">
                {{ hoverTips(item.edition) }}
              </p>
              <IconTips class="server-tips" @click="setShowIndex(index)" />
              <div v-show="showIndex !== -1" class="mask-mobile" @click="setShowIndex(-1)"></div> </template
          ></span>
        </p>
        <p class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[1] + ':' }}</span
          ><span class="text-size">{{ item.size }}</span>
        </p>
        <p class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[2] + ':' }}</span>
          <a v-if="downloadVersionAuth.includes(versionShown) && !userInfoStore.username" @click="changeDownloadAuth"> {{ i18n.download.BTN_TEXT_MO }}</a>
          <a v-else :href="item.down_url" @click="collectDownloadData(item.name)">
            {{ i18n.download.BTN_TEXT_MO }}
          </a>
        </p>
        <p class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[3] + ':' }}</span>
          <OButton class="down-copy" size="mini" type="text" animation @click="handleUrlCopy(item.sha_code, $event)">
            {{ shaText }}
            <template #suffixIcon>
              <IconCopy />
            </template>
          </OButton>
        </p>
        <p v-if="item.docsName" class="item-text">
          <span>{{ i18n.download.TABLE_HEAD[4] + ':' }}</span
          ><a :href="getNewLink(item.docs_url)" target="_blank" rel="noopener noreferrer">{{ item.docsName }}</a>
        </p>
      </li>
    </ul>
  </div>
</template>
<style lang="scss" scoped>
.lse-content {
  max-width: 310px;
  padding: 3px 5px;
}
.content-item {
  margin-top: var(--e-spacing-h2);
  @media (max-width: 1100px) {
    margin-top: var(--e-spacing-h4);
  }
  h3 {
    text-align: center;
    font-size: var(--e-font-size-h5);
    line-height: var(--e-line-height-h5);
    color: var(--e-color-text1);
    @media (max-width: 1100px) {
      font-size: var(--e-font-size-text);
      line-height: var(--e-line-height-text);
    }
  }
  .filter-card {
    margin-top: var(--e-spacing-h2);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
    }
    :deep(.tag-filter) {
      padding: 0 var(--e-spacing-h2);
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
        margin-top: var(--e-spacing-h5);
        @media (max-width: 1100px) {
          margin-top: 8px;
        }
        .disable {
          color: var(--e-color-text5);
          cursor: not-allowed;
        }
      }
      .label {
        white-space: nowrap;
        color: var(--e-color-text1);
        @media (max-width: 1100px) {
          font-size: var(--e-font-size-tip);
          min-width: 60px;
        }
      }
      .tag-filter-box {
        .o-tag {
          @media (max-width: 1100px) {
            font-size: var(--e-font-size-tip);
            line-height: var(--e-line-height-tip);
            padding: 3px 8px;
            margin-bottom: 2px;
          }
        }
      }
    }
  }

  .download-pc {
    margin-top: var(--e-spacing-h3);
    @media (max-width: 1100px) {
      margin-top: var(--e-spacing-h5);
    }
    :deep(.el-table) {
      box-shadow: none !important;
      .el-table__inner-wrapper::before {
        display: none;
      }
      .cell {
        padding-left: var(--e-spacing-h2);
        a {
          word-break: normal;
          &:hover {
            color: var(--e-color-brand2);
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
        border-bottom: 1px solid var(--e-color-border2);
      }
    }
    .name-info {
      display: flex;
      align-items: center;
      gap: var(--e-spacing-h8);
      color: var(--e-color-text1);
      .server-tips {
        width: var(--e-font-size-h6);
        height: var(--e-font-size-h6);
        color: var(--e-color-text4);
      }
    }
    .down-copy {
      font-size: var(--e-font-size-text);
      padding-left: 0;
      color: var(--e-color-brand1);
      &:hover {
        color: var(--e-color-brand2);
      }
    }
  }
  .download-mobile {
    margin-top: var(--e-spacing-h5);
    .download-item {
      padding: var(--e-spacing-h5);
      &:nth-of-type(2n + 1) {
        background-color: var(--e-color-bg4);
      }
      .item-text {
        font-size: var(--e-font-size-tip);
        line-height: var(--e-font-height-tip);
        color: var(--e-color-text1);
        display: flex;
        & ~ .item-text {
          margin-top: var(--e-spacing-h8);
        }
        span {
          display: inline-block;
          &:nth-of-type(1) {
            width: 72px;
          }
        }
        .text-size {
          color: var(--e-color-text4);
        }
        .down-copy {
          color: var(--e-color-brand1);
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
            background-color: var(--e-color-bg2);
            padding: var(--e-spacing-h9);
          }
          .server-tips {
            width: var(--e-font-size-tip);
            height: var(--e-font-size-tip);
            color: var(--e-color-text4);
            margin-left: var(--e-spacing-h9);
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
