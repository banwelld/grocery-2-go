import { useEffect } from 'react';
import { Headings } from '../../../../config/constants';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import MappedTable from '../../../mapped-table/Components/MappedTable';
import tableConfig from './tableConfig';
import UserDetailsTable from '../../components/UserDetailsTable';
import useUserOrders from '../../../../hooks/useUserOrders';
import ClickHere from '../../../../components/ui/ClickHere';
import { OrderStatus as Status } from '../../../order/context/OrderContext';

export default function InfoView({ user, toggleViewMode, onOrdersLoaded }) {
  const { orders, ordersLoaded, loadOrders } = useUserOrders();

  // load user orders on mount
  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  // notify Profile.jsx of pending orders on mount
  useEffect(() => {
    if (ordersLoaded && onOrdersLoaded) {
      const pendingStatuses = [Status.SUBMITTED, Status.IN_PROCESS];

      const hasPendingOrders = orders.some((order) =>
        pendingStatuses.includes(order.status),
      );

      onOrdersLoaded(hasPendingOrders);
    }
  }, [orders, ordersLoaded, onOrdersLoaded]);

  if (!ordersLoaded) return <p>Loading Orders...</p>;

  const detailsSectionProps = {
    heading: Headings.USER_INFO,
    bemMod: 'user-info',
  };

  const ordersSectionProps = {
    heading: Headings.USER_ORDERS,
    bemMod: 'order-history',
  };

  const ordersTableProps = {
    data: orders,
    tableConfig,
    parentBemBlock: 'user-orders',
  };

  return (
    <>
      <ContentSection {...detailsSectionProps}>
        <UserDetailsTable user={user} />
        <ClickHere
          actionDescription='edit your information'
          onClick={toggleViewMode}
        />
      </ContentSection>
      <ContentSection {...ordersSectionProps}>
        {ordersLoaded && orders.length >= 1 ? (
          <MappedTable {...ordersTableProps} />
        ) : (
          <p>You have no orders to display.</p>
        )}
      </ContentSection>
    </>
  );
}
