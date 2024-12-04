import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import process from 'process';

/**
 * 获取 md 的 yaml 头
 * @param {string} path md 文件路径
 * @returns 返回 yaml 对象
 */
function getYamlHeader(path) {
  // 正则表达式定义
  const optionalByteOrderMark = '\\ufeff?';
  const pattern = '^(' + optionalByteOrderMark + '(---)' + '$([\\s\\S]*?)' + '^(?:---)\\s*' + '$\\r?(?:\\n)?)';
  const regex = new RegExp(pattern, 'm');

  // 执行匹配
  const content = fs.readFileSync(path);
  const match = regex.exec(content);
  if (!match) {
    return;
  }

  // 转换成 yaml 对象
  const yamlStr = match[match.length - 1].replace(/^\s+|\s+$/g, '');
  return yaml.load(yamlStr);
}

/**
 * 结果排序
 * @param {object[]} arr blog 数据
 */
function sort(arr) {
  arr.sort((a, b) => {
    if (a.date !== b.date) {
      return b.date.localeCompare(a.date);
    }

    if (a.times && b.times && a.times !== b.times) {
      return b.times.localeCompare(a.times);
    }

    return a.title.localeCompare(b.title);
  });
}

/**
 * 获取 blog 数据
 * @param {string} blogPath blog路径
 * @param {object[]} result 返回结果
 */
function getBlogData(blogPath, blackList = [], result = []) {
  const all = fs.readdirSync(blogPath);
  for (const fileName of all) {
    const completedPath = path.join(blogPath, fileName);

    if (fs.statSync(completedPath).isDirectory()) {
      getBlogData(completedPath, blackList, result);
      continue;
    }

    if (fileName.endsWith('.md') && blackList.every(black => black !== completedPath)) {
      try {
        const yamlObj = getYamlHeader(completedPath);
        if (!yamlObj) {
          console.log(`错误：yaml 匹配失败，md 路径：${completedPath}`);
          continue;
        }

        if (yamlObj.category !== 'blog') {
          console.log(`未设置category为blog，会导致页面显示异常，跳过~ 路径：${completedPath}`);
          continue;
        }

        // 修补一些 blog 日期格式不符合 xxxx-xx-xx 的格式
        if (yamlObj.date instanceof Date) {
          const date = new Date(yamlObj.date);
          yamlObj.date = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}-${('0' + date.getDate()).slice(-2)}`;
        } else if (typeof yamlObj.date !== 'string') {
          console.log(`缺少 date 信息，跳过~ 路径：${completedPath}`);
          continue;
        } 

        const dateSplit = yamlObj.date.split('-');
        dateSplit[1] = `0${dateSplit[1] || '1'}`.slice(-2);
        dateSplit[2] = `0${dateSplit[2] || '1'}`.slice(-2);
        yamlObj.date = dateSplit.join('-');

        // 修补一些 blog 时间格式不符合 xx:xx 的格式
        if (yamlObj.times) {
          const timeSplit = yamlObj.times.split(':');
          timeSplit[0] = `0${timeSplit[0] || '0'}`.slice(-2);
          timeSplit[1] = `0${timeSplit[1] || '0'}`.slice(-2);
          yamlObj.times = timeSplit.join(':');
        }

        yamlObj.summary = yamlObj.summary || '';
        yamlObj.archives = `${dateSplit[0]}-${dateSplit[1]}`;
        yamlObj.img = yamlObj.img || '';
        yamlObj.author = Array.isArray(yamlObj.author) ? yamlObj.author : [yamlObj.author];
        yamlObj.title = yamlObj.title || '';
        yamlObj.tags = Array.isArray(yamlObj.author) ? yamlObj.tags : [yamlObj.tags];
        yamlObj.path = completedPath.replace(path.join(process.cwd(), './app/'), '').replace('.md', '').replace(/\\/g, '/');

        result.push(yamlObj);
      } catch(e) {
        console.log(`格式化 yaml 数据异常，跳过~ 路径：${completedPath}，错误原因：${e?.message}`);
      }
    }
  }

  return result;
}


function main() {
  console.log('-------------- generate blog data --------------');
  const BLACK_LIST = [
    path.join(process.cwd(), './app/en/blogs/index.md'),
    path.join(process.cwd(), './app/zh/blogs/index.md'),
    path.join(process.cwd(), './app/zh/blogs/guidance/index.md'),
    path.join(process.cwd(), './app/zh/blogs/desgin/content_posts.md'),
  ];

  const BLOG_ZH_PATH = path.join(process.cwd(), './app/zh/blogs');
  const DATA_OUTPUT_ZH_PATH = path.join(process.cwd(), './app/.vitepress/src/data/blogs/blogs-zh.ts');
  const BLOG_EN_PATH = path.join(process.cwd(), './app/en/blogs');
  const DATA_OUTPUT_EN_PATH = path.join(process.cwd(), './app/.vitepress/src/data/blogs/blogs-en.ts');
  console.log('blog-zh 目标路径: ', BLOG_ZH_PATH);
  console.log('blog-zh 数据输出路径: ', DATA_OUTPUT_ZH_PATH);
  console.log('blog-en 目标路径: ', BLOG_EN_PATH);
  console.log('blog-en 数据输出路径: ', DATA_OUTPUT_EN_PATH);
  console.log(`生成中...`);

  const blogZhData = getBlogData(BLOG_ZH_PATH, BLACK_LIST);
  sort(blogZhData);
  blogZhData.push({
    title: 'Guidance to Post a Blog',
    path: 'zh/blogs/guidance/index',
  });
  fs.writeFileSync(DATA_OUTPUT_ZH_PATH, `export default ${JSON.stringify(blogZhData, null, 2)};`);

  const blogEnData = getBlogData(BLOG_EN_PATH, BLACK_LIST);
  sort(blogEnData);
  fs.writeFileSync(DATA_OUTPUT_EN_PATH, `export default ${JSON.stringify(blogEnData, null, 2)};`);

  console.log(`生成完成！`);
  console.log('-------------------- end --------------------');
}

main();

