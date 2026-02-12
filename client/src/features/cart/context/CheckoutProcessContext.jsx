import { createContext, useState, useEffect } from 'react';
import { CartViewMode as Mode } from '../../../config/enums';
import useCart from '../../../hooks/useCart';
import useUser from '../../user/hooks/useUser';

export const CheckoutProcessContext = createContext(null);

const useSessionState = (key, initialValue) => {
  const [sessionState, setSessionState] = useState(() => {
    const isRefreshed = sessionStorage.getItem('checkout_reloading') === 'true';

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
  const { cart, cartStatus, cartActions, cartDetails } = useCart();
  const { products, orderItemCount, orderTotal } = cartDetails;
  const { user, isLoggedIn } = useUser();

  useEffect(() => {
    sessionStorage.removeItem('checkout_reloading');

    const handleUnload = () => {
      sessionStorage.setItem('checkout_reloading', 'true');
    };

    window.addEventListener('beforeunload', handleUnload);

    return () => window.removeEventListener('beforeunload', handleUnload);
  }, []);

  const [currentViewMode, setCurrentViewMode] = useSessionState(
    'checkout_mode',
    Mode.CART,
  );

  const [userConfirmed, setUserConfirmed] = useSessionState(
    'checkout_confirmed',
    false,
  );

  const [address, setAddress] = useSessionState('checkout_delivery', {});

  const toggleViewMode = () =>
    setCurrentViewMode((prev) =>
      prev === Mode.CART ? Mode.CHECKOUT : Mode.CART,
    );

  const checkout = () => {
    const checkoutPayload = { orderId: cart?.id, ...address };
    return cartActions.checkout(checkoutPayload);
  };

  const resetSession = () => {
    setCurrentViewMode(Mode.CART);
    setUserConfirmed(false);
    setAddress({});
  };

  const ctx = {
    cart: {
      products,
      id: cart?.id,
      orderItemCount,
      orderTotal,
      cartLoaded: cartStatus?.cartLoaded,
      cartEmpty: cartStatus?.cartEmpty,
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
    viewMode: { currentViewMode, toggleViewMode },
  };

  return (
    <CheckoutProcessContext.Provider value={ctx}>
      {children}
    </CheckoutProcessContext.Provider>
  );
}
