import { Outlet } from 'react-router-dom';

import { ModalProvider } from '../contexts/ModalContext';
import { UserProvider } from '../features/user/context/UserContext';
import { ProductProvider } from '../features/collection/context/ProductContext';
import { UserOrdersProvider } from '../features/user/context/UserOrdersContext';
import useUser from '../features/user/hooks/useUser';

export default function App() {
  return (
    <ModalProvider>
      <UserProvider>
        <AppProviders>
          <Outlet />
        </AppProviders>
      </UserProvider>
    </ModalProvider>
  );
}

function AppProviders({ children }) {
  const { user } = useUser();
  return (
    <ProductProvider>
      <UserOrdersProvider key={user?.id ?? 'guest'}>
        {children}
      </UserOrdersProvider>
    </ProductProvider>
  );
}
