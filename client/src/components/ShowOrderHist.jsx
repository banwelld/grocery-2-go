// ShowOrderHist.jsx

import { useState, useEffect } from "react";
import HeadingGroup from "../components/HeadingGroup";
import OrderRow from "./order-info/OrderRow";
import { toParagraphs, getData } from "../helpers/helpers";
import "../css/list-table.css";
import msg from "../page-text.json";

export default function ShowOrderHist() {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getData("/orders", (data) => setOrders(data));
  }, []);

  if (!orders) return <p>Loading...</p>;

  const headingText = "My Previous Orders";
  const message = toParagraphs(msg.PREV_ORDERS);

  const submittedOrders = orders.filter((o) => o.status !== "open");

  return (
    <main className='orders full-page'>
      <div className='wrapper'>
        <HeadingGroup>
          {headingText}
          {message}
        </HeadingGroup>
        <div className='list-table order'>
          <div className={"row labels"}>
            <div className='date'>Date</div>
            <div className='quantity'>Item Count</div>
            <div className='total'>Total</div>
            <div className='status'>Status</div>
          </div>
          {submittedOrders.map((so) => (
            <OrderRow key={so.id} data={so} />
          ))}
        </div>
      </div>
    </main>
  );
}
