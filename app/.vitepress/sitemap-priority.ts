export const PRIORITY_MAP: [RegExp, number][] = [
  [/^\/(zh|en)\/$/, 1.0],
  [/^\/(zh|en)\/(download|events|news|blogs|member|contribution|video|training|certification|ogsp|migration|vulnerability-management|security-advisories|cve|tools|compatibility|honor|finance|user-practice|online-communication|ai|ogmemory|quick-start|advanced|bigshot-voice|team-up|call-for-meetup|summit)\/$/, 0.8],
  [/^\/(zh|en)\/download\/(life-cycle|archive|finance)\/$/, 0.6],
  [/^\/(zh|en)\/member\/detail\/$/, 0.6],
  [/^\/(zh|en)\/migration\/case\/$/, 0.6],
  [/^\/(zh|en)\/(video|cve|security-advisories|bigshot-voice)\/detail\/$/, 0.6],
  [/^\/(zh|en)\/summit\/(summit\d+|devday\d+)\/$/, 0.6],
  [/^\/(zh|en)\/call-for-meetup\/collect\/$/, 0.6],
  [/^\/(zh|en)\/team-up\/form\/$/, 0.6],
  [/^\/(zh|en)\/training\/signup\//, 0.6],
  [/^\/(zh|en)\/community\/meetup-form\/$/, 0.6],
  [/^\/(zh|en)\/(about-us|brand|faq)\/$/, 0.6],
  [/^\/(zh|en)\/events\/(list|\d{4}-\d{2}-\d{2})\/$/, 0.4],
  [/^\/(zh|en)\/news\/\d{4}/, 0.4],
  [/^\/(zh|en)\/blogs\/\d{4}/, 0.4],
  [/^\/(zh|en)\/user-practice\/(bigbusiness|carrier|dbv|education|energy|finance|internet|isv|manufacture|medical|others)\//, 0.4],
  [/^\/(zh|en)\/(legal|privacy|cookies|data-sharing-with-third-parties|personal-data-collection-overview|search|notifications|home1)\/$/, 0.2],
  [/^\/(zh|en)\/summit\/devday\d+\/(legal|privacy)\/$/, 0.2],
];

export const DEFAULT_PRIORITY = 0.5;

export function normalizeSitemapUrl(url: string): string {
  let normalized = url.replace(/\.html$/, '');
  if (!normalized.endsWith('/')) {
    normalized += '/';
  }
  return normalized;
}
