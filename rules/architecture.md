# 架构规范

## 双目录结构

本仓存在两套业务源码目录，改动时须同步评估两侧：

| 目录 | 别名 | 用途 | 规则 |
|------|------|------|------|
| `app/.vitepress/src/` | `@/` | 旧版兼容 | 禁止新增引用，仅做存量维护 |
| `app/.vitepress/src-new/` | `~@/` | 新版 | 所有新功能必须用此路径 |

**同一业务模块可能两侧都有实现**（如下载页 `src/views/download/` 与 `src-new/views/download/`），改动时须检查两侧是否都需同步修改，避免遗漏。

---

## 内容数据层：`.content/` YAML → bridge → 组件

页面静态配置型数据（版本列表、活动列表、Banner 等）**不在** `src-new/data/` 中硬编码，而是通过三层链路流转：

```
.content/<模块>/<数据文件>.yaml   →   src-new/data/<模块>/content-bridge.ts   →   Vue 组件
      (YAML 数据源)                      (字段映射 + 语言折叠)                 (消费数据)
```

### 数据源定位规则

> **修改数据字段时，须先定位 `.content/` 中的 YAML 源文件，再同步修改 bridge 映射。**
> 不要将 bridge 文件或组件内硬编码数据误认为数据源头。

**踩过的坑**：设计文档将 `isLogin` 字段定位为 `src-new/data/download/index.ts`（该文件不存在），实际数据源是 `.content/download/versions.yaml` 中的 `is_login: true`，经 `content-bridge.ts` 映射为 `isLogin: meta.is_login`。如果只改 bridge 不改 YAML，数据不会变化；如果只改 YAML 不改 bridge，字段映射会残留。

### `.content/` 目录结构

```
.content/
├── activity/list.yaml          # 活动列表
├── certification/zh.yaml, en.yaml  # 认证页面
├── compatibility/zh.yaml, en.yaml  # 兼容性页面
├── download/
│   ├── versions.yaml           # 下载版本元数据（含 is_login、data_file 等）
│   └── versions/               # 各版本详情数据
│       ├── download7.0.0-RC3.yaml
│       ├── download6.0.5.yaml
│       └── ...
├── home/banner.yaml            # 首页 Banner
├── honor/zh.yaml, en.yaml      # 荣誉页面
├── ogsp/zh.yaml, en.yaml       # OGSP 页面
├── tools/zh.yaml, en.yaml      # 工具页面
└── video/zh.yaml, en.yaml      # 视频页面
```

### bridge 文件职责

- `content-bridge.ts`：从 YAML 导入数据（`#content/<模块>` 虚拟模块），执行字段映射（如 `is_login` → `isLogin`）、语言折叠（`title_zh`/`title_en` → `title`）、占位符替换
- bridge 是**映射层**，不是数据源；修改字段名 / 增删字段时，须同时修改 YAML 源和 bridge 映射

### 示例：下载页 `isLogin` 字段

```
YAML 源：.content/download/versions.yaml
  is_login: true

Bridge 映射：src-new/data/download/content-bridge.ts
  isLogin: meta.is_login

组件消费：src-new/views/download/TheDownload.vue
  getPermissionList = DownloadConfig.filter(el.isLogin)
```

移除 `isLogin` 需同时修改：1) `.content/download/versions.yaml` 中删除 `is_login` 字段；2) `content-bridge.ts` 中删除 `isLogin` 映射；3) 组件中删除 `isLogin` 相关逻辑。

---

## i18n 双语同步

修改 i18n 键时，zh / en 必须成对增删，禁止只改一侧导致另一侧缺失。详见 [portal-frontend-common.md §三](portal-frontend-common.md)。

---

## 登录 / 鉴权基础设施保留原则

本仓登录基础设施（`shared/login.ts`、`stores/user.ts`、`api-login.ts`、`api-user.ts`）为多页面共用，**仅移除业务层拦截逻辑，不删除登录基础设施本身**。

- ✅ 移除：组件中的登录弹窗、条件渲染、`downloadVersionAuth` / `PERMISSION_LIST` 传递链
- ✅ 移除：YAML 数据源中的 `is_login` 字段、bridge 中的 `isLogin` 映射
- ❌ 不删：`shared/login.ts`、`stores/user.ts`、`api-login.ts` 等基础设施文件（其他页面仍使用）
