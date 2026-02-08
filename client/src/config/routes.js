// routes.js

import App from '../app/App';
import AppLayout from '../app/AppLayout';
import ErrorPage from '../pages/ErrorPage';
import Auth from '../features/user/pages/auth/Auth';
import GridView from '../features/collection/pages/grid-view/GridView';
import ItemView from '../features/collection/pages/item-view/ItemView';
import Cart from '../features/cart/pages/cart/Cart';
import Profile from '../features/user/pages/profile/Profile';
import Order from '../features/order/pages/order/Order';

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
              { path: 'auth', element: <Auth /> },
              { path: 'users/:id', element: <Profile /> },
              { path: 'products/:id', element: <ItemView /> },
              { path: 'my-cart', element: <Cart /> },
              { path: 'orders/:id', element: <Order /> },
              { path: '*', element: <ErrorPage /> },
            ],
          },
        ],
      },
    ],
  },
];

export default routes;
