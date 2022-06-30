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

import type {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  Canceler,
} from 'axios';

export type Method = 'delete' | 'get' | 'patch' | 'post' | 'put';

export type RequestConfig<D> = AxiosRequestConfig<D>;

export type Request = <T, D = undefined>(
  url: string,
  data?: D,
  config?: RequestConfig<D>,
) => Promise<T>;

export type CancellableRequest = <T, D = undefined>(
  url: string,
  data?: D,
  config?: RequestConfig<D>,
) => [Promise<T>, Canceler];

export type Error<T, D = undefined> = AxiosError<T, D>;

export type Response<T, D = undefined> = AxiosResponse<T, D>;

export type Instance = AxiosInstance;

export type BaseClient<R = Request> = { [key in Method]: R };

export type CancellableClient = BaseClient<CancellableRequest>;
