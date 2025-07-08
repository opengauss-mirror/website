<script lang="ts" setup>
import { toRefs, ref, computed, PropType } from 'vue';
import { useUserInfoStore } from '@/stores/user';
import { OLink, ODivider, OButton, OPopover, OIcon, useMessage, OTag } from '@opensig/opendesign';
import { useI18n } from '@/i18n';
import { useData } from 'vitepress';
import { oaReport } from '@/shared/analytics';
import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';
import { useClipboard } from '@/components/hooks/useClipboard';
import { DownloadItem } from '~@/@types/type-download';
import { GITCODE_LINK, DOCS_LINK } from '~@/data/url-config';
import { downloadName } from '~@/data/download/format';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy2.svg';
import IconTips from '~icons/app/icon-tips.svg';

const props = defineProps({
  contentData: {
    required: true,
    type: Object as PropType<DownloadItem>,
    default: () => {
      return {};
    },
  },
});

const { contentData } = toRefs(props);
const { lang } = useData();

const i18n = useI18n();
const message = useMessage();
const { gtPadV } = useScreen();
const { t, isZh, $t } = useLocale();

const isCn = computed(() => lang.value === 'zh');

// 复制sha值
const SHATEXT = 'SHA256';
const isClipboard = ref(true);
const initClipboard = (text: string, e: MouseEvent) => {
  isClipboard.value = false;
  useClipboard({
    text,
    target: e,
    success: () => {
      message.success({
        content: i18n.value.common.COPY_SUCCESS,
      });
      isClipboard.value = true;
    },
    error: () => {
      message.danger({
        content: i18n.value.common.COPY_FAILED,
      });
      isClipboard.value = true;
    },
  });
};

const handleUrlCopy = (value: string | undefined, e: MouseEvent) => {
  if (!value) {
    return;
  }

  if (isClipboard.value) {
    initClipboard(value, e);
  }
};

// 根据语言切换数据
const changeLangData = computed(() => (item: any) => (isZh.value ? item.zh : item.en));

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

// 下载埋点
const userInfoStore = useUserInfoStore();

// 老版本下载判断 不用登录
const collectDownloadData = (name: string, architectureAndOs: string) => {
  const { href } = window.location;
  const downloadTime = new Date();
  const startIndex = architectureAndOs.indexOf('_');
  oaReport('download', {
    origin: href,
    softwareName: name,
    softwareArchitecture: startIndex === -1 ? '' : architectureAndOs.slice(startIndex + 1),
    softwareOs: architectureAndOs.slice(0, startIndex),
    downloadTime,
  });
};
</script>

