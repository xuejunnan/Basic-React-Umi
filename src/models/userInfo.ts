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

import { useCallback } from 'react';
import { useImmer } from 'use-immer';

import { getCurrentUserInfo } from '@/services';
import { useService } from '@/utils/service';

interface IAMUserInfo {
  user_id: string; // 用户ID
  tenant_id: string; // 租户ID
  username: string; // 登录用户名(小写)
  alias_name: string; // 用户名 默认为注册用户名
  user_type: number; // 用户类型 0 本地用户
  default_pwd: boolean; // 是否默认密码
  group_info_list?: string[];
  last_login_time?: number;
}
interface UserInfoState {
  userInfoReturned: boolean;
  userInfo: IAMUserInfo;
}
const DEFAULT_STATE: UserInfoState = {
  userInfoReturned: false,
  userInfo: {} as IAMUserInfo,
};

export default function UserInfo() {
  const [state, setState] = useImmer<UserInfoState>(DEFAULT_STATE);

  const setReset = useCallback(() => {
    setState((draft) => {
      draft.userInfoReturned = false;
    });
  }, [setState]);

  const setUserInfo = useCallback(
    (userInfo: Partial<IAMUserInfo>) => {
      setState((draft) => {
        draft.userInfo = {
          ...draft.userInfo,
          ...userInfo,
        };
      });
    },
    [setState],
  );

  const { run: fetchCurrentUserInfo } = useService(getCurrentUserInfo, {
    manual: true,
    onSuccess: (data) => {
      setUserInfo(data);
      setState((draft) => {
        draft.userInfoReturned = true;
      });
    },
    onError: () => {
      setState((draft) => {
        draft.userInfoReturned = true;
      });
    },
  });

  const actions = {
    setReset,
    setUserInfo,
    fetchCurrentUserInfo,
  };
  const states = { ...state };

  return {
    actions,
    states,
  };
}
