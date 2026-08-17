# sig

SIG 列表页（`/zh/sig/`）数据源。按语言拆分 `zh.yaml` / `en.yaml`，共用同一目录。

本数据为 openGauss 社区全部 SIG 的清单，被以下页面共用：

- `/zh/sig/sig-list/`、`/en/sig/sig-list/` — SIG 列表页（`TheSig.vue`）
- `/zh/sig/<sig>`、`/en/sig/<sig>` — SIG 详情页（`TheSigDetail.vue`）
- `/zh/maillist/`、`/en/maillist/` — 邮件列表页（`TheMaillist.vue`）

## 文件说明

| 文件 | 说明 |
|------|------|
| `zh.yaml` | 中文 SIG 列表（SIG 名称、邮件列表、描述、订阅/归档链接） |
| `en.yaml` | 英文 SIG 列表（结构同 `zh.yaml`） |

## 设计原则

- **按文件拆分 locale**：`zh.yaml` / `en.yaml` 各自维护对应语言文案，字段用基线名（无 `_zh` / `_en` 后缀）
- **snake_case**：所有字段名下划线连接
- **纯数据**：`mailweb_link` / `archive_link` 直接写入完整 URL（基址 `https://mailweb.opengauss.org`），不走 Vite 资源管线
- **顶层为数组**：整页只有一层数据（SIG 清单），yaml 顶层直接是数组，不额外套壳
- **不存放布局参数**：样式、交互由组件维护

## 数据消费

组件通过虚拟模块 `#content/sig` 按 locale 读取：

```ts
import sigContent from '#content/sig';
import { useData } from 'vitepress';

const { lang } = useData();
const list = sigContent[lang.value as 'zh' | 'en'];
```

类型声明见 `app/.vitepress/src-new/@types/content/sig.d.ts`。

## 新增 / 修改 SIG

1. 在 `zh.yaml` 和 `en.yaml` 顶部同步追加一条 SIG 记录
2. `sig_name` / `mailing_list` 两语言通常相同（不区分时两文件保持一致）
3. `description` 按语言分别填写
4. `mailweb_link` / `archive_link` 两语言共用同一 URL
5. 提 PR

## Schema

### zh.yaml / en.yaml

顶层 YAML 数组，每项为一个 SIG：

| 字段 | 必填 | 说明 |
|------|------|------|
| `sig_name` | ✅ | SIG 名称 |
| `mailing_list` | ✅ | 邮件列表邮箱地址 |
| `description` | ✅ | SIG 描述 |
| `mailweb_link` | ✅ | 订阅链接（mailweb 平台，完整 URL） |
| `archive_link` | ✅ | 历史邮件归档链接（完整 URL） |
