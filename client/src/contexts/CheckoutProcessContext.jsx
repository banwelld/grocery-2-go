// /client/src/pages/cart/CheckoutProcessContext.jsx

import { createContext, useState, useEffect } from "react";
import useCart from "../hooks/useCart";
import useUser from "../hooks/useUser";
import { CartPageMode as PageMode } from "../pages/enums";

const ToggleDestination = Object.freeze({
  [PageMode.CART]: PageMode.CHECKOUT,
  [PageMode.CHECKOUT]: PageMode.CART,
})

export const CheckoutProcessContext = createContext(null);

const useSessionState = (key, initialValue) => {
  const [sessionState, setSessionState] = useState(() => {
    const isRefreshed = sessionStorage.getItem("checkout_reloading") === "true";

    if (isRefreshed) {
      const stored = sessionStorage.getItem(key);
      return stored ? JSON.parse(stored) : initialValue;
    }

    sessionStorage.removeItem(key);
    return initialValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(sessionState));
  }, [key, sessionState]);

  return [sessionState, setSessionState];
};

export function CheckoutProcessProvider({ children }) {
  const { cart, products, orderItemCount, orderTotal, checkout, cartLoaded } = useCart();
  const { user } = useUser();

  useEffect(() => {
    sessionStorage.removeItem("checkout_reloading");

    const handleUnload = () => {
      sessionStorage.setItem("checkout_reloading", "true");
    };

    window.addEventListener("beforeunload", handleUnload);

    return () => window.removeEventListener("beforeunload", handleUnload);
  }, []);

  const [modeVariant, setModeVariant] = useSessionState("checkout_mode", PageMode.CART);
  const [userConfirmed, setUserConfirmed] = useSessionState("checkout_confirmed", false);
  const [address, setAddress] = useSessionState("checkout_delivery", {});

  const togglePageMode = () => {
    const nextView = ToggleDestination[modeVariant];
    setModeVariant(nextView);
  };

  const checkoutWithData = () => {
    const checkoutPayload = {
      orderId: cart?.id,
      address: address.address,
      city: address.city,
      province_cd: address.provinceCd,
      postal_cd: address.postalCd,
    }
    return checkout(checkoutPayload);
  };

  const ctx = {
    cart: { products, orderItemCount, orderTotal, cartLoaded },
    checkout: { user, checkout: checkoutWithData, userConfirmed, setUserConfirmed, address, setAddress },
    viewMode: { modeVariant, togglePageMode },
  };

  return (
    <CheckoutProcessContext.Provider value={ctx}>{children}</CheckoutProcessContext.Provider>
  );
}
