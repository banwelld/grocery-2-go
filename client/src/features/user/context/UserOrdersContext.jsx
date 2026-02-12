import { createContext, useState, useRef, useMemo, useCallback } from 'react';
import { getData, runExclusive, logException } from '../../../utils/helpers';
import Feedback from '../../../config/feedback';
import { toClient } from '../../../utils/serializer';

const { Errors } = Feedback;

export const UserOrdersContext = createContext(null);

export function UserOrdersProvider({ children }) {
  const [orders, setOrders] = useState(null);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  const concurrencyControls = useMemo(() => {
    return {
      lockRef: isBusyRef,
      setPending: setIsPending,
    };
  }, [isBusyRef, setIsPending]);

  const loadOrders = useCallback(() => {
    runExclusive({
      doFetch: () =>
        getData('/orders?status=non_open&scope=shallow')
          .then((data) => setOrders(toClient(data, 'order')))
          .catch((err) => logException(Errors.FAILURE.RECEIVE, err)),
      setIsLoaded: setOrdersLoaded,
      ...concurrencyControls,
    });
  }, [concurrencyControls]);

  const dropOrder = useCallback((id) => {
    setOrders((prevOrders) => {
      if (!prevOrders) return null;
      return prevOrders.filter((order) => order.id !== Number(id));
    });
  }, []);

  const ctx = useMemo(() => {
    return {
      orders,
      ordersLoaded,
      isPending,
      loadOrders,
      dropOrder,
    };
  }, [orders, ordersLoaded, isPending, loadOrders, dropOrder]);

  return (
    <UserOrdersContext.Provider value={ctx}>
      {children}
    </UserOrdersContext.Provider>
  );
}
