<script setup lang="ts">
import { OSigDetail, OMeetingSigCalendar, OPlusConfigProvider } from '@opendesign-plus/components';

import bg from '~@/assets/category/sig/sig-detail-banner.png';
import bgDark from '~@/assets/category/sig/sig-detail-banner-dark.png';
import notFoundImg_light from '@/assets/illustrations/404.png';
import notFoundImg_dark from '@/assets/illustrations/404-dark.png';

import { OBreadcrumb, OBreadcrumbItem } from '@opensig/opendesign';
import { useData } from 'vitepress';
import { storeToRefs } from 'pinia';
import { useCommon } from '@/stores/common';
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import { getMeetingDateListApi, getSigContributeData, getSigInfo, getSigRepos } from '~@/api/api-sig';
import dayjs from 'dayjs';
import { getMeetingListApi } from '@/api/api-meeting';
import { useI18n } from '~@/i18n';
import { sigInfo } from '~@/data/sig';
import { MeetingItemT } from '@/shared/@types/type-meeting';
import { ETHERPAD_LINK } from '~@/data/url-config';

const { lang, params, frontmatter } = useData();
const { isDark, theme } = storeToRefs(useCommon());
const i18n = useI18n();

const sigName = computed(() => {
  return params.value?.sig || '';
});

const sigDetail = ref({});
const sigRepos = ref([] as any[]);

const getSigDetailInfo = async () => {
  const [info, repos] = await Promise.all([getSigInfo(sigName.value), getSigRepos(sigName.value)]);
  const detailData = info?.data ?? {};
  if (!detailData.description) {
    for (const sig of sigInfo[lang.value as 'zh' | 'en']) {
      if (detailData.name === sig.sig_name) {
        detailData.description = sig.description;
        detailData.subscribe_url = sig.mailweb_link;
        detailData.archive_url = sig.archive_link;
        detailData.etherpad_url = `${ETHERPAD_LINK}/p/${sigName.value}-meeting`
        detailData.git_url = detailData.sig_link;
        break;
      }
    }
  }
  if (detailData.maintainer_info) {
    detailData.maintainer_info = detailData.maintainer_info.map((item: any) => {
      return {
        ...item,
        ...(item.gitcode_id && { atomgit_id: item.gitcode_id }),
        user_login: item.gitcode_id || item.gitee_id,
        user_homepage_url: item.gitcode_id ? `https://atomgit.com/${item.gitcode_id}` : `https://gitee.com/${item.gitee_id}`,
        id_platform: item.gitcode_id ? 'atomgit_id' : 'atomgit_id',
      };
    });
  }
  if (detailData.committer_info) {
    detailData.committer_info = detailData.committer_info.map((item: any) => {
      return {
        ...item,
        ...(item.gitcode_id && { atomgit_id: item.gitcode_id }),
        user_login: item.gitcode_id || item.gitee_id,
        user_homepage_url: item.gitcode_id ? `https://atomgit.com/${item.gitcode_id}` : `https://gitee.com/${item.gitee_id}`,
        id_platform: item.gitcode_id ? 'atomgit_id' : 'atomgit_id',
      };
    });
  }
  detailData.meeting_agenda_zh = ['SIG版本规划工作会议遵循开源、开放原则, 议题收集、技术讨论、会议纪要等各讨论过程均对外开放'];
  detailData.meeting_agenda_en = [
    'Guided by open-source principles, SIG release planning meetings are completely open. Agenda collection, technical discussions, and meeting minutes are all publicly accessible.',
  ];
  sigDetail.value = detailData;
  sigRepos.value = repos?.data ?? [];
};

onMounted(() => {
  getSigDetailInfo();
});

const meetingListCache = new Map<string, MeetingItemT[]>();
onUnmounted(() => meetingListCache.clear());

// ----------------会议----------------
const getMeetingListRequest = async (date: string) => {
  if (meetingListCache.has(date)) {
    return meetingListCache.get(date);
  }
  const currentDate = dayjs(date).format('YYYY-MM-DD');
  let res = await getMeetingListApi(currentDate, sigName.value);
  res = res
    .filter((item) => item.group_name === sigName.value)
    .map((v) => {
      return {
        ...v,
        time: `${v.start || v.cycle_start}-${v.end || v.cycle_end}`,
        date: v.date || currentDate,
        type: 'meeting',
      };
    });
  meetingListCache.set(date, res);
  return res;
};

const getEventsListRequest = async () => {
  return [];
};

