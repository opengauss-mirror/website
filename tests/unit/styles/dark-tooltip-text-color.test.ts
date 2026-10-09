import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const themePath = resolve(
  rootDir,
  'app/.vitepress/src-new/assets/style/element-plus/theme/index.scss'
);

const content = readFileSync(themePath, 'utf-8');

/** 提取某个选择器规则块的花括号内文本（支持嵌套）。 */
function extractBlock(src: string, selectorRe: RegExp): string | null {
  const m = selectorRe.exec(src);
  if (!m) return null;
  // regex 已吞掉选择器后的 "{"，故起始 depth=1
  const openIdx = m.index + m[0].length;
  let depth = 1;
  for (let i = openIdx; i < src.length; i++) {
    const ch = src[i];
    if (ch === '{') {
      depth++;
    } else if (ch === '}') {
      depth--;
      if (depth === 0) return src.slice(openIdx, i);
    }
  }
  return null;
}

const darkBlock = extractBlock(content, /\[data-o-theme='g\.dark'\]\s+div\.is-dark\s*\{/);
const lightBlock = extractBlock(content, /\[data-o-theme='g\.light'\]\s+div\.is-dark\s*\{/);

describe('暗色主题 dark tooltip 文字色修复 — element-plus/theme/index.scss', () => {
  it('存在 [data-o-theme="g.dark"] div.is-dark 覆写块', () => {
    expect(darkBlock, 'dark 块必须存在').not.toBeNull();
  });

  it('dark 块内 --el-bg-color: var(--el-color-white)（暗色修复项：深底浅字）', () => {
    expect(darkBlock).toContain('--el-bg-color: var(--el-color-white)');
  });

  it('暗色修复值使用 CSS 变量 var(--el-color-white)，非硬编码颜色（符合 styling 红线）', () => {
    expect(darkBlock).toMatch(/--el-bg-color:\s*var\(--el-color-white\)/);
    expect(darkBlock).not.toMatch(/--el-bg-color:\s*#[0-9a-fA-F]{3,8}/);
  });

  it('dark 块内 --el-text-color-primary 仍为深色 #1d1e1f（tooltip 背景保持深色 → 深底浅字）', () => {
    expect(darkBlock).toContain('--el-text-color-primary: #1d1e1f');
  });

  it('dark 块内 --el-bg-color 不再解析为深色 hex（回归守卫：避免重新撞色）', () => {
    // 修复前 dark 块未声明 --el-bg-color，暗色主题下解析为 EP 默认 #141414（深）与深背景撞色
    const bgLine = (darkBlock!.match(/--el-bg-color:[^;\n]+/) || [])[0] || '';
    expect(bgLine).toContain('var(--el-color-white)');
    for (const darkHex of ['#141414', '#1d1e1f', '#1d1d1d', '#000', '#000000']) {
      expect(bgLine).not.toContain(darkHex);
    }
  });

  it('项目未覆写 --el-color-white（恒为 EP 默认 #fff，保证 tooltip 配色恒定）', () => {
    expect(content).not.toMatch(/--el-color-white\s*:\s*#/);
  });
});

describe('亮色主题 dark tooltip 配色对齐设计意图 — element-plus/theme/index.scss', () => {
  it('存在 [data-o-theme="g.light"] div.is-dark 覆写块', () => {
    expect(lightBlock, 'light 块必须存在').not.toBeNull();
  });

  it('light 块内 --el-popper-bg-color-dark: var(--el-color-white)（背景改浅 → 浅底）', () => {
    expect(lightBlock).toContain('--el-popper-bg-color-dark: var(--el-color-white)');
  });

  it('light 块内 --el-bg-color: var(--el-text-color-primary)（文字改深 → 深字）', () => {
    expect(lightBlock).toContain('--el-bg-color: var(--el-text-color-primary)');
  });

  it('亮色修复值均使用 CSS 变量，非硬编码颜色（符合 styling 红线）', () => {
    expect(lightBlock).toMatch(/--el-popper-bg-color-dark:\s*var\(/);
    expect(lightBlock).toMatch(/--el-bg-color:\s*var\(/);
    expect(lightBlock).not.toMatch(/#[0-9a-fA-F]{3,8}/);
  });

  it('light 块未覆写 --el-text-color-primary（保留继承值 #303133 作为深色文字源，无循环引用）', () => {
    expect(lightBlock).not.toMatch(/--el-text-color-primary\s*:/);
  });

  it('light 块 --el-bg-color 引用 --el-text-color-primary（文字=EP 默认深色 #303133，浅底深字）', () => {
    expect(lightBlock).toMatch(/--el-bg-color:\s*var\(--el-text-color-primary\)/);
  });
});

describe('设计意图对齐：light 浅底深字 / dark 深底浅字', () => {
  it('亮色块背景(--el-popper-bg-color-dark)=白、文字(--el-bg-color)=深 → 浅底深字', () => {
    expect(lightBlock).toContain('--el-popper-bg-color-dark: var(--el-color-white)');
    expect(lightBlock).toContain('--el-bg-color: var(--el-text-color-primary)');
  });

  it('暗色块背景(--el-text-color-primary)=深、文字(--el-bg-color)=白 → 深底浅字', () => {
    expect(darkBlock).toContain('--el-text-color-primary: #1d1e1f');
    expect(darkBlock).toContain('--el-bg-color: var(--el-color-white)');
  });

  it('亮/暗两块互斥，各自限定 data-o-theme 主题选择器', () => {
    const lightSelector = /\[data-o-theme='g\.light'\]\s+div\.is-dark/.test(content);
    const darkSelector = /\[data-o-theme='g\.dark'\]\s+div\.is-dark/.test(content);
    expect(lightSelector, '亮色块选择器必须存在').toBe(true);
    expect(darkSelector, '暗色块选择器必须存在').toBe(true);
  });
});

