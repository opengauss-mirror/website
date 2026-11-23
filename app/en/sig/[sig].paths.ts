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

import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

export default {
  async paths() {
    try {
      const res = await fetch('https://magicapi.osinfra.cn/stat/sig/info?community=opengauss');
      const json = load(await readFile(join(dirname(fileURLToPath(import.meta.url)), '../../../.content/sig/en.yaml'))).reduce((obj, item) => {
        obj[item.sig_name] = item;
        return obj;
      }, {} as Record<string, any>);
      if (!res.ok) return [];
      const sigs = await res.json();
      return (
        sigs?.data
          ?.filter((sig: any) => !!json[sig.name])
          .map((sig: any) => {
            return {
              params: {
                sig: sig.name,
                description: json[sig.name].description,
                lang: 'en',
                memberJsonLd: sig.committer_info
                  .map((c: any) => ({
                    '@type': 'Person',
                    name: c.name,
                    jobTitle: 'Committer',
                  }))
                  .concat(
                    sig.maintainer_info.map((m: any) => ({
                      '@type': 'Person',
                      name: m.name,
                      jobTitle: 'Maintainer',
                    }))
                  ),
              },
            };
          }) ?? []
      );
    } catch (e) {
      console.log(e);
      return [];
    }
  },
};
