import MappedTableRow from "../../components/tables/mapped-table/MappedTableRow";
import CurrencyCell from "../../components/tables/CurrencyCell";
import ImageCell from "../../components/tables/ImageCell";

const normalizeProductTableData = (data) => {
  const { product, price, quantity } = data;
  const { imageUrl, name } = product;

  return {
    image: { imageUrl, name },
    name,
    price,
    tally: quantity,
    total: price * quantity,
  };
};

export const tableConfig = {
  columnConfig: [
    {
      dataKey: "image",
      headerColSpan: 2,
      headerLabel: "Products",
      cellComponent: ImageCell,
    },
    {
      dataKey: "name",
      headerColSpan: 0,
      headerLabel: null,
      cellComponent: null,
    },
    {
      dataKey: "price",
      headerColSpan: 1,
      headerLabel: "Price",
      cellComponent: CurrencyCell,
    },
    {
      dataKey: "tally",
      headerColSpan: 1,
      headerLabel: "Count",
      cellComponent: null,
    },
    {
      dataKey: "total",
      headerColSpan: 1,
      headerLabel: "Row Total",
      cellComponent: CurrencyCell,
    },
  ],
  bemBlock: "table",
  bemMod: "basket",
  normalizeFn: normalizeProductTableData,
  rowComponent: MappedTableRow,
  getRowIdFn: (data) => data.product.id ?? null,
  getPathFn: (id) => `/products/${id}`,
  loadingMessage: "Loading product...",
  emptyMessage: "No products to display.",
};
