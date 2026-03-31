import nodePath from 'node:path';
import { readFile } from 'node:fs/promises';
import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { glob } from 'glob';
import matter from 'gray-matter';

const runConcurrently = (concurrency = 3) => {
  return (tasks) => {
    if (!tasks.length) return Promise.resolve();
    return new Promise((resolve) => {
      let count = 0;
      let accept = false;
      let ptr = 0;
      const runner = (function* () {
        while (ptr < tasks.length) {
          while (count >= concurrency) {
            accept = false;
            yield;
          }
          if (ptr >= tasks.length) {
            resolve();
            return;
          }
          accept = true;
          count++;
          const task = tasks[ptr++];
          task().finally(() => {
            count--;
            if (count === 0 && ptr >= tasks.length) {
              resolve();
            } else if (!accept) {
              runner.next();
            }
          });
        }
      })();
      runner.next();
    });
  };
};

const APP_DIR = nodePath.resolve(nodePath.dirname(fileURLToPath(import.meta.url)), '..', 'app');
const zhFiles = await glob('zh/events/**/*.md', { cwd: APP_DIR });
// const enFiles = await glob('en/events/**/*.md', { cwd: APP_DIR });

const zhWriteStream = createWriteStream(nodePath.join(APP_DIR, '.vitepress', 'src-new', 'data', 'events', 'zh.ts'), 'utf8');
zhWriteStream.write('export default [\n');
// const enWriteStream = createWriteStream(nodePath.join(APP_DIR, '.vitepress', 'src-new', 'data', 'events', 'en.ts'), 'utf8');
// enWriteStream.write('export default [\n');

const run = runConcurrently(10);
let writeOK = true;
const BACK_SLASH = /\\/g;

await run(
  zhFiles
    .map((file) => nodePath.join(APP_DIR, file))
    .map((filePath) => {
      return async () => {
        const contents = await readFile(filePath, { encoding: 'utf8' });
        const res = matter(contents);
        if (!res.data?.date) return;
        if (!writeOK) {
          await new Promise((res) => zhWriteStream.once('drain', () => res));
        }
        let path;
        if (res.data.link) {
          path = res.data.link;
        } else {
          path = filePath.replace(BACK_SLASH, '/');
          path = path.slice(path.indexOf('/zh'));
          if (path.endsWith('index.md')) {
            path = path.slice(0, -8);
          } else {
            path.replace('.md', '.html');
          }
        }
        writeOK = zhWriteStream.write(
          JSON.stringify(
            {
              ...res.data,
              name: res.data.title,
              city: res.data.location,
              date: res.data.date.replace(/-/g, '/'),
              path,
            },
            null,
            2
          ) + ',\n'
        );
      };
    })
);
zhWriteStream.write('];');

// await run(
//   enFiles
//     .map((f) => nodePath.join(APP_DIR, f))
//     .map((path) => {
//       return async () => {
//         const contents = await readFile(path, { encoding: 'utf8' });
//         const res = matter(contents);
//         if (!res.data?.date) return;
//         if (!writeOK) {
//           await new Promise((res) => enWriteStream.once('drain', () => res));
//         }
//         writeOK = enWriteStream.write(JSON.stringify({ ...res.data, filePath: path }, null, 2) + ',\n');
//       };
//     })
// );
// enWriteStream.write('];');
