/**
 * 委员会成员排序：主席固定置顶，其余成员按所属单位名称（拼音首字母）升序。
 * @param list 待排序成员列表
 * @param refList 排序键来源（默认同 list）；en 版传 zh 版以保两版严格同序
 */
export const CHAIR_TITLES = ['理事长', '主席', 'Chair'];

export function sortCommitteeMembers<T extends { title?: string; company?: string; img: string }>(
  list: T[],
  refList: T[] = list,
): T[] {
  const getRefCompany = (item: T): string => {
    const ref = refList.find((r) => r.img === item.img);
    return ref?.company ?? item.company ?? '';
  };
  return [...list].sort((a, b) => {
    const aIsChair = a.title ? CHAIR_TITLES.includes(a.title) : false;
    const bIsChair = b.title ? CHAIR_TITLES.includes(b.title) : false;
    if (aIsChair && !bIsChair) return -1;
    if (!aIsChair && bIsChair) return 1;
    if (aIsChair && bIsChair) return 0;
    const aKey = getRefCompany(a);
    const bKey = getRefCompany(b);
    if (!aKey) return 1;
    if (!bKey) return -1;
    return aKey.localeCompare(bKey, 'zh-Hans-CN-u-co-pinyin');
  });
}
