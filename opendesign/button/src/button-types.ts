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

import { ExtractDefaultPropTypes, PropType } from 'vue';
import { SizeType } from '../../_utils/common';

type ButtonType = 'outline' | 'primary' | 'secondary' | 'text';
// TODO:status颜色规范待补充
type ButtonStatus = 'normal';
type ButtonNativeType = 'button' | 'submit' | 'reset';

export const buttonProps = {
  size: {
    type: String as PropType<SizeType>,
    default: 'medium',
  },
  type: {
    type: String as PropType<ButtonType>,
    default: 'outline',
  },
  status: {
    type: String as PropType<ButtonStatus>,
    default: 'nomral',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  animation: {
    type: Boolean,
    default: false,
  },
  nativeType: {
    type: String as PropType<ButtonNativeType>,
    default: 'button',
  },
};

export type ButtonProps = ExtractDefaultPropTypes<typeof buttonProps>;
