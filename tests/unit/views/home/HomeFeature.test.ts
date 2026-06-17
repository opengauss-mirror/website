import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { LEARN_VIDEO_LINK as LEARN_VIDEO_LINK_NEW } from '../../../../app/.vitepress/src-new/data/url-config/index.ts';
import { LEARN_VIDEO_LINK as LEARN_VIDEO_LINK_OLD } from '../../../../app/.vitepress/src/data/url-config/index.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const PPT_FILENAME = 'openGauss%E9%9D%A2%E5%90%91%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E7%9A%84%E5%BC%80%E6%BA%90%E6%95%B0%E6%8D%AE%E5%BA%93%E6%A0%B9%E7%A4%BE%E5%8C%BA.pptx';
const OLD_PPT_PATTERN = 'openGauss%20%E6%8A%9C%E6%9C%AF%E6%9E%B6%E6%9E%84.pptx';
const OBS_BASE = 'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com';

const featureVuePath = resolve(rootDir, 'app/.vitepress/src-new/views/home/HomeFeature.vue');
const homeZhPath = resolve(rootDir, 'app/.vitepress/src/i18n/home/home-zh.ts');
const homeEnPath = resolve(rootDir, 'app/.vitepress/src/i18n/home/home-en.ts');

describe('HomeFeature PPT download link - URL base', () => {
  it('LEARN_VIDEO_LINK (new) is correct OBS endpoint', () => {
    expect(LEARN_VIDEO_LINK_NEW).toBe(OBS_BASE);
  });

  it('LEARN_VIDEO_LINK (old) matches new version', () => {
    expect(LEARN_VIDEO_LINK_OLD).toBe(LEARN_VIDEO_LINK_NEW);
  });
});

describe('HomeFeature PPT download link - new filename', () => {
  it('HomeFeature.vue PPT_LINK uses new filename', () => {
    const content = readFileSync(featureVuePath, 'utf-8');
    expect(content).toContain(PPT_FILENAME);
    expect(content).not.toContain(OLD_PPT_PATTERN);
  });

  it('home-zh.ts DOWN_link uses new filename', () => {
    const content = readFileSync(homeZhPath, 'utf-8');
    expect(content).toContain(PPT_FILENAME);
    expect(content).not.toContain(OLD_PPT_PATTERN);
  });

  it('home-en.ts DOWN_link uses new filename', () => {
    const content = readFileSync(homeEnPath, 'utf-8');
    expect(content).toContain(PPT_FILENAME);
    expect(content).not.toContain(OLD_PPT_PATTERN);
  });
});

describe('HomeFeature PPT download link - i18n sync', () => {
  it('zh and en DOWN_link resolve to identical URL', () => {
    const zhContent = readFileSync(homeZhPath, 'utf-8');
    const enContent = readFileSync(homeEnPath, 'utf-8');

    const zhMatch = zhContent.match(/DOWN_link:\s*`([^`]+)`/);
    const enMatch = enContent.match(/DOWN_link:\s*`([^`]+)`/);

    expect(zhMatch).not.toBeNull();
    expect(enMatch).not.toBeNull();
    expect(zhMatch![1]).toBe(enMatch![1]);
  });

  it('HomeFeature.vue PPT_LINK and i18n DOWN_link both reference same filename', () => {
    const featureContent = readFileSync(featureVuePath, 'utf-8');
    const zhContent = readFileSync(homeZhPath, 'utf-8');
    const enContent = readFileSync(homeEnPath, 'utf-8');

    const pptLinkMatch = featureContent.match(/PPT_LINK\s*=\s*`([^`]+)`/);
    const zhDownLinkMatch = zhContent.match(/DOWN_link:\s*`([^`]+)`/);
    const enDownLinkMatch = enContent.match(/DOWN_link:\s*`([^`]+)`/);

    expect(pptLinkMatch).not.toBeNull();
    expect(zhDownLinkMatch).not.toBeNull();
    expect(enDownLinkMatch).not.toBeNull();

    const expectedTemplate = `\${LEARN_VIDEO_LINK}/${PPT_FILENAME}`;
    expect(pptLinkMatch![1]).toBe(expectedTemplate);
    expect(zhDownLinkMatch![1]).toBe(expectedTemplate);
    expect(enDownLinkMatch![1]).toBe(expectedTemplate);
  });
});

describe('HomeFeature PPT download link - old filename removed', () => {
  it('no file contains the old encoded Chinese PPT filename', () => {
    const files = [featureVuePath, homeZhPath, homeEnPath];
    for (const filePath of files) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).not.toContain(OLD_PPT_PATTERN);
    }
  });
});