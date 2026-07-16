import { expect, describe, it } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const geoDir = resolve(rootDir, '.geo');

const NEW_TDK_PAGES = [
  'en/news',
  'zh/events/list',
  'zh/user-practice',
  'zh/summit/devday2025/legal',
  'zh/summit/devday2025/privacy',
];

const ALREADY_EXISTING_TDK_PAGES = [
  'en/blogs',
  'zh/blogs',
  'zh/cve/detail',
  'en/events',
  'zh/events',
  'zh/news',
  'en/user-practice',
];

function readTdkJson(pagePath: string) {
  const filePath = resolve(geoDir, 'tdks', pagePath, 'index.json');
  if (!existsSync(filePath)) return null;
  return JSON.parse(readFileSync(filePath, 'utf-8'));
}

describe('.geo/tdks directory name is correct', () => {
  it('tdks directory exists', () => {
    expect(existsSync(resolve(geoDir, 'tdks'))).toBe(true);
  });

  it('tdk directory does NOT exist (old typo path)', () => {
    expect(existsSync(resolve(geoDir, 'tdk'))).toBe(false);
  });
});

describe('new TDK JSON files exist and are valid', () => {
  for (const pagePath of NEW_TDK_PAGES) {
    it(`${pagePath}/index.json file exists`, () => {
      const filePath = resolve(geoDir, 'tdks', pagePath, 'index.json');
      expect(existsSync(filePath)).toBe(true);
    });

    it(`${pagePath}/index.json is valid JSON`, () => {
      const tdk = readTdkJson(pagePath);
      expect(tdk).not.toBeNull();
    });
  }
});

describe('new TDK JSON files have required fields', () => {
  for (const pagePath of NEW_TDK_PAGES) {
    it(`${pagePath} has title field (non-empty string)`, () => {
      const tdk = readTdkJson(pagePath);
      expect(typeof tdk.title).toBe('string');
      expect(tdk.title.length).toBeGreaterThan(0);
    });

    it(`${pagePath} has description field (non-empty string)`, () => {
      const tdk = readTdkJson(pagePath);
      expect(typeof tdk.description).toBe('string');
      expect(tdk.description.length).toBeGreaterThan(0);
    });

    it(`${pagePath} has keywords field (non-empty string)`, () => {
      const tdk = readTdkJson(pagePath);
      expect(typeof tdk.keywords).toBe('string');
      expect(tdk.keywords.length).toBeGreaterThan(0);
    });
  }
});

describe('new TDK JSON titles contain page-specific terms', () => {
  it('en/news title contains "News"', () => {
    const tdk = readTdkJson('en/news');
    expect(tdk.title).toContain('News');
  });

  it('zh/events/list title contains "活动列表"', () => {
    const tdk = readTdkJson('zh/events/list');
    expect(tdk.title).toContain('活动列表');
  });

  it('zh/user-practice title contains "用户实践"', () => {
    const tdk = readTdkJson('zh/user-practice');
    expect(tdk.title).toContain('用户实践');
  });

  it('zh/summit/devday2025/legal title contains "法律声明"', () => {
    const tdk = readTdkJson('zh/summit/devday2025/legal');
    expect(tdk.title).toContain('法律声明');
  });

  it('zh/summit/devday2025/privacy title contains "隐私政策"', () => {
    const tdk = readTdkJson('zh/summit/devday2025/privacy');
    expect(tdk.title).toContain('隐私政策');
  });
});

describe('new TDK JSON keywords contain openGauss', () => {
  for (const pagePath of NEW_TDK_PAGES) {
    it(`${pagePath} keywords contain openGauss`, () => {
      const tdk = readTdkJson(pagePath);
      expect(tdk.keywords).toContain('openGauss');
    });
  }
});

describe('already-existing TDK pages still have valid files', () => {
  for (const pagePath of ALREADY_EXISTING_TDK_PAGES) {
    it(`${pagePath}/index.json still exists`, () => {
      const filePath = resolve(geoDir, 'tdks', pagePath, 'index.json');
      expect(existsSync(filePath)).toBe(true);
    });

    it(`${pagePath}/index.json is still valid JSON with title`, () => {
      const tdk = readTdkJson(pagePath);
      expect(tdk).not.toBeNull();
      expect(typeof tdk.title).toBe('string');
      expect(tdk.title.length).toBeGreaterThan(0);
    });
  }
});

describe('TDK JSON file structure consistency', () => {
  it('new TDK files have exactly 3 fields: title, description, keywords', () => {
    for (const pagePath of NEW_TDK_PAGES) {
      const tdk = readTdkJson(pagePath);
      const keys = Object.keys(tdk);
      expect(keys).toEqual(['title', 'description', 'keywords']);
    }
  });
});
