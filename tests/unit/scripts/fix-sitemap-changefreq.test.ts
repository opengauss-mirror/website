import { expect, describe, it, beforeAll, afterAll, beforeEach, afterEach } from 'vitest';
import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const scriptPath = resolve(rootDir, 'scripts/fix-sitemap-changefreq.js');
const distDir = resolve(rootDir, 'app/.vitepress/dist');
const sitemapPath = join(distDir, 'sitemap.xml');
const packageJsonPath = resolve(rootDir, 'package.json');

let originalSitemap: string | null = null;
let originalDistExisted = false;

function runScript() {
  return spawnSync('node', [scriptPath], { cwd: rootDir, encoding: 'utf-8' });
}

function writeSitemap(content: string) {
  mkdirSync(distDir, { recursive: true });
  writeFileSync(sitemapPath, content, 'utf-8');
}

function removeSitemap() {
  if (existsSync(sitemapPath)) rmSync(sitemapPath, { force: true });
}

beforeAll(() => {
  originalDistExisted = existsSync(distDir);
  if (existsSync(sitemapPath)) {
    originalSitemap = readFileSync(sitemapPath, 'utf-8');
  }
});

afterAll(() => {
  if (originalSitemap !== null) {
    mkdirSync(distDir, { recursive: true });
    writeFileSync(sitemapPath, originalSitemap, 'utf-8');
  } else {
    removeSitemap();
    if (!originalDistExisted && existsSync(distDir)) {
      rmSync(distDir, { recursive: true, force: true });
    }
  }
});

