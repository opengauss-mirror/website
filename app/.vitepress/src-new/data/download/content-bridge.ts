import downloadContent from '#content/download';
import versionDataMap from '#content/download/versions';
import { GITCODE_LINK } from '@/data/url-config';

const DOCS_ORIGIN = import.meta.env.VITE_DOCS_ORIGIN as string;
const GITCODE = GITCODE_LINK;

function replacePlaceholders(str: string): string {
  if (typeof str !== 'string') return str;
  return str.replace(/\{GITCODE\}/g, GITCODE).replace(/\{DOCS_ORIGIN\}/g, DOCS_ORIGIN);
}

function resolvePlaceholders(obj: any): any {
  if (typeof obj === 'string') return replacePlaceholders(obj);
  if (Array.isArray(obj)) return obj.map(resolvePlaceholders);
  if (obj && typeof obj === 'object') {
    return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, resolvePlaceholders(v)]));
  }
  return obj;
}

function foldEntry(entry: any, lang: 'zh' | 'en') {
  const result: any = {};
  const processedKeys = new Set<string>();

  for (const [key, val] of Object.entries(entry)) {
    if (key.endsWith('_zh')) {
      const baseKey = key.slice(0, -3);
      if (!processedKeys.has(baseKey)) {
        result[baseKey] = lang === 'zh' ? val : entry[`${baseKey}_en`];
        processedKeys.add(baseKey);
      }
    } else if (key.endsWith('_en')) {
      const baseKey = key.slice(0, -3);
      if (!processedKeys.has(baseKey)) {
        result[baseKey] = lang === 'en' ? val : entry[`${baseKey}_zh`];
        processedKeys.add(baseKey);
      }
    }
  }

  for (const [key, val] of Object.entries(entry)) {
    if (!key.endsWith('_zh') && !key.endsWith('_en') && !processedKeys.has(key)) {
      result[key] = val;
    }
  }

  if (entry[`docs_name_${lang}`] !== undefined || entry.docs_name !== undefined) {
    result.docs = {
      name: entry[`docs_name_${lang}`] ?? entry.docs_name,
      url: entry.docs_url,
    };
  }

  if (entry.children) {
    result.children = entry.children.map((child: any) => foldEntry(child, lang));
  }

  return result;
}

function foldNewFormat(data: any[]) {
  return {
    zh: data.map((e) => foldEntry(e, 'zh')),
    en: data.map((e) => foldEntry(e, 'en')),
  };
}

function foldOldFormat(groups: any[]) {
  const foldItems = (items: any[], lang: 'zh' | 'en') =>
    items.map((item) => {
      const result: any = {};
      for (const [key, val] of Object.entries(item)) {
        if (key.endsWith(`_${lang}`)) {
          result[key.slice(0, -3)] = val;
          continue;
        }
        const localized = item[`${key}_${lang}`];
        result[key] = localized !== undefined ? localized : val;
      }
      return result;
    });

  return groups.map((group) => ({
    name: group.name,
    thead: group.thead,
    zh: foldItems(group.items || [], 'zh'),
    en: foldItems(group.items || [], 'en'),
  }));
}

function loadVersionData(dataFile: string) {
  const data = versionDataMap[dataFile];
  if (!data) return undefined;
  if (Array.isArray(data) && data[0]?.items) return foldOldFormat(data);
  return foldNewFormat(data);
}

const versionMetas = downloadContent.versions as any[];

const downloadData = versionMetas.map((meta) => ({
  name: meta.version_name,
  newLayout: meta.new_layout,
  isLogin: meta.is_login,
  data: loadVersionData(meta.data_file),
  releaseDate: meta.release_date,
  plannedEOL: meta.planned_eol,
  desc: meta.desc_zh,
  desc_en: meta.desc_en,
  initPrevious: meta.init_previous,
  docs_list: meta.docs_list?.map((d: any) => ({
    name: d.name_zh,
    nameEn: d.name_en,
    path: d.path_zh,
    pathEn: d.path_en,
  })),
  versionCapabilityPath: meta.version_capability_path ? replacePlaceholders(meta.version_capability_path) : undefined,
  releaseNotesDocs: meta.release_notes_docs ? resolvePlaceholders(meta.release_notes_docs) : undefined,
}));

const formatList = [
  { category: 'openGauss Server', name_zh: 'openGauss数据库' },
  { category: 'oGRAC Server', name_zh: 'oGRAC数据库' },
  { category: 'openGauss Connectors', name_zh: 'openGauss驱动' },
  { category: 'oGRAC Connectors', name_zh: 'oGRAC驱动' },
  { category: 'openGauss Symbol', name_zh: 'openGauss符号表下载' },
  { category: 'openGauss Tools', name_zh: 'openGauss工具集' },
];

export const downloadName: Record<string, string> = Object.fromEntries(
  formatList.map((item) => [item.category, item.name_zh]),
);

export default downloadData;
