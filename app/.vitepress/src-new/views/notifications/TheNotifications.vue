<script setup lang="ts">
import {
  OMenu,
  OMenuItem,
  OCheckbox,
  OLink,
  OIconDelete,
  OPagination,
  ODivider,
  OIcon,
  OSkeleton,
  OSkeletonText,
  useMessage,
  OBadge,
  OTabPane,
  OTab,
} from '@opensig/opendesign';
import { computed, onMounted, ref } from 'vue';
import { useRouter } from 'vitepress';
import { storeToRefs } from 'pinia';

import ContentWrapper from '~@/components/ContentWrapper.vue';
import IconMarkRead from '~icons/app/icon-mark-read.svg';
import NotificationItem from './components/NotificationItem.vue';

import { useScreen } from '~@/composables/useScreen';
import { useLocale } from '~@/composables/useLocale';
import {
  NOTIFICATION_TYPE,
  DELETE_FAILED_MESSAGE,
  DELETE_SUCCESS_MESSAGE,
  DELETE_MULTIPLE_SUCCESS_MESSAGE,
  DELETE_MULTIPLE_FAILED_MESSAGE,
  MARK_READ_MULTIPLE_SUCCESS_MESSAGE,
  MARK_READ_MULTIPLE_FAILED_MESSAGE,
  MARK_READ_SUCCESS_MESSAGE,
  MARK_READ_FAILED_MESSAGE,
  NOTIFICATION_TYPE_TODO,
} from '~@/data/notifications';
import { geAllInfo, getMeetingInfo, setReadInfo, deleteInfo, getSystemInfo } from '~@/api/api-notification';

import { NotificationItemT } from '~@/@types/type-notifications';
import { useCountStore } from '~@/stores/notification';
import TodoList from '~@/views/notifications/components/TodoList.vue';
import AppEmpty from '~@/components/AppEmpty.vue';
import DeleteConfirmModal from '~@/views/notifications/components/DeleteConfirmModal.vue';

const { t } = useLocale();
const message = useMessage();
const countStore = useCountStore();
const router = useRouter();
const selectedMenuItem = ref(NOTIFICATION_TYPE.get(NOTIFICATION_TYPE_TODO)!!.value);

const { todo, meeting } = storeToRefs(countStore);

const totalList = computed(() => {
  return [todo.value, meeting.value];
});

const { isPhone } = useScreen();

// -------------------- 获取所有消息 --------------------
const notificationLists = ref<NotificationItemT[]>([]);
const loading = ref(false);
const queryAllParams = ref({
  page_num: 1,
  count_per_page: 10,
});

const getAll = async () => {
  queryAllParams.value.page_num = queryData.value.page_num;
  queryAllParams.value.count_per_page = queryData.value.count_per_page;
  if (queryData.value.unread) {
    queryAllParams.value.is_read = false;
  } else {
    delete queryAllParams.value.is_read;
  }
  try {
    const res = await geAllInfo(queryAllParams.value);
    notificationLists.value = res.query_info || [];
    notificationLists.value.forEach((item: NotificationItemT) => {
      item.checked = [];
    });
    total.value = res.count;
  } finally {
    loading.value = false;
  }
};

// -------------------- 获取会议通知消息 --------------------
const queryMeetingParams = ref({
  page_num: 1,
  count_per_page: 10,
  filter: 0,
});
const getMeeting = () => {
  queryMeetingParams.value.page_num = queryData.value.page_num;
  queryMeetingParams.value.count_per_page = queryData.value.count_per_page;
  if (queryData.value.unread) {
    queryMeetingParams.value.is_read = false;
  } else {
    delete queryMeetingParams.value.is_read;
  }
  getMeetingInfo(queryMeetingParams.value)
    .then((res) => {
      notificationLists.value = res.query_info || [];
      notificationLists.value.forEach((item: NotificationItemT) => {
        item.checked = [];
      });
      total.value = res.count;
      countStore.updateNoticeTotal();
    })
    .finally(() => {
      loading.value = false;
    });
};

// -------------------- 获取系统通知消息 --------------------
const querySystemParams = ref({
  page_num: 1,
  count_per_page: 10,
  filter: 0,
});
const getSystem = () => {
  querySystemParams.value.page_num = queryData.value.page_num;
  querySystemParams.value.count_per_page = queryData.value.count_per_page;
  if (queryData.value.unread) {
    querySystemParams.value.is_read = false;
  } else {
    delete querySystemParams.value.is_read;
  }
  getSystemInfo(querySystemParams.value)
    .then((res) => {
      notificationLists.value = res.query_info || [];
      notificationLists.value.forEach((item: NotificationItemT) => {
        item.checked = [];
      });
      total.value = res.count;
      countStore.updateNoticeTotal();
    })
    .finally(() => {
      loading.value = false;
    });
};

