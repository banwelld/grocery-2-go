// /client/src/pages/enums.js

export const PageName = Object.freeze({
  CART: "cart",
  HOME: "home",
  ORDER: "order",
  PRODUCT: "product",
  USER: "user",
  USER_AUTH: "user-auth",
});

export const LoadStatus = Object.freeze({
  LOADING: "LOADING",
  LOADED: "LOADED",
  NOT_FOUND: "NOT_FOUND",
});

// cart domain

export const CartPageMode = Object.freeze({
  CART: "cart",
  CHECKOUT: "checkout",
});

export const ProductTableColumns = Object.freeze({
  NAME: "name",
  PRICE: "price",
  QUANTITY: "quantity",
  TOTAL: "total",
  RESET: "reset",
});

export const ProductTableColumnLabels = Object.freeze({
  NAME: "Product Name",
  PRICE: "Price",
  QUANTITY: "Count",
  TOTAL: "Row Total",
  RESET: "",
});