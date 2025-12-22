// /client/src/hooks/use-quantity-adjust/constants.js

export const quantityAction = Object.freeze({
  ADD: "ADD",
  ADD_NEW: "ADD_NEW",
  DEFAULT: "DEFAULT",
  DISABLED: "DISABLED",
  REMOVE: "REMOVE",
  REMOVE_ALL: "REMOVE_ALL",
});

export const errorMessages = Object.freeze({
  ADD_FIRST_OF_TYPE: "Add first of product type failed: ",
  ADD_TO_NEW_BASKET: "Add product to new basket failed: ",
  ADJUST_VALUE: "Adjustment value missing or invalid; expected non-zero integer.",
  CREATE_NEW_BASKET: "New basket creation failed: ",
  DECREMENT: "Remove from product quantity failed: ",
  EMPTY_BASKET: "Attempted basket action on nonexistent or empty basket",
  INCREMENT: "Add to product quantity failed: ",
  NEGATIVE_QUANTITY: "Request denied: would reduce quantity to negative value.",
  NO_PRODUCT: "Cannot adjust quantity as no persisted orderItem exists for this product.",
  ORDER_STATUS: "Invalid order status (expected open order).",
  QUANTITY_ACTION: "'action' value invalid or not supplied.",
});

export const svgPath = Object.freeze({
  [quantityAction.ADD]: `
    M440-320h80v-168l64 64 56-56-160-160-160 160 56 56 64-64v168Zm40 240q-83
      0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54
      127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5
      156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227
      t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z`,
  [quantityAction.ADD_NEW]: `
    M206-120q-20 0-36.5-12T148 -164L38 -562q-4-14 4.83 -26 8.82 -12 24.17 -12
      h202l185 -270q5 -6 11 -9.5t14 -3.5q8 0 14 3.5t11 9.5l184 270h206q15.35 0
      24.17 12 8.83 12 4.83 26L812 -164q-5 20-21.5 32T754 -120H206Zm136 -480h273
      L479 -800 342 -600Z M459 -505h70v110h110v70h-110v110h-70v-110h-110v-70h110Z`,
  [quantityAction.DISABLED]: null,
  [quantityAction.REMOVE]: `
    m480-320 160-160-56-56-64 64v-168h-80v168l-64-64-56 56 160 160Zm0 240q-83
      0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54
      127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5
      156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227
      t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z`,
  [quantityAction.REMOVE_ALL]: `
    M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0
      33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160
      0h80v-360h-80v360ZM280-720v520-520Z`,
});