// -------------------- 选择框判断 --------------------
const selectAll = ref<(string | number)[]>([]); // 全选
const indeterminate = ref(false); // 全选的半选状态
const seletedNotificationIds = ref(new Set<string>()); // 已选择消息的id

const onItemCheckedChange = (item: NotificationItemT) => {
  if (item.checked.length > 0 && item.checked[0] === 1) {
    seletedNotificationIds.value.add(item.event_id);
  } else {
    seletedNotificationIds.value.delete(item.event_id);
  }

  indeterminate.value = seletedNotificationIds.value.size > 0 && seletedNotificationIds.value.size < notificationLists.value.length;
  if (seletedNotificationIds.value.size > 0 && seletedNotificationIds.value.size === notificationLists.value.length) {
    selectAll.value = [1];
  } else {
    selectAll.value = [];
  }
};

const onSelectAllChange = (val: (string | number)[]) => {
  indeterminate.value = false;
  if (val.length > 0 && val[0] === 1) {
    notificationLists.value.forEach((item) => {
      item.checked = [1];
      seletedNotificationIds.value.add(item.event_id);
    });
  } else {
    notificationLists.value.forEach((item) => {
      item.checked = [];
      seletedNotificationIds.value.delete(item.event_id);
    });
  }
};

// -------------------- 待办消息 --------------------
const todoRef = ref(null);
// -------------------- 获取消息列表数据 --------------------
const total = ref(0);
const queryData = ref({
  type: '',
  unread: false,
  page_num: 1,
  count_per_page: 10,
});

const getList = () => {
  loading.value = true;
  selectAll.value = [];
  indeterminate.value = false;
  seletedNotificationIds.value.clear();
  notificationLists.value = [];
  total.value = 0;

  // 会议通知消息
  if (selectedMenuItem.value === 'meeting') {
    getMeeting();
  } else if (selectedMenuItem.value === 'system') {
    getSystem();
  } else if (selectedMenuItem.value === NOTIFICATION_TYPE_TODO) {
    todoRef.value?.getList();
  } else if (!selectedMenuItem.value) {
    getAll();
  }
};


onMounted(() => {
  getList()
  countStore.updateNoticeTotal();
})

// -------------------- 全部/未读消息切换 --------------------
const notificationStatus = ref(0);
const onlyUnread = ref([]);
const changeOnlyUnread = (val: number[]) => {
  queryData.value.unread = val.length > 0;
  reloadData({
    page: 1,
    pageSize: queryData.value.count_per_page,
  });
};
const clickItem = (id: string, isRead = true) => {
  const canJump = !id.includes('delete_meeting');
  const row = notificationLists.value.find((item: NotificationItemT) => item.event_id === id);
  if (isRead && row) {
    setReadInfo([id]).then(() => {
      row.is_read = true;
      countStore.updateNoticeTotal();
    });
  }
  if (canJump && row) {
    window.open(row.source_url, '_blank', 'noopener noreferrer');
  }
};

// -------------------- 分页变化 --------------------
const changeTodoPage = ({page}) => {
  reloadData({ page, pageSize: queryData.value.count_per_page })
}
const reloadData = (val: { page: number; pageSize: number }) => {
  if (val.pageSize !== queryData.value.count_per_page) {
    queryData.value.page_num = 1;
  } else {
    queryData.value.page_num = val.page;
  }
  queryData.value.count_per_page = val.pageSize;
  getList();
};

const changeTotal = (val: number) => {
  total.value = val;
};

// ------------------------ 设置消息已读 --------------------
const updateSelectedReadStatus = (ids: string[], tip?: boolean, single?: boolean) => {
  setReadInfo(ids)
    .then(() => {
      if (tip) {
        message.success({
          content: single ? MARK_READ_SUCCESS_MESSAGE : MARK_READ_MULTIPLE_SUCCESS_MESSAGE,
        });
      }

      ids.forEach((id) => {
        const item = notificationLists.value.find((item) => item.event_id === id);
        if (item) {
          item.is_read = true;
        }
      });

      if (!single) {
        selectAll.value = [];
        onSelectAllChange(selectAll.value);
      }

      countStore.updateNoticeTotal();
    })
    .catch((err) => {
      if (tip) {
        message.danger({
          content: `${single ? MARK_READ_FAILED_MESSAGE : MARK_READ_MULTIPLE_FAILED_MESSAGE}: ${err.message}`,
        });
      }
    });
};

