// /client/src/pages/user/UserInfoAndOrders.jsx

import { useEffect } from "react";
import useUserOrders from "../../hooks/useUserOrders";

import ContentSection from "../../components/section-frames/ContentSection";
import UserDetailsTable from "../../components/tables/UserDetailsTable";
import MappedTable from "../../components/tables/mapped-table/MappedTable";

import tableConfig from "./tableConfig";
import { headings as h } from "../../strings";

export default function UserInfoAndOrders({ user }) {
  const { orders, ordersLoaded, loadOrders } = useUserOrders();

  useEffect(() => {
    if (!ordersLoaded) loadOrders();
  }, [ordersLoaded, loadOrders]);

  const isLoadingOrders = !orders;
  if (isLoadingOrders) return <p>Loading Orders...</p>;

  const detailsSectionProps = {
    heading: h.USER_INFO,
    bemMod: "user-info",
  };

  const ordersSectionProps = {
    heading: h.USER_ORDERS,
    bemMod: "order-history",
  };

  const ordersTableProps = {
    data: orders,
    tableConfig,
    parentBemBlock: "user-orders",
  };
  console.log(orders);
  return (
    <>
      <ContentSection {...detailsSectionProps}>
        <UserDetailsTable user={user} />
      </ContentSection>
      <ContentSection {...ordersSectionProps}>
        <MappedTable {...ordersTableProps} />
      </ContentSection>
    </>
  );
}
