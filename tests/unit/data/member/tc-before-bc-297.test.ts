import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const zhPath = resolve(rootDir, 'app/.vitepress/src/data/member/member-zh.ts');
const enPath = resolve(rootDir, 'app/.vitepress/src/data/member/member-en.ts');
const zhContent = readFileSync(zhPath, 'utf-8');
const enContent = readFileSync(enPath, 'utf-8');

function findMemberItemPosition(content: string, id: string): number {
  const pattern = `id: \`${id}\``;
  const memberListStart = content.indexOf('memberList: [');
  const pos = content.indexOf(pattern, memberListStart);
  return pos;
}

describe('TC before BC in zh memberList', () => {
  it('tc entry exists in zh memberList', () => {
    const memberListStart = zhContent.indexOf('memberList: [');
    const tcPos = zhContent.indexOf('id: `tc`', memberListStart);
    expect(tcPos).toBeGreaterThan(memberListStart);
  });

  it('bc entry exists in zh memberList', () => {
    const memberListStart = zhContent.indexOf('memberList: [');
    const bcPos = zhContent.indexOf('id: `bc`', memberListStart);
    expect(bcPos).toBeGreaterThan(memberListStart);
  });

  it('tc appears before bc in zh memberList', () => {
    const tcPos = findMemberItemPosition(zhContent, 'tc');
    const bcPos = findMemberItemPosition(zhContent, 'bc');
    expect(tcPos).toBeLessThan(bcPos);
  });

  it('tc name is "技术委员会 (TC)" in zh', () => {
    expect(zhContent).toContain(`name: \`技术委员会 (TC)\``);
  });

  it('bc name is "品牌宣传委员会" in zh', () => {
    expect(zhContent).toContain(`name: \`品牌宣传委员会\``);
  });
});

describe('TC before BC in en memberList', () => {
  it('tc entry exists in en memberList', () => {
    const memberListStart = enContent.indexOf('memberList: [');
    const tcPos = enContent.indexOf('id: `tc`', memberListStart);
    expect(tcPos).toBeGreaterThan(memberListStart);
  });

  it('bc entry exists in en memberList', () => {
    const memberListStart = enContent.indexOf('memberList: [');
    const bcPos = enContent.indexOf('id: `bc`', memberListStart);
    expect(bcPos).toBeGreaterThan(memberListStart);
  });

  it('TC appears before Brand Committee in en memberList', () => {
    const tcPos = findMemberItemPosition(enContent, 'tc');
    const bcPos = findMemberItemPosition(enContent, 'bc');
    expect(tcPos).toBeLessThan(bcPos);
  });

  it('TC name is "Technical Committee (TC)" in en', () => {
    expect(enContent).toContain(`name: \`Technical Committee (TC)\``);
  });

  it('BC name is "Brand Committee" in en', () => {
    expect(enContent).toContain(`name: \`Brand Committee\``);
  });
});

describe('memberList order consistency — zh', () => {
  it('counselor before board before uc before tc before bc', () => {
    const ids = ['counselor', 'board', 'uc', 'tc', 'bc'];
    const positions = ids.map((id) => findMemberItemPosition(zhContent, id));
    for (let i = 0; i < positions.length - 1; i++) {
      expect(positions[i]).toBeLessThan(positions[i + 1]);
    }
  });
});

describe('memberList order consistency — en', () => {
  it('counselor before board before uc before tc before bc', () => {
    const ids = ['counselor', 'board', 'uc', 'tc', 'bc'];
    const positions = ids.map((id) => findMemberItemPosition(enContent, id));
    for (let i = 0; i < positions.length - 1; i++) {
      expect(positions[i]).toBeLessThan(positions[i + 1]);
    }
  });
});

describe('other entries unchanged', () => {
  it('secretariat still exists in zh memberList', () => {
    const memberListStart = zhContent.indexOf('memberList: [');
    const secPos = zhContent.indexOf('id: `secretariat`', memberListStart);
    expect(secPos).toBeGreaterThan(memberListStart);
  });

  it('sig still exists in zh memberList', () => {
    const memberListStart = zhContent.indexOf('memberList: [');
    const sigPos = zhContent.indexOf('id: `sig`', memberListStart);
    expect(sigPos).toBeGreaterThan(memberListStart);
  });

  it('ogug still exists in zh memberList', () => {
    const memberListStart = zhContent.indexOf('memberList: [');
    const ogugPos = zhContent.indexOf('id: `ogug`', memberListStart);
    expect(ogugPos).toBeGreaterThan(memberListStart);
  });

  it('secretariat still exists in en memberList', () => {
    const memberListStart = enContent.indexOf('memberList: [');
    const secPos = enContent.indexOf('id: `secretariat`', memberListStart);
    expect(secPos).toBeGreaterThan(memberListStart);
  });

  it('sig still exists in en memberList', () => {
    const memberListStart = enContent.indexOf('memberList: [');
    const sigPos = enContent.indexOf('id: `sig`', memberListStart);
    expect(sigPos).toBeGreaterThan(memberListStart);
  });

  it('ogug still exists in en memberList', () => {
    const memberListStart = enContent.indexOf('memberList: [');
    const ogugPos = enContent.indexOf('id: `ogug`', memberListStart);
    expect(ogugPos).toBeGreaterThan(memberListStart);
  });

  it('secretariat, sig, ogug are after bc in zh', () => {
    const bcPos = findMemberItemPosition(zhContent, 'bc');
    const secPos = findMemberItemPosition(zhContent, 'secretariat');
    const sigPos = findMemberItemPosition(zhContent, 'sig');
    const ogugPos = findMemberItemPosition(zhContent, 'ogug');
    expect(secPos).toBeGreaterThan(bcPos);
    expect(sigPos).toBeGreaterThan(secPos);
    expect(ogugPos).toBeGreaterThan(sigPos);
  });

  it('secretariat, sig, ogug are after bc in en', () => {
    const bcPos = findMemberItemPosition(enContent, 'bc');
    const secPos = findMemberItemPosition(enContent, 'secretariat');
    const sigPos = findMemberItemPosition(enContent, 'sig');
    const ogugPos = findMemberItemPosition(enContent, 'ogug');
    expect(secPos).toBeGreaterThan(bcPos);
    expect(sigPos).toBeGreaterThan(secPos);
    expect(ogugPos).toBeGreaterThan(sigPos);
  });
});
