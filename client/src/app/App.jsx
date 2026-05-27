import { Outlet } from 'react-router-dom';
import { ModalProvider } from '../contexts/ModalContext';
import { ProductProvider } from '../features/collection/context/ProductContext';
import { UserProvider } from '../features/user/context/UserContext';

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
  return <ProductProvider>{children}</ProductProvider>;
}