describe('fix-sitemap-changefreq.js — source contract', () => {
  const src = readFileSync(scriptPath, 'utf-8');

  it('uses only node built-in fs/path modules (no new runtime deps)', () => {
    expect(src).toMatch(/from\s+["']node:fs["']/);
    expect(src).toMatch(/from\s+["']node:fs\/promises["']/);
    expect(src).toMatch(/from\s+["']node:path["']/);
  });

  it('targets app/.vitepress/dist/sitemap.xml relative to script location', () => {
    expect(src).toContain("import.meta.dirname");
    expect(src).toContain("'../app/.vitepress/dist/sitemap.xml'");
  });

  it('replacement target string is <changefreq>daily</changefreq>', () => {
    expect(src).toContain("'<changefreq>daily</changefreq>'");
  });

  it('uses a global regex (.replace with /g flag, all occurrences)', () => {
    expect(src).toContain('.replace(');
    expect(src).toMatch(/\/[^]*\/g/);
  });

  it('guards missing file: existsSync check + process.exit(0) + console.warn', () => {
    expect(src).toContain('existsSync');
    expect(src).toContain('process.exit(0)');
    expect(src).toContain('console.warn');
  });
});

describe('package.json postbuild wiring', () => {
  const pkg = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  it('postbuild chains fix-sitemap-changefreq.js after generate-llms-txt.js', () => {
    const pb = pkg.scripts.postbuild;
    expect(pb).toContain('node scripts/generate-llms-txt.js');
    expect(pb).toContain('node scripts/fix-sitemap-changefreq.js');
    expect(pb.indexOf('generate-llms-txt.js')).toBeLessThan(pb.indexOf('fix-sitemap-changefreq.js'));
  });

  it('postbuild:geo also chains fix-sitemap-changefreq.js (geo build also emits sitemap)', () => {
    expect(pkg.scripts['postbuild:geo']).toContain('node scripts/fix-sitemap-changefreq.js');
  });
});

describe('fix-sitemap-changefreq.js — changefreq normalization', () => {
  afterEach(() => {
    removeSitemap();
  });

  const cases: Array<[string, string]> = [
    ['never', '<changefreq>never</changefreq>'],
    ['weekly', '<changefreq>weekly</changefreq>'],
    ['monthly', '<changefreq>monthly</changefreq>'],
    ['yearly', '<changefreq>yearly</changefreq>'],
    ['daily', '<changefreq>daily</changefreq>'],
  ];

  for (const [label, node] of cases) {
    it(`normalizes ${label} → daily`, () => {
      const xml = `<?xml version="1.0"?>\n<urlset><url><loc>/zh/</loc>${node}<priority>1.0</priority></url></urlset>`;
      writeSitemap(xml);
      const res = runScript();
      expect(res.status).toBe(0);
      const out = readFileSync(sitemapPath, 'utf-8');
      expect(out).toContain('<changefreq>daily</changefreq>');
      if (label !== 'daily') {
        expect(out).not.toContain(node);
      } else {
        expect((out.match(/<changefreq>daily<\/changefreq>/g) || []).length).toBe(1);
      }
    });
  }

  it('normalizes ALL changefreq nodes (global) when mixed values present', () => {
    const xml = `<?xml version="1.0"?>
<urlset>
<url><loc>/zh/</loc><changefreq>never</changefreq><priority>1.0</priority></url>
<url><loc>/en/</loc><changefreq>weekly</changefreq><priority>1.0</priority></url>
<url><loc>/zh/download/</loc><changefreq>monthly</changefreq><priority>0.8</priority></url>
<url><loc>/zh/news/2024/</loc><changefreq>yearly</changefreq><priority>0.4</priority></url>
<url><loc>/zh/legal/</loc><changefreq>daily</changefreq><priority>0.2</priority></url>
</urlset>`;
    writeSitemap(xml);
    const res = runScript();
    expect(res.status).toBe(0);
    const out = readFileSync(sitemapPath, 'utf-8');
    const total = (out.match(/<changefreq>/g) || []).length;
    const daily = (out.match(/<changefreq>daily<\/changefreq>/g) || []).length;
    expect(total).toBe(5);
    expect(daily).toBe(5);
    expect(out).not.toContain('<changefreq>never</changefreq>');
    expect(out).not.toContain('<changefreq>weekly</changefreq>');
    expect(out).not.toContain('<changefreq>monthly</changefreq>');
    expect(out).not.toContain('<changefreq>yearly</changefreq>');
  });

  it('preserves non-changefreq content (loc, priority, lastmod, structure)', () => {
    const xml = `<?xml version="1.0"?>
<urlset>
<url><loc>/zh/download/</loc><changefreq>weekly</changefreq><priority>0.8</priority><lastmod>2024-01-01</lastmod></url>
</urlset>`;
    writeSitemap(xml);
    const res = runScript();
    expect(res.status).toBe(0);
    const out = readFileSync(sitemapPath, 'utf-8');
    expect(out).toContain('<loc>/zh/download/</loc>');
    expect(out).toContain('<priority>0.8</priority>');
    expect(out).toContain('<lastmod>2024-01-01</lastmod>');
    expect(out).toContain('<changefreq>daily</changefreq>');
  });

  it('is a no-op (no error) when xml has no changefreq nodes', () => {
    const xml = `<?xml version="1.0"?>\n<urlset><url><loc>/zh/</loc><priority>1.0</priority></url></urlset>`;
    writeSitemap(xml);
    const res = runScript();
    expect(res.status).toBe(0);
    const out = readFileSync(sitemapPath, 'utf-8');
    expect(out).not.toContain('<changefreq>');
    expect(out).toContain('<loc>/zh/</loc>');
  });

  it('logs a success message after normalization', () => {
    writeSitemap(`<?xml version="1.0"?>\n<urlset><url><loc>/zh/</loc><changefreq>never</changefreq></url></urlset>`);
    const res = runScript();
    expect(res.status).toBe(0);
    expect(res.stdout + res.stderr).toContain('daily');
  });
});

describe('fix-sitemap-changefreq.js — missing sitemap.xml', () => {
  beforeEach(() => {
    removeSitemap();
  });

  it('exits with code 0 (does not block postbuild chain)', () => {
    expect(existsSync(sitemapPath)).toBe(false);
    const res = runScript();
    expect(res.status).toBe(0);
  });

  it('prints a warn message mentioning sitemap.xml not found', () => {
    const res = runScript();
    expect(res.status).toBe(0);
    expect(res.stdout + res.stderr).toContain('not found');
  });

  it('does not throw and does not leave a dangling error', () => {
    const res = runScript();
    expect(res.status).toBe(0);
    expect(res.error).toBeUndefined();
  });

  it('does not create a sitemap.xml artifact', () => {
    const res = runScript();
    expect(res.status).toBe(0);
    expect(existsSync(sitemapPath)).toBe(false);
  });
});
