// App.jsx

import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import OkCancelModal from "./OkCancelModal";
import { ItemContext, UserContext, OrderContext } from "../contexts";
import { countOrderItems } from "../helpers";

export const App = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [openOrder, setOpenOrder] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const onLogin = (data) => {
    setUser(data);
    getOrders(true);
    navigate("/");
  };

  const onLogout = () => {
    setUser(null);
    setOpenOrder({});
    setCartItems([]);
    navigate("/");
  };

  const itemCount = countOrderItems(openOrder.order_items);

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setItems([...data].sort((a, b) => a.name.localeCompare(b.name)));
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  }, []);

  useEffect(() => {
    fetch("/session")
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          onLogin(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  }, []);

  const loginRegisterUser = (path, formData) => {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          onLogin(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  };

  const getOrders = (isCart = false) => {
    let path = "/orders";
    if (isCart) path = "/orders?status=open";

    fetch(path)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok && isCart) {
          setOpenOrder(data.find((o) => o));
        } else if (ok && !isCart) {
          setOrders(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  };

  const getCartItems = (orderId) => {
    if (!orderId) return alert("Error: Order ID argument missing");
    fetch(`/order_items?order_id=${orderId}`)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setCartItems(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  };

  const logoutUser = () => {
    fetch("/session", {
      method: "DELETE",
    })
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          onLogout();
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  };

  const triggerModal = (modalMsg, hasCancel, onOk, closeModal) => {
    setModal({
      isOpen: true,
      hasCancel: hasCancel,
      modalMsg: modalMsg,
      onOk: onOk,
      closeModal: closeModal,
    });
  };

  const triggerLogout = () => {
    const logoutMsg = "Are you sure that you'd like to logout?";
    return triggerModal(logoutMsg, true, logoutUser, () => setModal(null));
  };

  return (
    <ItemContext.Provider value={{ items }}>
      <UserContext.Provider value={{ user, loginRegisterUser, triggerLogout }}>
        <OrderContext.Provider
          value={{ orders, openOrder, setOpenOrder, cartItems, getCartItems }}
        >
          <div className='site-wrapper'>
            <Header />
            <Outlet />
            <ScrollRestoration />
            <OkCancelModal {...modal} />
          </div>
        </OrderContext.Provider>
      </UserContext.Provider>
    </ItemContext.Provider>
  );
};
