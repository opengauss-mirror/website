import { spawn } from 'child_process';
import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'node:path';
import process from 'node:process';
import { generate } from './generate-data.js';

const CWD = process.cwd();
const BLOGS_GIT_REPO = 'https://gitcode.com/opengauss/blog.git';
const PULL_TARGET_PATH = path.join(CWD, '_temp/blogs');

function copyBlogFiles() {
  console.log('-------------------- copy files --------------------');
  return Promise.all([
    fsPromise.cp(path.join(PULL_TARGET_PATH, 'app/zh/blogs'), path.join(CWD, 'app/zh/blogs'), { recursive: true }),
    fsPromise.cp(path.join(PULL_TARGET_PATH, 'app/en/blogs'), path.join(CWD, 'app/en/blogs'), { recursive: true }),
  ]);
}

async function pullFromGit() {
  return new Promise((resolve, reject) => {
    console.log('-------------- pull blog data from git --------------');
    const cp = spawn('git', ['clone', '-b', 'v2', BLOGS_GIT_REPO, '--depth=1', PULL_TARGET_PATH], { cwd: CWD });
    const timeout = setTimeout(() => {
      cp.kill();
      reject('timeout');
    }, 30000);
    cp.stderr.on('data', (data) => {
      console.log(data.toString());
    });
    cp.on('close', (code) => {
      clearTimeout(timeout);
      if (code !== 0) return reject(code);
      resolve();
    });
    cp.on('error', (err) => {
      clearTimeout(timeout);
      reject(err.message);
    });
  });
}

export default async function main() {
  console.log('gen blogs')
  try {
    await pullFromGit();
    await copyBlogFiles();
  } catch (error) {
    console.error('拉取blogs失败：', error)
    return;
  }
  if (fs.existsSync(PULL_TARGET_PATH)) {
    fs.rmSync(PULL_TARGET_PATH, { recursive: true, force: true });
  }
  generate({
    type: 'blog',
    pathName: 'blogs',
    blackList: [
      path.join(CWD, './app/en/blogs/index.md'),
      path.join(CWD, './app/zh/blogs/index.md'),
      path.join(CWD, './app/zh/blogs/guidance/index.md'),
      path.join(CWD, './app/zh/blogs/desgin/content_posts.md'),
    ],
    onZhDone: (data) => {
      data.push({
        title: 'Guidance to Post a Blog',
        path: 'zh/blogs/guidance/index',
      });
    },
  });
}
