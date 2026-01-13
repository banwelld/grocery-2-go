// /client/src/hooks/use-quantity-adjust/constants.js

import { ButtonStyle } from "../components/quantity-adjust/constants"

export const errorMessages = Object.freeze({
  ADD_FIRST_OF_TYPE: "Add first of product type failed: ",
  ADD_TO_NEW_CART: "Add product to new cart failed: ",
  ADJUST_VALUE: "Adjustment value missing or invalid; expected non-zero integer.",
  CREATE_NEW_CART: "New cart creation failed: ",
  DECREMENT: "Remove from product quantity failed: ",
  INCREMENT: "Add to product quantity failed: ",
  INVALID_ACTION: `Quantity action invalid. Expected one of: 
                    ${Object.values(ButtonStyle).join("; ")}.`,
  NEGATIVE_QUANTITY: "Invariant violation: negative quantities not allowed.",
  NO_CART_OR_PROD: "Cart is null or product not in orderProducts",  
  NO_PRODUCT: "Product not in orderProducts.",
  NO_QUANTITY_ACTION: "'action' value invalid or not supplied.",
  ORDER_STATUS: "Invalid order status (expected open order).",
});