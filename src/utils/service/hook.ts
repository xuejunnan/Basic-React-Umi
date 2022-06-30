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
import { useRequest } from 'ahooks';
import {
  Options as HookOptions,
  Result,
} from 'ahooks/lib/useRequest/src/types';

import { BaseClient } from '@/utils/client';
import client, { ServiceError, getCancelToken } from '@/utils/service';

/******************************************************************************
 * Types
 *****************************************************************************/
export interface Options<T, P extends any[]>
  extends Omit<HookOptions<T, P>, 'onError'> {
  onError?: (error: ServiceError, params: P) => void;
}

export interface Service<T, P extends any[]> {
  (...params: P): (client: BaseClient) => Promise<T>;
}

/******************************************************************************
 * Exports
 *****************************************************************************/
export function useService<T, P extends any[]>(
  service: Service<T, P>,
  options?: Options<T, P>,
): Result<T, P> {
  return useRequest<T, P>(
    (...params: P) => service(...params)(client),
    options as HookOptions<T, P>,
  );
}

export function useCancellableService<T, P extends any[]>(
  service: Service<T, P>,
  options?: Options<T, P>,
): Result<T, P> {
  const [token, cancel] = getCancelToken();

  const result = useRequest(
    (...params: P) => service(...params)(client.cancellable(token)),
    options as HookOptions<T, P>,
  );

  return Object.assign(result, {
    cancel: (message?: string) => {
      cancel(message);
      result.cancel();
    },
  });
}
