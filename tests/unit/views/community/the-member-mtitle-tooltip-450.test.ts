import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
// tests/unit/views/community/ → 上溯 4 级到仓库根
const rootDir = resolve(__dirname, '../../../../');
const memberPath = resolve(
  rootDir,
  'app/.vitepress/src/views/community/TheMember.vue'
);

expect(existsSync(memberPath), 'TheMember.vue 必须存在').toBe(true);
const content = readFileSync(memberPath, 'utf-8');

// 统计 .m-title 出现情况
const allMTitle = content.match(/class="m-title"/g) ?? [];
const mTitleWithTooltip =
  content.match(/class="m-title"\s+:title="user\.title"/g) ?? [];
// 旧写法：<p class="m-title"> 紧跟 >（无任何属性）——修复后应为 0
const mTitleWithoutTooltip = content.match(/<p class="m-title">/g) ?? [];

// 邻近字段回归守卫
const mNameWithTitle =
  content.match(/class="m-name"\s+:title="user\.name"/g) ?? [];
const mCompanyItemWithTitle =
  content.match(/class="m-company[^"]*"\s*(?::class="[^"]*"\s*)?:title="itemCompany"/g) ?? [];
const mCompanyUserWithTitle =
  content.match(/class="m-company"\s*(?::class="[^"]*"\s*)?:title="user\.company"/g) ?? [];

describe('issue #450: TheMember.vue .m-title 补 :title="user.title" 原生 tooltip 兜底', () => {
  it('TheMember.vue 源文件存在', () => {
    expect(existsSync(memberPath)).toBe(true);
  });

  it('.m-title 共 6 处渲染点（mobile 2 + PC 4）', () => {
    expect(allMTitle.length).toBe(6);
  });

  it('.m-title 6 处全部带 :title="user.title"（修复主验收）', () => {
    expect(mTitleWithTooltip.length).toBe(6);
  });

  it('.m-title 不再存在漏带 :title 的旧写法 <p class="m-title">（回归守卫）', () => {
    expect(mTitleWithoutTooltip.length).toBe(0);
  });

  it('每处 .m-title 的 :title 绑定与文本表达式同为 user.title（hover 全文 = 单元格全文）', () => {
    // 形如 <p class="m-title" :title="user.title">{{ user.title }}</p>
    const re = /<p class="m-title"\s+:title="user\.title">\s*\{\{\s*user\.title\s*\}\}\s*<\/p>/g;
    const matches = content.match(re) ?? [];
    expect(matches.length).toBe(6);
  });
});

describe('issue #450: 邻近字段未受波及（半截设计守卫）', () => {
  it('.m-name PC 4 处仍带 :title="user.name"（既有约定不回归）', () => {
    expect(mNameWithTitle.length).toBe(4);
  });

  it('.m-company 仍带 :title="itemCompany"（4 处 split 分支不回归）', () => {
    expect(mCompanyItemWithTitle.length).toBe(4);
  });

  it('.m-company 仍带 :title="user.company"（2 处 oGUG 子项不回归）', () => {
    expect(mCompanyUserWithTitle.length).toBe(2);
  });
});

describe('issue #450: 修复对齐同文件既有约定（设计意图验证）', () => {
  it('.m-title 与 .m-name 写法对齐：同为 <p class="…" :title="user.<field>">{{ user.<field> }}</p>', () => {
    const titlePattern = /<p class="m-title"\s+:title="user\.title">.*\{\{.*user\.title.*\}\}.*<\/p>/;
    const namePattern = /<p class="m-name"\s+:title="user\.name">.*\{\{.*user\.name.*\}\}.*<\/p>/;
    expect(titlePattern.test(content)).toBe(true);
    expect(namePattern.test(content)).toBe(true);
  });

  it(':title="user.title" 是纯模板属性绑定，不触发 window/document（SSR 安全，对照 rules/components.md §SSR/SSG）', () => {
    // 纯属性绑定，无脚本副作用；模板里 :title 行不包含 window / document 调用
    const titleLines = content
      .split(/\r?\n/)
      .filter((l) => l.includes(':title="user.title"'));
    expect(titleLines.length).toBe(6);
    for (const line of titleLines) {
      expect(line).not.toMatch(/\bwindow\b/);
      expect(line).not.toMatch(/\bdocument\b/);
    }
  });
});
