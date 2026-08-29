import { stat, readFile } from 'node:fs/promises';

export async function readFileAsJson(filePath) {
  // 1. 防御：先检查文件大小，超过 5MB 拒绝执行，防止大文件攻击
  const stats = await stat(filePath);
  if (stats.size > 5 * 1024 * 1024) {
    throw new Error('File too large, potential DoS risk.');
  }

  // 2. 读取并解析
  const content = await readFile(filePath, 'utf-8');
  return JSON.parse(content);
}
