import {
  CellRegistryKeys as CellKey,
  TableRegistryKeys as TableKey,
} from '../../../../../features/mapped-table/utils/MappedTableRegistry.js';
import { ProductColumns as Column } from '../../../../../config/enums.js';

/**
 * @typedef {Object} ColumnConfigItem
 * @property {String} dataKey - The database column name.
 * @property {String} label - The label for the column header.
 * @property {String} cellRegistryKey - The key of the cell registry to use for the column.
 */

/**
 * @typedef {Object} TableConfig
 * @property {ColumnConfigItem[]} columns - Array of config items for each column of the table.
 * @property {String} tableRegistryKey - The key of the table registry to use for the table.
 * @property {String} loadingMessage - Message to display when the table is loading.
 * @property {String} emptyMessage - Message to display when the table is empty.
 */
/** @type {TableConfig} */
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
      cellRegistryKey: CellKey.QUANTITY_ADJUST,
    },
    {
      dataKey: Column.TOTAL.key,
      label: Column.TOTAL.label,
      cellRegistryKey: CellKey.CURRENCY,
    },
    {
      dataKey: Column.RESET.key,
      label: Column.RESET.label,
      cellRegistryKey: CellKey.QUANTITY_RESET,
    },
  ],
  tableRegistryKey: TableKey.CART,
  loadingMessage: 'Loading product...',
  emptyMessage: 'No products in cart.',
};

export default tableConfig;
