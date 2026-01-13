// routes.js

import App from "./app/App";
import ErrorPage from "./pages/ErrorPage";
import UserAuth from "./pages/user-auth/UserAuth";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Cart from "./pages/cart/Cart";
import User from "./pages/user/User";
import Order from "./pages/order/Order";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "user-auth", element: <UserAuth /> },
      { path: "users/:id", element: <User /> },
      { path: "products/:id", element: <Product /> },
      { path: "my-cart", element: <Cart /> },
      { path: "orders/:id", element: <Order /> },
    ],
  },
];

export default routes;
