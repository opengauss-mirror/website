import { JSDOM } from 'jsdom';
import createDOMPurify from 'dompurify';
import type { MarkdownEnv, MarkdownRenderer } from 'vitepress';

/**
 * 正文内容清洗插件。
 *
 * 调用方经 options.scope 传入 RegExp 定义受清洗作用域(匹配 env.relativePath);
 * 未传则不启用清洗(no-op)。受清洗作用域的 html_block/html_inline 过 DOMPurify 白名单:
 * 剥 <script>、on* 事件、iframe、javascript: 等 XSS;Vue 组件与 :/@/v- 绑定不在白名单一并剥
 * (纯内容策略)。非作用域委托 sfcPlugin 原规则,保留页面型 md 的组件能力。
 */

interface SanitizePluginOptions {
  scope?: RegExp;
}

const ALLOWED_TAGS = [
  // 块级
  'div', 'p', 'br', 'hr', 'blockquote', 'pre',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'ul', 'ol', 'li', 'dl', 'dt', 'dd',
  // 表格
  'table', 'thead', 'tbody', 'tfoot', 'tr', 'td', 'th', 'caption', 'colgroup', 'col',
  // 行内
  'span', 'a', 'img', 'b', 'strong', 'i', 'em', 'u', 's', 'del', 'ins', 'mark',
  'small', 'sub', 'sup', 'code', 'abbr', 'cite', 'q', 'time',
  // 媒体
  'video', 'audio', 'source', 'figure', 'figcaption',
];

const ALLOWED_ATTR = [
  'src', 'href', 'alt', 'title', 'style', 'class', 'id',
  'width', 'height', 'colspan', 'rowspan',
  'target', 'rel', 'controls', 'preload', 'poster', 'loop', 'muted', 'autoplay', 'datetime', 'name',
];

let _purify: ReturnType<typeof createDOMPurify> | null = null;

function getPurify() {
  if (_purify) return _purify;
  const window = new JSDOM('').window;
  _purify = createDOMPurify(window);
  return _purify;
}

export function sanitizeInlineHtml(html: string): string {
  return getPurify().sanitize(html, {
    ALLOWED_TAGS,
    ALLOWED_ATTR,
    ALLOW_DATA_ATTR: false,
  });
}

export function isSanitizeScope(env: unknown, scope?: RegExp): boolean {
  if (!scope) return false;
  const rel = (env as MarkdownEnv | null | undefined)?.relativePath;
  return !!rel && scope.test(rel);
}

export function sanitizeMarkdownPlugin(md: MarkdownRenderer, options: SanitizePluginOptions = {}): void {
  if (!options.scope) return;
  const scope = options.scope;
  const inScope = (env: unknown) => isSanitizeScope(env, scope);
  const sfcHtmlBlock = md.renderer.rules.html_block;
  const sfcHtmlInline = md.renderer.rules.html_inline;

  md.renderer.rules.html_block = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    if (inScope(env)) {
      return sanitizeInlineHtml(token.content);
    }
    return sfcHtmlBlock ? sfcHtmlBlock(tokens, idx, opts, env, self) : token.content;
  };

  md.renderer.rules.html_inline = (tokens, idx, opts, env, self) => {
    const token = tokens[idx];
    if (inScope(env)) {
      return sanitizeInlineHtml(token.content);
    }
    return sfcHtmlInline ? sfcHtmlInline(tokens, idx, opts, env, self) : token.content;
  };
}
