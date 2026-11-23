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

import { computed, MaybeRefOrGetter, ref, toValue } from 'vue';

interface CheckboxData {
  label: string;
  value: string | number;
}

export default (data: MaybeRefOrGetter<CheckboxData[]>, initalValue?: (string | number)[]) => {
  const checkboxValues = ref<(string | number)[]>(initalValue ?? []);

  const checkAll = computed({
    get() {
      return checkboxValues.value.length === toValue(data).length ? [1] : [];
    },
    set(val) {
      if (val.length) {
        checkboxValues.value = toValue(data).map((item) => item.value);
      } else {
        checkboxValues.value = [];
      }
    },
  });

  const indeterminate = computed(() => {
    return checkboxValues.value.length > 0 && checkboxValues.value.length < toValue(data).length;
  });

  return {
    checkboxValues,
    checkAll,
    indeterminate,
  };
};
