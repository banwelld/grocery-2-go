import { useOrder } from '../../../../hooks/useOrder';
import { Headings, UiText } from '../../../../config/constants';
import { OrderProvider } from '../../context/OrderContext';
import { OrderStatus } from '../../context/OrderContext';
import { PageName } from '../../../../config/enums';
import ErrorPage from '../../../../pages/ErrorPage';
import Button from '../../../../components/ui/Button';
import PageContent from './PageContent';
import PageFrame from '../../../../components/ui/frames/PageFrame';
import Sidebar from './Sidebar';
import useOrderActions from '../../hooks/useOrderActions';
import useUser from '../../../user/hooks/useUser';

export default function Order() {
  return (
    <OrderProvider>
      <OrderLayout />
    </OrderProvider>
  );
}

const OrderLayout = () => {
  const { order, status } = useOrder();
  const { confirmAndCancel, confirmAndDelete } = useOrderActions();
  const { isLoggedIn } = useUser();

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
