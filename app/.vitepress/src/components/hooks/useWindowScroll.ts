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

import { onMounted, onUnmounted, ref } from 'vue';
import { isBrowser } from '@/shared/utils';

const useWindowSroll = () => {
  let top = NaN;

  const pageScrollTop = () => window.scrollY || document.documentElement.scrollTop || document.body.scrollTop;

  if (isBrowser()) {
    top = pageScrollTop();
  }

  const scrollTop = ref(top);
  const onScroll = () => {
    scrollTop.value =
      pageScrollTop();
  };

  onMounted(() => {
    scrollTop.value =
      pageScrollTop();

    window.addEventListener('scroll', onScroll);
  });

  onUnmounted(() => {
    window.removeEventListener('scroll', onScroll);
  });

  return scrollTop;
};

export default useWindowSroll;
