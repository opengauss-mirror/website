const { isMainThread, workerData, parentPort, Worker } = require('node:worker_threads');
const nodePath = require('node:path');
const fs = require('node:fs');
const { spawn } = require('node:child_process');

async function main() {
  try {
    console.time('log git timestamps');
    const records = await Promise.all(
      ['en', 'zh']
        .map((lang) => new Worker(__filename, { workerData: lang }))
        .map((worker) => new Promise((resolve, reject) => {
          worker.once('message', resolve);
          worker.once('error', reject);
        }))
    );
    fs.writeFileSync(nodePath.resolve(__dirname, 'records.json'), JSON.stringify(Object.assign(...records)));
    console.timeEnd('log git timestamps');
  } catch (error) {
    console.log('error!!', error);
  }
}

/**
 * @param {string} lang lang root dir
 */
async function task(lang) {
  const READ_OPT = { withFileTypes: true };
  const pathList = [];

  const browseFiles = (...paths) => {
    const dir = nodePath.join(__dirname, ...paths);
    for (const dirent of fs.readdirSync(dir, READ_OPT)) {
      const fileName = dirent.name;
      if (dirent.isFile() && fileName.endsWith('.md')) {
        pathList.push([...paths, fileName].join('/'));
      } else if (dirent.isDirectory()) {
        browseFiles(...paths, fileName);
      }
    }
  };

  const records = {};

  const getGitTimestampRecord = (file) => new Promise((resolve, reject) => {
    const child = spawn(
      'git',
      ['log', '-1', '--pretty="%ai"', file],
      { cwd: __dirname }
    );

    let output = '';
    child.stdout.on('data', (d) => (output += String(d)));

    child.on('close', () => {
      const timestamp = +new Date(output);
      const noExt = file.slice(0, -3);
      records[noExt === 'index' ? `/${noExt}` : `/${encodeURI(noExt)}.html`] = timestamp;
      resolve();
    });

    child.on('error', reject);
  });

  browseFiles(lang);
  await Promise.all(pathList.map(getGitTimestampRecord));
  parentPort.postMessage(records);
}

if (isMainThread) {
  main();
} else {
  task(workerData);
}
