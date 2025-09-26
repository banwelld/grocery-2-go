// App.jsx

import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import OkCancelModal from "./OkCancelModal";
import { UserContext, OrderContext } from "../contexts";
import { getData, sortBy, validateOrders } from "../helpers";

export const App = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [cartOrder, setCartOrder] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  // fetch all items

  useEffect(() => {
    getData("/items", onGetItems);
  }, []);

  // authenticate previous user

  useEffect(() => {
    getData("/session", onLogin, false);
  }, []);

  // ensure items have quantities

  useEffect(() => {
    setItems((prevItems) => mergeCartQuantities(prevItems, cartItems));
  }, [cartItems]);

  // followups to fetch actions

  const onGetItems = (items) => setItems(sortBy(items, "name"));

  const onLogin = (data, goToHome = true) => {
    setUser(data);
    getData("/orders?status=open", onGetOrders);
    if (goToHome) navigate("/");
  };

  const onGetOrders = (orders, isCart = true) => {
    const validated = validateOrders(orders, isCart);
    if (!isCart) return setOrders(validated);
    if (!validated) return;
    setCartOrder(validated);
    getData(`/order_items?order_id=${validated.id}`, onGetCartItems);
  };

  const onGetCartItems = (cartItems) => {
    setCartItems(cartItems);
  };

  const onLogout = () => {
    setUser(null);
    setCartOrder({});
    setCartItems([]);
    setOrders([]);
    navigate("/");
  };

  // append cart-item quantities to items

  const mergeCartQuantities = (items, cartItems) => {
    const cartMap = new Map(cartItems.map((ci) => [ci.itemId, ci.quantity]));

    return items.map((item) => ({
      ...item,
      quantity: cartMap.get(item.id) || 0,
    }));
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
    const logoutUser = () => {
      fetch("/session", {
        method: "DELETE",
      })
        .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
        .then(({ ok, data }) => {
          if (ok) {
            console.log("typeof onLogout in triggerLogout:", typeof onLogout);
            onLogout();
          } else {
            alert(`Error (logout): ${data.error}`);
          }
        });
    };

    const logoutMsg = "Are you sure that you'd like to logout?";

    return triggerModal(
      logoutMsg,
      () => logoutUser(),
      () => setModal(null)
    );
  };

  return (
    <UserContext.Provider value={{ user, onLogin, triggerLogout }}>
      <OrderContext.Provider
        value={{
          orders,
          cartOrder,
          setCartOrder,
          cartItems,
          setCartItems,
        }}
      >
        <div className='site-wrapper'>
          <Header />
          <Outlet context={{ items, setItems }} />
          <ScrollRestoration />
          <OkCancelModal {...modal} />
        </div>
      </OrderContext.Provider>
    </UserContext.Provider>
  );
};
