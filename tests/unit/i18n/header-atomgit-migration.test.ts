import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const headerZhPath = resolve(rootDir, 'app/.vitepress/src-new/i18n/header/header-zh.ts');
const headerEnPath = resolve(rootDir, 'app/.vitepress/src-new/i18n/header/header-en.ts');
const oldHeaderPath = resolve(rootDir, 'app/.vitepress/src/data/header/index.ts');

describe('header i18n (src-new) GitCode→AtomGit 品牌迁移 — zh', () => {
  const content = readFileSync(headerZhPath, 'utf-8');

  it('从 url-config 导入 ATOMGIT_LINK（不再导入 GITCODE_LINK）', () => {
    expect(content).toMatch(/import\s*\{[^}]*ATOMGIT_LINK[^}]*\}\s*from\s*['"]~@\/data\/url-config['"]/);
    expect(content).not.toContain('GITCODE_LINK');
  });

  it('SOURCE_CODE 项 NAME 为 AtomGit', () => {
    expect(content).toMatch(/NAME:\s*['"]AtomGit['"]/);
    expect(content).not.toMatch(/NAME:\s*['"]GitCode['"]/);
  });

  it('SOURCE_CODE 项 PATH 拼接 ATOMGIT_LINK', () => {
    expect(content).toMatch(/PATH:\s*`\$\{ATOMGIT_LINK\}\/opengauss`/);
  });

  it('兼容性测评链接指向 atomgit.com', () => {
    expect(content).toContain('${ATOMGIT_LINK}/opengauss/compatible-certification');
  });

  it('迁移互动专区链接指向 atomgit.com', () => {
    expect(content).toContain('${ATOMGIT_LINK}/opengauss/openGauss-workbench');
  });

  it('源文件不含 gitcode.com 裸域 / GitCode 品牌文案 / GITCODE_LINK 标识符', () => {
    expect(content).not.toContain('gitcode.com');
    expect(content).not.toContain('GITCODE_LINK');
  });
});

describe('header i18n (src-new) GitCode→AtomGit 品牌迁移 — en', () => {
  const content = readFileSync(headerEnPath, 'utf-8');

  it('从 url-config 导入 ATOMGIT_LINK（不再导入 GITCODE_LINK）', () => {
    expect(content).toMatch(/import\s*\{[^}]*ATOMGIT_LINK[^}]*\}\s*from\s*['"]~@\/data\/url-config['"]/);
    expect(content).not.toContain('GITCODE_LINK');
  });

  it('SOURCE_CODE 项 NAME 为 AtomGit', () => {
    expect(content).toMatch(/NAME:\s*['"]AtomGit['"]/);
    expect(content).not.toMatch(/NAME:\s*['"]GitCode['"]/);
  });

  it('SOURCE_CODE 项 PATH 拼接 ATOMGIT_LINK', () => {
    expect(content).toMatch(/PATH:\s*`\$\{ATOMGIT_LINK\}\/opengauss`/);
  });

  it('源文件不含 gitcode.com 裸域 / GitCode 品牌文案 / GITCODE_LINK 标识符', () => {
    expect(content).not.toContain('gitcode.com');
    expect(content).not.toContain('GITCODE_LINK');
  });
});

describe('旧版 header nav (src/data/header) — id 保留、label/href 迁移', () => {
  const content = readFileSync(oldHeaderPath, 'utf-8');

  it('从 url-config 导入 ATOMGIT_LINK（不再导入 GITCODE_LINK）', () => {
    expect(content).toMatch(/import\s*\{[^}]*ATOMGIT_LINK[^}]*\}/);
    expect(content).not.toContain('GITCODE_LINK');
  });

  it('内部 nav key id: GitCode 保留不动（设计 §3：内部 key，非用户可见）', () => {
    expect(content).toContain("id: 'GitCode'");
  });

  it('label 双语改为 AtomGit', () => {
    expect(content).toMatch(/label:\s*\{\s*zh:\s*['"]AtomGit['"]\s*,\s*en:\s*['"]AtomGit['"]\s*\}/);
  });

  it('href zh/en 均拼接 ATOMGIT_LINK', () => {
    expect(content).toMatch(/zh:\s*ATOMGIT_LINK\s*\+\s*['"]\/opengauss['"]/);
    expect(content).toMatch(/en:\s*ATOMGIT_LINK\s*\+\s*['"]\/opengauss['"]/);
  });

  it('源文件不含 GITCODE_LINK 标识符', () => {
    expect(content).not.toContain('GITCODE_LINK');
  });
});
