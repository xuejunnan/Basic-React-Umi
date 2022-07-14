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

import { useEffect } from 'react';

import { useService } from '@/utils/service';
import postDemo from '@/services/postDemo';

function Metric() {
  const { run: test1, data } = useService(postDemo, {
    manual: true,
    onSuccess: (data) => {
      console.log(data);
    },
  });
  function ObjectToTree(strarr) {
    const objTree = {};
    // 深度遍历
    const dfs = (pro_arr, obj, val) => {
      for (let i = 0; i < pro_arr.length - 1; i++) {
        // 如果没有就赋值新对象
        if (!obj[pro_arr[i]]) obj[pro_arr[i]] = {};
        obj = obj[pro_arr[i]];
      }
      // 最后一个直接赋值
      obj[pro_arr[pro_arr.length - 1]] = val;
    };
    for (const keys in strarr) {
      dfs(keys.split('.'), objTree, strarr[keys]);
    }
    console.log(objTree);
    return objTree;
  }
  const testarr = {
    'a.b.c.d': 1,
    'a.b.c.e': 2,
    'a.b.f': 3,
    'a.j': 4,
  };
  useEffect(() => {
    // test1();
    ObjectToTree(testarr);
  }, []);
  return (
    <div>
      <p>metric page</p>
    </div>
  );
}

Metric.routeName = 'METRIC';
Metric.wrappers = ['@/wrappers/auth'];
export default Metric;
