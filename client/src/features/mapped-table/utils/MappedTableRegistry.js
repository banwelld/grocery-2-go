import {
  TableQuantityAdjust,
  TableResetQuantity,
} from '../../../features/cart/components/quantity-adjust/QuantityAdjust';
import { Currency, Image } from '../Components/CellLayouts';
import {
  normalizeCartTableRows,
  normalizeOrderTableRows,
  normalizeUserOrdersTableRows,
} from './rowDataNormalizers';

export const CellRegistryKeys = Object.freeze({
  CURRENCY: 'CURRENCY',
  DEFAULT: 'DEFAULT',
  IMAGE: 'IMAGE',
  QUANTITY_ADJUST: 'QUANTITY_ADJUST',
  QUANTITY_RESET: 'QUANTITY_RESET',
});

export const TableRegistryKeys = Object.freeze({
  CART: 'CART',
  CHECKOUT: 'CHECKOUT',
  ORDER: 'ORDER',
  USER_ORDERS: 'USER_ORDERS',
});

export const CELL_REGISTRY = Object.freeze({
  [CellRegistryKeys.CURRENCY]: Currency,
  [CellRegistryKeys.DEFAULT]: ({ data }) => data,
  [CellRegistryKeys.IMAGE]: Image,
  [CellRegistryKeys.QUANTITY_ADJUST]: TableQuantityAdjust,
  [CellRegistryKeys.QUANTITY_RESET]: TableResetQuantity,
});

export const NORMALIZER_REGISTRY = Object.freeze({
  [TableRegistryKeys.CART]: normalizeCartTableRows,
  [TableRegistryKeys.CHECKOUT]: normalizeOrderTableRows,
  [TableRegistryKeys.ORDER]: normalizeOrderTableRows,
  [TableRegistryKeys.USER_ORDERS]: normalizeUserOrdersTableRows,
});

export const PATH_BUILDER_REGISTRY = Object.freeze({
  [TableRegistryKeys.CART]: (row) => `/products/${row.product.id}`,
  [TableRegistryKeys.CHECKOUT]: () => null,
  [TableRegistryKeys.ORDER]: (row) => `/products/${row.product.id}`,
  [TableRegistryKeys.USER_ORDERS]: (row) => ({
    pathname: '/order',
    state: { order: row },
  }),
});

export const ID_FINDER_REGISTRY = Object.freeze({
  [TableRegistryKeys.CART]: (row) => row.product.id,
  [TableRegistryKeys.CHECKOUT]: () => null,
  [TableRegistryKeys.ORDER]: (row) => row.product.id,
  [TableRegistryKeys.USER_ORDERS]: (row) => row.id,
});
