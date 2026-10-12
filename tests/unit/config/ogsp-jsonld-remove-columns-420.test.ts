import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const enJsonldPath = resolve(rootDir, '.geo/jsonld/en/ogsp/index.json');
const zhJsonldPath = resolve(rootDir, '.geo/jsonld/zh/ogsp/index.json');

const enJsonld = JSON.parse(readFileSync(enJsonldPath, 'utf-8'));
const zhJsonld = JSON.parse(readFileSync(zhJsonldPath, 'utf-8'));
const enRaw = readFileSync(enJsonldPath, 'utf-8');
const zhRaw = readFileSync(zhJsonldPath, 'utf-8');

const REMOVED_PROPERTY_NAMES = [
  'Bug Fixing and Patch Release',
  'Service Contents',
  'Service System',
  'Service Commitment',
  'Project Experience',
];

describe('oGSP en JSON-LD 420 — additionalProperty 不含已删 5 属性', () => {
  it('每项 additionalProperty 不含 Bug Fixing and Patch Release / Service Contents / Service System / Service Commitment / Project Experience', () => {
    for (const el of enJsonld.itemListElement) {
      const props = el.item.additionalProperty || [];
      const names = props.map((p: any) => p.name);
      for (const removed of REMOVED_PROPERTY_NAMES) {
        expect(names).not.toContain(removed);
      }
    }
  });

  it('每项 additionalProperty 仅含 Level（1 个属性）', () => {
    for (const el of enJsonld.itemListElement) {
      const props = el.item.additionalProperty || [];
      expect(props.length).toBe(1);
      expect(props[0].name).toBe('Level');
    }
  });

  it('en JSON-LD 原始文件不含 "Bug Fixing and Patch Release"', () => {
    expect(enRaw).not.toContain('Bug Fixing and Patch Release');
  });

  it('en JSON-LD 原始文件不含 "Service Contents"', () => {
    expect(enRaw).not.toContain('Service Contents');
  });

  it('en JSON-LD 原始文件不含 "Service System"', () => {
    expect(enRaw).not.toContain('Service System');
  });

  it('en JSON-LD 原始文件不含 "Service Commitment"', () => {
    expect(enRaw).not.toContain('Service Commitment');
  });

  it('en JSON-LD 原始文件不含 "Project Experience"', () => {
    expect(enRaw).not.toContain('Project Experience');
  });
});

describe('oGSP en JSON-LD 420 — Level 属性保留', () => {
  it('每项仍含 Level additionalProperty', () => {
    for (const el of enJsonld.itemListElement) {
      const props = el.item.additionalProperty || [];
      const levelProp = props.find((p: any) => p.name === 'Level');
      expect(levelProp).toBeDefined();
      expect(typeof levelProp.value).toBe('string');
    }
  });

  it('numberOfItems 仍为 6（删列不删行）', () => {
    expect(enJsonld.numberOfItems).toBe(6);
  });

  it('itemListElement 仍 6 项', () => {
    expect(enJsonld.itemListElement.length).toBe(6);
  });
});

describe('oGSP zh JSON-LD 420 — description 不含已删列措辞', () => {
  it('zh JSON-LD 原始文件不含 "服务能力评级"', () => {
    expect(zhRaw).not.toContain('服务能力评级');
  });

  it('zh WebPage description 不含 "服务能力评级"', () => {
    const webPage = zhJsonld['@graph'].find((item: any) =>
      item['@type'] === 'WebPage' || (Array.isArray(item['@type']) && item['@type'].includes('WebPage'))
    );
    expect(webPage).toBeDefined();
    expect(webPage.description).not.toContain('服务能力评级');
  });

  it('zh ItemList description 不含 "服务能力评级"', () => {
    const itemList = zhJsonld['@graph'].find((item: any) => item['@type'] === 'ItemList');
    expect(itemList).toBeDefined();
    expect(itemList.description).not.toContain('服务能力评级');
  });

  it('zh ItemList numberOfItems 仍为 6', () => {
    const itemList = zhJsonld['@graph'].find((item: any) => item['@type'] === 'ItemList');
    expect(itemList.numberOfItems).toBe(6);
  });
});
