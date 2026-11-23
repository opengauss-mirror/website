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

const VERSION_TITLE_ZH = 'openGauss 6.0.6 版本正式发布';
const VERSION_TITLE_EN = 'openGauss Officially Releases Version 6.0.6';

const RC3_TITLE_ZH = 'openGauss 7.0.0-RC3 版本正式发布';
const OLD_605_TITLE_ZH = 'openGauss 6.0.5 版本正式发布';

function foldBanner(raw: any, langCode: string) {
  const s = (field: string) => raw[`${field}_${langCode}`] ?? raw[field];
  const bgProxy = (map: Record<string, string>) => new Proxy(map, { get: (t, p) => (p in t ? Reflect.get(t, p) : t.default) });
  return {
    bg: raw.bg ? bgProxy(raw.bg) : null,
    bgDark: raw.bg_dark ? bgProxy(raw.bg_dark) : null,
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

const versionEntry = entries.find((e: any) => e.title_zh === VERSION_TITLE_ZH);

describe('banner.yaml — 6.0.6 version entry schema validation', () => {
  it('6.0.6 entry exists in banner.yaml', () => {
    expect(versionEntry).toBeDefined();
  });

  it('locale includes both zh and en (merged bilingual entry)', () => {
    expect(versionEntry.locale).toBe('zh,en');
  });

  it('bg.default points to ./images/banner/banner-605.png (image inherited)', () => {
    expect(versionEntry.bg.default).toBe('./images/banner/banner-605.png');
  });

  it('bg.pad_v and bg.phone point to ./images/banner/banner-605_mo.png (image inherited)', () => {
    expect(versionEntry.bg.pad_v).toBe('./images/banner/banner-605_mo.png');
    expect(versionEntry.bg.phone).toBe('./images/banner/banner-605_mo.png');
  });

  it('bg_theme is light (black text on light background)', () => {
    expect(versionEntry.bg_theme).toBe('light');
  });

  it('title_zh is correct', () => {
    expect(versionEntry.title_zh).toBe(VERSION_TITLE_ZH);
  });

  it('title_en is correct', () => {
    expect(versionEntry.title_en).toBe(VERSION_TITLE_EN);
  });

  it('btn_zh is 立即查看', () => {
    expect(versionEntry.btn_zh).toBe('立即查看');
  });

  it('btn_en is Learn More', () => {
    expect(versionEntry.btn_en).toBe('Learn More');
  });

  it('href_zh points to /zh/download/?version=lts', () => {
    expect(versionEntry.href_zh).toBe('/zh/download/?version=lts');
  });

  it('href_en points to /en/download/?version=lts', () => {
    expect(versionEntry.href_en).toBe('/en/download/?version=lts');
  });

  it('is_blank is true (new-tab navigation, consistent with prior download entry)', () => {
    expect(versionEntry.is_blank).toBe(true);
  });

  it('class_name is banner-version', () => {
    expect(versionEntry.class_name).toBe('banner-version');
  });
});

describe('banner.yaml — deprecated entries removed', () => {
  it('7.0.0-RC3 entry is removed', () => {
    const rc3 = entries.find((e: any) => e.title_zh === RC3_TITLE_ZH);
    expect(rc3).toBeUndefined();
  });

  it('old 6.0.5 dark-theme / news-link entry is removed', () => {
    const old605 = entries.find((e: any) => e.title_zh === OLD_605_TITLE_ZH);
    expect(old605).toBeUndefined();
  });

  it('no entry references the RC3 banner image anymore', () => {
    const bgValues = (e: any) => [e.bg, e.bg_dark].filter(Boolean).flatMap((m: any) => Object.values(m));
    const rc3ImgUsers = entries.filter(
      (e: any) => bgValues(e).includes('./images/banner/banner700_RC3.png') || bgValues(e).includes('./images/banner/banner700_RC3_mo.png')
    );
    expect(rc3ImgUsers.length).toBe(0);
  });

  it('no entry links to the old 6.0.5 news article anymore', () => {
    const oldNewsLinkUsers = entries.filter(
      (e: any) => e.href_zh === 'https://opengauss.org/zh/news/2026-05-15-605/'
    );
    expect(oldNewsLinkUsers.length).toBe(0);
  });
});

describe('banner.yaml — 6.0.6 entry image files exist', () => {
  const imgDir = resolve(rootDir, '.content/home/images/banner');

  it('banner-605.png exists and is non-empty', () => {
    const p = resolve(imgDir, 'banner-605.png');
    expect(existsSync(p)).toBe(true);
    expect(readFileSync(p).length).toBeGreaterThan(0);
  });

  it('banner-605_mo.png exists and is non-empty', () => {
    const p = resolve(imgDir, 'banner-605_mo.png');
    expect(existsSync(p)).toBe(true);
    expect(readFileSync(p).length).toBeGreaterThan(0);
  });
});

describe('banner.yaml — 6.0.6 target pages exist', () => {
  it('zh download page exists', () => {
    expect(existsSync(resolve(rootDir, 'app/zh/download/index.md'))).toBe(true);
  });

  it('en download page exists', () => {
    expect(existsSync(resolve(rootDir, 'app/en/download/index.md'))).toBe(true);
  });
});

describe('foldBanner — 6.0.6 entry zh locale processing', () => {
  const folded = foldBanner(versionEntry, 'zh');

  it('title resolves to title_zh', () => {
    expect(folded.title).toBe(VERSION_TITLE_ZH);
  });

  it('btn resolves to btn_zh (立即查看)', () => {
    expect(folded.btn).toBe('立即查看');
  });

  it('link resolves to href_zh (download lts)', () => {
    expect(folded.link).toBe('/zh/download/?version=lts');
  });

  it('target is _blank (is_blank is true)', () => {
    expect(folded.target).toBe('_blank');
  });

  it('isLightBg is true (bg_theme is light → dark text on light bg)', () => {
    expect(folded.isLightBg).toBe(true);
  });

  it('bg.laptop falls back to default (banner-605.png)', () => {
    expect(folded.bg?.laptop).toBe('./images/banner/banner-605.png');
  });

  it('bg.pad_v is the mobile image (bg_mb mapped to pad_v)', () => {
    expect(folded.bg?.pad_v).toBe('./images/banner/banner-605_mo.png');
  });

  it('bg.phone is the mobile image (bg_mb mapped to phone)', () => {
    expect(folded.bg?.phone).toBe('./images/banner/banner-605_mo.png');
  });

  it('bg.pad_h falls back to default (no pad_h defined)', () => {
    expect(folded.bg?.pad_h).toBe(folded.bg?.default);
  });

  it('bgDark is null (no dark images)', () => {
    expect(folded.bgDark).toBeNull();
  });

  it('subtitle is empty string (no subtitle_zh)', () => {
    expect(folded.subtitle).toBe('');
  });

  it('desc is empty array (no desc_zh)', () => {
    expect(folded.desc).toEqual([]);
  });

  it('className is banner-version', () => {
    expect(folded.className).toBe('banner-version');
  });
});

describe('foldBanner — 6.0.6 entry en locale processing', () => {
  const folded = foldBanner(versionEntry, 'en');

  it('title resolves to title_en', () => {
    expect(folded.title).toBe(VERSION_TITLE_EN);
  });

  it('btn resolves to btn_en (Learn More)', () => {
    expect(folded.btn).toBe('Learn More');
  });

  it('link resolves to href_en (download lts)', () => {
    expect(folded.link).toBe('/en/download/?version=lts');
  });

  it('target is _blank (is_blank is true)', () => {
    expect(folded.target).toBe('_blank');
  });

  it('isLightBg is true (shared bg_theme)', () => {
    expect(folded.isLightBg).toBe(true);
  });

  it('bg.laptop falls back to default (shared across locales)', () => {
    expect(folded.bg?.laptop).toBe('./images/banner/banner-605.png');
  });

  it('bg.phone is the mobile image (shared across locales)', () => {
    expect(folded.bg?.phone).toBe('./images/banner/banner-605_mo.png');
  });
});

describe('banner.yaml — 6.0.6 locale filtering verification', () => {
  const filterByLang = (lang: string) =>
    entries.filter((item: any) => {
      if (!item.locale) return true;
      return item.locale.split(',').map((s: string) => s.trim()).includes(lang);
    });

  it('6.0.6 entry is visible for zh locale', () => {
    expect(filterByLang('zh').some((e: any) => e.title_zh === VERSION_TITLE_ZH)).toBe(true);
  });

  it('6.0.6 entry is visible for en locale (newly added to en rotation)', () => {
    expect(filterByLang('en').some((e: any) => e.title_en === VERSION_TITLE_EN)).toBe(true);
  });

  it('RC3 entry is not visible for zh locale', () => {
    expect(filterByLang('zh').some((e: any) => e.title_zh === RC3_TITLE_ZH)).toBe(false);
  });

  it('RC3 entry is not visible for en locale', () => {
    expect(filterByLang('en').some((e: any) => e.title_zh === RC3_TITLE_ZH)).toBe(false);
  });
});
