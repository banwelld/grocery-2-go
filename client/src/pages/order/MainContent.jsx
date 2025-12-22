// /client/src/pages/order/MainContent.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainContentSection from "../../components/MainContentSection";
import OrderDetailsTable from "../../components/tables/shared-tables/OrderDetailsTable";
import ProductTable from "./ProductTable";
import { getData, paragraphsFromArray } from "../../helpers/helpers";
import { headings as h, sectionText as st } from "../../strings";

export default function MainContent() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getData(`/orders/${id}`)
      .then((data) => setOrder(data))
      .catch((err) => console.error("Fetch order failed: ", err));
  }, [id]);

  if (!order) return <p>Loading...</p>;

  const { orderProducts, ...orderDetails } = order;

  const headingKey = `ORDER_${orderDetails.status?.toUpperCase() ?? "UNKNOWN"}`;
  const pageHeading = h[headingKey];

  const uiText = paragraphsFromArray(st.ORDER);

  return (
    <MainContentSection heading={pageHeading} uiText={uiText}>
      <MainContentSection
        heading={h.ORDER_DETAILS}
        headingLevel={2}
        bemMod='order-details'
      >
        <OrderDetailsTable order={orderDetails} />
      </MainContentSection>
      <MainContentSection heading={h.ORDER_LIST} headingLevel={2} bemMod='order-products'>
        <ProductTable orderProducts={orderProducts} />
      </MainContentSection>
    </MainContentSection>
  );
}
