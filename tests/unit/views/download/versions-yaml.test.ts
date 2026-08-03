import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import YAML from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const versionsYamlPath = resolve(rootDir, '.content/download/versions.yaml');

describe('versions.yaml — is_login 全部为 false', () => {
  const content = readFileSync(versionsYamlPath, 'utf-8');
  const data = YAML.load(content) as any[];

  it('YAML 解析为数组', () => {
    expect(Array.isArray(data)).toBe(true);
  });

  it('存在 is_login 字段的条目均不为 true', () => {
    const withIsLogin = data.filter((item) => item.is_login !== undefined);
    for (const item of withIsLogin) {
      expect(item.is_login).toBe(false);
    }
  });

  it('不存在 is_login: true 的条目', () => {
    const trueItems = data.filter((item) => item.is_login === true);
    expect(trueItems.length).toBe(0);
  });

  it('new_layout 为 true 且含 is_login 字段的条目 is_login 均为 false（新版布局需登录校验已移除）', () => {
    const newLayoutItems = data.filter((item) => item.new_layout === true && item.is_login !== undefined);
    for (const item of newLayoutItems) {
      expect(item.is_login).toBe(false);
    }
  });

  it('new_layout 为 true 的条目 is_login 不为 true', () => {
    const newLayoutItems = data.filter((item) => item.new_layout === true);
    for (const item of newLayoutItems) {
      expect(item.is_login).not.toBe(true);
    }
  });
});

describe('versions.yaml — is_login: true 字面量不存在于源文件', () => {
  const content = readFileSync(versionsYamlPath, 'utf-8');

  it('源文件不含 "is_login: true"', () => {
    expect(content).not.toContain('is_login: true');
  });

  it('源文件含 "is_login: false"', () => {
    expect(content).toContain('is_login: false');
  });
});
