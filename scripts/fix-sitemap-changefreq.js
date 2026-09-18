import { existsSync } from "node:fs";
import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const sitemapPath = join(import.meta.dirname, '../app/.vitepress/dist/sitemap.xml');

if (!existsSync(sitemapPath)) {
  console.warn(`[fix-sitemap-changefreq] sitemap.xml not found at ${sitemapPath}, skipping.`);
  process.exit(0);
}

const original = await readFile(sitemapPath, 'utf-8');
const updated = original.replace(/<changefreq>[^<]*<\/changefreq>/g, '<changefreq>daily</changefreq>');

await writeFile(sitemapPath, updated);
console.log('[fix-sitemap-changefreq] All <changefreq> values normalized to "daily".');
