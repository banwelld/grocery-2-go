// routes.js

import { App } from "./components/App";
import ErrorPage from "./components/ErrorPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./pages/home/Home";
import Product from "./pages/product/Product";
import Basket from "./pages/basket/Basket";
import ShowOrderHist from "./components/ShowOrderHist";
import ShowUser from "./components/ShowUser";
import ShowOrder from "./components/ShowOrder";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "users/:id", element: <ShowUser /> },
      { path: "products/:id", element: <Product /> },
      { path: "my-basket", element: <Basket /> },
      { path: "orders", element: <ShowOrderHist /> },
      { path: "orders/:id", element: <ShowOrder /> },
    ],
  },
];

export default routes;
