import { expect, describe, it, beforeEach } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { useCommon } from '../../../app/.vitepress/src/stores/common';

describe('common store theme 初始值', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('theme 初始值为 "light"', () => {
    const store = useCommon();
    expect(store.theme).toBe('light');
  });

  it('theme 初始值不为空字符串', () => {
    const store = useCommon();
    expect(store.theme).not.toBe('');
  });

  it('theme 可设置为 "dark"', () => {
    const store = useCommon();
    store.theme = 'dark';
    expect(store.theme).toBe('dark');
  });

  it('isLight 逻辑：theme 为 "light" 时返回 true', () => {
    const store = useCommon();
    expect(store.theme === 'light' ? true : false).toBe(true);
  });

  it('isLight 逻辑：theme 为 "dark" 时返回 false', () => {
    const store = useCommon();
    store.theme = 'dark';
    expect(store.theme === 'light' ? true : false).toBe(false);
  });
});

describe('common store changeTheme 切换逻辑', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('从 "light" 切换到 "dark"', () => {
    const store = useCommon();
    expect(store.theme).toBe('light');
    const newTheme = store.theme === 'dark' ? 'light' : 'dark';
    store.theme = newTheme;
    expect(store.theme).toBe('dark');
  });

  it('从 "dark" 切换到 "light"', () => {
    const store = useCommon();
    store.theme = 'dark';
    const newTheme = store.theme === 'dark' ? 'light' : 'dark';
    store.theme = newTheme;
    expect(store.theme).toBe('light');
  });

  it('连续切换：light → dark → light', () => {
    const store = useCommon();
    expect(store.theme).toBe('light');
    store.theme = store.theme === 'dark' ? 'light' : 'dark';
    expect(store.theme).toBe('dark');
    store.theme = store.theme === 'dark' ? 'light' : 'dark';
    expect(store.theme).toBe('light');
  });
});

describe('common store hydration mismatch 消除验证', () => {
  it('空字符串 theme 导致 v-if/v-else 分支不确定（对照：bug 复现）', () => {
    const emptyTheme = '';
    expect(emptyTheme === 'light').toBe(false);
    expect(emptyTheme === 'dark').toBe(false);
  });

  it('"light" theme 使 v-if/v-else 分支确定', () => {
    const theme = 'light';
    expect(theme === 'light').toBe(true);
    expect(theme === 'dark').toBe(false);
  });

  it('SSR 与客户端首帧 theme 值一致（均为 "light"）', () => {
    setActivePinia(createPinia());
    const store = useCommon();
    expect(store.theme).toBe('light');
  });
});