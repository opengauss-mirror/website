import { expect, describe, it } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');

const themePath = resolve(rootDir, 'app/.vitepress/theme/index.ts');
const srcAppPath = resolve(rootDir, 'app/.vitepress/src/App.vue');

const themeContent = readFileSync(themePath, 'utf-8');
const srcAppContent = readFileSync(srcAppPath, 'utf-8');

const SEO_BOX_DIRS = [
  'app/.vitepress/src/components/seo-box',
  'app/.vitepress/src-new/components/seo-box',
];

const DELETED_FILES = [
  ...SEO_BOX_DIRS.flatMap((d) => [
    join(d, 'index.ts'),
    join(d, 'src/seo-box.tsx'),
    join(d, 'src/seo-box-types.ts'),
    join(d, 'src/seo-box.scss'),
  ]),
  'app/.vitepress/src/data/common/seo.ts',
];

function hasRg(): boolean {
  try {
    execSync('rg --version', { cwd: rootDir, encoding: 'utf-8', stdio: 'ignore' });
    return true;
  } catch {
    return false;
  }
}

function rgLines(pattern: string): string[] {
  try {
    const out = execSync(
      `rg -uu -i ${JSON.stringify(pattern)} -g '!app/.vitepress/dist' -g '!.git' --no-heading --no-filename`,
      { cwd: rootDir, encoding: 'utf-8' }
    );
    return out.trim().split('\n').filter(Boolean);
  } catch (e: any) {
    if (e.status === 1) return [];
    throw e;
  }
}

describe('SeoBox component directories removed', () => {
  for (const dir of SEO_BOX_DIRS) {
    it(`${dir} directory does NOT exist`, () => {
      expect(existsSync(resolve(rootDir, dir))).toBe(false);
    });
  }
});

describe('SeoBox source files removed', () => {
  for (const file of DELETED_FILES) {
    it(`${file} does NOT exist`, () => {
      expect(existsSync(resolve(rootDir, file))).toBe(false);
    });
  }
});

describe('theme/index.ts no longer registers SeoBox', () => {
  it('does not contain the SeoBox token (import + app.use both removed)', () => {
    expect(themeContent).not.toContain('SeoBox');
  });

  it('does not reference the seo-box component path', () => {
    expect(themeContent).not.toContain('seo-box');
  });
});

describe('src/App.vue no longer renders SeoBox', () => {
  it('does not contain the SeoBox token (template tag removed)', () => {
    expect(srcAppContent).not.toContain('SeoBox');
  });

  it('does not import seoConfig (orphaned data import removed)', () => {
    expect(srcAppContent).not.toContain('seoConfig');
  });

  it('does not contain a <SeoBox template tag', () => {
    expect(srcAppContent).not.toMatch(/<SeoBox/);
  });
});

describe('whole-repo residual SeoBox scan (design §6 acceptance criterion)', () => {
  const runIfRg = hasRg() ? it : it.skip;

  runIfRg('rg -i "seobox" (excl. dist) returns 0 hits', () => {
    expect(rgLines('seobox')).toEqual([]);
  });

  runIfRg('rg "components/seo-box" (excl. dist) returns 0 hits', () => {
    expect(rgLines('components/seo-box')).toEqual([]);
  });
});
