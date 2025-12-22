// /client/src/pages/page-enums.js

export const PageName = Object.freeze({
  BASKET: "basket",
  CHECKOUT: "checkout",
  HOME: "home",
  ORDER: "order",
  PRODUCT: "product",
  USER: "user",
  USER_AUTH: "user-auth",
});

export const LoadStatus = Object.freeze({
  LOADING: Symbol("LOADING"),
  LOADED: Symbol("LOADED"),
  NOT_FOUND: Symbol("NOT_FOUND"),
});
