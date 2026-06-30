import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const zhMdPath = resolve(rootDir, 'app/zh/user-practice/dbv/langchaoyun/index.md');
const enMdPath = resolve(rootDir, 'app/en/user-practice/dbv/langchaoyun/index.md');
const configPath = resolve(rootDir, 'app/.vitepress/config.ts');

const isBlogRegex = /.+\/(?:user-practice|events|news)\/.+$/;

const ZH_KEYWORDS_TARGETS = ['浪潮云', 'InDB', '岳数据库'];
const EN_KEYWORDS_TARGETS = ['InDB', '岳数据库'];
const TITLE_REQUIRED_TERMS_ZH = ['岳数据库', 'InDB'];
const TITLE_REQUIRED_TERMS_EN = ['InDB'];

function getZhFm() {
  return matter(readFileSync(zhMdPath, 'utf-8')).data;
}
function getEnFm() {
  return matter(readFileSync(enMdPath, 'utf-8')).data;
}

describe('langchaoyun zh frontmatter SEO', () => {
  const fm = getZhFm();

  it('title is 浪潮云岳数据库InDB V3.0', () => {
    expect(fm.title).toBe('浪潮云岳数据库InDB V3.0');
  });

  it('title includes required terms 岳数据库 and InDB', () => {
    for (const term of TITLE_REQUIRED_TERMS_ZH) {
      expect(fm.title).toContain(term);
    }
  });

  it('title length within SEO optimal range (<=60 after titleTemplate)', () => {
    const fullTitle = `${fm.title} | openGauss社区官网`;
    expect(fullTitle.length).toBeLessThanOrEqual(60);
  });

  it('frontmatter has head array with keywords meta', () => {
    expect(fm.head).toBeDefined();
    expect(Array.isArray(fm.head)).toBe(true);
    expect(fm.head.length).toBeGreaterThan(0);
  });

  it('keywords meta contains at least 2 of the target terms', () => {
    const headEntry = fm.head[0] as [string, Record<string, string>];
    expect(headEntry[0]).toBe('meta');
    const keywordsStr = headEntry[1].content;
    const matched = ZH_KEYWORDS_TARGETS.filter((t) => keywordsStr.includes(t));
    expect(matched.length).toBeGreaterThanOrEqual(2);
  });

  it('keywords meta contains all 4 target terms', () => {
    const headEntry = fm.head[0] as [string, Record<string, string>];
    const keywordsStr = headEntry[1].content;
    for (const term of ZH_KEYWORDS_TARGETS) {
      expect(keywordsStr).toContain(term);
    }
  });

  it('keywords contains openGauss', () => {
    const headEntry = fm.head[0] as [string, Record<string, string>];
    expect(headEntry[1].content).toContain('openGauss');
  });
});

describe('langchaoyun en frontmatter SEO', () => {
  const fm = getEnFm();

  it('title is 浪潮云岳数据库InDB V3.0', () => {
    expect(fm.title).toBe('浪潮云岳数据库InDB V3.0');
  });

  it('title includes required term InDB', () => {
    for (const term of TITLE_REQUIRED_TERMS_EN) {
      expect(fm.title).toContain(term);
    }
  });

  it('title length within SEO optimal range (<=60 after titleTemplate)', () => {
    const fullTitle = `${fm.title} | openGauss Official Website`;
    expect(fullTitle.length).toBeLessThanOrEqual(60);
  });

  it('frontmatter has head array with keywords meta', () => {
    expect(fm.head).toBeDefined();
    expect(Array.isArray(fm.head)).toBe(true);
    expect(fm.head.length).toBeGreaterThan(0);
  });

  it('keywords meta contains at least 1 of the target terms', () => {
    const headEntry = fm.head[0] as [string, Record<string, string>];
    expect(headEntry[0]).toBe('meta');
    const keywordsStr = headEntry[1].content;
    const matched = EN_KEYWORDS_TARGETS.filter((t) => keywordsStr.includes(t));
    expect(matched.length).toBeGreaterThanOrEqual(1);
  });

  it('keywords contains Inspur Cloud (en-specific term)', () => {
    const headEntry = fm.head[0] as [string, Record<string, string>];
    expect(headEntry[1].content).toContain('Inspur Cloud');
  });

  it('keywords contains InDB', () => {
    const headEntry = fm.head[0] as [string, Record<string, string>];
    expect(headEntry[1].content).toContain('InDB');
  });

  it('keywords contains openGauss', () => {
    const headEntry = fm.head[0] as [string, Record<string, string>];
    expect(headEntry[1].content).toContain('openGauss');
  });
});

describe('langchaoyun isBlog regex — TDK mechanism bypassed', () => {
  it('isBlog regex matches zh langchaoyun page path', () => {
    expect(isBlogRegex.test('zh/user-practice/dbv/langchaoyun')).toBe(true);
  });

  it('isBlog regex matches en langchaoyun page path', () => {
    expect(isBlogRegex.test('en/user-practice/dbv/langchaoyun')).toBe(true);
  });

  it('isBlog regex in config.ts contains user-practice', () => {
    const configContent = readFileSync(configPath, 'utf-8');
    expect(configContent).toContain('isBlog');
    expect(configContent).toContain('user-practice');
  });

  it('isBlog regex does NOT match a regular page (non-blog)', () => {
    expect(isBlogRegex.test('zh/about')).toBe(false);
  });
});

describe('langchaoyun zh/en frontmatter sync', () => {
  const zhFm = getZhFm();
  const enFm = getEnFm();

  it('zh and en titles are identical', () => {
    expect(zhFm.title).toBe(enFm.title);
  });

  it('both pages have head keywords meta', () => {
    expect(zhFm.head).toBeDefined();
    expect(enFm.head).toBeDefined();
  });

  it('both keywords contain openGauss', () => {
    const zhEntry = zhFm.head[0] as [string, Record<string, string>];
    const enEntry = enFm.head[0] as [string, Record<string, string>];
    expect(zhEntry[1].content).toContain('openGauss');
    expect(enEntry[1].content).toContain('openGauss');
  });
});

describe('langchaoyun frontmatter YAML syntax validity', () => {
  it('zh md file starts and ends with --- delimiter', () => {
    const content = readFileSync(zhMdPath, 'utf-8');
    expect(content.startsWith('---\n')).toBe(true);
    expect(content.indexOf('\n---', 4)).toBeGreaterThan(0);
  });

  it('en md file starts and ends with --- delimiter', () => {
    const content = readFileSync(enMdPath, 'utf-8');
    expect(content.startsWith('---\n')).toBe(true);
    expect(content.indexOf('\n---', 4)).toBeGreaterThan(0);
  });

  it('zh frontmatter has category: showcase', () => {
    expect(getZhFm().category).toBe('showcase');
  });

  it('en frontmatter has category: showcase', () => {
    expect(getEnFm().category).toBe('showcase');
  });
});
