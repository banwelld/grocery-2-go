import { 
  ProductTableColumns as Column, 
  ProductTableColumnLabels as Label 
} from "../enums";
import { 
  CellRegistryKeys as CellKey, 
  TableRegistryKeys as TableKey 
} from "../../components/tables/mapped-table/MappedTableRegistry";

const tableConfig = {
  columns: [
    {
      dataKey: Column.NAME,
      label: Label.NAME,
      cellRegistryKey: CellKey.DEFAULT,
    },
    {
      dataKey: Column.PRICE,
      label: Label.PRICE,
      cellRegistryKey: CellKey.CURRENCY,
    },
    {
      dataKey: Column.QUANTITY,
      label: Label.QUANTITY,
      cellRegistryKey: CellKey.DEFAULT,
    },
    {
      dataKey: Column.TOTAL,
      label: Label.TOTAL,
      cellRegistryKey: CellKey.CURRENCY,
    },
  ],
  tableRegistryKey: TableKey.ORDER,
  loadingMessage: "Loading product...",
  emptyMessage: "No products to display.",
};

export default tableConfig;
