// App.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import OkCancelModal from "./OkCancelModal";

export const App = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  const onLogin = (data) => {
    setUser(data);
    getCart(data.open_order_id);
  };

  const onLogout = () => {
    setUser(null);
    setCart(null);
  };

  useEffect(() => {
    fetch("/check_session")
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) onLogin(data);
      });
  }, []);

  const itemCount = orderItems.length;

  const loginRegisterUser = (path, formData, navSteps = 0) => {
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
          if (navSteps) navigate(-navSteps);
        } else {
          alert(`Error: ${data.error}`);
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

  const triggerLogoutModal = () => {
    setModal({
      isOpen: true,
      modalMsg: "Are you sure you want to logout?",
      onOk: logoutUser,
      closeModal: () => setModal(null),
    });
  };

  const getCart = (orderId) => {
    fetch(`/orders/${orderId}`)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setCart(data);
        } else {
          alert(`Error: ${data.error}`);
        }
      });
  };

  console.log(cart);

  return (
    <div className='site-wrapper'>
      <Header itemCount={itemCount} user={user} logout={triggerLogoutModal} />
      <Main
        loginRegisterUser={loginRegisterUser}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        user={user}
      />
      <OkCancelModal {...modal} />
    </div>
  );
};
