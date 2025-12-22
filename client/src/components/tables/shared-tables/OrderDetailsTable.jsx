// /client/src/components/tables/user-info-table/OrderDetailsTable.jsx

import DetailsTable from "../details-table/DetailsTable";
import { tsToDate, intToDecimalPrice } from "../../../helpers/helpers";

export default function OrderDetailsTable({
  address,
  city,
  provinceCd,
  postalCd,
  orderTs,
  status,
  statusTs,
  total,
  productCount,
}) {
  const deliveryAddress = `${address}\n${city}, ${provinceCd}  ${postalCd}`;
  const orderDate = tsToDate(orderTs);
  const statusDateLabel = `${status} dt`;
  const statusDate = tsToDate(statusTs);
  const orderTotal = intToDecimalPrice(total);

  const orderDetails = {
    "deliver to": deliveryAddress,
    "order dt": orderDate,
    [statusDateLabel]: statusDate,
    "item count": productCount,
    "order total": orderTotal,
  };

  return <DetailsTable data={orderDetails} dataType='order' />;
}
