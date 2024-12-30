import { BAIDU_HM } from '@/data/url-config';
import {
  OpenAnalytics,
  OpenEventKeys,
  getClientInfo,
} from '@opensig/open-analytics';
import { reportAnalytics } from '@/api/api-analytics';

export const oa = new OpenAnalytics({
  appKey: 'openGauss',
  request: (data) => {
    reportAnalytics(data);
  },
});

export const reportPV = () => {
  oa.report(OpenEventKeys.PV);
};

export const reportPerformance = () => {
  oa.report(OpenEventKeys.LCP);
  oa.report(OpenEventKeys.INP);
  oa.report(OpenEventKeys.PageBasePerformance);
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
