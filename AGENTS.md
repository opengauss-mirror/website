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

TDK（title / description / keywords）由 `app/.vitepress/config.ts` 的 `transformPageData` 钩子，
按页面路由从 `.geo/tdks/{page path}.ts` 查找注入；blog 类页面回退到 frontmatter 的 `summary`。

- 加 / 改某页 TDK → 改 `.geo/tdks/path/to/page/index.json` 对应JSON配置文件（**双语同步**）
- 页面路由与JSON配置文件映射关系：1. `/zh/about` 或 `/zh/about.html` 或 `/zh/about/index.html` -> `.geo/{tdk,jsonld}/zh/about/index.json`
- 不要在 Vue 组件里手动写 `<title>` / `<meta description>` 与之重复
- GEO/SEO 可发现性优化由 portal-workflow 的 geo-fix 链路负责，日常需求**默认不动** `.geo/tdks/` 与 sitemap 配置

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
| Git 工作流 | [rules/git.md](rules/git.md) |

### 红线（最高频踩坑）

1. **新功能只用 `~@/` 别名**（`@/` 是旧版兼容路径，禁止新增引用）。
2. **优先用 OpenDesign / Element Plus 组件**，存在对应组件的场景禁止用原生 HTML 替代；覆盖样式用 `:deep()`。
3. **Vue API 必须显式 import**（VitePress 无自动注入）：`import { ref, computed } from 'vue'`。
4. **API 调用必须 `try/catch` + `loading`**；接口方法集中在 `api/api-*.ts` 并带 JSDoc。
5. **样式用 CSS 变量**（`var(--o-*)`），禁止硬编码颜色 / 断点；禁止 `!important`、禁止 SCSS 嵌套 > 3 层。
6. **SSR 安全**：`window` / `document` 只能在 `onMounted` 内访问。
7. **i18n 双语同步**：改文案必须同时改 zh / en（涉及 ru 时一并）。
8. **类型命名约定**：`XxxItemT` / `XxxListT` / `XxxDetailT` / `XxxQueryT`。

---

## 5. 提交前检查

- [ ] `pnpm lint` 无 error（git hooks 已配 husky 校验）
- [ ] `pnpm build` 构建无报错
- [ ] zh / en 双语页面均已验证（涉及 i18n 时）
- [ ] 无 `console.log` / `debugger` 残留
- [ ] commit 信息符合 `type(scope): 描述`；每个 PR 用 `git rebase -i` 压成单 commit
