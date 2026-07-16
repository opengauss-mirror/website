# 兼容性列表 / Compatibility List

本目录存放 `/zh/compatibility/` 和 `/en/compatibility/` 页面的数据源，由 `vite-plugin-content-yaml` 自动接入 Vite 资源管线。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（banner、表头、提示文案、兼容性列表） |
| `en.yaml` | 英文页面数据（结构同 `zh.yaml`，文案为英文） |
| `images/` | 页面使用的图片资源（banner 背景图、插图） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 对象 | 页面顶部 banner（标题、背景图、插图） |
| `search_placeholder` | 字符串 | 搜索框占位文本 |
| `type_search_placeholder` | 字符串 | 类型筛选下拉占位文本 |
| `table_headers` | 对象 | 表格列标题（name、type、company、database、certificate） |
| `certify` | 字符串 | 下载证书按钮文本（同时被发行版认证页面引用） |
| `tips` | 对象 | 底部提示文案（前半段文本、链接文本、链接地址） |
| `compatibilities` | 数组 | 兼容性列表数据 |

## 设计原则

- 按文件拆分 locale：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- 字段用基线名，无 `_zh` / `_en` 后缀
- 图片就近存放到 `images/` 子目录，`zh.yaml` 和 `en.yaml` 共用同一张图
- 兼容性列表数据（产品名、公司名、类型、数据库、OS、服务器）与语言无关，`zh.yaml` 和 `en.yaml` 中相同
- `os`、`server`、`download` 字段可能为 `null`（部分条目无此数据）
- 不存布局参数（分页 pageSize、pageSizes 等保留在组件内）

## 消费方式

```ts
import compatibilityContent from '#content/compatibility';
import { useData } from 'vitepress';

const { lang } = useData();
const compatData = computed(() => (lang.value === 'zh' ? compatibilityContent.zh : compatibilityContent.en));
```

## Schema

### banner

| 字段 | 必填 | 说明 |
|------|------|------|
| title | 是 | banner 标题 |
| background | 是 | 背景图路径（`./images/xxx.png`） |
| illustration | 是 | 插图路径（`./images/xxx.png`） |

### table_headers

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 产品名称列标题 |
| type | 是 | 产品类型列标题 |
| company | 是 | 厂家名称列标题 |
| database | 是 | 数据库软件列标题 |
| certificate | 是 | 认证证书列标题 |

### tips

| 字段 | 必填 | 说明 |
|------|------|------|
| text | 是 | 提示前半段文本 |
| link_text | 是 | 链接文本 |
| link_href | 是 | 链接地址 |

### compatibilities[]

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 产品名称 |
| version | 否 | 版本号（可为 null） |
| type | 是 | 产品类型 |
| company | 是 | 厂家名称 |
| database | 是 | 数据库软件 |
| os | 否 | 操作系统（可为 null） |
| server | 否 | 服务器型号（可为 null） |
| download | 否 | 证书下载链接（可为 null） |
