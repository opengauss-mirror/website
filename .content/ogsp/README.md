# 服务商认证 / oGSP Certification

本目录存放 `/zh/ogsp/` 和 `/en/ogsp/` 页面的数据源，由 `OPlusYamlContentVitePlugin` 自动接入 Vite 资源管线。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文页面数据（banner、表头、提示文案、认证列表） |
| `en.yaml` | 英文页面数据（结构同 `zh.yaml`，文案为英文） |
| `images/` | 页面使用的图片资源（banner 背景图、插图） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `banner` | 对象 | 页面顶部 banner（标题、背景图、插图） |
| `search_placeholder` | 字符串 | 搜索框占位文本 |
| `table_headers` | 对象 | 表格列标题（name、version、award、expiration、patch、content、system、commitment、experience、certificate） |
| `certify` | 字符串 | 下载证书按钮文本 |
| `tips` | 对象 | 底部提示文案（前半段文本、链接文本、链接地址） |
| `certifications` | 数组 | 认证列表数据 |

## 设计原则

- 按文件拆分 locale：`zh.yaml` / `en.yaml` 结构一致，字段名相同
- 字段用基线名，无 `_zh` / `_en` 后缀
- 图片就近存放到 `images/` 子目录，`zh.yaml` 和 `en.yaml` 共用同一张图
- 认证列表中公司名、证书编号、日期、证书 URL 与语言无关，`zh.yaml` 和 `en.yaml` 中相同
- 评分文本（优/良/中 ↔ Excellent/Good/Fair）按语言区分
- 不存布局参数（分页 pageSize、pageSizes 等保留在组件内）

## 消费方式

```ts
import ogspContent from '#content/ogsp';
import { useData } from 'vitepress';

const { lang } = useData();
const ogspData = computed(() => (lang.value === 'zh' ? ogspContent.zh : ogspContent.en));
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
| name | 是 | 公司名称列标题 |
| version | 是 | 证书编号列标题 |
| award | 是 | 颁发日期列标题 |
| expiration | 是 | 有效截止日期列标题 |
| patch | 是 | BUG修复与补丁版本发布列标题 |
| content | 是 | 服务内容列标题 |
| system | 是 | 服务体系列标题 |
| commitment | 是 | 服务承诺列标题 |
| experience | 是 | 项目经验列标题 |
| certificate | 是 | 认证证书列标题 |

### tips

| 字段 | 必填 | 说明 |
|------|------|------|
| text | 是 | 提示前半段文本 |
| link_text | 是 | 链接文本 |
| link_href | 是 | 链接地址 |

### certifications[]

| 字段 | 必填 | 说明 |
|------|------|------|
| name | 是 | 公司名称 |
| version | 是 | 证书编号 |
| award | 是 | 颁发日期（YYYY-MM-DD） |
| expiration | 是 | 有效截止日期（YYYY-MM-DD） |
| patch | 是 | 补丁标记（✓） |
| content | 是 | 服务内容评级（优/良/中 ↔ Excellent/Good/Fair） |
| system | 是 | 服务体系评级 |
| commitment | 是 | 服务承诺评级 |
| experience | 是 | 项目经验评级 |
| certificate | 是 | 证书下载链接（OBS URL） |
