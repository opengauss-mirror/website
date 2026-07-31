import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const viewsDir = resolve(rootDir, 'app/.vitepress/src-new/views/download');

const contentItemPath = resolve(viewsDir, 'DownloadContentItem.vue');
const tablePath = resolve(viewsDir, 'DownloadTable.vue');
const theDownloadPath = resolve(viewsDir, 'TheDownload.vue');
const archivePath = resolve(viewsDir, 'TheDownloadArchive.vue');
const sectionPath = resolve(viewsDir, 'DownloadSection.vue');
const toolSetPath = resolve(viewsDir, 'support-tools/TheToolSet.vue');

function read(file: string) {
  return readFileSync(file, 'utf-8');
}

// ──────────────────────────────────────────────
// 1. DownloadContentItem.vue — 登录弹窗移除
// ──────────────────────────────────────────────
describe('DownloadContentItem — 登录弹窗及权限逻辑移除', () => {
  const content = read(contentItemPath);

  it('不含 doLogin import', () => {
    expect(content).not.toContain('doLogin');
  });

  it('不含 useUserInfoStore import', () => {
    expect(content).not.toContain('useUserInfoStore');
  });

  it('不含 ODialog import', () => {
    expect(content).not.toContain('ODialog');
  });

  it('不含 DialogActionT import', () => {
    expect(content).not.toContain('DialogActionT');
  });

  it('不含 inject PERMISSION_LIST', () => {
    expect(content).not.toContain('PERMISSION_LIST');
  });

  it('不含 inject 调用', () => {
    expect(content).not.toContain('inject(');
  });

  it('不含 downloadVersionAuth', () => {
    expect(content).not.toContain('downloadVersionAuth');
  });

  it('不含 userInfoStore', () => {
    expect(content).not.toContain('userInfoStore');
  });

  it('不含 downloadDlg', () => {
    expect(content).not.toContain('downloadDlg');
  });

  it('不含 dlgAction', () => {
    expect(content).not.toContain('dlgAction');
  });

  it('不含 changeDownloadAuth', () => {
    expect(content).not.toContain('changeDownloadAuth');
  });

  it('不含 ODialog 模板块', () => {
    expect(content).not.toContain('<ODialog');
  });

  it('下载按钮直接使用 :href 指向 down_url（无 v-if/v-else 分支）', () => {
    const btnPattern = /<OButton[^>]*:href="data\.down_url"/;
    expect(btnPattern.test(content)).toBe(true);
  });

  it('下载按钮不含 v-if/v-else 分支控制', () => {
    const downActionBlock = content.match(/class="down-action"[\s\S]*?<\/div>/);
    expect(downActionBlock).not.toBeNull();
    const block = downActionBlock![0];
    expect(block).not.toContain('v-if="downloadVersionAuth');
    expect(block).not.toContain('v-else');
  });
});

// ──────────────────────────────────────────────
// 2. DownloadTable.vue — 登录弹窗移除
// ──────────────────────────────────────────────
describe('DownloadTable — 登录弹窗及权限逻辑移除', () => {
  const content = read(tablePath);

  it('不含 doLogin import', () => {
    expect(content).not.toContain('doLogin');
  });

  it('不含 useUserInfoStore import', () => {
    expect(content).not.toContain('useUserInfoStore');
  });

  it('不含 ODialog import', () => {
    expect(content).not.toContain('ODialog');
  });

  it('不含 DialogActionT import', () => {
    expect(content).not.toContain('DialogActionT');
  });

  it('不含 inject PERMISSION_LIST', () => {
    expect(content).not.toContain('PERMISSION_LIST');
  });

  it('不含 inject 调用', () => {
    expect(content).not.toContain('inject(');
  });

  it('不含 downloadVersionAuth', () => {
    expect(content).not.toContain('downloadVersionAuth');
  });

  it('不含 userInfoStore', () => {
    expect(content).not.toContain('userInfoStore');
  });

  it('不含 downloadDlg', () => {
    expect(content).not.toContain('downloadDlg');
  });

  it('不含 changeDownloadAuth', () => {
    expect(content).not.toContain('changeDownloadAuth');
  });

  it('PC端下载按钮直接使用 :href 指向 row.down_url', () => {
    const btnPattern = /<OButton[^>]*:href="row\.down_url"/;
    expect(btnPattern.test(content)).toBe(true);
  });

  it('手机端下载按钮直接使用 :href 指向 item.down_url', () => {
    expect(content).toContain(':href="item.down_url"');
  });

  it('不含 ODialog 模板块', () => {
    expect(content).not.toContain('<ODialog');
  });
});

