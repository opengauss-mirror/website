import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const meetingFormPath = resolve(
  rootDir,
  'app/.vitepress/src-new/views/home/components/MeetingForm.vue'
);
const opendesignCheckboxScssPath = resolve(
  rootDir,
  'opendesign/checkbox/src/checkbox.scss'
);

function readFile(filePath: string) {
  return readFileSync(filePath, 'utf-8');
}

/**
 * 按花括号配平提取 SCSS 选择器块内容（含嵌套）。
 * 返回 { start, end, body }，找不到时返回 null。
 */
function extractBlock(content: string, selector: string) {
  const start = content.indexOf(selector);
  if (start === -1) return null;
  const braceOpen = content.indexOf('{', start);
  if (braceOpen === -1) return null;
  let depth = 0;
  let i = braceOpen;
  for (; i < content.length; i++) {
    const ch = content[i];
    if (ch === '{') depth++;
    else if (ch === '}') {
      depth--;
      if (depth === 0) {
        return {
          start,
          end: i,
          body: content.substring(braceOpen + 1, i),
        };
      }
    }
  }
  return null;
}

const meetingForm = readFile(meetingFormPath);
const styleStart = meetingForm.indexOf('<style lang="scss" scoped>');
const styleEnd = meetingForm.indexOf('</style>', styleStart);
const styleBlock = meetingForm.substring(styleStart, styleEnd);

describe('MeetingForm 跨境说明勾选项存在性验证 (template)', () => {
  it('模板内存在带 class="checkbox-doc-usage" 的 <OCheckbox> 勾选项', () => {
    expect(meetingForm).toMatch(/<OCheckbox[^>]*class="checkbox-doc-usage"/);
  });

  it('该勾选项绑定 v-model="userAgreedProp" 与 value="1" (即"预订会议"弹窗内的跨境/隐私同意项)', () => {
    const checkboxMatch = meetingForm.match(/<OCheckbox[^>]*class="checkbox-doc-usage"[^>]*>/);
    expect(checkboxMatch).not.toBeNull();
    const tag = checkboxMatch![0];
    expect(tag).toContain('v-model="userAgreedProp"');
    expect(tag).toContain('value="1"');
  });

  it('该勾选项 slot 内引用 bookAgree 文案与 privacyStatement 链接 (确认为跨境说明项)', () => {
    const checkboxIdx = meetingForm.indexOf('class="checkbox-doc-usage"');
    const closeTag = meetingForm.indexOf('</OCheckbox>', checkboxIdx);
    expect(closeTag).toBeGreaterThan(checkboxIdx);
    const slot = meetingForm.substring(checkboxIdx, closeTag);
    expect(slot).toContain('bookAgree');
    expect(slot).toContain('privacyStatement');
  });
});

describe('MeetingForm :deep() 对齐修复规则验证 (style)', () => {
  it('.calendar-form 作用域内存在 :deep(.o-checkbox.checkbox-doc-usage) 规则', () => {
    expect(styleBlock).toContain(':deep(.o-checkbox.checkbox-doc-usage)');
  });

  it('该规则声明 align-items: flex-start (图标顶端贴齐首行文字顶部)', () => {
    const ruleIdx = styleBlock.indexOf(':deep(.o-checkbox.checkbox-doc-usage)');
    expect(ruleIdx).toBeGreaterThan(-1);
    const braceOpen = styleBlock.indexOf('{', ruleIdx);
    const braceClose = styleBlock.indexOf('}', braceOpen);
    const ruleBody = styleBlock.substring(braceOpen, braceClose);
    expect(ruleBody).toMatch(/align-items\s*:\s*flex-start/);
  });

  it('该规则未使用 !important (rules/styling.md §禁止事项)', () => {
    const ruleIdx = styleBlock.indexOf(':deep(.o-checkbox.checkbox-doc-usage)');
    const braceOpen = styleBlock.indexOf('{', ruleIdx);
    const braceClose = styleBlock.indexOf('}', braceOpen);
    const ruleBody = styleBlock.substring(braceOpen, braceClose);
    expect(ruleBody).not.toContain('!important');
  });

  it('使用 :deep() 而非裸 .o-checkbox 选择器 (rules/styling.md §深度选择器)', () => {
    expect(styleBlock).not.toMatch(/(^|\})\s*\.o-checkbox\.checkbox-doc-usage\s*\{/);
    expect(styleBlock).toContain(':deep(.o-checkbox.checkbox-doc-usage)');
  });

  it('选择器同时限定 .o-checkbox 库类与 .checkbox-doc-usage 业务类 (仅命中本勾选项)', () => {
    const selectors = styleBlock.match(/:deep\(([^)]*)\)/g) || [];
    const checkboxSelectors = selectors.filter((s) => s.includes('o-checkbox'));
    expect(checkboxSelectors).toHaveLength(1);
    expect(checkboxSelectors[0]).toContain('checkbox-doc-usage');
  });
});

