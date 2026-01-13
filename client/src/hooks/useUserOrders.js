// /client/src/hooks/useUser.js

import { useContext } from "react";
import { UserOrdersContext } from "../contexts/UserOrdersContext";

export default function useUserOrders() {
    return useContext(UserOrdersContext);
}