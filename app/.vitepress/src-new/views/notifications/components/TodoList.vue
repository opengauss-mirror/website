<script setup lang="ts">
import { OTab, OTabPane, OTable, OLink, OIcon, useMessage, OIconDelete, OCheckbox } from '@opensig/opendesign';
import { computed, onMounted, ref, watch } from 'vue';
import dayjs from 'dayjs';
import { useLocale } from '~@/composables/useLocale';
import { useCountStore } from '~@/stores/notification';
import { deleteInfo, getTodo } from '~@/api/api-notification';
import AppEmpty from '~@/components/AppEmpty.vue';
import ThFilter from '~@/components/ThFilter.vue';
import { GITCODE_LINK } from '~@/data/url-config';
import TooltipText from '~@/components/TooltipText.vue';
import IconOpen from '~icons/my/state-open.svg';
import IconProgress from '~icons/my/state-in-progress.svg';
import IconReject from '~icons/my/state-reject.svg';
import IconMerged from '~icons/my/state-merged.svg';
import IconClosed from '~icons/my/state-reject.svg';
import { resolveDate } from '~@/shared/utils';
import DeleteConfirmModal from '~@/views/notifications/components/DeleteConfirmModal.vue';
import {
  DELETE_MULTIPLE_FAILED_MESSAGE,
  DELETE_MULTIPLE_SUCCESS_MESSAGE,
} from '~@/data/notifications';

const emits = defineEmits(['changeTotal', 'changePage']);
const { t } = useLocale();
const message = useMessage();
const props = defineProps<{
  page: number;
  pageSize: number;
}>();

enum TODO_TYPE {
  ISSUE = 'issue',
  PR = 'pr',
  CVE = 'cve',
}
const activeTab = ref<TODO_TYPE>(TODO_TYPE.ISSUE);
const loading = ref(false);
const list = ref([]);
const total = ref(0);
const repoList = ref([]);
const selectedRepo = ref('');
const status = ref('');
const time = ref('');
const onlyUnread = ref([]);

const getParams = () => {
  let params = {
    count_per_page: props.pageSize,
    page_num: props.page,
    type: activeTab.value === TODO_TYPE.PR ? TODO_TYPE.PR : TODO_TYPE.ISSUE,
  };

  if (activeTab.value !== TODO_TYPE.PR) {
    Object.assign(params, {
      source: activeTab.value === TODO_TYPE.ISSUE ? GITCODE_LINK : TODO_TYPE.CVE,
    });
  }
  if (activeTab.value === TODO_TYPE.PR) {
    Object.assign(params, {
      source: GITCODE_LINK,
    });
  }
  if (selectedRepo.value) {
    Object.assign(params, {
      source_group: selectedRepo.value,
    });
  }
  if (status.value) {
    Object.assign(params, {
      state: status.value,
    });
  }
  if (time.value) {
    Object.assign(params, {
      start_time: dayjs()
        .add(0 - parseInt(time.value), 'days')
        .valueOf(),
    });
  }
  if (onlyUnread.value.length > 0 && onlyUnread.value[0] === 1) {
    Object.assign(params, {
      is_read: false,
    });
  }
  return params;
};

const getList = async () => {
  try {
    loading.value = true;
    const res = await getTodo(getParams());
    list.value = res.query_info || [];
    total.value = res.count || 0;
    repoList.value = (res.repo_list || []).map((v) => {
      return {
        label: v,
        value: v,
      };
    });
  } catch {
    list.value = [];
    total.value = 0;
    repoList.value = [];
  } finally {
    loading.value = false;
    emits('changeTotal', total.value);
  }
};

const changeFilter = () => {
  emits('changePage', {
    page: 1,
  });
};

watch(
  () => activeTab.value,
  () => {
    selectedRepo.value = '';
    status.value = '';
    time.value = '';
    checkedItems.value = []
    selectAll.value = []
    emits('changePage', {
      page: 1,
    });
  }
);

onMounted(() => {
  getList();
});
defineExpose({
  getList,
});

const columns = [
  { label: t('notifications.depository'), key: 'source_group' },
  { label: t('notifications.taskDesc'), key: 'summary' },
  { label: t('notifications.applyUser'), key: 'user' },
  { label: t('notifications.status'), key: 'state', style: { width: '120px' } },
  { label: t('notifications.applyTime'), key: 'time', style: { width: '148px' } },
];
// 申请时间列表
const timeOptions = [
  {
    label: t('notifications.all'),
    value: '',
  },
  {
    label: t('notifications.lastWeek'),
    value: '7',
  },
  {
    label: t('notifications.lastMonth'),
    value: '30',
  },
];

