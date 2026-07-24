import { expect, describe, it } from 'vitest';
import { readFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const dataTsPath = resolve(rootDir, 'app/.vitepress/src/data/member/data.ts');
const avatarDir = resolve(rootDir, 'app/.vitepress/src/assets/category/member/avatar');

const dataContent = readFileSync(dataTsPath, 'utf-8');

function extractBlock(content: string, startPos: number): string {
  const bracketPos = content.indexOf('[', startPos);
  let depth = 0;
  let endPos = bracketPos;
  for (let i = bracketPos; i < content.length; i++) {
    if (content[i] === '[') depth++;
    if (content[i] === ']') depth--;
    if (depth === 0) {
      endPos = i + 1;
      break;
    }
  }
  return content.slice(bracketPos, endPos);
}

const zhBcStart = dataContent.indexOf('BC: [', dataContent.indexOf('zh: {'));
const enBcStart = dataContent.indexOf('BC: [', dataContent.indexOf('en: {'));
const zhSecStart = dataContent.indexOf('SECRETARIAT: [', dataContent.indexOf('zh: {'));
const enSecStart = dataContent.indexOf('SECRETARIAT: [', dataContent.indexOf('en: {'));

const zhBcBlock = extractBlock(dataContent, zhBcStart);
const enBcBlock = extractBlock(dataContent, enBcStart);
const zhSecBlock = extractBlock(dataContent, zhSecStart);
const enSecBlock = extractBlock(dataContent, enSecStart);

describe('BC member removal — zh', () => {
  it('zh BC does not contain "李明"', () => {
    expect(zhBcBlock).not.toContain('李明');
  });

  it('zh BC does not contain "潘思言"', () => {
    expect(zhBcBlock).not.toContain('潘思言');
  });

  it('zh BC does not contain "孟鹏博"', () => {
    expect(zhBcBlock).not.toContain('孟鹏博');
  });
});

describe('BC member removal — en', () => {
  it('en BC does not contain "Ming Li"', () => {
    expect(enBcBlock).not.toContain('Ming Li');
  });

  it('en BC does not contain "Siyan Pan"', () => {
    expect(enBcBlock).not.toContain('Siyan Pan');
  });

  it('en BC does not contain "Pengbo Meng"', () => {
    expect(enBcBlock).not.toContain('Pengbo Meng');
  });
});

describe('BC new member addition — zh', () => {
  it('zh BC contains "王凯慧"', () => {
    expect(zhBcBlock).toContain('王凯慧');
  });

  it('王凯慧 in zh BC has correct title "委员"', () => {
    expect(zhBcBlock).toContain('王凯慧');
    expect(zhBcBlock).toContain('委员');
  });

  it('王凯慧 in zh BC has correct email', () => {
    expect(zhBcBlock).toContain('wangkaihui4@huawei.com');
  });

  it('王凯慧 in zh BC has correct company', () => {
    expect(zhBcBlock).toContain('华为技术有限公司');
  });

  it('zh BC does not mistakenly contain "孙爽"', () => {
    expect(zhBcBlock).not.toContain('孙爽');
  });
});

describe('BC new member addition — en', () => {
  it('en BC contains "Kaihui Wang"', () => {
    expect(enBcBlock).toContain('Kaihui Wang');
  });

  it('Kaihui Wang in en BC has correct title "Member"', () => {
    expect(enBcBlock).toContain('Kaihui Wang');
    expect(enBcBlock).toContain('Member');
  });

  it('Kaihui Wang in en BC has correct email', () => {
    expect(enBcBlock).toContain('wangkaihui4@huawei.com');
  });

  it('Kaihui Wang in en BC has correct company "Huawei"', () => {
    expect(enBcBlock).toContain('Huawei');
  });

  it('en BC does not mistakenly contain "Shuang Sun"', () => {
    expect(enBcBlock).not.toContain('Shuang Sun');
  });
});

describe('SECRETARIAT member removal — zh', () => {
  it('zh SECRETARIAT does not contain "李明"', () => {
    expect(zhSecBlock).not.toContain('李明');
  });

  it('zh SECRETARIAT does not contain "潘思言"', () => {
    expect(zhSecBlock).not.toContain('潘思言');
  });

  it('zh SECRETARIAT does not contain "孟鹏博" (replaced by 孙爽)', () => {
    expect(zhSecBlock).not.toContain('孟鹏博');
  });
});

describe('SECRETARIAT member removal — en', () => {
  it('en SECRETARIAT does not contain "Ming Li"', () => {
    expect(enSecBlock).not.toContain('Ming Li');
  });

  it('en SECRETARIAT does not contain "Siyan Pan"', () => {
    expect(enSecBlock).not.toContain('Siyan Pan');
  });

  it('en SECRETARIAT does not contain "Pengbo Meng" (replaced by Shuang Sun)', () => {
    expect(enSecBlock).not.toContain('Pengbo Meng');
  });
});

describe('SECRETARIAT member replacement 孙爽 — zh', () => {
  it('zh SECRETARIAT contains "孙爽"', () => {
    expect(zhSecBlock).toContain('孙爽');
  });

  it('孙爽 in zh SECRETARIAT has correct title "执行秘书"', () => {
    expect(zhSecBlock).toContain('孙爽');
    expect(zhSecBlock).toContain('执行秘书');
  });

  it('孙爽 in zh SECRETARIAT has correct email', () => {
    expect(zhSecBlock).toContain('sunshuang18@huawei.com');
  });
});

describe('SECRETARIAT member replacement Shuang Sun — en', () => {
  it('en SECRETARIAT contains "Shuang Sun"', () => {
    expect(enSecBlock).toContain('Shuang Sun');
  });

  it('Shuang Sun in en SECRETARIAT has correct title "Executive Secretary"', () => {
    expect(enSecBlock).toContain('Shuang Sun');
    expect(enSecBlock).toContain('Executive Secretary');
  });

  it('Shuang Sun in en SECRETARIAT has correct email', () => {
    expect(enSecBlock).toContain('sunshuang18@huawei.com');
  });
});

describe('SECRETARIAT new member 王凯慧 — zh', () => {
  it('zh SECRETARIAT contains "王凯慧"', () => {
    expect(zhSecBlock).toContain('王凯慧');
  });

  it('王凯慧 in zh SECRETARIAT has title "执行秘书"', () => {
    expect(zhSecBlock).toContain('王凯慧');
    expect(zhSecBlock).toContain('执行秘书');
  });

  it('王凯慧 in zh SECRETARIAT has correct email', () => {
    expect(zhSecBlock).toContain('wangkaihui4@huawei.com');
  });
});

describe('SECRETARIAT new member Kaihui Wang — en', () => {
  it('en SECRETARIAT contains "Kaihui Wang"', () => {
    expect(enSecBlock).toContain('Kaihui Wang');
  });

  it('Kaihui Wang in en SECRETARIAT has title "Executive Secretary"', () => {
    expect(enSecBlock).toContain('Kaihui Wang');
    expect(enSecBlock).toContain('Executive Secretary');
  });

  it('Kaihui Wang in en SECRETARIAT has correct email', () => {
    expect(enSecBlock).toContain('wangkaihui4@huawei.com');
  });
});

describe('Import cleanup in data.ts (issue 295)', () => {
  it('liming import has been removed', () => {
    const importRegex = /import\s+liming\s+from/;
    expect(importRegex.test(dataContent)).toBe(false);
  });

  it('pansiyan import has been removed', () => {
    const importRegex = /import\s+pansiyan\s+from/;
    expect(importRegex.test(dataContent)).toBe(false);
  });

  it('mengpengbo import has been removed', () => {
    const importRegex = /import\s+mengpengbo\s+from/;
    expect(importRegex.test(dataContent)).toBe(false);
  });

  it('wangkaihui import has been added', () => {
    expect(dataContent).toContain('import wangkaihui from');
  });

  it('sunshuang import has been added', () => {
    expect(dataContent).toContain('import sunshuang from');
  });
});

describe('Avatar file existence (issue 295)', () => {
  it('wangkaihui.png exists', () => {
    expect(existsSync(resolve(avatarDir, 'wangkaihui.png'))).toBe(true);
  });

  it('sunshuang.png exists', () => {
    expect(existsSync(resolve(avatarDir, 'sunshuang.png'))).toBe(true);
  });
});

describe('zh/en BC i18n consistency', () => {
  it('zh and en BC have the same number of members', () => {
    const zhCount = zhBcBlock.split('name:').length - 1;
    const enCount = enBcBlock.split('name:').length - 1;
    expect(zhCount).toBe(enCount);
  });
});

describe('zh/en SECRETARIAT i18n consistency', () => {
  it('zh and en SECRETARIAT have the same number of members', () => {
    const zhCount = zhSecBlock.split('name:').length - 1;
    const enCount = enSecBlock.split('name:').length - 1;
    expect(zhCount).toBe(enCount);
  });
});
