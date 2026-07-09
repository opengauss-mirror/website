import process from "node:process";
import genBlogs from './gen-blogs.js';

function main() {
  const type = process.argv[2];
  if (type !== 'blogs') return;
  genBlogs();
}

main();
