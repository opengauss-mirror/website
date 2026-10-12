import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const vuePath = resolve(rootDir, 'app/.vitepress/src/views/authentication/ogsp/TheOgsp.vue');

const content = readFileSync(vuePath, 'utf-8');

const REMOVED_FIELDS = ['patch', 'content', 'system', 'commitment', 'experience'];

const REMOVED_HEADER_LABELS_ZH = [
  'BUG修复与补丁版本发布',
  '服务内容',
  '服务体系',
  '服务承诺',
  '项目经验',
];

const REMOVED_HEADER_LABELS_EN = [
  'Bug Fixing and Patch Release',
  'Service Contents',
  'Service System',
  'Service Commitment',
  'Project Experience',
];

describe('TheOgsp.vue 420 — PC 表格不含已删 5 列', () => {
  it('模板不含 ogspData.table_headers.patch 等 5 个引用', () => {
    for (const field of REMOVED_FIELDS) {
      expect(content).not.toContain(`table_headers.${field}`);
    }
  });

  it('不含 prop="patch" 等 5 个 OTableColumn prop', () => {
    for (const field of REMOVED_FIELDS) {
      expect(content).not.toMatch(new RegExp(`prop="${field}"`));
    }
  });

  it('PC OTableColumn 数量 = 5 + 1 el-table-column = 6（不含已删 5 列）', () => {
    const oMatches = content.match(/<OTableColumn\b/g) || [];
    const elMatches = content.match(/<el-table-column\b/g) || [];
    expect(oMatches.length).toBe(5);
    expect(elMatches.length).toBe(1);
  });
});

describe('TheOgsp.vue 420 — 移动端列表不含已删 5 项', () => {
  it('模板不含 item.patch 等 5 个移动端字段引用', () => {
    for (const field of REMOVED_FIELDS) {
      expect(content).not.toContain(`item.${field}`);
    }
  });
});

describe('TheOgsp.vue 420 — 原始文件不含已删表头文案', () => {
  it('不含已删中文表头文案', () => {
    for (const label of REMOVED_HEADER_LABELS_ZH) {
      expect(content).not.toContain(label);
    }
  });

  it('不含已删英文表头文案', () => {
    for (const label of REMOVED_HEADER_LABELS_EN) {
      expect(content).not.toContain(label);
    }
  });
});

describe('TheOgsp.vue 420 — 保留列引用仍存在', () => {
  it('仍含 6 个保留列的 table_headers 引用', () => {
    const kept = ['name', 'level', 'version', 'award', 'expiration', 'certificate'];
    for (const field of kept) {
      expect(content).toContain(`table_headers.${field}`);
    }
  });

  it('仍含 certificate 下载链接渲染（scope.row.certificate）', () => {
    expect(content).toContain('scope.row.certificate');
  });
});
