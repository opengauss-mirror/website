# 社区荣誉页面（/zh/honor/）

社区荣誉页面的数据源。仅中文版（en 页面不存在），故只有 `zh.yaml`。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文荣誉数据（5 个年份，876 行） |
| `images/` | 证书图片 + 开发者头像（101 张） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `title` | 字符串 | 页面标题 |
| `read_news` | 字符串 | "查看新闻"按钮文案 |
| `view_certificate` | 字符串 | "查看证书"按钮文案 |
| `excellent_developer_title` | 字符串 | "openGauss 年度优秀开发者"标题 |
| `excellent_sig_title` | 字符串 | "openGauss 年度优秀SIG"标题 |
| `honor_list` | 数组 | 按年份分组的荣誉数据 |

## 设计原则

- 按文件拆分 locale：本页仅有 `zh.yaml`（en 页面不存在）
- 图片就近存放到 `images/`，文件名保留原名
- 同名图片跨年份冲突时加年份前缀（如 `2022_pengjiong.png`、`2023_pengjiong.png`）
- 图片路径以 `./images/xxx.png` 书写（带 `./` 前缀），由 vite-plugin-content-yaml 重写为带 hash 的真实 URL
- 不存布局参数（间距、断点等），只存内容数据

## 消费方式

```ts
import honorContent from '#content/honor';

const honorData = honorContent.zh;
// 模板直接使用 snake_case 字段名，如 honorData.honor_list、item.developer_data 等
```

## Schema

### honor_list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 年份（如 "2024"） |
| `data` | 是 | 荣誉证书列表 |
| `developer_data` | 否 | 年度优秀开发者列表 |
| `devoloper_rules` | 否 | 开发者评选规则 |
| `sig_data` | 否 | 优秀SIG列表 |
| `sig_rules` | 否 | SIG评选规则 |
| `enterprise_data` | 否 | 优秀企业列表 |
| `enterprise_rules` | 否 | 企业评选规则 |
| `person_data` | 否 | 优秀个人贡献奖列表 |
| `person_rules` | 否 | 个人评选规则 |
| `excellent_enterprise_title` | 否 | 优秀企业标题 |
| `excellent_person_title` | 否 | 优秀个人标题 |

### honor_list[].data[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 荣誉名称 |
| `href` | 是 | 新闻链接（空字符串表示无链接） |
| `img` | 是 | 证书图片（空字符串表示无图片） |

### honor_list[].developer_data[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 奖项名称（如"卓越贡献之星"） |
| `members` | 是 | 开发者列表 |

### honor_list[].developer_data[].members[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 姓名 |
| `company` | 是 | 公司 |
| `show_email` | 是 | 是否显示邮箱 |
| `email` | 是 | 邮箱（空字符串表示无） |
| `avatar` | 是 | 头像图片路径 |

### honor_list[].sig_data[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | SIG名称 |
| `href` | 是 | 项目地址 |

### honor_list[].enterprise_data[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `first_name` | 是 | 企业名（第一部分） |
| `second_name` | 是 | 企业名（第二部分） |

### honor_list[].person_data[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | 是 | 姓名 |
| `company` | 是 | 公司 |
| `avatar` | 是 | 头像图片路径 |
| `comment` | 是 | 贡献描述数组（可含 `link: <url>` 前缀的链接行） |

### 评选规则项（devoloper_rules / sig_rules / enterprise_rules / person_rules）

| 字段 | 必填 | 说明 |
|------|------|------|
| `type` | 是 | 规则类型（`tip` / `label`） |
| `value` | 是 | 规则文案 |
