import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import * as urlConfigOld from '../../../app/.vitepress/src/data/url-config/index.ts';
import * as urlConfigNew from '../../../app/.vitepress/src-new/data/url-config/index.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const appFloatPath = resolve(rootDir, 'app/.vitepress/src/components/AppFloat.vue');

describe('AppFloat VULBOX_LINK 移除验证', () => {
  it('url-config (old) 不导出 VULBOX_LINK', () => {
    expect(urlConfigOld).not.toHaveProperty('VULBOX_LINK');
  });

  it('url-config (new) 不导出 VULBOX_LINK', () => {
    expect(urlConfigNew).not.toHaveProperty('VULBOX_LINK');
  });

  it('url-config (old) 源文件不含 VULBOX_LINK 声明', () => {
    const content = readFileSync(resolve(rootDir, 'app/.vitepress/src/data/url-config/index.ts'), 'utf-8');
    expect(content).not.toContain('VULBOX_LINK');
  });

  it('url-config (new) 源文件不含 VULBOX_LINK 声明', () => {
    const content = readFileSync(resolve(rootDir, 'app/.vitepress/src-new/data/url-config/index.ts'), 'utf-8');
    expect(content).not.toContain('VULBOX_LINK');
  });

  it('url-config (old) 仍导出 GAUSS_EMAIL 和 QUESTIONNAIRE_SURVEY', () => {
    expect(urlConfigOld).toHaveProperty('GAUSS_EMAIL');
    expect(urlConfigOld).toHaveProperty('QUESTIONNAIRE_SURVEY');
  });

  it('url-config (new) 仍导出 GAUSS_EMAIL', () => {
    expect(urlConfigNew).toHaveProperty('GAUSS_EMAIL');
  });

  it('url-config old 与 new GAUSS_EMAIL 值一致', () => {
    expect(urlConfigOld.GAUSS_EMAIL).toBe(urlConfigNew.GAUSS_EMAIL);
  });
});

describe('AppFloat isSafetyFloatShow / safety-tips 移除验证', () => {
  it('AppFloat.vue 不含 isSafetyFloatShow', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).not.toContain('isSafetyFloatShow');
  });

  it('AppFloat.vue 不含 FLOAT_BUG_TEXT', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).not.toContain('FLOAT_BUG_TEXT');
  });

  it('AppFloat.vue 不含 VULBOX_LINK import', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).not.toContain('VULBOX_LINK');
  });

  it('AppFloat.vue 不含 safety-tips 模板块', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).not.toContain('safety-tips');
  });

  it('AppFloat.vue 不含 useRoute import (不含独立的 useRoute 调用)', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    const useRouteCallPattern = /useRoute\(\)/;
    expect(useRouteCallPattern.test(content)).toBe(false);
    const useRouteImportPattern = /useRoute[,\s}]|,\s*useRoute/;
    expect(useRouteImportPattern.test(content)).toBe(false);
  });

  it('AppFloat.vue 不含 vulbox 链接', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).not.toContain('opengausssrc.vulbox.com');
  });
});

describe('AppFloat 保留功能验证', () => {
  it('AppFloat.vue 仍含满意度评分相关逻辑 (score)', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('score');
  });

  it('AppFloat.vue 仍含问题反馈相关逻辑 (postFeedback)', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('postFeedback');
  });

  it('AppFloat.vue 仍含回到顶部 (handleClickTop)', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('handleClickTop');
  });

  it('AppFloat.vue 仍含 GAUSS_EMAIL import', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('GAUSS_EMAIL');
  });

  it('AppFloat.vue 仍含 QUESTIONNAIRE_SURVEY import', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('QUESTIONNAIRE_SURVEY');
  });

  it('AppFloat.vue 仍含满意度问卷弹窗 (floatServiceData)', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('floatServiceData');
  });

  it('AppFloat.vue 仍含 useRouter (非 useRoute)', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('useRouter');
  });
});

describe('AppFloat 语言与路由逻辑完整性', () => {
  it('AppFloat.vue 仍限制 lang === zh', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain("lang === 'zh'");
  });

  it('AppFloat.vue 仍含 title2 路由匹配 (tipsObj)', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    expect(content).toContain('tipsObj');
    expect(content).toContain('vulnerability-management');
    expect(content).toContain('security-advisories');
    expect(content).toContain('cve');
  });

  it('tipsObj 中 vulnerability-management 对应安全版块标题', () => {
    const content = readFileSync(appFloatPath, 'utf-8');
    const match = content.match(/['"]\/vulnerability-management\/['"]:\s*TITLES2\[\d+\]/);
    expect(match).not.toBeNull();
    expect(match![0]).toContain('TITLES2[6]');
  });
});
