import HomeIcon from '@mui/icons-material/Home';
import TerrainIcon from '@mui/icons-material/Terrain';
import DashboardIcon from '@mui/icons-material/Dashboard';

import asyncComponentLoader from '@/utils/loader';

import { Routes } from './types';
import {
  ROUTE_AUTH_FORGOT_PASSWORD,
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_REGISTER_ACCOUNT,
  ROUTE_AUTH_SET_PASSWORD,
  ROUTE_DASHBOARD,
  ROUTE_DASHBOARD_ENVIRONMENT_VARIABLE,
  ROUTE_DASHBOARD_HOME,
  ROUTE_HOME,
  ROUTE_SUPABASE_CALLBACK,
} from '@/constant/route';

const routes: Routes = [
  {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_HOME,
    title: '首页',
    icon: HomeIcon,
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Auth/SupabaseCallback')),
    path: ROUTE_SUPABASE_CALLBACK,
    title: '社交登录回调页',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Dashboard')),
    path: ROUTE_DASHBOARD,
    title: 'Dashboard',
    icon: DashboardIcon,
    children: [
      {
        component: asyncComponentLoader(() => import('@/pages/Dashboard/Home')),
        path: ROUTE_DASHBOARD_HOME,
        title: '首页',
        icon: TerrainIcon,
      },
      {
        component: asyncComponentLoader(() => import('@/pages/Dashboard/EnvironmentVariable')),
        path: ROUTE_DASHBOARD_ENVIRONMENT_VARIABLE,
        title: '环境变量',
        icon: TerrainIcon,
      },
      {
        component: asyncComponentLoader(() => import('@/pages/Dashboard/EnvironmentVariable/Edit')),
        path: `${ROUTE_DASHBOARD_ENVIRONMENT_VARIABLE}/:id`,
        title: '编辑环境变量',
      },
    ],
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_AUTH_LOGIN,
    title: '登录',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_AUTH_SET_PASSWORD,
    title: '设置密码',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_AUTH_FORGOT_PASSWORD,
    title: '找回密码',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/Auth/RegisterOnboarding')),
    path: ROUTE_AUTH_REGISTER_ACCOUNT,
    title: '注册账户',
  },
  {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
];

export default routes;
