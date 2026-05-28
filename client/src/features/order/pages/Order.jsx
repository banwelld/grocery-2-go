import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import PageFrame from '../../../components/ui/frames/PageFrame';
import { PageName } from '../../../config/enums';
import Feedback from '../../../config/feedback';
import { ROUTE_PATHS } from '../../../config/routePaths';
import { useOrder } from '../../../hooks/useOrder';
import { OrderProvider, OrderStatus } from '../context/OrderContext';
import useOrderActions from '../hooks/useOrderActions';
import PageContent from './PageContent';
import Sidebar from './Sidebar';

const { Toasts } = Feedback;

export default function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const initialOrder = state?.order;

  const [order, setOrder] = useState(initialOrder || null);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  useEffect(() => {
    if (!initialOrder) {
      navigate(ROUTE_PATHS.PROFILE, { replace: true });
      toast.error(Toasts.ORDER.LOAD.NO_SEED);
    }
  }, [initialOrder, navigate]);

  if (!order) return null;

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
        <Button onClick={confirmAndCancel} label='Cancel Order' bemMod='page-utility' />
      )}
      {status === OrderStatus.CANCELLED && (
        <Button onClick={confirmAndDelete} label={'Delete Order'} bemMod='page-utility' />
      )}
      {![OrderStatus.SUBMITTED, OrderStatus.CANCELLED].includes(status) && (
        <p>No options for orders after processing has begun.</p>
      )}
    </>
  );

  return (
    <PageFrame
      sidebar={<Sidebar sidebarControls={sidebarControls} pageName={PageName.ORDER} />}
      pageContent={<PageContent order={order} status={status} pageName={PageName.ORDER} />}
      pageName={PageName.ORDER}
    />
  );
};
