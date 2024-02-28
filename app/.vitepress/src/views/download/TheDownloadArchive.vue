<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import { ElMessage } from 'element-plus';

import { useCommon, useCookieStatus } from '@/stores/common';
import DownloadConfig from '@/data/download';
import { GITEE_LINK, DOCS_LINK } from '@/data/url-config';
import { getCustomCookie } from '@/shared/utils';
import { useUserInfoStore } from '@/stores/user';

import AppContent from '@/components/AppContent.vue';
import OSelect from 'opendesign/select/OSelect.vue';
import DownloadContent from './DownloadContent.vue';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy.svg';
import IconTips from '~icons/app/icon-tips.svg';

import BreadCrumbs from '@/components/BreadCrumbs.vue';

const i18n = useI18n();
const { lang } = useData();
const commonStore = useCommon();
const isZh = computed(() => (lang.value === 'zh' ? true : false));
const cookieStatus = useCookieStatus();

const SHATEXT = 'SHA256';
const selectVersion = ref(DownloadConfig[2].name);
function initSelectVersion() {
  DownloadConfig.forEach((item: any) => {
    if (item.initPrevious) {
      selectVersion.value = item.name;
    }
  });
}
initSelectVersion();
// 获取版版本数据
const getData: any = computed(() => {
  return DownloadConfig.filter((el) => el.name === selectVersion.value);
});

// 复制
async function handleUrlCopy(value: string | undefined) {
  if (!value) return;
  navigator.clipboard.writeText(value);
  ElMessage({
    message: i18n.value.download.COPY_SUCCESS,
    type: 'success',
  });
}

// 根据语言切换数据
const changeLangData = computed(
  () => (item: any) => isZh.value ? item.zh : item.en
);
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
    default:
      break;
  }
  return tips;
});

const activeName = computed(() => {
  if (!getData.value[0].data[0]) {
    return '';
  }
  return isZh.value && getData.value[0].data[0]
    ? getData.value[0].data[0].zh[0].name
    : getData.value[0].data[0].en[0].name;
});
const activeMobile = ref(activeName.value);

watch(
  () => getData.value,
  () => {
    activeMobile.value = activeName.value;
  },
  { deep: true, immediate: true }
);
//控制需要登录后才能下载的版本,最新版的LTS和Preview都需要登录后才能下载的版本
const downloadVersionAuth = [
  DownloadConfig[0].name,
  DownloadConfig[1].name,
  DownloadConfig[2].name,
];
// 下载埋点
const userInfoStore = useUserInfoStore();
// 老版本下载判断
const collectDownloadData = (name: string, architectureAndOs: string) => {
  if (cookieStatus.isAllAgreed || userInfoStore.username) {
    const sensors = (window as any)['sensorsDataAnalytic201505'];
    const { href } = window.location;
    const downloadTime = new Date();
    const _U_T_ = getCustomCookie('_U_T_') || 'notLog';
    const startIndex = architectureAndOs.indexOf('_');
    sensors?.setProfile({
      ...(window as any)['sensorsCustomBuriedData'],
      profileType: 'download',
      origin: href,
      softwareName: name,
      softwareArchitecture:
        startIndex === -1 ? '' : architectureAndOs.slice(startIndex + 1),
      softwareOs: architectureAndOs.slice(0, startIndex),
      downloadTime,
      _U_T_,
    });
  }
};
</script>

