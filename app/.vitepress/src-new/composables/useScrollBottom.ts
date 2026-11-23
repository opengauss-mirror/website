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

import type { OScroller } from '@opensig/opendesign';
import { type Ref, onMounted, nextTick } from 'vue';

const useScrollBottom = (scrollerRef: Ref<InstanceType<typeof OScroller>>, callback: () => void) => {
  const onScroll = (event: Event) => {
    const el = event.target as HTMLDivElement;
    if (el.scrollHeight - Math.round(el.scrollTop) <= el.clientHeight) {
      callback();
    }
  };

  onMounted(() => {
    nextTick(() => {
      const container = (scrollerRef.value?.$el as HTMLDivElement).querySelector('.o-scroller-container');
      container && container.addEventListener('scroll', onScroll);
    });
  });
};
export default useScrollBottom;
