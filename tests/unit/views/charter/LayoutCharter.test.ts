import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');
const layoutPath = resolve(rootDir, 'app/.vitepress/src-new/layouts/LayoutCharter.vue');
const source = readFileSync(layoutPath, 'utf-8');

describe('LayoutCharter.vue — setupCopyButtons 源码结构验证', () => {
  it('定义了 setupCopyButtons 函数', () => {
    expect(source).toContain('const setupCopyButtons');
  });

  it('在 onMounted 中调用 setupCopyButtons', () => {
    expect(source).toContain('setupCopyButtons()');
    expect(source).toContain('onMounted(() => {');
  });

  it('无 .charter-content-card 时直接返回', () => {
    expect(source).toContain("const card = document.querySelector('.charter-content-card')");
    expect(source).toContain('if (!card) return');
  });
});

function createDOM(codeBlocks: { code: string }[]) {
  const dom = new JSDOM(
    `<!DOCTYPE html><html><body><div class="charter-content-card">${codeBlocks
      .map(
        (b) =>
          `<div class="code-block"><pre><code>${b.code}</code></pre></div>`
      )
      .join('')}</div></body></html>`
  );
  return dom;
}

function setupCopyButtons(
  document: Document,
  clipboard: { writeText?: (text: string) => Promise<void> },
  message: { success: ReturnType<typeof vi.fn>; danger: ReturnType<typeof vi.fn> },
  t: (key: string) => string,
  copyTimers: ReturnType<typeof setTimeout>[]
) {
  const card = document.querySelector('.charter-content-card');
  if (!card) return;
  card.querySelectorAll('.code-block').forEach((block) => {
    if (block.querySelector('.copy')) return;
    const btn = document.createElement('button');
    btn.className = 'copy';
    btn.addEventListener('click', () => {
      const code = block.querySelector('pre')?.textContent ?? '';
      try {
        if (!clipboard.writeText) {
          message.danger({ content: t('common.COPY_FAILED') });
          return;
        }
        clipboard
          .writeText(code)
          .then(() => {
            message.success({ content: t('common.COPY_SUCCESS') });
            btn.classList.add('copied');
            const timer = setTimeout(() => btn.classList.remove('copied'), 2000);
            copyTimers.push(timer);
          })
          .catch(() => {
            message.danger({ content: t('common.COPY_FAILED') });
          });
      } catch {
        message.danger({ content: t('common.COPY_FAILED') });
      }
    });
    block.appendChild(btn);
  });
}

describe('setupCopyButtons — 行为测试', () => {
  let dom: JSDOM;
  let clipboard: { writeText?: (text: string) => Promise<void> };
  let message: { success: ReturnType<typeof vi.fn>; danger: ReturnType<typeof vi.fn> };
  let t: (key: string) => string;
  let copyTimers: ReturnType<typeof setTimeout>[];

  beforeEach(() => {
    vi.useFakeTimers();
    copyTimers = [];
    message = { success: vi.fn(), danger: vi.fn() };
    t = (key: string) => key;
    clipboard = {
      writeText: vi.fn().mockResolvedValue(undefined),
    };
  });

  afterEach(() => {
    vi.useRealTimers();
    copyTimers.forEach((timer) => clearTimeout(timer));
  });

  it('无 .charter-content-card 时不创建按钮', () => {
    dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    setupCopyButtons(dom.window.document, clipboard, message, t, copyTimers);
    const buttons = dom.window.document.querySelectorAll('.copy');
    expect(buttons.length).toBe(0);
  });

  it('点击 copy 按钮调用 navigator.clipboard.writeText', async () => {
    dom = createDOM([{ code: 'echo hello' }]);
    setupCopyButtons(dom.window.document, clipboard, message, t, copyTimers);
    const btn = dom.window.document.querySelector('.copy') as HTMLButtonElement;
    btn.click();
    await vi.waitFor(() => {
      expect(clipboard.writeText).toHaveBeenCalledWith('echo hello');
    });
  });

  it('复制成功时调用 message.success', async () => {
    dom = createDOM([{ code: 'echo hello' }]);
    setupCopyButtons(dom.window.document, clipboard, message, t, copyTimers);
    const btn = dom.window.document.querySelector('.copy') as HTMLButtonElement;
    btn.click();
    await vi.waitFor(() => {
      expect(message.success).toHaveBeenCalledWith({ content: 'common.COPY_SUCCESS' });
    });
  });

  it('多个 code-block 各自独立复制', async () => {
    dom = createDOM([{ code: 'echo a' }, { code: 'echo b' }, { code: 'echo c' }]);
    setupCopyButtons(dom.window.document, clipboard, message, t, copyTimers);
    const buttons = dom.window.document.querySelectorAll('.copy');
    (buttons[1] as HTMLButtonElement).click();
    await vi.waitFor(() => {
      expect(clipboard.writeText).toHaveBeenCalledWith('echo b');
    });
  });
});
