import { defineConfig } from 'umi';
import path from 'path';
// import { routes } from "./config/routes";

export default defineConfig({
  // routes: routes,
  alias: {
    // default setting of umi
    // '@': 'src',
    // '@@': 'src/.umi',
    '@assets': path.resolve(__dirname, './src/assets'),
    '@componets': path.resolve(__dirname, './src/componets'),
    '@models': path.resolve(__dirname, './src/models'),
    '@pages': path.resolve(__dirname, './src/pages'),
    '@auth': path.resolve(__dirname, './src/wrappers/auth.tsx'),
    '@ui': '@kyligence/milhouse-react',
    '@ui-icon': '@kyligence/milhouse-react-icon',
  },
  plugins: ['@kyligence/plugin-easy-router'],
  title: false,
  devServer: { port: 8000 },
  nodeModulesTransform: { type: 'none' },
  dynamicImport: { loading: '@/Loading' }, // 路由组件按需加载
  mock: false,
  proxy: {
    '/api': {
      // target: 'http://10.1.3.150:9032/',
      target: 'http://10.1.3.150:9898',
      //target: 'https://gateway-qa.kyligence.io/zen/',
      // target: 'https://gateway-qa.kyligence.io/saas-kyiam/',
      // target: 'https://zen-qa.kyligence.io/',
      // target: 'http://10.125.55.18:9002',
      changeOrigin: true,
      pathRewrite: {},
    },
    '/insight': {
      // target: 'http://10.1.3.150:9001',
      target: 'http://10.1.3.150:9898/insight-wwj/',
      //target: 'https://gateway-qa.kyligence.io/insight/',
      // target: 'https://zen-qa.kyligence.io/',
      // target: 'http://10.1.3.150:9002/',
      changeOrigin: true,
      pathRewrite: {},
    },
    '/byzer': {
      //target: 'https://gateway-qa.kyligence.io/byzer/',
      //target: 'http://10.1.3.150:9898',
      // target: 'https://zen-qa.kyligence.io/', // QA 环境地址
      // target: 'http://10.1.3.150:9898',
      //  target: 'https://zen-qa.kyligence.io/', // QA 环境地址
      // target: 'http://10.1.3.150:9002/', // diting后端
      changeOrigin: true,
      pathRewrite: {},
    },
  },
  antd: false,
  locale: {
    default: 'zh-CN',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  easyRouter: {
    // localeKey: 'locale',
    // pathKey: 'routeName',
  },
  fastRefresh: {},
  extraBabelPlugins: [
    [
      'formatjs',
      {
        idInterpolationPattern: '[sha512:contenthash:base64:6]',
        ast: true,
      },
    ],
  ],
  chainWebpack: (config) => {
    // inject style variables into each style files
    config.module
      .rule('less')
      .oneOfs.values()
      .forEach((item) => {
        item
          .use('style-resources-loader')
          .loader('style-resources-loader')
          .options({
            patterns: [path.resolve(__dirname, 'src/assets/style/var.less')],
          })
          .end();
      });

    // Support `.d.ts` extensions to resolve
    config.resolve.extensions.add('.d.ts');
  },
  hash: true,
});
