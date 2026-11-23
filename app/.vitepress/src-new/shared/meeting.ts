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

import { INTERVAL_MONTH, INTERVAL_WEEK, INTERVAL_WEEK_OPTIONS } from '~@/data/meeting';
import { findLabelFromOptions } from '~@/shared/utils';

export const getPointStr = (cycle_type: number, points: number[]) => {
  if (cycle_type === INTERVAL_WEEK) {
    return points
      .sort((a, b) => {
        const aIdx = INTERVAL_WEEK_OPTIONS.findIndex((v) => v.value === a);
        const bIdx = INTERVAL_WEEK_OPTIONS.findIndex((v) => v.value === b);
        return aIdx - bIdx;
      })
      .map((point) => findLabelFromOptions(parseInt(point), INTERVAL_WEEK_OPTIONS))
      .join('、');
  }
  if (cycle_type === INTERVAL_MONTH) {
    return points.join('、') + '号';
  }
  return '';
};
// 处理发言人的序号
export const speakerNum = (val: string) => {
  const regex = /\d+/g;
  const match = val.match(regex) || '';

  return parseInt(match[0]);
};
