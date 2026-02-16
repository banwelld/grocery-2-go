import { AuthViewMode as AuthMode } from './enums';

const PATHS = Object.freeze({
  FRONT: {
    AUTH: '/user/auth',
    AUTH_LOGIN: `/user/auth?view=${AuthMode.LOGIN}`,
    AUTH_REGISTER: `/user/auth?view=${AuthMode.REGISTER}`,
    USER_PROFILE: '/user/profile',
    CART: '/cart',
    ORDER: '/order',
    HOME: '/',
    PRODUCTS: (id = ':id') => `/products/${id}`,
    PRODUCT_ADMIN: '/products/admin',
  },
  BACK: {
    SESSION: '/session',
    USERS: '/users',
    USER_ID: (id) => `/users/${id}`,
    ORDERS: '/orders',
    ORDER_ID: (id) => `/orders/${id}`,
    PRODUCTS: '/products',
    PRODUCT_ID: (id) => `/products/${id}`,
    ORDER_PRODUCTS: '/order_products',
    ORDER_PRODUCT_ID: (id) => `/order_products/${id}`,
  },
});

export default PATHS;
