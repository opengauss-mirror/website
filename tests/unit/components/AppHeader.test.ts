import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const appHeaderPath = resolve(rootDir, 'app/.vitepress/src-new/components/header/AppHeader.vue');
const headerToolsPath = resolve(rootDir, 'app/.vitepress/src-new/components/header/HeaderTools.vue');

function readFile(filePath: string) {
  return readFileSync(filePath, 'utf-8');
}

describe('AppHeader mobile 语言切换器接线修复 — changeLanguage 方法', () => {
  it('定义了 changeLanguage 方法 (const 箭头函数,接收 { id })', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/const\s+changeLanguage\s*=\s*\(\s*\{\s*id\s*\}\s*:\s*\{\s*id:\s*string\s*\}\s*\)\s*=>\s*\{/);
  });

  it('changeLanguage 内含同语言提前返回 (if (lang.value === id) return)', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/if\s*\(\s*lang\.value\s*===\s*id\s*\)\s*return/);
  });

  it('changeLanguage 通过 window.location 取 pathname / search (事件回调内,SSR 安全)', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/const\s*\{\s*pathname,\s*search\s*\}\s*=\s*window\.location/);
  });

  it('changeLanguage 把路径里的旧语言段替换为目标语言段并 router.go 跳转', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/pathname\.replace\(`\/\$\{lang\.value\}\/`,\s*`\/\$\{id\}\/`\)/);
    expect(content).toMatch(/router\.go\(/);
  });

  it('changeLanguage 不使用 useLocale.changeLocale (走路由跳转,非内存切换)', () => {
    const content = readFile(appHeaderPath);
    expect(content).not.toContain('changeLocale');
    expect(content).not.toContain('useLocale');
  });
});

describe('AppHeader mobile 语言切换器接线修复 — 模板 @change 与 :options', () => {
  it('mobile OHeaderLanguageSwitcher 绑定 @change="changeLanguage"', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/<OHeaderLanguageSwitcher[^>]*@change="changeLanguage"/);
  });

  it('mobile OHeaderLanguageSwitcher 的 :options 绑定 availableLangOptions (按页面可用语言过滤,非全量)', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/<OHeaderLanguageSwitcher[^>]*:options="availableLangOptions"/);
  });

  it('mobile OHeaderLanguageSwitcher 不再绑定全量 headerData.langOptions', () => {
    const content = readFile(appHeaderPath);
    expect(content).not.toMatch(/<OHeaderLanguageSwitcher[^>]*:options="headerData\.langOptions"/);
  });

  it('mobile OHeaderLanguageSwitcher 仍按 availableLangOptions 数量决定 :disabled', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/<OHeaderLanguageSwitcher[^>]*:disabled="availableLangOptions\.length\s*<\s*1"/);
  });

  it('mobile OHeaderLanguageSwitcher 带 type="mobile" (区分桌面端)', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/<OHeaderLanguageSwitcher[^>]*type="mobile"/);
  });
});

describe('AppHeader availableLangOptions 计算 — 与桌面端一致', () => {
  it('availableLangOptions 为 computed', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/const\s+availableLangOptions\s*=\s*computed/);
  });

  it('availableLangOptions 用 canonicalPagePath(route.path) 查 pageLangMap,缺省回退当前 lang', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/pageLangMap\[canonicalPagePath\(route\.path\)\]\s*\|\|\s*\[lang\.value\]/);
  });

  it('availableLangOptions 用 headerData.langOptions filter 过滤 (非全量直出)', () => {
    const content = readFile(appHeaderPath);
    expect(content).toMatch(/headerData\.langOptions\.filter/);
  });
});

describe('AppHeader SSR 安全 — window 访问仅在事件回调内', () => {
  it('window.location 访问位于 changeLanguage 函数体内,不在 setup 顶层', () => {
    const content = readFile(appHeaderPath);
    const fnStart = content.indexOf('const changeLanguage');
    expect(fnStart).toBeGreaterThan(-1);
    const fnEnd = content.indexOf('};', fnStart);
    expect(fnEnd).toBeGreaterThan(fnStart);
    const fnBody = content.substring(fnStart, fnEnd);
    expect(fnBody).toContain('window.location');
  });

  it('setup 顶层 script 段不直接调用 window (无顶层 window 引用)', () => {
    const content = readFile(appHeaderPath);
    const scriptStart = content.indexOf('<script setup lang="ts">');
    const scriptEnd = content.indexOf('</script>');
    const script = content.substring(scriptStart, scriptEnd);
    const fnStart = script.indexOf('const changeLanguage');
    const beforeFn = fnStart > -1 ? script.substring(0, fnStart) : script;
    expect(beforeFn).not.toMatch(/\bwindow\b/);
  });
});

describe('HeaderTools 桌面端语言切换回归未受影响', () => {
  it('HeaderTools.vue 仍定义 changeLanguage 方法 (参照基线,本次未动)', () => {
    const content = readFile(headerToolsPath);
    expect(content).toMatch(/const\s+changeLanguage\s*=\s*\(\s*\{\s*id\s*\}\s*:\s*\{\s*id:\s*string\s*\}\s*\)\s*=>\s*\{/);
    expect(content).toMatch(/router\.go\(/);
  });

  it('HeaderTools.vue 桌面端 OHeaderLanguageSwitcher 仍绑 @change="changeLanguage"', () => {
    const content = readFile(headerToolsPath);
    expect(content).toMatch(/<OHeaderLanguageSwitcher[^>]*@change="changeLanguage"/);
  });

  it('AppHeader 与 HeaderTools 的 changeLanguage 行为一致 (同款路由跳转式,空白无关)', () => {
    const header = readFile(appHeaderPath);
    const tools = readFile(headerToolsPath);
    const extract = (src: string) => {
      const start = src.indexOf('const changeLanguage');
      const end = src.indexOf('};', start);
      return src
        .substring(start, end)
        .replace(/\s+/g, ' ')
        .trim();
    };
    expect(extract(header)).toBe(extract(tools));
  });
});
