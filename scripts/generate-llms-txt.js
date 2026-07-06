import { createWriteStream, existsSync } from "node:fs";
import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { Readable } from "node:stream";
import { pipeline } from "node:stream/promises";

const distDir = join(import.meta.dirname, '../app/.vitepress/dist');
const geoManifestDir = join(import.meta.dirname, '../.geo');
const skip = [/(zh|en)\/(blogs|news|events|search|user-practice)/];

async function* itrHtml(dir) {
  const files = await readdir(dir, { withFileTypes: true, encoding: 'utf-8' });
  out: for (const file of files) {
    const filePath = join(dir, file.name);
    for (const sk of skip) {
      if (sk.test(filePath.replace(/\\/g, '/'))) {
        continue out;
      }
    }
    if (file.isDirectory()) {
      yield* itrHtml(filePath);
    } else if (file.isFile() && file.name.endsWith('.html')) {
      const pagePath = filePath.slice(distDir.length + 1).replace(/\\/g, '/').replace(/(\/index)?\.html$/, '');
      let title = '';
      let description = '';
      let readGeoManifestFailed = true;
      try {
        const tdkConfigPath = join(geoManifestDir, 'tdks', pagePath, 'index.json');
        if (existsSync(tdkConfigPath)) {
          const tdk = JSON.parse(await readFile(tdkConfigPath));
          if (tdk) {
            title = tdk.title;
            description = tdk.description;
          }
          readGeoManifestFailed = false;
        }
      } catch {
        readGeoManifestFailed = true;
      }
      if (readGeoManifestFailed) {
        const html = await readFile(filePath, 'utf-8');
        title = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '';
        description = html.match(/<meta\s*name="description"\s*content="(.+)"/)?.[1] || '';
      }
      const urlPath = filePath.endsWith('index.html') ? pagePath + '/' : pagePath + '.html';
      yield `- [${title}](https://opengauss.org/${urlPath}): ${description}\n`;
    }
  }
}

const writeStream = createWriteStream(join(distDir, 'llms.txt'));
writeStream.write(`# openGauss社区官网 - 企业级开源关系型数据库

> openGauss是一款高性能、高安全、高可靠的企业级开源关系型数据库。采用木兰宽松许可证v2发行，鼓励社区贡献与协作，深度融合华为数据库领域经验，持续构建企业级竞争力特性。

## Table of Contents

`);

await pipeline(
  Readable.from(itrHtml(join(distDir, 'zh'))),
  writeStream,
  { end: false }
);

writeStream.write(`
## English contents

`);

await pipeline(
  Readable.from(itrHtml(join(distDir, 'en'))),
  writeStream
);
