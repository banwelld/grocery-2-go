import MappedTableRow from "../../components/tables/mapped-table/MappedTableRow";
import CurrencyCell from "../../components/tables/CurrencyCell";
import { tsToDate } from "../../helpers/helpers";

const normalizeOrderTableData = (data) => {
  const { orderTs, productCount, total, status } = data;
  return {
    date: tsToDate(orderTs),
    quantity: productCount,
    total,
    status,
  };
};

export const tableConfig = {
  columnConfig: [
    {
      dataKey: "date",
      headerColSpan: 1,
      headerLabel: "Order Date",
      cellComponent: null,
    },
    {
      dataKey: "quantity",
      headerColSpan: 1,
      headerLabel: "Item Count",
      cellComponent: null,
    },
    {
      dataKey: "total",
      headerColSpan: 1,
      headerLabel: "Order Total",
      cellComponent: CurrencyCell,
    },
    {
      dataKey: "status",
      headerColSpan: 1,
      headerLabel: "Status",
      cellComponent: null,
    },
  ],
  bemBlock: "table",
  bemMod: "order",
  normalizeFn: normalizeOrderTableData,
  rowComponent: MappedTableRow,
  getRowIdFn: (data) => data.id ?? null,
  getPathFn: (id) => `/orders/${id}`,
  loadingMessage: "Loading order...",
  emptyMessage: "No orders to display.",
};
