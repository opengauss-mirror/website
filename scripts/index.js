import process from "node:process";
import syncBlogs from './sync-blogs.js';

function main() {
  const type = process.argv[2];
  if (type !== 'blogs') return;
  syncBlogs();
}

main();
