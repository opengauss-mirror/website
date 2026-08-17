import { readFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

export default {
  async paths() {
    try {
      const res = await fetch('https://magicapi.osinfra.cn/stat/sig/info?community=opengauss');
      const json = load(await readFile(join(dirname(fileURLToPath(import.meta.url)), '../../../.content/sig/zh.yaml'))).reduce((obj, item) => {
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
                lang: 'zh',
                memberJsonLd: sig.committer_info
                  .map((c: any) =>
                    JSON.stringify({
                      '@type': 'Person',
                      name: c.name,
                      jobTitle: 'Committer',
                    })
                  )
                  .concat(
                    sig.maintainer_info.map((m: any) =>
                      JSON.stringify({
                        '@type': 'Person',
                        name: m.name,
                        jobTitle: 'Maintainer',
                      })
                    )
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
