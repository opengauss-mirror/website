import { expect, describe, it } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const zhTsPath = resolve(rootDir, 'app/.vitepress/src-new/data/events/zh.ts');
const scriptPath = resolve(rootDir, 'scripts/readEventsFrontmatter.js');
const packageJsonPath = resolve(rootDir, 'package.json');
const contentBridgePath = resolve(rootDir, 'app/.vitepress/src-new/data/events/content-bridge.ts');
const oldSourceIndexPath = resolve(rootDir, 'app/.vitepress/src/data/events/index.ts');

describe('zh.ts 文件删除验证', () => {
  it('zh.ts 文件不存在', () => {
    expect(existsSync(zhTsPath)).toBe(false);
  });
});

describe('readEventsFrontmatter.js 脚本删除验证', () => {
  it('readEventsFrontmatter.js 文件不存在', () => {
    expect(existsSync(scriptPath)).toBe(false);
  });
});

describe('package.json predev/prebuild 移除验证', () => {
  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));

  it('package.json 中无 predev 脚本', () => {
    expect(packageJson.scripts).not.toHaveProperty('predev');
  });

  it('package.json 中无 prebuild 脚本', () => {
    expect(packageJson.scripts).not.toHaveProperty('prebuild');
  });

  it('package.json 仍保留 dev 脚本', () => {
    expect(packageJson.scripts).toHaveProperty('dev');
  });

  it('package.json 仍保留 build 脚本', () => {
    expect(packageJson.scripts).toHaveProperty('build');
  });
});

describe('content-bridge.ts 不依赖 zh.ts', () => {
  const content = readFileSync(contentBridgePath, 'utf-8');

  it('content-bridge.ts 不包含对 zh.ts 的 import', () => {
    const importRegex = /import\s+.*from\s+['"]\.\/zh['"]/;
    expect(importRegex.test(content)).toBe(false);
  });

  it('content-bridge.ts 不包含对 zh 的 import', () => {
    const importRegex = /import\s+zh\s+from/;
    expect(importRegex.test(content)).toBe(false);
  });

  it('content-bridge.ts 使用 #content/activity 数据源', () => {
    expect(content).toContain('#content/activity');
  });

  it('content-bridge.ts 导出 listData', () => {
    expect(content).toContain('export const listData');
  });
});

describe('旧源事件数据不受影响', () => {
  it('旧源 events/index.ts 文件仍存在', () => {
    expect(existsSync(oldSourceIndexPath)).toBe(true);
  });

  it('旧源 events-zh.ts 文件仍存在', () => {
    expect(existsSync(resolve(rootDir, 'app/.vitepress/src/data/events/events-zh.ts'))).toBe(true);
  });

  it('旧源 events-en.ts 文件仍存在', () => {
    expect(existsSync(resolve(rootDir, 'app/.vitepress/src/data/events/events-en.ts'))).toBe(true);
  });

  const oldIndexContent = readFileSync(oldSourceIndexPath, 'utf-8');
  it('旧源 index.ts 仍从 events-zh 和 events-en 导入', () => {
    expect(oldIndexContent).toContain("import eventsZh from './events-zh'");
    expect(oldIndexContent).toContain("import eventsEn from './events-en'");
  });
});

describe('src-new 目录中无残留 zh.ts 引用', () => {
  const srcNewDir = resolve(rootDir, 'app/.vitepress/src-new');
  const content = readFileSync(contentBridgePath, 'utf-8');

  it('content-bridge.ts 的 listData.zh 不依赖 zh.ts 导入的数据', () => {
    expect(content).not.toContain("import zh from './zh'");
    expect(content).not.toContain('zh: zh');
  });

  it('content-bridge.ts 的 listData.zh 使用 rawEvents 映射', () => {
    expect(content).toContain('zh: rawEvents');
  });
});
