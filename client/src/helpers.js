// helpers.js

export const toDecimal = (amtInt) => (amtInt / 100).toFixed(2);

export const countOrderItems = (itemArr) =>
  itemArr?.reduce((total, item) => total + item.quantity, 0);

export const getOrderTotal = (itemArr) =>
  itemArr?.reduce((total, item) => total + item.quantity * item.item.price, 0);
