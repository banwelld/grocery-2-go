export const PageName = Object.freeze({
  CART: 'checkout',
  LIST_VIEW: 'grid-view',
  ORDER: 'order',
  PRODUCT: 'product',
  USER: 'user',
  USER_AUTH: 'auth',
});

export const UserRoles = Object.freeze({
  CUSTOMER: 'customer',
  GUEST: 'guest',
  MANAGER: 'manager',
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
