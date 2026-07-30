# 发行版认证 / Distribution Certification

本目录存放 `/zh/certification/` 和 `/en/certification/` 页面的数据源，由 `OPlusYamlContentVitePlugin` 自动接入 Vite 资源管线。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（banner、表头、介绍文案、认证列表） |
| `en.yaml` | 英文页面数据（结构同 `zh.yaml`，文案为英文） |
| `images/` | 页面使用的图片资源（banner 背景图、插图） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 对象 | 页面顶部 banner（标题、背景图、插图） |
| `search_placeholder` | 字符串 | 搜索框占位文本 |
| `table_headers` | 对象 | 表格列标题（pro、name、version、award、certificate） |
| `certify` | 字符串 | 下载证书按钮文本（同时被兼容性认证页面引用） |
| `introduce` | 对象 | 底部介绍文案（前半段文本、链接文本、链接地址） |
| `certifications` | 数组 | 认证列表数据 |

## 设计原则

- 按文件拆分 locale：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- 字段用基线名，无 `_zh` / `_en` 后缀
- 图片就近存放到 `images/` 子目录，`zh.yaml` 和 `en.yaml` 共用同一张图
- 认证列表数据（产品名、公司名、日期、证书 URL）与语言无关，`zh.yaml` 和 `en.yaml` 中的 `certifications` 内容相同
- 不存布局参数（分页 pageSize、pageSizes 等保留在组件内）

## 消费方式

```ts
import certificationContent from '#content/certification';
import { useData } from 'vitepress';

const { lang } = useData();
const certData = computed(() => (lang.value === 'zh' ? certificationContent.zh : certificationContent.en));
```

兼容性认证页面 (`TheCompatibility.vue`) 也从 `#content/certification` 获取 `certify` 标签文本。

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
| pro | 是 | 认证的商业发行版列标题 |
| name | 是 | 公司名称列标题 |
| version | 是 | openGauss 社区版本列标题 |
| award | 是 | 证书颁发日期列标题 |
| certificate | 是 | 认证证书列标题 |

### introduce

| 字段 | 必填 | 说明 |
|------|------|------|
| text | 是 | 介绍前半段文本 |
| link_text | 是 | 链接文本 |
| link_href | 是 | 链接地址 |

### certifications[]

| 字段 | 必填 | 说明 |
|------|------|------|
| pro | 是 | 商业发行版名称 |
| name | 是 | 公司名称 |
| version | 是 | openGauss 社区版本 |
| award | 是 | 证书颁发日期（YYYY-MM-DD） |
| expiration | 是 | 证书有效截止日期（YYYY-MM-DD 或空字符串） |
| certificate | 是 | 证书下载链接（OBS URL） |
