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

import { ExtractDefaultPropTypes, InjectionKey, PropType, Ref } from 'vue';

export const checkboxGroupProps = {
  // 双向绑定值
  modelValue: {
    type: Array as PropType<Array<string | number | boolean>>,
    default: null,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type CheckboxGroupProps = ExtractDefaultPropTypes<
  typeof checkboxGroupProps
>;

interface CheckboxGroupInjection {
  modelValue: Ref<Array<string | number | boolean>>;
  disabled: Ref<boolean>;
  onChange: (val: Array<string | number | boolean>) => void;
}

export const checkboxGroupKey: InjectionKey<CheckboxGroupInjection> =
  Symbol('OCheckboxGroup');
