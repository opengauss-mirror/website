import { expect, describe, it, beforeAll } from 'vitest';
import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { resolve, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const srcDir = resolve(rootDir, 'app/.vitepress/src');
const srcNewDir = resolve(rootDir, 'app/.vitepress/src-new');
const appDir = resolve(rootDir, 'app');
const themeFile = resolve(rootDir, 'app/.vitepress/theme/index.ts');

const DEFERRED = [
  'views/home/HomePlayground.vue',
  'views/home/HomeMeeting.vue',
  'views/home/HomeCharacteristic.vue',
  'views/home/HomeNews.vue',
  'views/summit/devday2022/components/SummitBanner.vue',
  'views/summit/devday2024/components/SummitNow.vue',
  'views/summit/summit2021/components/SummitBanner.vue',
  'views/summit/summit2021/components/SummitGuests.vue',
  'views/community/TheOnlineCommunication.vue',
  'components/LinkPanel.vue',
  'components/meeting/MeetingDetail.vue',
  'components/meeting/MeetingForm.vue',
].map((p) => resolve(srcDir, p));

const DELETED = [
  'app/.vitepress/src-new/App.vue',
  'app/.vitepress/src/components/AppFooter.vue',
  'app/.vitepress/src/components/header/AppHeader.vue',
  'app/.vitepress/src/components/header/ItemLang.vue',
  'app/.vitepress/src/components/header/ItemMenu.vue',
  'app/.vitepress/src/components/header/ItemNav.vue',
  'app/.vitepress/src/components/header/ItemSearch.vue',
  'app/.vitepress/src/components/header/ItemTheme.vue',
  'app/.vitepress/src/components/header/ItemUser.vue',
  'app/.vitepress/src/views/authentication/training/TheTraining.vue',
  'app/.vitepress/src/views/authentication/training/TheTrainingSignup.vue',
  'app/.vitepress/src/views/authentication/training/TrainingNav.vue',
  'app/.vitepress/src/views/download/DownloadContent.vue',
  'app/.vitepress/src/views/download/TheDownload.vue',
  'app/.vitepress/src/views/download/TheDownloadArchive.vue',
  'app/.vitepress/src/views/home/HomeBanner.vue',
  'app/.vitepress/src/views/home/HomeExplore.vue',
  'app/.vitepress/src/views/home/HomeShowCase.vue',
  'app/.vitepress/src/views/home/HomeVideo.vue',
  'app/.vitepress/src/views/home/TheHome.vue',
  'app/.vitepress/src/views/support-tools/TheSupportTools.vue',
  'app/.vitepress/src/layouts/LayoutEvents.vue',
].map((p) => resolve(rootDir, p));

const REMOVED_DIRS = [
  'app/.vitepress/src/components/header',
  'app/.vitepress/src/views/authentication/training',
  'app/.vitepress/src/views/support-tools',
].map((p) => resolve(rootDir, p));

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

const RESOLVE_TRIES = [
  '',
  '.vue',
  '.ts',
  '.tsx',
  '.js',
  '.jsx',
  '.mjs',
  '.cjs',
  '/index.ts',
  '/index.js',
  '/index.vue',
  '/index.tsx',
];

function resolveSpecifier(spec: string, fromFile: string): string | null {
  let base: string;
  let rel: string;
  if (spec.startsWith('@/')) {
    base = srcDir;
    rel = spec.slice(2);
  } else if (spec.startsWith('~@/')) {
    base = srcNewDir;
    rel = spec.slice(3);
  } else if (spec.startsWith('./') || spec.startsWith('../') || spec.startsWith('/')) {
    base = dirname(fromFile);
    rel = spec;
  } else {
    return null;
  }
  const cand = resolve(base, rel);
  for (const t of RESOLVE_TRIES) {
    const p = cand + t;
    if (existsSync(p) && statSync(p).isFile()) return p;
  }
  return null;
}

const staticImportRe = /(?:from|import)\s+['"]([^'"]+)['"]/g;
const dynamicImportRe = /\bimport\s*\(\s*['"]([^'"]+)['"]\s*\)/g;

function extractImports(filePath: string): string[] {
  let txt: string;
  try {
    txt = readFileSync(filePath, 'utf-8');
  } catch {
    return [];
  }
  const specs: string[] = [];
  let m: RegExpExecArray | null;
  while ((m = staticImportRe.exec(txt)) !== null) specs.push(m[1]);
  while ((m = dynamicImportRe.exec(txt)) !== null) specs.push(m[1]);
  return specs;
}

function isInsideOldSrc(f: string): boolean {
  return (f === srcDir || f.startsWith(srcDir + '/')) && f.endsWith('.vue');
}

let reachableOldSrcVue: Set<string>;
let allOldSrcVue: string[];
const deferredSet = new Set(DEFERRED);

beforeAll(() => {
  const mdFiles: string[] = [];
  for (const lang of ['zh', 'en']) {
    const langDir = resolve(appDir, lang);
    if (existsSync(langDir)) walkDir(langDir, mdFiles);
  }
  const roots = [
    ...mdFiles.filter((f) => f.endsWith('.md')),
    themeFile,
    ...walkDir(srcNewDir),
  ].filter((f) => existsSync(f));

  const visited = new Set<string>();
  const queue = [...roots];
  reachableOldSrcVue = new Set();
  while (queue.length) {
    const f = queue.shift() as string;
    if (visited.has(f)) continue;
    visited.add(f);
    if (isInsideOldSrc(f)) reachableOldSrcVue.add(f);
    for (const spec of extractImports(f)) {
      const resolved = resolveSpecifier(spec, f);
      if (resolved && !visited.has(resolved)) queue.push(resolved);
    }
  }
  allOldSrcVue = walkDir(srcDir).filter((f) => f.endsWith('.vue'));
});

describe('old src .vue reachability BFS (root set = md + theme/index.ts + src-new)', () => {
  it('every retained old src .vue is reachable OR in the deferred list', () => {
    const violators = allOldSrcVue.filter(
      (f) => !reachableOldSrcVue.has(f) && !deferredSet.has(f)
    );
    expect(
      violators.map((f) => relative(rootDir, f)),
      'unreachable old src .vue files that are NOT in the deferred list should not exist'
    ).toEqual([]);
  });
});

describe('deferred dead-code files are NOT reachable', () => {
  for (const f of DEFERRED) {
    it(`${relative(rootDir, f)} is unreachable (dead, awaiting follow-up)`, () => {
      expect(reachableOldSrcVue.has(f)).toBe(false);
    });
  }
});

describe('deleted files are removed from disk', () => {
  for (const f of DELETED) {
    it(`${relative(rootDir, f)} no longer exists`, () => {
      expect(existsSync(f)).toBe(false);
    });
  }
});

describe('emptied directories are removed', () => {
  for (const d of REMOVED_DIRS) {
    it(`${relative(rootDir, d)} directory does not exist`, () => {
      expect(existsSync(d)).toBe(false);
    });
  }
});

describe('no deleted file is double-listed as deferred', () => {
  for (const f of DELETED) {
    it(`${relative(rootDir, f)} is not in the deferred list`, () => {
      expect(deferredSet.has(f)).toBe(false);
    });
  }
});
