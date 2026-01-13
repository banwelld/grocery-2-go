// /client/src/components/tables/mapped-table/rowDataNormalizers.js

import { ProductTableColumns as Column } from "../../../pages/enums";
import { tsToDate } from "../../../helpers/helpers";

export const normalizeCartTableRows = (data) => {
  const { quantity, productId, product: { name, price} = {} } = data ?? {}
  return {
    [Column.NAME]: name,
    [Column.QUANTITY]: { quantity, productId },
    [Column.PRICE]: price,
    [Column.TOTAL]: price * quantity,
    [Column.RESET]: { productId },
  };
};

export const normalizeOrderTableRows = (data) => {
  const { quantity, product: { name, price} = {} } = data ?? {}
  return {
    [Column.NAME]: name,
    [Column.QUANTITY]: quantity,
    [Column.PRICE]: price,
    [Column.TOTAL]: price * quantity,
  };
};

export const normalizeUserOrdersTableRows = (data) => {
  const { orderTs, productCount, total, status } = data;
  return {
    date: tsToDate(orderTs),
    quantity: productCount,
    total,
    status,
  };
};