// /client/src/pages/user/UserOrdersTable.jsx

import MappedTable from "../../components/tables/mapped-table/MappedTable";
import { tableConfig } from "./tableConfig";

export default function UserOrdersTable({ orders }) {
  return <MappedTable data={orders} tableConfig={tableConfig} />;
}
