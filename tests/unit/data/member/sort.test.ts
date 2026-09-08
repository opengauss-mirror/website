import { expect, describe, it } from 'vitest';
import { sortCommitteeMembers } from '@/data/member/sort';

describe('sortCommitteeMembers', () => {
  it('places the chair at the top regardless of company order', () => {
    // 中兴 (Z, pinyin) sorts after 华为 (H), but 华为 is the chair → must be first
    const list = [
      { img: 'b', name: '乙', company: '中兴' },
      { img: 'a', name: '甲', title: '主席', company: '华为' },
      { img: 'c', name: '丙', company: '阿里' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(sorted[0].img).toBe('a');
    expect(sorted[0].title).toBe('主席');
  });

  it('sorts non-chair members by company pinyin ascending', () => {
    // chair 华为(H); non-chairs: 中兴(Z), 阿里(A) → 阿里(A) before 中兴(Z)
    const list = [
      { img: 'a', name: '甲', title: '主席', company: '华为' },
      { img: 'b', name: '乙', company: '中兴' },
      { img: 'c', name: '丙', company: '阿里' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(sorted.map((m) => m.img)).toEqual(['a', 'c', 'b']);
  });

  it('pushes members without company to the bottom', () => {
    const list = [
      { img: 'a', name: '甲', company: '中兴' },
      { img: 'b', name: '乙' },
      { img: 'c', name: '丙', company: '阿里' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(sorted[sorted.length - 1].img).toBe('b');
    expect(sorted[0].img).toBe('c');
  });

  it('keeps zh and en strictly in the same order (en uses zh company as sortkey)', () => {
    // zh companies sort pinyin: 阿里(A) < 重庆(C); en companies deliberately reversed
    const zh = [
      { img: 'a', name: '甲', company: '重庆' },
      { img: 'b', name: '乙', company: '阿里' },
      { img: 'c', name: '丙', title: '理事长', company: '华为' },
    ];
    const en = [
      { img: 'a', name: 'Jia', company: 'Apple' },
      { img: 'b', name: 'Yi', company: 'ZTE' },
      { img: 'c', name: 'Bing', title: 'Chair', company: 'Huawei' },
    ];
    const zhSorted = sortCommitteeMembers(zh);
    const enSorted = sortCommitteeMembers(en, zh);
    // both follow zh company pinyin: chair(c) → 阿里(b, A) → 重庆(a, C)
    expect(zhSorted.map((m) => m.img)).toEqual(['c', 'b', 'a']);
    expect(enSorted.map((m) => m.img)).toEqual(zhSorted.map((m) => m.img));
  });

  it('does not mutate the input list', () => {
    const list = [
      { img: 'b', name: '乙', company: '中兴' },
      { img: 'a', name: '甲', title: '主席', company: '华为' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(list[0].img).toBe('b');
    expect(sorted).not.toBe(list);
  });
});
