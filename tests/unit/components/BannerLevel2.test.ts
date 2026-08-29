import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const bannerNewPath = resolve(rootDir, 'app/.vitepress/src-new/components/BannerLevel2.vue');
const bannerOldPath = resolve(rootDir, 'app/.vitepress/src/components/BannerLevel2.vue');

function readFile(filePath: string) {
  return readFileSync(filePath, 'utf-8');
}

describe('BannerLevel2 (src-new) 主色背景声明删除验证', () => {
  it('源文件不再引用 --o-color-primary1 (枚举所有读取点应为 0)', () => {
    const content = readFile(bannerNewPath);
    expect(content).not.toContain('--o-color-primary1');
  });

  it('.banner-level2 基类不再声明 background-color: var(--o-color-primary1)', () => {
    const content = readFile(bannerNewPath);
    const baseStart = content.indexOf('.banner-level2 {');
    expect(baseStart).toBeGreaterThan(-1);
    const baseEnd = content.indexOf('}', baseStart);
    const baseSection = content.substring(baseStart, baseEnd);
    expect(baseSection).not.toMatch(/background-color\s*:\s*var\(--o-color-primary1\)/);
  });

  it('.dark 块不再包含 .banner-level2 的 background-color 覆盖', () => {
    const content = readFile(bannerNewPath);
    const darkStart = content.indexOf('.dark {');
    expect(darkStart).toBeGreaterThan(-1);
    const darkEnd = content.indexOf('}', darkStart);
    const darkSection = content.substring(darkStart, darkEnd);
    expect(darkSection).not.toContain('banner-level2');
    expect(darkSection).not.toMatch(/background-color/);
  });

  it('.banner-level2 基类不再含任何 background-color 声明 (默认背景透明)', () => {
    const content = readFile(bannerNewPath);
    const baseStart = content.indexOf('.banner-level2 {');
    const baseEnd = content.indexOf('}', baseStart);
    const baseSection = content.substring(baseStart, baseEnd);
    expect(baseSection).not.toMatch(/background-color/);
  });
});

describe('BannerLevel2 (src-new) backgroundColor prop 注入路径保留', () => {
  it('仍声明 backgroundColor prop 且默认空字符串', () => {
    const content = readFile(bannerNewPath);
    expect(content).toMatch(/backgroundColor:\s*\{[\s\S]*?type:\s*String[\s\S]*?default:\s*''/);
  });

  it('rootStyle computed 仍存在', () => {
    const content = readFile(bannerNewPath);
    expect(content).toMatch(/const\s+rootStyle\s*=\s*computed/);
  });

  it('rootStyle 仍读取 props.backgroundColor 作为分支条件', () => {
    const content = readFile(bannerNewPath);
    expect(content).toMatch(/if\s*\(\s*props\.backgroundColor\s*\)/);
  });

  it('rootStyle 仍把 backgroundColor 写入 result.backgroundColor', () => {
    const content = readFile(bannerNewPath);
    expect(content).toMatch(/result\.backgroundColor\s*=\s*props\.backgroundColor/);
  });

  it('根元素仍绑定 :style="rootStyle" (内联优先级高于 scoped,prop 注入未被破坏)', () => {
    const content = readFile(bannerNewPath);
    expect(content).toMatch(/<div[^>]*:style="rootStyle"/);
  });
});

describe('BannerLevel2 (src-new) 暗色块 filter 规则保留', () => {
  it('.dark 块仍对 .banner-bg 与 .banner-illustration 施加 filter', () => {
    const content = readFile(bannerNewPath);
    const darkStart = content.indexOf('.dark {');
    const darkEnd = content.indexOf('}', darkStart);
    const darkSection = content.substring(darkStart, darkEnd);
    expect(darkSection).toContain('.banner-bg');
    expect(darkSection).toContain('.banner-illustration');
    expect(darkSection).toMatch(/filter:\s*brightness\(0\.8\)\s+grayscale\(0\.2\)\s+contrast\(1\.2\)/);
  });
});

describe('BannerLevel2 (src-new) 基类其它样式未被误删', () => {
  it('.banner-level2 仍保留 position: relative', () => {
    const content = readFile(bannerNewPath);
    expect(content).toContain('position: relative');
  });

  it('.banner-level2 仍保留 width: 100%', () => {
    const content = readFile(bannerNewPath);
    expect(content).toContain('width: 100%');
  });

  it('.banner-level2 仍保留 background-size: cover', () => {
    const content = readFile(bannerNewPath);
    expect(content).toContain('background-size: cover');
  });

  it('.banner-level2 仍保留 background-repeat: no-repeat', () => {
    const content = readFile(bannerNewPath);
    expect(content).toContain('background-repeat: no-repeat');
  });
});

describe('BannerLevel2 (src-new) template 结构完整', () => {
  it('根元素仍含 class="banner-level2"', () => {
    const content = readFile(bannerNewPath);
    expect(content).toContain('class="banner-level2"');
  });

  it('仍渲染 <img class="banner-bg" />', () => {
    const content = readFile(bannerNewPath);
    expect(content).toContain('class="banner-bg"');
  });

  it('仍含 title / subtitle / illustration / backgroundImage props 声明', () => {
    const content = readFile(bannerNewPath);
    expect(content).toMatch(/backgroundImage:/);
    expect(content).toMatch(/title:/);
    expect(content).toMatch(/subtitle:/);
    expect(content).toMatch(/illustration:/);
  });
});

describe('BannerLevel2 旧版 (src) 未受波及', () => {
  it('旧版仍使用 --e-color-* (非本次字段,不应被改动)', () => {
    const content = readFile(bannerOldPath);
    expect(content).toContain('--e-color-trafficpurple6');
  });

  it('旧版不含 --o-color-primary1 (本次改动不应扩散到旧版)', () => {
    const content = readFile(bannerOldPath);
    expect(content).not.toContain('--o-color-primary1');
  });
});
