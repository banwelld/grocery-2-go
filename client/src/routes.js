// routes.js

import { App } from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/home/Home";
import ProductPg from "./components/ProductPg";
import MyCart from "./components/my-cart/MyCart";
import PreviousOrders from "./components/PreviousOrders";
import UserInfo from "./components/UserInfo";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "users/:id", element: <UserInfo /> },
      { path: "items/:id", element: <ProductPg /> },
      { path: "my-cart", element: <MyCart /> },
      { path: "previous-orders", element: <PreviousOrders /> },
    ],
  },
];

export default routes;
