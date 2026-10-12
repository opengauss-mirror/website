import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const readmePath = resolve(rootDir, '.content/ogsp/README.md');

const content = readFileSync(readmePath, 'utf-8');

const REMOVED_FIELDS = ['patch', 'content', 'system', 'commitment', 'experience'];

describe('ogsp README 420 — 数据板块 table_headers 描述不含已删字段', () => {
  it('table_headers 行仅列 6 字段（name、level、version、award、expiration、certificate）', () => {
    const line = content.split('\n').find((l) => l.includes('`table_headers`') && l.includes('对象'));
    expect(line).toBeDefined();
    expect(line).toContain('name');
    expect(line).toContain('level');
    expect(line).toContain('certificate');
    for (const field of REMOVED_FIELDS) {
      expect(line).not.toContain(field);
    }
  });
});

describe('ogsp README 420 — Schema 表不含已删字段行', () => {
  it('table_headers Schema 表不含 patch/content/system/commitment/experience 行', () => {
    const lines = content.split('\n');
    const thStart = content.indexOf('### table_headers');
    const tipsStart = content.indexOf('### tips');
    const thBlock = content.slice(thStart, tipsStart);
    for (const field of REMOVED_FIELDS) {
      const fieldRow = lines.find((l) => l.trim().startsWith(`| ${field} |`));
      expect(thBlock).not.toContain(`| ${field} |`);
    }
  });

  it('certifications[] Schema 表不含 patch/content/system/commitment/experience 行', () => {
    const certStart = content.indexOf('### certifications[]');
    const certBlock = content.slice(certStart);
    for (const field of REMOVED_FIELDS) {
      expect(certBlock).not.toContain(`| ${field} |`);
    }
  });

  it('table_headers Schema 表保留 6 字段', () => {
    const thStart = content.indexOf('### table_headers');
    const tipsStart = content.indexOf('### tips');
    const thBlock = content.slice(thStart, tipsStart);
    for (const field of ['name', 'level', 'version', 'award', 'expiration', 'certificate']) {
      expect(thBlock).toContain(`| ${field} |`);
    }
  });

  it('certifications[] Schema 表保留 6 字段', () => {
    const certStart = content.indexOf('### certifications[]');
    const certBlock = content.slice(certStart);
    for (const field of ['name', 'level', 'version', 'award', 'expiration', 'certificate']) {
      expect(certBlock).toContain(`| ${field} |`);
    }
  });
});
