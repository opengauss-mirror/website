import { expect, describe, it } from 'vitest';
import bannerData from '@/data/home/banner';

describe('banner 数据 — ogmemory 条目', () => {
  const zhOgmemory = bannerData.zh[0];

  describe('zh 首页 ogmemory banner', () => {
    it('ogmemory 位于 zh 数组首位', () => {
      expect(zhOgmemory.title).toBe('oGMemory 专区');
    });

    it('title 字段为中文文案', () => {
      expect(zhOgmemory.title).toBe('oGMemory 专区');
    });

    it('subtitle 为中文描述', () => {
      expect(zhOgmemory.subtitle).toContain('面向AI Agent的长期记忆系统');
      expect(zhOgmemory.subtitle).toContain('AGFS');
      expect(zhOgmemory.subtitle).toContain('openGauss向量索引');
    });

    it('link 指向 /zh/ogmemory/', () => {
      expect(zhOgmemory.link).toBe('/zh/ogmemory/');
    });

    it('btn 为中文按钮文案', () => {
      expect(zhOgmemory.btn).toBe('了解更多');
    });

    it('target 为 _self', () => {
      expect(zhOgmemory.target).toBe('_self');
    });

    it('isLightBg 为 false', () => {
      expect(zhOgmemory.isLightBg).toBe(false);
    });

    it('banners 包含 laptop 和 phone 键', () => {
      expect(zhOgmemory.banners).toHaveProperty('laptop');
      expect(zhOgmemory.banners).toHaveProperty('phone');
    });

    it('className / rightInset / rightLink 为空字符串', () => {
      expect(zhOgmemory.className).toBe('');
      expect(zhOgmemory.rightInset).toBe('');
      expect(zhOgmemory.rightLink).toBe('');
    });

    it('titleMb 和 desc 为空数组', () => {
      expect(zhOgmemory.titleMb).toEqual([]);
      expect(zhOgmemory.desc).toEqual([]);
    });
  });

  describe('setBannersDefaultValueProxy — 缺省尺寸回退到 laptop', () => {
    it('访问 banners 中未定义的屏幕尺寸时回退到 laptop', () => {
      const ogmemoryItem = bannerData.zh[0];
      expect(ogmemoryItem.banners.laptop).toBeDefined();
      expect(ogmemoryItem.banners.pad_v).toBe(ogmemoryItem.banners.laptop);
      expect(ogmemoryItem.banners.pad_h).toBe(ogmemoryItem.banners.laptop);
    });

    it('ogmemory 条目 laptop/phone 共用同一图片（无独立移动端图片）', () => {
      const ogmemoryItem = bannerData.zh[0];
      expect(ogmemoryItem.banners.phone).toBeDefined();
      expect(ogmemoryItem.banners.phone).toBe(
        ogmemoryItem.banners.laptop
      );
    });
  });

  describe('zh 数组结构完整性', () => {
    it('zh 数组总数为 10 条（9 条原有 + 1 条 ogmemory）', () => {
      expect(bannerData.zh.length).toBe(10);
    });

    it('en 数组总数为 1 条（未新增 ogmemory，仅保留原有）', () => {
      expect(bannerData.en.length).toBe(1);
    });
  });
});