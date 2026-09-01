import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const syncBlogsPath = resolve(rootDir, 'scripts/sync-blogs.js');

describe('scripts/sync-blogs.js blog 仓地址迁移到 atomgit', () => {
  const content = readFileSync(syncBlogsPath, 'utf-8');

  it('BLOGS_GIT_REPO 指向 atomgit.com/opengauss/blog.git', () => {
    expect(content).toContain("'https://atomgit.com/opengauss/blog.git'");
  });

  it('不再使用 gitcode.com 仓库地址', () => {
    expect(content).not.toContain('gitcode.com');
  });
});