const statusOptions = computed(() => {
  if (activeTab.value === TODO_TYPE.PR) {
    return [
      {
        label: t('notifications.all'),
        value: '',
      },
      {
        label: t('notifications.open'),
        value: 'opened',
        icon: IconOpen,
      },
      {
        label: t('notifications.progressing'),
        value: 'progressing',
        icon: IconProgress,
      },
      {
        label: t('notifications.closed'),
        value: 'closed',
        icon: IconClosed,
      },
      {
        label: t('notifications.rejected'),
        value: 'rejected',
        icon: IconReject,
      },
    ];
  }
  return [
    {
      label: t('notifications.all'),
      value: '',
    },
    {
      label: t('notifications.open'),
      value: 'opened',
      icon: IconOpen,
    },
    {
      label: t('notifications.merged'),
      value: 'merged',
      icon: IconMerged,
    },
    {
      label: t('notifications.closed'),
      value: 'closed',
      icon: IconClosed,
    },
  ];
});

// 消息数量
const countStore = useCountStore();

// 获取状态图标
const getStateIcon = (state: string) => {
  const item = statusOptions.value.find((item) => item.value === state);
  return item?.icon || null;
};
// 获取状态描述
const getStateStatement = (state: string) => {
  const item = statusOptions.value.find((item) => item.value === state);
  if (item) {
    return item.label;
  } else {
    return state;
  }
};

const goToSourcePage = (url: string) => {
  window.open(url, '_blank', 'noopener noreferrer');
};
// -------------------- 多选 --------------------
const checkedItems = ref<any[]>([]);
const isIndeterminate = computed(() => checkedItems.value.length > 0 && checkedItems.value.length < list.value.length);
const selectAll = computed({
  set(val: number[]) {
    checkedItems.value = val?.length === 1 ? list.value.map((item: any) => item.event_id) : [];
  },
  get() {
    if (!list.value.length) return [];
    return checkedItems.value.length >= list.value.length ? [1] : [];
  }
});

const deleteLoading = ref(false);
const deleteModalVisible = ref(false);
const deleteItems = () => {
  deleteModalVisible.value = true;
};
const doDeleteInfo = () => {
  deleteLoading.value = true;
  deleteInfo(checkedItems.value)
    .then(() => {
      message.success({
        content: DELETE_MULTIPLE_SUCCESS_MESSAGE,
      });
      countStore.updateNoticeTotal();
      getList();
    })
    .catch((err) => {
      message.danger({
        content: `${DELETE_MULTIPLE_FAILED_MESSAGE}: ${err.message}`,
      });
    })
    .finally(() => {
      deleteLoading.value = false;
    });
};
</script>

