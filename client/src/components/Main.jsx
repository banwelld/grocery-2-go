// Main.jsx

import React, {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";

export default function Main({orderItems, setOrderItems}) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/items")
    .then((r) => r.json())
    .then((r) => setItems(r));
  }, []);

  return (
    <main>
      <div id='left-side' className='sidebar'></div>
      <div className='content'>
        <Outlet context={{items, orderItems, setOrderItems}} />
      </div>
      <div id='right-side' className='sidebar'></div>
    </main>
  );
}
