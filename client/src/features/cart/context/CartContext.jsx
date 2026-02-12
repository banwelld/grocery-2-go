import { useNavigate } from 'react-router-dom';
import { useState, useEffect, createContext, useRef, useMemo } from 'react';
import { createCartController } from './CartController';
import { OrderStatus } from '../../order/context/OrderContext';
import { logException } from '../../../utils/helpers';
import Feedback from '../../../config/feedback';

const { Errors } = Feedback;

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

    if (status !== OrderStatus.OPEN)
      logException(Errors.INVALID.STATUS(OrderStatus.OPEN, status));
  }, [cart]);

  // Update cartRef on cart change
  useEffect(() => {
    cartRef.current = cart;
  }, [cart]);

  // order/cart attributes

  const products = cart?.orderProducts ?? [];

  const cartEmpty = cartLoaded && !products?.length >= 1;

  const orderTotal = products?.reduce(
    (tally, item) => tally + item?.product?.priceCents * item?.quantity,
    0,
  );

  const orderItemCount = (products ?? []).reduce(
    (tally, item) => tally + (item?.quantity ?? 0),
    0,
  );

  // create controller (useMemo prevents loops when controller functions used as dependencies)
  const {
    loadCart,
    resetCart,
    checkout,
    addToCart,
    takeFromCart,
    resetProduct,
  } = useMemo(() => {
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

  const cartStatus = {
    loadCart,
    resetCart,
    isPending,
    cartLoaded,
    cartEmpty,
  };

  const cartDetails = {
    products,
    orderTotal,
    orderItemCount,
  };

  const cartActions = {
    addToCart,
    takeFromCart,
    resetProduct,
    checkout,
  };

  return (
    <CartContext.Provider
      value={{ cart, cartStatus, cartDetails, cartActions }}
    >
      {children}
    </CartContext.Provider>
  );
}
