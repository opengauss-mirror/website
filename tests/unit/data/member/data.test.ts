import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const dataTsPath = resolve(rootDir, 'app/.vitepress/src/data/member/data.ts');
const avatarDir = resolve(rootDir, 'app/.vitepress/src/assets/category/member/avatar');

const dataContent = readFileSync(dataTsPath, 'utf-8');

const zhStorageEngineStart = dataContent.indexOf('STORAGEENGINE: [', dataContent.indexOf('zh: {'));
const enStorageEngineStart = dataContent.indexOf('STORAGEENGINE: [', dataContent.indexOf('en: {'));

function extractBlock(content: string, startPos: number): string {
  const bracketPos = content.indexOf('[', startPos);
  let depth = 0;
  let endPos = bracketPos;
  for (let i = bracketPos; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') depth--;
    if (depth === 0) {
      endPos = i + 1;
      break;
    }
  }
  return content.slice(bracketPos, endPos);
}

const zhStorageEngineBlock = extractBlock(dataContent, zhStorageEngineStart);
const enStorageEngineBlock = extractBlock(dataContent, enStorageEngineStart);

const removedZhNames = ['李恒', '张金玉', '陈晓滨'];
const removedEnNames = ['Heng Li', 'Jinyu Zhang', 'Xiaobin Chen'];

describe('StorageEngine SIG member removal — zh', () => {
  for (const name of removedZhNames) {
    it(`zh STORAGEENGINE does not contain "${name}"`, () => {
      expect(zhStorageEngineBlock).not.toContain(name);
    });
  }
});

describe('StorageEngine SIG member removal — en', () => {
  for (const name of removedEnNames) {
    it(`en STORAGEENGINE does not contain "${name}"`, () => {
      expect(enStorageEngineBlock).not.toContain(name);
    });
  }
});

describe('Import cleanup in data.ts', () => {
  it('liheng import has been removed', () => {
    const importRegex = /import\s+liheng\s+from/;
    expect(importRegex.test(dataContent)).toBe(false);
  });

  it('zhangjinyu import has been removed (but zhangjinyu2 is still present)', () => {
    const importRegex = /import\s+zhangjinyu\s+from/;
    expect(importRegex.test(dataContent)).toBe(false);
    expect(dataContent).toContain('import zhangjinyu2 from');
  });

  it('chenxiaobin import is still present', () => {
    expect(dataContent).toContain('import chenxiaobin from');
  });
});

describe('Avatar file deletion', () => {
  it('liheng.png has been deleted', () => {
    expect(existsSync(resolve(avatarDir, 'liheng.png'))).toBe(false);
  });

  it('zhangjinyu.png has been deleted', () => {
    expect(existsSync(resolve(avatarDir, 'zhangjinyu.png'))).toBe(false);
  });

  it('chenxiaobin.png is still present', () => {
    expect(existsSync(resolve(avatarDir, 'chenxiaobin.png'))).toBe(true);
  });

  it('zhangjinyu2.png is still present', () => {
    expect(existsSync(resolve(avatarDir, 'zhangjinyu2.png'))).toBe(true);
  });
});

describe('陈晓滨 still present in other SIGs', () => {
  it('陈晓滨 still in PLUGIN SIG (zh)', () => {
    const pluginStart = dataContent.indexOf('PLUGIN: [', dataContent.indexOf('zh: {'));
    const pluginBlock = extractBlock(dataContent, pluginStart);
    expect(pluginBlock).toContain('陈晓滨');
  });

  it('陈晓滨 still in CTMM SIG (zh)', () => {
    const ctmmStart = dataContent.indexOf('CTMM: [', dataContent.indexOf('zh: {'));
    const ctmmBlock = extractBlock(dataContent, ctmmStart);
    expect(ctmmBlock).toContain('陈晓滨');
  });

  it('Xiaobin Chen still in PLUGIN SIG (en)', () => {
    const pluginStart = dataContent.indexOf('PLUGIN: [', dataContent.indexOf('en: {'));
    const pluginBlock = extractBlock(dataContent, pluginStart);
    expect(pluginBlock).toContain('Xiaobin Chen');
  });

  it('Xiaobin Chen still in PLUGIN SIG (en) — second occurrence', () => {
    const pluginStart = dataContent.indexOf('PLUGIN: [', dataContent.indexOf('en: {'));
    const pluginBlock = extractBlock(dataContent, pluginStart);
    const occurrences = (pluginBlock.match(/Xiaobin Chen/g) || []).length;
    expect(occurrences).toBeGreaterThanOrEqual(2);
  });
});

describe('zh/en STORAGEENGINE i18n consistency', () => {
  it('zh and en STORAGEENGINE have the same number of members', () => {
    const zhCount = zhStorageEngineBlock.split('name:').length - 1;
    const enCount = enStorageEngineBlock.split('name:').length - 1;
    expect(zhCount).toBe(enCount);
  });
});

const zhGuangzhouStart = dataContent.indexOf('GUANGZHOU: [', dataContent.indexOf('zh: {'));
const enGuangzhouStart = dataContent.indexOf('GUANGZHOU: [', dataContent.indexOf('en: {'));

const zhGuangzhouBlock = extractBlock(dataContent, zhGuangzhouStart);
const enGuangzhouBlock = extractBlock(dataContent, enGuangzhouStart);

describe('GUANGZHOU member removal — zh', () => {
  it('zh GUANGZHOU does not contain "王杰"', () => {
    expect(zhGuangzhouBlock).not.toContain('王杰');
  });

  it('zh GUANGZHOU is not empty after removal', () => {
    const count = zhGuangzhouBlock.split('name:').length - 1;
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

describe('GUANGZHOU member removal — en', () => {
  it('en GUANGZHOU does not contain "Jie Wang"', () => {
    expect(enGuangzhouBlock).not.toContain('Jie Wang');
  });

  it('en GUANGZHOU is not empty after removal', () => {
    const count = enGuangzhouBlock.split('name:').length - 1;
    expect(count).toBeGreaterThanOrEqual(6);
  });
});

describe('GUANGZHOU import cleanup in data.ts', () => {
  it('wangjie import has been removed', () => {
    const importRegex = /import\s+wangjie\s+from/;
    expect(importRegex.test(dataContent)).toBe(false);
  });
});

describe('zh/en GUANGZHOU i18n consistency', () => {
  it('zh and en GUANGZHOU have the same number of members', () => {
    const zhCount = zhGuangzhouBlock.split('name:').length - 1;
    const enCount = enGuangzhouBlock.split('name:').length - 1;
    expect(zhCount).toBe(enCount);
  });
});
