// /client/src/pages/order/MainContent.jsx

import { useOrder } from "../../hooks/useOrder";
import ContentSection from "../../components/section-frames/ContentSection";
import OrderDetailsTable from "../../components/tables/OrderDetailsTable";
import MappedTable from "../../components/tables/mapped-table/MappedTable";
import tableConfig from "./tableConfig";
import { OrderStatus } from "../../contexts/OrderContext";
import { headings, uiText } from "../../strings";

const legalStatuses = new Set(Object.values(OrderStatus));

export default function MainContent({ pageName }) {
  const { order, status } = useOrder();

  if (!order) return <p>Loading...</p>

  const { orderProducts, ...orderDetails } = order;

  const headingKey =
    legalStatuses.has(status) ?
      `ORDER_${status.toUpperCase()}` :
      "ORDER_UNKNOWN";

  const pageProps = {
    heading: headings[headingKey],
    uiText: uiText.ORDER,
  };

  const detailsSectionProps = {
    heading: headings.ORDER_DETAILS,
    bemMod: "order-details",
  };

  const productsSectionProps = {
    heading: headings.CART_PRODUCTS,
    bemMod: "order-products",
  };

  const tableProps = {
    data: orderProducts,
    tableConfig,
    parentBemBlock: pageName,
  };

  return (
    <ContentSection isTopLevel {...pageProps}>
      <ContentSection {...detailsSectionProps}>
        <OrderDetailsTable {...orderDetails} />
      </ContentSection>
      <ContentSection {...productsSectionProps}>
        <MappedTable {...tableProps} />
      </ContentSection>
    </ContentSection>
  );
}