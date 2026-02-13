import { useState, useEffect, useRef, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { OrderProvider, OrderStatus } from '../../context/OrderContext';
import { PageName } from '../../../../config/enums';
import { getData, runExclusive, logException } from '../../../../utils/helpers';
import { toClient } from '../../../../utils/serializer';
import Feedback from '../../../../config/feedback';

import Button from '../../../../components/ui/Button';
import PageContent from './PageContent';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Sidebar from './Sidebar';
import useOrderActions from '../../hooks/useOrderActions';
import { useOrder } from '../../../../hooks/useOrder';

const { Errors, Toasts } = Feedback;

export default function Order() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const seed = state?.order;

  const [order, setOrder] = useState(seed || null);
  const [isPending, setIsPending] = useState(false);
  const isBusyRef = useRef(false);

  useEffect(() => {
    if (!seed) {
      navigate('/my-profile', { replace: true });
      return;
    }

    // Only fetch if products are missing (Shallow Seed scenario)
    if (!seed.orderProducts || seed.orderProducts.length === 0) {
      runExclusive({
        doFetch: () =>
          toast.promise(
            getData(`/order_products?order_id=${seed.id}`).then((data) => {
              const products = toClient(data, 'order_product');
              setOrder((prev) => ({ ...prev, orderProducts: products }));
            }),
            {
              loading: Toasts.ORDER.LOAD.BUSY,
              error: Toasts.ORDER.LOAD.FAILURE,
            },
          ),
        lockRef: isBusyRef,
        setPending: setIsPending,
      });
    }
  }, [seed, navigate, Toasts.ORDER.LOAD]);

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
  const { order, status } = useOrder();
  const { confirmAndCancel, confirmAndDelete } = useOrderActions();

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
