import { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import toast from 'react-hot-toast';

import { useOrder } from '../../../hooks/useOrder';
import { OrderProvider, OrderStatus } from '../context/OrderContext';
import useOrderActions from '../hooks/useOrderActions';

import PageContent from './PageContent';
import Sidebar from './Sidebar';
import PageFrame from '../../../components/ui/frames/PageFrame';
import Button from '../../../components/ui/Button';

import { PageName } from '../../../config/enums';
import Feedback from '../../../config/feedback';
import PATHS from '../../../config/paths';

const { Toasts } = Feedback;

export default function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const seed = state?.order;

  const [order, setOrder] = useState(seed || null);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  useEffect(() => {
    if (!seed) {
      navigate(PATHS.FRONT.USER_PROFILE, { replace: true });
      toast.error(Toasts.ORDER.LOAD.NO_SEED);
    }
  }, [seed, navigate]);

  if (isPending) return <p>Loading your order...</p>;
  if (!order && !isPending) return null;

  return (
    <OrderProvider
      order={order}
      setOrder={setOrder}
      isPending={isPending}
      setIsPending={setIsPending}
      isBusyRef={isBusyRef}
    >
      <OrderLayout />
    </OrderProvider>
  );
}

const OrderLayout = () => {
  const { order, status, loadOrderProducts } = useOrder();
  const { confirmAndCancel, confirmAndDelete } = useOrderActions();

  useEffect(() => {
    if (order && (!order.orderProducts || order.orderProducts.length === 0)) {
      toast.promise(loadOrderProducts(), {
        loading: Toasts.ORDER.LOAD.BUSY,
        error: Toasts.ORDER.LOAD.FAILURE,
      });
    }
  }, [loadOrderProducts, order]);

  const sidebarControls = (
    <>
      {status === OrderStatus.SUBMITTED && (
        <Button
          onClick={confirmAndCancel}
          label='Cancel Order'
          bemMod='page-utility'
        />
      )}
      {status === OrderStatus.CANCELLED && (
        <Button
          onClick={confirmAndDelete}
          label={'Delete Order'}
          bemMod='page-utility'
        />
      )}
      {![OrderStatus.SUBMITTED, OrderStatus.CANCELLED].includes(status) && (
        <p>No options for orders after processing has begun.</p>
      )}
    </>
  );

  return (
    <PageFrame
      sidebar={
        <Sidebar sidebarControls={sidebarControls} pageName={PageName.ORDER} />
      }
      pageContent={
        <PageContent order={order} status={status} pageName={PageName.ORDER} />
      }
      pageName={PageName.ORDER}
    />
  );
};
