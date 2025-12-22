// /client/src/pages/user/UserInfoAndOrders.jsx

import { useState, useEffect } from "react";
import MainContentSection from "../../components/MainContentSection";
import UserDetailsTable from "../../components/tables/shared-tables/UserDetailsTable";
import UserOrdersTable from "./UserOrdersTable";
import { getData } from "../../helpers/helpers";
import { LoadStatus as ls } from "../page-enums";
import { headings as h } from "../../strings";

export default function UserInfoAndOrders({ user }) {
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    getData("/orders")
      .then((data) => setOrders(data))
      .catch((err) => console.error("Fetch previous orders failed:", err));
  }, []);

  const prevOrders = orders?.filter((o) => o?.status !== "open") ?? ls.LOADING;

  const isLoadingOrders = prevOrders === ls.LOADING;

  if (isLoadingOrders) return <p>Loading...</p>;

  return (
    <>
      <MainContentSection heading={h.USER_INFO} headingLevel={2} bemMod='user-info'>
        <UserDetailsTable user={user} />
      </MainContentSection>
      <MainContentSection heading={h.USER_ORDERS} headingLevel={2} bemMod='order-history'>
        <UserOrdersTable orders={prevOrders} />
      </MainContentSection>
    </>
  );
}
