<script setup lang="ts">
import { ref } from 'vue';
import type { MeetingItemT } from '@/@types/type-meeting';
import { windowOpen } from '@/shared/utils';

const props = defineProps<{
  data: MeetingItemT;
}>();
// 会议详情配置
const infoList = ref([
  { label: '会议详情', key: 'agenda' },
  { label: '发起人', key: 'sponsor' },
  { label: '会议时间', key: 'time' },
  { label: '会议平台', key: 'platform' },
  { label: '会议ID', key: 'mid' },
  { label: '会议链接', key: 'join_url', isLink: true },
  { label: 'Etherpad链接', key: 'etherpad', isLink: true },
]);
const domRef = ref([]);
// 复制会议内容
const copyInfo = () => {
  try {
    let text = `会议主题：${props.data.topic}\nSIG：${props.data.group_name}\n`;
    text += [...domRef.value].reduce((pre, cur) => `${pre}${cur.textContent}\n`, '');
    navigator.clipboard.writeText(text);
    return Promise.resolve();
  } catch (e) {
    return Promise.reject(e);
  }
};
defineExpose({ copyInfo });
const open = (info) => {
  if (info.isLink) {
    windowOpen(props.data[info.key]);
  }
};
</script>

<template>
  <div ref="domRef" class="label-item" :class="`label-item_${data.id}`" v-for="(info, infoIdx) in infoList" :key="infoIdx">
    <span class="label">{{ info.label }}：</span>
    <span :class="['value', info.isLink && 'link']" @click="open(info)">{{ data[info.key] || '-' }}</span>
  </div>
</template>

<style scoped lang="scss">
.label-item {
  color: var(--o-color-tex4);
  display: flex;
  align-items: flex-start;
  font-size: 14px;

  .label {
    width: 132px;
    flex-shrink: 0;
  }

  .value {
    word-break: break-all;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;

    &.link {
      color: var(--o-color-brand1);
      cursor: pointer;
    }
  }
}

.label-item + .label-item {
  margin-top: 4px;
}
</style>
