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
    SESSION: '/api/session',
    USERS: '/api/users',
    USER_ID: (id) => `/api/users/${id}`,
    ORDERS: '/api/orders',
    ORDER_ID: (id) => `/api/orders/${id}`,
    PRODUCTS: '/api/products',
    PRODUCT_ID: (id) => `/api/products/${id}`,
    ORDER_PRODUCTS: '/api/order_products',
    ORDER_PRODUCT_ID: (id) => `/api/order_products/${id}`,
  },
});

export default PATHS;