<template>
  <div class="todo-list-wrapper">
    <div class="todo-header">
      <OTab v-model="activeTab" size="large" :lazy="true" variant="solid" class="nav-tabs" :line="false">
        <OTabPane :value="TODO_TYPE.ISSUE">
          <template #nav>
            <div>
              {{ t('notifications.todoIssue') }}
              <label>{{ countStore.issue ? `(${countStore.issue})` : null }}</label>
            </div>
          </template>
        </OTabPane>
        <OTabPane :value="TODO_TYPE.PR">
          <template #nav>
            <div>
              {{ t('notifications.todoPr') }}
              <label>{{ countStore.pr ? `(${countStore.pr})` : null }}</label>
            </div>
          </template>
        </OTabPane>
        <OTabPane :value="TODO_TYPE.CVE">
          <template #nav>
            <div>
              {{ t('notifications.todoCve') }}
              <label>{{ countStore.cve ? `(${countStore.cve})` : null }}</label>
            </div>
          </template>
        </OTabPane>
      </OTab>
      <div class="action">
        <template v-if="checkedItems.length > 0">
          <OLink class="delete-link" @click="deleteItems">
            <template #icon>
              <OIcon>
                <OIconDelete />
              </OIcon>
            </template>
            {{ t('notifications.delete') }}
          </OLink>
        </template>
      </div>
    </div>
    <DeleteConfirmModal v-model="deleteModalVisible" :num="checkedItems.length" @confirm="doDeleteInfo()"
      :loading="deleteLoading"></DeleteConfirmModal>
    <OTable :data="list" :columns="columns" :loading="loading">
      <template #header="{ columns }">
        <tr>
          <th v-for="item in columns" :key="item.key">
            <div v-if="item.key === 'source_group'" class="o-tab-head td_source_group">
              <OCheckbox v-model="selectAll" :value="1" :indeterminate="isIndeterminate">
              </OCheckbox>
              <ThFilter v-model="selectedRepo" :options="repoList" @change="changeFilter">{{ item.label }}</ThFilter>
            </div>
            <div v-if="item.key === 'summary'" class="o-tab-head td_summary">{{ item.label }}</div>
            <div v-if="item.key === 'user'" class="o-tab-head td_user">{{ item.label }}</div>
            <div v-if="item.key === 'state'" class="o-tab-head td_state">
              <ThFilter v-model="status" :options="statusOptions" @change="changeFilter">{{ item.label }}</ThFilter>
            </div>
            <div v-if="item.key === 'time'" class="o-tab-head td_time">
              <ThFilter v-model="time" :options="timeOptions" @change="changeFilter">{{ item.label }}</ThFilter>
            </div>
          </th>
        </tr>
      </template>
      <template #td_source_group="{ row }">
        <div class="td_source_group">
          <OCheckbox v-model="checkedItems" :value="row.event_id"></OCheckbox>
          <TooltipText :width="168">
            {{ row.source_group }}
          </TooltipText>
        </div>
      </template>
      <template #td_summary="{ row }">
        <div class="summary">
          <div class="td_summary">
            <TooltipText @click="goToSourcePage(row.source_url)" type="link">
              {{ row.summary }}
            </TooltipText>
          </div>
        </div>
      </template>
      <template #td_user="{ row }">
        <TooltipText :width="80">
          {{ row.user }}
        </TooltipText>
      </template>
      <template #td_state="{ row }">
        <div class="td_state">
          <div class="state-card">
            <OIcon class="icon icon-state">
              <component :is="getStateIcon(row.state)" />
            </OIcon>
            {{ getStateStatement(row.state) }}
          </div>
        </div>
      </template>
      <template #td_time="{ row }">
        <div class="td_time">
          {{ resolveDate(row.time) }}
        </div>
      </template>
      <template #empty>
        <AppEmpty>
          {{ t('notifications.noMsg') }}
        </AppEmpty>
      </template>
    </OTable>
  </div>
</template>

<style scoped lang="scss">
.delete-link {
  color: var(--o-color-info1);
  .o-icon {
    font-size: 24px;
  }
}
:deep(.o-table-wrap) {
  display: flex;
  overflow: auto;
  flex-direction: column;
  .o-table-tip-wrap {
    flex-grow: 1;
  }
}
.todo-list-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
  .todo-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .action {
      display: flex;
      align-items: center;
      gap: 24px;

      .o-divider {
        margin: 0;
      }
    }
  }
  :deep(.nav-tabs) {
    --tab-icon-color: var(--o-color-info1);
    --tab-nav-text-size: var(--o-font_size-text1);
    --tab-nav-color-active: var(--o-color-primary1);
    --tab-solid-nav-gap: 0;
    --tab-nav-bg-color: transparent;
    --tab-nav-bg-color-hover: transparent;
    .o-tab-navs-container {
      background-color: var(--o-color-fill1);
      border-radius: var(--o-gap-2);
      padding: var(--o-gap-1);
    }
    .o-tab-nav {
      border: none;
      border-radius: var(--o-gap-1);
    }
  }
  :deep(.o-table) {
    flex: 1 0 auto;
    --table-text-size: 14px;
    display: flex;
    align-items: stretch;
    .o-tab-head {
      font-size: 14px;
      font-weight: 500;
    }
    .summary {
      display: flex;
      align-items: center;
    }
    .td_source_group {
      display: flex;
      align-items: center;
      width: 200px;
    }
    .td_summary {
      width: 360px;
    }
    .td_user {
      display: flex;
      align-items: center;
      width: 80px;
    }
    .td_state {
      display: flex;
      align-items: center;
      .state-card {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 24px;
        width: 80px;
        border-radius: var(--o-radius-xs);
        border: 1px solid var(--e-color-border2);
        font-size: 12px;
        line-height: 18px;
        .icon-state {
          font-size: 16px;
          margin-right: var(--o-gap-1);
        }
      }
    }
    .td_time {
      display: flex;
      align-items: center;
      width: 96px;
    }
  }
}
</style>
