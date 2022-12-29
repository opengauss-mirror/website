<script lang="ts" setup>
import { ref, computed, onMounted, Ref, watch } from 'vue';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import { ElMessage, ElMessageBox } from 'element-plus';
import { useCommon } from '@/stores/common';
import { showGuard, useStoreData } from '@/shared/login';

import DownloadConfig from '@/data/download';
import AppContent from '@/components/AppContent.vue';
import OSelect from 'opendesign/select/OSelect.vue';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy.svg';
import IconTips from '~icons/app/icon-tips.svg';

import BannerLevel2 from '@/components/BannerLevel2.vue';
import Banner from '@/assets/banner/banner-secondary.png';
import illustration from '@/assets/illustrations/download.png';

import QuesTipsImg from '@/assets/category/download/tips.png';
import QuesTipsImg1 from '@/assets/category/download/tips1.png';

const i18n = useI18n();
const { lang, theme } = useData();
const commonStore = useCommon();
const { guardAuthClient } = useStoreData();

const isZh = computed(() => (lang.value === 'zh' ? true : false));

const shaText = 'SHA256';
const versionIndex = ref(DownloadConfig.length - 1);
const selectVersion = ref(versionIndex);

// 获取版版本数据
const getData = computed(() => {
  return DownloadConfig.filter((el) => el.id === versionIndex.value);
});
// 当前版本名称
const versionName = ref(getData.value[0].name);

// 下载认证版本
const downloadVersionAuth = '3.1.0';

// 当前版本名称
const versionName = ref(getData.value[0].name);

const handleDownloadUrl = (url: string) => {
  window.open(url, '_blank');
};

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
  }
  return tips;
});

onMounted(() => {
  inputDom.value = document.getElementById('useCopy');
});

const activeName = computed(() =>
  isZh.value
    ? getData.value[0].data[0].zh[0].name
    : getData.value[0].data[0].en[0].name
);
const activeMobile = ref(activeName.value);

watch(
  () => getData.value,
  (val) => {
    activeMobile.value = activeName.value;
    versionName.value = val[0].name;
  },
  { deep: true, immediate: true }
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
    .catch(() => {});
};
</script>

