import { expect, describe, it, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');

const srcDir = resolve(rootDir, 'app/.vitepress/src');
const srcNewDir = resolve(rootDir, 'app/.vitepress/src-new');
const themeDir = resolve(rootDir, 'app/.vitepress/theme');
const gridScssPath = resolve(rootDir, 'app/.vitepress/src-new/assets/style/mixin/grid.scss');
const themeIndexPath = resolve(rootDir, 'app/.vitepress/theme/index.ts');

/** Walk a directory recursively, returning all regular files. */
function walkDir(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const e of entries) {
    const full = resolve(dir, e);
    let st: import('fs').Stats;
    try {
      st = statSync(full);
    } catch {
      continue;
    }
    if (st.isDirectory()) walkDir(full, out);
    else out.push(full);
  }
  return out;
}

const SCANNABLE_EXT = /\.(vue|ts|tsx|js|jsx|scss|css|mjs|cjs)$/;

/** Source roots whose files are scanned for `--grid-` residue. */
const SCAN_ROOTS = [srcDir, srcNewDir, themeDir];

let sourceFiles: { path: string; content: string }[] = [];

beforeAll(() => {
  sourceFiles = [];
  for (const root of SCAN_ROOTS) {
    if (!existsSync(root)) continue;
    for (const f of walkDir(root)) {
      if (!SCANNABLE_EXT.test(f)) continue;
      let content: string;
      try {
        content = readFileSync(f, 'utf-8');
      } catch {
        continue;
      }
      sourceFiles.push({ path: f, content });
    }
  }
});

describe('grid.scss 保留 (维护者评审: 兼容性)', () => {
  it('app/.vitepress/src-new/assets/style/mixin/grid.scss 保留存在', () => {
    expect(existsSync(gridScssPath)).toBe(true);
  });

  it('theme/index.ts 仍 import grid.scss', () => {
    const themeSource = readFileSync(themeIndexPath, 'utf-8');
    expect(themeSource).toMatch(/grid\.scss/);
  });
});

describe('全仓无 --grid- 残留 (design §5/§6 验收搜索)', () => {
  // 设计 §6 验收清单：`rg --pcre2 '--grid-(?!o-r-)'` 全仓（去 node_modules）零命中。
  // 负向先行断言排除 `--o-r-grid-*`（新 token）；`--comp-grid-gap`（ComponentsGrid 局部改名变量）
  // 不含 `--grid-` 子串（其为 `--comp-grid-*`），故不触发假阳性。
  // 旧名 `--grid-content-width` / `--grid-N` / `--grid-column-gutter` / `--grid-gap` 均含 `--grid-`，
  // grid.scss 经维护者评审保留以兼容旧引用（其内部 --grid-* 定义已从扫描排除），
  // 其余消费点若遗漏迁移会静默失效（属性值无效被忽略、不报错），靠此扫描兜底。
  const residueRe = /--grid-(?!o-r-)/;

  it('源码中无 --grid-(非 o-r-) 残留（grid.scss 兼容保留文件除外）', () => {
    const violations: string[] = [];
    for (const { path, content } of sourceFiles) {
      // grid.scss 经维护者评审要求保留以兼容旧引用，其内部 --grid-* 定义为有意保留
      if (path === gridScssPath) continue;
      const lines = content.split('\n');
      for (let i = 0; i < lines.length; i++) {
        if (residueRe.test(lines[i])) {
          violations.push(`${relative(rootDir, path)}:${i + 1}: ${lines[i].trim()}`);
        }
      }
    }
    expect(violations, '旧 --grid-* 变量名残留（应为 --o-r-grid-* 或 --comp-grid-*）').toEqual([]);
  });
});

describe('关键消费点已迁移至 --o-r-grid-* token (design §3)', () => {
  function read(rel: string): string {
    return readFileSync(resolve(rootDir, rel), 'utf-8');
  }

  it('HomeBanner.vue 使用 var(--o-r-grid-section-width) 与 var(--o-r-grid-N)', () => {
    const src = read('app/.vitepress/src-new/views/home/HomeBanner.vue');
    expect(src).toContain('var(--o-r-grid-section-width)');
    expect(src).toMatch(/var\(--o-r-grid-\d+\)/);
    expect(src).not.toContain('var(--grid-content-width)');
    expect(src).not.toMatch(/var\(--grid-\d+\)/);
  });

  it('TheNotifications.vue 使用 var(--o-r-grid-column-gutter)', () => {
    const src = read('app/.vitepress/src-new/views/notifications/TheNotifications.vue');
    expect(src).toContain('var(--o-r-grid-column-gutter)');
    expect(src).not.toContain('var(--grid-column-gutter)');
  });

  it('ContentWrapper.vue / AppSection.vue / BannerLevel2.vue 使用 var(--o-r-grid-section-width)', () => {
    for (const rel of [
      'app/.vitepress/src-new/components/ContentWrapper.vue',
      'app/.vitepress/src-new/components/AppSection.vue',
      'app/.vitepress/src-new/components/BannerLevel2.vue',
    ]) {
      const src = read(rel);
      expect(src, `${rel} 应含 var(--o-r-grid-section-width)`).toContain('var(--o-r-grid-section-width)');
      expect(src, `${rel} 不应含旧 var(--grid-content-width)`).not.toContain('var(--grid-content-width)');
    }
  });
});

describe('ComponentsGrid.vue --grid-gap 改名 --comp-grid-gap (design §3)', () => {
  const rel = 'app/.vitepress/src-new/views/ai/components/ComponentsGrid.vue';
  let src: string;
  beforeAll(() => {
    src = readFileSync(resolve(rootDir, rel), 'utf-8');
  });

  it('使用 var(--comp-grid-gap)（改名后局部变量）', () => {
    expect(src).toContain('var(--comp-grid-gap)');
  });

  it('不再含旧 var(--grid-gap)', () => {
    expect(src).not.toContain('var(--grid-gap)');
    expect(src).not.toMatch(/--grid-gap\b/);
  });
});

describe('TheSig / TheSigDetail 旧名别名 shim 已删除 (design §3)', () => {
  it('TheSig.vue 不再含 --grid-column-gutter shim', () => {
    const src = readFileSync(
      resolve(rootDir, 'app/.vitepress/src-new/views/sig/TheSig.vue'),
      'utf-8'
    );
    expect(src).not.toMatch(/--grid-column-gutter\s*:/);
  });

  it('TheSigDetail.vue 不再含 --grid-column-gutter shim', () => {
    const src = readFileSync(
      resolve(rootDir, 'app/.vitepress/src-new/views/sig/TheSigDetail.vue'),
      'utf-8'
    );
    expect(src).not.toMatch(/--grid-column-gutter\s*:/);
  });
});
