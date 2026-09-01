import { spawn } from 'child_process';
import fs from 'fs';
import fsPromise from 'fs/promises';
import path from 'node:path';
import process from 'node:process';

const CWD = process.cwd();
const BLOGS_GIT_REPO = 'https://atomgit.com/opengauss/blog.git';
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
    }, 30 * 60 * 1000);
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
  console.log('sync blogs')
  try {
    await pullFromGit();
    await copyBlogFiles();
  } catch (error) {
    console.error('拉取blogs失败：', error)
    process.exit(1);
  }
  if (fs.existsSync(PULL_TARGET_PATH)) {
    fs.rmSync(PULL_TARGET_PATH, { recursive: true, force: true });
  }
}
