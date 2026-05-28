export const API_ENDPOINT = Object.freeze({
  SESSION: '/api/session',
  USERS: '/api/users',
  USER_ID: (id) => `/api/users/${id}`,
  ORDERS: '/api/orders',
  ORDER_ID: (id) => `/api/orders/${id}`,
  PRODUCTS: '/api/products',
  PRODUCT_ID: (id) => `/api/products/${id}`,
  ORDER_PRODUCTS: '/api/order_products',
  ORDER_PRODUCT_ID: (id) => `/api/order_products/${id}`,
});
