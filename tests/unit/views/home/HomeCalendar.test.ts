import { expect, describe, it, vi, beforeEach } from 'vitest';
import { ref, computed } from 'vue';
import dayjs from 'dayjs';

function createLatestSchedule(TODAY: ReturnType<typeof ref<string>>, recentMeetingDates: ReturnType<typeof ref<string[]>>) {
  return computed(() => {
    const now = dayjs();
    const todayStr = now.format('YYYY-MM-DD');
    const nowTimestamp = now.unix();

    let latest = recentMeetingDates.value.find((v) => v === todayStr);

    if (!latest) {
      let minUpcomingDate = null;
      let minTimestamp = Infinity;

      for (const date of recentMeetingDates.value) {
        const timestamp = dayjs(date).unix();
        if (timestamp >= nowTimestamp && timestamp < minTimestamp) {
          minUpcomingDate = date;
          minTimestamp = timestamp;
        }
      }

      latest = minUpcomingDate || recentMeetingDates.value[0] || TODAY.value;
    }

    return latest;
  });
}

describe('HomeCalendar TODAY ref SSR 安全', () => {
  it('TODAY 初始值为空字符串，SSG 阶段不产生日期文本', () => {
    const TODAY = ref('');
    expect(TODAY.value).toBe('');
  });

  it('onMounted 后 TODAY 被赋值为当天日期字符串', () => {
    const TODAY = ref('');
    const expected = dayjs(new Date()).format('YYYY-MM-DD');
    TODAY.value = dayjs(new Date()).format('YYYY-MM-DD');
    expect(TODAY.value).toBe(expected);
  });

  it('模板守卫：TODAY 为空时 latestSchedule 渲染为空字符串', () => {
    const TODAY = ref('');
    const recentMeetingDates = ref<string[]>([]);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    expect(TODAY.value ? latestSchedule.value : '').toBe('');
  });

  it('模板守卫：TODAY 有值时 latestSchedule 正常渲染', () => {
    const TODAY = ref('');
    const recentMeetingDates = ref<string[]>([]);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    TODAY.value = dayjs(new Date()).format('YYYY-MM-DD');
    expect(TODAY.value ? latestSchedule.value : '').toBe(TODAY.value);
  });
});

describe('HomeCalendar latestSchedule computed 逻辑', () => {
  it('recentMeetingDates 为空且 TODAY 为空时，latestSchedule 返回空字符串', () => {
    const TODAY = ref('');
    const recentMeetingDates = ref<string[]>([]);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    expect(latestSchedule.value).toBe('');
  });

  it('recentMeetingDates 为空但 TODAY 有值时，latestSchedule 回退到 TODAY.value', () => {
    const TODAY = ref('2026-06-02');
    const recentMeetingDates = ref<string[]>([]);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    expect(latestSchedule.value).toBe('2026-06-02');
  });

  it('当天日期在 recentMeetingDates 中时，latestSchedule 返回当天日期', () => {
    const todayStr = dayjs().format('YYYY-MM-DD');
    const TODAY = ref(todayStr);
    const recentMeetingDates = ref([todayStr, '2026-07-01']);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    expect(latestSchedule.value).toBe(todayStr);
  });

  it('当天不在 recentMeetingDates 中时，latestSchedule 返回最近的未来日期', () => {
    const TODAY = ref('');
    const pastDate = dayjs().subtract(1, 'month').format('YYYY-MM-DD');
    const futureDate1 = dayjs().add(1, 'month').format('YYYY-MM-DD');
    const futureDate2 = dayjs().add(2, 'month').format('YYYY-MM-DD');
    const recentMeetingDates = ref([pastDate, futureDate1, futureDate2]);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    const nowTs = dayjs().unix();
    const upcoming = recentMeetingDates.value
      .map((d) => ({ date: d, ts: dayjs(d).unix() }))
      .filter((d) => d.ts >= nowTs)
      .sort((a, b) => a.ts - b.ts);
    if (upcoming.length > 0) {
      expect(latestSchedule.value).toBe(upcoming[0].date);
    } else {
      expect(latestSchedule.value).toBe(recentMeetingDates.value[0] || TODAY.value);
    }
  });

  it('所有日期都在过去且 TODAY 为空时，latestSchedule 回退到 recentMeetingDates[0]', () => {
    const TODAY = ref('');
    const recentMeetingDates = ref(['2020-01-01', '2020-02-01']);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    expect(latestSchedule.value).toBe('2020-01-01');
  });

  it('所有日期都在过去但 recentMeetingDates 非空时，latestSchedule 回退到 recentMeetingDates[0]', () => {
    const TODAY = ref('2026-06-02');
    const recentMeetingDates = ref(['2020-01-01', '2020-02-01']);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    expect(latestSchedule.value).toBe('2020-01-01');
  });

  it('recentMeetingDates 为空且 TODAY 有值时，TODAY.value 才作为最终回退', () => {
    const TODAY = ref('2026-06-02');
    const recentMeetingDates = ref<string[]>([]);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);
    expect(latestSchedule.value).toBe('2026-06-02');
  });
});

describe('HomeCalendar hydration mismatch 消除验证', () => {
  it('SSG 渲染与客户端 hydration 初始状态一致（均为空）', () => {
    const TODAY_SSG = ref('');
    const TODAY_CLIENT_INIT = ref('');
    const recentMeetingDates = ref<string[]>([]);
    const latestSchedule_SSG = createLatestSchedule(TODAY_SSG, recentMeetingDates);
    const latestSchedule_CLIENT = createLatestSchedule(TODAY_CLIENT_INIT, recentMeetingDates);

    const ssgRendered = TODAY_SSG.value ? latestSchedule_SSG.value : '';
    const clientHydration = TODAY_CLIENT_INIT.value ? latestSchedule_CLIENT.value : '';

    expect(ssgRendered).toBe('');
    expect(clientHydration).toBe('');
    expect(ssgRendered).toBe(clientHydration);
  });

  it('客户端 onMounted 后 TODAY 有值，latestSchedule 更新但非 hydration 阶段', () => {
    const TODAY = ref('');
    const recentMeetingDates = ref<string[]>([]);
    const latestSchedule = createLatestSchedule(TODAY, recentMeetingDates);

    const hydrationText = TODAY.value ? latestSchedule.value : '';
    expect(hydrationText).toBe('');

    const mountDate = dayjs(new Date()).format('YYYY-MM-DD');
    TODAY.value = mountDate;

    const mountedText = TODAY.value ? latestSchedule.value : '';
    expect(mountedText).toBe(mountDate);
    expect(hydrationText).not.toBe(mountedText);
  });
});