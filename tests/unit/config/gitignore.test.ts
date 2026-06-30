import { expect, describe, it, beforeAll, afterAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../');
const gitignorePath = resolve(rootDir, '.gitignore');

const agentEntries = ['.codegraph/', '.claude/', '.opencode/', '.cursor/', '.aider/'];

const gitignoreContent = readFileSync(gitignorePath, 'utf-8');

describe('.gitignore agent tool entries', () => {
  for (const entry of agentEntries) {
    it(`contains "${entry}" entry`, () => {
      expect(gitignoreContent).toContain(entry);
    });

    it(`"${entry}" has trailing slash (directory-only rule)`, () => {
      expect(entry.endsWith('/')).toBe(true);
    });
  }

  it('agent entries are under a comment group', () => {
    expect(gitignoreContent).toContain('# Agent tool artifacts');
  });

  it('agent entries are grouped together after the comment', () => {
    const commentIndex = gitignoreContent.indexOf('# Agent tool artifacts');
    for (const entry of agentEntries) {
      const entryIndex = gitignoreContent.indexOf(entry, commentIndex);
      expect(entryIndex).toBeGreaterThan(commentIndex);
    }
  });
});

describe('.gitignore git status verification', () => {
  const testDir = resolve(rootDir, '.codegraph');
  const testFile = resolve(testDir, 'vitest-test-marker');

  beforeAll(() => {
    execSync(`mkdir -p ${testDir} && touch ${testFile}`, { cwd: rootDir });
  });

  afterAll(() => {
    execSync(`rm -rf ${testDir}`, { cwd: rootDir });
  });

  it('git status does not show files under .codegraph/', () => {
    const status = execSync('git status --porcelain', { cwd: rootDir }).toString();
    expect(status).not.toContain('.codegraph/');
  });

  it('.codegraph/test file exists but is ignored', () => {
    const status = execSync('git status --porcelain -u', { cwd: rootDir }).toString();
    expect(status).not.toContain('vitest-test-marker');
  });
});
