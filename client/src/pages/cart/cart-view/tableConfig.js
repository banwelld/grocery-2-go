// /client/src/pages/cart/cart-view/tableConfig.js

import {ProductTableColumns as Column, ProductTableColumnLabels as Label} from "../../enums.js";
import { CellRegistryKeys as CellKey, TableRegistryKeys as TableKey } from "../../../components/tables/mapped-table/MappedTableRegistry.js"

/**
 * @typedef {Object} ColumnConfigItem
 * @property {String} dataKey - The key of the data to be displayed in the column.
 * @property {String} [label] - The label for the column header (optional).
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
      cellRegistryKey: CellKey.QUANTITY_ADJUST,
    },
    {
      dataKey: Column.TOTAL,
      label: Label.TOTAL,
      cellRegistryKey: CellKey.CURRENCY,
    },
    {
      dataKey: Column.RESET,
      label: Label.RESET,
      cellRegistryKey: CellKey.QUANTITY_RESET,
    },
  ],
  tableRegistryKey: TableKey.CART,
  loadingMessage: "Loading product...",
  emptyMessage: "No products in cart.",
};

export default tableConfig;
