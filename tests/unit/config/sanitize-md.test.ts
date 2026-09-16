import { expect, describe, it } from 'vitest';
import MarkdownIt from 'markdown-it';
import {
  sanitizeInlineHtml,
  isSanitizeScope,
  sanitizeMarkdownPlugin,
} from '../../../app/.vitepress/scripts/sanitize-md';

// 与 app/.vitepress/config.ts 中传入插件的作用域保持一致
const SCOPE = /^(?:zh|en)[/\\](?:news|blogs)[/\\][^/\\]+[/\\].*\.md$/;

const NEWS_ENV = { relativePath: 'zh/news/2026-06-03/xxx.md' };

function createMd(scope?: RegExp) {
  const md = new MarkdownIt({ html: true });
  sanitizeMarkdownPlugin(md, scope ? { scope } : {});
  return md;
}

describe('sanitizeInlineHtml', () => {
  it('剥除 <script> 标签及其内容', () => {
    const out = sanitizeInlineHtml('<p>ok</p><script>alert(1)</script>');
    expect(out).not.toContain('<script');
    expect(out).not.toContain('alert(1)');
    expect(out).toContain('<p>ok</p>');
  });

  it('剥除 on* 事件属性', () => {
    expect(sanitizeInlineHtml('<img src="x.png" onerror="alert(1)">')).not.toContain('onerror');
    expect(sanitizeInlineHtml('<div onclick="alert(1)">点我</div>')).not.toContain('onclick');
    expect(sanitizeInlineHtml('<div onclick="alert(1)">点我</div>')).toContain('点我');
  });

  it('剥除 javascript: 协议链接', () => {
    const out = sanitizeInlineHtml('<a href="javascript:alert(1)">链接</a>');
    expect(out).not.toContain('javascript:');
    expect(out).toContain('链接');
  });

  it('剥除 iframe', () => {
    const out = sanitizeInlineHtml('<iframe src="https://evil.com"></iframe>');
    expect(out).not.toContain('iframe');
    expect(out).not.toContain('evil.com');
  });

  it('剥除 Vue 组件与 :/@/v- 绑定', () => {
    const out = sanitizeInlineHtml('<MyCard :title="x" @click="go" v-if="ok">内容</MyCard>');
    expect(out).not.toContain('MyCard');
    expect(out).not.toContain(':title');
    expect(out).not.toContain('@click');
    expect(out).not.toContain('v-if');
    expect(out).toContain('内容');
  });

  it('剥除 data-* 属性', () => {
    const out = sanitizeInlineHtml('<div data-id="1" class="box">x</div>');
    expect(out).not.toContain('data-id');
    expect(out).toContain('class="box"');
  });

  it('保留白名单标签与属性', () => {
    const out = sanitizeInlineHtml(
      '<a href="https://example.com" target="_blank" rel="noopener">链接</a>' +
        '<img src="a.png" alt="图片" width="100">' +
        '<table><tr><td colspan="2">1</td></tr></table>' +
        '<video src="a.mp4" controls></video>'
    );
    expect(out).toContain('href="https://example.com"');
    expect(out).toContain('target="_blank"');
    expect(out).toContain('rel="noopener"');
    expect(out).toContain('src="a.png"');
    expect(out).toContain('alt="图片"');
    expect(out).toContain('<table>');
    expect(out).toContain('<td colspan="2">');
    expect(out).toContain('<video');
    expect(out).toContain('controls');
  });
});

describe('isSanitizeScope', () => {
  it('未传 scope 时不启用清洗', () => {
    expect(isSanitizeScope(NEWS_ENV)).toBe(false);
    expect(isSanitizeScope(NEWS_ENV, undefined)).toBe(false);
  });

  it('env 缺失或无 relativePath 时不在作用域', () => {
    expect(isSanitizeScope({}, SCOPE)).toBe(false);
    expect(isSanitizeScope(null, SCOPE)).toBe(false);
    expect(isSanitizeScope(undefined, SCOPE)).toBe(false);
  });

  it('新闻/博客正文路径命中作用域', () => {
    expect(isSanitizeScope({ relativePath: 'zh/news/2026-06-03/foo.md' }, SCOPE)).toBe(true);
    expect(isSanitizeScope({ relativePath: 'en/blogs/2022/bar.md' }, SCOPE)).toBe(true);
  });

  it('兼容 Windows 路径分隔符', () => {
    expect(isSanitizeScope({ relativePath: 'zh\\news\\2026\\foo.md' }, SCOPE)).toBe(true);
  });

  it('非新闻/博客正文路径不命中', () => {
    expect(isSanitizeScope({ relativePath: 'zh/about/index.md' }, SCOPE)).toBe(false);
    expect(isSanitizeScope({ relativePath: 'zh/news/foo.md' }, SCOPE)).toBe(false);
    expect(isSanitizeScope({ relativePath: 'ru/news/2026/foo.md' }, SCOPE)).toBe(false);
    expect(isSanitizeScope({ relativePath: 'zh/blogs/list.vue' }, SCOPE)).toBe(false);
  });
});

describe('sanitizeMarkdownPlugin', () => {
  it('未传 scope 时为 no-op,不接管渲染规则', () => {
    const md = new MarkdownIt({ html: true });
    const before = md.renderer.rules.html_block;
    sanitizeMarkdownPlugin(md);
    expect(md.renderer.rules.html_block).toBe(before);
    expect(md.render('<script>alert(1)</script>\n', NEWS_ENV)).toContain('<script>');
  });

  it('作用域内 html_block 被清洗', () => {
    const md = createMd(SCOPE);
    const out = md.render('<script>alert(1)</script>\n', NEWS_ENV);
    expect(out).not.toContain('<script');
    expect(out).not.toContain('alert(1)');
  });

  it('作用域内 html_inline 被清洗', () => {
    const md = createMd(SCOPE);
    const out = md.render('你好 <img src="x.png" onerror="alert(1)"> 世界', NEWS_ENV);
    expect(out).not.toContain('onerror');
    expect(out).toContain('<img src="x.png">');
  });

  it('作用域内白名单 HTML 原样保留', () => {
    const md = createMd(SCOPE);
    const out = md.render('<video src="a.mp4" controls></video>\n', NEWS_ENV);
    expect(out).toContain('src="a.mp4"');
    expect(out).toContain('controls');
  });

  it('作用域外内容原样透传,保留组件能力', () => {
    const md = createMd(SCOPE);
    const out = md.render('<MyCard :title="x" />\n', { relativePath: 'zh/about/index.md' });
    expect(out).toContain('MyCard');
    expect(out).toContain(':title');
  });

  it('普通 markdown 语法与代码块内容不受影响', () => {
    const md = createMd(SCOPE);
    const out = md.render(
      '# 标题\n\n[链接](https://example.com)\n\n```html\n<div onclick="alert(1)">code</div>\n```\n',
      NEWS_ENV
    );
    expect(out).toContain('<h1>标题</h1>');
    expect(out).toContain('<a href="https://example.com">链接</a>');
    expect(out).toContain('&lt;div onclick=&quot;alert(1)&quot;&gt;code&lt;/div&gt;');
  });
});
