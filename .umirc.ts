import { IConfig } from 'umi-types'; // ref: https://umijs.org/config/

const config: IConfig = {
  treeShaking: true,
  targets: {
    ie: 11,
  },
  routes: [
    {
      path: '/engine',
      component: '../layouts/EngineLayout/index',
      routes: [
        {
          path: '/engine',
          component: './engine/cube/index',
        },
        {
          path: '/engine/cube',
          component: './engine/cube/index',
        },
        {
          path: '/engine/workflow/index',
          component: './engine/workflow/index',
        },
        {
          path: '/engine',
          component: '../pages/index',
        },
      ],
    },
    {
      path: '/spa',
      component: '../layouts/SpaLayout/index',
      routes: [
        {
          path: '/spa',
          component: '../pages/index',
        },
      ],
    },
    {
      path: '/protal',
      component: '../layouts/ProtalLayout/index',
      routes: [
        {
          path: '/protal',
          component: '../pages/index',
        },
      ],
    },
    {
      path: '/',
      component: '../pages/index',
    },
  ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: '自定义管理系统',
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
      },
    ],
  ],
};
export default config;
