// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: '反馈',
    path: 'https://github.com/alibaba/ice/issues/new',
    external: true,
    newWindow: true,
    icon: 'message',
  },
  {
    name: '帮助',
    path: 'https://alibaba.github.io/ice',
    external: true,
    newWindow: true,
    icon: 'bangzhu',
  },
];

const asideMenuConfig = [
  {
    name: '首页',
    path: '/dashboard',
    icon: 'home',
  },
  {
    name: '文章',
    icon: 'publish',
    path: '/post',
    children: [
      {
        name: '阅读统计',
        path: '/post/analysis',
      },
      {
        name: '文章列表',
        path: '/post/list',
      },
      {
        name: '发布文章',
        path: '/post/new',
      },
    ],
  },
  {
    name: '账号',
    icon: 'yonghu',
    path: '/account',
    children: [
      {
        name: '设置',
        path: '/account/settings',
      },
    ],
  },
];

export { headerMenuConfig, asideMenuConfig };
