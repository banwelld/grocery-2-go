// Main.jsx

import React, {useState} from "react";

export default function Main({orderItems, setOrderItems}) {
  const [items, setItems] = useState(null);
  const [orders, setOrders] = useState(null);

  // TODO: delete this when actually building the function logic
  items && setItems(0);
  orders && setOrders(0);

  return (
    <main>
      <div id='left-side' className='sidebar'></div>
      <div className='content'>This is here</div>
      <div id='right-side' className='sidebar'></div>
    </main>
  );
}
