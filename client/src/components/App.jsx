// App.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";
import OkCancelModal from "./OkCancelModal";

export const App = () => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(null);
  const [modal, setModal] = useState(null);
  const navigate = useNavigate();

  console.log(cart);

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

  console.log(cart);

  const itemCount = cart.order_items.reduce((sum, item) => sum + item.quantity, 0);

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

  const getCart = (orderId) => {
    fetch(`/orders`)
      .then((r) => r.json().then((data) => ({ ok: r.ok, data })))
      .then(({ ok, data }) => {
        if (ok) {
          setCart(data);
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

  const triggerModal = (modalMsg, onOk, closeModal) => {
    setModal({
      isOpen: true,
      modalMsg: modalMsg,
      onOk: onOk,
      closeModal: closeModal,
    });
  };

  return (
    <div className='site-wrapper'>
      <Header
        itemCount={itemCount}
        user={user}
        triggerLogout={() =>
          triggerModal("Are you certain that you'd like to logout?", logoutUser, () =>
            setModal(null)
          )
        }
      />
      <Main
        user={user}
        loginRegisterUser={loginRegisterUser}
        cart={cart}
        setCart={setCart}
      />
      <OkCancelModal {...modal} />
    </div>
  );
};
