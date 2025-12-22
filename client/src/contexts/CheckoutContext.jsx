// /client/src/pages/basket/CheckoutContext.jsx

import { createContext, useContext, useState } from "react";
import useBasket from "../hooks/useBasket";

export const CheckoutContext = createContext(null);

export function CheckoutProvider({ children }) {
  const { products, itemCount, orderTotal } = useBasket();
  const [userConfirmed, setUserConfirmed] = useState(false);
  const [deliveryInfo, setDeliveryInfo] = useState(null);

  if (!products || itemCount === undefined || orderTotal === undefined)
    return <p>LoadingProducts...</p>;

  const ctx = {
    products,
    itemCount,
    orderTotal,
    userConfirmed,
    setUserConfirmed,
    deliveryInfo,
    setDeliveryInfo,
  };

  return <CheckoutContext.Provider value={ctx}>{children}</CheckoutContext.Provider>;
}

export const useCheckout = () => useContext(CheckoutContext);
