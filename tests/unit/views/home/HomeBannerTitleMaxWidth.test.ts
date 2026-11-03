import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const bannerPath = resolve(rootDir, 'app/.vitepress/src-new/views/home/HomeBanner.vue');
const source = readFileSync(bannerPath, 'utf-8');

/** 从源文本中提取 `<style ...>` 块内容。 */
function extractStyleBlock(src: string): string {
  const m = src.match(/<style[^>]*>([\s\S]*?)<\/style>/);
  return m ? m[1] : '';
}

/** 提取某个选择器 / include 规则块的花括号内文本（支持嵌套）。
 *  selectorRe 须吞掉选择器后首个 "{"。 */
function extractBlock(src: string, selectorRe: RegExp): string | null {
  const m = selectorRe.exec(src);
  if (!m) return null;
  const openIdx = m.index + m[0].length;
  let depth = 1;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) return src.slice(openIdx, i);
    }
  }
  return null;
}

const styleBlock = extractStyleBlock(source);
// .title 选择器（排除 .teamup-title，因后者无 "." 紧邻 title）
const titleBlock = extractBlock(styleBlock, /(?<![A-Za-z-])\.title\s*\{/);

describe('HomeBanner.vue — .title 规则存在', () => {
  it('<style> 块存在', () => {
    expect(styleBlock.length).toBeGreaterThan(0);
  });

  it('.title 选择器块存在', () => {
    expect(titleBlock, '.title 块必须存在').not.toBeNull();
  });
});

describe('HomeBanner.vue — .title max-width 已从百分比改为栅格变量', () => {
  it('不再使用旧的 max-width: 60% 默认值（百分比已移除）', () => {
    expect(titleBlock).not.toContain('max-width: 60%');
  });

  it('base max-width 使用 var(--o-r-grid-3)（phone 0-600 区间）', () => {
    expect(titleBlock).toMatch(/max-width:\s*var\(--o-r-grid-3\)/);
  });

  it('所有 max-width 声明均使用 var(--o-r-grid-*)，无硬编码百分比/像素', () => {
    const lines = titleBlock!.split('\n').filter((l) => /max-width\s*:/.test(l));
    expect(lines.length).toBeGreaterThanOrEqual(1);
    for (const l of lines) {
      expect(l).toMatch(/var\(--o-r-grid-\d+\)/);
      expect(l).not.toMatch(/max-width\s*:\s*\d+%/);
      expect(l).not.toMatch(/max-width\s*:\s*\d+px/);
    }
  });
});

describe('HomeBanner.vue — <=pad_v 字号/居中保持不变（设计 §3 关键约束）', () => {
  const lePadV = extractBlock(titleBlock!, /@include\s+respond\('<=pad_v'\)\s*\{/);

  it('<=pad_v 子块存在', () => {
    expect(lePadV, '<=pad_v 子块必须存在').not.toBeNull();
  });

});

describe('HomeBanner.vue — 样式红线合规（AGENTS.md §4 红线 #5）', () => {
  it('.title 块内无 !important', () => {
    expect(titleBlock).not.toContain('!important');
  });

  it('.title 块内无硬编码 @media 断点（统一用 respond mixin）', () => {
    expect(titleBlock).not.toMatch(/@media\s*\(/);
  });

  it('.title 块内无硬编码颜色 hex', () => {
    expect(titleBlock).not.toMatch(/#[0-9a-fA-F]{3,8}\b/);
  });
});
