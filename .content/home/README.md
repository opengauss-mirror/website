# home

首页数据源。每条记录是一个完整实体，像 API 返回的数据结构。

## 文件说明

| 文件 | 说明 |
|------|------|
| `banner.yaml` | 首页轮播图实体 |
| `organization.yaml` | 首页合作单位实体（中英文共用） |
| `images/banner/` | 轮播图背景图 |
| `images/organization/` | 合作单位 logo（亮色 / 暗色） |

## 设计原则

- 多语言用 `_zh` / `_en` 后缀，不做顶层 zh/en 分离
- PC/移动端背景图中英文共用，仅不同时加后缀
- 亮 / 暗主题变体用 `img_light` / `img_dark` 字段；同一张图时两字段指向同一文件
- 不存放前端布局参数

## 新增轮播图

1. 在 `banner.yaml` 列表**顶部**插入新记录（最新排前面）
2. 把背景图放到 `images/banner/` 目录下
3. 提 PR

## 新增合作单位

1. 在 `organization.yaml` 列表末尾追加一条记录
2. 把亮色 logo 放到 `images/organization/` 目录下（暗色变体同名加 `_dark` 后缀，无暗色变体时 `img_dark` 与 `img_light` 指向同一文件）
3. 提 PR

## Schema

### banner.yaml

顶层 YAML 数组：

| 字段 | 必填 | 说明 |
|------|------|------|
| `bg_pc` | ✅ | PC 端背景图 |
| `bg_pad` | 可选 | 平板端背景图 |
| `bg_mb` | 可选 | 移动端背景图（中英文共用） |
| `bg_pc_dark` / `bg_mb_dark` | 可选 | 暗色模式背景 |
| `bg_theme` | ✅ | `light` / `dark` |
| `text_image_zh` / `text_image_mb_zh` | 可选 | 文字覆盖图 |
| `title_zh` / `title_en` | 可选 | 标题（字符串或数组） |
| `title_mb_zh` | 可选 | 移动端标题数组 |
| `subtitle_zh` / `subtitle_en` | 可选 | 副标题 |
| `desc_zh` / `desc_en` | 可选 | 描述数组 |
| `btn_zh` / `btn_en` | 可选 | 按钮文案 |
| `href_zh` / `href_en` | ✅ | 跳转链接 |
| `is_blank` | 可选 | 是否新窗口打开 |
| `class_name` | 可选 | CSS 类名 |
| `attach` / `attach_href` | 可选 | 装饰图及链接 |
| `locale` | 可选 | 可见语言（默认 zh,en） |

### organization.yaml

顶层 YAML 数组，中英文共用（名称为专有名词不做翻译）：

| 字段 | 必填 | 说明 |
|------|------|------|
| `name` | ✅ | 单位名称 |
| `img_light` | ✅ | 亮色主题 logo |
| `img_dark` | ✅ | 暗色主题 logo（与 `img_light` 相同表示无暗色变体） |
