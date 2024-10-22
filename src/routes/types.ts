import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

export enum Pages {
  Welcome,
  Login,
  // RegisterCooperation,
  RegisterAccount,
  ForgotPassword,
  WelcomeCallback,
  Page1,
  Page2,
  Page3,
  Page4,
  NotFound,
  Dashboard,
  SetPassword,
  // RegisterSuccess,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
