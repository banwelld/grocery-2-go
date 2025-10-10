// ShowOrder.jsx

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import SplitPageWrapper from "../components/SplitPageWrapper";
import OptionsSidebar, { SidebarBtn } from "../components/OptionsSidebar";
import HeadingGroup from "../components/HeadingGroup";
import InfoTable from "./InfoTable";
import ProductTable from "./order-info/ProductTable";
import { getData, toParagraphs, toTitleCase, orderToTableData } from "../helpers/helpers";
import msg from "../page-text.json";

export default function ShowOrder({ orderCancelFunc = null }) {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    getData(`/orders/${id}`, setOrder);
  }, [id]);

  if (!order) return <p>Loading...</p>;

  const message = toParagraphs(msg.ORDER_INFO);

  return (
    <SplitPageWrapper className='order-info'>
      <OptionsSidebar pageSubject={"order"}>
        <SidebarBtn onClick={orderCancelFunc} label='Cancel Order' />
      </OptionsSidebar>
      <>
        <HeadingGroup>
          {`${toTitleCase(order.status)} Order`}
          {message}
        </HeadingGroup>
        <HeadingGroup level={2}>Order Details</HeadingGroup>
        <InfoTable data={order} normalizer={orderToTableData} />
        <HeadingGroup level={2}>Product Details</HeadingGroup>
        <ProductTable orderProducts={order.orderProducts} isBasket={false} />
      </>
    </SplitPageWrapper>
  );
}