<template>
  <div class="download-version">
    <h2 class="title">{{ 'openGauss ' + contentData.name }} <OTag v-if="contentData.plannedEOL === 'End-of-Life' || contentData.isEol"> 停止维护 </OTag></h2>
    <h4 v-if="contentData.plannedEOL" class="subtitle">维护截止时间：{{ contentData.plannedEOL }}</h4>
    <div class="other-link">
      <template v-for="item in contentData.docs_list" :key="item.name">
        <OLink :href="item.path.startsWith('/docs/') ? DOCS_LINK + lang + item.path : item.path" color="primary" target="_blank" rel="noopener noreferrer">{{
          isZh ? item.name : item.nameEn
        }}</OLink>
        <ODivider direction="v" />
      </template>
      <OLink :href="GITCODE_LINK + 'opengauss/community/issues'" color="primary" target="_blank" rel="noopener noreferrer">{{
        i18n.download.FEEDBACK_QUESTION
      }}</OLink>
    </div>
    <p v-if="contentData.desc" class="desc">{{ contentData.desc }}</p>
    <ODivider class="divider-line" />
  </div>
  <div v-for="item in contentData.data" :key="item.name" class="download-panel">
    <h2 class="title">{{ isCn ? downloadName[item.name.trim()] : item.name }}</h2>

    <!-- pc  -->
    <template v-if="gtPadV">
      <OTable v-if="item.name.trim() !== 'openGauss Tools'" :data="changeLangData(item)" class="download-pc" style="width: 100%">
        <el-table-column :label="item.thead[0]" prop="name" width="286">
          <template #default="scope">
            <div class="name-info">
              {{ scope.row.name }}
              <template v-if="scope.row.table === 'server'">
                <OPopover position="top" trigger="hover">
                  <template #target>
                    <OIcon> <IconTips ref="installRef" class="server-tips" /></OIcon>
                  </template>
                  <div class="lse-content">
                    {{ hoverTips(scope.row.edition) }}
                  </div>
                </OPopover>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="item.thead[1]" prop="centos_url">
          <template #default="scope">
            <div v-if="scope.row.centos_url !== ''" class="down-action">
              <OButton variant="outline" size="small" color="primary" :href="scope.row.centos_url" @click="collectDownloadData(scope.row.name, item.thead[1])">
                {{ i18n.download.BTN_TEXT }}
              </OButton>

              <OLink class="down-copy" size="small" @click="handleUrlCopy(scope.row.centos_sha, $event)">
                {{ SHATEXT }}
                <OIcon>
                  <IconCopy />
                </OIcon>
              </OLink>

              <OLink v-if="scope.row.download_guide_url" size="small" :href="scope.row.download_guide_url">
                {{ i18n.download.DOCS_TEXT }}
              </OLink>
            </div>
            <div v-else class="no-data">--</div>
          </template>
        </el-table-column>
        <el-table-column :label="item.thead[2]" prop="aarch_url">
          <template #default="scope">
            <div v-if="scope.row.aarch_url !== ''" class="down-action">
              <OButton variant="outline" size="small" color="primary" :href="scope.row.aarch_url" @click="collectDownloadData(scope.row.name, item.thead[2])">
                {{ i18n.download.BTN_TEXT }}
              </OButton>

              <OLink class="down-copy" size="small" animation @click="handleUrlCopy(scope.row.aarch_sha, $event)">
                {{ SHATEXT }}
                <OIcon>
                  <IconCopy />
                </OIcon>
              </OLink>
            </div>
            <div v-else class="no-data">--</div>
          </template>
        </el-table-column>
        <el-table-column :label="item.thead[3]" prop="x86_url">
          <template #default="scope">
            <template v-if="item.thead[3]">
              <div v-if="scope.row.x86_url !== ''" class="down-action">
                <OButton variant="outline" size="small" color="primary" :href="scope.row.x86_url" @click="collectDownloadData(scope.row.name, item.thead[3])">
                  {{ i18n.download.BTN_TEXT }}
                </OButton>

                <OLink class="down-copy" size="small" @click="handleUrlCopy(scope.row.x86_sha, $event)">
                  {{ SHATEXT }}
                  <OIcon>
                    <IconCopy />
                  </OIcon>
                </OLink>
              </div>
              <div v-else class="no-data">--</div>
            </template>
          </template>
        </el-table-column>
      </OTable>
      <OTable v-else :data="changeLangData(item)" class="download-pc" style="width: 100%">
        <el-table-column :label="item.thead[0]" prop="name" width="286">
          <template #default="scope">
            <div class="name-info">
              {{ scope.row.name }}
              <template v-if="scope.row.table === 'server'">
                <OPopover position="top" trigger="hover">
                  <template #target>
                    <OIcon> <IconTips ref="installRef" class="server-tips" /></OIcon>
                  </template>
                  <div class="lse-content">
                    {{ hoverTips(scope.row.edition) }}
                  </div>
                </OPopover>
              </template>
            </div>
          </template>
        </el-table-column>
        <el-table-column :label="item.thead[1]" prop="centos_url">
          <template #default="scope">
            <div v-if="scope.row.centos_url !== ''" class="down-action">
              <OButton variant="outline" size="small" color="primary" :href="scope.row.centos_url" @click="collectDownloadData(scope.row.name, item.thead[1])">
                {{ i18n.download.BTN_TEXT }}
              </OButton>

              <OLink class="down-copy" size="small" @click="handleUrlCopy(scope.row.centos_sha, $event)">
                {{ SHATEXT }}
                <OIcon>
                  <IconCopy />
                </OIcon>
              </OLink>

              <OLink v-if="scope.row.download_guide_url" size="small" :href="scope.row.download_guide_url">
                {{ i18n.download.DOCS_TEXT }}
              </OLink>
            </div>
            <div v-else class="no-data">--</div>
          </template>
        </el-table-column>
        <el-table-column :label="item.thead[2]" prop="aarch_url">
          <template #default="scope">
            <template v-if="item.thead[2]">
              <div v-if="scope.row.aarch_url !== ''" class="down-action">
                <OButton variant="outline" size="small" color="primary" :href="scope.row.aarch_url" @click="collectDownloadData(scope.row.name, item.thead[2])">
                  {{ i18n.download.BTN_TEXT }}
                </OButton>

                <OLink class="down-copy" size="small" animation @click="handleUrlCopy(scope.row.aarch_sha, $event)">
                  {{ SHATEXT }}
                  <OIcon>
                    <IconCopy />
                  </OIcon>
                </OLink>
              </div>
              <div v-else class="no-data">--</div>
            </template>
          </template>
        </el-table-column>
      </OTable>
    </template>

    <!-- 手机端 -->
    <ul v-else class="download-mobile">
      <li v-for="subitem in changeLangData(item)" :key="subitem.name" class="download-item">
        <p class="title">{{ subitem.name }}</p>
        <div class="carousel-mobile-img">
          <p v-if="subitem.table === 'server'" class="text tips">
            {{ hoverTips(subitem.edition) }}
          </p>
          <template v-if="subitem.centos_url !== ''">
            <p class="text">{{ item.thead[1] }}</p>
            <div class="down-action lable-name2">
              <a :href="subitem.centos_url" @click="collectDownloadData(subitem.name, item.thead[1])" rel="noopener noreferrer">
                <OButton variant="outline" size="small" color="primary">
                  {{ i18n.download.BTN_TEXT }}
                </OButton>
              </a>
              <OLink variant="text" size="small" class="down-copy" @click="handleUrlCopy(subitem.centos_sha, $event)">
                {{ SHATEXT }}
                <OIcon>
                  <IconCopy />
                </OIcon>
              </OLink>
              <OLink v-if="subitem.download_guide_url" size="small" :href="subitem.download_guide_url">
                {{ i18n.download.DOCS_TEXT }}
              </OLink>
            </div>
          </template>
          <template v-if="subitem.aarch_url !== ''">
            <p class="text">{{ item.thead[2] }}</p>
            <div class="down-action lable-name3">
              <OButton :href="subitem.aarch_url" @click="collectDownloadData(subitem.name, item.thead[2])" variant="outline" size="small" color="primary">
                {{ i18n.download.BTN_TEXT }}
              </OButton>
              <OLink class="down-copy lable-name3" size="small" @click="handleUrlCopy(subitem.aarch_sha, $event)">
                {{ SHATEXT }}
                <OIcon>
                  <IconCopy />
                </OIcon>
              </OLink>
            </div>
          </template>
          <template v-if="subitem.x86_url !== ''">
            <p class="text">{{ item.thead[3] }}</p>
            <div class="down-action">
              <OButton
                :href="subitem.x86_url"
                @click="collectDownloadData(subitem.name, item.thead[3])"
                variant="outline"
                size="small"
                color="primary"
                animation
              >
                {{ i18n.download.BTN_TEXT }}
                <template #suffixIcon>
                  <IconDownload />
                </template>
              </OButton>

              <OLink class="down-copy lable-name6" size="small" @click="handleUrlCopy(subitem.x86_sha, $event)">
                {{ SHATEXT }}
                <OIcon>
                  <IconCopy />
                </OIcon>
              </OLink>
            </div>
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.no-data {
  color: var(--o-color-info4);
}
.download-version {
  .title {
    @include h1;
    color: var(--o-color-info1);
    display: flex;
    align-items: center;
    gap: 32px;
    font-weight: 500;

    .o-tag {
      --tag-height: 32px;
      --tag-bg-color: var(--o-color-control2-light);
      --tag-bd-color: var(--o-color-control2-light);
      :deep(.o-tag-label) {
        @include text1;
      }
    }
  }
  .subtitle {
    margin-top: 8px;
    @include text1;
  }
  .other-link {
    margin-top: 16px;
    @include text1;
    @include respond-to('<=pad_v') {
      margin-top: 8px;
    }
  }
  .divider-line {
    --o-divider-gap: 32px;
    @include respond-to('<=pad_v') {
      --o-divider-gap: 16px;
    }
  }
  .desc {
    margin-top: 8px;
    @include text1;
  }
}
.download-panel {
  &:not(:last-child) {
    margin-bottom: var(--e-spacing-h1);
    @include respond-to('<=pad_v') {
      margin-bottom: 24px;
    }
  }
  > .title {
    @include h2;
    color: var(--o-color-info1);
    margin-bottom: 24px;
    font-weight: 500;
    @include respond-to('<=pad_v') {
      margin-bottom: 12px;
    }
  }
  .caption {
    font-size: var(--e-font-size-text);
    line-height: var(--e-line-height-text);
  }
  :deep(.o-table.el-table) {
    --e-shadow-l1: none;
    th {
      font-weight: 500;
    }
  }
  .name-info {
    display: flex;
    align-items: center;
    gap: var(--e-spacing-h8);
    color: var(--o-color-info1);
  }
  .down-action {
    display: flex;
    align-items: center;
    gap: var(--e-spacing-h8);

    @include respond-to('>laptop') {
      white-space: nowrap;
    }
    @include respond-to('<=laptop') {
      flex-wrap: wrap;
    }

    .down-copy {
      :deep(.o-link-main) {
        display: flex;
        align-items: center;
      }
      .o-icon {
        margin-left: 4px;
        font-size: 20px;
      }
    }
  }
  .download-guide-btn {
    margin: var(--e-spacing-h8) 0 0;
    width: 186px;
    .o-btn {
      width: 100%;
      justify-content: center;
    }
    @media screen and (max-width: 1100px) {
      margin: 0;
    }
  }
}
.download-mobile {
  margin-top: 12px;
  .download-item {
    padding: 16px;
    background-color: var(--o-color-fill1);
    border-radius: 4px;
    + .download-item {
      margin-top: 12px;
    }
    .title {
      @include text2;
      color: var(--o-color-info2);
      margin-bottom: 12px;
      font-weight: 500;
    }
    .text {
      @include text2;
      color: var(--o-color-info2);
    }
    .tips {
      @include text1;
      margin-bottom: 12px;
    }

    .download-guide-btn {
      margin-top: 6px;
    }
    .down-action {
      margin-top: 8px;
      ~ .text {
        margin-top: 16px;
      }
    }
    .item-text {
      @include text2;
      color: var(--o-color-info2);
      display: flex;
      & ~ .item-text {
        margin-top: var(--e-spacing-h8);
      }
      span {
        display: inline-block;
        &:nth-of-type(1) {
          width: 86px;
          color: var(--o-color-info2);
        }
      }

      .down-copy {
        color: var(--o-color-info1);
        svg {
          width: 16px;
          height: 16px;
        }
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
</style>
