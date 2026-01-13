// /client/src/pages/cart/CartDetailsTable.jsx

import DetailsTable from "../../../components/tables/details-table/DetailsTable";
import { divideIntBy100 } from "../../../helpers/helpers";

export default function CartDetailsTable({ orderItemCount, orderTotal }) {

  const orderDetails = {
    "total items": orderItemCount,
    "total cost": `$ ${divideIntBy100(orderTotal)}`,
  };

  return <DetailsTable data={orderDetails} dataType='order' />;
}
