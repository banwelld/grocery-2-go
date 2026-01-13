// /client/src/pages/order/OrderContext.jsx

import { useState, useEffect, createContext, useRef } from "react";
import { useParams } from "react-router-dom";
import { getData, patchData } from "../helpers/helpers";

export const OrderContext = createContext(null);

export const OrderStatus = Object.freeze({
  CANCELLED: "cancelled",
  FULFILLED: "fulfilled",
  IN_PROCESS: "in-process",
  OPEN: "open",
  SUBMITTED: "submitted",
  UNKNOWN: "unknown",
});

export function OrderProvider({ children }) {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const lastStatusRef = useRef(null);

  useEffect(() => {
    if (!id) return;

    getData(`/orders/${id}`)
      .then((data) => setOrder(data))
      .catch((err) => console.error("Fetch order (get) failed: ", err));
  }, [id]);

  useEffect(() => {
    if (!order) return;

    const status = order.status ?? OrderStatus.UNKNOWN;

    if (status === OrderStatus.OPEN) {
      console.warn(
        "Invariant violation: received order with illegal status 'open'.",
        order
      );
    }

    const legalStatuses = new Set(Object.values(OrderStatus));

    if (!legalStatuses.has(status)) {
      console.warn("Order has an unknown/invalid status value: ", status);
    }
  }, [order]);

  const status = order?.status ?? OrderStatus.UNKNOWN;

  const updateStatus = (newStatus) => {
    if (!order || isPending) return;

    lastStatusRef.current = order;
    setIsPending(true);

    setOrder((prev) => ({ ...prev, status: newStatus }));

    return patchData(`/orders/${id}`, { status: newStatus })
      .then(setOrder)
      .catch((err) => {
        console.error("Fetch order (patch) failed: ", err);
        setOrder(lastStatusRef.current);
      })
      .finally(() => {
        lastStatusRef.current = null;
        setIsPending(false);
      });
  };

  const cancelOrder = () => {
    if (status !== OrderStatus.SUBMITTED) {
      console.warn("Illegal cancellation request: expected 'submitted', got", status);
      return;
    }
    return updateStatus(OrderStatus.CANCELLED);
  };

  return (
    <OrderContext.Provider value={{ order, status, cancelOrder, OrderStatus, isPending }}>
      {children}
    </OrderContext.Provider>
  );
}
