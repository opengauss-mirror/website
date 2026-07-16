import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');

const configPath = resolve(rootDir, 'app/.vitepress/config.ts');
const configContent = readFileSync(configPath, 'utf-8');

const geoDir = join(rootDir, '.geo');

import generateSEOManifest from '../../../app/.vitepress/scripts/generate-tdk-schema-for-articles';

const articlePathPattern = /\/?(?:zh|en)\/(news|user-practice|events)/;

describe('config.ts uses tdks directory (not tdk typo)', () => {
  it('setTdk function uses tdks in path', () => {
    expect(configContent).toContain("'tdks'");
  });

  it('setTdk function does NOT use tdk (old typo)', () => {
    const tdkLinePattern = /join\(geoDir,\s*'tdk[^s]/;
    expect(tdkLinePattern.test(configContent)).toBe(false);
  });

  it('.geo/tdks directory exists on filesystem', () => {
    expect(existsSync(join(geoDir, 'tdks'))).toBe(true);
  });

  it('.geo/tdk directory does NOT exist on filesystem', () => {
    expect(existsSync(join(geoDir, 'tdk'))).toBe(false);
  });
});

describe('config.ts does not contain old isBlog regex', () => {
  it('no isBlog variable in config.ts', () => {
    expect(configContent).not.toContain('isBlog');
  });

  it('transformPageData uses generateSEOManifest for article detection', () => {
    expect(configContent).toContain('generateSEOManifest');
  });
});

describe('setJSONLD uses jsonld directory', () => {
  it('setJSONLD function uses jsonld in path', () => {
    expect(configContent).toContain("'jsonld'");
  });

  it('.geo/jsonld directory exists on filesystem', () => {
    expect(existsSync(join(geoDir, 'jsonld'))).toBe(true);
  });
});

describe('generateSEOManifest — list-level pages return false (TDK/JSON-LD injection applies)', () => {
  it('zh/events/list returns false (not an article)', () => {
    const pageData = {
      filePath: 'zh/events/list/index.md',
      frontmatter: {
        title: '活动列表',
        category: 'events-overview',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(false);
  });

  it('en/news (list page) returns false', () => {
    const pageData = {
      filePath: 'en/news/index.md',
      frontmatter: {
        title: 'News',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(false);
  });

  it('zh/events (list page) returns false', () => {
    const pageData = {
      filePath: 'zh/events/index.md',
      frontmatter: {
        title: '活动',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(false);
  });

  it('zh/blogs (list page) does not match articlePathPattern', () => {
    const pageData = {
      filePath: 'zh/blogs/index.md',
      frontmatter: {
        title: '博客',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(false);
  });

  it('en/blogs (list page) does not match articlePathPattern', () => {
    const pageData = {
      filePath: 'en/blogs/index.md',
      frontmatter: {
        title: 'Blogs',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(false);
  });
});

describe('generateSEOManifest — article sub-pages return true (article SEO applies)', () => {
  it('zh/events article page returns true', () => {
    const pageData = {
      filePath: 'zh/events/2024/some-event/index.md',
      frontmatter: {
        title: 'openGauss开发者大会',
        category: 'events',
        summary: '活动摘要',
        date: '2024-06-15',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(true);
  });

  it('en/news article page returns true', () => {
    const pageData = {
      filePath: 'en/news/2024/some-article/index.md',
      frontmatter: {
        title: 'openGauss Release Announcement',
        category: 'news',
        summary: 'Summary',
        date: '2024-01-15',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(true);
  });

  it('zh/user-practice article page returns true', () => {
    const pageData = {
      filePath: 'zh/user-practice/finance/some-case/index.md',
      frontmatter: {
        title: '金融实践案例',
        category: 'showcase',
        summary: '案例摘要',
        company: '某银行',
      },
    } as any;
    const result = generateSEOManifest(pageData);
    expect(result).toBe(true);
  });
});

describe('articlePathPattern regex matching', () => {
  it('matches zh/news paths', () => {
    expect(articlePathPattern.test('zh/news/2024/article')).toBe(true);
  });

  it('matches en/events paths', () => {
    expect(articlePathPattern.test('en/events/2024/meetup')).toBe(true);
  });

  it('matches zh/user-practice paths', () => {
    expect(articlePathPattern.test('zh/user-practice/finance/case')).toBe(true);
  });

  it('does NOT match zh/blogs paths (blogs not in pattern)', () => {
    expect(articlePathPattern.test('zh/blogs/2024/post')).toBe(false);
  });

  it('does NOT match non-article paths', () => {
    expect(articlePathPattern.test('zh/about-us')).toBe(false);
  });

  it('does NOT match zh/download paths', () => {
    expect(articlePathPattern.test('zh/download')).toBe(false);
  });
});

describe('TDK files reachable via tdks path (integration with setTdk)', () => {
  const pagesWithTdk = [
    'en/news',
    'zh/events/list',
    'zh/user-practice',
    'zh/summit/devday2025/legal',
    'zh/summit/devday2025/privacy',
    'zh/news',
    'en/events',
    'zh/events',
  ];

  for (const pagePath of pagesWithTdk) {
    it(`join(geoDir, 'tdks', '${pagePath}', 'index.json') resolves to existing file`, () => {
      const filePath = join(geoDir, 'tdks', pagePath, 'index.json');
      expect(existsSync(filePath)).toBe(true);
    });
  }
});

describe('JSON-LD files reachable via jsonld path (integration with setJSONLD)', () => {
  const pagesWithJsonld = [
    'en/blogs',
    'zh/blogs',
    'zh/cve/detail',
    'en/events',
    'zh/events',
    'zh/events/list',
    'en/news',
    'zh/news',
    'zh/summit/devday2025/legal',
    'zh/summit/devday2025/privacy',
  ];

  for (const pagePath of pagesWithJsonld) {
    it(`join(geoDir, 'jsonld', '${pagePath}', 'index.json') resolves to existing file`, () => {
      const filePath = join(geoDir, 'jsonld', pagePath, 'index.json');
      expect(existsSync(filePath)).toBe(true);
    });
  }
});
