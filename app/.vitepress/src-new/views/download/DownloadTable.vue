<script lang="ts" setup>
import { ref, computed, watch, toRefs, onMounted, inject, nextTick } from 'vue';
import { OLink, ODivider, OTag, OButton, ODialog, OTable, OPopover, OIcon, useMessage } from '@opensig/opendesign';
import { useScreen } from '~@/composables/useScreen';
import { useClipboard } from '@/components/hooks/useClipboard';
import { doLogin } from '@/shared/login';
import { useI18n } from '@/i18n';
import { useUserInfoStore } from '@/stores/user';
import { useLocale } from '~@/composables/useLocale';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy.svg';
import IconTips from '~icons/app/icon-tips.svg';

const props = defineProps({
  options: {
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
  type: {
    type: String,
    default: '',
  },
});

const i18n = useI18n();
const message = useMessage();
const { t, isZh, $t } = useLocale();
const { gtPadV } = useScreen();
const userInfoStore = useUserInfoStore();
const emits = defineEmits(['report']);
const downloadVersionAuth = inject('PERMISSION_LIST');

const columns = [
  { label: t('download.TABLE_HEAD[0]'), key: 'name' },
  { label: t('download.TABLE_HEAD[1]'), key: 'size' },
  { label: t('download.TABLE_HEAD[3]'), key: 'sha_code' },
  { label: t('download.TABLE_HEAD[2]'), key: 'down_url' },
  { label: props.options?.docs ? t('download.TABLE_HEAD[4]') : '', key: 'docsName' },
];

// 复制sha值
const shaText = 'SHA256';
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

// 下载权限
const changeDownloadAuth = () => {
  downloadDlg.value = true;
};

const downloadDlg = ref(false);
const dlgAction: Ref<DialogActionT[]> = ref([
  {
    id: 'cancel',
    label: i18n.value.download.DONNLOAD_CANCEL,
    variant: 'outline',
    onClick: () => {
      downloadDlg.value = false;
    },
  },
  {
    id: 'ok',
    label: i18n.value.download.DONNLOAD_COMFIRM,
    color: 'primary',
    variant: 'solid',
    onClick: () => {
      doLogin();
    },
  },
]);

const collectDownloadData = (name: string) => {
  emits('report', name);
};

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
</script>

<template>
  <template v-if="gtPadV">
    <!-- pc -->
    <OTable :columns="columns" :data="options.content" style="width: 100%">
      <template #td_name="{ row }">
        {{ row.name }}
        <template v-if="row.name.includes('noLSE')">
          <OPopover position="top" trigger="hover">
            <template #target>
              <OIcon> <IconTips ref="installRef" class="server-tips" /></OIcon>
            </template>
            <div class="lse-content">
              支持ARMv8.1以下芯片，适配飞腾2000和鲲鹏916平台（LSE即大型系统扩展指令集从ARMv8.1开始引入，ARMv8.1以下芯片不支持该特性）
            </div>
          </OPopover>
        </template>
      </template>
      <template #td_size="{ row }">
        {{ row.size }}
      </template>
      <template #td_down_url="{ row }">
        <div v-if="row.down_url !== ''" class="down-action">
          <template v-if="downloadVersionAuth.includes(versionShown) && !userInfoStore.username">
            <OButton variant="outline" size="small" color="primary" @click="changeDownloadAuth">
              {{ i18n.download.BTN_TEXT }}
              <template #suffixIcon>
                <IconDownload />
              </template>
            </OButton>
          </template>
          <template>
            <OButton size="small" :href="row.down_url" @click="collectDownloadData(row.name)" variant="outline" color="primary">
              {{ i18n.download.BTN_TEXT }}
              <template #suffixIcon>
                <IconDownload />
              </template>
            </OButton>
          </template>
        </div>
      </template>
      <template #td_sha_code="{ row }">
        <div v-if="row.x86_url !== ''" class="down-action">
          <span class="sha-link" @click="handleUrlCopy(row.sha_code, $event)">
            {{ shaText
            }}<OIcon>
              <IconCopy />
            </OIcon>
          </span>
        </div>
      </template>
      <template #td_docsName="{ row }">
        <a
          v-if="row.docsName !== ''"
          :href="row.docs_url.includes('https') ? row.docs_url : DOCS_LINK + lang + row.docs_url"
          target="_blank"
          rel="noopener noreferrer"
          >{{ row.docsName }}</a
        >
      </template>
    </OTable>
  </template>
  <!-- 手机端 -->
  <ul v-else class="download-mobile">
    <li v-for="item in options.content" :key="item.name" class="download-item">
      <p class="title">{{ item.name }}</p>
      <p class="item-text">
        <span>{{ i18n.download.TABLE_HEAD[1] }}</span
        ><span class="text-size">{{ item.size }}</span>
      </p>
      <p class="item-text">
        <span>{{ i18n.download.TABLE_HEAD[3] }}</span>
        <OLink class="down-copy" size="mini" type="text" @click="handleUrlCopy(item.sha_code, $event)">
          {{ shaText }}
          <template #suffix>
            <IconCopy />
          </template>
        </OLink>
      </p>
      <p class="item-text">
        <span>{{ i18n.download.TABLE_HEAD[2] }}</span>
        <a v-if="downloadVersionAuth.includes(versionShown) && !userInfoStore.username" @click="changeDownloadAuth"> {{ i18n.download.BTN_TEXT_MO }}</a>
        <a v-else :href="item.down_url" download @click="collectDownloadData(item.name)">
          {{ i18n.download.BTN_TEXT_MO }}
        </a>
      </p>
      <p v-if="item.docsName" class="item-text">
        <span>{{ i18n.download.TABLE_HEAD[4] }}</span>
        <a :href="item.docs_url.includes('https') ? item.docs_url : DOCS_LINK + lang + item.docs_url" target="_blank" rel="noopener noreferrer">{{
          item.docsName
        }}</a>
      </p>
    </li>
  </ul>
  <!-- 登录弹窗 -->
  <ODialog v-if="downloadDlg" v-model:visible="downloadDlg" :unmount-on-hide="false" @change="onDlgChane" size="small" :actions="dlgAction">
    <template #header>{{ i18n.download.DONNLOAD_TIPS }}</template>
    <div>{{ i18n.download.DONNLOAD_TEXT }}</div>
  </ODialog>
</template>

<style lang="scss" scoped>
.o-table {
  --table-head-bg: var(--o-color-fill1);
}
.sha-link {
  color: var(--o-color-info2);
  display: flex;
  align-items: center;
  cursor: pointer;
  @include tip1;
  &:hover {
    color: var(--o-color-primary1);
  }
  .o-icon {
    margin-left: 4px;
  }
  svg {
    width: 16px;
    height: 16px;
  }
}
.lse-content {
  max-width: 310px;
  padding: 3px 5px;
}
.download-mobile {
  margin-top: var(--e-spacing-h5);
  .download-item {
    padding: var(--e-spacing-h5);
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
