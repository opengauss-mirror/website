import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { createApp, h, defineComponent } from 'vue';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

// 屏蔽 hook 经由 @/shared/utils 拉起的 element-plus / js-cookie 重依赖链,
// 只保留 isBrowser 语义(浏览器环境为 true,以覆盖初始化读取分支)。
vi.mock('@/shared/utils', () => ({
  isBrowser: () => true,
}));

import useWindowScroll from '@/components/hooks/useWindowScroll';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const hookPath = resolve(
  rootDir,
  'app/.vitepress/src/components/hooks/useWindowScroll.ts'
);
const source = readFileSync(hookPath, 'utf-8');

// jsdom 的 window.scrollY 默认只读且恒为 0,改写为可控 getter 以驱动 hook 读取。
let scrollYValue = 0;
Object.defineProperty(window, 'scrollY', {
  configurable: true,
  get: () => scrollYValue,
});
const setScrollY = (v: number) => {
  scrollYValue = v;
};

// 在真实 Vue 组件生命周期内挂载 hook,触发 onMounted/onUnmounted。
function mountHook() {
  let scrollTopRef: ReturnType<typeof useWindowScroll> | null = null;
  const App = defineComponent({
    setup() {
      scrollTopRef = useWindowScroll();
      return () => h('div');
    },
  });
  const app = createApp(App);
  const el = document.createElement('div');
  document.body.appendChild(el);
  app.mount(el);
  return {
    app,
    el,
    getRef: () => scrollTopRef as ReturnType<typeof useWindowScroll>,
  };
}

describe('useWindowScroll — 源码结构验证', () => {
  it('读取 window.scrollY(不再读 anchor-sticky-demo 容器)', () => {
    expect(source).toContain('window.scrollY');
    expect(source).not.toContain("getElementById('anchor-sticky-demo')");
    expect(source).not.toContain('anchor-sticky-demo');
  });

  it('onMounted 监听 window 的 scroll 事件', () => {
    expect(source).toMatch(/window\.addEventListener\(\s*['"]scroll['"]/);
  });

  it('onUnmounted 移除 window 的 scroll 事件(修复既有 resize 不匹配 bug)', () => {
    expect(source).toMatch(/window\.removeEventListener\(\s*['"]scroll['"]/);
    expect(source).not.toMatch(/removeEventListener\(\s*['"]resize['"]/);
  });
});

describe('useWindowScroll — 行为测试', () => {
  beforeEach(() => {
    setScrollY(0);
  });

  afterEach(() => {
    setScrollY(0);
  });

  it('挂载后 scrollTop 反映当前 window.scrollY', () => {
    setScrollY(120);
    const { app, el, getRef } = mountHook();
    expect(getRef().value).toBe(120);
    app.unmount();
    el.remove();
  });

  it('window 派发 scroll 事件后 scrollTop 更新为新值', () => {
    setScrollY(0);
    const { app, el, getRef } = mountHook();
    expect(getRef().value).toBe(0);
    setScrollY(300);
    window.dispatchEvent(new Event('scroll'));
    expect(getRef().value).toBe(300);
    app.unmount();
    el.remove();
  });

  it('多次 scroll 每次读取当前值(不残留旧值)', () => {
    setScrollY(0);
    const { app, el, getRef } = mountHook();
    setScrollY(50);
    window.dispatchEvent(new Event('scroll'));
    expect(getRef().value).toBe(50);
    setScrollY(0);
    window.dispatchEvent(new Event('scroll'));
    expect(getRef().value).toBe(0);
    app.unmount();
    el.remove();
  });

  it('卸载后 scroll 监听已移除(scroll 事件不再更新 scrollTop)', () => {
    setScrollY(0);
    const { app, el, getRef } = mountHook();
    setScrollY(200);
    window.dispatchEvent(new Event('scroll'));
    expect(getRef().value).toBe(200);
    app.unmount();
    el.remove();
    setScrollY(999);
    window.dispatchEvent(new Event('scroll'));
    expect(getRef().value).toBe(200);
  });
});
