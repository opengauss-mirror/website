<script lang="ts" setup>
import { computed, type PropType } from 'vue';
import { useVModel } from '@vueuse/core';
import { OCheckbox } from '@opensig/opendesign';

import dayjs from 'dayjs';
import { getPointStr } from '~@/shared/meeting';
import NotificationItemSystem from './NotificationItemSystem.vue';
import { CYCLE_TYPE_OPTIONS } from '~@/data/notifications';
import { findLabelFromOptions, resolveDate } from '~@/shared/utils';

const props = defineProps({
  // 是否选中
  checked: {
    type: Array as PropType<(string | number)[]>,
    default: () => [],
  },
  // 消息ID
  eventId: {
    type: String,
    default: '',
  },
  // 消息类型
  type: {
    type: String,
    default: '',
  },
  // 消息标题
  title: {
    type: String,
    default: '',
  },
  // 消息内容
  summary: {
    type: String,
    default: '',
  },
  // 是否已读
  isRead: {
    type: Boolean,
    default: false,
  },
  // 创建时间
  createdTime: {
    type: String,
    default: '',
  },
  // 选中tab
  tab: {
    type: String,
    default: '',
  },
});

const emits = defineEmits<{
  (e: 'update:checked'): void;
  (e: 'delete', id: string): void;
  (e: 'read', id: string, tip?: boolean): void;
}>();

const checked = useVModel(props, 'checked', emits);

// -------------------- 触发已读 --------------------
const clickItem = () => {
  emits('read', props.eventId, !props.isRead);
};

const computedSummary = computed(() => {
  if (props.type === 'meeting') {
    try {
      const json = JSON.parse(props.summary);
      const {
        Action,
        CheckSingleMeeting,
        CycleEnd,
        CycleEndDate,
        CycleInterval,
        CycleStart,
        CycleStartDate,
        CycleType,
        CyclePoint = '',
        Date,
        End,
        GroupName,
        IsCycyle,
        Start,
      } = json;
      let result = `${GroupName} SIG小组`;
      if (Action === 'create_meeting') {
        result += '邀请您参加';
      }
      if (Action === 'update_meeting') {
        result += '【修改】';
      }
      if (Action === 'delete_meeting') {
        result += '【取消】';
      }
      if (IsCycyle === 'false') {
        result += `${dayjs(Date).format('YYYY/MM/DD')} ${Start}-${End} 的会议`;
      } else {
        if (CheckSingleMeeting === 'false') {
          result += `${dayjs(CycleStartDate).format('YYYY/MM/DD')} 至 ${dayjs(CycleEndDate).format('YYYY/MM/DD')}`;
          const typeMap = {
            Day: 0,
            Week: 1,
            Month: 2,
          };
          const point = CyclePoint.split(',').map((v) => Number(v));
          result += ` 每${CycleInterval > 1 ? CycleInterval : ''}${findLabelFromOptions(typeMap[CycleType], CYCLE_TYPE_OPTIONS)}${getPointStr(typeMap[CycleType], point)}`;
          result += ` ${CycleStart} 到 ${CycleEnd}`;
        } else {
          result += `${dayjs(Date).format('YYYY/MM/DD')} ${Start}-${End}`;
        }
        result += ' 的周期会议';
      }
      return result;
    } catch (error) {
      return props.summary;
    }
  } else {
    return props.summary;
  }
});
</script>

<template>
  <div class="notification-item">
    <div class="notification-item-content">
      <OCheckbox v-model="checked" :value="1"></OCheckbox>
      <div class="notification-content" @click="clickItem">
        <NotificationItemSystem :type="type" :title="title" :summary="computedSummary" :is-read="isRead" />
      </div>
      <div class="notification-time">{{ resolveDate(createdTime) }}</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.notification-item {
  position: relative;
  padding: 8px 0;

  .notification-item-content {
    display: flex;
    padding: var(--o-gap-section-4) var(--o-gap-section-3) var(--o-gap-section-4) 8px;
  }

  .notification-item-content {
    @include hover {
      background-color: var(--o-color-fill3);
      border-radius: var(--o-radius-xs);
    }
  }

  .notification-content {
    flex: 1;
  }

  .notification-time {
    display: flex;
    align-items: flex-end;
    padding-right: 12px;
    color: var(--o-color-info3);
    @include tip1;
  }
  :deep(.o-checkbox) {
    width: 24px;
    margin-right: 8px;
  }
}


.notification-item:not(:first-child)::after {
  position: absolute;
  content: '';
  left: 32px;
  top: 0;
  right: 0;
  border-bottom: 1px solid rgba(var(--o-black), 0.1);
}
</style>
