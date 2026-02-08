import { toDateIso } from '../../../utils/helpers';
import { ProductColumns as Column } from '../../../config/enums';

export const normalizeCartTableRows = (data) => {
  const {
    quantity,
    productId,
    product: { name, priceCents } = {},
  } = data ?? {};
  return {
    [Column.NAME.key]: name,
    [Column.QUANTITY.key]: { quantity, productId },
    [Column.PRICE.key]: priceCents,
    [Column.TOTAL.key]: priceCents * quantity,
    [Column.RESET.key]: { productId },
  };
};

export const normalizeOrderTableRows = (data) => {
  const { quantity, product: { name, priceCents } = {} } = data ?? {};
  return {
    [Column.NAME.key]: name,
    [Column.QUANTITY.key]: quantity,
    [Column.PRICE.key]: priceCents,
    [Column.TOTAL.key]: priceCents * quantity,
  };
};

export const normalizeUserOrdersTableRows = (data) => {
  const { createdAt, productCount, finalTotalCents, status } = data;
  return {
    date: toDateIso(createdAt),
    quantity: productCount,
    finalTotalCents,
    status,
  };
};
