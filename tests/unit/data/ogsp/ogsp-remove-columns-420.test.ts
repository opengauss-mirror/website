import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const zhYamlPath = resolve(rootDir, '.content/ogsp/zh.yaml');
const enYamlPath = resolve(rootDir, '.content/ogsp/en.yaml');

const zhRaw = readFileSync(zhYamlPath, 'utf-8');
const enRaw = readFileSync(enYamlPath, 'utf-8');
const zhData = YAML.load(zhRaw) as any;
const enData = YAML.load(enRaw) as any;

const REMOVED_FIELDS = ['patch', 'content', 'system', 'commitment', 'experience'];

const zhTableHeadersRemoved: Record<string, string> = {
  patch: 'BUG修复与补丁版本发布',
  content: '服务内容',
  system: '服务体系',
  commitment: '服务承诺',
  experience: '项目经验',
};

const enTableHeadersRemoved: Record<string, string> = {
  patch: 'Bug Fixing and Patch Release',
  content: 'Service Contents',
  system: 'Service System',
  commitment: 'Service Commitment',
  experience: 'Project Experience',
};

describe('oGSP yaml 420 — table_headers 不含已删 5 字段', () => {
  it('zh table_headers 不含 patch/content/system/commitment/experience', () => {
    for (const field of REMOVED_FIELDS) {
      expect(zhData.table_headers[field]).toBeUndefined();
    }
  });

  it('en table_headers 不含 patch/content/system/commitment/experience', () => {
    for (const field of REMOVED_FIELDS) {
      expect(enData.table_headers[field]).toBeUndefined();
    }
  });

  it('zh table_headers 键数 = 6（不含已删字段）', () => {
    expect(Object.keys(zhData.table_headers).length).toBe(6);
  });

  it('en table_headers 键数 = 6（不含已删字段）', () => {
    expect(Object.keys(enData.table_headers).length).toBe(6);
  });
});

describe('oGSP yaml 420 — certifications 每条不含已删 5 字段', () => {
  it('zh 每条 certification 不含 patch/content/system/commitment/experience', () => {
    for (const item of zhData.certifications) {
      for (const field of REMOVED_FIELDS) {
        expect(item[field]).toBeUndefined();
      }
    }
  });

  it('en 每条 certification 不含 patch/content/system/commitment/experience', () => {
    for (const item of enData.certifications) {
      for (const field of REMOVED_FIELDS) {
        expect(item[field]).toBeUndefined();
      }
    }
  });

  it('zh 每条 certification 键数 = 6', () => {
    for (const item of zhData.certifications) {
      expect(Object.keys(item).length).toBe(6);
    }
  });

  it('en 每条 certification 键数 = 6', () => {
    for (const item of enData.certifications) {
      expect(Object.keys(item).length).toBe(6);
    }
  });
});

describe('oGSP yaml 420 — 原始文件不含已删字段字面量', () => {
  it('zh.yaml 不含 "patch:" / "content:" / "system:" / "commitment:" / "experience:" 数据键', () => {
    for (const field of REMOVED_FIELDS) {
      expect(zhRaw).not.toMatch(new RegExp(`^\\s+${field}:`, 'm'));
    }
  });

  it('en.yaml 不含 "patch:" / "content:" / "system:" / "commitment:" / "experience:" 数据键', () => {
    for (const field of REMOVED_FIELDS) {
      expect(enRaw).not.toMatch(new RegExp(`^\\s+${field}:`, 'm'));
    }
  });
});

describe('oGSP yaml 420 — 原始文件不含已删表头文案', () => {
  it('zh.yaml 不含 BUG修复与补丁版本发布 / 服务内容 / 服务体系 / 服务承诺 / 项目经验（表头值）', () => {
    for (const value of Object.values(zhTableHeadersRemoved)) {
      expect(zhRaw).not.toContain(value);
    }
  });

  it('en.yaml 不含 Bug Fixing and Patch Release / Service Contents / Service System / Service Commitment / Project Experience（表头值）', () => {
    for (const value of Object.values(enTableHeadersRemoved)) {
      expect(enRaw).not.toContain(value);
    }
  });
});

describe('oGSP yaml 420 — 原始文件不含已删行内评级值', () => {
  it('zh.yaml 不含 "patch: ✓" 行', () => {
    expect(zhRaw).not.toMatch(/^\s*patch:\s*✓/m);
  });

  it('zh.yaml 不含 content/system/commitment/experience 单字"优"行（行内评级）', () => {
    expect(zhRaw).not.toMatch(/^\s*(content|system|commitment|experience):\s*优\s*$/m);
  });

  it('en.yaml 不含 "patch: ✓" 行', () => {
    expect(enRaw).not.toMatch(/^\s*patch:\s*✓/m);
  });

  it('en.yaml 不含 content/system/commitment/experience "Excellent" 行（行内评级）', () => {
    expect(enRaw).not.toMatch(/^\s*(content|system|commitment|experience):\s*Excellent\s*$/m);
  });
});

describe('oGSP yaml 420 — zh / en 字段集一致（均仅 6 字段）', () => {
  it('zh / en table_headers 键集完全一致', () => {
    expect(Object.keys(zhData.table_headers).sort()).toEqual(Object.keys(enData.table_headers).sort());
  });

  it('zh / en 每条 certification 键集完全一致', () => {
    expect(zhData.certifications.length).toBe(enData.certifications.length);
    for (let i = 0; i < zhData.certifications.length; i++) {
      expect(Object.keys(zhData.certifications[i]).sort()).toEqual(
        Object.keys(enData.certifications[i]).sort()
      );
    }
  });
});
