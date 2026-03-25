<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { useLocale } from '~@/composables/useLocale';
import { OEventsCalendar, OPlusConfigProvider } from '@opendesign-plus-test/components';

import AppSection from '~@/components/AppSection.vue';
import EventsApply from './EventsApply.vue';
import { useCommon } from '~@/stores/common';
import { storeToRefs } from 'pinia';

const { t } = useLocale();
const { theme } = storeToRefs(useCommon());

const year = ref('');

onBeforeMount(() => {
  // 临时方案，避免引入组件导致颜色错乱
  const setAttribute = Element.prototype.setAttribute;
  Element.prototype.setAttribute = function (name, val) {
    if (this === document.documentElement && name.startsWith('data-o-theme')) {
      if (val === 'dark' && theme.value !== 'dark') {
        return;
      }
    }
    setAttribute.call(this, name, val);
  };
});

onMounted(() => {
  year.value = new Date().getFullYear().toString();
});

const eventList = [
  {
    name: '国际开源会议',
    type: 'summit',
    desc: '对开源顶会有任何疑问或建议，请联系<a href="mailto:marketing@opengauss.org">marketing@opengauss.org</a>',
    data: [
      {
        name: 'FOSSASIA Summit 2026',
        date: '2026/03/01',
        location: '泰国，曼谷',
      },
      {
        name: '开放院子开源生态大会2026',
        date: '2026/06/01',
        location: 'TBD',
      },
      {
        name: '中国数据库技术大会DTCC 2026',
        date: '2026/08/01',
        location: 'TBD',
      },
      {
        name: '华为全联接大会2026',
        date: '2026/09/01',
        location: '中国，上海',
      },
      {
        name: 'KubeCON + CloudNativeC on China',
        date: '2026/09/01',
        location: 'TBD',
      },
      {
        name: 'open Source Summit Europe 2026',
        date: '2026/10/01',
        location: 'TBD',
      },
      {
        name: 'openGauss Summit 2026',
        date: '2026/11/01',
        location: 'TBD',
      },
      {
        name: '开放原子开源开发者大会',
        date: '2026/12/01',
        location: 'TBD',
      },
    ],
  },
  {
    name: '生态技术会议',
    type: 'summit',
    data: [
      {
        name: '鲲鹏昇腾开发者大会 KADC 2026',
        date: '2026/04/01',
        location: 'TBD',
      },
      {
        name: 'openGauss Developer Day 2026',
        date: '2026/06/01',
        location: 'TBD',
      },
      {
        name: 'GOSIM China 2026',
        date: '2026/10/01',
        location: '中国深圳',
      },
    ],
  },
  {
    name: '开发者活动',
    type: 'events',
    desc: '如果您想组织社区活动，参与议题分享，请联系<a href="mailto:events@opengauss.sh">events@opengauss.sh</a>',
    data: [
      {
        name: 'openGauss oGRAC技术直播',
        date: '2026/02/01',
        location: 'Online',
        // link: 'https://baidu.com',
      },
    ],
  },
  {
    name: '高校 & 比赛',
    type: 'competition',
    isSpanMonth: true,
    data: [
      {
        name: '4月-11月 第六届开源之夏',
        date: ['2026/04/01', '2026/11/30'],
        align: 'center',
      },
      {
        name: '3月-11月 CCF开源创新大赛',
        date: ['2026/03/01', '2026/11/30'],
        align: 'center',
      },
      {
        name: '2026年度Hackthon软件难题挑战赛',
        date: ['2026/08/01', '2026/10/31'],
        align: 'center',
      },
    ],
  },
];
</script>

<template>
  <AppSection :title="`${year} 年度规划`">
    <!-- TODO -->
    <OPlusConfigProvider :theme="theme">
      <OEventsCalendar :data="eventList" />
    </OPlusConfigProvider>
  </AppSection>
  <AppSection :title="t('events.COLLECT_EVENTS')" subtitle="资源面向openGauss社区所有成员开放，欢迎与openGauss社区共同组织开发者活动，繁荣openGauss生态">
    <EventsApply />
  </AppSection>
</template>
