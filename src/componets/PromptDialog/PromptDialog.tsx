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

import { Dialog } from '@kyligence/milhouse-react';
import Icon, { IconName } from '@kyligence/milhouse-react-icon';
import { ButtonProps } from '@kyligence/milhouse-react/dist/types/Button';
import clsx from 'clsx';
import { useIntl } from 'umi';

import style from './PromptDialog.less';

interface Props {
  className?: string;
  visible: boolean;
  cancelText?: string;
  onCancel: (visible: boolean) => void;
  headTitle?: React.ReactNode;
  okText?: string | React.ReactNode;
  onOk?: () => void;
  confirmLoading?: boolean;
  children?: React.ReactNode;
  headIconName?: ValueOf<typeof IconName>;
  fillFooter?: boolean;
  width?: number;
  cancelButtonProps?: ButtonProps;
  okButtonProps?: ButtonProps;
  closable?: boolean;
}

export default function PromptDialog(props: Props) {
  const {
    className,
    headTitle,
    visible,
    okText,
    cancelText,
    onCancel,
    onOk,
    confirmLoading = false,
    headIconName,
    children,
    fillFooter = true,
    width = 400,
    cancelButtonProps,
    okButtonProps,
    closable = false,
  } = props;
  const classNames = useClassNames(className);
  const { formatMessage } = useIntl();

  return (
    <Dialog
      forceRender
      className={classNames.promptDialog}
      fillFooter={fillFooter}
      destroyOnClose
      closable={closable}
      okText={okText}
      okButtonProps={okButtonProps}
      width={width}
      title={
        <div className={classNames.head}>
          {headIconName && <Icon name={headIconName} />}
          {headTitle ||
            formatMessage({
              id: 'kz.ms.text.dialog.default_title',
              defaultMessage: 'Message',
            })}
        </div>
      }
      visible={visible}
      onCancel={() => onCancel(false)}
      cancelButtonProps={cancelButtonProps}
      cancelText={
        cancelText ||
        formatMessage({
          id: 'kz.ms.text.cancel',
          defaultMessage: 'Cancel',
        })
      }
      onOk={() => (onOk ? onOk() : onCancel(false))}
      confirmLoading={confirmLoading}
    >
      {children}
    </Dialog>
  );
}

function useClassNames(className?: string) {
  return {
    promptDialog: clsx('prompt-dialog', style['prompt-dialog'], className),
    head: clsx('head', style.head),
  };
}
