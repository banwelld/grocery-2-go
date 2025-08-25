// App.jsx

import React, {useState} from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";

export const App = () => {
  const [orderItems, setOrderItems] = useState([{unit_price: 599}]);
  const itemCount = orderItems.length;
  const orderSubtotal = orderItems.reduce(
    (accum, current) => accum + current.unit_price,
    0
  );

  return (
    <div className='site-wrapper'>
      <Header itemCount={itemCount} orderSubtotal={orderSubtotal} />
      <Outlet context={{orderItems, setOrderItems}} />
    </div>
  );
};
