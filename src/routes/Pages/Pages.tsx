import { Route, Routes } from 'react-router-dom';
import Box from '@mui/material/Box';
import { RouteConfig } from '../types';
import routes from '..';
import { getPageHeight } from './utils';

const renderRoutes = (routes: RouteConfig[]) => {
  return routes.map((route) => {
    const { path, component: Component, children } = route;

    return (
      <Route key={path} path={path} element={<Component />}>
        {children && renderRoutes(children)}
      </Route>
    );
  });
};

function Pages() {
  return (
    <Box sx={{ height: (theme) => getPageHeight(theme) }}>
      <Routes>{renderRoutes(routes)}</Routes>
    </Box>
  );
}

export default Pages;
