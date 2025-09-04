// Main.jsx

import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Main({ user, loginRegisterUser, cart, setCart }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items")
      .then((r) => r.json())
      .then((r) => setItems(r));
  }, []);

  return (
    <main>
      <div className='sidebar left'></div>
      <div className='site-contents'>
        <Outlet
          context={{
            items,
            user,
            loginRegisterUser,
            cart,
            setCart,
          }}
        />
        <ScrollRestoration />
      </div>
      <div className='sidebar right'></div>
    </main>
  );
}
