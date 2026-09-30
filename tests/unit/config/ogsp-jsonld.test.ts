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

const REMOVED_COMPANIES = ['邮储银行', '邮政储蓄', '软通动力'];

describe('oGSP en JSON-LD — numberOfItems = 6', () => {
  it('en numberOfItems 为 6', () => {
    expect(enJsonld.numberOfItems).toBe(6);
  });

  it('en numberOfItems 不为 8（旧值）', () => {
    expect(enJsonld.numberOfItems).not.toBe(8);
  });
});

describe('oGSP en JSON-LD — itemListElement 共 6 项', () => {
  it('itemListElement 数组长度 = 6', () => {
    expect(Array.isArray(enJsonld.itemListElement)).toBe(true);
    expect(enJsonld.itemListElement.length).toBe(6);
  });

  it('position 1-6 连续无缺', () => {
    const positions = enJsonld.itemListElement.map((el: any) => el.position);
    expect(positions.sort((a: number, b: number) => a - b)).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it('itemListElement 每项为 ListItem 类型', () => {
    for (const el of enJsonld.itemListElement) {
      expect(el['@type']).toBe('ListItem');
      expect(el.item).toBeDefined();
      expect(el.item['@type']).toBe('Organization');
    }
  });
});

describe('oGSP en JSON-LD — 邮储 / 软通动力 不出现', () => {
  it('en JSON-LD 文件不含邮储 / 软通动力 字面量', () => {
    const raw = readFileSync(enJsonldPath, 'utf-8');
    for (const term of REMOVED_COMPANIES) {
      expect(raw).not.toContain(term);
    }
  });

  it('en JSON-LD 名称数组不含邮储 / 软通动力', () => {
    const names = enJsonld.itemListElement.map((el: any) => el.item.name);
    for (const term of REMOVED_COMPANIES) {
      for (const name of names) {
        expect(name).not.toContain(term);
      }
    }
  });
});

describe('oGSP en JSON-LD — 每项含 Level additionalProperty', () => {
  it('每项 additionalProperty 含 name="Level" 的 PropertyValue', () => {
    for (const el of enJsonld.itemListElement) {
      const props = el.item.additionalProperty || [];
      const levelProp = props.find((p: any) => p.name === 'Level');
      expect(levelProp).toBeDefined();
      expect(typeof levelProp.value).toBe('string');
      expect(levelProp.value.length).toBeGreaterThan(0);
    }
  });

  it('5 项 Level = "Premium"', () => {
    const premium = enJsonld.itemListElement.filter((el: any) => {
      const props = el.item.additionalProperty || [];
      const levelProp = props.find((p: any) => p.name === 'Level');
      return levelProp && levelProp.value === 'Premium';
    });
    expect(premium.length).toBe(5);
  });

  it('1 项 Level = "Certified"', () => {
    const certified = enJsonld.itemListElement.filter((el: any) => {
      const props = el.item.additionalProperty || [];
      const levelProp = props.find((p: any) => p.name === 'Level');
      return levelProp && levelProp.value === 'Certified';
    });
    expect(certified.length).toBe(1);
  });

  it('中软国际科技服务有限公司 Level = "Certified"', () => {
    const entry = enJsonld.itemListElement.find(
      (el: any) => el.item.name === '中软国际科技服务有限公司'
    );
    expect(entry).toBeDefined();
    const levelProp = entry.item.additionalProperty.find((p: any) => p.name === 'Level');
    expect(levelProp.value).toBe('Certified');
  });
});

describe('oGSP en JSON-LD — 与 YAML 数据一致性', () => {
  it('itemListElement 名称与 en.yaml certifications 名称一致', () => {
    const jsonldNames = enJsonld.itemListElement.map((el: any) => el.item.name).sort();
    const yamlNames = [
      '北京海量数据技术股份有限公司',
      '天津神舟通用数据技术有限公司',
      '云和恩墨（北京）信息技术有限公司',
      '天津南大通用数据技术股份有限公司',
      '中软国际科技服务有限公司',
      '中移动信息技术有限公司',
    ].sort();
    expect(jsonldNames).toEqual(yamlNames);
  });

  it('identifier 与 YAML version 一致', () => {
    const expected = {
      '北京海量数据技术股份有限公司': '20260310001',
      '天津神舟通用数据技术有限公司': '20260326001',
      '云和恩墨（北京）信息技术有限公司': '20260326002',
      '天津南大通用数据技术股份有限公司': '20260409001',
      '中软国际科技服务有限公司': '20260612001',
      '中移动信息技术有限公司': '20260612002',
    };
    for (const el of enJsonld.itemListElement) {
      expect(el.item.identifier).toBe(expected[el.item.name]);
    }
  });

  it('award / expires 与 YAML award / expiration 一致', () => {
    const expected = {
      '北京海量数据技术股份有限公司': { award: '2026-03-10', expires: '2027-03-09' },
      '天津神舟通用数据技术有限公司': { award: '2026-03-26', expires: '2027-03-25' },
      '云和恩墨（北京）信息技术有限公司': { award: '2026-03-26', expires: '2027-03-25' },
      '天津南大通用数据技术股份有限公司': { award: '2026-04-09', expires: '2027-04-08' },
      '中软国际科技服务有限公司': { award: '2026-06-12', expires: '2027-06-11' },
      '中移动信息技术有限公司': { award: '2026-06-12', expires: '2027-06-11' },
    };
    for (const el of enJsonld.itemListElement) {
      expect(el.item.award).toBe(expected[el.item.name].award);
      expect(el.item.expires).toBe(expected[el.item.name].expires);
    }
  });
});

describe('oGSP zh JSON-LD — stub numberOfItems = 6', () => {
  it('zh jsonld 为 @graph 结构', () => {
    expect(Array.isArray(zhJsonld['@graph'])).toBe(true);
  });

  it('zh jsonld @graph 含 ItemList', () => {
    const itemList = zhJsonld['@graph'].find((item: any) => item['@type'] === 'ItemList');
    expect(itemList).toBeDefined();
  });

  it('zh ItemList numberOfItems = 6', () => {
    const itemList = zhJsonld['@graph'].find((item: any) => item['@type'] === 'ItemList');
    expect(itemList.numberOfItems).toBe(6);
  });

  it('zh ItemList numberOfItems 不为 20（旧值）', () => {
    const itemList = zhJsonld['@graph'].find((item: any) => item['@type'] === 'ItemList');
    expect(itemList.numberOfItems).not.toBe(20);
  });

  it('zh ItemList 不含 itemListElement（stub，与 en 并行 SEO 分工）', () => {
    const itemList = zhJsonld['@graph'].find((item: any) => item['@type'] === 'ItemList');
    expect(itemList.itemListElement).toBeUndefined();
  });

  it('zh jsonld 不含邮储 / 软通动力 字面量', () => {
    const raw = readFileSync(zhJsonldPath, 'utf-8');
    for (const term of REMOVED_COMPANIES) {
      expect(raw).not.toContain(term);
    }
  });
});
