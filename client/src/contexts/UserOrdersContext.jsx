// /client/src/contexts/UserOrdersContext.jsx

import { createContext, useState, useRef, useMemo, useCallback } from "react";
import { getData, runExclusive } from "../helpers/helpers";

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
    const fn = () => {
      return getData("/orders?status=non-open&scope=shallow")
        .then((data) => setOrders(data))
        .catch((err) => console.error("Fetch previous orders failed:", err));
    }
    runExclusive({ fn, setIsLoaded: setOrdersLoaded, ...concurrencyControls });
  }, [concurrencyControls]);

  const ctx = useMemo(() => {
    return {
      orders,
      ordersLoaded,
      isPending,
      loadOrders,
    };
  }, [orders, ordersLoaded, isPending, loadOrders]);

  return <UserOrdersContext.Provider value={ctx}>{children}</UserOrdersContext.Provider>;
}
