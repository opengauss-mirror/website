import { expect, describe, it } from 'vitest';
import { PRIORITY_MAP, DEFAULT_PRIORITY, normalizeSitemapUrl } from '../../../app/.vitepress/sitemap-priority';

function getPriority(url: string): number {
  const normalized = normalizeSitemapUrl(url);
  for (const [pattern, prio] of PRIORITY_MAP) {
    if (pattern.test(normalized)) {
      return prio;
    }
  }
  return DEFAULT_PRIORITY;
}

describe('normalizeSitemapUrl', () => {
  it('removes .html suffix and adds trailing slash', () => {
    expect(normalizeSitemapUrl('/zh/download.html')).toBe('/zh/download/');
  });

  it('preserves URL already ending with slash', () => {
    expect(normalizeSitemapUrl('/zh/download/')).toBe('/zh/download/');
  });

  it('adds trailing slash to URL without one', () => {
    expect(normalizeSitemapUrl('/zh/download')).toBe('/zh/download/');
  });

  it('handles homepage URL with .html', () => {
    expect(normalizeSitemapUrl('/zh.html')).toBe('/zh/');
  });

  it('handles URL ending with slash after .html removal', () => {
    expect(normalizeSitemapUrl('/zh/download/life-cycle.html')).toBe('/zh/download/life-cycle/');
  });

  it('handles en prefix', () => {
    expect(normalizeSitemapUrl('/en/download')).toBe('/en/download/');
  });
});

describe('PRIORITY_MAP homepage (1.0)', () => {
  it('/zh/ gets priority 1.0', () => {
    expect(getPriority('/zh/')).toBe(1.0);
  });

  it('/en/ gets priority 1.0', () => {
    expect(getPriority('/en/')).toBe(1.0);
  });

  it('/zh.html normalizes to 1.0', () => {
    expect(getPriority('/zh.html')).toBe(1.0);
  });

  it('/en.html normalizes to 1.0', () => {
    expect(getPriority('/en.html')).toBe(1.0);
  });
});

describe('PRIORITY_MAP navigation level-1 pages (0.8)', () => {
  const navPages = [
    'download', 'events', 'news', 'blogs', 'member', 'contribution',
    'video', 'training', 'certification', 'ogsp', 'migration',
    'vulnerability-management', 'security-advisories', 'cve', 'tools',
    'compatibility', 'honor', 'finance', 'user-practice',
    'online-communication', 'ai', 'ogmemory', 'quick-start',
    'advanced', 'bigshot-voice', 'team-up', 'call-for-meetup', 'summit',
  ];

  for (const page of navPages) {
    it(`/zh/${page}/ gets priority 0.8`, () => {
      expect(getPriority(`/zh/${page}/`)).toBe(0.8);
    });

    it(`/en/${page}/ gets priority 0.8`, () => {
      expect(getPriority(`/en/${page}/`)).toBe(0.8);
    });
  }
});

