import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const yamlPath = resolve(rootDir, '.content/home/banner.yaml');
const yamlContent = readFileSync(yamlPath, 'utf-8');
const entries = yaml.load(yamlContent) as any[];

const NEW_ENTRY_TITLE_ZH = '《openGauss社区生成式AI工具使用与开源贡献策略》正式发布';
const NEW_ENTRY_TITLE_EN = 'openGauss Community Generative AI Tool Usage and Open Source Contribution Strategy Released';

function foldBanner(raw: any, langCode: string) {
  const s = (field: string) => raw[`${field}_${langCode}`] ?? raw[field];
  const banners: Record<string, string> = { laptop: raw.bg_pc };
  if (raw.bg_pad) banners.pad_v = raw.bg_pad;
  if (raw.bg_mb) banners.phone = raw.bg_mb;
  const bannersDark: Record<string, string> | undefined =
    raw.bg_pc_dark || raw.bg_mb_dark
      ? { laptop: raw.bg_pc_dark, ...(raw.bg_mb_dark ? { phone: raw.bg_mb_dark } : {}) }
      : undefined;
  return {
    banners: new Proxy(banners, { get: (t, p: string) => t[p] ?? t.laptop }),
    bannersDark: bannersDark
      ? new Proxy(bannersDark, { get: (t, p: string) => t[p] ?? t.laptop })
      : undefined,
    isLightBg: raw.bg_theme === 'light',
    title: s('title') ?? '',
    titleMb: raw[`title_mb_${langCode}`] ?? [],
    subtitle: s('subtitle') ?? '',
    desc: s('desc') ?? [],
    btn: s('btn') ?? '',
    link: s('href') ?? '',
    target: raw.is_blank ? '_blank' : '_self',
    textImg: raw[`text_image_${langCode}`] ?? '',
    textImgMb: raw[`text_image_mb_${langCode}`] ?? '',
    className: raw.class_name ?? '',
    rightInset: raw.attach ?? '',
    rightLink: raw.attach_href ?? '',
  };
}

const newEntry = entries.find((e: any) => e.title_zh === NEW_ENTRY_TITLE_ZH);

describe('banner.yaml — new AI coding entry schema validation', () => {
  it('new entry exists in banner.yaml', () => {
    expect(newEntry).toBeDefined();
  });

  it('new entry is the first entry in the list', () => {
    expect(entries[0].title_zh).toBe(NEW_ENTRY_TITLE_ZH);
  });

  it('locale includes both zh and en', () => {
    expect(newEntry.locale).toBe('zh,en');
  });

  it('bg_pc points to ./images/banner/banner-ai-coding.png', () => {
    expect(newEntry.bg_pc).toBe('./images/banner/banner-ai-coding.png');
  });

  it('bg_pad points to ./images/banner/banner-ai-coding_pad.png', () => {
    expect(newEntry.bg_pad).toBe('./images/banner/banner-ai-coding_pad.png');
  });

  it('bg_mb points to ./images/banner/banner-ai-coding_mo.png', () => {
    expect(newEntry.bg_mb).toBe('./images/banner/banner-ai-coding_mo.png');
  });

  it('bg_theme is light', () => {
    expect(newEntry.bg_theme).toBe('light');
  });

  it('title_zh is correct', () => {
    expect(newEntry.title_zh).toBe(NEW_ENTRY_TITLE_ZH);
  });

  it('title_en is correct', () => {
    expect(newEntry.title_en).toBe(NEW_ENTRY_TITLE_EN);
  });

  it('href_zh points to /zh/ai-coding-assistants/', () => {
    expect(newEntry.href_zh).toBe('/zh/ai-coding-assistants/');
  });

  it('href_en points to /en/ai-coding-assistants/', () => {
    expect(newEntry.href_en).toBe('/en/ai-coding-assistants/');
  });

  it('is_blank is false (same-window navigation)', () => {
    expect(newEntry.is_blank).toBe(false);
  });
});

describe('banner.yaml — new entry image files exist', () => {
  const imgDir = resolve(rootDir, '.content/home/images/banner');

  it('banner-ai-coding.png exists and is non-empty', () => {
    const p = resolve(imgDir, 'banner-ai-coding.png');
    expect(existsSync(p)).toBe(true);
    expect(readFileSync(p).length).toBeGreaterThan(0);
  });

  it('banner-ai-coding_pad.png exists and is non-empty', () => {
    const p = resolve(imgDir, 'banner-ai-coding_pad.png');
    expect(existsSync(p)).toBe(true);
    expect(readFileSync(p).length).toBeGreaterThan(0);
  });

  it('banner-ai-coding_mo.png exists and is non-empty', () => {
    const p = resolve(imgDir, 'banner-ai-coding_mo.png');
    expect(existsSync(p)).toBe(true);
    expect(readFileSync(p).length).toBeGreaterThan(0);
  });
});

describe('banner.yaml — target pages exist', () => {
  it('zh ai-coding-assistants page exists', () => {
    expect(existsSync(resolve(rootDir, 'app/zh/ai-coding-assistants/index.md'))).toBe(true);
  });

  it('en ai-coding-assistants page exists', () => {
    expect(existsSync(resolve(rootDir, 'app/en/ai-coding-assistants/index.md'))).toBe(true);
  });
});

