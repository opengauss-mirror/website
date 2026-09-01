import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const todoListPath = resolve(rootDir, 'app/.vitepress/src-new/views/notifications/components/TodoList.vue');
const urlConfigPath = resolve(rootDir, 'app/.vitepress/src-new/data/url-config/index.ts');

describe('TodoList source 参数解耦为 NOTIFICATION_SOURCE', () => {
  const content = readFileSync(todoListPath, 'utf-8');

  it('从 url-config 导入 NOTIFICATION_SOURCE（不再导入 GITCODE_LINK / ATOMGIT_LINK）', () => {
    expect(content).toMatch(/import\s*\{[^}]*NOTIFICATION_SOURCE[^}]*\}\s*from\s*['"]~@\/data\/url-config['"]/);
    expect(content).not.toContain('GITCODE_LINK');
    expect(content).not.toContain('ATOMGIT_LINK');
  });

  it('ISSUE 分支 source 使用 NOTIFICATION_SOURCE', () => {
    expect(content).toContain("source: activeTab.value === TODO_TYPE.ISSUE ? NOTIFICATION_SOURCE : TODO_TYPE.CVE");
  });

  it('PR 分支 source 使用 NOTIFICATION_SOURCE', () => {
    expect(content).toMatch(/activeTab\.value === TODO_TYPE\.PR[\s\S]*?source: NOTIFICATION_SOURCE/);
  });

  it('全文不再出现 GITCODE_LINK 引用', () => {
    expect(content).not.toContain('GITCODE_LINK');
  });

  it('不直接引用 ATOMGIT_LINK（中枢改名不应污染后端 source 参数）', () => {
    expect(content).not.toContain('ATOMGIT_LINK');
  });
});

describe('NOTIFICATION_SOURCE 与中枢解耦不变量', () => {
  const urlConfig = readFileSync(urlConfigPath, 'utf-8');

  it('NOTIFICATION_SOURCE 值暂留 https://gitcode.com（后端 source 字段，待 maintainer 确认后端已迁后再改）', () => {
    expect(urlConfig).toContain("const NOTIFICATION_SOURCE = 'https://gitcode.com'");
  });

  it('ATOMGIT_LINK 值为 https://atomgit.com（与 NOTIFICATION_SOURCE 值不同，证解耦）', () => {
    expect(urlConfig).toContain("const ATOMGIT_LINK = 'https://atomgit.com'");
  });
});
