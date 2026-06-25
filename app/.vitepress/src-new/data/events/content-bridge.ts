import activityContent from '#content/activity';
import beijing from '~@/assets/category/events/list-posters/beijing.png';
import xian from '~@/assets/category/events/list-posters/xian.png';
import chengdu from '~@/assets/category/events/list-posters/chengdu.png';
import guangzhou from '~@/assets/category/events/list-posters/guangzhou.png';
import hangzhou from '~@/assets/category/events/list-posters/hangzhou.png';
import nanjing from '~@/assets/category/events/list-posters/nanjing.png';
import shanghai from '~@/assets/category/events/list-posters/shanghai.png';
import shenzhen from '~@/assets/category/events/list-posters/shenzhen1.png';
import suzhou from '~@/assets/category/events/list-posters/suzhou.png';
import tianjin from '~@/assets/category/events/list-posters/tianjin.png';
import wuhan from '~@/assets/category/events/list-posters/wuhan.png';
import wuxi from '~@/assets/category/events/list-posters/wuxi.png';
import zhengzhou from '~@/assets/category/events/list-posters/zhengzhou.png';
import defaultPic from '~@/assets/category/events/list-posters/default.png';

const cityPicMap = new Map([
  ['成都', chengdu],
  ['北京', beijing],
  ['西安', xian],
  ['杭州', hangzhou],
  ['广州', guangzhou],
  ['南京', nanjing],
  ['深圳', shenzhen],
  ['苏州', suzhou],
  ['天津', tianjin],
  ['武汉', wuhan],
  ['无锡', wuxi],
  ['郑州', zhengzhou],
  ['上海', shanghai],
]);

export const EventState = new Map([
  [0, { value: 0, label: { zh: '全部', en: 'All' } }],
  [2, { value: 2, label: { zh: '进行中', en: 'Ongoing' } }],
  [1, { value: 1, label: { zh: '已结束', en: 'Completed' } }],
]);

const rawEvents = activityContent.list as any[];

export const listData = {
  zh: rawEvents
    .map((item, id) => ({
      title: item.title_zh,
      time: item.display_date_zh,
      date: item.start_date,
      tags: item.series,
      category: 'events',
      label: item.format === 'online' ? '线上' : item.format === 'hybrid' ? '线上线下' : '线下',
      location: item.city_zh,
      img: item.poster_image,
      img_mobile: item.poster_image_mb,
      link: item.review_url,
      author: 'openGauss',
      summary: item.synopsis_zh,
      name: item.title_zh,
      city: item.city_zh,
      path: item.review_url,
      status: item.status,
      pic: cityPicMap.get(item.city_zh || '') || defaultPic,
      id,
    }))
    .sort((a, b) => {
      const dateA = new Date(a.date.replace(/\//g, '-'));
      const dateB = new Date(b.date.replace(/\//g, '-'));
      if (dateA.getTime() < dateB.getTime()) return 1;
      if (dateA.getTime() > dateB.getTime()) return -1;
      return 0;
    }),
  en: [],
};
