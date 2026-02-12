import { useEffect } from 'react';
import { Headings } from '../../../../config/constants';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import MappedTable from '../../../mapped-table/Components/MappedTable';
import tableConfig from './tableConfig';
import useUserOrders from '../../../../hooks/useUserOrders';

export default function OrderHistory() {
  const { orders, ordersLoaded, loadOrders } = useUserOrders();

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  if (!ordersLoaded) return <p>Loading Orders...</p>;

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
    <ContentSection {...ordersSectionProps}>
      {orders.length >= 1 ? (
        <MappedTable {...ordersTableProps} />
      ) : (
        <p>You have no orders to display.</p>
      )}
    </ContentSection>
  );
}
