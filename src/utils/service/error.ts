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

import Client, { Error as ClientError } from '../client';

/* eslint-disable @typescript-eslint/no-explicit-any */

/******************************************************************************
 * Types
 *****************************************************************************/
type ErrorType =
  | 'INTERNAL_ERROR'
  | 'CLIENT_REQUEST_ERROR'
  | 'CLIENT_RESPONSE_ERROR'
  | 'CLIENT_ERROR';

/******************************************************************************
 * Types
 *****************************************************************************/
interface ResponseError extends ServiceError {
  status: number;
  statusText: string;
  code: string;
}

type ErrorHandler = (error: ServiceError) => void;

/******************************************************************************
 * Default Export
 *****************************************************************************/
export default class ServiceError {
  private _original: any;
  private _allowDefault = true;
  private _allowDefaultMessage = true;
  private _type: ErrorType = 'INTERNAL_ERROR';
  private _status?: number;
  private _statusText?: string;
  private _code?: string;
  private _message: string;

  private handleInternalError(_error: any) {
    this._type = 'INTERNAL_ERROR';
  }

  private handleResponseError(
    response: NonNullable<ClientError<any, any>['response']>,
  ) {
    this._type = 'CLIENT_RESPONSE_ERROR';
    this._status = response.status;
    this._statusText = response.statusText;
    // NOTICE: the response.data's structure defined by server side
    this._code = response.data?.code;
    // message from IAM is in the "msg" field
    this._message = response.data?.message || response.data?.msg;
  }

  private handleRequestError(
    _request: NonNullable<ClientError<any, any>['request']>,
  ) {
    this._type = 'CLIENT_REQUEST_ERROR';
  }

  private handleClientError(_error: ClientError<any, any>) {
    this._type = 'CLIENT_ERROR';
  }

  constructor(error: Error, handler?: ErrorHandler) {
    this._original = error;
    this._message = error.message;

    if (!Client.isClientError(error)) {
      this.handleInternalError(error);
    } else if (error.response) {
      this.handleResponseError(error.response);
    } else if (error.request) {
      this.handleRequestError(error.request);
    } else {
      this.handleClientError(error);
    }

    // The arrow function bind current `this` into setTimeout callback
    setTimeout(() => {
      if (this._allowDefault === true) handler?.(this);
    });
  }

  get original(): any {
    return this._original;
  }

  get type(): ErrorType {
    return this._type;
  }

  get status(): number | undefined {
    return this._status;
  }

  get statusText(): string | undefined {
    return this._statusText;
  }

  get code(): string | undefined {
    return this._code;
  }

  get message(): string {
    return this._message;
  }

  /**
   * 是否允许 service 的默认错误 message
   */
  get allowDefaultMessage(): boolean {
    return this._allowDefaultMessage;
  }

  isResponseError(): this is ResponseError {
    return this._type === 'CLIENT_RESPONSE_ERROR';
  }

  isRequestError() {
    return this._type === 'CLIENT_REQUEST_ERROR';
  }

  isClientError() {
    return this._type !== 'INTERNAL_ERROR';
  }

  isInternalError() {
    return this._type === 'INTERNAL_ERROR';
  }

  isCancelError() {
    return Client.isCancel(this._original);
  }

  isNetworkError() {
    return (
      this.isRequestError() &&
      'ERR_NETWORK' === (this._original as ClientError<any, any>).code
    );
  }

  /**
   * 阻止默认的错误处理逻辑，包括 401 跳转，默认错误 message 等
   */
  preventDefault() {
    this._allowDefault = false;
  }

  /**
   * 阻止默认的错误 message，保留默认的 401 跳转等处理逻辑。
   */
  preventDefaultMessage() {
    this._allowDefaultMessage = false;
  }
}
