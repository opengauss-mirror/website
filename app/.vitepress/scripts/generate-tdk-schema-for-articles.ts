import type { PageData } from 'vitepress';

const articlePathPattern = /\/?(?:zh|en)\/(news|user-practice|events)/;
const SITE_URL = 'https://opengauss.org';

type Lang = 'zh' | 'en';
type ArticleType = 'news' | 'events' | 'user-practice';

interface JsonLD {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

function getLang(filePath: string): Lang {
  return filePath.startsWith('zh/') ? 'zh' : 'en';
}

function buildUrl(filePath: string): string {
  let relativePath = filePath.replace(/\.md$/, '').replace(/\\/g, '/');
  const isIndex = relativePath.endsWith('/index');
  if (isIndex) {
    relativePath = relativePath.slice(0, -6);
    return `${SITE_URL}/${relativePath}/`;
  }
  return `${SITE_URL}/${relativePath}.html`;
}

function formatDate(dateStr: string): string | null {
  if (!dateStr) return null;
  try {
    const parts = String(dateStr).split('-');
    if (parts.length !== 3) return null;
    return `${parts[0].padStart(4, '0')}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
  } catch {
    return null;
  }
}

function parseEventTime(timeStr: string): { startDate: string | null; endDate: string | null } {
  if (!timeStr) return { startDate: null, endDate: null };

  const formatSingleDate = (str: string): string | null => {
    const parts = str.split('/');
    if (parts.length !== 3) return null;
    return `${parts[0].padStart(4, '0')}-${parts[1].padStart(2, '0')}-${parts[2].padStart(2, '0')}`;
  };

  if (timeStr.includes('-')) {
    const [startPart, endPart] = timeStr.split('-');
    return {
      startDate: formatSingleDate(startPart.trim()),
      endDate: formatSingleDate(endPart.trim()),
    };
  }

  return {
    startDate: formatSingleDate(timeStr),
    endDate: null,
  };
}

function getEventAttendanceMode(label: string): string {
  if (!label) return 'https://schema.org/MixedEventAttendanceMode';
  const lower = label.toLowerCase();
  if (lower.includes('线上') && lower.includes('线下')) {
    return 'https://schema.org/MixedEventAttendanceMode';
  }
  if (lower.includes('线上') || lower === 'online') {
    return 'https://schema.org/OnlineEventAttendanceMode';
  }
  return 'https://schema.org/OfflineEventAttendanceMode';
}

function getEventStatus(startDateStr: string): string {
  if (!startDateStr) return 'https://schema.org/EventScheduled';
  const startDate = new Date(startDateStr);
  const now = new Date();
  if (startDate < now) {
    return 'https://schema.org/EventEnded';
  }
  return 'https://schema.org/EventScheduled';
}

function getIndustryMapping(industry: string, lang: Lang): string {
  const industryMapZh: Record<string, string> = {
    '金融': 'Finance',
    '运营商': 'Telecommunications',
    'DBV': 'Database Vendor',
    '制造': 'Manufacturing',
    '教育': 'Education',
    '互联网': 'Internet',
    '医疗': 'Healthcare',
    '其他': 'Other',
    '大企业': 'Large Enterprise',
    'ISV': 'Independent Software Vendor',
  };
  const industryMapEn: Record<string, string> = {
    'Finance': 'Finance',
    'Carrier': 'Telecommunications',
    'DBV': 'Database Vendor',
    'Manufacture': 'Manufacturing',
    'Education': 'Education',
    'Internet': 'Internet',
    'Medical': 'Healthcare',
    'Others': 'Other',
    'Bigbusiness': 'Large Enterprise',
    'ISV': 'Independent Software Vendor',
  };
  const map = lang === 'zh' ? industryMapZh : industryMapEn;
  return map[industry] || industry;
}

function generateKeywords(title: string, type: ArticleType, lang: Lang): string {
  const baseKeywords = ['openGauss', lang === 'en' ? 'open source database' : '开源数据库'];
  const typeKeywords: Record<ArticleType, string[]> = {
    news: lang === 'zh' ? ['openGauss新闻', 'openGauss动态'] : ['openGauss news', 'openGauss updates'],
    events: lang === 'zh' ? ['openGauss活动', 'openGauss会议'] : ['openGauss events', 'openGauss meetup'],
    'user-practice': lang === 'zh' ? ['用户实践', '案例分享'] : ['user practice', 'case study'],
  };
  const keywords = [...baseKeywords, ...typeKeywords[type]];
  const titleKeywords = title
    .replace(/[【[】\]]/g, '')
    .split(/[,，、\s]+/)
    .filter((k) => k.length > 1 && !keywords.includes(k))
    .slice(0, 3);
  keywords.push(...titleKeywords);
  return keywords.join(', ');
}

function generateNewsArticleJsonLD(
  frontmatter: Record<string, any>,
  filePath: string,
  lang: Lang,
): JsonLD | null {
  const title = String(frontmatter.title || '');
  const summary = String(frontmatter.summary || '');
  const author = frontmatter.author || 'openGauss';
  const datePublished = formatDate(String(frontmatter.date || ''));

  if (!title || !datePublished) return null;

  const url = buildUrl(filePath);
  const jsonLD: JsonLD = {
    '@context': 'https://schema.org',
    '@type': 'NewsArticle',
    headline: title,
    description: summary,
    author: {
      '@type': 'Organization',
      name: Array.isArray(author) ? author[0] : author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'openGauss',
      url: SITE_URL,
    },
    datePublished,
    dateModified: datePublished,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    url,
    inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
  };

  if (frontmatter.banner) {
    const banner = String(frontmatter.banner);
    const bannerPath = banner.startsWith('/')
      ? banner
      : `/category/news/${datePublished}/${banner}`;
    jsonLD.image = `${SITE_URL}${bannerPath}`;
  }

  if (frontmatter.img) {
    jsonLD.image = `${SITE_URL}${frontmatter.img}`;
  }

  return jsonLD;
}

function generateEventJsonLD(
  frontmatter: Record<string, any>,
  filePath: string,
  lang: Lang,
): JsonLD | null {
  const title = String(frontmatter.title || '');
  const summary = String(frontmatter.summary || '');
  const organizer = frontmatter.author || 'openGauss';
  const location = String(frontmatter.location || '');
  const label = String(frontmatter.label || '');
  const img = String(frontmatter.img || '');

  let timeInfo = parseEventTime(String(frontmatter.time || ''));
  if (!timeInfo.startDate && frontmatter.date) {
    timeInfo = { startDate: formatDate(String(frontmatter.date)), endDate: null };
  }

  if (!title || !timeInfo.startDate) return null;

  const url = buildUrl(filePath);
  const jsonLD: JsonLD = {
    '@context': 'https://schema.org',
    '@type': 'Event',
    name: title,
    description: summary,
    startDate: timeInfo.startDate,
    eventStatus: getEventStatus(timeInfo.endDate || timeInfo.startDate),
    eventAttendanceMode: getEventAttendanceMode(label),
    url,
    inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
  };

  if (timeInfo.endDate) {
    jsonLD.endDate = timeInfo.endDate;
  }

  if (location) {
    const lowerLocation = location.toLowerCase();
    if (lowerLocation.includes('线上') || lowerLocation === 'online') {
      jsonLD.location = {
        '@type': 'VirtualLocation',
        url,
      };
    } else {
      jsonLD.location = {
        '@type': 'Place',
        name: location,
        address: {
          '@type': 'PostalAddress',
          addressLocality: location,
          addressCountry: 'CN',
        },
      };
    }
  }

  jsonLD.organizer = {
    '@type': 'Organization',
    name: Array.isArray(organizer) ? organizer[0] : organizer,
    url: SITE_URL,
  };

  if (img) {
    jsonLD.image = `${SITE_URL}${img}`;
  }

  if (frontmatter.img_mobile) {
    if (!jsonLD.image) {
      jsonLD.image = `${SITE_URL}${frontmatter.img_mobile}`;
    }
  }

  if (frontmatter.tags) {
    const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags : [frontmatter.tags];
    if (tags.length > 0) {
      jsonLD.eventType = tags.join(', ');
    }
  }

  return jsonLD;
}

function generateCaseStudyJsonLD(
  frontmatter: Record<string, any>,
  filePath: string,
  lang: Lang,
): JsonLD | null {
  const title = String(frontmatter.title || '');
  const summary = String(frontmatter.summary || '');
  const company = String(frontmatter.company || frontmatter.title || '');
  const industry = String(frontmatter.industry || '');
  const officialPath = String(frontmatter.officialPath || '');
  const id = String(frontmatter.id || '');

  if (!title) return null;

  const url = buildUrl(filePath);
  const jsonLD: JsonLD = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: title,
    description: summary,
    url,
    inLanguage: lang === 'zh' ? 'zh-CN' : 'en',
    publisher: {
      '@type': 'Organization',
      name: 'openGauss',
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
  };

  if (company) {
    const authorObj: Record<string, unknown> = {
      '@type': 'Organization',
      name: company,
    };
    if (officialPath) {
      authorObj.sameAs = officialPath;
    }
    jsonLD.author = authorObj;
  }

  if (industry) {
    const mappedIndustry = getIndustryMapping(industry, lang);
    jsonLD.articleSection = mappedIndustry;
    jsonLD.about = {
      '@type': 'Thing',
      name: mappedIndustry,
      description:
        lang === 'zh'
          ? `${company}在${mappedIndustry}领域的openGauss数据库实践案例`
          : `openGauss database case study by ${company} in ${mappedIndustry} industry`,
    };
  }

  if (officialPath) {
    jsonLD.sameAs = officialPath;
  }

  const keywords = [
    'openGauss',
    'database',
    'case study',
    'user practice',
    company,
    industry ? getIndustryMapping(industry, lang) : '',
  ].filter(Boolean);

  if (keywords.length > 0) {
    jsonLD.keywords = keywords.join(', ');
  }

  if (id) {
    jsonLD.genre = id;
  }

  return jsonLD;
}

function isValidCategory(type: ArticleType, category: string): boolean {
  const cat = category.toLowerCase();
  if (type === 'news') return cat === 'news';
  if (type === 'events') return cat === 'events' || cat === 'event';
  if (type === 'user-practice') return cat === 'showcase';
  return false;
}

export default function generateSEOManifest(pageData: PageData): boolean {
  const match = pageData.filePath.match(articlePathPattern);
  if (!match) return false;

  const type = match[1] as ArticleType;
  const lang = getLang(pageData.filePath);
  const frontmatter = pageData.frontmatter as Record<string, any>;

  const category = String(frontmatter.category || '').toLowerCase();
  if (!isValidCategory(type, category)) return false;

  const title = String(frontmatter.title || '');
  if (!title) return false;

  pageData.titleTemplate = `:title | ${lang === 'zh' ? 'openGauss社区官网' : 'openGauss Official Website'}`;

  const description = String(frontmatter.summary || '');
  if (description) {
    pageData.description = description;
  }
  pageData.title = title;

  const keywords = generateKeywords(title, type, lang);
  pageData.frontmatter.head ??= [];
  pageData.frontmatter.head.push(['meta', { name: 'keywords', content: keywords }]);

  let jsonLD: JsonLD | null = null;
  if (type === 'news') {
    jsonLD = generateNewsArticleJsonLD(frontmatter, pageData.filePath, lang);
  } else if (type === 'events') {
    jsonLD = generateEventJsonLD(frontmatter, pageData.filePath, lang);
  } else if (type === 'user-practice') {
    jsonLD = generateCaseStudyJsonLD(frontmatter, pageData.filePath, lang);
  }

  if (jsonLD) {
    pageData.frontmatter.head.push([
      'script',
      { type: 'application/ld+json' },
      JSON.stringify(jsonLD),
    ]);
  }

  return true;
}
