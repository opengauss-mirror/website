# download

下载相关数据源。

## 文件说明

| 文件 | 说明 |
|------|------|
| `versions.yaml` | 版本元数据（名称、日期、描述、文档链接） |
| `versions/` | 各版本详细下载数据（YAML 文件，含下载链接和校验码） |

## 设计原则

- **snake_case**：所有字段名下划线连接
- **多语言**：`_zh` / `_en` 后缀
- **版本数据分离**：元数据在 `versions.yaml`，详细下载数据在 `versions/` 子目录的 YAML 文件中
- **前端桥接**：`content-bridge.ts` 负责合并元数据和版本数据，并补充动态 URL 字段

## 新增版本

1. 在 `versions/` 下创建新版本数据文件（如 `download8.0.0.yaml`）
2. 在 `versions.yaml` 顶部添加版本元数据记录
3. 提 PR

## Schema

### versions.yaml

顶层 YAML 数组：

| 字段 | 必填 | 说明 |
|------|------|------|
| `version_name` | ✅ | 版本号显示名 |
| `new_layout` | 可选 | 是否使用新版布局 |
| `is_login` | 可选 | 是否需要登录 |
| `data_file` | ✅ | 对应版本数据文件名 |
| `release_date` | ✅ | 发布日期 |
| `planned_eol` | ✅ | 计划终止维护日期 |
| `desc_zh` / `desc_en` | 可选 | 版本描述 |
| `init_previous` | 可选 | 历史版本页默认选中 |
| `docs_list` | 可选 | 相关文档列表 |
