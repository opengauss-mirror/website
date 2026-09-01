import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const srcNewUrlConfig = resolve(rootDir, 'app/.vitepress/src-new/data/url-config/index.ts');
const srcOldUrlConfig = resolve(rootDir, 'app/.vitepress/src/data/url-config/index.ts');

describe('url-config 中枢常量 gitcode→atomgit 改名（src-new）', () => {
  const content = readFileSync(srcNewUrlConfig, 'utf-8');

  it('新增 ATOMGIT_LINK 常量，值为 https://atomgit.com', () => {
    expect(content).toContain("const ATOMGIT_LINK = 'https://atomgit.com'");
  });

  it('不再保留 GITCODE_LINK 常量', () => {
    expect(content).not.toContain('GITCODE_LINK');
  });

  it('新增 NOTIFICATION_SOURCE 常量，值暂留 https://gitcode.com（后端 source 解耦）', () => {
    expect(content).toContain("const NOTIFICATION_SOURCE = 'https://gitcode.com'");
  });

  it('NOTIFICATION_SOURCE 与 ATOMGIT_LINK 解耦（值不同）', () => {
    expect(content).toContain("const ATOMGIT_LINK = 'https://atomgit.com'");
    expect(content).toContain("const NOTIFICATION_SOURCE = 'https://gitcode.com'");
  });

  it('export 块同时导出 ATOMGIT_LINK 与 NOTIFICATION_SOURCE', () => {
    expect(content).toMatch(/export\s*\{[\s\S]*ATOMGIT_LINK[\s\S]*\}/);
    expect(content).toMatch(/export\s*\{[\s\S]*NOTIFICATION_SOURCE[\s\S]*\}/);
  });

  it('export 块不再导出 GITCODE_LINK', () => {
    const exportBlock = content.match(/export\s*\{([\s\S]*?)\}/);
    expect(exportBlock).not.toBeNull();
    expect(exportBlock![1]).not.toContain('GITCODE_LINK');
  });
});

describe('url-config 中枢常量 gitcode→atomgit 改名（src 旧版）', () => {
  const content = readFileSync(srcOldUrlConfig, 'utf-8');

  it('新增 ATOMGIT_LINK 常量，值为 https://atomgit.com', () => {
    expect(content).toContain("const ATOMGIT_LINK = 'https://atomgit.com'");
  });

  it('不再保留 GITCODE_LINK 常量', () => {
    expect(content).not.toContain('GITCODE_LINK');
  });

  it('DOCS_GITCODE_LINK 改名为 DOCS_ATOMGIT_LINK 且值为 docs.atomgit.com', () => {
    expect(content).toContain("export const DOCS_ATOMGIT_LINK = 'https://docs.atomgit.com'");
    expect(content).not.toContain('DOCS_GITCODE_LINK');
  });

  it('export 块导出 ATOMGIT_LINK 且不再导出 GITCODE_LINK', () => {
    const exportBlock = content.match(/export\s*\{([\s\S]*?)\}/);
    expect(exportBlock).not.toBeNull();
    expect(exportBlock![1]).toContain('ATOMGIT_LINK');
    expect(exportBlock![1]).not.toContain('GITCODE_LINK');
  });
});
