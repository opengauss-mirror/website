# Agent 专区 / Agent Zone

本目录存放 `/zh/ai/agent/` 和 `/en/ai/agent/` 页面的数据源，由 `OPlusYamlContentVitePlugin` 自动接入 Vite 资源管线。banner / tabs 等专区共享数据见 `../common/`。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（生态全景图） |
| `en.yaml` | 英文页面数据（结构同 `zh.yaml`，文案为英文） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `ecosystem_map` | 对象 | “Agent专区生态全景图”板块（标题、图例、分类条目，支持两级嵌套） |

## 设计原则

- 按文件拆分 locale：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- 字段用基线名，无 `_zh` / `_en` 后缀
- `ecosystem_map.categories` 为数组（按页面从上到下排列），每项带 `id` 标识；组件按 `id` 匹配栅格布局（如 `dev_orchestration_frameworks` 为 `[4, 3]`，其余默认 `[1]`），布局参数不入 yaml
- 分类节点为 `items`（普通分类）与 `children`（含子分类，如“运行时与基础设施”）二选一
- 生态条目 `active` 缺省表示“待支持”；`link` 缺省表示不可点击
- 条目名称多为产品/框架专有名词（LangGraph、vLLM 等），zh/en 相同

## 消费方式

```ts
import agentContent from '#content/ai/agent';
import { useLocale } from '~@/composables/useLocale';

const { isZh } = useLocale();
const agentData = computed(() => (isZh.value ? agentContent.zh : agentContent.en));
```

## Schema

### ecosystem_map

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| legend_supported | 是 | 图例“已支持”文案 |
| legend_coming_soon | 是 | 图例“待支持”文案 |
| categories | 是 | 分类列表（数组，按视觉顺序） |

### ecosystem_map.categories[]

| 字段 | 必填 | 说明 |
|------|------|------|
| id | 是 | 分类标识（applications / dev_orchestration_frameworks / runtime_infrastructure / compute_architecture / cloud_native / os / hardware；子分类 model_serving / memory_storage / tools_protocols） |
| name | 是 | 分类名称 |
| items | 否 | 条目列表（与 children 二选一） |
| children | 否 | 子分类列表（结构同 categories[]，叶子节点使用 items） |

### items[]

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 条目名称 |
| active | 否 | 是否已支持，缺省为待支持 |
| link | 否 | 条目跳转链接 |
