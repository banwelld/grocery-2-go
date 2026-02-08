import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Feedback from '../../../config/feedback';
import useUserOrders from '../../../hooks/useUserOrders';
import {
  deleteData,
  getData,
  logException,
  patchData,
  runExclusive,
} from '../../../utils/helpers';
import { toClient } from '../../../utils/serializer';

export const OrderContext = createContext(null);

export const OrderStatus = Object.freeze({
  CANCELLED: 'cancelled',
  FULFILLED: 'fulfilled',
  IN_PROCESS: 'in-process',
  OPEN: 'open',
  SUBMITTED: 'submitted',
  UNKNOWN: 'unknown',
});

const { Toasts, Errors } = Feedback;

const DISALLOWED_STATUSES = [OrderStatus.OPEN, OrderStatus.UNKNOWN];
const LEGAL_STATUSES = Object.values(OrderStatus).filter(
  (status) => !DISALLOWED_STATUSES.includes(status),
);

export function OrderProvider({ children }) {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(null);
  const lastStatusRef = useRef(null);
  const { dropOrder, loadOrders } = useUserOrders();

  const concurrencyControls = useMemo(
    () => ({
      lockRef: isBusyRef,
      setPending: setIsPending,
    }),
    [],
  );

  useEffect(() => {
    if (!id) return;

    runExclusive({
      doFetch: () =>
        toast.promise(
          getData(`/orders/${id}`)
            .then((data) => setOrder(toClient(data, 'order')))
            .catch((err) => logException(Errors.FAILURE.RECEIVE, err)),
          {
            loading: Toasts.ORDER.LOAD.BUSY,
            error: Toasts.ORDER.LOAD.FAILURE,
          },
        ),
      ...concurrencyControls,
    });
  }, [id, concurrencyControls]);

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
          patchData(`/orders/${id}`, { status: newStatus })
            .then((data) => setOrder(toClient(data, 'order')))
            .catch((err) => {
              logException(Errors.FAILURE.UPDATE, err);
              setOrder(lastStatusRef.current);
              throw err;
            })
            .finally(() => (lastStatusRef.current = null)),
        ...concurrencyControls,
      });
    },
    [id, order, concurrencyControls],
  );

  const deleteOrder = useCallback(() => {
    if (!order) return;
    lastStatusRef.current = order;

    return runExclusive({
      doFetch: () => {
        dropOrder(id);
        return deleteData(`/orders/${id}`)
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
  }, [id, order, concurrencyControls, dropOrder, loadOrders]);

  const value = useMemo(
    () => ({
      order,
      status,
      updateStatus,
      deleteOrder,
      OrderStatus,
      isPending,
    }),
    [order, status, updateStatus, deleteOrder, isPending],
  );

  return (
    <OrderContext.Provider value={value}>{children}</OrderContext.Provider>
  );
}
