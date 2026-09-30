import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const zhTdkPath = resolve(rootDir, '.geo/tdks/zh/ogsp/index.json');
const enTdkPath = resolve(rootDir, '.geo/tdks/en/ogsp/index.json');

const zhTdk = JSON.parse(readFileSync(zhTdkPath, 'utf-8'));
const enTdk = JSON.parse(readFileSync(enTdkPath, 'utf-8'));

describe('oGSP TDK — zh description 含 "级别"', () => {
  it('zh description 为非空字符串', () => {
    expect(typeof zhTdk.description).toBe('string');
    expect(zhTdk.description.length).toBeGreaterThan(0);
  });

  it('zh description 包含 "级别"（反映新增 level 列）', () => {
    expect(zhTdk.description).toContain('级别');
  });

  it('zh title / keywords 仍含 openGauss / 服务商', () => {
    expect(zhTdk.title).toContain('服务商');
    expect(zhTdk.keywords).toContain('openGauss');
  });
});

describe('oGSP TDK — en description 含 "level"', () => {
  it('en description 为非空字符串', () => {
    expect(typeof enTdk.description).toBe('string');
    expect(enTdk.description.length).toBeGreaterThan(0);
  });

  it('en description 包含 "level"（反映新增 level 列）', () => {
    const lower = enTdk.description.toLowerCase();
    expect(lower).toContain('level');
  });

  it('en title 含 oGSP / keywords 含 openGauss', () => {
    expect(enTdk.title).toContain('oGSP');
    expect(enTdk.keywords).toContain('openGauss');
  });
});

describe('oGSP TDK — 双语字段结构一致', () => {
  it('zh / en 均有 title / description / keywords 三字段', () => {
    for (const tdk of [zhTdk, enTdk]) {
      expect(tdk.title).toBeDefined();
      expect(tdk.description).toBeDefined();
      expect(tdk.keywords).toBeDefined();
    }
  });
});
