import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import internshipZh from '../../../../app/.vitepress/src-new/i18n/internship/internship-zh';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const submitTaskVuePath = resolve(rootDir, 'app/.vitepress/src-new/views/internship/components/intro/SubmitTask.vue');
const internshipZhPath = resolve(rootDir, 'app/.vitepress/src-new/i18n/internship/internship-zh.ts');

const AI_LINK_URL = 'https://opengauss.org/zh/ai-coding-assistants/';

describe('SubmitTask i18n - 新增 attention1/attention2 key', () => {
  it('attention1 key 存在且以 "注意1: " 开头', () => {
    expect(internshipZh.attention1).toBe('注意1: ');
  });

  it('attention2 key 存在且以 "注意2: " 开头', () => {
    expect(internshipZh.attention2).toBe('注意2: ');
  });

  it('attention1Link key 存在', () => {
    expect(internshipZh.attention1Link).toBe('社区AI贡献策略');
  });

  it('attention1Desc key 存在且包含 AI 相关文案', () => {
    expect(internshipZh.attention1Desc).toContain('AI');
    expect(internshipZh.attention1Desc).toContain('PR');
  });

  it('attention1Desc2 key 存在且包含披露要求', () => {
    expect(internshipZh.attention1Desc2).toContain('披露');
    expect(internshipZh.attention1Desc2).toContain('Prompt');
  });

  it('原有 attention key 保留不变', () => {
    expect(internshipZh.attention).toBe('注意: ');
  });

  it('原有 noPoints1/2/3 key 保留不变', () => {
    expect(internshipZh.noPoints1).toBeTruthy();
    expect(internshipZh.noPoints2).toBeTruthy();
    expect(internshipZh.noPoints3).toBeTruthy();
  });
});

describe('SubmitTask.vue - 模板拆分为两个 attention 区块', () => {
  const content = readFileSync(submitTaskVuePath, 'utf-8');

  it('包含 OLink 组件导入', () => {
    expect(content).toContain("import { OLink } from '@opensig/opendesign'");
  });

  it('包含 attention1 i18n 引用', () => {
    expect(content).toContain('i18n.internship.attention1');
  });

  it('包含 attention2 i18n 引用', () => {
    expect(content).toContain('i18n.internship.attention2');
  });

  it('attention1 区块包含 OLink 超链接', () => {
    expect(content).toContain('OLink');
    expect(content).toContain(AI_LINK_URL);
  });

  it('OLink 包含 target="_blank"', () => {
    expect(content).toContain('target="_blank"');
  });

  it('OLink 包含 rel="noopener noreferrer"', () => {
    expect(content).toContain('rel="noopener noreferrer"');
  });

  it('attention1 区块包含 attention1Desc 和 attention1Desc2', () => {
    expect(content).toContain('i18n.internship.attention1Desc');
    expect(content).toContain('i18n.internship.attention1Desc2');
  });

  it('attention1 区块包含 attention1Link 文案', () => {
    expect(content).toContain('i18n.internship.attention1Link');
  });

  it('attention2 区块保留原有 noPoints1/2/3', () => {
    expect(content).toContain('i18n.internship.noPoints1');
    expect(content).toContain('i18n.internship.noPoints2');
    expect(content).toContain('i18n.internship.noPoints3');
  });

  it('存在两个 .attention 区块', () => {
    const matches = content.match(/class="attention"/g);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBe(2);
  });
});

describe('internship i18n - 仅 zh 导出，无 en 需同步', () => {
  const indexContent = readFileSync(internshipZhPath.replace('internship-zh.ts', 'index.ts'), 'utf-8');

  it('index.ts 只导出 zh，不导出 en', () => {
    expect(indexContent).toContain('zh');
    expect(indexContent).not.toContain('en');
    expect(indexContent).not.toContain('internship-en');
  });
});
