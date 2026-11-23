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

import Clipboard from 'clipboard';
interface ClipboardJSExtended extends ClipboardJS {
  onClick: (event: MouseEvent) => void;
}

export const useClipboard = (options: {
  text: string;
  target: MouseEvent;
  success?: Function;
  error?: Function;
}) => {
  const clipboard = new Clipboard(options.target.currentTarget as Element, {
    text: () => options.text,
  }) as ClipboardJSExtended;
  clipboard.on('success', (e) => {
    options?.success && options?.success(e);
    clipboard.destroy();
  });
  clipboard.on('error', (e) => {
    options?.error && options?.error(e);
    clipboard.destroy();
  });
  clipboard.onClick(options.target);
};
