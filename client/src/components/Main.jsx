// Main.jsx

import React, { useState, useEffect } from "react";
import { Outlet, ScrollRestoration } from "react-router-dom";

export default function Main({ orderItems, setOrderItems, user, loginRegisterUser }) {
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
            setItems,
            orderItems,
            setOrderItems,
            user,
            loginRegisterUser,
          }}
        />
        <ScrollRestoration />
      </div>
      <div className='sidebar right'></div>
    </main>
  );
}
