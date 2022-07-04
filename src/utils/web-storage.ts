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

/******************************************************************************
 * Const
 *****************************************************************************/
const LOCAL = 'local';
const SESSION = 'session';

const STORAGE_KEY = {
  [LOCAL]: 'localStorage',
  [SESSION]: 'sessionStorage',
} as const;

/******************************************************************************
 * Types
 *****************************************************************************/
type StorageType = typeof LOCAL | typeof SESSION;
type StorageMap = Record<StorageType, Storage | undefined>;

/******************************************************************************
 * Utils
 *****************************************************************************/
const getStorage = ((global) => {
  const map: StorageMap = {
    [LOCAL]: undefined,
    [SESSION]: undefined,
  };

  return (type: StorageType) => {
    if (map[type] == null) {
      map[type] = global[STORAGE_KEY[type]];
    }

    if (map[type] == null) {
      throw new Error(`The ${STORAGE_KEY[type]} not supported.`);
    }

    return map[type]!;
  };
})(global);

const set =
  (type: StorageType) =>
  (key: string, val: string): void => {
    getStorage(type).setItem(key, val);
  };

const get =
  (type: StorageType) =>
  (key: string, def?: string): string | undefined => {
    return getStorage(type).getItem(key) ?? def;
  };

const remove =
  (type: StorageType) =>
  (key: string): void => {
    getStorage(type).removeItem(key);
  };

const clear = (type: StorageType) => (): void => {
  getStorage(type).clear();
};

/******************************************************************************
 * Exports
 *****************************************************************************/
export const setLocal = set(LOCAL);
export const getLocal = get(LOCAL);
export const removeLocal = remove(LOCAL);
export const clearLocal = clear(LOCAL);

export const setSession = set(SESSION);
export const getSession = get(SESSION);
export const removeSession = remove(SESSION);
export const clearSession = clear(SESSION);