describe('foldBanner — new entry zh locale processing', () => {
  const folded = foldBanner(newEntry, 'zh');

  it('title resolves to title_zh', () => {
    expect(folded.title).toBe(NEW_ENTRY_TITLE_ZH);
  });

  it('link resolves to href_zh', () => {
    expect(folded.link).toBe('/zh/ai-coding-assistants/');
  });

  it('target is _self (is_blank is false)', () => {
    expect(folded.target).toBe('_self');
  });

  it('isLightBg is true (bg_theme is light)', () => {
    expect(folded.isLightBg).toBe(true);
  });

  it('banners.laptop is bg_pc', () => {
    expect(folded.banners.laptop).toBe('./images/banner/banner-ai-coding.png');
  });

  it('banners.pad_v is bg_pad', () => {
    expect(folded.banners.pad_v).toBe('./images/banner/banner-ai-coding_pad.png');
  });

  it('banners.phone is bg_mb', () => {
    expect(folded.banners.phone).toBe('./images/banner/banner-ai-coding_mo.png');
  });

  it('bannersDark is undefined (no dark images)', () => {
    expect(folded.bannersDark).toBeUndefined();
  });

  it('subtitle is empty string (no subtitle_zh)', () => {
    expect(folded.subtitle).toBe('');
  });

  it('desc is empty array (no desc_zh)', () => {
    expect(folded.desc).toEqual([]);
  });

  it('btn is empty string (no btn_zh)', () => {
    expect(folded.btn).toBe('');
  });

  it('titleMb is empty array (no title_mb_zh)', () => {
    expect(folded.titleMb).toEqual([]);
  });

  it('className is empty string (no class_name)', () => {
    expect(folded.className).toBe('');
  });

  it('textImg is empty string (no text_image_zh)', () => {
    expect(folded.textImg).toBe('');
  });

  it('rightInset is empty string (no attach)', () => {
    expect(folded.rightInset).toBe('');
  });
});

describe('foldBanner — new entry en locale processing', () => {
  const folded = foldBanner(newEntry, 'en');

  it('title resolves to title_en', () => {
    expect(folded.title).toBe(NEW_ENTRY_TITLE_EN);
  });

  it('link resolves to href_en', () => {
    expect(folded.link).toBe('/en/ai-coding-assistants/');
  });

  it('target is _self (is_blank is false)', () => {
    expect(folded.target).toBe('_self');
  });

  it('banners.laptop is bg_pc (shared across locales)', () => {
    expect(folded.banners.laptop).toBe('./images/banner/banner-ai-coding.png');
  });

  it('banners.phone is bg_mb (shared across locales)', () => {
    expect(folded.banners.phone).toBe('./images/banner/banner-ai-coding_mo.png');
  });
});

describe('foldBanner — banners Proxy fallback', () => {
  const entryNoPad = { ...newEntry, bg_pad: undefined };
  const folded = foldBanner(entryNoPad, 'zh');

  it('pad_v falls back to laptop when bg_pad is missing', () => {
    expect(folded.banners.pad_v).toBe(folded.banners.laptop);
  });

  it('phone remains bg_mb when bg_pad is missing', () => {
    expect(folded.banners.phone).toBe('./images/banner/banner-ai-coding_mo.png');
  });
});

describe('banner.yaml — locale filtering verification', () => {
  it('new entry is visible for zh locale', () => {
    const filtered = entries.filter((item: any) => {
      if (!item.locale) return true;
      return item.locale.split(',').map((s: string) => s.trim()).includes('zh');
    });
    expect(filtered.some((e: any) => e.title_zh === NEW_ENTRY_TITLE_ZH)).toBe(true);
  });

  it('new entry is visible for en locale', () => {
    const filtered = entries.filter((item: any) => {
      if (!item.locale) return true;
      return item.locale.split(',').map((s: string) => s.trim()).includes('en');
    });
    expect(filtered.some((e: any) => e.title_en === NEW_ENTRY_TITLE_EN)).toBe(true);
  });

  it('zh-only banners are not visible for en locale', () => {
    const filtered = entries.filter((item: any) => {
      if (!item.locale) return true;
      return item.locale.split(',').map((s: string) => s.trim()).includes('en');
    });
    const zhOnlyEntries = filtered.filter((e: any) => e.locale === 'zh');
    expect(zhOnlyEntries.length).toBe(0);
  });
});

describe('banner.yaml — data integrity', () => {
  it('total entry count is 10', () => {
    expect(entries.length).toBe(10);
  });

  it('all entries have bg_pc', () => {
    for (const entry of entries) {
      expect(entry.bg_pc).toBeTruthy();
    }
  });

  it('all entries have bg_mb', () => {
    for (const entry of entries) {
      expect(entry.bg_mb).toBeTruthy();
    }
  });

  it('all entries have at least one locale', () => {
    for (const entry of entries) {
      expect(entry.locale).toBeTruthy();
    }
  });

  it('all referenced banner images exist', () => {
    const imgDir = resolve(rootDir, '.content/home/images/banner');
    for (const entry of entries) {
      if (entry.bg_pc) {
        const imgName = entry.bg_pc.replace('./images/banner/', '');
        expect(existsSync(resolve(imgDir, imgName))).toBe(true);
      }
    }
  });
});
