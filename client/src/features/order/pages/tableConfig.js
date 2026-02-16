import { ProductColumns as Column } from '../../../config/enums';
import {
  CellRegistryKeys as CellKey,
  TableRegistryKeys as TableKey,
} from '../../mapped-table/utils/MappedTableRegistry';

/**
 * @typedef {number} integer
 */

/**
 * @typedef {Object} ColumnConfig
 * @property {String} dataKey - the database column name
 * @property {String} label - the label for the column header
 * @property {String} cellRegistryKey - the cell registry key for the column
 */
const columns = [
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
];

/**
 * @typedef {Object} TableConfig
 * @property {ColumnConfig[]} columns - array of config items for each column
 * @property {integer} columnCount - static count of columns array length
 * @property {String} tableRegistryKey - table registry key for the table
 * @property {String} loadingMessage - ui message when the table is loading
 * @property {String} emptyMessage - ui message when the table is empty
 */

/** @type {TableConfig} */
const tableConfig = {
  columns: columns,
  columnCount: columns.length,
  tableRegistryKey: TableKey.ORDER,
  loadingMessage: 'Loading product...',
  emptyMessage: 'No products to display.',
};

export default tableConfig;
