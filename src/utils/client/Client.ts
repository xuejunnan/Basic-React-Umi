/*
Copyright (C) 2022 Kyligence Inc. All rights reserved.

http://kyligence.io

This software is the confidential and proprietary information of
Kyligence Inc. ("Confidential Information"). You shall not disclose
such Confidential Information and shall use it only in accordance
with the terms of the license agreement you entered into with
Kyligence Inc.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
"AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
(INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {
  AxiosRequestTransformer,
  AxiosResponseTransformer,
  CancelToken,
  Canceler,
} from 'axios';

import type {
  BaseClient,
  CancellableClient,
  Error,
  Instance,
  Method,
  Request,
  RequestConfig,
} from './interface';

/******************************************************************************
 * Constants
 *****************************************************************************/
const METHODS = ['delete', 'get', 'patch', 'post', 'put'] as const;
const PARAMS_METHODS = ['get', 'delete'];

const defaultTransformResponse = ([] as AxiosResponseTransformer[]).concat(
  axios.defaults.transformResponse ?? ((data) => data),
);
const defaultTransformRequest = ([] as AxiosRequestTransformer[]).concat(
  axios.defaults.transformRequest ?? ((config) => config),
);

/******************************************************************************
 * Utils
 *****************************************************************************/
function makeInstanceRequestMethodCreator(
  instance: Instance,
): (method: Method) => Request {
  return (method) => (url, data, config) =>
    instance.request({
      url,
      method,
      [PARAMS_METHODS.includes(method) ? 'params' : 'data']: data,
      ...patchConfig(config),
    });
}

/**
 * if any transformer set in config, keep axios' defaults config excuted first
 */
function patchConfig(config?: RequestConfig<any>) {
  if (config == null) return config;
  const { transformRequest, transformResponse, ...rest } = config;

  return {
    ...rest,
    transformRequest:
      transformRequest && defaultTransformRequest.concat(transformRequest),
    transformResponse:
      transformResponse && defaultTransformResponse.concat(transformResponse),
  };
}

/******************************************************************************
 * Default Export
 *****************************************************************************/
export default class Client {
  private readonly instance: Instance;

  private readonly config?: RequestConfig<any>;

  readonly delete: Request;

  readonly get: Request;

  readonly patch: Request;

  readonly post: Request;

  readonly put: Request;

  constructor(config?: RequestConfig<any>) {
    const patchedConfig = patchConfig(config);
    const instance = axios.create(patchedConfig);

    const createMethod = makeInstanceRequestMethodCreator(instance);
    this.delete = createMethod('delete');
    this.get = createMethod('get');
    this.patch = createMethod('patch');
    this.post = createMethod('post');
    this.put = createMethod('put');

    this.instance = instance;
    this.config = patchedConfig;
  }

  static getCancelToken(): [CancelToken, Canceler] {
    const { token, cancel } = axios.CancelToken.source();
    return [token, cancel];
  }

  static isClientError(payload: any): payload is Error<any, any> {
    return axios.isAxiosError(payload);
  }

  static isCancel = axios.isCancel;

  getInstance(): Instance {
    return this.instance;
  }

  // using current instance config to create a new copy
  // NOTICE: not include any interceptors
  clone(): Instance {
    return axios.create(this.config);
  }

  cancellable(): CancellableClient;
  cancellable(cancelToken: CancelToken): BaseClient;
  cancellable(cancelToken?: CancelToken): BaseClient | CancellableClient {
    if (cancelToken != null) {
      return METHODS.reduce((acc, cur) => {
        acc[cur] = (url, data, config) =>
          this.instance[cur](url, data, { ...config, cancelToken });
        return acc;
      }, {} as BaseClient);
    }

    const [token, cancel] = Client.getCancelToken();
    return METHODS.reduce((acc, cur) => {
      acc[cur] = (url, data, config) => [
        this.instance[cur](url, data, { ...config, cancelToken: token }),
        cancel,
      ];
      return acc;
    }, {} as CancellableClient);
  }
}
