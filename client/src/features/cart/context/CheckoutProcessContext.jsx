import { createContext, useEffect, useState, useMemo, useCallback } from 'react';
import useCart from '../../../hooks/useCart';
import useUser from '../../user/hooks/useUser';

export const CheckoutProcessContext = createContext(null);

const useSessionState = (key, initialValue) => {
  const [sessionState, setSessionState] = useState(() => {
    const isReload = sessionStorage.getItem('checkout_reload') === 'true';

    if (isReload) {
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
  const { cart, cartStatus, cartActions, cartDetails } = useCart();
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    sessionStorage.removeItem('checkout_reload');

    const handleUnload = () => {
      sessionStorage.setItem('checkout_reload', 'true');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  const [userConfirmed, setUserConfirmed] = useSessionState('checkout_confirmed', false);

  const [address, setAddress] = useSessionState('checkout_delivery', {});

  const checkout = useCallback(() => {
    return cartActions.checkout(address);
  }, [cartActions, address]);

  const resetSession = useCallback(() => {
    setUserConfirmed(false);
    setAddress({});
  }, [setUserConfirmed, setAddress]);

  const ctx = useMemo(
    () => ({
      cart: {
        products: cartDetails.products,
        id: cart?.id,
        orderItemCount: cartDetails.orderItemCount,
        orderTotal: cartDetails.orderTotal,
        cartLoaded: cartStatus?.cartLoaded,
        cartEmpty: cartStatus?.cartEmpty,
        deleteCart: cartActions.deleteCart,
      },
      checkoutProcess: {
        checkout,
        resetSession,
        userConfirmed,
        setUserConfirmed,
        address,
        setAddress,
      },
      userDetails: { user, isLoggedIn },
    }),
    [
      cartDetails.products,
      cart?.id,
      cartDetails.orderItemCount,
      cartDetails.orderTotal,
      cartStatus?.cartLoaded,
      cartStatus?.cartEmpty,
      cartActions.deleteCart,
      checkout,
      resetSession,
      userConfirmed,
      setUserConfirmed,
      address,
      setAddress,
      user,
      isLoggedIn,
    ],
  );

  return <CheckoutProcessContext.Provider value={ctx}>{children}</CheckoutProcessContext.Provider>;
}
