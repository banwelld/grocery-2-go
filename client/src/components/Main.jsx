// Main.jsx

import React, {useState} from "react";

export default function Main({orderItems, setOrderItems}) {
  const [items, setItems] = useState(null);
  const [orders, setOrders] = useState(null);

  // TODO: delete this when actually building the function logic
  items && setItems(0);
  orders && setOrders(0);

  return <h1>This is where the Main component goes</h1>;
}
