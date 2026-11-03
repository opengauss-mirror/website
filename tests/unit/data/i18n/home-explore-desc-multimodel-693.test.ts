import { expect, describe, it } from 'vitest';

import homeZh from '~@/i18n/home/home-zh';
import homeEn from '~@/i18n/home/home-en';

const ZH_OLD_TERM = '关系型';
const ZH_NEW_TERM = '多模';
const EN_OLD_TERM = 'relational';
const EN_NEW_TERM = 'multi-model';

describe('home i18n HOME_EXPLORE.LIST[0].DESC — multi-model rebrand (issue #693)', () => {
  it('zh DESC uses 多模 and no longer uses 关系型', () => {
    const desc = homeZh.HOME_EXPLORE.LIST[0].DESC;
    expect(desc).toContain(ZH_NEW_TERM);
    expect(desc).not.toContain(ZH_OLD_TERM);
  });

  it('en DESC uses multi-model and no longer uses relational', () => {
    const desc = homeEn.HOME_EXPLORE.LIST[0].DESC;
    expect(desc).toContain(EN_NEW_TERM);
    expect(desc).not.toContain(EN_OLD_TERM);
  });

  it('zh/en HOME_EXPLORE.LIST have same length', () => {
    expect(homeZh.HOME_EXPLORE.LIST.length).toBe(homeEn.HOME_EXPLORE.LIST.length);
    expect(homeZh.HOME_EXPLORE.LIST.length).toBeGreaterThan(0);
  });

  it('zh/en HOME_EXPLORE.LIST items share NAME/DESC/PATH keys', () => {
    for (let i = 0; i < homeZh.HOME_EXPLORE.LIST.length; i++) {
      const zhItem = homeZh.HOME_EXPLORE.LIST[i];
      const enItem = homeEn.HOME_EXPLORE.LIST[i];
      expect(Object.keys(zhItem).sort()).toEqual(['DESC', 'NAME', 'PATH']);
      expect(Object.keys(enItem).sort()).toEqual(['DESC', 'NAME', 'PATH']);
    }
  });

  it('homePageTitle is untouched by this change (zh still 关系型, en has no term)', () => {
    expect(homeZh.homePageTitle).toContain('关系型');
    expect(homeEn.homePageTitle).not.toContain('relational');
    expect(homeEn.homePageTitle).not.toContain('multi-model');
  });
});
