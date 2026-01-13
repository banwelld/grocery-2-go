// /client/src/app/App.jsx

import { UserProvider } from "../contexts/UserContext";
import AppProviders from "./AppProviders";
import AppLayout from "./AppLayout";

export default function App() {
  return (
    <UserProvider>
      <AppProviders>
        <AppLayout />
      </AppProviders>
    </UserProvider>
  );
}