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

const REMOVED_COMPANIES = ['邮储银行', '邮政储蓄', '软通动力'];

describe('oGSP yaml — table_headers 含 level 字段', () => {
  it('zh table_headers 含 level 字段', () => {
    expect(zhData.table_headers.level).toBeDefined();
    expect(typeof zhData.table_headers.level).toBe('string');
    expect(zhData.table_headers.level.length).toBeGreaterThan(0);
  });

  it('en table_headers 含 level 字段', () => {
    expect(enData.table_headers.level).toBeDefined();
    expect(typeof enData.table_headers.level).toBe('string');
    expect(enData.table_headers.level.length).toBeGreaterThan(0);
  });

  it('zh table_headers.level 为 "级别"', () => {
    expect(zhData.table_headers.level).toBe('级别');
  });

  it('en table_headers.level 为 "Level"', () => {
    expect(enData.table_headers.level).toBe('Level');
  });

  it('table_headers 字段数 = 11（含 level）', () => {
    const expectedKeys = [
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
    expect(Object.keys(zhData.table_headers).sort()).toEqual([...expectedKeys].sort());
    expect(Object.keys(enData.table_headers).sort()).toEqual([...expectedKeys].sort());
    expect(Object.keys(zhData.table_headers).length).toBe(11);
    expect(Object.keys(enData.table_headers).length).toBe(11);
  });
});

describe('oGSP yaml — certifications 共 6 家', () => {
  it('zh certifications 数组长度 = 6', () => {
    expect(Array.isArray(zhData.certifications)).toBe(true);
    expect(zhData.certifications.length).toBe(6);
  });

  it('en certifications 数组长度 = 6', () => {
    expect(Array.isArray(enData.certifications)).toBe(true);
    expect(enData.certifications.length).toBe(6);
  });
});

describe('oGSP yaml — 每条 certification 含 level 字段', () => {
  it('zh 每条 certification 均含 level（非空字符串）', () => {
    for (const item of zhData.certifications) {
      expect(item.level).toBeDefined();
      expect(typeof item.level).toBe('string');
      expect(item.level.length).toBeGreaterThan(0);
    }
  });

  it('en 每条 certification 均含 level（非空字符串）', () => {
    for (const item of enData.certifications) {
      expect(item.level).toBeDefined();
      expect(typeof item.level).toBe('string');
      expect(item.level.length).toBeGreaterThan(0);
    }
  });
});

describe('oGSP yaml — 级别值映射（5 优选级 + 1 认证级）', () => {
  it('zh 5 家 level = "优选级"', () => {
    const premium = zhData.certifications.filter((c: any) => c.level === '优选级');
    expect(premium.length).toBe(5);
  });

  it('zh 1 家 level = "认证级"', () => {
    const certified = zhData.certifications.filter((c: any) => c.level === '认证级');
    expect(certified.length).toBe(1);
  });

  it('en 5 家 level = "Premium"', () => {
    const premium = enData.certifications.filter((c: any) => c.level === 'Premium');
    expect(premium.length).toBe(5);
  });

  it('en 1 家 level = "Certified"', () => {
    const certified = enData.certifications.filter((c: any) => c.level === 'Certified');
    expect(certified.length).toBe(1);
  });

  it('zh 中软国际科技服务有限公司 level = "认证级"', () => {
    const entry = zhData.certifications.find((c: any) => c.name === '中软国际科技服务有限公司');
    expect(entry).toBeDefined();
    expect(entry.level).toBe('认证级');
  });

  it('en 中软国际科技服务有限公司 level = "Certified"', () => {
    const entry = enData.certifications.find((c: any) => c.name === '中软国际科技服务有限公司');
    expect(entry).toBeDefined();
    expect(entry.level).toBe('Certified');
  });
});

describe('oGSP yaml — 邮储银行 / 软通动力 已移除', () => {
  it('zh 源文件不含邮储 / 软通动力 字面量', () => {
    for (const term of REMOVED_COMPANIES) {
      expect(zhRaw).not.toContain(term);
    }
  });

  it('en 源文件不含邮储 / 软通动力 字面量', () => {
    for (const term of REMOVED_COMPANIES) {
      expect(enRaw).not.toContain(term);
    }
  });

  it('zh certifications 名称不含邮储 / 软通动力', () => {
    const names = zhData.certifications.map((c: any) => c.name);
    for (const term of REMOVED_COMPANIES) {
      for (const name of names) {
        expect(name).not.toContain(term);
      }
    }
  });

  it('en certifications 名称不含邮储 / 软通动力', () => {
    const names = enData.certifications.map((c: any) => c.name);
    for (const term of REMOVED_COMPANIES) {
      for (const name of names) {
        expect(name).not.toContain(term);
      }
    }
  });
});

describe('oGSP yaml — zh / en 双语一致性', () => {
  it('zh / en certifications 公司名称列表完全一致', () => {
    const zhNames = zhData.certifications.map((c: any) => c.name);
    const enNames = enData.certifications.map((c: any) => c.name);
    expect(zhNames).toEqual(enNames);
  });

  it('zh / en certifications 证书编号（version）完全一致', () => {
    const zhVersions = zhData.certifications.map((c: any) => c.version);
    const enVersions = enData.certifications.map((c: any) => c.version);
    expect(zhVersions).toEqual(enVersions);
  });

  it('zh / en certifications 颁发日期（award）完全一致', () => {
    const zhAwards = zhData.certifications.map((c: any) => c.award);
    const enAwards = enData.certifications.map((c: any) => c.award);
    expect(zhAwards).toEqual(enAwards);
  });

  it('zh / en certifications 有效截止日期（expiration）完全一致', () => {
    const zhExps = zhData.certifications.map((c: any) => c.expiration);
    const enExps = enData.certifications.map((c: any) => c.expiration);
    expect(zhExps).toEqual(enExps);
  });

  it('zh / en certifications 证书下载链接（certificate）完全一致', () => {
    const zhCerts = zhData.certifications.map((c: any) => c.certificate);
    const enCerts = enData.certifications.map((c: any) => c.certificate);
    expect(zhCerts).toEqual(enCerts);
  });

  it('zh / en certifications 同名条目 level 语义一致（优选级↔Premium、认证级↔Certified）', () => {
    const levelMap: Record<string, string> = { 优选级: 'Premium', 认证级: 'Certified' };
    for (const zhItem of zhData.certifications) {
      const enItem = enData.certifications.find((c: any) => c.name === zhItem.name);
      expect(enItem).toBeDefined();
      expect(enItem.level).toBe(levelMap[zhItem.level]);
    }
  });
});

describe('oGSP yaml — 证书下载链接为外部 OBS URL', () => {
  it('zh 所有 certificate 为 distributioncertification OBS URL', () => {
    for (const item of zhData.certifications) {
      expect(item.certificate).toMatch(/^https:\/\/distributioncertification-beijing4\.obs\.cn-north-4\.myhuaweicloud\.com\/oGSPCertificate\//);
    }
  });

  it('en 所有 certificate 为 distributioncertification OBS URL', () => {
    for (const item of enData.certifications) {
      expect(item.certificate).toMatch(/^https:\/\/distributioncertification-beijing4\.obs\.cn-north-4\.myhuaweicloud\.com\/oGSPCertificate\//);
    }
  });
});

describe('oGSP yaml — 日期格式 YYYY-MM-DD', () => {
  it('zh award / expiration 格式正确', () => {
    const dateRe = /^\d{4}-\d{2}-\d{2}$/;
    for (const item of zhData.certifications) {
      expect(dateRe.test(item.award)).toBe(true);
      expect(dateRe.test(item.expiration)).toBe(true);
    }
  });

  it('en award / expiration 格式正确', () => {
    const dateRe = /^\d{4}-\d{2}-\d{2}$/;
    for (const item of enData.certifications) {
      expect(dateRe.test(item.award)).toBe(true);
      expect(dateRe.test(item.expiration)).toBe(true);
    }
  });
});
