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

const zhUcBlock = extractArray(zhStart, 'UC');
const enUcBlock = extractArray(enStart, 'UC');

describe('UC member removal — zh (issue 374)', () => {
  it('zh UC does not contain "平雷"', () => {
    expect(zhUcBlock).not.toContain('平雷');
  });

  it('zh UC does not contain the removed email "lei.ping@ceic.com"', () => {
    expect(zhUcBlock).not.toContain('lei.ping@ceic.com');
  });

  it('zh UC does not contain the removed company "国能信息技术公司"', () => {
    expect(zhUcBlock).not.toContain('国能信息技术公司');
  });
});

describe('UC member removal — en (issue 374)', () => {
  it('en UC does not contain "Ping Lei"', () => {
    expect(enUcBlock).not.toContain('Ping Lei');
  });

  it('en UC does not contain the removed email "lei.ping@ceic.com"', () => {
    expect(enUcBlock).not.toContain('lei.ping@ceic.com');
  });

  it('en UC does not contain the removed company "CHN Energy Information Technology Corporation(Data Center)"', () => {
    expect(enUcBlock).not.toContain(
      'CHN Energy Information Technology Corporation(Data Center)',
    );
  });
});

describe('UC not empty after removal (issue 374)', () => {
  it('zh UC still has members (chair + committee members)', () => {
    const zhCount = zhUcBlock.split('name:').length - 1;
    expect(zhCount).toBeGreaterThanOrEqual(10);
  });

  it('en UC still has members (chair + committee members)', () => {
    const enCount = enUcBlock.split('name:').length - 1;
    expect(enCount).toBeGreaterThanOrEqual(10);
  });
});

describe('UC chair still present (issue 374)', () => {
  it('zh UC still contains chair "肖枫"', () => {
    expect(zhUcBlock).toContain('肖枫');
    expect(zhUcBlock).toContain('主席');
  });

  it('en UC still contains chair "Feng Xiao"', () => {
    expect(enUcBlock).toContain('Feng Xiao');
    expect(enUcBlock).toContain('Chair');
  });
});

describe('UC import cleanup in data.ts (issue 374)', () => {
  it('pinglei import has been removed', () => {
    const importRegex = /import\s+pinglei\s+from/;
    expect(importRegex.test(dataContent)).toBe(false);
  });

  it('no leftover "pinglei" identifier anywhere in data.ts', () => {
    expect(dataContent).not.toContain('pinglei');
  });
});

describe('UC avatar file deletion (issue 374)', () => {
  it('pinglei.png has been deleted', () => {
    expect(existsSync(resolve(avatarDir, 'pinglei.png'))).toBe(false);
  });
});

describe('zh/en UC i18n consistency (issue 374)', () => {
  it('zh and en UC have the same number of members', () => {
    const zhCount = zhUcBlock.split('name:').length - 1;
    const enCount = enUcBlock.split('name:').length - 1;
    expect(zhCount).toBe(enCount);
  });
});
