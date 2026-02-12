export const DEFAULT_SELECT_VALUE = 'DEFAULT_SELECT_VALUE';

export const PageName = Object.freeze({
  CART: 'checkout',
  LIST_VIEW: 'grid-view',
  ADMIN_VIEW: 'product-admin',
  ORDER: 'order',
  ITEM_VIEW: 'product-page',
  USER: 'user',
  USER_AUTH: 'auth',
});

export const UserRole = Object.freeze({
  ADMIN: 'admin',
  CUSTOMER: 'customer',
  GUEST: 'guest',
});

// cart domain

export const CartViewMode = Object.freeze({
  CART: 'cart',
  CHECKOUT: 'checkout',
});

export const ProductColumns = Object.freeze({
  NAME: {
    key: 'name',
    label: 'Product Name',
  },
  PRICE: {
    key: 'price',
    label: 'Price',
  },
  QUANTITY: {
    key: 'quantity',
    label: 'Count',
  },
  TOTAL: {
    key: 'total',
    label: 'Row Total',
  },
  RESET: {
    key: 'reset',
    label: '',
  },
});

export const AuthViewMode = Object.freeze({
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
});

export const UserUpdateMode = Object.freeze({
  USER_INFO: 'USER_INFO',
  PASSWORD: 'PASSWORD',
});