describe('PRIORITY_MAP navigation level-2/detail pages (0.6)', () => {
  it('/zh/download/life-cycle/ gets priority 0.6', () => {
    expect(getPriority('/zh/download/life-cycle/')).toBe(0.6);
  });

  it('/zh/download/archive/ gets priority 0.6', () => {
    expect(getPriority('/zh/download/archive/')).toBe(0.6);
  });

  it('/zh/download/finance/ gets priority 0.6', () => {
    expect(getPriority('/zh/download/finance/')).toBe(0.6);
  });

  it('/en/download/life-cycle/ gets priority 0.6', () => {
    expect(getPriority('/en/download/life-cycle/')).toBe(0.6);
  });

  it('/zh/member/detail/ gets priority 0.6', () => {
    expect(getPriority('/zh/member/detail/')).toBe(0.6);
  });

  it('/zh/migration/case/ gets priority 0.6', () => {
    expect(getPriority('/zh/migration/case/')).toBe(0.6);
  });

  it('/zh/video/detail/ gets priority 0.6', () => {
    expect(getPriority('/zh/video/detail/')).toBe(0.6);
  });

  it('/zh/cve/detail/ gets priority 0.6', () => {
    expect(getPriority('/zh/cve/detail/')).toBe(0.6);
  });

  it('/zh/security-advisories/detail/ gets priority 0.6', () => {
    expect(getPriority('/zh/security-advisories/detail/')).toBe(0.6);
  });

  it('/zh/bigshot-voice/detail/ gets priority 0.6', () => {
    expect(getPriority('/zh/bigshot-voice/detail/')).toBe(0.6);
  });

  it('/zh/summit/summit2024/ gets priority 0.6', () => {
    expect(getPriority('/zh/summit/summit2024/')).toBe(0.6);
  });

  it('/zh/summit/devday2024/ gets priority 0.6', () => {
    expect(getPriority('/zh/summit/devday2024/')).toBe(0.6);
  });

  it('/en/summit/summit2024/ gets priority 0.6', () => {
    expect(getPriority('/en/summit/summit2024/')).toBe(0.6);
  });

  it('/zh/call-for-meetup/collect/ gets priority 0.6', () => {
    expect(getPriority('/zh/call-for-meetup/collect/')).toBe(0.6);
  });

  it('/zh/team-up/form/ gets priority 0.6', () => {
    expect(getPriority('/zh/team-up/form/')).toBe(0.6);
  });

  it('/zh/training/signup/ gets priority 0.6', () => {
    expect(getPriority('/zh/training/signup/')).toBe(0.6);
  });

  it('/zh/community/meetup-form/ gets priority 0.6', () => {
    expect(getPriority('/zh/community/meetup-form/')).toBe(0.6);
  });

  it('/zh/about-us/ gets priority 0.6', () => {
    expect(getPriority('/zh/about-us/')).toBe(0.6);
  });

  it('/zh/brand/ gets priority 0.6', () => {
    expect(getPriority('/zh/brand/')).toBe(0.6);
  });

  it('/zh/faq/ gets priority 0.6', () => {
    expect(getPriority('/zh/faq/')).toBe(0.6);
  });
});

describe('PRIORITY_MAP content pages (0.4)', () => {
  it('/zh/events/list/ gets priority 0.4', () => {
    expect(getPriority('/zh/events/list/')).toBe(0.4);
  });

  it('/zh/events/2024-01-15/ gets priority 0.4', () => {
    expect(getPriority('/zh/events/2024-01-15/')).toBe(0.4);
  });

  it('/en/events/2024-01-15/ gets priority 0.4', () => {
    expect(getPriority('/en/events/2024-01-15/')).toBe(0.4);
  });

  it('/zh/news/2024/ gets priority 0.4', () => {
    expect(getPriority('/zh/news/2024/')).toBe(0.4);
  });

  it('/en/news/2024/ gets priority 0.4', () => {
    expect(getPriority('/en/news/2024/')).toBe(0.4);
  });

  it('/zh/blogs/2024/ gets priority 0.4', () => {
    expect(getPriority('/zh/blogs/2024/')).toBe(0.4);
  });

  it('/en/blogs/2024/ gets priority 0.4', () => {
    expect(getPriority('/en/blogs/2024/')).toBe(0.4);
  });

  it('/zh/news/2024/some-post/ gets priority 0.4', () => {
    expect(getPriority('/zh/news/2024/some-post/')).toBe(0.4);
  });

  it('/zh/blogs/2024/some-post/ gets priority 0.4', () => {
    expect(getPriority('/zh/blogs/2024/some-post/')).toBe(0.4);
  });

  it('/zh/user-practice/bigbusiness/ gets priority 0.4', () => {
    expect(getPriority('/zh/user-practice/bigbusiness/')).toBe(0.4);
  });

  it('/zh/user-practice/finance/ gets priority 0.4', () => {
    expect(getPriority('/zh/user-practice/finance/')).toBe(0.4);
  });

  it('/en/user-practice/education/ gets priority 0.4', () => {
    expect(getPriority('/en/user-practice/education/')).toBe(0.4);
  });
});

