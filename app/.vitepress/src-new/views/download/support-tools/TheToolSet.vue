<script setup lang="ts">
import {
  OButton,
  OIcon,
  OLink,
  OOption,
  OPopover,
  ORadio,
  ORadioGroup,
  OSelect,
  OTable,
  OToggle,
  useMessage,
  ODialog,
  type DialogActionT,
} from '@opensig/opendesign';
import TagFilter from '~@/components/TagFilter.vue';
import IconCopy from '~icons/app/icon-copy2.svg';
import downloadData from '~@/data/download';
import { useCookieStore } from '@/stores/common';
import { getCustomCookie } from '@/shared/utils';
import { oaReport } from '@/shared/analytics';
import { doLogin } from '@/shared/login';
import { useData } from 'vitepress';
// import { useI18n } from '~@/i18n';
import { useUserInfoStore } from '@/stores/user';
import { computed, ref, watchEffect } from 'vue';
import { useClipboard } from '~@/composables/useClipboard';
import IconQuestion from '~icons/app/icon-question-mark.svg';
import { useScreen } from '~@/composables/useScreen';
import { Ref } from 'vue';
import { useI18n } from 'vue-i18n';

const _downloadData = downloadData.slice(0, 10) as (typeof downloadData)[1][];

interface FilterT {
  architecture: string;
  os: string;
}

const { gtPadV } = useScreen();
const { lang } = useData();
const { t } = useI18n();
const message = useMessage(null);
const userInfoStore = useUserInfoStore();

const versions = _downloadData.map((item) => ({ label: 'openGauss ' + item.name, value: item.name }));
const currentVersion = ref(versions[0].value);

const currentVersionTool = computed(() => {
  return _downloadData.find((item) => item.name === currentVersion.value)?.data[lang.value].filter((item) => item.category === 'openGauss Tools') || [];
});

const architectureList = computed<string[]>(() => {
  return Array.from(new Set(currentVersionTool.value.map((item: FilterT) => item.architecture).filter(Boolean)));
});
const activeArchitecture = ref(architectureList.value[0] || '');

const osList = computed<string[]>(() => {
  return Array.from(new Set(currentVersionTool.value.map((item: FilterT) => item.os).filter(Boolean)));
});
const activeOs = ref(osList.value?.[0] || '');

const matrix = computed(() => {
  const map = new Map<string, Set<string>>();
  currentVersionTool.value.forEach((item: FilterT) => {
    if (!map.has(item.architecture)) {
      map.set(item.architecture, new Set());
    }
    if (item.os) {
      map.get(item.architecture)?.add(item.os);
    }
  });
  return map;
});

const enabledOs = computed(() => matrix.value.get(activeArchitecture.value));

const columns = [
  { key: 'name', label: t('download.TABLE_HEAD[0]') },
  { key: 'size', label: t('download.TABLE_HEAD[1]') },
  { key: 'sha_code', label: t('download.TABLE_HEAD[3]') },
  { key: 'download', label: t('download.TABLE_HEAD[2]') },
];

const displayTools = computed(() => {
  return currentVersionTool.value.filter((item: any) => {
    return item.architecture === activeArchitecture.value && item.os === activeOs.value;
  });
});

watchEffect(() => {
  if (enabledOs.value && !enabledOs.value.has(activeOs.value)) {
    activeOs.value = osList.value?.[0] || '';
  }
});

