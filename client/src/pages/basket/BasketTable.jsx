// /client/src/pages/order/BasketTable.jsx

import MappedTable from "../../components/tables/mapped-table/MappedTable";
import { tableConfig } from "./tableConfig";

export default function BasketTable({ products }) {
  return <MappedTable data={products} tableConfig={tableConfig} />;
}
