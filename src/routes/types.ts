import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';
import type { SvgIconProps } from '@mui/material/SvgIcon';

export interface RouteConfig extends Omit<PathRouteProps, 'children'> {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  children?: RouteConfig[];
}

export type Routes = RouteConfig[];
