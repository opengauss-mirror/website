import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const layoutCharterPath = resolve(rootDir, 'app/.vitepress/src-new/layouts/LayoutCharter.vue');
const appHeaderPath = resolve(rootDir, 'app/.vitepress/src/components/header/AppHeader.vue');

function readFile(filePath: string) {
  return readFileSync(filePath, 'utf-8');
}

describe('LayoutCharter .copy z-index 修复验证', () => {
  it('.copy 按钮不包含 z-index: 3 声明', () => {
    const content = readFile(layoutCharterPath);
    expect(content).not.toContain('z-index: 3');
  });

  it('.copy 按钮区域不包含任何 z-index 声明', () => {
    const content = readFile(layoutCharterPath);
    const copyStart = content.indexOf('.copy {');
    const copyEnd = content.indexOf('}', content.indexOf('icon-copy2.svg', copyStart));
    const copySection = content.substring(copyStart, copyEnd);
    expect(copySection).not.toMatch(/z-index\s*:/);
  });

  it('.copy 按钮仍保留 position: absolute', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('position: absolute');
  });

  it('.copy 按钮仍保留 cursor: pointer', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('cursor: pointer');
  });

  it('.copy 按钮仍保留 opacity: 0 默认隐藏', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('opacity: 0');
  });

  it('.copy 按钮在 phone 断点下仍保留 opacity: 1', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('opacity: 1');
  });
});

describe('LayoutCharter .charter-tab-wrapper z-index 未受影响', () => {
  it('.charter-tab-wrapper 仍保留 z-index: 1', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('z-index: 1');
  });

  it('.charter-tab-wrapper 仍保留 position: sticky', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('position: sticky');
  });
});

describe('LayoutCharter .copy 暗色模式不受影响', () => {
  it('暗色模式下 .copy 仍使用 icon-copy-dark.svg', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('icon-copy-dark.svg');
  });

  it('.copy 默认模式使用 icon-copy2.svg', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('icon-copy2.svg');
  });
});

describe('AppHeader z-index 未受影响', () => {
  it('AppHeader 仍保留 z-index: 99', () => {
    const content = readFile(appHeaderPath);
    expect(content).toContain('z-index: 99');
  });
});

describe('LayoutCharter .code-block 堆叠上下文', () => {
  it('.code-block 仍保留 position: relative', () => {
    const content = readFile(layoutCharterPath);
    expect(content).toContain('position: relative');
  });
});