const cachedDateList = ref([] as any[]);
const getDateListRequest = async function* () {
  if (cachedDateList.value.length) {
    yield cachedDateList.value;
    return;
  }
  const today = dayjs().format('YYYY-MM-DD');
  const list = [today];
  for (let i = 1; i <= 4; i++) {
    list.push(
      dayjs()
        .add(0 - i, 'month')
        .format('YYYY-MM-DD')
    );
  }
  const resList = await Promise.allSettled(list.map(async (date) => await getMeetingDateListApi(date, sigName.value)));
  let res: string[] = [];
  resList.forEach((r) => {
    if (r.status === 'fulfilled') {
      res.push(...r.value);
    }
  });
  res = [...new Set(res)].sort((a, b) => +new Date(a) - +new Date(b));

  const reqSet = new Set<Promise<string>>();
  for (const date of res.toReversed()) {
    if (reqSet.size >= 3) {
      let dateList = await Promise.all(reqSet);
      dateList = dateList?.filter(d => !!d);
      if (dateList?.length) {
        cachedDateList.value.push(...dateList);
        yield dateList;
      }
      reqSet.clear();
      await nextTick();
    }
    reqSet.add(
      new Promise((resolve) => {
        getMeetingListRequest(date)
          .then((meetingList) => resolve(meetingList?.length ? date : ''))
          .catch(() => resolve(''));
      })
    );
  }
};

// ----------------贡献----------------
const getContributeData = async (params: any) => {
  return (await getSigContributeData(params))?.data || [];
};
</script>

<template>
  <div class="the-sig-detail">
    <OBreadcrumb>
      <OBreadcrumbItem :href="frontmatter.goBackUrl">{{ i18n.sig.sigCenter }}</OBreadcrumbItem>
      <OBreadcrumbItem>{{ sigName }}</OBreadcrumbItem>
    </OBreadcrumb>
    <OPlusConfigProvider :locale="lang" :theme="theme">
      <OSigDetail :sig-name="sigName" :sig-detail="sigDetail" :repositories="sigRepos" :getContributeData="getContributeData" :headerBg="isDark ? bgDark : bg">
        <template #meeting>
          <OMeetingSigCalendar
            :sigName="sigName"
            :is-stream-date-list="true"
            :empty-img="isDark ? notFoundImg_dark : notFoundImg_light"
            :getMeetingListRequest="getMeetingListRequest"
            :getEventsListRequest="getEventsListRequest"
            :getDateListRequest="getDateListRequest"
          >
          </OMeetingSigCalendar>
        </template>
      </OSigDetail>
    </OPlusConfigProvider>
  </div>
</template>
<style lang="scss" scoped>
.o-breadcrumb {
  @include respond-to('<=pad_v') {
    display: none;
  }
}

:deep(.o-sig-detail) {
  --grid-column-gutter: var(--o-r-grid-column-gutter);
}

:deep(.o-table) {
  --table-edge-padding: 24px;
  --table-radius: 4px;
  --table-head-bg: var(--o-color-control3-light) !important;
  th {
    font-size: var(--o-r-font_size-tip1) !important;
    line-height: var(--o-r-line_height-tip1) !important;
  }
}

:deep(.o-card) {
  --card-radius: 4px;
}

:deep(.o_box-main) {
  border-radius: 4px;
}

:deep(.o-pagination) {
  --pagination-radius: 4px;
}

.o-breadcrumb {
  margin-bottom: var(--o-r-gap-5);
}

.the-sig-detail {
  margin: 0 auto;
  padding-top: var(--o-r-gap-6);
  padding-bottom: var(--o-r-gap-10);
  width: var(--o-r-grid-section-width);
}

:deep(.o-table) {
  --table-head-bg: var(--o-color-primary1-light);
}

:deep(.o-sig-detail-name-box .o-link) {
  font-size: 16px;
  @media (max-width: 1680px) {
    font-size: 14px;
  }
}

:deep(.o-sig-floor-title) {
  @media (max-width: 600px) {
    font-size: 16px !important;
  }
}

:deep(.o-sig-detail-repo .o-link-normal) {
  --link-color: var(--o-color-primary1);
}

:deep(.o-sig-detail-name-box) {
  @include respond-to('phone') {
    flex-wrap: wrap;
    .o-sig-detail-name {
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}

:deep(.o-sig-meeting-aside .day-item.active) {
  background-color: var(--o-color-control3-light);
}

:deep(.o-sig-detail-meeting-card) {
  padding: var(--o-r-gap-5) !important;
}
:deep(.o-sig-detail-member-box) {
  padding: var(--o-r-gap-5) !important;
}
:deep(.o-sig-meeting-aside) {
  padding: var(--o-r-gap-5) !important;
}
:deep(.meeting-card-header .header-left) {
  padding-left: var(--o-r-gap-5) !important;
}
</style>
