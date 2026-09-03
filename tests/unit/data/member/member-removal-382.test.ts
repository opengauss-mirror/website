import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const dataTsPath = resolve(rootDir, 'app/.vitepress/src/data/member/data.ts');
const avatarDir = resolve(rootDir, 'app/.vitepress/src/assets/category/member/avatar');

const dataContent = readFileSync(dataTsPath, 'utf-8');

const zhStart = dataContent.indexOf('zh: {');
const enStart = dataContent.indexOf('en: {');

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

function extractArray(localeStart: number, key: string): string {
  const arrStart = dataContent.indexOf(`${key}: [`, localeStart);
  return extractBlock(dataContent, arrStart);
}

const arrays = ['BOARD', 'UC', 'STORAGEENGINE', 'CLOUDNATIVE', 'BLOCKCHAIN', 'OPS'] as const;

const zhBlocks: Record<string, string> = {};
const enBlocks: Record<string, string> = {};
for (const key of arrays) {
  zhBlocks[key] = extractArray(zhStart, key);
  enBlocks[key] = extractArray(enStart, key);
}

const removedZhNamesByArray: Record<string, string[]> = {
  BOARD: ['郝庆运'],
  UC: ['郝庆运'],
  STORAGEENGINE: ['徐春阳'],
  CLOUDNATIVE: ['朱彬', '孔再华'],
  BLOCKCHAIN: ['郝庆运'],
  OPS: ['孔再华'],
};

const removedEnNamesByArray: Record<string, string[]> = {
  BOARD: ['Qingyun Hao'],
  UC: ['Qingyun Hao'],
  STORAGEENGINE: ['Chunyang Xu'],
  CLOUDNATIVE: ['Bin Zhu', 'Zaihua Kong'],
  BLOCKCHAIN: ['Qingyun Hao'],
  OPS: ['Zaihua Kong'],
};

describe('member removal — zh', () => {
  for (const key of arrays) {
    describe(`${key}`, () => {
      for (const name of removedZhNamesByArray[key]) {
        it(`zh ${key} does not contain "${name}"`, () => {
          expect(zhBlocks[key]).not.toContain(name);
        });
      }
    });
  }
});

describe('member removal — en', () => {
  for (const key of arrays) {
    describe(`${key}`, () => {
      for (const name of removedEnNamesByArray[key]) {
        it(`en ${key} does not contain "${name}"`, () => {
          expect(enBlocks[key]).not.toContain(name);
        });
      }
    });
  }
});

describe('朱彬 (zhubin2) still present in OPS, removed only from CLOUDNATIVE', () => {
  it('zh OPS still contains 朱彬', () => {
    expect(zhBlocks.OPS).toContain('朱彬');
  });

  it('en OPS still contains Bin Zhu', () => {
    expect(enBlocks.OPS).toContain('Bin Zhu');
  });

  it('zh CLOUDNATIVE does not contain 朱彬', () => {
    expect(zhBlocks.CLOUDNATIVE).not.toContain('朱彬');
  });

  it('en CLOUDNATIVE does not contain Bin Zhu', () => {
    expect(enBlocks.CLOUDNATIVE).not.toContain('Bin Zhu');
  });
});

describe('Import cleanup in data.ts', () => {
  it('haoqingyun import has been removed', () => {
    expect(/import\s+haoqingyun\s+from/.test(dataContent)).toBe(false);
  });

  it('xuchunyang import has been removed', () => {
    expect(/import\s+xuchunyang\s+from/.test(dataContent)).toBe(false);
  });

  it('kongzaihua import has been removed', () => {
    expect(/import\s+kongzaihua\s+from/.test(dataContent)).toBe(false);
  });

  it('zhubin2 import is still present (used by OPS)', () => {
    expect(dataContent).toContain('import zhubin2 from');
  });
});

describe('Avatar file deletion', () => {
  it('haoqingyun.png has been deleted', () => {
    expect(existsSync(resolve(avatarDir, 'haoqingyun.png'))).toBe(false);
  });

  it('xuchunyang.png has been deleted', () => {
    expect(existsSync(resolve(avatarDir, 'xuchunyang.png'))).toBe(false);
  });

  it('kongzaihua.png has been deleted', () => {
    expect(existsSync(resolve(avatarDir, 'kongzaihua.png'))).toBe(false);
  });

  it('zhubin2.png is still present', () => {
    expect(existsSync(resolve(avatarDir, 'zhubin2.png'))).toBe(true);
  });
});

describe('zh/en i18n consistency per array', () => {
  for (const key of arrays) {
    it(`zh and en ${key} have the same number of members`, () => {
      const zhCount = zhBlocks[key].split('name:').length - 1;
      const enCount = enBlocks[key].split('name:').length - 1;
      expect(zhCount).toBe(enCount);
    });
  }
});
