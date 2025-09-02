// routes.js

import { App } from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import ItemList from "./components/ItemList";
import ProdPage from "./components/ProdPage";
import MyCart from "./components/MyCart";
import PreviousOrders from "./components/PreviousOrders";
import UserInfo from "./components/UserInfo";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <ItemList /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "users/:id", element: <UserInfo /> },
      { path: "items/:id", element: <ProdPage /> },
      { path: "my-cart", element: <MyCart /> },
      { path: "previous-orders", element: <PreviousOrders /> },
    ],
  },
];

export default routes;
