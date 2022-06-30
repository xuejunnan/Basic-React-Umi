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

interface StylerOption {
  keepOriginal?: boolean; // Keep the raw class name into the output of string. Easy for testing to get the XPath
}

/**
 * Enhance the result of get class name from style file.
 * @param style the imported object from style file, used to handle module css's hashed class name
 * @param baseOption see `StylerOption` interface
 * @returns class name string
 */
export function createStyler(
  style: Record<string, string>,
  baseOption: StylerOption = { keepOriginal: true },
) {
  return function styler(className: string, option?: StylerOption) {
    const finalOption = { ...baseOption, ...option };
    return concatClasses(
      style[className],
      finalOption?.keepOriginal && className,
    );
  };
}

/**
 * Concat class name list into single valid sting
 * @param names class name list
 * @returns valid string class names, remove unvalid names
 */
function concatClasses(
  ...names: (string | number | boolean | undefined | null)[]
): string {
  return names.filter(isValidClassName).join(' ');
}

/**
 * Check unknown data type of class name, if it's valid
 * @param name the class name to be valid
 * @returns if the class name is valid
 */
function isValidClassName(name: unknown): boolean {
  if (name == null) return false;
  if (name === '') return false;

  const type = typeof name;
  if (['boolean', 'function', 'object', 'symbol'].includes(type)) return false;

  return true;
}
