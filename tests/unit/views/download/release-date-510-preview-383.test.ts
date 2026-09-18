import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const versionsYamlPath = resolve(rootDir, '.content/download/versions.yaml');
const contentBridgePath = resolve(rootDir, 'app/.vitepress/src-new/data/download/content-bridge.ts');

const VERSION_NAME = '5.1.0 (Preview)';

function loadVersions() {
  const raw = readFileSync(versionsYamlPath, 'utf-8');
  return YAML.load(raw) as any[];
}

function findEntry(data: any[]) {
  const entry = data.find((item) => item.version_name === VERSION_NAME);
  expect(entry, `${VERSION_NAME} 条目存在`).toBeDefined();
  return entry;
}

describe('versions.yaml — 5.1.0 (Preview) 发布时间修正为 2023.09', () => {
  const data = loadVersions();
  const entry = findEntry(data);

  it('release_date 为 "2023.09.30"（9 月，非 6 月）', () => {
    expect(entry.release_date).toBe('2023.09.30');
  });

  it('release_date 不再为旧值 "2023.06.30"', () => {
    expect(entry.release_date).not.toBe('2023.06.30');
  });

  it('release_date 保持 YYYY.MM.DD 格式不变', () => {
    expect(entry.release_date).toMatch(/^\d{4}\.\d{2}\.\d{2}$/);
  });

  it('planned_eol 保持 "2024.03.31" 不变（本次未改动）', () => {
    expect(entry.planned_eol).toBe('2024.03.31');
  });
});

describe('DownloadAll 展示正则 — 5.1.0 (Preview) release_date 不落入空值兜底', () => {
  const timePattern = /^\d{4}\.\d{2}(\.\d{2})?$/;
  const data = loadVersions();
  const entry = findEntry(data);
  const releaseDate = entry.release_date;

  it('timePattern 匹配 release_date', () => {
    expect(timePattern.test(releaseDate)).toBe(true);
  });

  it('slice(0,7).replace(".", "/") 展示为 "2023/09"（非 "2023/06"）', () => {
    const displayed = releaseDate.slice(0, 7).replace('.', '/');
    expect(displayed).toBe('2023/09');
    expect(displayed).not.toBe('2023/06');
  });

  it('release_date 月份片段为 "09" 而非 "06"', () => {
    expect(releaseDate.slice(5, 7)).toBe('09');
    expect(releaseDate.slice(5, 7)).not.toBe('06');
  });
});

describe('content-bridge — release_date 桥接为 releaseDate 字段', () => {
  const content = readFileSync(contentBridgePath, 'utf-8');

  it('桥接 release_date → releaseDate 字段', () => {
    expect(content).toContain('releaseDate: meta.release_date');
  });

  it('桥接 plannedEOL → plannedEOL 字段（相邻未受影响）', () => {
    expect(content).toContain('plannedEOL: meta.planned_eol');
  });
});

describe('5.1.0 (Preview) 全链路一致性 — 数据源唯一无残留旧值', () => {
  it('源文件不含旧值 "2023.06.30" 字面量', () => {
    const raw = readFileSync(versionsYamlPath, 'utf-8');
    expect(raw).not.toContain('2023.06.30');
  });
});
