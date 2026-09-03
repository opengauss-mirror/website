import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { sortCommitteeMembers, CHAIR_TITLES } from '@/data/member/sort';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const zhPath = resolve(rootDir, 'app/.vitepress/src/data/member/member-zh.ts');
const enPath = resolve(rootDir, 'app/.vitepress/src/data/member/member-en.ts');
const zhContent = readFileSync(zhPath, 'utf-8');
const enContent = readFileSync(enPath, 'utf-8');

// 委员会 key → data.zh.X / data.en.X 的字段名
const COMMITTEES = ['BOARD_ONE', 'BOARD_TWO', 'COUNSELOR', 'BOARD', 'UC', 'BC'] as const;

describe('sortCommitteeMembers — chair title variants (issue 368)', () => {
  it('recognizes 理事长 as a chair and pins it to the top', () => {
    const list = [
      { img: 'b', name: '乙', company: '阿里' },
      { img: 'a', name: '甲', title: '理事长', company: '华为' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(sorted[0].img).toBe('a');
    expect(sorted[0].title).toBe('理事长');
  });

  it('recognizes Chair (en) as a chair and pins it to the top', () => {
    const list = [
      { img: 'b', name: 'Yi', company: 'ZTE' },
      { img: 'a', name: 'Jia', title: 'Chair', company: 'Huawei' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(sorted[0].img).toBe('a');
    expect(sorted[0].title).toBe('Chair');
  });

  it('keeps multiple chairs at the top in their original relative order (stable)', () => {
    // b (主席) and a (理事长) are both chairs → comparator returns 0 between them
    // → stable sort preserves input order [b, a] at the top, non-chair c last
    const list = [
      { img: 'b', name: '乙', title: '主席', company: '中兴' },
      { img: 'a', name: '甲', title: '理事长', company: '华为' },
      { img: 'c', name: '丙', company: '阿里' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(sorted.map((m) => m.img)).toEqual(['b', 'a', 'c']);
  });
});

describe('sortCommitteeMembers — edge cases (issue 368)', () => {
  it('returns an empty array for an empty list', () => {
    expect(sortCommitteeMembers([])).toEqual([]);
  });

  it('returns a new array (not the input ref) for a single-item list', () => {
    const list = [{ img: 'a', name: '甲', company: '阿里' }];
    const sorted = sortCommitteeMembers(list);
    expect(sorted).not.toBe(list);
    expect(sorted.map((m) => m.img)).toEqual(['a']);
  });

  it('does not crash and preserves all members when every member lacks company', () => {
    // Comparator returns 1 for any (a, b) pair when both lack company → order
    // among them is not guaranteed, so only assert set + length, not order.
    const list = [
      { img: 'b', name: '乙' },
      { img: 'a', name: '甲' },
      { img: 'c', name: '丙' },
    ];
    const sorted = sortCommitteeMembers(list);
    expect(sorted).toHaveLength(list.length);
    expect(sorted.map((m) => m.img).sort()).toEqual(['a', 'b', 'c']);
  });

  it('is stable when non-chair members share the same company (equal sortkey)', () => {
    // All three share company '阿里' → localeCompare returns 0 → stable input order
    const list = [
      { img: 'a', name: '甲', company: '阿里' },
      { img: 'b', name: '乙', company: '阿里' },
      { img: 'c', name: '丙', company: '阿里' },
    ];
    expect(sortCommitteeMembers(list).map((m) => m.img)).toEqual(['a', 'b', 'c']);
  });
});

describe('sortCommitteeMembers — refList binding (issue 368)', () => {
  it('omitting refList is equivalent to passing the list itself (default param)', () => {
    const list = [
      { img: 'a', name: '甲', company: '重庆' },
      { img: 'b', name: '乙', company: '阿里' },
      { img: 'c', name: '丙', title: '主席', company: '华为' },
    ];
    expect(sortCommitteeMembers(list)).toEqual(sortCommitteeMembers(list, list));
  });

  it('falls back to an item own company when its img is absent from refList', () => {
    // 'a' has a ref entry (zh company 重庆, pinyin C); 'b' has NO ref entry → falls
    // back to its own company 阿里 (pinyin A). 阿里(A) < 重庆(C) → b before a.
    // If the fallback returned '' instead, b would be pushed to the bottom.
    const list = [
      { img: 'a', name: '甲', company: '中兴' },
      { img: 'b', name: '乙', company: '阿里' },
    ];
    const refList = [{ img: 'a', name: '甲', company: '重庆' }];
    expect(sortCommitteeMembers(list, refList).map((m) => m.img)).toEqual(['b', 'a']);
  });

  it('en list follows zh company order even when en companies would sort the opposite way', () => {
    // zh: 重庆(C) vs 阿里(A) → 阿里 first. en companies deliberately reversed
    // (Apple=Z-rank-ish, ZTE=would-be-first in en) → en must still follow zh order.
    const zh = [
      { img: 'a', name: '甲', company: '重庆' },
      { img: 'b', name: '乙', company: '阿里' },
    ];
    const en = [
      { img: 'a', name: 'Jia', company: 'ChongqingTech' },
      { img: 'b', name: 'Yi', company: 'Alibaba' },
    ];
    expect(sortCommitteeMembers(en, zh).map((m) => m.img)).toEqual(['b', 'a']);
  });
});

describe('CHAIR_TITLES — exact contract (issue 368)', () => {
  it('is exactly the three chair title strings, no more, no less', () => {
    expect(CHAIR_TITLES).toEqual(['理事长', '主席', 'Chair']);
  });
});

describe('sortCommitteeMembers wiring — member-zh.ts (issue 368)', () => {
  for (const key of COMMITTEES) {
    it(`zh ${key} list is wrapped by sortCommitteeMembers(data.zh.${key})`, () => {
      expect(zhContent).toContain(`sortCommitteeMembers(data.zh.${key})`);
    });
  }

  it('zh TC keeps its inline sort (not wrapped by the helper)', () => {
    expect(zhContent).toContain('[...data.zh.TC].sort(');
    expect(zhContent).not.toContain('sortCommitteeMembers(data.zh.TC');
  });

  it('zh SECRETARIAT is not wrapped by the helper (no company field, rule N/A)', () => {
    expect(zhContent).toContain('list: data.zh.SECRETARIAT');
    expect(zhContent).not.toContain('sortCommitteeMembers(data.zh.SECRETARIAT');
  });

  it('zh imports sortCommitteeMembers from ./sort', () => {
    expect(zhContent).toContain("import { sortCommitteeMembers } from './sort';");
  });
});

describe('sortCommitteeMembers wiring — member-en.ts (issue 368)', () => {
  for (const key of COMMITTEES) {
    it(`en ${key} list is wrapped by sortCommitteeMembers(data.en.${key}, data.zh.${key})`, () => {
      // en must pass the paired zh list as refList so both versions share zh
      // company strings as the sort key → strictly identical ordering.
      expect(enContent).toContain(
        `sortCommitteeMembers(data.en.${key}, data.zh.${key})`,
      );
    });
  }

  it('en TC keeps its inline sort (not wrapped by the helper)', () => {
    expect(enContent).toContain('[...data.en.TC].sort(');
    expect(enContent).not.toContain('sortCommitteeMembers(data.en.TC');
  });

  it('en SECRETARIAT is not wrapped by the helper', () => {
    expect(enContent).toContain('list: data.en.SECRETARIAT');
    expect(enContent).not.toContain('sortCommitteeMembers(data.en.SECRETARIAT');
  });

  it('en imports sortCommitteeMembers from ./sort', () => {
    expect(enContent).toContain("import { sortCommitteeMembers } from './sort';");
  });
});
