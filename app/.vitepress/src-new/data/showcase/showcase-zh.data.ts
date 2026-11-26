/*
 * Copyright (c) 2026 Huawei Technologies Co., Ltd.
 * website is licensed under Mulan PSL v2.
 * You can use this software according to the terms and conditions of the Mulan PSL v2.
 * You may obtain a copy of Mulan PSL v2 at:
 *          http://license.coscl.org.cn/MulanPSL2
 * THIS SOFTWARE IS PROVIDED ON AN "AS IS" BASIS, WITHOUT WARRANTIES OF ANY KIND,
 * EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO NON-INFRINGEMENT,
 * MERCHANTABILITY OR FIT FOR A PARTICULAR PURPOSE.
 * See the Mulan PSL v2 for more details.
 */

import { createContentLoader, defineLoader } from 'vitepress';
import { ShowCaseData } from '.';

// 案例分类 id（frontmatter.id，英文）-> 中文分类名，用于归一化 md 中可能中英文混写的 industry
const INDUSTRY_ZH: Record<string, string> = {
  Finance: '金融',
  Carrier: '运营商',
  Internet: '互联网',
  Manufacture: '制造',
  Energy: '能源',
  DBV: 'DBV',
  ISV: 'ISV',
  Education: '教育',
  Bigbusiness: '大企业',
  Medical: '医疗',
  Others: '其他',
};

declare const data: ShowCaseData[];
export { data };

export default defineLoader(
  createContentLoader('zh/user-practice/**/*.md', {
    includeSrc: false,
    render: false,
    transform(data) {
      return data
        .filter((p) => p.frontmatter.category === 'showcase')
        .map((p) => {
          const fm = p.frontmatter;
          const id = fm.id || '';
          return {
            title: fm.title || fm.company || '',
            company: fm.company || fm.title || '',
            summary: fm.summary || '',
            industry: INDUSTRY_ZH[id] || fm.industry || '',
            id,
            // detail === true 表示该案例有站内详情页，列表卡片展示“案例详情”按钮
            detail: fm.detail === true,
            officialPath: fm.officialPath || '',
            path: p.url.replace(/^\//, '').replace(/\.html$/, ''),
          };
        })
        .sort((a, b) => a.path.localeCompare(b.path));
    },
  })
);
