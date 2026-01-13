// /client/src/app/AppProviders.jsx

import { CartProvider } from "../contexts/CartContext";
import { ModalProvider } from "../contexts/ModalContext";
import { ProductProvider } from "../contexts/ProductContext";
import { UserOrdersProvider } from "../contexts/UserOrdersContext";
import useUser from "../hooks/useUser";

export default function AppProviders({ children }) {
  const { user } = useUser();
  return (
    <ProductProvider>
      <CartProvider key={user?.id ?? "guest"}>
        <UserOrdersProvider key={user?.id ?? "guest"}>
          <ModalProvider>
            {children}
          </ModalProvider>
        </UserOrdersProvider>
      </CartProvider>
    </ProductProvider>
  );
}