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

// import React from "react";
// import { history } from 'umi';

/**
 * dva 运行时配置, 更多配置参见dva官网：https://dvajs.com/api/#app-use-hooks
 */
// export const dva = {
//   config: {
//     onError(err: any) {
//       err.preventDefault();
//       alert(err.message);
//     },
//   },
// };

/**
 * 修改 clientRender 参数（比如在微前端里动态修改渲染根节点）
 * @param memo
 */
// export function modifyClientRenderOpts(memo: any) {
//   console.log("🚀 ~ file: app.tsx ~ line 7 ~ modifyClientRenderOpts ~ memo", memo)
// }

/**
 * 动态修改路由信息（比如在原路由配置的最前面添加一个 /foo 路由，直接修改routes，不需要返回）
 * @param param0
 */
// export function patchRoutes({ routes }: any) {
//   routes.unshift({
//     path: '/foo',
//     exact: true,
//     component: require('@/extraRoutes/foo').default,
//   });
// }

/**
 * 覆写 render（比如用于渲染之前做权限校验）
 * @param oldRender 原始的render方法，自己的逻辑处理完成之后、一定记得要调用该方法，否则dom不会渲染
 */
// export function render(oldRender: any) {
//   fetch('/api/auth').then((auth: any) => {
//     if (auth.isLogin) { oldRender() }
//     else {
//       history.push('/login');
//       oldRender()
//     }
//   });
// }

/**
 * 在初始加载和路由切换时做一些事情（比如用于做埋点统计、根据不同路由设置不同的页面标题）
 * @param param0
 */
// export function onRouteChange({ location, routes, action, matchedRoutes }: any) {
//   if (matchedRoutes.length) {
//     document.title = matchedRoutes[matchedRoutes.length - 1].route.title || '';
//   }
// }

/**
 * 修改交给 react-dom 渲染时的根组件（比如用于在外面包一个 Provider）
 * @param container { routes: 全量路由配置, plugin: 运行时插件机制, history: history 实例 }
 * @returns
 */
// export function rootContainer(container: any) {
//   return React.createElement(ThemeProvider, null, container);
// }

/**
 * 微前端qiankun运行时配置
 */
