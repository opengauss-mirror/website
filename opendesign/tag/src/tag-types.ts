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

type TagType = 'outline' | 'primary' | 'secondary' | 'text' | 'disabled';

export const tagProps = {
  size: {
    type: String as PropType<SizeType>,
    default: 'medium',
  },
  type: {
    type: String as PropType<TagType>,
    default: 'outline',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  checkable: {
    type: Boolean,
    default: false,
  },
};

export type TagProps = ExtractDefaultPropTypes<typeof tagProps>;
