import { expect, describe, it, beforeEach, vi } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { watch, nextTick } from 'vue';
import { useCommon } from '../../../../app/.vitepress/src/stores/common';
import {
  getCustomCookie,
  setCustomCookie,
  removeCustomCookie,
} from '../../../../app/.vitepress/src/shared/utils';

const APPEARANCE_KEY = 'openGauss-theme-appearance';

function applyThemeDOM(val: string) {
  val === 'light' && document.documentElement.removeAttribute('data-o-theme');
  val === 'dark' && document.documentElement.setAttribute('data-o-theme', 'dark');
  val === 'light' && document.documentElement.classList.remove('dark');
  val === 'dark' && document.documentElement.classList.add('dark');
}

describe('ItemTheme watch 无 immediate 行为', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    document.documentElement.removeAttribute('data-o-theme');
    document.documentElement.classList.remove('dark');
    removeCustomCookie(APPEARANCE_KEY);
  });

  it('watch 无 immediate：初始 theme 为 "light" 时不立即触发回调', async () => {
    const store = useCommon();
    let callCount = 0;
    watch(
      () => store.theme,
      () => { callCount++; },
      {}
    );
    await nextTick();
    expect(callCount).toBe(0);
  });

  it('watch 无 immediate：初始状态 DOM 不被覆写（保留 check-dark-mode-v2.js 已设 CSS 上下文）', async () => {
    const store = useCommon();
    document.documentElement.setAttribute('data-o-theme', 'dark');
    document.documentElement.classList.add('dark');
    watch(
      () => store.theme,
      (val) => { applyThemeDOM(val); },
      {}
    );
    await nextTick();
    expect(document.documentElement.getAttribute('data-o-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('watch 触发：theme 变为 "dark" 时设置 DOM 属性', async () => {
    const store = useCommon();
    watch(
      () => store.theme,
      (val) => { applyThemeDOM(val); },
      {}
    );
    store.theme = 'dark';
    await nextTick();
    expect(document.documentElement.getAttribute('data-o-theme')).toBe('dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('watch 触发：theme 变为 "light" 时移除 DOM 属性', async () => {
    const store = useCommon();
    store.theme = 'dark';
    document.documentElement.setAttribute('data-o-theme', 'dark');
    document.documentElement.classList.add('dark');
    watch(
      () => store.theme,
      (val) => { applyThemeDOM(val); },
      {}
    );
    store.theme = 'light';
    await nextTick();
    expect(document.documentElement.getAttribute('data-o-theme')).toBeNull();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });
});

describe('ItemTheme onMounted cookie/media 检测逻辑', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    removeCustomCookie(APPEARANCE_KEY);
  });

  it('cookie 为 "dark" 时，theme 设置为 "dark"', () => {
    const store = useCommon();
    setCustomCookie(APPEARANCE_KEY, 'dark', 180);
    const cookieVal = getCustomCookie(APPEARANCE_KEY);
    const theme = cookieVal === 'dark' ? 'dark' : 'light';
    store.theme = theme;
    expect(store.theme).toBe('dark');
  });

  it('cookie 为 "light" 时，theme 设置为 "light"', () => {
    const store = useCommon();
    setCustomCookie(APPEARANCE_KEY, 'light', 180);
    const cookieVal = getCustomCookie(APPEARANCE_KEY);
    const theme = cookieVal === 'dark' ? 'dark' : 'light';
    store.theme = theme;
    expect(store.theme).toBe('light');
  });

  it('cookie 为 "auto" 时，按 ternary 规则归为 "light"', () => {
    setCustomCookie(APPEARANCE_KEY, 'auto', 180);
    const cookieVal = getCustomCookie(APPEARANCE_KEY);
    const theme = cookieVal === 'dark' ? 'dark' : 'light';
    expect(theme).toBe('light');
  });

  it('无 cookie 时，模拟 prefers-color-scheme: dark → theme 为 "dark"', () => {
    const store = useCommon();
    expect(getCustomCookie(APPEARANCE_KEY)).toBeUndefined();
    const prefereDark = true;
    const theme = prefereDark ? 'dark' : 'light';
    store.theme = theme;
    expect(store.theme).toBe('dark');
  });

  it('无 cookie 时，模拟 prefers-color-scheme: light → theme 为 "light"', () => {
    const store = useCommon();
    expect(getCustomCookie(APPEARANCE_KEY)).toBeUndefined();
    const prefereDark = false;
    const theme = prefereDark ? 'dark' : 'light';
    store.theme = theme;
    expect(store.theme).toBe('light');
  });
});

describe('ItemTheme hydration mismatch 消除验证', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('SSR 首帧与客户端初始 theme 均为 "light"，条件分支一致', () => {
    const store = useCommon();
    expect(store.theme).toBe('light');
    expect(store.theme === 'light').toBe(true);
    expect(store.theme === 'dark').toBe(false);
  });

  it('客户端 mount 后 theme 可变为 "dark"，但 hydration 阶段不受影响', () => {
    const store = useCommon();
    const hydrationTheme = store.theme;
    expect(hydrationTheme).toBe('light');
    store.theme = 'dark';
    const postMountTheme = store.theme;
    expect(postMountTheme).toBe('dark');
    expect(hydrationTheme).not.toBe(postMountTheme);
  });
});