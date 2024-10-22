import AddTaskIcon from '@mui/icons-material/AddTask';
import BugReportIcon from '@mui/icons-material/BugReport';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import TerrainIcon from '@mui/icons-material/Terrain';
import DashboardIcon from '@mui/icons-material/Dashboard';

import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';
import {
  ROUTE_AUTH_FORGOT_PASSWORD,
  ROUTE_AUTH_LOGIN,
  ROUTE_AUTH_REGISTER_ACCOUNT,
  ROUTE_AUTH_SET_PASSWORD,
  ROUTE_DASHBOARD,
  ROUTE_HOME,
  ROUTE_SUPABASE_CALLBACK,
} from '@/constant/route';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_HOME,
    title: '首页',
    icon: HomeIcon,
  },
  [Pages.WelcomeCallback]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/SupabaseCallback')),
    path: ROUTE_SUPABASE_CALLBACK,
    title: '社交登录回调页',
  },
  [Pages.Login]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_AUTH_LOGIN,
    title: '登录',
  },
  [Pages.SetPassword]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_AUTH_SET_PASSWORD,
    title: '设置密码',
  },
  [Pages.ForgotPassword]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/AuthPage')),
    path: ROUTE_AUTH_FORGOT_PASSWORD,
    title: '找回密码',
  },
  [Pages.RegisterAccount]: {
    component: asyncComponentLoader(() => import('@/pages/Auth/RegisterOnboarding')),
    path: ROUTE_AUTH_REGISTER_ACCOUNT,
    title: '注册账户',
  },
  // [Pages.RegisterCooperation]: {
  //   component: asyncComponentLoader(() => import('@/pages/Auth/RegisterOnboarding')),
  //   path: ROUTE_AUTH_REGISTER_COOPERATION,
  //   title: '填写合作意向',
  // },
  // [Pages.RegisterSuccess]: {
  //   component: asyncComponentLoader(() => import('@/pages/Auth/RegisterOnboarding')),
  //   path: ROUTE_AUTH_REGISTER_SUCCESS,
  //   title: '注册成功',
  // },
  [Pages.Dashboard]: {
    component: asyncComponentLoader(() => import('@/pages/Dashboard')),
    path: ROUTE_DASHBOARD,
    title: 'Dashboard',
    icon: DashboardIcon,
  },
  [Pages.Page1]: {
    component: asyncComponentLoader(() => import('@/pages/Page1')),
    path: '/page-1',
    title: 'Page 1',
    icon: GitHubIcon,
  },
  [Pages.Page2]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/page-2',
    title: 'Page 2',
    icon: AddTaskIcon,
  },
  [Pages.Page3]: {
    component: asyncComponentLoader(() => import('@/pages/Page3')),
    path: '/page-3',
    title: 'Page 3',
    icon: TerrainIcon,
  },
  [Pages.Page4]: {
    component: asyncComponentLoader(() => import('@/pages/Page4')),
    path: '/page-4',
    title: 'Page 4',
    icon: BugReportIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
