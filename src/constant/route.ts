export const ROUTE_HOME = '/';

export const ROUTE_SUPABASE_CALLBACK = '/auth/supabase-callback';

export const ROUTE_AUTH_LOGIN = '/auth/login';

export const ROUTE_AUTH_REGISTER_ACCOUNT = '/auth/register/account';

export const ROUTE_AUTH_SET_PASSWORD = '/auth/set-password';

export const ROUTE_AUTH_FORGOT_PASSWORD = '/auth/forgot-password';

export const ROUTE_DASHBOARD = '/dashboard';

export const ROUTE_DASHBOARD_HOME = '/dashboard/';

export const ROUTE_DASHBOARD_ENVIRONMENT_VARIABLE = '/dashboard/environment-variable';

export const ROUTE_DASHBOARD_ENVIRONMENT_VARIABLE_EDIT =
  `${ROUTE_DASHBOARD_ENVIRONMENT_VARIABLE}/:id` as const;
