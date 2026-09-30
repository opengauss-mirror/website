# AI 专区共享数据 / AI Zone Shared Data

本目录存放 AI 专区下 `/zh|en/ai/agent/` 与 `/zh|en/ai/rag/` 两个页面**共用**的数据源（banner 文案、专区切换 tabs），由 `OPlusYamlContentVitePlugin` 自动接入 Vite 资源管线。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文共享数据（banner、tabs） |
| `en.yaml` | 英文共享数据（结构同 `zh.yaml`，文案为英文） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 对象 | 页面顶部 banner 文案（背景图由组件按主题从 public 目录 `/category/ai/` 取用，不入 yaml） |
| `tabs` | 数组 | 专区切换 tab（Agent专区 / RAG专区） |

## 消费方式

```ts
import aiCommonContent from '#content/ai/common';
import { useLocale } from '~@/composables/useLocale';

const { isZh } = useLocale();
const aiCommonData = computed(() => (isZh.value ? aiCommonContent.zh : aiCommonContent.en));
```

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| subtitle | 是 | banner 副标题文案 |

### tabs[]

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | tab 标题 |
| name | 是 | tab 标识（对应页面 slug，用于高亮当前 tab） |
| href | 是 | tab 链接 |
