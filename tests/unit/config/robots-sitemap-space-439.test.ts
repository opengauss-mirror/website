import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const robotsPath = resolve(rootDir, 'app/.vitepress/public/robots.txt');

const robotsContent = readFileSync(robotsPath, 'utf-8');
const lines = robotsContent.split(/\r?\n/);

const SITEMAP_URL = 'https://opengauss.org/sitemap.xml';

describe('issue #439: robots.txt Sitemap 行冒号后空格修正', () => {
  it('robots.txt 存在于 app/.vitepress/public/ 下', () => {
    expect(existsSync(robotsPath)).toBe(true);
  });

  it('Sitemap 行格式为 "Sitemap: <url>"(冒号后有空格)', () => {
    const sitemapLine = lines.find((l) => l.startsWith('Sitemap:'));
    expect(sitemapLine).toBe(`Sitemap: ${SITEMAP_URL}`);
  });

  it('Sitemap 行冒号后紧跟空格而非 URL', () => {
    const sitemapLine = lines.find((l) => l.startsWith('Sitemap:'));
    expect(sitemapLine?.startsWith('Sitemap: ')).toBe(true);
  });

  it('Sitemap 指向正确的 sitemap.xml URL', () => {
    const sitemapLine = lines.find((l) => l.startsWith('Sitemap:'));
    expect(sitemapLine?.endsWith(SITEMAP_URL)).toBe(true);
  });

  it('仅存在一条 Sitemap 指令', () => {
    const sitemapLines = lines.filter((l) => l.startsWith('Sitemap:'));
    expect(sitemapLines.length).toBe(1);
  });

  it('Sitemap 行不再是旧的 "Sitemap:<url>"(冒号后无空格)格式', () => {
    const oldFormat = `Sitemap:${SITEMAP_URL}`;
    expect(robotsContent).not.toContain(oldFormat);
  });
});

describe('issue #439: 改动范围限定在 Sitemap 行(其余行不动)', () => {
  it('User-agent 行保持 "User-agent:*"(冒号后无空格,不在本次范围)', () => {
    const uaLine = lines.find((l) => l.startsWith('User-agent:'));
    expect(uaLine).toBe('User-agent:*');
  });

  it('Allow 行保持 "Allow: /"', () => {
    const allowLine = lines.find((l) => l.startsWith('Allow:'));
    expect(allowLine).toBe('Allow: /');
  });

  it('Disallow 行保持 "Disallow: /*//"', () => {
    const disallowLine = lines.find((l) => l.startsWith('Disallow:'));
    expect(disallowLine).toBe('Disallow: /*//');
  });

  it('Content-Signal 行保持原值', () => {
    const csLine = lines.find((l) => l.startsWith('Content-Signal:'));
    expect(csLine).toBe('Content-Signal: ai-train=yes,search=yes,ai-input=yes');
  });

  it('LLM-Policy 行指向 llms.txt', () => {
    const llmLine = lines.find((l) => l.startsWith('LLM-Policy:'));
    expect(llmLine).toBe('LLM-Policy: https://opengauss.org/llms.txt');
  });
});
