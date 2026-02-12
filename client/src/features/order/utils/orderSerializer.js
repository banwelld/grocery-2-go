import { toClient as productToClient } from '../../collection/utils/productSerializer';

export const orderProductToClient = (dbData) => ({
  id: dbData.id,
  quantity: dbData.quantity,
  priceCents: dbData.price_cents,
  orderId: dbData.order_id,
  productId: dbData.product_id,
  product: dbData.product ? productToClient(dbData.product) : undefined,
});

export const orderProductToServer = (clientData) => {
  const data = {
    id: clientData.id,
    quantity: clientData.quantity,
    price_cents: clientData.priceCents,
    order_id: clientData.orderId,
    product_id: clientData.productId,
  };

  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined),
  );
};

export const toClient = (dbData) => ({
  id: dbData.id,
  addressLine1: dbData.address_line_1,
  addressLine2: dbData.address_line_2,
  city: dbData.city,
  provinceCode: dbData.province_code,
  postalCode: dbData.postal_code,
  productCount: dbData.product_count,
  finalTotalCents: dbData.final_total_cents,
  createdAt: dbData.created_at,
  updatedAt: dbData.updated_at,
  status: dbData.status,
  userId: dbData.user_id,
  orderProducts: Array.isArray(dbData.order_products)
    ? dbData.order_products.map(orderProductToClient)
    : [],
});

export const toServer = (clientData) => {
  const data = {
    id: clientData.id,
    address_line_1: clientData.addressLine1,
    address_line_2: clientData.addressLine2,
    city: clientData.city,
    province_code: clientData.provinceCode,
    postal_code: clientData.postalCode,
    product_count: clientData.productCount,
    final_total_cents: clientData.finalTotalCents,
    created_at: clientData.createdAt,
    updated_at: clientData.updatedAt,
    status: clientData.status,
    user_id: clientData.userId,
    // api calls for order_products should always be made via the
    // order_products table but this will enable exceptions
    ...(Array.isArray(clientData.orderProducts) && {
      order_products: clientData.orderProducts.map(orderProductToServer),
    }),
  };

  return Object.fromEntries(
    Object.entries(data).filter(([_, v]) => v !== undefined),
  );
};
