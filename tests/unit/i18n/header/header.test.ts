import { expect, describe, it } from 'vitest';

import headerZh from '../../../../app/.vitepress/src-new/i18n/header/header-zh';

function findSection(navRouter: any[], sectionId: string) {
  return navRouter.find((item: any) => item.ID === sectionId);
}

function findChildGroup(children: any[], groupName: string) {
  return children.find((item: any) => item.NAME === groupName);
}

function findSubItem(childGroup: any, subItemName: string) {
  return childGroup.CHILDREN.find((item: any) => item.NAME === subItemName);
}

describe('header-zh i18n data', () => {
  const zhSupport = findSection(headerZh.NAV_ROUTER, 'approve');

  it('"支持" 段包含 "专区" 子段', () => {
    expect(zhSupport).toBeDefined();
    expect(zhSupport.CHILDREN).toBeDefined();
    const zonesGroup = findChildGroup(zhSupport.CHILDREN, '专区');
    expect(zonesGroup).toBeDefined();
    expect(zonesGroup.CHILDREN).toBeDefined();
    expect(zonesGroup.CHILDREN.length).toBeGreaterThanOrEqual(2);
  });

  it('"oGMemory 专区" 条目拥有 TAG 字段且值为 "NEW"', () => {
    const zonesGroup = findChildGroup(zhSupport.CHILDREN, '专区');
    const ogMemoryItem = findSubItem(zonesGroup, 'oGMemory 专区');
    expect(ogMemoryItem).toBeDefined();
    expect(ogMemoryItem.TAG).toBe('NEW');
  });

  it('"RAG专区" 条目无 TAG 或 TAG 为 null/undefined', () => {
    const zonesGroup = findChildGroup(zhSupport.CHILDREN, '专区');
    const ragItem = findSubItem(zonesGroup, 'RAG专区');
    expect(ragItem).toBeDefined();
    expect(ragItem.TAG == null).toBe(true);
  });

  it('"oGMemory 专区" 条目 URL 为 /ogmemory/', () => {
    const zonesGroup = findChildGroup(zhSupport.CHILDREN, '专区');
    const ogMemoryItem = findSubItem(zonesGroup, 'oGMemory 专区');
    expect(ogMemoryItem.URL).toBe('/ogmemory/');
  });

  it('"专区" 内仅 oGMemory 条目有 TAG=NEW，其余条目均无', () => {
    const zonesGroup = findChildGroup(zhSupport.CHILDREN, '专区');
    const taggedItems = zonesGroup.CHILDREN.filter((item: any) => item.TAG === 'NEW');
    expect(taggedItems.length).toBe(1);
    expect(taggedItems[0].NAME).toBe('oGMemory 专区');
  });
});