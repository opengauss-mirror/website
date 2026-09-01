import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const contentBridgePath = resolve(rootDir, 'app/.vitepress/src-new/data/download/content-bridge.ts');
const versionsYamlPath = resolve(rootDir, '.content/download/versions.yaml');

describe('content-bridge 占位符 {GITCODE}→{ATOMGIT} 迁移', () => {
  const content = readFileSync(contentBridgePath, 'utf-8');

  it('从 url-config 导入 ATOMGIT_LINK（不再导入 GITCODE_LINK）', () => {
    expect(content).toContain('ATOMGIT_LINK');
    expect(content).not.toContain('GITCODE_LINK');
  });

  it('局部量改名为 ATOMGIT，引用 ATOMGIT_LINK', () => {
    expect(content).toContain('const ATOMGIT = ATOMGIT_LINK');
    expect(content).not.toContain('const GITCODE');
  });

  it('replacePlaceholders 正则使用 {ATOMGIT} 令牌（不再用 {GITCODE}）', () => {
    expect(content).toContain('.replace(/\\{ATOMGIT\\}/g');
    expect(content).not.toContain('.replace(/\\{GITCODE\\}/g');
    expect(content).not.toContain('{GITCODE}');
  });

  it('源文件不含任何 GITCODE 标识符', () => {
    expect(content).not.toMatch(/GITCODE/);
  });
});

describe('versions.yaml 占位符 {ATOMGIT} 令牌一致性', () => {
  const raw = readFileSync(versionsYamlPath, 'utf-8');

  it('version_capability_path 使用 {ATOMGIT} 令牌', () => {
    expect(raw).toContain('{ATOMGIT}');
  });

  it('不再残留 {GITCODE} 令牌', () => {
    expect(raw).not.toContain('{GITCODE}');
  });

  it('占位符替换后渲染为 atomgit.com 链接（不出现裸 gitcode.com）', () => {
    const ATOMGIT = 'https://atomgit.com';
    const DOCS_ORIGIN = 'https://docs.opengauss.org';
    const replaced = raw
      .replace(/\{ATOMGIT\}/g, ATOMGIT)
      .replace(/\{DOCS_ORIGIN\}/g, DOCS_ORIGIN);
    expect(replaced).toContain('https://atomgit.com/opengauss/docs');
    expect(replaced).not.toContain('gitcode.com');
  });

  it('YAML 解析后所有 version_capability_path 解析为 atomgit.com 或 docs.opengauss.org（不残留 gitcode.com）', () => {
    const data = YAML.load(raw) as any[];
    const ATOMGIT = 'https://atomgit.com';
    const DOCS_ORIGIN = 'https://docs.opengauss.org';
    const paths = (data || [])
      .map((v) => v.version_capability_path)
      .filter(Boolean)
      .map((p: string) => p.replace(/\{ATOMGIT\}/g, ATOMGIT).replace(/\{DOCS_ORIGIN\}/g, DOCS_ORIGIN));
    for (const p of paths) {
      expect(p.startsWith('https://atomgit.com/') || p.startsWith('https://docs.opengauss.org/')).toBe(true);
      expect(p).not.toContain('gitcode.com');
    }
  });
});
