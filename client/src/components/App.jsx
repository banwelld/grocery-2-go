// App.jsx

import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration, useNavigate } from "react-router-dom";
import Header from "./header/Header";
import OkCancelModal from "./OkCancelModal";
import { ItemContext, UserContext, OpenOrderContext } from "../contexts";

export const App = () => {
  const [items, setItems] = useState([]);
  const [user, setUser] = useState(null);
  const [openOrder, setOpenOrder] = useState(null);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const onLogin = (data) => {
    setUser(data);
    getOpenOrder(data.open_order_id);
  };

  const onLogout = () => {
    setUser(null);
    setOpenOrder(null);
  };

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((data) => setItems([...data].sort((a, b) => a.name.localeCompare(b.name))));
  }, []);

  useEffect(() => {
    fetch("/check_session")
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) onLogin(data);
      });
  }, []);

  const itemCount = openOrder?.order_items?.reduce(
    (sum, current) => sum + current.quantity,
    0
  );
  const orderTotal = openOrder?.order_items?.reduce(
    (sum, current) => sum + current.quantity * current.item.price,
    0
  );

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
          navigate("/");
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  };

  const getOpenOrder = () => {
    fetch(`/open_order`)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setOpenOrder(data);
        } else {
          console.log(`Error: ${data.error}`);
        }
      });
  };

  const logoutUser = () => {
    fetch("/logout", {
      method: "DELETE",
    }).then(() => {
      onLogout();
    });
  };

  const triggerModal = (modalMsg, onOk, closeModal) => {
    setModal({
      isOpen: true,
      modalMsg: modalMsg,
      onOk: onOk,
      closeModal: closeModal,
    });
  };

  const triggerLogout = () => {
    const logoutMsg = "Are you sure that you'd like to logout?";
    return triggerModal(logoutMsg, logoutUser, () => setModal(null));
  };

  return (
    <ItemContext.Provider value={{ items }}>
      <UserContext.Provider value={{ user, loginRegisterUser, triggerLogout }}>
        <OpenOrderContext.Provider value={{ openOrder, itemCount, orderTotal }}>
          <div className='site-wrapper'>
            <Header />
            <Outlet />
            <ScrollRestoration />
            <OkCancelModal {...modal} />
          </div>
        </OpenOrderContext.Provider>
      </UserContext.Provider>
    </ItemContext.Provider>
  );
};
