import { expect, describe, it, beforeAll } from 'vitest';
import { readFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');

const SCAN_ROOTS = [
  'app/.vitepress/src',
  'app/.vitepress/src-new',
  'app/zh',
  'app/en',
  '.content',
  '.geo',
  'scripts',
].map((p) => resolve(rootDir, p));

const SKIP_DIRS = new Set([
  'node_modules',
  '.git',
  'dist',
  '.vitepress-cache',
  '_temp',
  '.gitcode',
  'cache',
]);

const SCAN_EXT = new Set([
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '.vue',
  '.json',
  '.yaml',
  '.yml',
  '.md',
  '.txt',
]);

// 设计 §0/§1 排除目录：news / blogs / 法规政策类（含后端 GitCode ID 字段名，须与后端一致）
const EXCLUDE_PATH_FRAGMENTS = [
  'app/zh/news/',
  'app/zh/blogs/',
  'app/en/blogs/',
  'app/zh/privacy/',
  'app/en/privacy/',
  'app/zh/cookies/',
  'app/en/cookies/',
  'app/zh/data-sharing-with-third-parties/',
  'app/en/data-sharing-with-third-parties/',
  'app/zh/personal-data-collection-overview/',
  'app/en/personal-data-collection-overview/',
  'app/zh/vulnerability-management/',
  'app/en/vulnerability-management/',
];

function walkDir(dir: string, out: string[] = []): string[] {
  let entries: string[];
  try {
    entries = readdirSync(dir);
  } catch {
    return out;
  }
  for (const e of entries) {
    if (SKIP_DIRS.has(e)) continue;
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

function toRel(p: string): string {
  return relative(rootDir, p).replace(/\\/g, '/');
}

function isExcluded(rel: string): boolean {
  return EXCLUDE_PATH_FRAGMENTS.some((frag) => rel.startsWith(frag));
}

// 设计 §3/§4 明确「本期不动」或「保留」的 allowlist：
//   - 后端 OAuth provider 身份串（3 处不动）：notification.ts / HomeCalendar.vue / type-user.ts
//   - TodoList 后端 source 解耦常量 NOTIFICATION_SOURCE 值（url-config）
//   - 旧 header 内部 nav key id:'GitCode'（保留不动，非用户可见）
//   - sig 详情页 item.gitcode_id：后端 API 返回字段名（camelCase），与已排除政策 md 的 GitCode ID 后端字段同类
const ALLOWLIST = new Set([
  'app/.vitepress/src-new/data/url-config/index.ts',
  'app/.vitepress/src-new/stores/notification.ts',
  'app/.vitepress/src-new/views/home/HomeCalendar.vue',
  'app/.vitepress/src/shared/@types/type-user.ts',
  'app/.vitepress/src/data/header/index.ts',
  'app/.vitepress/src-new/views/sig/TheSigDetail.vue',
]);

let violations: { file: string; line: number; text: string }[] = [];
let allowlistHits: { file: string; count: number }[] = [];

beforeAll(() => {
  const files = SCAN_ROOTS.flatMap((root) => walkDir(root)).filter((f) => {
    const ext = f.slice(f.lastIndexOf('.'));
    return SCAN_EXT.has(ext);
  });

  for (const f of files) {
    const rel = toRel(f);
    if (isExcluded(rel)) continue;
    let txt: string;
    try {
      txt = readFileSync(f, 'utf-8');
    } catch {
      continue;
    }
    const lines = txt.split(/\r?\n/);
    const hits: number[] = [];
    lines.forEach((line, i) => {
      // 大小写不敏感匹配 gitcode，但排除 'atomgit' 子串（atomgit 不含 gitcode 子串，安全）
      if (/gitcode/i.test(line)) hits.push(i + 1);
    });
    if (hits.length === 0) continue;

    if (ALLOWLIST.has(rel)) {
      allowlistHits.push({ file: rel, count: hits.length });
    } else {
      hits.forEach((ln) => {
        violations.push({ file: rel, line: ln, text: lines[ln - 1].trim() });
      });
    }
  }
});

describe('atomgit 品牌迁移全局 gate（设计 §5 自检门）', () => {
  it('allowlist 文件确实仍含 gitcode（证后端解耦项未被误改）', () => {
    // 6 个 allowlist 文件均应命中
    const filesWithHits = new Set(allowlistHits.map((h) => h.file));
    for (const f of ALLOWLIST) {
      expect(filesWithHits.has(f), `${f} 应仍含 gitcode 后端/内部字段`).toBe(true);
    }
  });

  it('allowlist 之外不应残留任何 gitcode 引用（排除 news/blogs/policy 目录后）', () => {
    expect(
      violations.map((v) => `${v.file}:${v.line} -> ${v.text}`),
      '设计 §5 自检门：排除 news/blogs/policy 后仅允许后端耦合 3 处 + NOTIFICATION_SOURCE + nav id + gitcode_id 后端字段'
    ).toEqual([]);
  });
});
