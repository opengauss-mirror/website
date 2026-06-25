# activity

活动事件数据源。每条记录是一个完整实体，像 API 返回的数据结构。

## 文件说明

| 文件 | 说明 |
|------|------|
| `list.yaml` | 活动事件实体（Meetup / 会议 / 线上活动），id 为唯一键 |

## 设计原则

- **数据即 API 响应**：每条记录是完整实体，不做 zh/en 顶层分离
- **无派生字段**：URL 直接存储（review_url）
- **无 UI 配置**：筛选选项等页面配置不在此处（由前端 content-bridge.ts 维护）
- **snake_case**：所有字段名下划线连接
- **多语言**：`_zh` / `_en` 后缀

## 新增活动

1. 在 `list.yaml` 末尾添加一条记录（id 递增）
2. 将封面图放到 `app/.vitepress/public/category/events/<日期>/` 目录
3. 提 PR

## Schema

### list.yaml

顶层 YAML 数组，每项字段：

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | ✅ | 数字 ID，唯一键 |
| `title_zh` / `title_en` | ✅ | 中英文标题 |
| `display_date_zh` | ✅ | 展示用日期文本 |
| `start_date` | ✅ | 排序用日期 `YYYY-MM-DD` |
| `series` | ✅ | 系列标识 `meetup` / `conference` / `activity` |
| `format` | ✅ | `offline` / `online` / `hybrid` |
| `city_zh` / `city_en` | 可选 | 城市（线上活动不填） |
| `poster_image` | 可选 | PC 端海报 |
| `poster_image_mb` | 可选 | 移动端海报 |
| `review_url` | 可选 | 回顾/详情链接 |
| `synopsis_zh` / `synopsis_en` | 可选 | 简介 |
| `status` | ✅ | `ended` / `ongoing` |
