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
| `pnpm build` | 生产构建（先 `sync:blogs` / `gen:news`） |
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

## 3. SEO/GEO 机制

SEO/GEO 各维度**规范与配套 skill 统一来源于规范仓库 [opensourceways/daily-check-workflow](https://github.com/opensourceways/daily-check-workflow) 的 `specifications` 分支**，通过脚本同步进本仓库；禁止另行维护本地副本或凭记忆改规范。做 robots.txt / llms.txt / sitemap / JSON-LD / TDK / a 标签 / 标签结构 / img-alt / 内链 / HTML 语义化相关任务前，先同步，再按 `rules/seo-geo/` 对应维度执行。

> 页面 title 实现细节：网站首页的 title 固定为中文（`/zh/`） -> `openGauss社区官网 | 企业级开源多模数据库`，英文（`/en/`） -> `openGauss Community Website | Enterprise-Grade Open-Source Multi-Model Database`，其他页面的 title 按 `页面主题 | 模块 or 补充说明 | openGauss社区官网（openGauss Community Website）` 的格式设置。

### 3.1 同步脚本

| 命令 | 说明 |
|------|------|
| `pnpm geo-specs:sync` | 运行 [scripts/sync-seo-geo-specs.js](./scripts/sync-seo-geo-specs.js)：浅克隆 `specifications` 分支 → 覆盖式同步规范与 skills + html-tools 全局工具（幂等，可重复执行）；已接入 `postinstall`，`pnpm install` 时自动跑 |
| `pnpm geo-specs:sync -- --disable-sync-tools` | 只同步规范/skills，跳过 html-tools 全局工具同步与安装（`CI=true` 时整脚本本就跳过） |

落点规则：

- **规范文档**：各 `{NN-name}/specification.md`（规范）与 `{NN-name}/implementation.md`（构建时落地实现方式）→ 复制到 `rules/seo-geo/{NN-name}/`（目录不存在则新建）
- **skills**：各维度 `skills/`（兼容单数 `skill/`）下含 `SKILL.md` 的目录 → 复制到本项目的 skills 目标目录；脚本按 `.claude/skills → .opencode/skills → .agents/skills` 顺序取**第一个已存在**的目录（本项目命中 `.claude/skills/`），三者都不存在时新建 `.agents/skills/`；skill 目录名取 `SKILL.md` frontmatter 的 `name`
- **html-tools**：仓库根 `html-tools/`（`to-md-snapshot` / `calc-content-fit` 脚本包，fix-tdk 等 skill 的运行时工具）→ 复制到用户级全局目录 `~/.seo-geo/html-tools`（跨项目共享，保留已装 node_modules），随后 `pnpm install` 并 `pnpm add -g` 注册全局命令；各步失败仅 warn

环境变量：

| 变量 | 作用 |
|------|------|
| `SEO_GEO_SPECS_REPO` / `SEO_GEO_SPECS_REF` | 覆盖仓库地址 / 分支（默认 daily-check-workflow / `specifications`） |
| `SEO_GEO_TOOLS_DIR` | 覆盖 html-tools 全局工具目录（默认 `~/.seo-geo/html-tools`） |
| `SEO_GEO_SYNC_SKIP=1` 或 `CI=true` | 跳过同步（CI / 离线环境） |
| `SEO_GEO_SYNC_STRICT=1` | 失败时退出码 1（默认 graceful，仅 warn 不阻塞 install/dev） |

### 3.2 维度目录索引（`rules/seo-geo/`）

| 维度 | 内容 |
|------|------|
| 01-robots-txt | robots.txt 规范 |
| 02-llms-txt | llms.txt / llms-full.txt 规范（附 `llms-txt-deploy` skill） |
| 03-sitemap | sitemap 规范 + VitePress/Nuxt 构建时生成实现 |
| 04-json-ld | JSON-LD 规范 + 构建时注入实现 |
| 05-tdk | TDK 规范 + 构建时注入实现（附 `fix-tdk` skill） |
| 06-a-tag-semantics | `<a>` 标签语义化规范 |
| 07-tag-structure-semantics | 标签结构语义化规范 |
| 08-image-alt | img alt 规范（附 `img-alt-fix` skill） |
| 09-internal-link | 内链规范（附内链分析 skill） |

上游后续新增的维度/skill 由 `pnpm geo-specs:sync` 自动带入，以实际同步输出为准。

### 3.3 TDK / 结构化数据 / sitemap lastmod 数据注入机制

本项目 `.geo/` 目录（TDK / JSON-LD / last-modified）是构建时注入的数据源：注入机制为 `app/.vitepress/config.ts` 的 `transformPageData` + Vite 插件，具体参考 `rules/seo-geo/` 中 `04-json-ld`、`05-tdk` 等维度的 specification.md 。

### 3.4 llms.txt / llms-full.txt

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