// ──────────────────────────────────────────────
// 3. TheDownload.vue — provide 链路移除
// ──────────────────────────────────────────────
describe('TheDownload — PERMISSION_LIST provide 链路移除', () => {
  const content = read(theDownloadPath);

  it('不含 provide import', () => {
    expect(content).not.toContain('provide');
  });

  it('不含 getPermissionList', () => {
    expect(content).not.toContain('getPermissionList');
  });

  it('不含 PERMISSION_LIST', () => {
    expect(content).not.toContain('PERMISSION_LIST');
  });

  it('不含 isLogin 引用', () => {
    expect(content).not.toContain('isLogin');
  });
});

// ──────────────────────────────────────────────
// 4. TheDownloadArchive.vue — provide 链路移除
// ──────────────────────────────────────────────
describe('TheDownloadArchive — PERMISSION_LIST provide 链路移除', () => {
  const content = read(archivePath);

  it('不含 provide import', () => {
    expect(content).not.toContain('provide');
  });

  it('不含 getPermissionList', () => {
    expect(content).not.toContain('getPermissionList');
  });

  it('不含 PERMISSION_LIST', () => {
    expect(content).not.toContain('PERMISSION_LIST');
  });

  it('不含 isLogin 引用', () => {
    expect(content).not.toContain('isLogin');
  });
});

// ──────────────────────────────────────────────
// 5. DownloadSection.vue — 无条件上报埋点
// ──────────────────────────────────────────────
describe('DownloadSection — collectDownloadData 无条件上报', () => {
  const content = read(sectionPath);

  it('不含 useUserInfoStore import', () => {
    expect(content).not.toContain('useUserInfoStore');
  });

  it('不含 userInfoStore 引用', () => {
    expect(content).not.toContain('userInfoStore');
  });

  it('collectDownloadData 不含 username 判断', () => {
    const funcMatch = content.match(/const collectDownloadData[\s\S]*?^};/m);
    expect(funcMatch).not.toBeNull();
    expect(funcMatch![0]).not.toContain('userInfoStore.username');
  });

  it('collectDownloadData 包含 oaReport 调用', () => {
    const funcMatch = content.match(/const collectDownloadData[\s\S]*?^};/m);
    expect(funcMatch).not.toBeNull();
    expect(funcMatch![0]).toContain('oaReport');
  });

  it('collectDownloadData 包含 _U_T_ 兜底 "notLog"', () => {
    const funcMatch = content.match(/const collectDownloadData[\s\S]*?^};/m);
    expect(funcMatch).not.toBeNull();
    expect(funcMatch![0]).toContain("'notLog'");
  });
});

// ──────────────────────────────────────────────
// 6. TheToolSet.vue — 登录弹窗移除 + 无条件上报
// ──────────────────────────────────────────────
describe('TheToolSet — 登录弹窗移除及无条件上报', () => {
  const content = read(toolSetPath);

  it('不含 doLogin import', () => {
    expect(content).not.toContain('doLogin');
  });

  it('不含 useUserInfoStore import', () => {
    expect(content).not.toContain('useUserInfoStore');
  });

  it('不含 ODialog import', () => {
    expect(content).not.toContain('ODialog');
  });

  it('不含 DialogActionT import', () => {
    expect(content).not.toContain('DialogActionT');
  });

  it('不含 userInfoStore 引用', () => {
    expect(content).not.toContain('userInfoStore');
  });

  it('不含 downloadDlg', () => {
    expect(content).not.toContain('downloadDlg');
  });

  it('不含 changeDownloadAuth', () => {
    expect(content).not.toContain('changeDownloadAuth');
  });

  it('不含 ODialog 模板块', () => {
    expect(content).not.toContain('<ODialog');
  });

  it('PC端下载按钮直接使用 :href 指向 row.down_url', () => {
    const btnPattern = /<OButton[^>]*:href="row\.down_url"/;
    expect(btnPattern.test(content)).toBe(true);
  });

  it('手机端下载按钮直接使用 :href 指向 item.down_url / tool.down_url', () => {
    const hrefPattern = /:href="(item|tool)\.down_url"/g;
    const matches = content.match(hrefPattern);
    expect(matches).not.toBeNull();
    expect(matches!.length).toBeGreaterThanOrEqual(2);
  });

  it('collectDownloadData 不含 username 判断', () => {
    const funcMatch = content.match(/const collectDownloadData[\s\S]*?^};/m);
    expect(funcMatch).not.toBeNull();
    expect(funcMatch![0]).not.toContain('userInfoStore.username');
  });

  it('collectDownloadData 包含 oaReport 调用', () => {
    const funcMatch = content.match(/const collectDownloadData[\s\S]*?^};/m);
    expect(funcMatch).not.toBeNull();
    expect(funcMatch![0]).toContain('oaReport');
  });

  it('collectDownloadData 包含 _U_T_ 兜底 "notLog"', () => {
    const funcMatch = content.match(/const collectDownloadData[\s\S]*?^};/m);
    expect(funcMatch).not.toBeNull();
    expect(funcMatch![0]).toContain("'notLog'");
  });
});