// ------------------------ 批量删除 --------------------
const showDeleteConfirm = ref(false);
const deleteLoading = ref(false)
const deleteConfirm = () => {
  showDeleteConfirm.value = false;
  deleteSelectedNotifications([...seletedNotificationIds.value]);
};

const deleteSelectedNotifications = (ids: string[], single?: boolean) => {
  deleteLoading.value = true
  deleteInfo(ids)
    .then(() => {
      message.success({
        content: single ? DELETE_SUCCESS_MESSAGE : DELETE_MULTIPLE_SUCCESS_MESSAGE,
      });

      countStore.updateNoticeTotal();

      reloadData({
        page: ids.length < notificationLists.value.length ? queryData.value.page_num : 1,
        pageSize: queryData.value.count_per_page,
      });
    })
    .catch((err) => {
      message.danger({
        content: `${single ? DELETE_FAILED_MESSAGE : DELETE_MULTIPLE_FAILED_MESSAGE}: ${err.message}`,
      });
    })
    .finally(() => {
      deleteLoading.value = false
    });
};

// ------------------------ 切换消息类型 --------------------
const isAllTab = ref(false);
const changeTab = (val: string, flag = true) => {
  (queryData.value.type = (NOTIFICATION_TYPE.get(val)?.types || []).join(',')), (selectedMenuItem.value = val);
  if (flag) {
    if (notificationStatus.value) {
      notificationStatus.value = 0;
    } else {
      isAllTab.value = !val;
      reloadData({
        page: 1,
        pageSize: queryData.value.count_per_page,
      });
    }
  }
};
</script>

<template>
  <ContentWrapper>
    <div class="notification-page">
      <div class="notification-page-content">
        <OTab v-if="isPhone" :line="false" @change="changeTab" v-model="selectedMenuItem">
          <OTabPane v-for="(item, i) in NOTIFICATION_TYPE.values()" :key="item.value" :value="item.value" :label="item.label">
            <template #nav>
              <div class="tab-item">
                <span>{{ item.label }}</span>
                <OBadge v-if="totalList[i]" :value="totalList[i] > 99 ? '99+' : totalList[i]" color="danger" class="message"></OBadge>
              </div>
            </template>
          </OTabPane>
        </OTab>
        <div class="notification-left">
          <h2 class="title">{{ t('notifications.center') }}</h2>
          <OMenu v-model="selectedMenuItem" @change="changeTab">
            <OMenuItem v-for="(item, i) in NOTIFICATION_TYPE.values()" :key="item.value" :value="item.value">
              {{ item.label }}
              <OBadge v-if="totalList[i]" :value="totalList[i]" color="danger" class="message"></OBadge>
            </OMenuItem>
          </OMenu>
        </div>
        <div class="notification-right">
          <template v-if="selectedMenuItem === NOTIFICATION_TYPE_TODO">
            <TodoList ref="todoRef" :page="queryData.page_num" :pageSize="queryData.count_per_page" @changeTotal="changeTotal" @changePage="changeTodoPage"></TodoList>
          </template>
          <template v-else>
            <div class="header">
              <div class="all-notification">
                <OCheckbox v-model="selectAll" :indeterminate="indeterminate" :value="1" @change="onSelectAllChange">
                  {{ seletedNotificationIds.size ? t('notifications.selectedNItem', [seletedNotificationIds.size]) : t('common.selectAll') }}
                </OCheckbox>
              </div>
              <div class="action">
                <template v-if="seletedNotificationIds.size > 0">
                  <OLink class="delete-link" @click="showDeleteConfirm = true">
                    <template #icon>
                      <OIcon><OIconDelete /></OIcon>
                    </template>
                    {{ t('notifications.delete') }}
                  </OLink>
                  <OLink @click="updateSelectedReadStatus([...seletedNotificationIds], true)">
                    <template #icon>
                      <OIcon><IconMarkRead /></OIcon>
                    </template>
                    {{ t('notifications.markRead') }}
                  </OLink>
                </template>
                <template v-else>
                  <OLink
                    @click="
                      updateSelectedReadStatus(
                        notificationLists.map((v) => v.event_id),
                        true
                      )
                    "
                  >
                    <template #icon>
                      <OIcon><IconMarkRead /></OIcon>
                    </template>
                    {{ t('notifications.allRead') }}
                  </OLink>
                </template>

                <ODivider direction="v"></ODivider>
                <OCheckbox v-model="onlyUnread" :value="1" @change="changeOnlyUnread">{{ t('notifications.onlyUnread') }}</OCheckbox>
              </div>
            </div>
            <ODivider direction="h"></ODivider>
            <!-- list -->
            <OSkeleton :animation="true" :loading="loading">
              <template #template>
                <OSkeletonText :rows="3" :style="{ width: '100%', '--skeleton-line-gap': '24px' }" />
                <OSkeletonText :rows="3" :style="{ width: '100%', '--skeleton-line-gap': '24px' }" />
                <OSkeletonText :rows="2" :style="{ width: '100%', '--skeleton-line-gap': '24px' }" />
              </template>

              <div v-if="total > 0" class="list">
                <NotificationItem
                  v-for="item in notificationLists"
                  v-model:checked="item.checked"
                  :key="item.event_id"
                  :event-id="item.event_id"
                  :type="item.type"
                  :title="item.title"
                  :summary="item.summary"
                  :is-read="item.is_read"
                  :created-time="item.created_at"
                  :tab="selectedMenuItem"
                  @read="clickItem"
                  @update:checked="onItemCheckedChange(item)"
                />
              </div>

              <AppEmpty v-else>
                {{ t('notifications.noMsg') }}
              </AppEmpty>
            </OSkeleton>
          </template>
        </div>
      </div>
      <div v-if="total > 0" class="notification-page-pagination">
        <OPagination
          :total="total"
          :page="queryData.page_num"
          :page-size="queryData.count_per_page"
          :page-sizes="[10, 20, 50]"
          :show-more="false"
          @change="reloadData"
          :simple="isPhone"
        />
      </div>
    </div>
    <!-- 翻页 -->
    <DeleteConfirmModal
      :num="seletedNotificationIds.size"
      v-model="showDeleteConfirm"
      @confirm="deleteConfirm"
      :loading="deleteLoading"
    ></DeleteConfirmModal>
  </ContentWrapper>
