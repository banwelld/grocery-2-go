import BasketRow from "../../components/tables/BasketRow";
import QuantityAdjustCell from "../../components/tables/QuantityAdjustCell";
import DumpQuantityCell from "../../components/tables/DumpQuantityCell";
import CurrencyCell from "../../components/tables/CurrencyCell";
import ImageCell from "../../components/tables/ImageCell";

const normalizeBasketTableData = (data) => {
  const { product, quantity } = data;
  const { imageUrl, name, price } = product;

  return {
    image: { imageUrl, name },
    name,
    tally: quantity,
    price,
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
      cellComponent: QuantityAdjustCell,
    },
    {
      dataKey: "total",
      headerColSpan: 1,
      headerLabel: "Row Total",
      cellComponent: CurrencyCell,
    },
    {
      dataKey: "dump",
      headerColSpan: 1,
      headerLabel: "",
      cellComponent: DumpQuantityCell,
    },
  ],
  bemBlock: "table",
  bemMod: "basket",
  normalizeFn: normalizeBasketTableData,
  rowComponent: BasketRow,
  getRowIdFn: (data) => data.product.id ?? null,
  getPathFn: (id) => `/products/${id}`,
  loadingMessage: "Loading product...",
  emptyMessage: "No products in basket.",
};
