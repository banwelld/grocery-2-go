// App.jsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Main from "./Main";

export const App = () => {
  const [orderItems, setOrderItems] = useState([]);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const itemCount = orderItems.length;

  const postUserData = (path, formData, navSteps = 0) => {
    fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(formData),
    })
    .then((r) => r.json().then((data) => ({ ok: r.ok, status: r.status, data })))
    .then(({ ok, data }) => {
      if (ok) {
        setUser(data);
        if (navSteps) navigate(-navSteps);
      } else {
        alert(`Error: ${data.error}`);
      }
    });
  };

  return (
    <div className='site-wrapper'>
      <Header itemCount={itemCount} user={user} />
      <Main
        postUserData={postUserData}
        orderItems={orderItems}
        setOrderItems={setOrderItems}
        user={user}
      />
    </div>
  );
};
