// /client/src/contexts/CartProvider.jsx

import { useState, useEffect, createContext, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { createCartController } from "./CartController";
import { OrderStatus } from "./OrderContext";

export const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [cartLoaded, setCartLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const isBusyRef = useRef(false);
  const cartRef = useRef(null);

  // log invariant voilations

  useEffect(() => {
    if (!cart) return;

    const status = cart.status ?? OrderStatus.UNKNOWN;

    if (status !== OrderStatus.OPEN) {
      console.warn(
        "Received order with illegal status, expected 'open' and received ",
        status
      );
    }
  }, [cart]);

  // Update cartRef on cart change
  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  // order/cart attributes

  const products = cart?.orderProducts ?? [];

  const orderTotal = products?.reduce(
    (total, curr) => total + curr?.product?.price * curr?.quantity,
    0
  );

  const orderItemCount = (products ?? []).reduce(
    (total, curr) => total + (curr?.quantity ?? 0),
    0
  );

  // create controller (useMemo prevents loops when controller functions used as dependencies)
  const {
    loadCart,
    resetCart,
    checkout,
    addToCart,
    takeFromCart,
    resetProduct,
  } = useMemo(
    () => {
      const concurrencyControls = {
        lockRef: isBusyRef,
        setPending: setIsPending,
      };

      return createCartController({
        cartRef,
        setCart,
        setCartLoaded,
        navigate,
        concurrencyControls,
      });
    }, [cartRef, navigate]);

  const cartCtx = {
    cart,
    loadCart,
    resetCart,
    orderTotal,
    orderItemCount,
    checkout,
    isPending,
    cartLoaded,
  };

  const cartActionsCtx = { addToCart, takeFromCart, resetProduct };

  return (
    <CartContext.Provider value={{ products, cartCtx, cartActionsCtx }}>
      {children}
    </CartContext.Provider>
  );
}
