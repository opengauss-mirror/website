# RAG 专区 / RAG Zone

本目录存放 `/zh/ai/rag/` 和 `/en/ai/rag/` 页面的数据源，由 `OPlusYamlContentVitePlugin` 自动接入 Vite 资源管线。banner / tabs 等专区共享数据见 `../common/`。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（RAG 介绍、软件生态、典型案例） |
| `en.yaml` | 英文页面数据（结构同 `zh.yaml`，文案为英文） |
| `images/` | 页面使用的图片资源（移动端生态总览图，亮/暗主题各一张） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `what_is_rag` | 对象 | “RAG是什么”板块（标题 + 描述） |
| `software_ecosystem` | 对象 | “RAG软件生态”板块（标题、移动端总览图、图例、分类条目） |
| `use_cases` | 对象 | “RAG典型案例”板块（标题 + 案例列表） |

## 设计原则

- 按文件拆分 locale：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- 字段用基线名，无 `_zh` / `_en` 后缀
- 主题变体用 `_light` / `_dark` 区分（`image_light` / `image_dark`，源文件名 `rag-light.png` / `rag-dark.png`）
- 图片就近存放到 `images/` 子目录，`zh.yaml` 和 `en.yaml` 共用同一张图
- `software_ecosystem.categories` 为按分类 id 索引的映射（非数组），组件按固定 DOM 结构取用；栅格布局参数（`layout`）保留在组件内，不入 yaml
- 生态条目 `active` 缺省表示“待支持”；`link` 缺省表示不可点击
- 案例条目（`use_cases.cases`）为纯展示文案 + 链接，不存布局参数

## 消费方式

```ts
import ragContent from '#content/ai/rag';
import { useLocale } from '~@/composables/useLocale';

const { isZh } = useLocale();
const ragData = computed(() => (isZh.value ? ragContent.zh : ragContent.en));
```

## Schema

### what_is_rag

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| description | 是 | 板块描述 |

### software_ecosystem

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| image_light | 是 | 移动端生态总览图（亮色主题） |
| image_dark | 是 | 移动端生态总览图（暗色主题） |
| pc_only_tip | 是 | 移动端提示文案 |
| legend_supported | 是 | 图例“已支持”文案 |
| legend_coming_soon | 是 | 图例“待支持”文案 |
| categories | 是 | 分类映射，key 为分类标识（applications / evaluation / om_tools / knowledge_engineering / data_sources / orchestration_frameworks / llms / compute_architecture / cloud_native / os / hardware） |

### software_ecosystem.categories.<id>

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 分类名称 |
| items | 是 | 分类下的条目列表 |

### software_ecosystem.categories.<id>.items[]

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 条目名称 |
| active | 否 | 是否已支持，缺省为待支持 |
| link | 否 | 条目跳转链接 |

### use_cases

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | 板块标题 |
| cases | 是 | 案例列表 |

### use_cases.cases[]

| 字段 | 必填 | 说明 |
|------|------|------|
| label | 是 | 案例标题 |
| href | 是 | 案例链接 |
