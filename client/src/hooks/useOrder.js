// /client/src/hooks/useOrder.js

import { useContext } from "react";
import { OrderContext } from "../contexts/OrderContext";

export const useOrder = () => useContext(OrderContext);
