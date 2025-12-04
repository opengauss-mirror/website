import process from "node:process";
import genNews from './gen-news.js';
import genBlogs from './gen-blogs.js';

function main() {
  const type = process.argv[2];
  if (type !== 'blogs' && type !== 'news') return;
  if (type === 'blogs') {
    genBlogs();
  } else {
    genNews();
  }
}

main();