import {
  CellRegistryKeys as CellKey,
  TableRegistryKeys as TableKey,
} from '../../../mapped-table/utils/MappedTableRegistry';

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
    dataKey: 'date',
    label: 'Order Date',
    cellRegistryKey: CellKey.DEFAULT,
  },
  {
    dataKey: 'quantity',
    label: 'Item Count',
    cellRegistryKey: CellKey.DEFAULT,
  },
  {
    dataKey: 'finalTotalCents',
    label: 'Order Total',
    cellRegistryKey: CellKey.CURRENCY,
  },
  {
    dataKey: 'status',
    label: 'Status',
    cellRegistryKey: CellKey.DEFAULT,
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
  tableRegistryKey: TableKey.USER_ORDERS,
  loadingMessage: 'Loading order...',
  emptyMessage: 'No orders to display.',
};

export default tableConfig;
