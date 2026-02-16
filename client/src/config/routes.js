// routes.js

import App from '../app/App';
import AppLayout from '../app/AppLayout';
import ErrorPage from '../pages/ErrorPage';
import Auth from '../features/user/pages/auth/Auth';
import GridView from '../features/collection/pages/grid-view/GridView';
import ItemView from '../features/collection/pages/item-view/ItemView';
import AdminView from '../features/collection/pages/admin-view/AdminView';
import Cart from '../features/cart/pages/Cart';
import Profile from '../features/user/pages/profile/Profile';
import Order from '../features/order/pages/Order';
import {
  AdminRoute,
  GuestRoute,
  ProtectedRoute,
} from '../components/utility/Guards';
import PATHS from './paths';

const routes = [
  {
    path: PATHS.FRONT.HOME,
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <GridView /> },
              { path: PATHS.FRONT.PRODUCTS(), element: <ItemView /> },
              {
                path: PATHS.FRONT.PRODUCT_ADMIN,
                element: (
                  <AdminRoute>
                    <AdminView />
                  </AdminRoute>
                ),
              },
              {
                path: PATHS.FRONT.AUTH,
                element: (
                  <GuestRoute>
                    <Auth />
                  </GuestRoute>
                ),
              },
              {
                path: PATHS.FRONT.USER_PROFILE,
                element: (
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                ),
              },
              {
                path: PATHS.FRONT.CART,
                element: (
                  <ProtectedRoute isCustomersOnly>
                    <Cart />
                  </ProtectedRoute>
                ),
              },
              {
                path: PATHS.FRONT.ORDER,
                element: (
                  <ProtectedRoute isCustomersOnly>
                    <Order />
                  </ProtectedRoute>
                ),
              },
              { path: '*', element: <ErrorPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
