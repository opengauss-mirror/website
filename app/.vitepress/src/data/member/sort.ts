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

/**
 * 委员会成员排序：主席固定置顶，其余成员按所属单位名称（拼音首字母）升序。
 * @param list 待排序成员列表
 * @param refList 排序键来源（默认同 list）；en 版传 zh 版以保两版严格同序
 */
export const CHAIR_TITLES = new Map([
  ['理事长', 1],
  ['秘书长', 0],
  ['主席', 1],
  ['Secretary General', 0],
  ['Chair', 1]
]);

export function sortCommitteeMembers<T extends { title?: string; company?: string; img: string }>(
  list: T[],
  refList: T[] = list,
): T[] {
  const getRefCompany = (item: T): string => {
    const ref = refList.find((r) => r.img === item.img);
    return ref?.company ?? item.company ?? '';
  };
  return [...list].sort((a, b) => {
    const aIsChair = a.title ? CHAIR_TITLES.has(a.title) : false;
    const bIsChair = b.title ? CHAIR_TITLES.has(b.title) : false;
    if (aIsChair && !bIsChair) return -1;
    if (!aIsChair && bIsChair) return 1;
    if (aIsChair && bIsChair) {
      return CHAIR_TITLES.get(b.title!)! - CHAIR_TITLES.get(a.title!)!
    }
    const aKey = getRefCompany(a);
    const bKey = getRefCompany(b);
    if (!aKey) return 1;
    if (!bKey) return -1;
    return aKey.localeCompare(bKey, 'zh-Hans-CN-u-co-pinyin');
  });
}
