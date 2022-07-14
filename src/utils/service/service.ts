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

import { PATHS, getLocale, history } from 'umi';
import { generatePath } from 'react-router-dom';
import { Message } from '@ui';

import Client from '../client';

import ServiceError from './error';
import { useLoginUrl } from './hook';

/* eslint-disable @typescript-eslint/no-explicit-any */

/******************************************************************************
 * Constants
 *****************************************************************************/

// setting 5 mins request timeout
// eslint-disable-next-line react-hooks/rules-of-hooks

const REQUEST_TIMEOUT = 1000 * 60 * 5; // eslint-disable-line no-magic-numbers
const HTTP_STATUS = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
} as const;

/******************************************************************************
 * Types
 *****************************************************************************/

/******************************************************************************
 * Exports
 *****************************************************************************/
export function getCancelToken() {
  return Client.getCancelToken();
}

/******************************************************************************
 * Default Export
 *****************************************************************************/

const client = new Client({
  timeout: REQUEST_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    // TODO adapt front-end locale
    'accept-language': 'en',
  },
  // transformResponse: (data) => data.data, // destructure default response template from backend server
});

export default client;

/******************************************************************************
 * Interceptors
 *****************************************************************************/
const instance = client.getInstance();

// request拦截器
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    alert(error);
    return Promise.reject(error);
  },
);

// response拦截器
instance.interceptors.response.use(
  (response) => response.data?.data, // destructure default format of AxiosResponse, return AxiosResponse.data
  (error) => {
    const serviceError = new ServiceError(error, (err) => {
      if (err.isResponseError()) {
        const locale = getLocale();
        let replacePath = '';

        switch (err.status) {
          case HTTP_STATUS.NOT_FOUND:
            replacePath = generatePath(PATHS.NO_FOUND_PAGE, { locale });
            break;
          case HTTP_STATUS.UNAUTHORIZED:
            replacePath = useLoginUrl();

            break;
          default:
          // do nothing
        }

        if (replacePath) history.replace(replacePath);
        if (err.allowDefaultMessage) Message.error(err.message);
      }
    });

    // NOTICE: errors handle by global, can't be prevent in bussiness code
    if (serviceError.isNetworkError()) {
      Message.error('Network Error');
    } else if (serviceError.isInternalError()) {
      Message.error('Internal Error');
    } else if (serviceError.isRequestError()) {
      Message.error('Request Error');
    }

    return Promise.reject(serviceError);
  },
);
