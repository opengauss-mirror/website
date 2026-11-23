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

import { ref, onMounted, onUnmounted, Ref } from 'vue';
const useClickOutside = (elementRef: Ref<HTMLElement | null>) => {
  const isClickOutside = ref(false);
  const onClick = (e: MouseEvent) => {
    if (elementRef.value) {
      isClickOutside.value = !elementRef.value.contains(
        e.target as HTMLElement
      );
    }
  };
  onMounted(() => {
    window.addEventListener('click', onClick);
  });
  onUnmounted(() => {
    window.removeEventListener('click', onClick);
  });
  return isClickOutside;
};

export default useClickOutside;
