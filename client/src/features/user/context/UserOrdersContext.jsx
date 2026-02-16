import {
  createContext,
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
} from 'react';

import toast from 'react-hot-toast';

import useUser from '../hooks/useUser';
import { getData, runExclusive, logException } from '../../../utils/helpers';
import { toClient } from '../../../utils/serializer';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';
import { UserRole } from '../../../config/enums';

const { Errors, Toasts } = Feedback;

export const UserOrdersContext = createContext(null);

export function UserOrdersProvider({ children }) {
  const [userOrders, setUserOrders] = useState([]);
  const [ordersLoaded, setOrdersLoaded] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  const { user } = useUser();

  const concurrencyControls = useMemo(() => {
    return {
      lockRef: isBusyRef,
      setPending: setIsPending,
    };
  }, [isBusyRef, setIsPending]);

  const loadOrders = useCallback(() => {
    runExclusive({
      doFetch: () =>
        toast.promise(
          getData(`${PATHS.BACK.ORDERS}?status=non_open&scope=shallow`)
            .then((data) => {
              const ordersArray = [].concat(toClient(data, 'order') || []);
              setUserOrders(
                ordersArray.sort((a, b) =>
                  b.createdAt.localeCompare(a.createdAt),
                ),
              );
            })
            .catch((err) => logException(Errors.FAILURE.RECEIVE, err)),
          {
            loading: Toasts.ORDER_LIST.LOAD.BUSY,
            error: Toasts.ORDER_LIST.LOAD.FAILURE,
          },
        ),
      setIsLoaded: setOrdersLoaded,
      ...concurrencyControls,
    });
  }, [concurrencyControls]);

  useEffect(() => {
    if (user && user.role === UserRole.CUSTOMER) {
      loadOrders();
    }
  }, [loadOrders, user]);

  const dropOrder = useCallback((id) => {
    setUserOrders((prevOrders) => {
      if (!prevOrders) return [];
      return prevOrders.filter((order) => order.id !== Number(id));
    });
  }, []);
  const ctx = useMemo(() => {
    return {
      userOrders,
      ordersLoaded,
      isPending,
      loadOrders,
      dropOrder,
    };
  }, [userOrders, ordersLoaded, isPending, loadOrders, dropOrder]);

  return (
    <UserOrdersContext.Provider value={ctx}>
      {children}
    </UserOrdersContext.Provider>
  );
}
