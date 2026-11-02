import { expect, describe, it } from 'vitest';

import commonZh from '@/i18n/common/common-zh';
import commonEn from '@/i18n/common/common-en';

const SEARCH_KEYS = [
  'TITLE',
  'SEARCH_BLOG_TITLE',
  'SEARCH_BLOG_ALL',
  'SEARCH_BLOG_AUTHOR',
  'SEARCH_BLOG_TAGS',
  'DATE_START',
  'DATE_END',
] as const;

describe('src/i18n/common zh/en sync', () => {
  it('blog search related keys exist in both zh and en', () => {
    for (const key of SEARCH_KEYS) {
      expect(commonZh.COMMON_CONFIG, `zh ${key}`).toHaveProperty(key);
      expect(commonEn.COMMON_CONFIG, `en ${key}`).toHaveProperty(key);
    }
  });

  it('blog search related keys match between zh and en', () => {
    const zhConfig = commonZh.COMMON_CONFIG as Record<string, string>;
    const enConfig = commonEn.COMMON_CONFIG as Record<string, string>;
    expect(zhConfig.TITLE).toBeTruthy();
    expect(enConfig.TITLE).toBeTruthy();
    expect(zhConfig.SEARCH_BLOG_TITLE).toBeTruthy();
    expect(enConfig.SEARCH_BLOG_TITLE).toBeTruthy();
    expect(zhConfig.SEARCH_BLOG_ALL).toBeTruthy();
    expect(enConfig.SEARCH_BLOG_ALL).toBeTruthy();
    expect(zhConfig.SEARCH_BLOG_AUTHOR).toBeTruthy();
    expect(enConfig.SEARCH_BLOG_AUTHOR).toBeTruthy();
    expect(zhConfig.SEARCH_BLOG_TAGS).toBeTruthy();
    expect(enConfig.SEARCH_BLOG_TAGS).toBeTruthy();
    expect(zhConfig.DATE_START).toBeTruthy();
    expect(enConfig.DATE_START).toBeTruthy();
    expect(zhConfig.DATE_END).toBeTruthy();
    expect(enConfig.DATE_END).toBeTruthy();
  });
});
