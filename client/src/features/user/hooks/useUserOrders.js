import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadOrdersThunk } from '../../order/redux/orderThunks';
import { dropOrder } from '../../order/redux/orderSlice';

export default function useUserOrders() {
  const dispatch = useDispatch();

  const userOrders = useSelector((state) => state.orders.ordersList);
  const ordersLoaded = useSelector((state) => state.orders.ordersLoaded);
  const isPending = useSelector((state) => state.orders.isPending);

  const loadOrders = useCallback(
    (showToast = true) => {
      return dispatch(loadOrdersThunk({ showToast }));
    },
    [dispatch],
  );

  const handleDropOrder = useCallback(
    (id) => {
      dispatch(dropOrder(id));
    },
    [dispatch],
  );

  return {
    userOrders,
    ordersLoaded,
    isPending,
    loadOrders,
    dropOrder: handleDropOrder,
  };
}
