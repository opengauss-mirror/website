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

import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { isClient, isUndefined } from '@opensig/opendesign';

type LocaleT = 'zh' | 'en';

export const useLocale = () => {
  const { t, locale } = useI18n();
  const $t = t;

  const isZh = computed(() => locale.value === 'zh');
  const isEn = computed(() => locale.value === 'en');

  watch(
    () => isZh.value,
    () => {
      if (!isClient) {
        return;
      }
      if (isZh.value) {
        document.documentElement.lang = 'zh';
      } else {
        document.documentElement.lang = 'en';
      }
    },
    {
      immediate: true,
    }
  );

  // 语言切换
  const changeLocale = (lang?: LocaleT) => {
    if (locale.value === lang) {
      return;
    }

    const language = isUndefined(lang) ? (isZh.value ? 'en' : 'zh') : lang;
    locale.value = language;
  };

  return {
    t,
    $t,
    locale,
    isZh,
    isEn,
    changeLocale,
  };
};
