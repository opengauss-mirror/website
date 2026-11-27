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

// 案例分类 id（frontmatter.id）-> 英文分类名，用于归一化 md 中可能中英文混写的 industry
const INDUSTRY_EN: Record<string, string> = {
  Finance: 'Finance',
  Carrier: 'Carrier',
  Internet: 'Internet',
  Manufacture: 'Manufacture',
  Energy: 'Energy',
  DBV: 'DBV',
  ISV: 'ISV',
  Education: 'Education',
  Bigbusiness: 'Bigbusiness',
  Medical: 'Medical',
  Others: 'Others',
};

declare const data: ShowCaseData[];
export { data };

export default defineLoader(
  createContentLoader('en/user-practice/**/*.md', {
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
            industry: INDUSTRY_EN[id] || fm.industry || '',
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
