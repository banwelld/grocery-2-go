// /client/src/components/tables/mapped-table/MappedTableRegistry.js

import {Currency, Image} from "./CellLayouts";
import {
    TableQuantityAdjust, 
    TableResetQuantity,
} from "../../quantity-adjust/QuantityAdjust";
import {
    normalizeCartTableRows, 
    normalizeOrderTableRows, 
    normalizeUserOrdersTableRows,
} from "./rowDataNormalizers";

export const CellRegistryKeys = Object.freeze({
    CURRENCY: "CURRENCY",
    DEFAULT: "DEFAULT",
    IMAGE: "IMAGE",
    QUANTITY_ADJUST: "QUANTITY_ADJUST",
    QUANTITY_RESET: "QUANTITY_RESET",
});

export const TableRegistryKeys = Object.freeze({
    CART: "CART",
    CHECKOUT: "CHECKOUT",
    ORDER: "ORDER",
    USER_ORDERS: "USER_ORDERS",
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
    [TableRegistryKeys.CHECKOUT]: normalizeCartTableRows,
    [TableRegistryKeys.ORDER]: normalizeOrderTableRows,
    [TableRegistryKeys.USER_ORDERS]: normalizeUserOrdersTableRows,
});

export const PATH_BUILDER_REGISTRY = Object.freeze({
    [TableRegistryKeys.CART]: (id) => `/products/${id}`,
    [TableRegistryKeys.CHECKOUT]: () => null,
    [TableRegistryKeys.ORDER]: (id) => `/products/${id}`,
    [TableRegistryKeys.USER_ORDERS]: (id) => `/orders/${id}`,
});

export const ID_FINDER_REGISTRY = Object.freeze({
    [TableRegistryKeys.CART]: (row) => row.product.id,
    [TableRegistryKeys.CHECKOUT]: () => null,
    [TableRegistryKeys.ORDER]: (row) => row.product.id,
    [TableRegistryKeys.USER_ORDERS]: (row) => row.id,
});