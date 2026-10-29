import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const enPath = resolve(rootDir, 'app/.vitepress/src-new/data/header/en.ts');
const zhPath = resolve(rootDir, 'app/.vitepress/src-new/data/header/zh.ts');

const enContent = readFileSync(enPath, 'utf-8');
const zhContent = readFileSync(zhPath, 'utf-8');

/**
 * Extract the text of the object literal enclosing the character at `pos`.
 * Forward scan is string-aware (skips '...' / "..." / `...`) so that braces
 * inside template-literal interpolations (${...}) and quoted text do not
 * perturb depth tracking. Backward scan is brace-only, which is safe here
 * because no string literal between an item opener and its `href:` contains
 * brace characters.
 */
function extractEnclosingObject(content: string, pos: number): string {
  let i = pos;
  let depth = 0;
  let start = -1;
  while (i >= 0) {
    const ch = content[i];
    if (ch === '}') depth++;
    else if (ch === '{') {
      if (depth === 0) {
        start = i;
        break;
      }
      depth--;
    }
    i--;
  }
  if (start === -1) throw new Error('opening brace not found for href');

  depth = 0;
  let end = -1;
  i = start;
  while (i < content.length) {
    const ch = content[i];
    if (ch === '`' || ch === "'" || ch === '"') {
      const quote = ch;
      i++;
      while (i < content.length && content[i] !== quote) {
        if (content[i] === '\\') i++;
        i++;
      }
      i++;
      continue;
    }
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        end = i;
        break;
      }
    }
    i++;
  }
  if (end === -1) throw new Error('closing brace not found for href');
  return content.slice(start, end + 1);
}

type NavItem = { href: string; text: string };

/** Extract every leaf nav item that declares an `href:` field. */
function extractItems(content: string): NavItem[] {
  const items: NavItem[] = [];
  const hrefRegex = /\bhref\s*:/g;
  let m: RegExpExecArray | null;
  while ((m = hrefRegex.exec(content)) !== null) {
    const text = extractEnclosingObject(content, m.index);
    const valueMatch = text.match(/href\s*:\s*(?:'([^']*)'|"([^"]*)"|`([^`]*)`)/);
    const href = valueMatch ? valueMatch[1] ?? valueMatch[2] ?? valueMatch[3] ?? '' : '';
    items.push({ href, text });
  }
  return items;
}

/** External = absolute http(s) URL, or template constant that resolves to https (ATOMGIT_LINK). */
function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href) || href.includes('ATOMGIT_LINK');
}

/**
 * docs.opengauss.org 外链不加图标（维护者反馈 @jwzmiao 2026-10-29：
 * 站内文档子站，属站内资源）。模板常量外链不会命中此判定。
 */
function isDocsOpenGauss(href: string): boolean {
  return href.startsWith('https://docs.opengauss.org/');
}

const enItems = extractItems(enContent);
const zhItems = extractItems(zhContent);
const enExternal = enItems.filter((it) => isExternal(it.href));
const enInternal = enItems.filter((it) => !isExternal(it.href));
const enDocsExternal = enExternal.filter((it) => isDocsOpenGauss(it.href));
const enNeedIcon = enExternal.filter((it) => !isDocsOpenGauss(it.href));
const zhExternal = zhItems.filter((it) => isExternal(it.href));
const zhInternal = zhItems.filter((it) => !isExternal(it.href));
const zhDocsExternal = zhExternal.filter((it) => isDocsOpenGauss(it.href));
const zhNeedIcon = zhExternal.filter((it) => !isDocsOpenGauss(it.href));

describe('header 外链图标 — en.ts 数据层', () => {
  it('已导入 IconOutLink 图标资产', () => {
    expect(enContent).toContain("import IconOutLink from '~icons/app-new/icon-out-link.svg'");
    expect(enContent).toContain('const outLink = markRaw(IconOutLink)');
  });

  it('不再保留大写错拼属性 ICON:（原 CLA 项 bug）', () => {
    expect(enContent).not.toMatch(/\bICON\s*:/);
  });

  it('每个非 docs.opengauss.org 外链 nav 项都带 icon: outLink', () => {
    for (const item of enNeedIcon) {
      expect(item.text, `外链项缺图标: ${item.href}`).toMatch(/\bicon\s*:\s*outLink\b/);
    }
  });

  it('docs.opengauss.org 外链项不带 icon（维护者反馈：站内文档子站）', () => {
    for (const item of enDocsExternal) {
      expect(item.text, `docs 外链项不应有图标: ${item.href}`).not.toMatch(/\bicon\s*:\s*outLink\b/);
    }
  });

  it('站内 nav 项不带 icon 属性', () => {
    for (const item of enInternal) {
      expect(item.text, `站内项不应有 icon: ${item.href}`).not.toMatch(/\bicon\s*:/);
    }
  });

  it('外链项总数为 12（与设计枚举一致，防回退/遗漏）', () => {
    expect(enExternal.length).toBe(12);
  });

  it('icon: outLink 出现次数与非 docs 外链项数相等（4）', () => {
    const iconCount = (enContent.match(/\bicon\s*:\s*outLink\b/g) || []).length;
    expect(iconCount).toBe(enNeedIcon.length);
    expect(enNeedIcon.length).toBe(4);
  });

  it('docs.opengauss.org 外链项为 8（防回退/遗漏）', () => {
    expect(enDocsExternal.length).toBe(8);
  });

  it('CLA 项（原 ICON 错拼处）href 为 clasign.osinfra.cn 且带 icon', () => {
    const cla = enItems.find((it) => it.href.includes('clasign.osinfra.cn'));
    expect(cla).toBeDefined();
    expect(cla!.text).toMatch(/\bicon\s*:\s*outLink\b/);
  });
});

