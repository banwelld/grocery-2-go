import { ProductColumns as Column } from '../../../../config/enums';
import {
  CellRegistryKeys as CellKey,
  TableRegistryKeys as TableKey,
} from '../../../mapped-table/utils/MappedTableRegistry';

const tableConfig = {
  columns: [
    {
      dataKey: Column.NAME.key,
      label: Column.NAME.label,
      cellRegistryKey: CellKey.DEFAULT,
    },
    {
      dataKey: Column.PRICE.key,
      label: Column.PRICE.label,
      cellRegistryKey: CellKey.CURRENCY,
    },
    {
      dataKey: Column.QUANTITY.key,
      label: Column.QUANTITY.label,
      cellRegistryKey: CellKey.DEFAULT,
    },
    {
      dataKey: Column.TOTAL.key,
      label: Column.TOTAL.label,
      cellRegistryKey: CellKey.CURRENCY,
    },
  ],
  tableRegistryKey: TableKey.ORDER,
  loadingMessage: 'Loading product...',
  emptyMessage: 'No products to display.',
};

export default tableConfig;
