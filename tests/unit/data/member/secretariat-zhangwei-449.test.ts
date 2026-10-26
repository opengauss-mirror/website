import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const dataTsPath = resolve(rootDir, 'app/.vitepress/src/data/member/data.ts');
const avatarDir = resolve(rootDir, 'app/.vitepress/src/assets/category/member/avatar');

const dataContent = readFileSync(dataTsPath, 'utf-8');

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

const zhSecStart = dataContent.indexOf('SECRETARIAT: [', dataContent.indexOf('zh: {'));
const enSecStart = dataContent.indexOf('SECRETARIAT: [', dataContent.indexOf('en: {'));

const zhSecBlock = extractBlock(dataContent, zhSecStart);
const enSecBlock = extractBlock(dataContent, enSecStart);

describe('SECRETARIAT new member 张伟 — zh', () => {
  it('zh SECRETARIAT contains "张伟"', () => {
    expect(zhSecBlock).toContain('张伟');
  });

  it('张伟 in zh SECRETARIAT has title "法务专家"', () => {
    expect(zhSecBlock).toContain('张伟');
    expect(zhSecBlock).toContain('法务专家');
  });

  it('张伟 in zh SECRETARIAT has correct email', () => {
    expect(zhSecBlock).toContain('platform.zhang@huawei.com');
  });

  it('张伟 in zh SECRETARIAT uses zhangwei avatar import', () => {
    expect(zhSecBlock).toContain('img: zhangwei');
  });
});

describe('SECRETARIAT new member Wei Zhang — en', () => {
  it('en SECRETARIAT contains "Wei Zhang"', () => {
    expect(enSecBlock).toContain('Wei Zhang');
  });

  it('Wei Zhang in en SECRETARIAT has title "Legal Expert"', () => {
    expect(enSecBlock).toContain('Wei Zhang');
    expect(enSecBlock).toContain('Legal Expert');
  });

  it('Wei Zhang in en SECRETARIAT has correct email', () => {
    expect(enSecBlock).toContain('platform.zhang@huawei.com');
  });

  it('Wei Zhang in en SECRETARIAT uses zhangwei avatar import', () => {
    expect(enSecBlock).toContain('img: zhangwei');
  });

  it('en name uses Western order "Wei Zhang" not "Zhang Wei"', () => {
    expect(enSecBlock).toContain('Wei Zhang');
    expect(enSecBlock).not.toContain('Zhang Wei');
  });
});

describe('zhangwei import & avatar asset (issue 449)', () => {
  it('zhangwei import has been added', () => {
    expect(dataContent).toContain('import zhangwei from');
  });

  it('zhangwei import points to avatar path', () => {
    expect(dataContent).toContain(
      "import zhangwei from '@/assets/category/member/avatar/zhangwei.png';"
    );
  });

  it('zhangwei.png exists in avatar directory', () => {
    expect(existsSync(resolve(avatarDir, 'zhangwei.png'))).toBe(true);
  });
});

describe('zh/en SECRETARIAT i18n consistency after addition', () => {
  it('zh and en SECRETARIAT have the same number of members', () => {
    const zhCount = zhSecBlock.split('name:').length - 1;
    const enCount = enSecBlock.split('name:').length - 1;
    expect(zhCount).toBe(enCount);
  });

  it('zh SECRETARIAT has 6 members (5 existing + 张伟)', () => {
    const zhCount = zhSecBlock.split('name:').length - 1;
    expect(zhCount).toBe(6);
  });

  it('张伟 appears exactly once in zh SECRETARIAT', () => {
    const occurrences = (zhSecBlock.match(/张伟/g) || []).length;
    expect(occurrences).toBe(1);
  });

  it('Wei Zhang appears exactly once in en SECRETARIAT', () => {
    const occurrences = (enSecBlock.match(/Wei Zhang/g) || []).length;
    expect(occurrences).toBe(1);
  });

  it('张伟 is the last entry in zh SECRETARIAT (appended after 王凯慧)', () => {
    const zhangweiIdx = zhSecBlock.lastIndexOf('张伟');
    const kaihuiIdx = zhSecBlock.lastIndexOf('王凯慧');
    expect(zhangweiIdx).toBeGreaterThan(kaihuiIdx);
  });

  it('Wei Zhang is the last entry in en SECRETARIAT (appended after Kaihui Wang)', () => {
    const zhangIdx = enSecBlock.lastIndexOf('Wei Zhang');
    const kaihuiIdx = enSecBlock.lastIndexOf('Kaihui Wang');
    expect(zhangIdx).toBeGreaterThan(kaihuiIdx);
  });
});
