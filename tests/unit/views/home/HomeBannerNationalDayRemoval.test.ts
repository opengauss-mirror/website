import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const yamlPath = resolve(rootDir, '.content/home/banner.yaml');
const yamlContent = readFileSync(yamlPath, 'utf-8');
const entries = yaml.load(yamlContent) as any[];

// 国庆节 banner（commit 7362c33 新增，已于本次 issue 移除）使用 text_image_zh 内联文字图，
// 无 title/btn/href，仅以图片路径 ./images/banner/20261001/ 标识。
const NATIONAL_DAY_MARKER = '20261001';
const nationalDayEntry = entries.find((e: any) =>
  [e.bg_pc, e.bg_pad, e.bg_pad_v, e.bg_mb, e.text_image_zh, e.text_image_pad_zh, e.text_image_mb_zh]
    .filter(Boolean)
    .some((v: string) => v.includes(NATIONAL_DAY_MARKER))
);

describe('banner.yaml — 国庆节 banner 已移除', () => {
  it('列表中不存在引用 20261001 路径的条目', () => {
    expect(nationalDayEntry).toBeUndefined();
  });

  it('没有任何字段的值包含 20261001 标识', () => {
    const offenders = entries
      .flatMap((e: any, i: number) =>
        Object.entries(e)
          .filter(([, v]) => typeof v === 'string' && v.includes(NATIONAL_DAY_MARKER))
          .map(([k, v]) => `entries[${i}].${k}=${v}`)
      );
    expect(offenders).toEqual([]);
  });

  it('bg_pc 字段无 20261001 引用', () => {
    const users = entries.filter((e: any) => typeof e.bg_pc === 'string' && e.bg_pc.includes(NATIONAL_DAY_MARKER));
    expect(users.length).toBe(0);
  });

  it('bg_mb 字段无 20261001 引用', () => {
    const users = entries.filter((e: any) => typeof e.bg_mb === 'string' && e.bg_mb.includes(NATIONAL_DAY_MARKER));
    expect(users.length).toBe(0);
  });

  it('text_image_zh 字段无 20261001 引用', () => {
    const users = entries.filter(
      (e: any) => typeof e.text_image_zh === 'string' && e.text_image_zh.includes(NATIONAL_DAY_MARKER)
    );
    expect(users.length).toBe(0);
  });
});

describe('banner.yaml — 20261001 图片目录已删除', () => {
  const dir = resolve(rootDir, '.content/home/images/banner/20261001');

  it('20261001 目录不存在', () => {
    expect(existsSync(dir)).toBe(false);
  });

  it('banner 子目录中无 20261001 目录残留', () => {
    const bannerDir = resolve(rootDir, '.content/home/images/banner');
    const subdirs = readdirSync(bannerDir, { withFileTypes: true })
      .filter((d) => d.isDirectory())
      .map((d) => d.name);
    expect(subdirs).not.toContain(NATIONAL_DAY_MARKER);
  });
});

describe('banner.yaml — 移除国庆 banner 后其余条目完整', () => {
  it('banner 列表仍非空', () => {
    expect(entries.length).toBeGreaterThan(0);
  });

  it('7.0.0-LTS 版本 banner 仍在列表首位', () => {
    expect(entries[0].title_zh).toBe('openGauss 7.0.0-LTS 版本正式发布');
  });

  it('AI coding banner 仍在列表中', () => {
    const aiCoding = entries.find(
      (e: any) => e.title_zh === '《openGauss社区生成式AI工具使用与开源贡献策略》正式发布'
    );
    expect(aiCoding).toBeDefined();
  });

  it('6.0.6 版本 banner 仍在列表中', () => {
    const v606 = entries.find((e: any) => e.title_zh === 'openGauss 6.0.6 版本正式发布');
    expect(v606).toBeDefined();
  });

  it('SIG 中心 banner 仍在列表中', () => {
    const sig = entries.find((e: any) => e.title_zh === 'SIG中心');
    expect(sig).toBeDefined();
  });
});
