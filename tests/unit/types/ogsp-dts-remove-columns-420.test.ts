import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const dtsPath = resolve(rootDir, 'app/.vitepress/src-new/@types/content/ogsp.d.ts');

const content = readFileSync(dtsPath, 'utf-8');

const REMOVED_FIELDS = ['patch', 'content', 'system', 'commitment', 'experience'];

function extractInterfaceBlock(name: string): string {
  const blockStart = content.indexOf(name);
  expect(blockStart).toBeGreaterThan(-1);
  const blockEnd = content.indexOf('}', blockStart);
  return content.slice(blockStart, blockEnd);
}

describe('ogsp.d.ts 420 — OgspTableHeadersT 不含已删 5 字段', () => {
  it('OgspTableHeadersT 接口块不含 patch/content/system/commitment/experience 字段声明', () => {
    const block = extractInterfaceBlock('OgspTableHeadersT');
    for (const field of REMOVED_FIELDS) {
      expect(block).not.toContain(`${field}: string`);
    }
  });

  it('OgspTableHeadersT 不含 patch: string', () => {
    const block = extractInterfaceBlock('OgspTableHeadersT');
    expect(block).not.toContain('patch: string');
  });
});

describe('ogsp.d.ts 420 — OgspItemT 不含已删 5 字段', () => {
  it('OgspItemT 接口块不含 patch/content/system/commitment/experience 字段声明', () => {
    const block = extractInterfaceBlock('OgspItemT');
    for (const field of REMOVED_FIELDS) {
      expect(block).not.toContain(`${field}: string`);
    }
  });
});

describe('ogsp.d.ts 420 — 整文件不含已删字段类型声明', () => {
  it('ogsp.d.ts 不含 "patch: string" 类型声明', () => {
    expect(content).not.toMatch(/patch:\s*string/);
  });

  it('ogsp.d.ts 不含 "content: string" 类型声明', () => {
    expect(content).not.toMatch(/content:\s*string/);
  });

  it('ogsp.d.ts 不含 "system: string" 类型声明', () => {
    expect(content).not.toMatch(/system:\s*string/);
  });

  it('ogsp.d.ts 不含 "commitment: string" 类型声明', () => {
    expect(content).not.toMatch(/commitment:\s*string/);
  });

  it('ogsp.d.ts 不含 "experience: string" 类型声明', () => {
    expect(content).not.toMatch(/experience:\s*string/);
  });
});

describe('ogsp.d.ts 420 — 字段名不在已删字段集中出现', () => {
  it('patch 字面量不出现在 d.ts 中', () => {
    expect(content).not.toContain('patch');
  });

  it('commitment 字面量不出现在 d.ts 中', () => {
    expect(content).not.toContain('commitment');
  });

  it('experience 字面量不出现在 d.ts 中', () => {
    expect(content).not.toContain('experience');
  });
});
