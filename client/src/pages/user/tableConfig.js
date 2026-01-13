import { 
  CellRegistryKeys as CellKey, 
  TableRegistryKeys as TableKey 
} from "../../components/tables/mapped-table/MappedTableRegistry";

const tableConfig = {
  columns: [
    {
      dataKey: "date",
      label: "Order Date",
      cellRegistryKey: CellKey.DEFAULT,
    },
    {
      dataKey: "quantity",
      label: "Item Count",
      cellRegistryKey: CellKey.DEFAULT,
    },
    {
      dataKey: "total",
      label: "Order Total",
      cellRegistryKey: CellKey.CURRENCY,
    },
    {
      dataKey: "status",
      label: "Status",
      cellRegistryKey: CellKey.DEFAULT,
    },
  ],
  tableRegistryKey: TableKey.USER_ORDERS,
  loadingMessage: "Loading order...",
  emptyMessage: "No orders to display.",
};

export default tableConfig;
