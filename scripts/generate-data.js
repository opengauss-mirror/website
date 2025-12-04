import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import process from 'node:process';

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
 * @param {string} mdDirPath blog路径
 * @param {string} type 新闻/博客
 * @param {string[]} blackList 排除的文件
 * @param {object[]} result 返回结果
 * @param {((yamlObj: object) => boolean) | null} filterYaml 根据文章的yaml元数据判断是否写入最终生成结果
 */
function getBlogData(mdDirPath, type, blackList = [], filterYaml, result = []) {
  const all = fs.readdirSync(mdDirPath);
  for (const fileName of all) {
    const completedPath = path.join(mdDirPath, fileName);

    if (fs.statSync(completedPath).isDirectory()) {
      getBlogData(completedPath, type, blackList, filterYaml, result);
      continue;
    }

    if (fileName.endsWith('.md') && blackList.every((black) => black !== completedPath)) {
      try {
        const yamlObj = getYamlHeader(completedPath);
        if (!yamlObj) {
          console.log(`错误：yaml 匹配失败，md 路径：${completedPath}`);
          continue;
        }

        if (yamlObj.category !== type) {
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
        if (filterYaml && !filterYaml(yamlObj)) continue;
        result.push(yamlObj);
      } catch (e) {
        console.log(`格式化 yaml 数据异常，跳过~ 路径：${completedPath}，错误原因：${e?.message}`);
      }
    }
  }

  return result;
}

/**
 * @typedef {Object} Option
 * @property {string} type 新闻/博客
 * @property {string} [pathName] 文件夹名称
 * @property {string[]} blackList 排除的文件
 * @property {(zhData: any[]) => void} [onZhDone] 中文处理完成的回调
 * @property {(enData: any[]) => void} [onEnDone] 英文处理完成的回调
 * @property {(frontmatter: object) => boolean} [filterYaml] 根据文章的yaml元数据判断是否写入最终生成结果
 */

/**
 *
 * @param {Option} option
 */
export function generate(option) {
  console.log(`-------------- generate ${option.type} data --------------`);

  const ZH_PATH = path.join(process.cwd(), `./app/zh/${option.pathName || option.type}`);
  const DATA_OUTPUT_ZH_PATH = path.join(process.cwd(), `./app/.vitepress/src/data/${option.pathName || option.type}/${option.pathName || option.type}-zh.ts`);
  const EN_PATH = path.join(process.cwd(), `./app/en/${option.pathName || option.type}`);
  const DATA_OUTPUT_EN_PATH = path.join(process.cwd(), `./app/.vitepress/src/data/${option.pathName || option.type}/${option.pathName || option.type}-en.ts`);
  console.log(`${option.type}-zh 目标路径: `, ZH_PATH);
  console.log(`${option.type}-zh 数据输出路径: `, DATA_OUTPUT_ZH_PATH);
  console.log(`${option.type}-en 目标路径: `, EN_PATH);
  console.log(`${option.type}-en 数据输出路径: `, DATA_OUTPUT_EN_PATH);
  console.log(`生成中...`);

  const zhData = getBlogData(ZH_PATH, option.type, option.blackList ?? [], option.filterYaml ?? null);
  sort(zhData);
  option?.onZhDone?.(zhData);
  fs.writeFileSync(DATA_OUTPUT_ZH_PATH, `export default ${JSON.stringify(zhData, null, 2)};`);

  const enData = getBlogData(EN_PATH, option.type, option.blackList ?? [], option.filterYaml ?? null);
  sort(enData);
  option?.onEnDone?.(enData);
  fs.writeFileSync(DATA_OUTPUT_EN_PATH, `export default ${JSON.stringify(enData, null, 2)};`);

  console.log(`生成完成！`);
  console.log('-------------------- end --------------------');
}