<template>
  <BannerLevel2
    :background-image="Banner"
    :title="i18n.download.PAGE_TITLE"
    :illustration="illustration"
  />
  <AppContent>
    <div class="download-filter">
      <div class="slect-box">
        <span class="label">{{ i18n.download.VERSION }}</span>
        <OSelect v-model="selectVersion" class="select-version">
          <OOption
            v-for="item in DownloadConfig"
            :key="item.name"
            :label="item.name"
            :value="item.id"
          />
        </OSelect>
      </div>
      <div class="download-filter-discri">
        <a
          v-for="item in getData[0].docs_list"
          :key="item.name"
          :href="theme.docsUrl + '/' + lang + item.path"
          target="_blank"
          >{{ isZh ? item.name : item.nameEn }}</a
        >
        <a
          href="https://gitee.com/opengauss/community/issues"
          target="_blank"
          >{{ i18n.download.FEEDBACK_QUESTION }}</a
        >
      </div>
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
            <div v-if="subitem.centos_url !== ''">
              <p class="text">{{ item.thead[1] }}</p>
              <div class="down-action">
                <template
                  v-if="versionName === downloadVersionAuth && !guardAuthClient.username"
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
                </template>
                <template v-else>
                  <a :href="subitem.centos_url">
                    <OButton size="mini" animation type="primary">
                      {{ i18n.download.BTN_TEXT }}
                      <template #suffixIcon>
                        <IconDownload />
                      </template>
                    </OButton>
                  </a>
                </template>
                <OButton
                  class="down-copy"
                  size="mini"
                  type="text"
                  animation
                  @click="handleUrlCopy(subitem.centos_sha)"
                >
                  {{ shaText }}
                  <template #suffixIcon>
                    <IconCopy />
                  </template>
                </OButton>
              </div>
              <div v-if="subitem.download_guide_url" class="download-guide-btn">
                <a :href="subitem.download_guide_url">
                  <OButton size="mini" animation>
                    {{ i18n.download.DOCS_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template> </OButton
                ></a>
              </div>
            </div>
            <div v-if="subitem.aarch_url !== ''">
              <p class="text">{{ item.thead[2] }}</p>
              <div class="down-action">
                <template
                  v-if="versionName === downloadVersionAuth && !guardAuthClient.username"
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
                </template>
                <template v-else>
                  <a :href="subitem.aarch_url">
                    <OButton size="mini" type="primary" animation>
                      {{ i18n.download.BTN_TEXT }}
                      <template #suffixIcon>
                        <IconDownload />
                      </template> </OButton
                  ></a>
                </template>
                <OButton
                  class="down-copy"
                  size="mini"
                  type="text"
                  animation
                  @click="handleUrlCopy(subitem.aarch_sha)"
                >
                  {{ shaText }}
                  <template #suffixIcon>
                    <IconCopy />
                  </template>
                </OButton>
              </div>
            </div>
            <div v-if="subitem.x86_url !== ''">
              <p class="text">{{ item.thead[3] }}</p>
              <div class="down-action">
                <template
                  v-if="versionName === downloadVersionAuth && !guardAuthClient.username"
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
                </template>
                <template v-else>
                  <a :href="subitem.x86_url">
                    <OButton size="mini" type="primary" animation>
                      {{ i18n.download.BTN_TEXT }}
                      <template #suffixIcon>
                        <IconDownload />
                      </template> </OButton
                  ></a>
                </template>
                <OButton
                  class="down-copy"
                  size="mini"
                  type="text"
                  animation
                  @click="handleUrlCopy(subitem.x86_sha)"
                >
                  {{ shaText }}
                  <template #suffixIcon>
                    <IconCopy />
                  </template>
                </OButton>
              </div>
            </div>
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
        <el-table-column :label="item.thead[1]">
          <template #default="scope">
            <div v-if="scope.row.centos_url !== ''" class="down-action">
              <template v-if="versionName === downloadVersionAuth && !guardAuthClient.username">
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
                <a :href="scope.row.centos_url">
                  <OButton size="mini" animation type="primary">
                    {{ i18n.download.BTN_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template> </OButton
                ></a>
              </template>
              <OButton
                class="down-copy"
                size="mini"
                type="text"
                animation
                @click="handleUrlCopy(scope.row.centos_sha)"
              >
                {{ shaText }}
                <template #suffixIcon>
                  <IconCopy />
                </template>
              </OButton>
            </div>
            <div v-if="scope.row.download_guide_url" class="download-guide-btn">
              <a :href="scope.row.download_guide_url">
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
              <template v-if="versionName === downloadVersionAuth && !guardAuthClient.username">
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
                <a :href="scope.row.aarch_url">
                  <OButton size="mini" type="primary" animation>
                    {{ i18n.download.BTN_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template>
                  </OButton>
                </a>
              </template>
              <OButton
                class="down-copy"
                size="mini"
                type="text"
                animation
                @click="handleUrlCopy(scope.row.aarch_sha)"
              >
                {{ shaText }}
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
              <template v-if="versionName === downloadVersionAuth && !guardAuthClient.username">
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
                <a :href="scope.row.x86_url">
                  <OButton size="mini" type="primary" animation>
                    {{ i18n.download.BTN_TEXT }}
                    <template #suffixIcon>
                      <IconDownload />
                    </template> </OButton
                ></a>
              </template>
              <OButton
                class="down-copy"
                size="mini"
                type="text"
                animation
                @click="handleUrlCopy(scope.row.x86_sha)"
              >
                {{ shaText }}
                <template #suffixIcon>
                  <IconCopy />
                </template>
              </OButton>
            </div>
          </template>
        </el-table-column>
      </OTable>
    </div>
  </AppContent>
  <div class="input-box">
    <!-- 用于复制RSNC的值 -->
    <input id="useCopy" type="text" />
  </div>
  <div v-if="lang === 'zh'" class="questionnaire">
    <div class="ques-icon">
      <img :src="QuesTipsImg" class="img0" alt="" />
      <img :src="QuesTipsImg1" class="img1" alt="" />
    </div>
    <div class="ques-info">
      <p class="title">{{ i18n.download.LETTER.NAME }}</p>
      <p class="letter-text">
        {{ i18n.download.LETTER.INFO }}
      </p>
      <OButton
        size="mini"
        type="primary"
        @click="handleDownloadUrl(i18n.download.LETTER.PATH)"
      >
        {{ i18n.download.LETTER.BTN }}
      </OButton>
    </div>
  </div>
</template>

<style lang="scss" scoped>
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

.download-filter {
  display: flex;
  align-items: center;
  gap: var(--o-spacing-h4);
  margin-bottom: var(--o-spacing-h4);
  &-discri {
    display: flex;
    align-items: center;
    gap: var(--o-spacing-h4);
    a {
      font-size: var(--o-font-size-text);
      line-height: var(--o-line-height-text);
      cursor: pointer;
    }
    @media screen and (max-width: 1100px) {
      display: block;
      margin-top: var(--o-spacing-h6);
      margin-bottom: var(--o-spacing-h2);
      a {
        margin: var(--o-spacing-h8) var(--o-spacing-h4) 0 0;
        display: inline-block;
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
  }
  .slect-box {
    display: flex;
    align-items: center;
    gap: var(--o-spacing-h5);
    .label {
      color: var(--o-color-text4);
      @media screen and (max-width: 1100px) {
        font-size: var(--o-font-size-tip);
        line-height: var(--o-line-height-tip);
      }
    }
    .select-version {
      flex: 1;
    }
  }

  @media screen and (max-width: 1100px) {
    display: block;
  }
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
      margin: var(--o-spacing-h9) 0 var(--o-spacing-h5);
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
.server-name {
  font-size: var(--o-font-size-text);
  line-height: var(--o-line-height-text);
}

.questionnaire {
  position: fixed;
  right: 5%;
  bottom: 350px;
  z-index: 9;
  .ques-icon {
    position: relative;
    .img1 {
      width: 45px;
      object-fit: cover;
      position: absolute;
      top: -6px;
      left: 17px;
      z-index: 2;
    }
    .img0 {
      width: 79px;
      height: 93px;
      object-fit: cover;
    }
  }

  .ques-info {
    display: none;
    width: 179px;
    color: #fff;
    background: #8d8bff;
    padding: 18px var(--o-spacing-h5) var(--o-spacing-h5);
    position: absolute;
    top: 0;
    left: -50px;
    z-index: 1;
    border-radius: 6px;
    text-align: center;
    p {
      font-size: var(--o-font-size-tip);
      line-height: var(--o-line-height-tip);
      text-align: left;
    }
    .letter-text {
      margin: var(--o-spacing-h8) 0;
    }
  }

  &:hover {
    .ques-info {
      display: block;
    }
  }
  @media screen and (max-width: 1100px) {
    display: none;
  }
}
</style>
