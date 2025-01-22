import { BAIDU_HM } from '@/data/url-config';
import {
  OpenAnalytics,
  OpenEventKeys,
  getClientInfo,
} from '@opensig/open-analytics';
import { reportAnalytics } from '@/api/api-analytics';
import { Awaitable } from 'vitepress';

const REGEXP = /^\/(?:zh|en)\/(cve)\/?/;

const pathServiceMap = {
  cve: 'cvemanager',
} as Record<string, string>;

export const oa = new OpenAnalytics({
  appKey: 'openGauss',
  request: (data) => {
    reportAnalytics(data);
  },
});

/**
 * @param event 事件名
 * @param eventData 上报数据
 * @param $service service字段取值
 * @param options options
 */
export const oaReport = <T extends Record<string, any>>(
  event: string,
  eventData?: T | ((...opt: any[]) => Awaitable<T>),
  $service = 'portal',
  options?: {
    immediate?: boolean;
    eventOptions?: any;
  }
) => {
  return oa.report(
    event,
    async (...opt) => ({
      $service,
      ...(typeof eventData === 'function'
        ? await eventData(...opt)
        : eventData),
    }),
    options
  );
};

export const reportPV = () => {
  const path = REGEXP.exec(window.location.pathname)?.[1];
  const service = path && pathServiceMap[path];
  oaReport(OpenEventKeys.PV, undefined, service);
};

export const reportPerformance = () => {
  oaReport(OpenEventKeys.LCP);
  oaReport(OpenEventKeys.INP);
  oaReport(OpenEventKeys.PageBasePerformance);
};

export const enableOA = () => {
  oa.setHeader(getClientInfo());
  oa.enableReporting(true);
};

export const initSensor = () => {
  // 百度统计
  (function () {
    const s = document.createElement('script');
    s.src = BAIDU_HM;
    s.classList.add('analytics-script');
    const head = document.getElementsByTagName('HEAD')[0];
    head.appendChild(s);
  })();

  // ds埋点
  enableOA();
  reportPV();
  reportPerformance();
};

export const removeSensor = () => {
  oa.enableReporting(false);
  const scripts = document.querySelectorAll('script.analytics-script');

  scripts.forEach((script) => {
    script.remove();
  });
};
