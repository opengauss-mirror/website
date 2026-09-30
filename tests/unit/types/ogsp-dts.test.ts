import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const dtsPath = resolve(rootDir, 'app/.vitepress/src-new/@types/content/ogsp.d.ts');

const content = readFileSync(dtsPath, 'utf-8');

describe('ogsp.d.ts — OgspTableHeadersT 含 level 字段', () => {
  it('源文件存在 OgspTableHeadersT 接口', () => {
    expect(content).toContain('OgspTableHeadersT');
  });

  it('OgspTableHeadersT 含 level: string 字段', () => {
    expect(content).toMatch(/OgspTableHeadersT[\s\S]*?level:\s*string/);
  });

  it('OgspTableHeadersT 字段数 = 11（含 level）', () => {
    const blockStart = content.indexOf('OgspTableHeadersT');
    const blockEnd = content.indexOf('}', blockStart);
    const block = content.slice(blockStart, blockEnd);
    const expected = [
      'name',
      'level',
      'version',
      'award',
      'expiration',
      'patch',
      'content',
      'system',
      'commitment',
      'experience',
      'certificate',
    ];
    for (const key of expected) {
      expect(block).toContain(`${key}: string`);
    }
  });
});

describe('ogsp.d.ts — OgspItemT 含 level 字段', () => {
  it('源文件存在 OgspItemT 接口', () => {
    expect(content).toContain('OgspItemT');
  });

  it('OgspItemT 含 level: string 字段', () => {
    expect(content).toMatch(/OgspItemT[\s\S]*?level:\s*string/);
  });

  it('OgspItemT 字段数 = 11（含 level）', () => {
    const blockStart = content.indexOf('OgspItemT');
    const blockEnd = content.indexOf('}', blockStart);
    const block = content.slice(blockStart, blockEnd);
    const expected = [
      'name',
      'level',
      'version',
      'award',
      'expiration',
      'patch',
      'content',
      'system',
      'commitment',
      'experience',
      'certificate',
    ];
    for (const key of expected) {
      expect(block).toContain(`${key}: string`);
    }
  });
});

describe('ogsp.d.ts — level 字段顺序（name 之后、version 之前）', () => {
  it('OgspTableHeadersT 中 level 在 name 之后、version 之前', () => {
    const blockStart = content.indexOf('OgspTableHeadersT');
    const blockEnd = content.indexOf('}', blockStart);
    const block = content.slice(blockStart, blockEnd);
    const nameIdx = block.indexOf('name:');
    const levelIdx = block.indexOf('level:');
    const versionIdx = block.indexOf('version:');
    expect(nameIdx).toBeGreaterThan(-1);
    expect(levelIdx).toBeGreaterThan(nameIdx);
    expect(versionIdx).toBeGreaterThan(levelIdx);
  });

  it('OgspItemT 中 level 在 name 之后、version 之前', () => {
    const blockStart = content.indexOf('OgspItemT');
    const blockEnd = content.indexOf('}', blockStart);
    const block = content.slice(blockStart, blockEnd);
    const nameIdx = block.indexOf('name:');
    const levelIdx = block.indexOf('level:');
    const versionIdx = block.indexOf('version:');
    expect(nameIdx).toBeGreaterThan(-1);
    expect(levelIdx).toBeGreaterThan(nameIdx);
    expect(versionIdx).toBeGreaterThan(levelIdx);
  });
});
