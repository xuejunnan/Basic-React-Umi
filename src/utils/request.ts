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

import axios, {
  AxiosRequestConfig,
  AxiosRequestHeaders,
  AxiosResponse,
} from 'axios';

/**
 * get 请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 * @param headers 额外的head配置
 * @returns promise 实例
 */
export function get<T>(
  url: string,
  params: AxiosRequestConfig['params'],
  headers?: AxiosRequestHeaders,
) {
  return axios
    .get<T>(url, { params, headers })
    .then((res: AxiosResponse<T>) => {
      return res;
    })
    .catch((error) => {
      throw new Error(error);
    });
}

/**
 * post 请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 * @param headers 额外的head配置
 * @returns promise 实例
 */
export function post<T>(
  url: string,
  params: AxiosRequestConfig['params'],
  headers?: AxiosRequestHeaders,
) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, { headers })
      .then((res: AxiosResponse<T>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * put 请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 * @param headers 额外的head配置
 * @returns promise 实例
 */
export function put<T>(
  url: string,
  params: AxiosRequestConfig['params'],
  headers?: AxiosRequestHeaders,
) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params, { headers })
      .then((res: AxiosResponse<T>) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

/**
 * del 请求
 * @param url 请求的url地址
 * @param params 请求时携带的参数
 * @param headers 额外的head配置
 * @returns promise 实例
 */
export function del(
  url: string,
  params: AxiosRequestConfig['params'],
  headers?: AxiosRequestHeaders,
) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, { data: params, headers })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

// type ResponseWithData<T = any> = { data?: T; [key: string]: any };
// export type { ResponseWithData };

export default axios;
