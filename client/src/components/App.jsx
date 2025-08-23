// app.jsx

import React, {useState} from "react";
import Header from "./Header";
import Main from "./Main";

export const App = () => {
  const [orderItems, setOrderItems] = useState([{unit_price: 599}]);
  const itemCount = orderItems.length;
  const orderSubtotal = orderItems.reduce(
    (accum, current) => accum + current.unit_price,
    0
  );

  return (
    <>
      <Header itemCount={itemCount} orderSubtotal={orderSubtotal} />
      <Main orderItems={orderItems} setOrderItems={setOrderItems} />
    </>
  );
};
