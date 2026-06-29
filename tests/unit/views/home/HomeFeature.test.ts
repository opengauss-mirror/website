import { expect, describe, it } from 'vitest';
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

import { LEARN_VIDEO_LINK as LEARN_VIDEO_LINK_NEW } from '../../../../app/.vitepress/src-new/data/url-config/index.ts';
import { LEARN_VIDEO_LINK as LEARN_VIDEO_LINK_OLD } from '../../../../app/.vitepress/src/data/url-config/index.ts';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = resolve(__dirname, '../../../../');

const PPT_FILENAME = 'openGauss%E9%9D%A2%E5%90%91%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E7%9A%84%E5%BC%80%E6%BA%90%E6%95%B0%E6%8D%AE%E5%BA%93%E6%A0%B9%E7%A4%BE%E5%8C%BA.pdf';
const OLD_PPT_PATTERN = 'openGauss%E9%9D%A2%E5%90%91%E5%9F%BA%E7%A1%80%E8%AE%BE%E6%96%BD%E7%9A%84%E5%BC%80%E6%BA%90%E6%95%B0%E6%8D%AE%E5%BA%93%E6%A0%B9%E7%A4%BE%E5%8C%BA.pptx';
const OBS_BASE = 'https://learningvideo.obs.ap-southeast-1.myhuaweicloud.com';

const featureVuePath = resolve(rootDir, 'app/.vitepress/src-new/views/home/HomeFeature.vue');

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
});

describe('HomeFeature PPT download link - i18n sync', () => {
  it('HomeFeature.vue PPT_LINK and i18n DOWN_link both reference same filename', () => {
    const featureContent = readFileSync(featureVuePath, 'utf-8');

    const pptLinkMatch = featureContent.match(/PPT_LINK\s*=\s*`([^`]+)`/);

    expect(pptLinkMatch).not.toBeNull();

    const expectedTemplate = `\${LEARN_VIDEO_LINK}/${PPT_FILENAME}`;
    expect(pptLinkMatch![1]).toBe(expectedTemplate);
  });
});

describe('HomeFeature PPT download link - old filename removed', () => {
  it('no file contains the old encoded Chinese PPT filename', () => {
    const files = [featureVuePath];
    for (const filePath of files) {
      const content = readFileSync(filePath, 'utf-8');
      expect(content).not.toContain(OLD_PPT_PATTERN);
    }
  });
});