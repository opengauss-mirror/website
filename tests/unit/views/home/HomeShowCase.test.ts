import { expect, describe, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(__dirname, '../../../../');
const homeShowCasePath = resolve(
  repoRoot,
  'app/.vitepress/src-new/views/home/HomeShowCase.vue'
);
const showcaseZhPath = resolve(
  repoRoot,
  'app/.vitepress/src-new/data/showcase/showcase-zh.ts'
);
const showcaseEnPath = resolve(
  repoRoot,
  'app/.vitepress/src-new/data/showcase/showcase-en.ts'
);

describe('HomeShowCase — detail:false 卡片过滤(防死链)', () => {
  it('caseData reduce 中存在 curr.detail === false 守卫', () => {
    const src = readFileSync(homeShowCasePath, 'utf-8');
    expect(src).toContain('curr.detail === false');
  });

  it('守卫与既有的 id 缺失守卫位于同一 reduce 回调内', () => {
    const src = readFileSync(homeShowCasePath, 'utf-8');
    const idx = src.indexOf('data.reduce');
    expect(idx).toBeGreaterThan(-1);
    const reduceBlock = src.slice(idx, idx + 400);
    expect(reduceBlock).toContain('!curr.id');
    expect(reduceBlock).toContain('curr.detail === false');
  });

  it('守卫出现在 return acc 之前(先过滤再聚合)', () => {
    const src = readFileSync(homeShowCasePath, 'utf-8');
    const guardIdx = src.indexOf('curr.detail === false');
    const accIdx = src.indexOf('return acc', guardIdx);
    expect(guardIdx).toBeGreaterThan(-1);
    expect(accIdx).toBeGreaterThan(guardIdx);
  });
});

describe('HomeShowCase — showcase 数据源含 detail:false 项(过滤非死代码)', () => {
  it('zh 数据源至少存在一条 detail:false 条目', () => {
    const src = readFileSync(showcaseZhPath, 'utf-8');
    expect(src).toMatch(/detail:\s*false/);
  });

  it('en 数据源至少存在一条 detail:false 条目', () => {
    const src = readFileSync(showcaseEnPath, 'utf-8');
    expect(src).toMatch(/detail:\s*false/);
  });
});
