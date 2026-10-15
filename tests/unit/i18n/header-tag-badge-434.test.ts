import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const headerZhPath = resolve(rootDir, 'app/.vitepress/src-new/i18n/header/header-zh.ts');
const headerEnPath = resolve(rootDir, 'app/.vitepress/src-new/i18n/header/header-en.ts');

const zhContent = readFileSync(headerZhPath, 'utf-8');
const enContent = readFileSync(headerEnPath, 'utf-8');

/** Escapes regex special chars in a string for safe use in RegExp. */
function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Extract the object block (enclosing `{ ... }`) for the nav item
 * whose NAME matches `name`. Returns '' if not found.
 */
function extractNavItemBlock(src: string, name: string): string {
  const nameRe = new RegExp(`NAME:\\s*['"]${escapeRegExp(name)}['"]`);
  const m = nameRe.exec(src);
  if (!m) return '';
  const start = src.lastIndexOf('{', m.index);
  if (start === -1) return '';
  let depth = 1;
  let i = start + 1;
  while (i < src.length && depth > 0) {
    if (src[i] === '{') depth++;
    else if (src[i] === '}') depth--;
    if (depth === 0) break;
    i++;
  }
  return depth === 0 ? src.slice(start, i + 1) : '';
}

describe('header-zh — 角标 (TAG) 字段调整 (issue #434)', () => {
  describe('AI专区 → 新增 NEW 角标', () => {
    const block = extractNavItemBlock(zhContent, 'AI专区');

    it('AI专区 导航项存在', () => {
      expect(block.length, 'AI专区 导航项 block 必须存在').toBeGreaterThan(0);
    });

    it('AI专区 有 TAG: TAG_TYPE.NEW', () => {
      expect(block).toMatch(/TAG:\s*TAG_TYPE\.NEW/);
    });

    it('AI专区 URL 指向 /ai/agent/', () => {
      expect(block).toContain("URL: '/ai/agent/'");
    });
  });

  describe('开源实习 → 移除 NEW 角标', () => {
    const block = extractNavItemBlock(zhContent, '开源实习');

    it('开源实习 导航项存在', () => {
      expect(block.length, '开源实习 导航项 block 必须存在').toBeGreaterThan(0);
    });

    it('开源实习 无 TAG: TAG_TYPE.NEW', () => {
      expect(block).not.toMatch(/TAG:\s*TAG_TYPE\.NEW/);
    });

    it('开源实习 保留 NAME / DESCRIPTION / URL 字段', () => {
      expect(block).toContain("NAME: '开源实习'");
      expect(block).toMatch(/DESCRIPTION:/);
      expect(block).toContain("URL: '/internship/'");
    });
  });

  describe('oGMemory 专区 → 移除 NEW 角标', () => {
    const block = extractNavItemBlock(zhContent, 'oGMemory 专区');

    it('oGMemory 专区 导航项存在', () => {
      expect(block.length, 'oGMemory 专区 导航项 block 必须存在').toBeGreaterThan(0);
    });

    it('oGMemory 专区 无 TAG: TAG_TYPE.NEW', () => {
      expect(block).not.toMatch(/TAG:\s*TAG_TYPE\.NEW/);
    });

    it('oGMemory 专区 保留 NAME / DESCRIPTION / URL 字段', () => {
      expect(block).toContain("NAME: 'oGMemory 专区'");
      expect(block).toMatch(/DESCRIPTION:/);
      expect(block).toContain("URL: '/ogmemory/'");
    });
  });
});

describe('header-en — 角标 (TAG) 字段调整 (issue #434)', () => {
  describe('AI Zone → 新增 NEW 角标 (双语同步)', () => {
    const block = extractNavItemBlock(enContent, 'AI Zone');

    it('AI Zone 导航项存在', () => {
      expect(block.length, 'AI Zone 导航项 block 必须存在').toBeGreaterThan(0);
    });

    it('AI Zone 有 TAG: TAG_TYPE.NEW', () => {
      expect(block).toMatch(/TAG:\s*TAG_TYPE\.NEW/);
    });

    it('AI Zone URL 指向 /ai/agent/', () => {
      expect(block).toContain("URL: '/ai/agent/'");
    });
  });
});

describe('header zh/en — AI 专区角标双语一致 (issue #434)', () => {
  it('zh AI专区 与 en AI Zone 均有 TAG: TAG_TYPE.NEW', () => {
    const zhBlock = extractNavItemBlock(zhContent, 'AI专区');
    const enBlock = extractNavItemBlock(enContent, 'AI Zone');
    expect(zhBlock).toMatch(/TAG:\s*TAG_TYPE\.NEW/);
    expect(enBlock).toMatch(/TAG:\s*TAG_TYPE\.NEW/);
  });
});
