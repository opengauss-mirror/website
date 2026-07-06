import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import yaml from 'js-yaml';
import matter from 'gray-matter';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const yamlPath = resolve(rootDir, '.content/activity/list.yaml');
const yamlContent = readFileSync(yamlPath, 'utf-8');
const entries = yaml.load(yamlContent) as any[];

const meetupMdPath = resolve(rootDir, 'app/zh/events/2026-07-10/meetup.md');
const meetupMdContent = readFileSync(meetupMdPath, 'utf-8');
const meetupParsed = matter(meetupMdContent);

const qrcodePath = resolve(rootDir, 'app/zh/events/2026-07-10/qrcode.png');
const agendaPath = resolve(rootDir, 'app/zh/events/2026-07-10/agenda.png');

const VALID_SERIES = ['meetup', 'conference', 'activity'];
const VALID_FORMATS = ['offline', 'online', 'hybrid'];
const VALID_STATUSES = ['ended', 'ongoing'];

describe('list.yaml id:64 entry schema validation', () => {
  const entry64 = entries.find((e) => e.id === 64);

  it('id:64 entry exists', () => {
    expect(entry64).toBeDefined();
  });

  it('id is unique (no duplicate id:64)', () => {
    const count = entries.filter((e) => e.id === 64).length;
    expect(count).toBe(1);
  });

  it('title_zh is present and non-empty', () => {
    expect(entry64.title_zh).toBeTruthy();
    expect(typeof entry64.title_zh).toBe('string');
  });

  it('title_zh contains "欢迎报名" suffix (ongoing convention)', () => {
    expect(entry64.title_zh).toContain('欢迎报名');
  });

  it('title_zh contains date "7月10日"', () => {
    expect(entry64.title_zh).toContain('7月10日');
  });

  it('display_date_zh is present and matches YYYY/MM/DD format', () => {
    expect(entry64.display_date_zh).toMatch(/^\d{4}\/\d{2}\/\d{2}$/);
    expect(entry64.display_date_zh).toBe('2026/07/10');
  });

  it('start_date is present and matches YYYY-MM-DD format', () => {
    expect(entry64.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(entry64.start_date).toBe('2026-07-10');
  });

  it('series is a valid value', () => {
    expect(VALID_SERIES).toContain(entry64.series);
  });

  it('series is meetup', () => {
    expect(entry64.series).toBe('meetup');
  });

  it('format is a valid value', () => {
    expect(VALID_FORMATS).toContain(entry64.format);
  });

  it('format is offline', () => {
    expect(entry64.format).toBe('offline');
  });

  it('city_zh is 广州', () => {
    expect(entry64.city_zh).toBe('广州');
  });

  it('review_url points to /zh/events/2026-07-10/meetup.html', () => {
    expect(entry64.review_url).toBe('/zh/events/2026-07-10/meetup.html');
  });

  it('synopsis_zh is present and non-empty', () => {
    expect(entry64.synopsis_zh).toBeTruthy();
    expect(typeof entry64.synopsis_zh).toBe('string');
  });

  it('synopsis_zh mentions openGauss community', () => {
    expect(entry64.synopsis_zh).toContain('openGauss');
  });

  it('status is ongoing', () => {
    expect(entry64.status).toBe('ongoing');
  });

  it('no poster_image field (per design decision)', () => {
    expect(entry64.poster_image).toBeUndefined();
  });

  it('no poster_image_mb field (per design decision)', () => {
    expect(entry64.poster_image_mb).toBeUndefined();
  });

  it('no _en fields (consistent with all existing entries)', () => {
    expect(entry64.title_en).toBeUndefined();
    expect(entry64.city_en).toBeUndefined();
    expect(entry64.synopsis_en).toBeUndefined();
  });
});

describe('list.yaml overall data integrity', () => {
  it('all ids are unique', () => {
    const ids = entries.map((e) => e.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('id:64 is the maximum id', () => {
    const maxId = Math.max(...entries.map((e) => e.id));
    expect(maxId).toBe(64);
  });

  it('total entry count is 64', () => {
    expect(entries.length).toBe(64);
  });

  it('all entries have required fields (id, title_zh, display_date_zh, start_date, series, format, status)', () => {
    for (const entry of entries) {
      expect(entry.id).toBeDefined();
      expect(entry.title_zh).toBeTruthy();
      expect(entry.display_date_zh).toBeTruthy();
      expect(entry.start_date).toBeTruthy();
      expect(entry.series).toBeTruthy();
      expect(entry.format).toBeTruthy();
      expect(entry.status).toBeTruthy();
    }
  });

  it('all start_dates match YYYY-MM-DD format', () => {
    for (const entry of entries) {
      expect(entry.start_date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it('all series values are valid', () => {
    for (const entry of entries) {
      expect(VALID_SERIES).toContain(entry.series);
    }
  });

  it('all format values are valid', () => {
    for (const entry of entries) {
      expect(VALID_FORMATS).toContain(entry.format);
    }
  });

  it('all status values are valid', () => {
    for (const entry of entries) {
      expect(VALID_STATUSES).toContain(entry.status);
    }
  });
});

describe('meetup.md frontmatter validation', () => {
  const fm = meetupParsed.data;

  it('title matches YAML title_zh', () => {
    expect(fm.title).toBe('【7月10日】openGauss x 大湾区国创中心 Workshop 广州站，欢迎报名！');
  });

  it('time field format is YYYY/MM/DD (consistent with existing entries)', () => {
    expect(fm.time).toBe('2026/07/10');
  });

  it('date field format is YYYY-MM-DD', () => {
    expect(fm.date).toBe('2026-07-10');
  });

  it('tags is 会议', () => {
    expect(fm.tags).toBe('会议');
  });

  it('label is 线下 (matching offline format)', () => {
    expect(fm.label).toBe('线下');
  });

  it('category is events', () => {
    expect(fm.category).toBe('events');
  });

  it('location is 广州', () => {
    expect(fm.location).toBe('广州');
  });

  it('link points to correct detail page', () => {
    expect(fm.link).toBe('/zh/events/2026-07-10/meetup.html');
  });

  it('author is openGauss', () => {
    expect(fm.author).toBe('openGauss');
  });

  it('summary is present and non-empty', () => {
    expect(fm.summary).toBeTruthy();
  });

  it('summary mentions 广州 location', () => {
    expect(fm.summary).toContain('广州');
  });

  it('no img/img_mobile fields (per design decision — no banner)', () => {
    expect(fm.img).toBeUndefined();
    expect(fm.img_mobile).toBeUndefined();
  });
});

describe('meetup.md body content validation', () => {
  const body = meetupParsed.content;

  it('body contains specific time 14:30-17:20', () => {
    expect(body).toContain('14:30-17:20');
  });

  it('body contains full address', () => {
    expect(body).toContain('广东省广州市黄埔区开创大道2399号至泰广场A5栋905培训室');
  });

  it('body references qrcode.png via relative path', () => {
    expect(body).toContain('./qrcode.png');
  });

  it('body references agenda.png via relative path', () => {
    expect(body).toContain('./agenda.png');
  });

  it('body mentions openGauss community', () => {
    expect(body).toContain('openGauss');
  });
});

describe('event image files existence', () => {
  it('qrcode.png exists', () => {
    expect(existsSync(qrcodePath)).toBe(true);
  });

  it('agenda.png exists', () => {
    expect(existsSync(agendaPath)).toBe(true);
  });

  it('qrcode.png is a non-empty file', () => {
    const stat = readFileSync(qrcodePath);
    expect(stat.length).toBeGreaterThan(0);
  });

  it('agenda.png is a non-empty file', () => {
    const stat = readFileSync(agendaPath);
    expect(stat.length).toBeGreaterThan(0);
  });
});