<template>
  <AppContent :mobile-top="16">
    <BreadCrumbs
      :bread1="i18n.download.PAGE_TITLE"
      :bread2="i18n.download.DOWNLOAD_HISTORY"
      :link1="`/${lang}/download/`"
    />
    <div class="download-filter">
      <div class="slect-box">
        <span class="label">{{ i18n.download.VERSION }}</span>
        <ClientOnly>
          <OSelect v-model="selectVersion" class="select-version">
            <OOption
              v-for="item in DownloadConfig"
              :key="item.name"
              :label="item.name"
              :value="item.name"
            />
          </OSelect>
        </ClientOnly>
      </div>
    </div>
    <template v-if="!getData[0].newLayout">
      <div class="link-box">
        <a
          v-for="item in getData[0].docs_list"
          :key="item.name"
          :href="
            item.path.startsWith('/docs/')
              ? DOCS_LINK + lang + item.path
              : item.path
          "
          target="_blank"
          rel="noopener noreferrer"
          >{{ isZh ? item.name : item.nameEn }}</a
        >
        <a
          :href="GITEE_LINK + 'opengauss/community/issues'"
          target="_blank"
          rel="noopener noreferrer"
          >{{ i18n.download.FEEDBACK_QUESTION }}</a
        >
      </div>
      <!-- 表格 -->
      <div
        v-for="item in getData[0].data"
        :key="item.name"
        class="download-panel"
      >
        <h2 class="title">{{ item.name }}</h2>
        <!-- 移动端 -->
        <OCollapse v-model="activeMobile" class="download-mobile" accordion>
          <OCollapseItem
            v-for="subitem in changeLangData(item)"
            :key="subitem.TITLE"
            :name="subitem.name"
            class="carousel-mobile-card"
          >
            <template #title>
              <p class="caption">{{ subitem.name }}</p>
            </template>
            <div class="carousel-mobile-img">
              <p v-if="subitem.table === 'server'" class="text tips">
                {{ hoverTips(subitem.edition) }}
              </p>
              <template v-if="subitem.centos_url !== ''">
                <p class="text">{{ item.thead[1] }}</p>
                <div class="down-action lable-name2">
                  <a
                    :href="subitem.centos_url"
                    @click="collectDownloadData(subitem.name, item.thead[1])"
                    rel="noopener noreferrer"
                  >
                    <OButton size="mini" animation type="primary">
                      {{ i18n.download.BTN_TEXT }}
                      <template #suffixIcon>
                        <IconDownload />
                      </template>
                    </OButton>
                  </a>
                  <OButton
                    size="mini"
                    type="text"
                    animation
                    class="down-copy"
                    @click="handleUrlCopy(subitem.centos_sha)"
                  >
                    {{ SHATEXT }}
                    <template #suffixIcon>
                      <IconCopy />
                    </template>
                  </OButton>
                </div>
                <div
                  v-if="subitem.download_guide_url"
                  class="download-guide-btn"
                >
                  <a
                    :href="subitem.download_guide_url"
                    rel="noopener noreferrer"
                  >
                    <OButton size="mini" animation>
                      {{ i18n.download.DOCS_TEXT }}
                      <template #suffixIcon>
                        <IconDownload />
                      </template> </OButton
                  ></a>
                </div>
              </template>
              <template v-if="subitem.aarch_url !== ''">
                <p class="text">{{ item.thead[2] }}</p>
                <div class="down-action lable-name3">
                  <a
                    :href="subitem.aarch_url"
                    rel="noopener noreferrer"
                    @click="collectDownloadData(subitem.name, item.thead[2])"
                  >
                    <OButton animation size="mini" type="primary">
                      {{ i18n.download.BTN_TEXT }}
                      <template #suffixIcon>
                        <IconDownload />
                      </template> </OButton
                  ></a>
                  <OButton
                    class="down-copy lable-name3"
                    size="mini"
                    type="text"
                    animation
                    @click="handleUrlCopy(subitem.aarch_sha)"
                  >
                    {{ SHATEXT }}
                    <template #suffixIcon>
                      <IconCopy />
                    </template>
                  </OButton>
                </div>
              </template>
              <template v-if="subitem.x86_url !== ''">
                <p class="text">{{ item.thead[3] }}</p>
                <div class="down-action">
                  <a
                    :href="subitem.x86_url"
                    rel="noopener noreferrer"
                    @click="collectDownloadData(subitem.name, item.thead[3])"
                  >
                    <OButton size="mini" type="primary" animation>
                      {{ i18n.download.BTN_TEXT }}
                      <template #suffixIcon>
                        <IconDownload />
                      </template>
                    </OButton>
                  </a>
                  <OButton
                    class="down-copy lable-name6"
                    size="mini"
                    type="text"
                    animation
                    @click="handleUrlCopy(subitem.x86_sha)"
                  >
                    {{ SHATEXT }}
                    <template #suffixIcon>
                      <IconCopy />
                    </template>
                  </OButton>
                </div>
              </template>
            </div>
          </OCollapseItem>
        </OCollapse>
        <!-- pc  -->
        <OTable
          :data="changeLangData(item)"
          class="download-pc"
          style="width: 100%"
        >
          <el-table-column :label="item.thead[0]" prop="name">
            <template #default="scope">
              <div class="name-info">
                {{ scope.row.name }}
                <template v-if="scope.row.table === 'server'">
                  <el-tooltip
                    :effect="commonStore.theme"
                    placement="right-start"
                  >
                    <template #content>
                      <p class="server-name lable-name">
                        {{ hoverTips(scope.row.edition) }}
                      </p>
                    </template>
                    <IconTips class="server-tips lable-name" />
                  </el-tooltip>
                </template>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="item.thead[1]">
            <template #default="scope">
              <div v-if="scope.row.centos_url !== ''" class="down-action">
                <a
                  :href="scope.row.centos_url"
                  @click="collectDownloadData(scope.row.name, item.thead[1])"
                  rel="noopener noreferrer"
                >
                  <OButton size="mini" animation type="primary">
                    {{ i18n.download.BTN_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template>
                  </OButton>
                </a>
                <OButton
                  class="down-copy"
                  size="mini"
                  type="text"
                  animation
                  @click="handleUrlCopy(scope.row.centos_sha)"
                >
                  {{ SHATEXT }}
                  <template #suffixIcon>
                    <IconCopy />
                  </template>
                </OButton>
              </div>
              <div
                v-if="scope.row.download_guide_url"
                class="download-guide-btn"
              >
                <a
                  :href="scope.row.download_guide_url"
                  rel="noopener noreferrer"
                >
                  <OButton size="mini" animation>
                    {{ i18n.download.DOCS_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template>
                  </OButton>
                </a>
              </div>
            </template>
          </el-table-column>

          <el-table-column :label="item.thead[2]" prop="aarch_url">
            <template #default="scope">
              <div v-if="scope.row.aarch_url !== ''" class="down-action">
                <a
                  :href="scope.row.aarch_url"
                  rel="noopener noreferrer"
                  @click="collectDownloadData(scope.row.name, item.thead[2])"
                >
                  <OButton size="mini" type="primary" animation>
                    {{ i18n.download.BTN_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template>
                  </OButton>
                </a>
                <OButton
                  class="down-copy"
                  size="mini"
                  type="text"
                  animation
                  @click="handleUrlCopy(scope.row.aarch_sha)"
                >
                  {{ SHATEXT }}
                  <template #suffixIcon>
                    <IconCopy />
                  </template>
                </OButton>
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="item.thead[3]" prop="x86_url">
            <template #default="scope">
              <div v-if="scope.row.x86_url !== ''" class="down-action">
                <a
                  :href="scope.row.x86_url"
                  rel="noopener noreferrer"
                  @click="collectDownloadData(scope.row.name, item.thead[3])"
                >
                  <OButton size="mini" type="primary" animation>
                    {{ i18n.download.BTN_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template>
                  </OButton>
                </a>
                <OButton
                  class="down-copy"
                  size="mini"
                  type="text"
                  animation
                  @click="handleUrlCopy(scope.row.x86_sha)"
                >
                  {{ SHATEXT }}
                  <template #suffixIcon>
                    <IconCopy />
                  </template>
                </OButton>
              </div>
            </template>
          </el-table-column>
        </OTable>
      </div>
    </template>
    <DownloadContent
      v-else
      :content-data="getData"
      :version-shown="selectVersion"
      :download-version-auth="downloadVersionAuth"
    />
  </AppContent>
</template>

<style lang="scss" scoped>
.download-filter {
  margin-top: var(--o-spacing-h2);
  margin-bottom: var(--o-spacing-h4);
  @media screen and (max-width: 1100px) {
    margin-top: var(--o-spacing-h5);
    margin-bottom: var(--o-spacing-h5);
  }
  .slect-box {
    display: flex;
    align-items: center;
    gap: var(--o-spacing-h5);
    :deep(.el-input__prefix) {
      display: none;
    }
    :deep(.el-input__wrapper) {
      padding: 0 16px;
    }
    @media screen and (max-width: 1100px) {
      display: block;
    }
    .label {
      color: var(--o-color-text4);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
    .select-version {
      flex: 1;
      max-width: 400px;
      @media screen and (max-width: 1100px) {
        margin-top: 8px;
        max-width: 100%;
        width: 100%;
      }
    }
  }

  @media screen and (max-width: 1100px) {
    display: block;
  }
}
.link-box {
  display: flex;
  align-items: center;
  gap: var(--o-spacing-h4);
  margin-top: var(--o-spacing-h2);
  margin-bottom: var(--o-spacing-h2);
  @media screen and (max-width: 1100px) {
    display: block;
    margin-top: var(--o-spacing-h6);
    margin-bottom: var(--o-spacing-h2);
  }
  a {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
    cursor: pointer;
    @media screen and (max-width: 1100px) {
      margin: var(--o-spacing-h8) var(--o-spacing-h4) 0 0;
      display: inline-block;
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
    }
  }
}
.download-panel {
  &:not(:last-child) {
    margin-bottom: var(--o-spacing-h1);
    @media screen and (max-width: 1100px) {
      margin-bottom: var(--o-spacing-h2);
    }
  }
  > .title {
    font-size: var(--o-font-size-h4);
    line-height: var(--o-line-height-h4);
    color: var(--o-color-text1);
    margin-bottom: var(--o-spacing-h4);
    font-weight: 300;
    @media screen and (max-width: 1100px) {
      font-size: var(--o-font-size-h8);
      line-height: var(--o-line-height-h8);
      text-align: center;
      margin-bottom: var(--o-spacing-h5);
    }
  }
  .caption {
    font-size: var(--o-font-size-text);
    line-height: var(--o-line-height-text);
  }
  :deep(.o-table.el-table) {
    .cell {
      text-align: center;
    }
  }

  .o-collapse {
    :deep(.el-collapse-item__content) {
      padding: var(--o-spacing-h5);
    }
    .text {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      color: var(--o-color-text4);
      &.tips {
        margin-bottom: var(--o-spacing-h8);
      }
    }
    .down-action {
      &:not(:last-child) {
        margin: var(--o-spacing-h9) 0 var(--o-spacing-h5);
      }
      @media screen and (max-width: 1100px) {
        justify-content: left;
      }
    }
  }

  .name-info {
    display: flex;
    align-items: center;
    gap: var(--o-spacing-h8);
    color: var(--o-color-text1);
  }
  .server-tips {
    width: var(--o-font-size-h6);
    height: var(--o-font-size-h6);
    color: var(--o-color-text4);
  }
}
.download-mobile {
  display: none;
  @media screen and (max-width: 1100px) {
    display: block;
  }
}
.download-pc {
  display: block;
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
.input-box #useCopy {
  position: absolute;
  opacity: 0;
}

.down-action {
  display: flex;
  align-items: center;
  font-size: var(--o-font-size-text);
  gap: var(--o-spacing-h8);
  justify-content: center;

  .down-copy {
    color: var(--o-color-brand1);
    font-size: var(--o-font-size-text);
  }
}
.download-guide-btn {
  margin: var(--o-spacing-h8) auto 0;
  width: 210px;
  .o-button {
    width: 100%;
    justify-content: center;
  }
  @media screen and (max-width: 1100px) {
    margin: 0;
  }
}

.server-name {
  font-size: var(--o-font-size-text);
  line-height: var(--o-line-height-text);
}
</style>
