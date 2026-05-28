import { ROUTE_PATHS } from '../../../../config/routePaths';

export const ACCESS_RULE = Object.freeze({
  ALL: 'visible-by-all',
  ADMIN_ONLY: 'admin-only',
  CUSTOMER_ONLY: 'customers-only',
  GUEST_ONLY: 'guests-only',
  LOGGED_IN_ONLY: 'logged-in-only',
});

export const navLinkConfig = [
  {
    path: ROUTE_PATHS.HOME,
    label: 'Home',
    accessRule: ACCESS_RULE.ALL,
  },
  {
    path: ROUTE_PATHS.USER_PROFILE,
    label: 'View my profile',
    accessRule: ACCESS_RULE.LOGGED_IN_ONLY,
  },
  {
    path: ROUTE_PATHS.CART,
    label: 'View my cart',
    accessRule: ACCESS_RULE.CUSTOMER_ONLY,
  },
  {
    path: ROUTE_PATHS.AUTH_LOGIN,
    label: 'Login / Register',
    accessRule: ACCESS_RULE.GUEST_ONLY,
  },
  {
    path: ROUTE_PATHS.PRODUCT_ADMIN,
    label: 'Add/Update Products',
    accessRule: ACCESS_RULE.ADMIN_ONLY,
  },
];