describe('header 外链图标 — zh.ts 数据层', () => {
  it('已导入 IconOutLink 图标资产（对齐 en.ts）', () => {
    expect(zhContent).toContain("import IconOutLink from '~icons/app-new/icon-out-link.svg'");
    expect(zhContent).toContain('const outLink = markRaw(IconOutLink)');
  });

  it('不再保留死属性 jumpOut（全仓零消费）', () => {
    expect(zhContent).not.toContain('jumpOut');
  });

  it('每个非 docs.opengauss.org 外链 nav 项都带 icon: outLink', () => {
    for (const item of zhNeedIcon) {
      expect(item.text, `外链项缺图标: ${item.href}`).toMatch(/\bicon\s*:\s*outLink\b/);
    }
  });

  it('docs.opengauss.org 外链项不带 icon（维护者反馈：站内文档子站）', () => {
    for (const item of zhDocsExternal) {
      expect(item.text, `docs 外链项不应有图标: ${item.href}`).not.toMatch(/\bicon\s*:\s*outLink\b/);
    }
  });

  it('站内 nav 项不带 icon 属性', () => {
    for (const item of zhInternal) {
      expect(item.text, `站内项不应有 icon: ${item.href}`).not.toMatch(/\bicon\s*:/);
    }
  });

  it('外链项总数为 17（与设计枚举一致，防回退/遗漏）', () => {
    expect(zhExternal.length).toBe(17);
  });

  it('icon: outLink 出现次数与非 docs 外链项数相等（6）', () => {
    const iconCount = (zhContent.match(/\bicon\s*:\s*outLink\b/g) || []).length;
    expect(iconCount).toBe(zhNeedIcon.length);
    expect(zhNeedIcon.length).toBe(6);
  });

  it('docs.opengauss.org 外链项为 11（防回退/遗漏）', () => {
    expect(zhDocsExternal.length).toBe(11);
  });

  it('CLA签署项（原 jumpOut 替换处）带 icon', () => {
    const cla = zhItems.find((it) => it.href.includes('clasign.osinfra.cn'));
    expect(cla).toBeDefined();
    expect(cla!.text).toMatch(/\bicon\s*:\s*outLink\b/);
    expect(cla!.text).not.toContain('jumpOut');
  });

  it('兼容性技术测评项（原 jumpOut 替换处，模板常量外链）带 icon', () => {
    const item = zhItems.find((it) => it.href.includes('ATOMGIT_LINK') && it.href.includes('compatible-certification'));
    expect(item).toBeDefined();
    expect(item!.text).toMatch(/\bicon\s*:\s*outLink\b/);
    expect(item!.text).not.toContain('jumpOut');
  });
});

describe('header 外链图标 — 中英双语一致性', () => {
  // 设计 §4 边界情况：en 12 / zh 17 数量差异来自中文独有外链项
  // （DataVec×2 / 兼容性测评 / 迁移互动专区），属真实数据差异，不要求等量。
  it('两套数据各自的非 docs 外链项均补齐 icon（同字段同语义）', () => {
    expect(enNeedIcon.every((it) => /\bicon\s*:\s*outLink\b/.test(it.text))).toBe(true);
    expect(zhNeedIcon.every((it) => /\bicon\s*:\s*outLink\b/.test(it.text))).toBe(true);
  });

  it('两套数据的 docs.opengauss.org 外链项均不带 icon', () => {
    expect(enDocsExternal.every((it) => !/\bicon\s*:\s*outLink\b/.test(it.text))).toBe(true);
    expect(zhDocsExternal.every((it) => !/\bicon\s*:\s*outLink\b/.test(it.text))).toBe(true);
  });

  it('两套数据均不再使用旧属性（ICON / jumpOut）', () => {
    expect(enContent).not.toMatch(/\bICON\s*:/);
    expect(zhContent).not.toContain('jumpOut');
  });
});
