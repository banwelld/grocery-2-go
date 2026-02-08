import { Headings, UiText } from '../../../../config/constants';
import { OrderStatus } from '../../context/OrderContext';
import ContentSection from '../../../../components/ui/frames/ContentSection';
import MappedTable from '../../../mapped-table/Components/MappedTable';
import OrderDetailsTable from '../../components/OrderDetailsTable';
import tableConfig from './tableConfig';

const legalStatuses = new Set(Object.values(OrderStatus));

export default function PageContent({ order, status, pageName }) {
  if (!order) return <p>Loading Order...</p>;

  const { orderProducts, ...orderDetails } = order;

  const headingKey = legalStatuses.has(status)
    ? `ORDER_${status.toUpperCase()}`
    : 'ORDER_UNKNOWN';

  const pageProps = {
    heading: Headings[headingKey],
    uiText: UiText.ORDER,
  };

  const detailsSectionProps = {
    heading: Headings.ORDER_DETAILS,
    bemMod: 'order-details',
  };

  const productsSectionProps = {
    heading: Headings.CART_PRODUCTS,
    bemMod: 'order-products',
  };

  const tableProps = {
    data: orderProducts,
    tableConfig,
    parentBemBlock: pageName,
  };

  return (
    <ContentSection isRoot hasPageHeading {...pageProps}>
      <ContentSection {...detailsSectionProps}>
        <OrderDetailsTable {...orderDetails} />
      </ContentSection>
      <ContentSection {...productsSectionProps}>
        <MappedTable {...tableProps} />
      </ContentSection>
    </ContentSection>
  );
}
