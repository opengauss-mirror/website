import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import axios from 'axios';
import type { AxiosResponse } from 'axios';
import { request, intactRequest } from '../../../app/.vitepress/src-new/shared/axios';

type Deferred = { promise: Promise<any>; resolve: (v: any) => void; reject: (e: any) => void };

function deferred(): Deferred {
  let resolve: (v: any) => void = () => {};
  let reject: (e: any) => void = () => {};
  const promise = new Promise<any>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

function makeResponse(config: any, data: any, status = 200): AxiosResponse {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config,
  } as AxiosResponse;
}

// 每个 url 对应一个可控的 deferred，用于在不发起真实网络请求的前提下控制 adapter 行为
let adapterMap: Map<string, Deferred>;

beforeEach(() => {
  adapterMap = new Map();
  // 用自定义 adapter 取代真实网络层：首次访问某 url 时创建 deferred
  (request.defaults as any).adapter = (config: any) => {
    const url = config.url || '';
    if (!adapterMap.has(url)) {
      adapterMap.set(url, deferred());
    }
    return adapterMap.get(url)!.promise.then((v) => makeResponse(config, v));
  };
});

afterEach(async () => {
  // 排空所有未决 deferred，让模块级 pendingPool 在用例间保持干净
  for (const d of adapterMap.values()) {
    try {
      d.resolve({});
    } catch (e) {
      // ignore
    }
  }
  adapterMap.clear();
  // 等待一个宏任务，确保响应拦截器把池中条目清掉
  await new Promise((r) => setTimeout(r, 0));
  try {
    request.clearPendingPool();
  } catch (e) {
    // ignore
  }
});

describe('shared/axios 模块导出与 axios 1.x 稳定 API（升级回归）', () => {
  it('导出 request 实例与 intactRequest 实例', () => {
    expect(request).toBeDefined();
    expect(intactRequest).toBeDefined();
  });

  it('request 挂载 removeRequestInterceptor / removeResponseInterceptor / clearPendingPool', () => {
    expect(typeof request.removeRequestInterceptor).toBe('function');
    expect(typeof request.removeResponseInterceptor).toBe('function');
    expect(typeof request.clearPendingPool).toBe('function');
  });

  it('intactRequest 仍暴露 CancelToken / isCancel / Cancel（axios 1.20.0 稳定 API，未因升级移除）', () => {
    expect(typeof intactRequest.CancelToken).toBe('function');
    expect(typeof intactRequest.isCancel).toBe('function');
    expect(typeof intactRequest.Cancel).toBe('function');
  });

  it('axios 默认导出同样保留 CancelToken / isCancel / Cancel', () => {
    expect(typeof axios.CancelToken).toBe('function');
    expect(typeof axios.isCancel).toBe('function');
    expect(typeof axios.Cancel).toBe('function');
  });
});

describe('isCancel 判定', () => {
  it('axios.isCancel 对 Cancel 实例返回 true', () => {
    const cancel = new axios.Cancel('manual cancel');
    expect(axios.isCancel(cancel)).toBe(true);
    expect(intactRequest.isCancel(cancel)).toBe(true);
  });

  it('axios.isCancel 对普通错误 / 普通对象返回 false', () => {
    expect(axios.isCancel(new Error('normal error'))).toBe(false);
    expect(axios.isCancel({ message: 'x' })).toBe(false);
    expect(axios.isCancel(null)).toBe(false);
    expect(axios.isCancel(undefined)).toBe(false);
  });

  it('通过 CancelToken.source 取消后，isCancel 判定为 true', () => {
    const source = axios.CancelToken.source();
    source.cancel('aborted by source');
    expect(axios.isCancel(source.token.reason)).toBe(true);
  });
});

describe('CancelToken 重复请求取消', () => {
  it('同一 url 在途时再次请求，第二次被取消（isCancel 为 true）', async () => {
    const url = '/dup/cancel-a';

    // 第一次请求：进入 pendingPool，adapter 挂起（deferred 未 resolve）
    const first = request.get(url);
    first.catch(() => {});
    // 等待宏任务，确保请求拦截器已把 url 写入 pendingPool 并调用 adapter
    await new Promise((r) => setTimeout(r, 0));

    // 第二次请求：url 已在池中，请求拦截器调用 cancelFn 取消
    let caught: any;
    try {
      await request.get(url);
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeDefined();
    expect(axios.isCancel(caught)).toBe(true);

    // 排空第一次请求
    adapterMap.get(url)?.resolve({});
    try {
      await first;
    } catch (e) {
      // ignore
    }
  });

  it('请求成功后从池中移除，后续同 url 请求不再被取消', async () => {
    const url = '/dup/ok-b';
    // 预置已 resolve 的 deferred，使 adapter 立即返回成功响应
    const d = deferred();
    adapterMap.set(url, d);
    d.resolve({ ok: true });

    const res1 = await request.get(url);
    expect(res1).toBeDefined();

    // 池中应已清空，第二次请求不会被取消
    const res2 = await request.get(url);
    expect(res2).toBeDefined();
  });
});

describe('clearPendingPool', () => {
  it('空池时返回 null', () => {
    expect(request.clearPendingPool()).toBeNull();
  });

  it('取消所有非全局 pending 请求并返回被取消的 url 列表', async () => {
    const url = '/clear/cancel-a';
    const first = request.get(url);
    first.catch(() => {});
    await new Promise((r) => setTimeout(r, 0));

    const cancelled = request.clearPendingPool();
    expect(Array.isArray(cancelled)).toBe(true);
    expect(cancelled).toContain(url);
    // 池已清空，再次调用返回 null
    expect(request.clearPendingPool()).toBeNull();

    // token 已被 clearPendingPool 取消；让 adapter settle 后，
    // axios 在 onAdapterResolution 中 throwIfCancellationRequested → 以 Cancel reject
    adapterMap.get(url)?.resolve({});
    let caught: any;
    try {
      await first;
    } catch (e) {
      caught = e;
    }
    expect(caught).toBeDefined();
    expect(axios.isCancel(caught)).toBe(true);
  });

  it('白名单内的 url 不被取消（返回 null）', async () => {
    const url = '/clear/wl-a';
    const first = request.get(url);
    let rejected = false;
    first.catch(() => {
      rejected = true;
    });
    await new Promise((r) => setTimeout(r, 0));

    const cancelled = request.clearPendingPool([url]);
    expect(cancelled).toBeNull();
    // 白名单内请求保持 pending，未被取消
    await new Promise((r) => setTimeout(r, 0));
    expect(rejected).toBe(false);

    // token 未被取消，resolve adapter 后请求正常成功
    adapterMap.get(url)?.resolve({});
    const res = await first;
    expect(res).toBeDefined();
    expect(rejected).toBe(false);
  });

  it('global 请求不被 clearPendingPool 取消', async () => {
    const url = '/clear/global-a';
    const first = request.get(url, { global: true });
    let rejected = false;
    first.catch(() => {
      rejected = true;
    });
    await new Promise((r) => setTimeout(r, 0));

    // global 请求出现在返回列表中，但不会被实际取消
    const cancelled = request.clearPendingPool();
    expect(Array.isArray(cancelled)).toBe(true);
    expect(cancelled).toContain(url);
    await new Promise((r) => setTimeout(r, 0));
    expect(rejected).toBe(false);

    // 清理：手动 resolve adapter 使该请求完成并移出池
    adapterMap.get(url)?.resolve({});
    try {
      await first;
    } catch (e) {
      // ignore
    }
  });
});
