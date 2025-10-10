// App.jsx

import { useState, useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import SiteHeader from "./site-header/SiteHeader";
import OkCancelModal from "./OkCancelModal";
import { UserContext, OrderContext, ProductContext } from "../contexts/contexts";
import { getData, deleteData, sortBy, validateOrders } from "../helpers/helpers";

export const App = () => {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState(null);
  const [basket, setBasket] = useState(null);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  // fetch all products

  useEffect(() => {
    getData("/products", onGetProducts);
  }, []);

  // authenticate previous user

  useEffect(() => {
    getData("/session", onLogin, false);
  }, []);

  // followups to fetch actions

  const onGetProducts = (p) => setProducts(sortBy(p, "name"));

  const onLogin = (data, goToHome = true) => {
    setUser(data);
    getData("/orders?status=open", onGetOrders);
    if (goToHome) navigate("/");
  };

  const onGetOrders = (orders, isCart = true) => {
    const validated = validateOrders(orders, isCart);
    if (!isCart) return setOrders(validated);
    if (!validated) return;
    setBasket(validated);
  };

  const onLogout = () => {
    setUser(null);
    setBasket(null);
    setOrders([]);
    navigate("/");
  };

  // logout modal

  const triggerModal = (modalMsg, onOk, closeModal) => {
    setModal({
      isOpen: true,
      modalMsg: modalMsg,
      onOk: onOk,
      closeModal: closeModal,
    });
  };

  const triggerLogout = () => {
    const logoutUser = deleteData("/session", onLogout);
    const logoutMsg = "Are you sure that you'd like to logout?";

    return triggerModal(
      logoutMsg,
      () => logoutUser(),
      () => setModal(null)
    );
  };

  const triggerOrderSubmit = (submissionFunc) => {
    const submitMsg = "Click OK to confirm submission or Cancel to abort.";

    return triggerModal(
      submitMsg,
      () => submissionFunc(),
      () => setModal(null)
    );
  };

  return (
    <UserContext.Provider value={{ user, onLogin, triggerLogout }}>
      <ProductContext.Provider value={{ products, setProducts }}>
        <OrderContext.Provider
          value={{
            orders,
            basket,
            setBasket,
            triggerOrderSubmit,
          }}
        >
          <div className='site-wrapper'>
            <SiteHeader />
            <Outlet />
            <ScrollRestoration />
            <OkCancelModal {...modal} />
          </div>
        </OrderContext.Provider>
      </ProductContext.Provider>
    </UserContext.Provider>
  );
};
