import MappedTable from "../../../../../features/mapped-table/Components/MappedTable";
import tableConfig from "./tableConfig";

export default function CartProductsTable({ data }) {
  return <MappedTable data={data} tableConfig={tableConfig} parentBemBlock="cart" />;
}