// ----------------复制----------------
const isClipboard = ref(true);
const initClipboard = (text: string, e: MouseEvent) => {
  isClipboard.value = false;
  useClipboard({
    text,
    target: e,
    success: () => {
      message.success({
        content: t('common.COPY_SUCCESS'),
      });
      isClipboard.value = true;
    },
    error: () => {
      message.danger({
        content: t('common.COPY_FAILED'),
      });
      isClipboard.value = true;
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

const changeDownloadAuth = () => {
  downloadDlg.value = true;
};

const downloadDlg = ref(false);
const dlgAction: Ref<DialogActionT[]> = ref([
  {
    id: 'cancel',
    label: t('download.DONNLOAD_CANCEL'),
    variant: 'outline',
    onClick: () => {
      downloadDlg.value = false;
    },
  },
  {
    id: 'ok',
    label: t('download.DONNLOAD_COMFIRM'),
    color: 'primary',
    variant: 'solid',
    onClick: () => {
      doLogin();
    },
  },
]);

const cookieStore = useCookieStore();
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
</script>

<template>
  <section>
    <h2>{{ $t('tools.TOOLSET') }}</h2>
    <div class="card">
      <!-- 版本选择 -->
      <TagFilter v-if="gtPadV" class="architecture-box" :label="$t('download.VERSION')">
        <OSelect v-model="currentVersion">
          <OOption v-for="ver in versions" :label="ver.label" :value="ver.value" :key="ver.value"></OOption>
        </OSelect>
      </TagFilter>
      <template v-else>
        <p class="mobile-filter-label">{{ $t('download.VERSION') }}</p>
        <OSelect v-model="currentVersion">
          <OOption v-for="ver in versions" :label="ver.label" :value="ver.value" :key="ver.value"></OOption>
        </OSelect>
      </template>
      <!-- 架构选择 -->
      <TagFilter v-if="gtPadV" :label="$t('download.ARCHITECTURE')">
        <ORadioGroup v-model="activeArchitecture" style="--radio-group-gap: 8px">
          <ORadio v-for="item in architectureList" :key="item" :value="item">
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ item }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </TagFilter>
      <template v-else>
        <p class="mobile-filter-label">{{ $t('download.ARCHITECTURE') }}</p>
        <ORadioGroup v-model="activeArchitecture" style="--radio-group-gap: 8px">
          <ORadio v-for="item in architectureList" :key="item" :value="item">
            <template #radio="{ checked }">
              <OToggle :checked="checked">{{ item }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </template>
      <!-- os选择 -->
      <TagFilter v-if="gtPadV" class="os-box" :label="$t('download.OS')">
        <ORadioGroup v-model="activeOs" style="--radio-group-gap: 8px">
          <ORadio v-for="item in osList" :key="item" :value="item" :disabled="!enabledOs?.has(item)">
            <template #radio="{ checked, disabled }">
              <OToggle :checked="checked" :disabled="disabled">{{ item }}</OToggle>
            </template>
          </ORadio>
        </ORadioGroup>
      </TagFilter>
      <template v-else>
        <p class="mobile-filter-label">{{ $t('download.OS') }}</p>
        <OSelect v-model="activeOs">
          <OOption v-for="item in osList" :label="item" :value="item" :key="item"></OOption>
        </OSelect>
      </template>
      <!-- 表格 -->
      <OTable v-if="gtPadV" :columns="columns" :data="displayTools">
        <!-- 软件包类型 -->
        <template #td_name="{ row }">
          <span>{{ row.name }}</span>
          <OPopover v-if="row.name.includes('noLSE')" position="top" trigger="hover">
            <template #target>
              <OIcon>
                <IconQuestion />
              </OIcon>
            </template>
            <p class="lse-content">支持ARMv8.1以下芯片，适配飞腾2000和鲲鹏916平台（LSE即大型系统扩展指令集从ARMv8.1开始引入，ARMv8.1以下芯片不支持该特性）</p>
          </OPopover>
        </template>
        <!-- 完整性校验 -->
        <template #td_sha_code="{ row }">
          <OLink tag="button" @click="handleUrlCopy(row.sha_code, $event)">
            SHA256
            <template #suffix>
              <OIcon><IconCopy /></OIcon>
            </template>
          </OLink>
        </template>
        <!-- 软件包下载 -->
        <template #td_download="{ row }">
          <OButton v-if="!userInfoStore.username" variant="outline" color="primary" size="small" @click="changeDownloadAuth">
            {{ $t('download.BTN_TEXT') }}
          </OButton>
          <OButton v-else size="small" :href="row.down_url" @click="collectDownloadData(row.name)" variant="outline" color="primary">
            {{ $t('download.BTN_TEXT') }}
          </OButton>
        </template>
      </OTable>
      <template v-else>
        <div class="mobile-download-item-card" v-for="item in displayTools" :key="item.name">
          <p class="item-name">{{ item.name }}</p>
          <p class="desc" v-if="item.name.includes('noLSE')">
            支持ARMv8.1以下芯片，适配飞腾2000和鲲鹏916平台（LSE即大型系统扩展指令集从ARMv8.1开始引入，ARMv8.1以下芯片不支持该特性）
          </p>
          <div class="info">
            <p>{{ $t('download.TABLE_HEAD[1]') }}</p>
            <p>{{ item.size }}</p>
            <p>{{ $t('download.TABLE_HEAD[3]') }}</p>
            <OLink tag="button" @click="handleUrlCopy(item.sha_code, $event)">
              SHA256
              <template #suffix>
                <OIcon><IconCopy /></OIcon>
              </template>
            </OLink>
            <p>{{ $t('download.TABLE_HEAD[2]') }}</p>
            <OLink v-if="!userInfoStore.username" tag="button" color="primary" @click="changeDownloadAuth">
              {{ $t('download.BTN_TEXT') }}
            </OLink>
            <OLink v-else :href="item.down_url" tag="button" @click="collectDownloadData(item.name)" color="primary">
              {{ $t('download.BTN_TEXT') }}
            </OLink>
          </div>
        </div>
      </template>
    </div>
    <!-- 登录弹窗 -->
    <ODialog v-if="downloadDlg" v-model:visible="downloadDlg" :unmount-on-hide="false" size="small" :actions="dlgAction">
      <template #header>{{ $t('download.DONNLOAD_TIPS') }}</template>
      <div>{{ $t('download.DONNLOAD_TEXT') }}</div>
    </ODialog>
  </section>
</template>

<style lang="scss" scoped>
.mobile-filter-label {
  @include text2;
  margin-bottom: 8px;
  &:not(:first-of-type) {
    margin-top: 12px;
  }
}

.mobile-download-item-card {
  border-radius: 4px;
  background-color: var(--o-color-fill1);
  margin-top: 12px;
  padding: 16px;
  @include text2;
  .item-name {
    margin-bottom: 12px;
  }
  .desc {
    @include tip1;
  }
  .info {
    display: grid;
    grid-template-columns: auto auto;
    column-gap: 16px;
    row-gap: 12px;
    .o-link {
      text-align: start;
    }
  }
}

.o-link {
  @include text1;
  .o-icon {
    @include h2;
  }
  --btn-bg-color-hover: transparent;
  --btn-bg-color-active: transparent;
}

.lse-content {
  max-width: 310px;
  padding: 3px 5px;
}

.tag-filter {
  padding: 0;
  &:not(:last-child) {
    margin-bottom: 16px;
  }
  grid-template-columns: 100px auto;
  :deep(.label) {
    width: 100px;
  }
}

.o-table {
  --table-cell-padding: 16px 0 16px 20px;
  --table-head-bg: rgb(var(--o-mixedgray-4));
  --table-row-hover: var(--o-color-fill3);
}

.o-toggle {
  --toggle-bg-color: rgb(var(--o-mixedgray-4));
}

.card {
  width: 100%;
  padding: 32px;
  border-radius: 4px;
  background: var(--o-color-fill2);
  margin-top: 40px;
  @include respond-to('<=pad_v') {
    margin-top: 12px;
  }
  .architecture-box {
    @media (max-width: 1100px) {
      padding-left: 0;
    }
  }
}
</style>
