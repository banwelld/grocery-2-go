// /client/src/app/App.jsx

import { useState, useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import { UserContext, OrderContext, ProductContext } from "../contexts/contexts";
import { ModalProvider } from "../contexts/ModalContext";
import SiteHeader from "../components/site-header/SiteHeader";
import ModalLayer from "../components/feedback/ModalLayer";
import {
  getData,
  completeLogin,
  deleteData,
  compareSortValues,
  validateOrders,
} from "../helpers/helpers";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState(null);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // fetch products and users with open sessions

  useEffect(() => {
    const checkSession = () =>
      getData("/session")
        .then((data) => completeLogin({ setUser, data, onGetOrders }))
        .catch((err) =>
          console.error("Check session found no session user or failed:", err)
        );

    const loadProducts = () =>
      getData("/products")
        .then((data) => onGetProducts(data))
        .catch((err) => console.error("Fetch products failed:", err));

    Promise.allSettled([checkSession(), loadProducts()]);
  }, []);

  // followups to fetch actions

  const onGetProducts = (productData) => {
    const sortedProducts = [...productData].sort(compareSortValues({ key: "name" }));
    setProducts(sortedProducts);
  };

  const onGetOrders = (orders) => {
    const validated = validateOrders(orders);
    if (!validated) return;
    setBasket(validated);
  };

  // logout modal payload

  const logout = () => {
    deleteData("/session")
      .then(() => {
        setUser(null);
        setBasket(null);
        setOrders([]);
        navigate("/");
      })
      .catch((err) => console.log("Logout failed:", err));
  };

  const onLogin = (data) => completeLogin({ setUser, data, onGetOrders });

  return (
    <UserContext.Provider value={{ user, onLogin, logout }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <OrderContext.Provider value={{ orders, basket, setBasket }}>
          <ModalProvider>
            <div className='site-wrapper'>
              <SiteHeader />
              <Outlet />
            </div>
            <ScrollRestoration getKey={(location) => location.pathname} />
            <ModalLayer />
          </ModalProvider>
        </OrderContext.Provider>
      </ProductContext.Provider>
    </UserContext.Provider>
  );
};
