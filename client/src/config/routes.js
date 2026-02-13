// routes.js

import App from '../app/App';
import AppLayout from '../app/AppLayout';
import ErrorPage from '../pages/ErrorPage';
import Auth from '../features/user/pages/auth/Auth';
import GridView from '../features/collection/pages/grid-view/GridView';
import ItemView from '../features/collection/pages/item-view/ItemView';
import AdminView from '../features/collection/pages/admin-view/AdminView';
import Cart from '../features/cart/pages/cart/Cart';
import Profile from '../features/user/pages/profile/Profile';
import Order from '../features/order/pages/order/Order';
import {
  AdminRoute,
  GuestRoute,
  ProtectedRoute,
} from '../components/utility/Guards';

const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <AppLayout />,
        children: [
          {
            errorElement: <ErrorPage />,
            children: [
              { index: true, element: <GridView /> },
              { path: 'products/:id', element: <ItemView /> },
              {
                path: 'products/admin',
                element: (
                  <AdminRoute>
                    <AdminView />
                  </AdminRoute>
                ),
              },
              {
                path: 'auth',
                element: (
                  <GuestRoute>
                    <Auth />
                  </GuestRoute>
                ),
              },
              {
                path: 'my-profile',
                element: (
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'my-cart',
                element: (
                  <ProtectedRoute isCustomersOnly>
                    <Cart />
                  </ProtectedRoute>
                ),
              },
              {
                path: 'order',
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
