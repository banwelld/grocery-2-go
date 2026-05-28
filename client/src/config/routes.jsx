import App from '../app/App';
import GuardedRoute, { ACCESS_RULE } from '../components/utility/GuardedRoute';
import Cart from '../features/cart/pages/Cart';
import AdminView from '../features/collection/pages/admin-view/AdminView';
import GridView from '../features/collection/pages/grid-view/GridView';
import ItemView from '../features/collection/pages/item-view/ItemView';
import Order from '../features/order/pages/Order';
import Auth from '../features/user/pages/auth/Auth';
import Profile from '../features/user/pages/profile/Profile';
import ErrorPage from '../pages/ErrorPage';
import { ROUTE_PATHS } from './routePaths';

const routes = [
  {
    path: ROUTE_PATHS.HOME,
    element: <App />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, element: <GridView /> },
          { path: ROUTE_PATHS.PRODUCTS, element: <ItemView /> },
          {
            element: <GuardedRoute accessRule={ACCESS_RULE.GUEST_ONLY} />,
            children: [{ path: ROUTE_PATHS.AUTH, element: <Auth /> }],
          },
          {
            element: <GuardedRoute accessRule={ACCESS_RULE.ADMIN_ONLY} />,
            children: [{ path: ROUTE_PATHS.PRODUCT_ADMIN, element: <AdminView /> }],
          },
          {
            element: <GuardedRoute accessRule={ACCESS_RULE.LOGGED_IN_ONLY} />,
            children: [{ path: ROUTE_PATHS.PROFILE, element: <Profile /> }],
          },
          {
            element: <GuardedRoute accessRule={ACCESS_RULE.CUSTOMER_ONLY} />,
            children: [
              { path: ROUTE_PATHS.CART, element: <Cart /> },
              { path: ROUTE_PATHS.ORDER, element: <Order /> },
            ],
          },
          { path: '*', element: <ErrorPage /> },
        ],
      },
    ],
  },
];

export default routes;