describe('MeetingForm 修复规则作用域隔离验证 (no leak)', () => {
  it('该 :deep() 规则位于 .calendar-form { ... } 块内', () => {
    const formBlock = extractBlock(styleBlock, '.calendar-form');
    expect(formBlock).not.toBeNull();
    expect(formBlock!.body).toContain(':deep(.o-checkbox.checkbox-doc-usage)');
  });

  it('该 :deep() 规则未出现在任何 :global(...) 块内 (不污染全局其它弹窗/页面 checkbox)', () => {
    let cursor = 0;
    let globalBlock: string | null = null;
    const globalIdx = styleBlock.indexOf(':global', cursor);
    if (globalIdx !== -1) {
      const braceOpen = styleBlock.indexOf('{', globalIdx);
      const braceClose = styleBlock.indexOf('}', braceOpen);
      globalBlock = styleBlock.substring(braceOpen, braceClose);
    }
    const ruleIdx = styleBlock.indexOf(':deep(.o-checkbox.checkbox-doc-usage)');
    const ruleBraceOpen = styleBlock.indexOf('{', ruleIdx);
    const ruleBraceClose = styleBlock.indexOf('}', ruleBraceOpen);
    const ruleRange = [ruleIdx, ruleBraceClose];

    if (globalBlock) {
      const globalStart = styleBlock.indexOf(':global');
      const globalEnd = styleBlock.indexOf('}', styleBlock.indexOf('{', globalStart));
      const overlaps =
        ruleRange[0] >= globalStart && ruleRange[1] <= globalEnd;
      expect(overlaps).toBe(false);
    }
  });
});

describe('MeetingForm 修复语言无关性验证 (i18n agnostic)', () => {
  it('<style scoped> 内不存在针对 zh / en 的分支样式 (flex-start 对双语一致生效)', () => {
    expect(styleBlock).not.toMatch(/lang\s*===\s*['"]zh['"]/);
    expect(styleBlock).not.toMatch(/lang\s*===\s*['"]en['"]/);
  });

  it('文案语言分支仅存在于 template 句号处,样式块内无 lang 分支', () => {
    expect(styleBlock).not.toContain('lang ===');
  });
});

describe('OpenDesign 库源码未受波及 (only business component override)', () => {
  it('opendesign/checkbox/src/checkbox.scss 仍保留库默认 align-items: center (根因仍在库内)', () => {
    const libScss = readFile(opendesignCheckboxScssPath);
    const rootBlock = extractBlock(libScss, '.o-checkbox');
    expect(rootBlock).not.toBeNull();
    expect(rootBlock!.body).toMatch(/align-items\s*:\s*center/);
  });

  it('opendesign/checkbox/src/checkbox.scss 不含业务类 checkbox-doc-usage (业务类未泄漏进库)', () => {
    const libScss = readFile(opendesignCheckboxScssPath);
    expect(libScss).not.toContain('checkbox-doc-usage');
  });

  it('opendesign/checkbox/src/checkbox.scss 不含 flex-start (库默认对齐未被本次改动改写)', () => {
    const libScss = readFile(opendesignCheckboxScssPath);
    expect(libScss).not.toContain('flex-start');
  });
});
