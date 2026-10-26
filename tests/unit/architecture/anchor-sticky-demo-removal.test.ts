import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');

// 本次改动涉及的 12 个源文件(滚动容器从 div#anchor-sticky-demo 回归 window)
const CHANGED_FILES = [
  'app/.vitepress/src/App.vue',
  'app/.vitepress/src/components/AppFloat.vue',
  'app/.vitepress/src/components/hooks/useWindowScroll.ts',
  'app/.vitepress/src/views/blogs/TheBlogs.vue',
  'app/.vitepress/src/views/community/TheMember.vue',
  'app/.vitepress/src/views/news/TheNews.vue',
  'app/.vitepress/src/views/showcase/TheShowCase.vue',
  'app/.vitepress/src/views/video/VideoAnchor.vue',
  'app/.vitepress/src-new/components/AppTour.vue',
  'app/.vitepress/src-new/layouts/LayoutCharter.vue',
  'app/.vitepress/src-new/views/charter/TheCharter.vue',
  'app/.vitepress/src-new/views/download/DownloadSection.vue',
];

function readRel(p: string) {
  return readFileSync(resolve(rootDir, p), 'utf-8');
}

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
      `rg -uu -N ${JSON.stringify(pattern)} -g '!app/.vitepress/dist' -g '!.git' --no-heading --no-filename`,
      { cwd: rootDir, encoding: 'utf-8' }
    );
    return out.trim().split('\n').filter(Boolean);
  } catch (e: any) {
    if (e.status === 1) return [];
    throw e;
  }
}

describe('App.vue — 容器包裹与 provide 链路移除', () => {
  const content = readRel(CHANGED_FILES[0]);

  it('不再包裹 div#anchor-sticky-demo 容器', () => {
    expect(content).not.toContain('id="anchor-sticky-demo"');
    expect(content).not.toContain('anchor-sticky-demo');
  });

  it('不再 provide scrollContainerRef', () => {
    expect(content).not.toContain("provide('scrollContainerRef'");
    expect(content).not.toContain('scrollContainerRef');
  });

  it('不再保留内联滚动容器样式(position/height/overflow)', () => {
    expect(content).not.toMatch(/position:\s*relative;\s*height:\s*100vh;\s*overflow-y:\s*auto/);
  });
});

describe('Charter 组件 — inject 链路移除并直连 window', () => {
  const charter = readRel('app/.vitepress/src-new/views/charter/TheCharter.vue');
  const layout = readRel('app/.vitepress/src-new/layouts/LayoutCharter.vue');

  it('不再 inject scrollContainerRef', () => {
    expect(charter).not.toContain("inject('scrollContainerRef'");
    expect(layout).not.toContain("inject('scrollContainerRef'");
    expect(charter).not.toContain('scrollContainerRef');
    expect(layout).not.toContain('scrollContainerRef');
  });

  it('onScroll 改读 window.scrollY / documentElement.scrollTop', () => {
    expect(charter).toMatch(/window\.scrollY\s*\|\|\s*document\.documentElement\.scrollTop/);
    expect(layout).toMatch(/window\.scrollY\s*\|\|\s*document\.documentElement\.scrollTop/);
  });

  it('addEventListener/removeEventListener 目标改 window', () => {
    expect(charter).toContain('window.addEventListener');
    expect(charter).toContain('window.removeEventListener');
    expect(layout).toContain('window.addEventListener');
    expect(layout).toContain('window.removeEventListener');
  });
});

describe('scrollTo 路径组件 — 直接调用 window.scrollTo', () => {
  const scrollToFiles = [
    'app/.vitepress/src-new/components/AppTour.vue',
    'app/.vitepress/src/components/AppFloat.vue',
    'app/.vitepress/src-new/views/download/DownloadSection.vue',
    'app/.vitepress/src/views/showcase/TheShowCase.vue',
    'app/.vitepress/src/views/news/TheNews.vue',
    'app/.vitepress/src/views/blogs/TheBlogs.vue',
  ];

  for (const file of scrollToFiles) {
    it(`${file} 不再经 getElementById('anchor-sticky-demo') 回退`, () => {
      const content = readRel(file);
      expect(content).not.toContain("getElementById('anchor-sticky-demo')");
      expect(content).not.toContain('anchor-sticky-demo');
    });

    it(`${file} 滚顶/锚点跳转直接调用 window.scrollTo`, () => {
      const content = readRel(file);
      expect(content).toMatch(/window\.scrollTo/);
    });
  }
});

describe('useWindowScroll / TheMember / VideoAnchor — scrollTop 读取直连 window', () => {
  it('useWindowScroll 读取 window.scrollY', () => {
    const content = readRel('app/.vitepress/src/components/hooks/useWindowScroll.ts');
    expect(content).toContain('window.scrollY');
    expect(content).not.toContain('anchor-sticky-demo');
  });

  it('TheMember scrollTop 读取直连 window.scrollY', () => {
    const content = readRel('app/.vitepress/src/views/community/TheMember.vue');
    expect(content).toMatch(/window\.scrollY\s*\|\|\s*document\.documentElement\.scrollTop/);
    expect(content).toContain('window.addEventListener');
    expect(content).toContain('window.removeEventListener');
    expect(content).not.toContain('anchor-sticky-demo');
  });

  it('VideoAnchor 不再 inject scrollContainerRef,getScrollContainer 直返 documentElement', () => {
    const content = readRel('app/.vitepress/src/views/video/VideoAnchor.vue');
    expect(content).not.toContain('scrollContainerRef');
    expect(content).toMatch(/getScrollContainer\s*=\s*\(\)\s*=>\s*document\.documentElement/);
  });
});

describe('整仓 anchor-sticky-demo / scrollContainerRef 残留扫描(设计 §5 验收硬指标)', () => {
  const runIfRg = hasRg() ? it : it.skip;

  runIfRg('rg "anchor-sticky-demo" app/.vitepress/(排除 dist)返回 0 命中', () => {
    expect(rgLines('anchor-sticky-demo')).toEqual([]);
  });

  runIfRg('rg "scrollContainerRef" app/.vitepress/(排除 dist)返回 0 命中', () => {
    expect(rgLines('scrollContainerRef')).toEqual([]);
  });

  runIfRg('rg "getElementById(\'anchor-sticky-demo\')" app/.vitepress/ 返回 0 命中', () => {
    expect(rgLines("getElementById('anchor-sticky-demo')")).toEqual([]);
  });
});
