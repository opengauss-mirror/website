<script lang="ts" setup>
import { ref, inject, Ref } from 'vue';
import { type DialogActionT, useMessage, OButton, ODialog, OIcon } from '@opensig/opendesign';
import { useClipboard } from '@/components/hooks/useClipboard';
import { useI18n } from '~@/i18n';
import { doLogin } from '@/shared/login';
import { useUserInfoStore } from '@/stores/user';
import { useScreen } from '~@/composables/useScreen';

import IconDownload from '~icons/app/icon-download.svg';
import IconCopy from '~icons/app/icon-copy2.svg';

defineProps({
  data: {
    required: true,
    type: Object,
    default: () => {
      return {};
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

const message = useMessage();
const i18n = useI18n();
const { lePadV } = useScreen();

const downloadVersionAuth = inject('PERMISSION_LIST');

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
const userInfoStore = useUserInfoStore();
const changeDownloadAuth = () => {
  downloadDlg.value = true;
};

const downloadDlg = ref(false);
const dlgAction: Ref<DialogActionT[]> = ref([
  {
    id: 'cancel',
    label: i18n.value.download.DOWNLOAD_CANCEL,
    variant: 'outline',
    onClick: () => {
      downloadDlg.value = false;
    },
  },
  {
    id: 'ok',
    label: i18n.value.download.DOWNLOAD_COMFIRM,
    color: 'primary',
    variant: 'solid',
    onClick: () => {
      doLogin();
    },
  },
]);

const emits = defineEmits(['report']);
const collectDownloadData = (name: string) => {
  emits('report', name);
};
</script>

<template>
  <div class="software-box">
    <div class="software-size">
      <p v-if="type === 'symbol'">
        {{ data.name }} <span class="tag">{{ data.size }}</span>
      </p>
      <p v-else>
        <span class="text">{{ $t('download.TABLE_HEAD[1]') }}：</span><span class="size">{{ data.size }}</span>
      </p>
    </div>
    <div class="software-info">
      <div class="software-code">
        <span class="text">{{ $t('download.TABLE_HEAD[3]') }}：</span>
        <span
          v-if="data.sha_code !== ''"
          class="sha-link"
          @click="handleUrlCopy(data.sha_code, $event)"
          v-analytics.bubble="{
            target: shaText,
            ...(type === 'symbol' ? { level7: data.name } : {}),
          }"
        >
          {{ shaText
          }}<OIcon>
            <IconCopy />
          </OIcon>
        </span>
      </div>
      <!-- 软件包下载 -->
      <div v-if="data.down_url !== ''" class="down-action">
        <span v-if="lePadV" class="text">{{ $t('download.TABLE_HEAD[1]') }}：</span>
        <template v-if="downloadVersionAuth.includes(versionShown) && !userInfoStore.username">
          <OButton
            :variant="lePadV ? 'text' : type === 'symbol' ? 'outline' : 'solid'"
            size="small"
            color="primary"
            @click="changeDownloadAuth"
            v-analytics.bubble="{
              ...(type === 'symbol' ? { level7: data.name } : {}),
              target: i18n.download.BTN_TEXT,
            }"
          >
            {{ i18n.download.BTN_TEXT }}
            <template #suffixIcon>
              <IconDownload />
            </template>
          </OButton>
        </template>
        <template v-else>
          <OButton
            size="small"
            :href="data.down_url"
            @click="collectDownloadData(data.name)"
            :variant="lePadV ? 'text' : type === 'symbol' ? 'outline' : 'solid'"
            color="primary"
            v-analytics.bubble="{
              ...(type === 'symbol' ? { level7: data.name } : {}),
              target: i18n.download.BTN_TEXT,
            }"
          >
            {{ i18n.download.BTN_TEXT }}
            <template #suffixIcon>
              <IconDownload />
            </template>
          </OButton>
        </template>
      </div>
    </div>
    <!-- 登录弹窗 -->
    <ODialog v-if="downloadDlg" v-model:visible="downloadDlg" :unmount-on-hide="false" size="small" :actions="dlgAction">
      <template #header>{{ i18n.download.DOWNLOAD_TIPS }}</template>
      <div>{{ i18n.download.DOWNLOAD_TEXT }}</div>
    </ODialog>
  </div>
</template>

<style lang="scss" scoped>
.software-box {
  display: flex;
  --card-radius: 8px;
  border-radius: var(--card-radius);
  justify-content: space-between;
  background: var(--o-color-fill1);
  padding: 16px;
  @include tip1;
  color: var(--o-color-info1);
  @include respond-to('<=pad_v') {
    --card-radius: 4px;
    padding: 12px 16px;
    flex-direction: column;
    gap: 8px;
    @include text2;
  }
  + .software-box {
    margin-top: 16px;
  }
  .text {
    color: var(--o-color-info2);
  }
  .tag {
    display: inline-block;
    @include tip1;
    color: var(--o-color-info1);
    border-radius: 4px;
    border: 1px solid var(--o-color-control4);
    padding: 0 8px;
  }
  .software-info {
    display: flex;
    justify-content: space-between;
    @include respond-to('<=pad_v') {
      flex-direction: column;
      gap: 8px;
    }
  }
  .size {
    @include respond-to('<=pad_v') {
      margin-left: 8px;
    }
  }
  .software-code {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-right: 64px;

    @include respond-to('<=pad_v') {
      margin-right: 0;
      justify-content: flex-start;
    }
    .sha-link {
      margin-left: 8px;
      color: var(--o-color-info2);
      display: flex;
      align-items: center;
      cursor: pointer;
      @include tip1;
      @include respond-to('phone') {
        @include text2;
      }
      .o-icon {
        margin-left: 4px;
      }

      &:hover {
        color: var(--o-color-primary1);
      }
    }
  }
  .sha-link {
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
