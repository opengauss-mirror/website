# openGauss Website — Agent 指南

> 本文件是所有 AI 编码工具（Claude Code、OpenCode、Cursor、Codex、Trae 等）在本仓工作的**唯一入口**，
> 遵循 [agents.md](https://agents.md) 开放标准。详细规则在仓库根 `rules/`，本文件以相对链接索引，任何工具均可按需 Read。

---

## 1. 项目速览

[openGauss 社区官网](https://opengauss.org/)，基于 **VitePress** 构建（Vue 3 + TypeScript）。
大部分页面纯静态渲染，少数模块（日历、CVE、搜索、筛选）依赖后端接口。

| 类别 | 选型 |
|------|------|
| 框架 | VitePress（`.md` 页面 + Vue 组件 + theme） |
| 语言 | TypeScript |
| 包管理器 | **pnpm**（`pnpm-workspace.yaml`） |
| UI 组件库 | `@opensig/opendesign` + `@opendesign-plus/*` + Element Plus（本地软链 `./opendesign`） |
| 状态管理 | Pinia |
| 国际化 | vue-i18n（`zh` / `en` / 部分 `ru`，双语必须同步） |
| HTTP | axios（`src*/api/api-*.ts`） |
| 样式 | SCSS + OpenDesign token（`--o-*` CSS 变量） |
| 测试 | Vitest（单测）+ Playwright（e2e） |
| 代码检查 | ESLint + Prettier + StyleLint |

### 常用命令

| 命令 | 用途 |
|------|------|
| `pnpm dev` | 启动开发服务器（VitePress） |
| `pnpm build` | 生产构建（先 `gen:blogs` / `gen:news`） |
| `pnpm lint` / `pnpm fix` | ESLint 检查 / 修复 |
| `pnpm test:unit` / `pnpm test:cov` | 单元测试 / 覆盖率 |
| `pnpm test:e2e` | Playwright e2e |

---

## 2. 目录结构

```
openGauss-website/
├── .geo/
│   ├── tdks/                         # SEO：按路径查找的TDK配置项（/{zh,en}/path/to/page/index.json）
│   └── jsonld/                       # SEO：按路径查找的JSON-LD配置项（/{zh,en}/path/to/page/index.json）
├── app/
│   ├── zh/ , en/                    # md 页面（双语镜像）
│   └── .vitepress/
│       ├── config.ts                # 入口配置 + transformPageData（SEO/TDK 注入钩子）
│       ├── src/                     # 旧版源码（兼容，禁止新增引用）
│       │   ├── api/ assets/ components/ i18n/ layouts/ shared/ stores/ views/
│       │   └── ...
│       └── src-new/                 # 新版源码（所有新功能必须用此路径）
│           ├── api/ @types/ components/ composables/ i18n/ stores/ utils/ views/
│           └── tokens/
├── .agents/                         # AI 技能（Skills，按需 Read）
│   └── skills/
│       └── frontmatter-data-extractor/  # 将硬编码静态配置数据提取为 .content/ 下的 yaml
├── scripts/                         # gen:blogs / gen:news / 事件 frontmatter 预处理
├── rules/                           # 代码规范（工具无关，本文件索引）
└── AGENTS.md                        # 本文件
```

### 路径别名

| 别名 | 实际路径 | 用途 |
|------|---------|------|
| `~@/` | `app/.vitepress/src-new/` | 新版（推荐，所有新功能） |
| `@/` | `app/.vitepress/src/` | 旧版（兼容，禁止新增引用） |
| `opendesign` | `./opendesign` | 本地 OpenDesign 组件库 |

---

## 3. SEO / GEO 机制

### 3.1 TDK / JSON-LD

TDK（title / description / keywords）由 `app/.vitepress/config.ts` 的 `transformPageData` 钩子，按页面路由从 `.geo/tdks/{page path}/index.json` 查找注入；

JSON-LD 由 `app/.vitepress/config.ts` 的 `transformPageData` 钩子，按页面路由从 `.geo/jsonld/{page path}/index.json` 查找注入；

文章类页面（news / blogs / events / user-practice）的TDK / JSON-LD不在 `.geo` 目录中归档，构建时由 `app/.vitepress/scripts/generate-tdk-schema-for-articles.ts` 脚本从frontmatter中提取属性数据生成，由 `app/.vitepress/config.ts` 的 `transformPageData` 调用。

**注意**

- 加 / 改某页 TDK → 改 `.geo/tdks/path/to/page/index.json` 对应JSON配置文件（**双语同步**）
- TDK / JSON-LD 的内容需分析具体页面内容后生成，禁止出现页面中不存在的描述、概念和数据
- JSON-LD 中若有数据包含当前站点页面的url，需注意文件路径与对应url路径的结尾规则映射：`/zh/page/a.md` -> `/zh/page/a.html`， `/zh/page/b/index.md` -> `/zh/page/b/`
- 页面路由与JSON配置文件映射关系：1. `/zh/about/` 或 `/zh/about.html` 或 `/zh/about/index.html` -> `.geo/{tdk,jsonld}/zh/about/index.json`
- 不要在 Vue 组件里手动写 `<title>` / `<meta description>` 与之重复
- user-practice 类页面的 markdown 文件的 frontmatter 中的 title、description 等属性的值，不要直接修改，除非用户明确要求要改

### 3.2 Sitemap

由 `app/.vitepress/config.ts` 的 `sitemap` 配置，构建时框架自动生成，使用了 `generateLastmodAndChangefreq` 插件分析页面的文件依赖关系，计算出每个页面真实的 `lastmod` 和 `changefreq` 值，记录到 `.geo/sitemap-records.json` ，在 `sitemap.transformItems` 钩子中读取后为每个sitemap项设置

`sitemap-records.json` 内容示例：

```json
{
  "/zh/about.md": {
    "lastmod": 1783330323830,
    "changefreq": "weekly"
  }
}
```

**注意**

- 修改 sitemap 条目的属性数据：在`app/.vitepress/config.ts` 的 `sitemap.transformItems` 函数中修改

### 3.3 llms.txt / llms-full.txt

llms.txt由脚本 `scripts/generate-llms-txt.js` 生成，由 `packages.json` 的 `scripts.postbuild` 调用

llms-full.txt由脚本 `app/.vitepress/config.ts` 的 `buildEnd` 钩子调用 `generateLLMsFull` 在构建结束自动生成

---

## 4. 代码规范（必读）

详细规则放在仓库根 `rules/`，按需 Read：

| 规范领域 | 文件 |
|---------|------|
| 命名约定 | [rules/naming.md](rules/naming.md) |
| 组件规范 | [rules/components.md](rules/components.md) |
| TypeScript 规范 | [rules/typescript.md](rules/typescript.md) |
| API 与状态 | [rules/api-and-state.md](rules/api-and-state.md) |
| 样式规范 | [rules/styling.md](rules/styling.md) |
| 架构规范 | [rules/architecture.md](rules/architecture.md) |
| Git 工作流 | [rules/git.md](rules/git.md) |

### Skills（AI 技能，按需 Read）

| 技能 | 文件 | 触发场景 |
|------|------|---------|
| frontmatter-data-extractor | [.agents/skills/frontmatter-data-extractor/SKILL.md](.agents/skills/frontmatter-data-extractor/SKILL.md) | 将 Vue 组件 / TS 数据文件中硬编码的静态配置型数据（文案、链接、图片路径、轮播实体等）提取为 `.content/` 下的 yaml；触发词："提取数据到 yaml"、"把数据转到 .content"、"数据外置"、"yaml 数据化"、"把页面数据提取到 yaml 里" |

### 红线（最高频踩坑）

1. **新功能只用 `~@/` 别名**（`@/` 是旧版兼容路径，禁止新增引用）。
2. **优先用 OpenDesign / Element Plus 组件**，存在对应组件的场景禁止用原生 HTML 替代；覆盖样式用 `:deep()`。
3. **Vue API 必须显式 import**（VitePress 无自动注入）：`import { ref, computed } from 'vue'`。
4. **API 调用必须 `try/catch` + `loading`**；接口方法集中在 `api/api-*.ts` 并带 JSDoc。
5. **样式用 CSS 变量**（`var(--o-*)`），禁止硬编码颜色 / 断点；禁止 `!important`、禁止 SCSS 嵌套 > 3 层。
6. **SSR 安全**：`window` / `document` 只能在 `onMounted` 内访问。
7. **i18n 双语同步**：改文案必须同时改 zh / en（涉及 ru 时一并）。
8. **类型命名约定**：`XxxItemT` / `XxxListT` / `XxxDetailT` / `XxxQueryT`。
9. **数据源定位**：页面静态数据源位于 `.content/` 目录下的 YAML 文件，经 `src-new/data/<模块>/content-bridge.ts` 映射到组件；修改数据字段须先改 YAML 源，再同步改 bridge 映射，不要将 bridge 或组件内硬编码误认为数据源头（详见 [rules/architecture.md](rules/architecture.md)）。

---

## 5. 提交前检查

- [ ] `pnpm lint` 无 error（git hooks 已配 husky 校验）
- [ ] `pnpm build` 构建无报错
- [ ] zh / en 双语页面均已验证（涉及 i18n 时）
- [ ] 无 `console.log` / `debugger` 残留
- [ ] commit 信息符合 `type(scope): 描述`；每个 PR 用 `git rebase -i` 压成单 commit
