# 视频页面（/zh/video/）

视频列表页的数据源，按语言拆分为 `zh.yaml` / `en.yaml`，共用 `images/` 子目录。

## 文件说明

| 文件 | 用途 |
|------|------|
| `zh.yaml` | 中文视频数据（4 个 Tab + 全部视频条目） |
| `en.yaml` | 英文视频数据（Tab 名为英文，视频条目保持原文） |
| `images/` | 封面图（live / crash / database / activity 四张） |

## 数据板块

| 板块 | 类型 | 用途 |
|------|------|------|
| `tabs` | 数组 | 视频分类标签列表（页面顶部 Tab） |

> yaml 顶层直接是 `tabs` 数组。

## 设计原则

- 按文件拆分 locale：`zh.yaml` / `en.yaml` 字段名相同（基线名），无 `_zh` / `_en` 后缀
- 图片就近存放到 `images/`，zh/en 共用同一张图，文件名不加后缀
- 图片路径以 `./images/xxx.png` 书写（带 `./` 前缀），由 vite-plugin-content-yaml 重写为带 hash 的真实 URL
- 不存布局参数（间距、断点等），只存内容数据

## 消费方式

```ts
import videoContent from '#content/video';
import { useData } from 'vitepress';
import { computed } from 'vue';

const { lang } = useData();
const isZh = computed(() => lang.value === 'zh');
const tabs = computed(() => isZh.value ? videoContent.zh : videoContent.en);
```

## Schema

### tabs[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | Tab ID（用于 tab 切换和 URL 参数 `?id=`） |
| `name` | 是 | Tab 名称（已按语言拆分） |
| `tag` | 是 | Tab 标识（live / crash / database / activity） |
| `poster` | 是 | 封面图路径（相对当前 yaml） |
| `nav_list` | 是 | 锚点导航列表（空数组 `[]` 表示无锚点导航） |
| `groups` | 是 | 视频分组列表 |

### tabs[].nav_list[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `key` | 是 | 锚点 key（对应分组 `id`，用于页面内滚动定位） |
| `name` | 是 | 锚点显示名 |

### tabs[].groups[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `id` | 是 | 分组 ID（对应 `nav_list[].key`） |
| `name` | 是 | 分组名 |
| `poster` | 是 | 封面图路径（相对当前 yaml） |
| `display_count` | 是 | 默认显示数量（超出则折叠，`999999` 表示全部展示） |
| `videos` | 是 | 视频列表 |

### tabs[].groups[].videos[]

| 字段 | 必填 | 说明 |
|------|------|------|
| `title` | 是 | 视频标题 |
| `author` | 是 | 作者（可为空字符串） |
| `video_url` | 是 | 视频链接（B 站 / OBS 直链） |
