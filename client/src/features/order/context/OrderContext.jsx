import { createContext, useCallback, useEffect, useMemo, useRef } from 'react';
import { API_ENDPOINT } from '../../../config/apiEndpoints';
import Feedback from '../../../config/feedback';
import { deleteData, getData, logException, patchData, runExclusive } from '../../../utils/helpers';
import { toClient } from '../../../utils/serializer';
import useUserOrders from '../../user/hooks/useUserOrders';

export const OrderContext = createContext(null);

export const OrderStatus = Object.freeze({
  CANCELLED: 'cancelled',
  FULFILLED: 'fulfilled',
  IN_PROCESS: 'in-process',
  OPEN: 'open',
  SUBMITTED: 'submitted',
  UNKNOWN: 'unknown',
});

const { Errors } = Feedback;

const DISALLOWED_STATUSES = [OrderStatus.OPEN, OrderStatus.UNKNOWN];
const LEGAL_STATUSES = Object.values(OrderStatus).filter(
  (status) => !DISALLOWED_STATUSES.includes(status),
);

export function OrderProvider({ children, order, setOrder, isPending, setIsPending, isBusyRef }) {
  const lastStatusRef = useRef(null);
  const { dropOrder, loadOrders } = useUserOrders();

  const id = order?.id;

  const concurrencyControls = useMemo(
    () => ({
      lockRef: isBusyRef,
      setPending: setIsPending,
    }),
    [isBusyRef, setIsPending],
  );

  const status = order?.status ?? OrderStatus.UNKNOWN;

  useEffect(() => {
    if (!order) return;

    if (DISALLOWED_STATUSES.includes(status))
      logException(
        `${Errors.INVALID.STATUS(`one of: ${LEGAL_STATUSES.join(', ')}`, status)}`,
        order,
      );
  }, [order, status]);

  const updateStatus = useCallback(
    (newStatus) => {
      if (!order) return;

      lastStatusRef.current = order;
      setOrder((prev) => ({ ...prev, status: newStatus }));

      return runExclusive({
        doFetch: () =>
          patchData(API_ENDPOINT.ORDER_ID(id), { status: newStatus })
            .then((data) => setOrder(toClient(data, 'order')))
            .catch((err) => {
              if (err.status === 422) {
                getData(`${API_ENDPOINT.ORDER_ID(id)}?scope=shallow`).then((data) => {
                  setOrder((prev) => ({
                    ...prev,
                    ...toClient(data, 'order'),
                  }));
                });
              } else {
                setOrder(lastStatusRef.current);
              }

              logException(Errors.FAILURE.UPDATE, err);
              throw err;
            })
            .finally(() => (lastStatusRef.current = null)),
        ...concurrencyControls,
      });
    },
    [id, order, setOrder, concurrencyControls],
  );

  const loadOrderProducts = useCallback(() => {
    if (!order || (order.orderProducts && order.orderProducts.length > 0)) {
      return Promise.resolve();
    }

    return runExclusive({
      doFetch: () =>
        getData(`${API_ENDPOINT.ORDER_PRODUCTS}?order_id=${id}`).then((data) => {
          const products = toClient(data, 'order_product');
          setOrder((prev) => ({ ...prev, orderProducts: products }));
        }),
      ...concurrencyControls,
    });
  }, [id, order, setOrder, concurrencyControls]);

  const deleteOrder = useCallback(() => {
    if (!order) return;
    lastStatusRef.current = order;

    return runExclusive({
      doFetch: () => {
        dropOrder(id);
        return deleteData(API_ENDPOINT.ORDER_ID(id))
          .then(() => setOrder(null))
          .catch((err) => {
            logException(Errors.FAILURE.DELETE, err);
            loadOrders();
            setOrder(lastStatusRef.current);
            throw err;
          })
          .finally(() => (lastStatusRef.current = null));
      },
      ...concurrencyControls,
    });
  }, [id, order, setOrder, concurrencyControls, dropOrder, loadOrders]);

  const value = useMemo(
    () => ({
      order,
      status,
      updateStatus,
      deleteOrder,
      loadOrderProducts,
      OrderStatus,
      isPending,
    }),
    [order, status, updateStatus, deleteOrder, loadOrderProducts, isPending],
  );

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
}
