import * as productSerializer from '../features/collection/utils/productSerializer';
import * as userSerializer from '../features/user/utils/userSerializer';
import * as orderSerializer from '../features/order/utils/orderSerializer';

// map type names to serializer modules
const serializers = {
  product: productSerializer,
  user: userSerializer,
  order: orderSerializer,
  order_product: {
    toClient: orderSerializer.orderProductToClient,
    toServer: orderSerializer.orderProductToServer,
  },
};

export const serialize = (data, type, direction = 'toClient') => {
  if (!data) return data;

  const serializer = serializers[type];
  if (!serializer) {
    console.warn(`No serializer found for '${type}'`);
    return data;
  }

  const func = serializer[direction];
  if (!func) {
    console.warn(`No serializer found for '${direction}' in '${type}'`);
    return data;
  }

  if (Array.isArray(data)) {
    return data.map((item) => func(item));
  }

  return func(data);
};

export const toClient = (data, type) => serialize(data, type, 'toClient');
export const toServer = (data, type) => serialize(data, type, 'toServer');
