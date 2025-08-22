// routes.js

import {App} from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Main from "./components/Main";
import ItemList from "./components/ItemList";
import ItemInfo from "./components/ItemInfo";
import MyCart from "./components/MyCart";
import PreviousOrders from "./components/PreviousOrders";

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
          {path: "items/:id", element: <ItemInfo />},
          {path: "my-cart", element: <MyCart />},
          {path: "previous-orders", element: <PreviousOrders />},
        ],
      },
    ],
  },
];

export default routes;
