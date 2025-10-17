import fs from 'fs';
import path from 'node:path';
import process from 'node:process';
import { generate } from "./generate-data.js";

const CWD = process.cwd();

export default function main() {
  console.log('gen news')
  const newsBannerRootDir = path.join(CWD, 'app/.vitepress/public/category/news');
  const newsBannersDates = new Set(fs.readdirSync(newsBannerRootDir) || []);
  generate({
    type: 'news',
    blackList: [path.join(CWD, './app/en/news/index.md'), path.join(CWD, './app/zh/news/index.md')],
    filterYaml(yaml) {
      try {
        return newsBannersDates.has(yaml.date);
      } catch {
        return true;
      }
    },
    onZhDone(data) {
      data.forEach((item) => {
        const files = fs.readdirSync(path.join(newsBannerRootDir, item.date));
        item.banner = `/category/news/${item.date}/${files[0]}`;
      });
    },
  });
}