describe('PRIORITY_MAP legal/tools pages (0.2)', () => {
  it('/zh/legal/ gets priority 0.2', () => {
    expect(getPriority('/zh/legal/')).toBe(0.2);
  });

  it('/en/legal/ gets priority 0.2', () => {
    expect(getPriority('/en/legal/')).toBe(0.2);
  });

  it('/zh/privacy/ gets priority 0.2', () => {
    expect(getPriority('/zh/privacy/')).toBe(0.2);
  });

  it('/en/privacy/ gets priority 0.2', () => {
    expect(getPriority('/en/privacy/')).toBe(0.2);
  });

  it('/zh/cookies/ gets priority 0.2', () => {
    expect(getPriority('/zh/cookies/')).toBe(0.2);
  });

  it('/zh/data-sharing-with-third-parties/ gets priority 0.2', () => {
    expect(getPriority('/zh/data-sharing-with-third-parties/')).toBe(0.2);
  });

  it('/zh/personal-data-collection-overview/ gets priority 0.2', () => {
    expect(getPriority('/zh/personal-data-collection-overview/')).toBe(0.2);
  });

  it('/zh/search/ gets priority 0.2', () => {
    expect(getPriority('/zh/search/')).toBe(0.2);
  });

  it('/zh/notifications/ gets priority 0.2', () => {
    expect(getPriority('/zh/notifications/')).toBe(0.2);
  });

  it('/zh/home1/ gets priority 0.2', () => {
    expect(getPriority('/zh/home1/')).toBe(0.2);
  });

  it('/zh/summit/devday2024/legal/ gets priority 0.2', () => {
    expect(getPriority('/zh/summit/devday2024/legal/')).toBe(0.2);
  });

  it('/zh/summit/devday2024/privacy/ gets priority 0.2', () => {
    expect(getPriority('/zh/summit/devday2024/privacy/')).toBe(0.2);
  });
});

describe('DEFAULT_PRIORITY for unmatched URLs', () => {
  it('/zh/some-unknown-page/ gets default priority 0.5', () => {
    expect(getPriority('/zh/some-unknown-page/')).toBe(DEFAULT_PRIORITY);
  });

  it('/en/some-unknown-page/ gets default priority 0.5', () => {
    expect(getPriority('/en/some-unknown-page/')).toBe(DEFAULT_PRIORITY);
  });

  it('DEFAULT_PRIORITY is 0.5', () => {
    expect(DEFAULT_PRIORITY).toBe(0.5);
  });

  it('root / gets default priority 0.5', () => {
    expect(getPriority('/')).toBe(DEFAULT_PRIORITY);
  });
});

describe('URL normalization + priority integration', () => {
  it('.html URL for homepage resolves to 1.0', () => {
    expect(getPriority('/zh.html')).toBe(1.0);
  });

  it('.html URL for nav page resolves to 0.8', () => {
    expect(getPriority('/zh/download.html')).toBe(0.8);
  });

  it('.html URL for legal page resolves to 0.2', () => {
    expect(getPriority('/zh/legal.html')).toBe(0.2);
  });

  it('URL without trailing slash for nav page resolves to 0.8', () => {
    expect(getPriority('/zh/download')).toBe(0.8);
  });
});

describe('PRIORITY_MAP first-match-wins behavior', () => {
  it('summit detail page (0.6) takes precedence over summit nav page (0.8)', () => {
    expect(getPriority('/zh/summit/summit2024/')).toBe(0.6);
  });

  it('events list (0.4) takes precedence over events nav page (0.8)', () => {
    expect(getPriority('/zh/events/list/')).toBe(0.4);
  });
});
