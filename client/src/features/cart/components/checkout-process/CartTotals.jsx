import DetailsTable from '../../../../components/ui/tables/details-table/DetailsTable';
import { priceCentsToDollars } from '../../../../utils/helpers';

export default function CartTotals({ orderItemCount, orderTotal }) {
  const orderDetails = {
    'total items': orderItemCount,
    'total cost': `$ ${priceCentsToDollars(orderTotal)}`,
  };
  return <DetailsTable data={orderDetails} dataType='order' />;
}
