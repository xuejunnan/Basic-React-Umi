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

export function isHTMLString(value?: string): boolean {
  return value != null && /<\/?[a-z][\s\S]*>/i.test(value);
}

const { toString } = Object.prototype;

export function isNull(source: unknown): source is null {
  return toString.call(source) === '[object Null]';
}

export function isUndefined(source: unknown): source is undefined {
  return toString.call(source) === '[object Undefined]';
}

export function isNone(source: unknown): source is null | undefined {
  return isUndefined(source) || isNull(source);
}

export function isString(source: unknown): source is string {
  return toString.call(source) === '[object String]';
}

export function isDate(source: unknown): source is Date {
  return toString.call(source) === '[object Date]';
}

export function isNumber(source: unknown): source is number {
  return toString.call(source) === '[object Number]';
}

export function isNaN(source: unknown): source is typeof NaN {
  return isNumber(source) && Number.isNaN(source);
}

export function isArray(source: unknown): source is [] {
  return Array.isArray(source);
}

export function isObject(
  source: unknown,
): source is { [key: string]: unknown } {
  return toString.call(source) === '[object Object]';
}

// eslint-disable-next-line @typescript-eslint/ban-types
export function isFunction(source: unknown): source is Function {
  return source instanceof Function;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isPromise(source: unknown): source is Promise<any> {
  return isObject(source) && 'then' in source && isFunction(source.then);
}

export function isEmpty(source: unknown): boolean {
  if (isArray(source)) return source.length === 0;
  if (isObject(source)) return Object.keys(source).length === 0;
  if (isString(source)) return source === '';
  return source == null;
}

export function isDeepEqual(source: unknown, target: unknown): boolean {
  if (source === target) return true;

  if (!isObject(source) && !isObject(target)) return source === target;

  if (isObject(source) && isObject(target)) {
    const sourceKeys = Object.keys(source);
    const targetKeys = Object.keys(target);

    return (
      sourceKeys.length === targetKeys.length &&
      sourceKeys.every((key) => isDeepEqual(source[key], target[key]))
    );
  }

  return false;
}

export function isJSONString(source: unknown): source is string {
  if (!isString(source)) return false;

  try {
    JSON.parse(source);
  } catch (e) {
    return false;
  }

  return true;
}