</template>

<style scoped lang="scss">
.notification-page {
  padding-top: var(--grid-column-gutter);
  padding-bottom: var(--o-gap-section);
  .notification-page-content {
    display: flex;
    align-items: stretch;
    justify-content: space-between;
    min-height: calc(100vh - 280px);
    @media (max-width: 1100px) {
      min-height: calc(100vh - 329px);
    }
  }

  :deep(.o-tab) {
    margin-bottom: 16px;
    .o-tab-navs {
      justify-content: flex-start;
      .o-tab-navs-wrap {
        overflow: visible;
        .tab-item {
          position: relative;
          .o-badge {
            position: absolute;
            top: -2px;
            right: -4px;
          }
        }
      }
    }
  }

  .notification-left {
    flex-shrink: 0;
    width: 348px;
    border-radius: var(--o-radius-xs);
    background: var(--o-color-fill2);
    padding: var(--grid-column-gutter);
    .title {
      font-weight: 500;
      margin-bottom: 32px;
      color: var(--o-color-info1);
      @include h2;
    }

    .o-menu {
      width: 100%;
      :deep(.o-menu-item) {
        --menu-item-radius: 4px;
      }
      .o-menu-item-selected {
        font-weight: 500;
        :deep(.o-menu-item-icon) {
          height: 24px;
          color: var(--o-color-ubmc);
        }
      }
      :deep(.o-menu-item-content) {
        display: flex;
        align-items: center;
      }
    }

    .o-badge {
      display: flex;
      align-items: center;
      margin-left: 8px;
    }
  }
  .notification-right {
    flex: 1;
    min-width: 0;
    margin-left: var(--grid-column-gutter);
    border-radius: var(--o-radius-xs);
    background: var(--o-color-fill2);
    padding: var(--grid-column-gutter);
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;

      @include respond-to('phone') {
        flex-wrap: wrap;
        gap: var(--o-gap-2);
      }

      .all-notification {
        display: flex;
        align-items: center;
      }
      .action {
        display: flex;
        align-items: center;
        gap: 24px;
        .o-divider {
          margin: 0;
        }
        :deep(.o-link) {
          .o-link-main {
            @include text1;
          }
        }
        :deep(.o-icon) {
          path {
            fill: currentColor;
          }
        }
        :deep(.o-link-prefix) {
          font-size: 22px;
          margin-right: var(--o-gap-2);
        }

        :deep(.o-link) {
          @include hover {
            color: var(--o-color-link1);
          }
        }

        .delete-link {
          @include hover {
            color: var(--o-color-danger1);
          }
        }
      }
    }
  }
  .notification-page-pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: var(--grid-column-gutter);
  }
}
</style>

