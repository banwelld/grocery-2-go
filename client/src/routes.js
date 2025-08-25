// routes.js

import {App} from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Main from "./components/Main";
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
      {
        path: "/",
        element: <Main />,
        children: [
          {index: true, element: <ItemList />},
          {path: "items/:id", element: <ProdPage />},
          {path: "users/:id", element: <UserInfo />},
          {path: "my-cart", element: <MyCart />},
          {path: "previous-orders", element: <PreviousOrders />},
        ],
      },
    ],
  },
];

export default routes;
