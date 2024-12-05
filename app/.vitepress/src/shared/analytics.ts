import { BAIDU_HM } from '@/data/url-config';

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
  (function () {
    const s1 = document.createElement('script');
    s1.src = '/allow_sensor/sensorsdata.min.js';
    s1.classList.add('analytics-script');

    const s2 = document.createElement('script');
    s2.src = '/allow_sensor/sensors.js';
    s2.classList.add('analytics-script');

    const head = document.getElementsByTagName('HEAD')[0];
    head.appendChild(s1);
    head.appendChild(s2);
  })();
};

export const removeSensor = () => {
  const scripts = document.getElementsByClassName('analytics-script');
  const head = document.getElementsByTagName('HEAD')[0];
  debugger;
  for (let i = 0, len = scripts.length; i < len; i++) {
    const script = scripts[i];
    if (script && head.contains(script)) {
      head.removeChild(script);
    }
  }
};
