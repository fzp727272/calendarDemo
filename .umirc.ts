import { IConfig } from 'umi-types';

// ref: https://umijs.org/config/
const config: IConfig = {
  treeShaking: true,
  define: {
    'process.env.apiUrl': 'https://localhost:44350',
    //'process.env.apiUrl': 'http://137.116.133.47:88',
    //  'process.env.apiUrl':  'http://52.141.7.21:8081',
  },
  theme: 'src/style/theme.js',

  plugins: [
    [
      'umi-plugin-nprogress',
      {
        global: true,
      },
    ],
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'demo',
        dll: false,

        routes: {
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },

        locale: {
          default: 'zh-CN', //默认语言 zh-CN
          baseNavigator: true, // 为true时，用navigator.language的值作为默认语言
          antd: true, // 是否启用antd的<LocaleProvider />
        },
      },
    ],
  ],
};

export default config;
