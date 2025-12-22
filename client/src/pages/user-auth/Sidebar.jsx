// /client/src/pages/user-auth/Sidebar.jsx

import SidebarSection from "../../components/SidebarSection";

export default function Sidebar({ isLoginView, setSearchParams }) {
  const toggleView = () => {
    setSearchParams({ view: isLoginView ? "register" : "login" });
  };

  const btnText = isLoginView ? "Sign Up" : "Login";

  return (
    <SidebarSection>
      <button onClick={toggleView}>{btnText}</button>
    </SidebarSection>
  );
}
