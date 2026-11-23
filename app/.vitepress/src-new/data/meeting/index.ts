/*
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 * website is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

export const EMAIL_REGEX = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

export const INTERVAL_DAY = 0;
export const INTERVAL_WEEK = 1;
export const INTERVAL_MONTH = 2;

export const CYCLE_TYPE_OPTIONS = [
  {
    label: '天',
    value: INTERVAL_DAY,
    max: 7,
  },
  {
    label: '周',
    value: INTERVAL_WEEK,
    max: 2,
  },
  {
    label: '月',
    value: INTERVAL_MONTH,
    max: 1,
  },
];
export const WEEKDAY = ['日', '一', '二', '三', '四', '五', '六'];

const getWeekOptions = () => {
  const list = [];
  for (let i = 1; i <= 7; i++) {
    const idx = i % 7;
    list.push({
      value: idx,
      label: `星期${WEEKDAY[idx]}`,
    });
  }
  return list;
};

export const INTERVAL_WEEK_OPTIONS = getWeekOptions();

export const INTERVAL_MONTH_OPTIONS = [
  {
    value: 1,
    label: '第一个',
  },
  {
    value: 2,
    label: '第二个',
  },
  {
    value: 3,
    label: '第三个',
  },
  {
    value: 4,
    label: '第四个',
  },
  {
    value: 5,
    label: '最后一个',
  },
];
