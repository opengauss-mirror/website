# tools

支持工具页（`/zh/tools/`）数据源。按语言拆分 `zh.yaml` / `en.yaml`，共用同一目录。

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 中文支持工具配置（分类与工具列表） |
| `en.yaml` | 英文支持工具配置（结构同 zh.yaml） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 各自维护对应语言文案，字段用基线名（无 `_zh` / `_en` 后缀）
- **snake_case**：所有字段名下划线连接
- **纯数据**：所有 URL 直接写入完整地址
- **工具名随语言**：工具 `name` 字段可按语言区分（如 zh 「禹贡」/ en `Yukon`），也可通用
- **不存放布局参数**：样式、背景图等由组件维护

## 数据消费

组件通过虚拟模块 `#content/tools` 直接按 locale 读取：

```ts
import supportToolsContent from '#content/tools';
import { useLocale } from '~@/composables/useLocale';

const { isZh } = useLocale();
const list = computed(() => isZh.value ? supportToolsContent.zh : supportToolsContent.en);
```

类型声明见 `app/.vitepress/src-new/@types/type-tools.ts`。

## 新增工具

1. 在 `zh.yaml` 和 `en.yaml` 对应分类的 `children` 下同步追加工具条目
2. 若需新增分类，在两个 yaml 顶部同步添加分类记录
3. 提 PR

## Schema

### zh.yaml / en.yaml

顶层 YAML 数组，每项为一个分类：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 分类标识 |
| `name` | ✅ | 分类名称 |
| `children` | ✅ | 工具列表 |

### children 子项

| 字段 | 必填 | 说明 |
|------|------|------|
| `iden` | ✅ | 所属分类标识（用于 tag 显示） |
| `name` | ✅ | 工具名称 |
| `desc` | ✅ | 工具描述 |
| `address` | ✅ | 源码/官网地址 |
| `guide` | 可选 | 操作指南链接 |
| `site` | 可选 | `true` 表示 address 指向官网而非源码 |
