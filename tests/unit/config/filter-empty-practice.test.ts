import { expect, describe, it, afterAll } from 'vitest';
import { mkdirSync, rmSync, writeFileSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { getEmptyPracticeExcludes } from '../../../app/.vitepress/scripts/filter-empty-practice';

const __dirname = dirname(fileURLToPath(import.meta.url));

/**
 * 在系统临时目录下构造一个 mock app 目录结构:
 *   <appDir>/{zh,en}/user-practice/<category>/<slug>/index.md
 * 写入指定 frontmatter + 正文,用于隔离、确定性地测试判定逻辑。
 */
function createMockApp(files: Record<string, string>): string {
  const appDir = join(tmpdir(), `filter-practice-test-${Math.random().toString(36).slice(2)}`);
  for (const [relPath, content] of Object.entries(files)) {
    const abs = join(appDir, ...relPath.split('/'));
    mkdirSync(join(abs, '..'), { recursive: true });
    writeFileSync(abs, content, 'utf-8');
  }
  return appDir;
}

const TMP_DIRS: string[] = [];
afterAll(() => {
  for (const dir of TMP_DIRS) {
    if (existsSync(dir)) rmSync(dir, { recursive: true, force: true });
  }
});

function mockApp(files: Record<string, string>): string {
  const dir = createMockApp(files);
  TMP_DIRS.push(dir);
  return dir;
}

describe('getEmptyPracticeExcludes — 判定逻辑(隔离 mock)', () => {
  it('detail:false 且正文为空 → 排除', () => {
    const appDir = mockApp({
      'zh/user-practice/dbv/empty/index.md': `---
title: 空
detail: false
id: DBV
---
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual(['zh/user-practice/dbv/empty/index.md']);
  });

  it('detail:false 且正文仅空白 → 排除(trim 后为空)', () => {
    const appDir = mockApp({
      'zh/user-practice/dbv/whitespace/index.md': `---
title: 空白
detail: false
---
   
   
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual(['zh/user-practice/dbv/whitespace/index.md']);
  });

  it('detail:false 但正文非空 → 不排除', () => {
    const appDir = mockApp({
      'zh/user-practice/manufacture/dfmc/index.md': `---
title: 东风
detail: false
id: Manufacture
---
## 核心应用
正文内容非空,应保留路由。
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual([]);
  });

  it('detail:true 且正文为空 → 不排除', () => {
    const appDir = mockApp({
      'zh/user-practice/dbv/true-empty/index.md': `---
title: 真
detail: true
id: DBV
---
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual([]);
  });

  it('无 detail 字段 → 不排除', () => {
    const appDir = mockApp({
      'zh/user-practice/index.md': `---
title: 列表页
---
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual([]);
  });

  it('detail 为真值字符串 / 数字 → 不排除(仅严格 === false)', () => {
    const appDir = mockApp({
      'zh/user-practice/dbv/stringfalse/index.md': `---
detail: "false"
---
`,
      'zh/user-practice/dbv/numberzero/index.md': `---
detail: 0
---
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual([]);
  });
});

describe('getEmptyPracticeExcludes — 路径与多语言', () => {
  it('同时扫描 zh 与 en 两侧', () => {
    const appDir = mockApp({
      'zh/user-practice/dbv/zhonly/index.md': `---
detail: false
---
`,
      'en/user-practice/dbv/enonly/index.md': `---
detail: false
---
`,
    });
    const excludes = getEmptyPracticeExcludes(appDir);
    expect(excludes).toContain('zh/user-practice/dbv/zhonly/index.md');
    expect(excludes).toContain('en/user-practice/dbv/enonly/index.md');
    expect(excludes.length).toBe(2);
  });

  it('返回路径相对 appDir 且统一使用正斜杠', () => {
    const appDir = mockApp({
      'en/user-practice/finance/nested/deep/index.md': `---
detail: false
---
`,
    });
    const excludes = getEmptyPracticeExcludes(appDir);
    expect(excludes).toEqual(['en/user-practice/finance/nested/deep/index.md']);
    // 函数将 OS 分隔符统一为正斜杠:不应出现反斜杠
    expect(excludes[0]).not.toContain('\\');
  });

  it('递归扫描嵌套子目录', () => {
    const appDir = mockApp({
      'zh/user-practice/bigbusiness/a/one/index.md': `---
detail: false
---
`,
      'zh/user-practice/bigbusiness/b/two/three/index.md': `---
detail: false
---
`,
      'zh/user-practice/bigbusiness/c/index.md': `---
detail: true
---
有正文
`,
    });
    const excludes = getEmptyPracticeExcludes(appDir);
    expect(excludes).toContain('zh/user-practice/bigbusiness/a/one/index.md');
    expect(excludes).toContain('zh/user-practice/bigbusiness/b/two/three/index.md');
    expect(excludes).not.toContain('zh/user-practice/bigbusiness/c/index.md');
    expect(excludes.length).toBe(2);
  });

  it('忽略非 .md 文件', () => {
    const appDir = mockApp({
      'zh/user-practice/dbv/notes.txt': `detail: false`,
      'zh/user-practice/dbv/image.png': `detail: false`,
      'zh/user-practice/dbv/real/index.md': `---
detail: false
---
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual(['zh/user-practice/dbv/real/index.md']);
  });
});

describe('getEmptyPracticeExcludes — 容错', () => {
  it('user-practice 目录不存在 → 返回空数组,不抛异常', () => {
    const appDir = mockApp({
      'zh/some-other-page/index.md': `---
detail: false
---
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual([]);
  });

  it('zh 有 user-practice 但 en 没有 → 仅返回 zh 侧,不抛异常', () => {
    const appDir = mockApp({
      'zh/user-practice/dbv/onlyzh/index.md': `---
detail: false
---
`,
    });
    expect(getEmptyPracticeExcludes(appDir)).toEqual(['zh/user-practice/dbv/onlyzh/index.md']);
  });

  it('目录为空(无任何 md) → 返回空数组', () => {
    const appDir = mockApp({});
    expect(getEmptyPracticeExcludes(appDir)).toEqual([]);
  });
});

describe('getEmptyPracticeExcludes — 真实仓库 app/ 集成', () => {
  const repoRoot = join(__dirname, '../../../');
  const realAppDir = join(repoRoot, 'app');
  const excludes = getEmptyPracticeExcludes(realAppDir);

  it('扫描出非空排除列表(zh 侧 + en 侧均有命中)', () => {
    expect(excludes.length).toBeGreaterThan(0);
    expect(excludes.filter((p) => p.startsWith('zh/')).length).toBeGreaterThan(0);
    expect(excludes.filter((p) => p.startsWith('en/')).length).toBeGreaterThan(0);
  });

  it('所有路径均为 user-practice 下的 .md 文件,相对 app 且正斜杠', () => {
    for (const p of excludes) {
      expect(p).toMatch(/^(zh|en)\/user-practice\/.*\.md$/);
      expect(p).not.toContain('\\');
    }
  });

  it('detail:false 且正文为空的页面被排除(chaojubian zh + en)', () => {
    expect(excludes).toContain('zh/user-practice/dbv/chaojubian/index.md');
    expect(excludes).toContain('en/user-practice/dbv/chaojubian/index.md');
  });

  it('detail:true 的有内容页面不被排除(enmotech)', () => {
    expect(excludes.filter((p) => p.includes('enmotech'))).toEqual([]);
  });

  it('detail:false 但正文非空的页面不被排除(manufacture/dfmc)', () => {
    expect(excludes.filter((p) => p.includes('manufacture/dfmc'))).toEqual([]);
  });

  it('列表页 index.md(无 detail 字段)不被排除', () => {
    expect(excludes).not.toContain('zh/user-practice/index.md');
    expect(excludes).not.toContain('en/user-practice/index.md');
  });
});
