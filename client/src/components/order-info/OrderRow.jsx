// OrderRow.jsx

import { useNavigate } from "react-router-dom";
import AcctField from "../AcctField";
import { getOrderDate } from "../../helpers/helpers";

export default function OrderRow({ data }) {
  const navigate = useNavigate();

  if (!data || !data?.orderProduct) <p>Loading product details...</p>;

  const { id, orderTs, quantity, total, status } = data;
  const orderDt = getOrderDate(orderTs);

  const toOrderPg = () => navigate(`../orders/${id}`);

  return (
    <div className={"row data"} onClick={toOrderPg}>
      <div className='date'>{orderDt}</div>
      <div className='quantity'>{quantity}</div>
      <AcctField fieldAmt={total} className='total' />
      <div className='basket-management-dump'>{status}</div>
    </div>
  );
}
