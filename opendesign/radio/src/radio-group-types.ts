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

export const radioGroupProps = {
  // 双向绑定值
  modelValue: {
    type: [String, Number, Boolean] as PropType<string | number | boolean>,
    default: null,
  },
  // 是否禁用
  disabled: {
    type: Boolean,
    default: false,
  },
};

export type RadioGroupProps = ExtractDefaultPropTypes<typeof radioGroupProps>;

interface RadioGroupInjection {
  modelValue: Ref<string | number | boolean>;
  disabled: Ref<boolean>;
  onChange: (val: string | number | boolean) => void;
}

export const radioGroupKey: InjectionKey<RadioGroupInjection> =
  Symbol('ORadioGroup');
