// /client/src/pages/order/ProductTable.jsx

import MappedTable from "../../components/tables/mapped-table/MappedTable";
import { tableConfig } from "./tableConfig";

export default function ProductTable({ orderProducts }) {
  return <MappedTable data={orderProducts} tableConfig={tableConfig} />;
}
