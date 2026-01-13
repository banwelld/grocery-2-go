// /client/src/pages/order/CartProductsTable.jsx

import MappedTable from "../../../components/tables/mapped-table/MappedTable";
import tableConfig from "./tableConfig";

export default function CartProductsTable({ data }) {
  return <MappedTable data={data} tableConfig={tableConfig} parentBemBlock="cart" />;
}
