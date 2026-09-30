import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const vuePath = resolve(rootDir, 'app/.vitepress/src/views/authentication/ogsp/TheOgsp.vue');

const content = readFileSync(vuePath, 'utf-8');

describe('TheOgsp.vue — PC 表格含 level 列', () => {
  it('存在 OTableColumn 引用 ogspData.table_headers.level', () => {
    expect(content).toContain('ogspData.table_headers.level');
  });

  it('level 列使用 OTableColumn 组件（PC）', () => {
    expect(content).toMatch(/<OTableColumn[^>]*label="ogspData\.table_headers\.level"[^>]*>/);
  });

  it('level 列 prop="level"', () => {
    expect(content).toMatch(/<OTableColumn[^>]*prop="level"[^>]*>/);
  });

  it('name 列后紧跟 level 列（顺序正确）', () => {
    const nameIdx = content.indexOf('ogspData.table_headers.name');
    const levelIdx = content.indexOf('ogspData.table_headers.level');
    expect(nameIdx).toBeGreaterThan(-1);
    expect(levelIdx).toBeGreaterThan(-1);
    expect(levelIdx).toBeGreaterThan(nameIdx);
  });

  it('table_headers 字段引用数为 11（含 level）', () => {
    const headerRefs = [
      'table_headers.name',
      'table_headers.level',
      'table_headers.version',
      'table_headers.award',
      'table_headers.expiration',
      'table_headers.patch',
      'table_headers.content',
      'table_headers.system',
      'table_headers.commitment',
      'table_headers.experience',
      'table_headers.certificate',
    ];
    for (const h of headerRefs) {
      expect(content).toContain(h);
    }
  });
});

describe('TheOgsp.vue — 移动端列表含 level 项', () => {
  it('移动端 li 渲染 item.level', () => {
    expect(content).toContain('{{ item.level }}');
  });

  it('移动端 li 渲染 ogspData.table_headers.level', () => {
    expect(content).toMatch(/<li>[\s\S]*?ogspData\.table_headers\.level[\s\S]*?<\/li>/);
  });

  it('移动端 name li 后紧跟 level li（顺序正确）', () => {
    const nameLiIdx = content.indexOf('{{ ogspData.table_headers.name }}:');
    const levelLiIdx = content.indexOf('{{ ogspData.table_headers.level }}:');
    expect(nameLiIdx).toBeGreaterThan(-1);
    expect(levelLiIdx).toBeGreaterThan(-1);
    expect(levelLiIdx).toBeGreaterThan(nameLiIdx);
  });
});

describe('TheOgsp.vue — 移动端 expiration 行 nth-child(5) flex 布局', () => {
  it('li:nth-child(5) 应用 display: flex（level 插入后 expiration 行顺移到第 5）', () => {
    expect(content).toMatch(/li:nth-child\(5\)/);
    expect(content).toMatch(/li:nth-child\(5\)[\s\S]*?display:\s*flex/);
  });

  it('li:nth-child(4) 不再单独应用 flex 布局（原 expiration 行已顺移）', () => {
    expect(content).not.toMatch(/li:nth-child\(4\)[\s\S]{0,80}display:\s*flex/);
  });

  it('li:nth-child(5) 的 span 设置 min-width', () => {
    expect(content).toMatch(/li:nth-child\(5\)[\s\S]*?min-width/);
  });
});

describe('TheOgsp.vue — table_headers 顺序与 YAML 字段一致', () => {
  it('PC 列顺序：name → level → version → award → expiration → ...', () => {
    const nameIdx = content.indexOf('ogspData.table_headers.name');
    const levelIdx = content.indexOf('ogspData.table_headers.level');
    const versionIdx = content.indexOf('ogspData.table_headers.version');
    expect(levelIdx).toBeGreaterThan(nameIdx);
    expect(versionIdx).toBeGreaterThan(levelIdx);
  });
});
