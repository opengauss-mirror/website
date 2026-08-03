import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const contentBridgePath = resolve(rootDir, 'app/.vitepress/src-new/data/download/content-bridge.ts');

describe('content-bridge — isLogin 字段保留但数据层已置 false', () => {
  const content = readFileSync(contentBridgePath, 'utf-8');

  it('content-bridge 仍映射 isLogin 字段（类型兼容保留）', () => {
    expect(content).toContain('isLogin');
  });

  it('content-bridge 不含 PERMISSION_LIST 逻辑', () => {
    expect(content).not.toContain('PERMISSION_LIST');
  });

  it('content-bridge 不含 provide 调用', () => {
    expect(content).not.toContain('provide(');
  });
});

describe('content-bridge — isLogin 映射自 is_login（yaml 数据层已置 false）', () => {
  it('isLogin 字段由 meta.is_login 映射而来', () => {
    const content = readFileSync(contentBridgePath, 'utf-8');
    expect(content).toContain('isLogin: meta.is_login');
  });
});
