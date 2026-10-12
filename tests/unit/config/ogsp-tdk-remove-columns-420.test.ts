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
const zhRaw = readFileSync(zhTdkPath, 'utf-8');
const enRaw = readFileSync(enTdkPath, 'utf-8');

describe('oGSP TDK 420 — zh description 不含已删列措辞', () => {
  it('zh description 不含 "服务能力评级"', () => {
    expect(zhTdk.description).not.toContain('服务能力评级');
  });

  it('zh 原始文件不含 "服务能力评级"', () => {
    expect(zhRaw).not.toContain('服务能力评级');
  });

  it('zh description 不含 "BUG修复与补丁版本发布" / "服务内容" / "服务体系" / "服务承诺" / "项目经验"', () => {
    expect(zhTdk.description).not.toContain('BUG修复与补丁版本发布');
    expect(zhTdk.description).not.toContain('服务内容');
    expect(zhTdk.description).not.toContain('服务体系');
    expect(zhTdk.description).not.toContain('服务承诺');
    expect(zhTdk.description).not.toContain('项目经验');
  });
});

describe('oGSP TDK 420 — en description 不含已删列措辞', () => {
  it('en description 不含 "service quality ratings"', () => {
    expect(enTdk.description.toLowerCase()).not.toContain('service quality ratings');
  });

  it('en description 不含 "bug fixing"', () => {
    expect(enTdk.description.toLowerCase()).not.toContain('bug fixing');
  });

  it('en description 不含 "service contents"', () => {
    expect(enTdk.description.toLowerCase()).not.toContain('service contents');
  });

  it('en description 不含 "service system"', () => {
    expect(enTdk.description.toLowerCase()).not.toContain('service system');
  });

  it('en description 不含 "service commitment"', () => {
    expect(enTdk.description.toLowerCase()).not.toContain('service commitment');
  });

  it('en description 不含 "project experience"', () => {
    expect(enTdk.description.toLowerCase()).not.toContain('project experience');
  });

  it('en 原始文件不含 "Bug Fixing and Patch Release"', () => {
    expect(enRaw).not.toContain('Bug Fixing and Patch Release');
  });
});

describe('oGSP TDK 420 — description 仍含保留列措辞', () => {
  it('zh description 仍含 "级别" / "有效期"', () => {
    expect(zhTdk.description).toContain('级别');
    expect(zhTdk.description).toContain('有效期');
  });

  it('en description 仍含 "level" / "expiration"', () => {
    expect(enTdk.description.toLowerCase()).toContain('level');
    expect(enTdk.description.toLowerCase()).toContain('expiration');
  });
});
